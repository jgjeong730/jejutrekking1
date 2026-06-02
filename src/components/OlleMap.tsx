import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, PolylineF, MarkerF } from '@react-google-maps/api';
import { OLLE_ROUTE, HALLASAN_COORD } from '../data/olleData';

const JEJU_CENTER = { lat: 33.3617, lng: 126.5292 };
const MAP_OPTIONS = { disableDefaultUI: true, zoomControl: false, gestureHandling: 'none' as const };
const MAP_OPTIONS_INTERACTIVE = { disableDefaultUI: true, zoomControl: true, gestureHandling: 'cooperative' as const };

interface OlleMapProps {
  /** 'overview': full circuit, no day selection | 'day': highlight a specific route waypoint */
  mode: 'overview' | 'day';
  height?: string;
  selectedLat?: number;
  selectedLng?: number;
  selectedLabel?: string;
  /** routeIdx of the selected day; completed portion shown solid */
  completedRouteIdx?: number;
  interactive?: boolean;
}

const OlleMap: React.FC<OlleMapProps> = ({
  mode,
  height = '220px',
  selectedLat,
  selectedLng,
  selectedLabel,
  completedRouteIdx,
  interactive = false,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const onLoad = useCallback((m: google.maps.Map) => setMap(m), []);

  // Fit bounds to show full Jeju circuit in overview; zoom to selected in day mode
  useEffect(() => {
    if (!map || !isLoaded) return;
    if (mode === 'overview') {
      const bounds = new window.google.maps.LatLngBounds();
      OLLE_ROUTE.forEach((p) => bounds.extend(p));
      map.fitBounds(bounds, 16);
    } else if (selectedLat && selectedLng) {
      map.panTo({ lat: selectedLat, lng: selectedLng });
      map.setZoom(11);
    }
  }, [map, isLoaded, mode, selectedLat, selectedLng]);

  const fullRoute = OLLE_ROUTE.map((p) => ({ lat: p.lat, lng: p.lng }));

  // Split into completed and remaining segments
  const completedPath =
    completedRouteIdx !== undefined && completedRouteIdx >= 0
      ? fullRoute.slice(0, completedRouteIdx + 1)
      : [];
  const remainingPath =
    completedRouteIdx !== undefined && completedRouteIdx >= 0
      ? fullRoute.slice(completedRouteIdx)
      : fullRoute;

  const containerStyle = { width: '100%', height };

  if (!isLoaded) {
    return (
      <div style={{ height }} className="flex items-center justify-center bg-gray-100 rounded-2xl">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={JEJU_CENTER}
        zoom={10}
        onLoad={onLoad}
        options={interactive ? MAP_OPTIONS_INTERACTIVE : MAP_OPTIONS}
      >
        {/* Remaining (or full) trail — dashed lighter green */}
        <PolylineF
          path={remainingPath}
          options={{
            strokeColor: '#6EE7B7',
            strokeOpacity: 0.7,
            strokeWeight: 3,
          }}
        />

        {/* Completed portion — solid green */}
        {completedPath.length > 1 && (
          <PolylineF
            path={completedPath}
            options={{
              strokeColor: '#059669',
              strokeOpacity: 1,
              strokeWeight: 4,
            }}
          />
        )}

        {/* Airport / start marker */}
        <MarkerF
          position={OLLE_ROUTE[0]}
          title={OLLE_ROUTE[0].label}
          icon={{
            path: 'M 0,-1 0,1',
            strokeOpacity: 0,
            scale: 0,
          }}
          label={{ text: '✈', color: '#059669', fontSize: '16px', fontWeight: 'bold' }}
        />

        {/* Completion marker (same lat/lng as airport — the loop closes here) */}
        <MarkerF
          position={OLLE_ROUTE[OLLE_ROUTE.length - 1]}
          title={OLLE_ROUTE[OLLE_ROUTE.length - 1].label}
          label={{ text: '🏁', color: '#fff', fontSize: '14px' }}
          icon={{
            path: 'M 0,-1 0,1',
            strokeOpacity: 0,
            scale: 0,
          }}
        />

        {/* Hallasan marker */}
        <MarkerF
          position={HALLASAN_COORD}
          title={HALLASAN_COORD.label}
          label={{ text: '⛰', color: '#fff', fontSize: '14px' }}
          icon={{
            path: 'M 0,-1 0,1',
            strokeOpacity: 0,
            scale: 0,
          }}
        />

        {/* Selected day marker */}
        {selectedLat && selectedLng && (
          <MarkerF
            position={{ lat: selectedLat, lng: selectedLng }}
            title={selectedLabel}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#059669',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }}
            label={selectedLabel ? { text: selectedLabel.slice(0, 2), color: '#fff', fontSize: '10px', fontWeight: 'bold' } : undefined}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default OlleMap;
