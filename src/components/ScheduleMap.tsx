import React, { useState, useMemo, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, PolylineF } from '@react-google-maps/api';
import { SCHEDULE } from '../data/schedule';
import type { Activity } from '../types';
import { Clock } from 'lucide-react';

const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '1rem'
};

const center = {
    lat: 33.3617,
    lng: 126.5292
};

const options = {
    disableDefaultUI: true,
    zoomControl: true,
};

interface ScheduleMapProps {
    customActivities?: Activity[];
    hideTimeline?: boolean;
}

const ScheduleMap: React.FC<ScheduleMapProps> = ({ customActivities, hideTimeline = false }) => {
    const [selectedDay, setSelectedDay] = useState(1);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    // API Key from environment variable
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
    });

    const activeRoute = customActivities ? null : SCHEDULE.days.find((d) => d.day === selectedDay);

    // Find previous day's last activity for connection
    const prevDayRoute = customActivities ? null : SCHEDULE.days.find((d) => d.day === selectedDay - 1);
    const prevDayLastActivity = prevDayRoute?.activities[prevDayRoute.activities.length - 1];

    // Filter activities that have valid coordinates
    const mapActivities = useMemo(() => {
        if (customActivities) {
            return customActivities.filter(a => a.location.lat !== 0);
        }
        return activeRoute?.activities.filter(a => a.location.lat !== 0) || [];
    }, [activeRoute, customActivities]);

    const pathCoordinates = useMemo(() => {
        return mapActivities.map(a => ({ lat: a.location.lat, lng: a.location.lng }));
    }, [mapActivities]);

    // Connection path from previous day
    const connectionPath = useMemo(() => {
        if (prevDayLastActivity && prevDayLastActivity.location.lat !== 0 && mapActivities.length > 0) {
            return [
                { lat: prevDayLastActivity.location.lat, lng: prevDayLastActivity.location.lng },
                { lat: mapActivities[0].location.lat, lng: mapActivities[0].location.lng }
            ];
        }
        return [];
    }, [prevDayLastActivity, mapActivities]);

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        setMap(map);
    }, []);

    // Effect to update bounds and zoom when activities change
    useEffect(() => {
        if (map && (mapActivities.length > 0 || connectionPath.length > 0)) {
            const bounds = new window.google.maps.LatLngBounds();

            // Add current activities
            mapActivities.forEach(a => {
                bounds.extend({ lat: a.location.lat, lng: a.location.lng });
            });

            // Add previous day start point if exists
            if (connectionPath.length > 0) {
                bounds.extend(connectionPath[0]);
            }

            map.fitBounds(bounds);

            // Add listener to adjust zoom after fitBounds
            const listener = google.maps.event.addListener(map, "idle", () => {
                const currentZoom = map.getZoom();

                // Heuristic: If zoom is very low (e.g. < 9, meaning broad view like Korea), don't reduce it further.
                // If zoom is high (Jeju detailed view), zoom out slightly for context.
                if (currentZoom && currentZoom > 9) {
                    map.setZoom(currentZoom - 1);
                }
                google.maps.event.removeListener(listener);
            });
        } else if (map) {
            map.setCenter(center);
            map.setZoom(9);
        }
    }, [map, mapActivities, connectionPath]);

    return (
        <div className={`bg-white rounded-2xl shadow-sm ${hideTimeline ? '' : 'p-4 mb-6'}`}>
            {!hideTimeline && (
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2 text-2xl">🗺️</span>
                    여행 동선 지도
                </h2>
            )}

            {/* Map Container */}
            <div className={`relative w-full ${hideTimeline ? 'h-[250px]' : 'h-[400px]'} bg-gray-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner`}>
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                        options={options}
                    >
                        {/* Previous Day Connection (Dashed Line) */}
                        {connectionPath.length > 0 && (
                            <>
                                <MarkerF
                                    position={connectionPath[0]}
                                    label={{
                                        text: "Start",
                                        color: "#6B7280",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                        className: "bg-white px-1 rounded border border-gray-300"
                                    }}
                                    icon={{
                                        path: "M -2,0 0,-2 2,0 0,2 z", // Small diamond shape
                                        fillColor: "#9CA3AF",
                                        fillOpacity: 1,
                                        strokeWeight: 1,
                                        strokeColor: "white",
                                        scale: 3
                                    }}
                                    opacity={0.7}
                                />
                                <PolylineF
                                    path={connectionPath}
                                    options={{
                                        strokeColor: "#9CA3AF", // Gray
                                        strokeOpacity: 0.6,
                                        strokeWeight: 3,
                                        icons: [{
                                            icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 2 },
                                            offset: "0",
                                            repeat: "15px" // Dashed
                                        }],
                                    }}
                                />
                            </>
                        )}

                        {/* Render Markers for All Activities */}
                        {mapActivities.map((activity, idx) => (
                            <MarkerF
                                key={activity.id}
                                position={{ lat: activity.location.lat, lng: activity.location.lng }}
                                label={{
                                    text: String(idx + 1), // Simple index, 1-based
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "14px"
                                }}
                            />
                        ))}

                        {/* Draw Polyline connecting markers */}
                        {!hideTimeline && (
                            <PolylineF
                                path={pathCoordinates}
                                options={{
                                    strokeColor: "#3B82F6",
                                    strokeOpacity: 0.8,
                                    strokeWeight: 4,
                                    icons: [{
                                        icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 2 },
                                        offset: "0",
                                        repeat: "20px"
                                    }],
                                }}
                            />
                        )}
                    </GoogleMap>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                        <p className="text-sm">지도 로딩중...</p>
                    </div>
                )}
            </div>

            {/* Day Selector - ONLY IF !hideTimeline */}
            {!hideTimeline && (
                <div className="flex overflow-x-auto space-x-2 mt-6 pb-2 no-scrollbar">
                    {SCHEDULE.days.map((day) => (
                        <button
                            key={day.day}
                            onClick={() => setSelectedDay(day.day)}
                            className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all ${selectedDay === day.day
                                ? 'bg-gray-800 text-white shadow-lg scale-105'
                                : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            <div className="text-[10px] opacity-60 font-light mb-0.5">{day.date.slice(5)}</div>
                            <div>Day {day.day}</div>
                        </button>
                    ))}
                </div>
            )}

            {/* Timeline List - ONLY IF !hideTimeline */}
            {!hideTimeline && (
                <div className="mt-4 px-1">
                    <h3 className="font-bold text-gray-800 mb-4 text-base flex items-center">
                        {activeRoute?.title}
                    </h3>
                    <div className="space-y-0">
                        {mapActivities.map((activity, idx) => (
                            <div key={activity.id} className="flex gap-4 relative pb-6 last:pb-0 group">
                                {idx !== mapActivities.length - 1 && (
                                    <div className="absolute left-[9px] top-6 bottom-0 w-[2px] bg-gray-100 group-hover:bg-blue-50 transition-colors"></div>
                                )}

                                {/* Numbered Marker Circle */}
                                <div className={`
                                    relative z-10 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center shadow-md mt-1 text-white font-bold text-[10px]
                                    ${activity.type === 'flight' ? 'bg-blue-500' :
                                        activity.type === 'food' ? 'bg-orange-500' :
                                            activity.type === 'checkin' ? 'bg-purple-600' : 'bg-green-500'}
                                `}>
                                    {idx + 1}
                                </div>

                                <div className="flex-1 -mt-1">
                                    <span className="inline-flex items-center text-xs font-semibold text-gray-500 mb-1 bg-gray-50 px-1.5 py-0.5 rounded">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {activity.time}
                                    </span>
                                    <h4 className="text-sm font-bold text-gray-800 leading-tight mb-1">{activity.title}</h4>
                                    <p className="text-xs text-gray-500">{activity.location.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleMap;
