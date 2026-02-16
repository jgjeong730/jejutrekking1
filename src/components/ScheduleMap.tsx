import React, { useState, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, PolylineF } from '@react-google-maps/api';
import { SCHEDULE } from '../data/schedule';
import { Clock, ArrowRight } from 'lucide-react';

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

const ScheduleMap: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState(1);

    // API Key from environment variable
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
    });

    const activeRoute = SCHEDULE.days.find((d) => d.day === selectedDay);

    const mainlandActivities = useMemo(() => {
        return activeRoute?.activities.filter(a => a.location.lat > 35) || []; // Filter for Suwon/Gimpo
    }, [activeRoute]);

    const jejuActivities = useMemo(() => {
        return activeRoute?.activities.filter(a => a.location.lat < 34) || []; // Filter for Jeju
    }, [activeRoute]);

    const pathCoordinates = useMemo(() => {
        return jejuActivities.map(a => ({ lat: a.location.lat, lng: a.location.lng }));
    }, [jejuActivities]);

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        // Fit bounds to show all markers
        const bounds = new window.google.maps.LatLngBounds();
        jejuActivities.forEach(a => {
            bounds.extend({ lat: a.location.lat, lng: a.location.lng });
        });
        // If there are points, fit bounds, otherwise center Jeju
        if (jejuActivities.length > 0) {
            map.fitBounds(bounds);
        } else {
            map.setCenter(center);
            map.setZoom(10);
        }
    }, [jejuActivities]);

    return (
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2 text-2xl">🗺️</span>
                제주 여행 지도 (Google Maps)
            </h2>

            {/* Mainland/Transfer Section */}
            {mainlandActivities.length > 0 && selectedDay === 1 && (
                <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-3 overflow-x-auto">
                    <span className="text-xs font-bold text-gray-500 whitespace-nowrap">출발</span>
                    {mainlandActivities.map((a, i) => (
                        <div key={a.id} className="flex items-center text-xs text-gray-600 whitespace-nowrap">
                            {i > 0 && <ArrowRight className="w-3 h-3 mx-2 text-gray-300" />}
                            <span className="bg-white px-2 py-1 rounded shadow-sm border border-gray-200">{a.title.split(' ')[0]}</span>
                        </div>
                    ))}
                    <ArrowRight className="w-3 h-3 mx-2 text-blue-300" />
                    <span className="text-xs font-bold text-blue-600">제주 도착</span>
                </div>
            )}

            {/* Map Container */}
            <div className="relative w-full h-[400px] bg-gray-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                        options={options}
                    >
                        {/* Render Markers for Jeju Activities */}
                        {jejuActivities.map((activity, idx) => (
                            <MarkerF
                                key={activity.id}
                                position={{ lat: activity.location.lat, lng: activity.location.lng }}
                                label={{
                                    text: String(mainlandActivities.length + idx + 1),
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "12px"
                                }}
                            />
                        ))}

                        {/* Draw Polyline connecting markers */}
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
                    </GoogleMap>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                        <p className="text-sm">지도 로딩중...</p>
                        <p className="text-xs text-gray-400 mt-2">API Key가 없으면 지도가 로드되지 않습니다.</p>
                    </div>
                )}
            </div>

            {/* Day Selector */}
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

            {/* Timeline List */}
            <div className="mt-4 px-1">
                <h3 className="font-bold text-gray-800 mb-4 text-base flex items-center">
                    {activeRoute?.title}
                </h3>
                <div className="space-y-0">
                    {/* Render Mainland items first if Day 1 */}
                    {mainlandActivities.length > 0 && selectedDay === 1 && mainlandActivities.map((activity) => (
                        <div key={activity.id} className="flex gap-4 relative pb-6 last:pb-0 group opacity-70">
                            <div className="absolute left-[9px] top-6 bottom-0 w-[2px] bg-gray-100"></div>
                            <div className="relative z-10 flex-shrink-0 w-5 h-5 rounded-full border-4 border-gray-50 bg-gray-400 shadow-sm mt-1"></div>
                            <div className="flex-1 -mt-1">
                                <span className="inline-flex items-center text-xs font-semibold text-gray-400 mb-1 bg-gray-50 px-1.5 py-0.5 rounded">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {activity.time}
                                </span>
                                <h4 className="text-sm font-bold text-gray-500 leading-tight mb-1">{activity.title}</h4>
                                <p className="text-xs text-gray-400">{activity.location.name}</p>
                            </div>
                        </div>
                    ))}

                    {/* Jeju Items */}
                    {jejuActivities.map((activity, idx) => (
                        <div key={activity.id} className="flex gap-4 relative pb-6 last:pb-0 group">
                            {idx !== jejuActivities.length - 1 && (
                                <div className="absolute left-[9px] top-6 bottom-0 w-[2px] bg-gray-100 group-hover:bg-blue-50 transition-colors"></div>
                            )}
                            <div className={`
                                relative z-10 flex-shrink-0 w-5 h-5 rounded-full border-4 border-white shadow-md mt-1
                                ${activity.type === 'flight' ? 'bg-blue-500' :
                                    activity.type === 'food' ? 'bg-orange-500' :
                                        activity.type === 'checkin' ? 'bg-purple-600' : 'bg-green-500'}
                            `}></div>
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
        </div>
    );
};

export default ScheduleMap;
