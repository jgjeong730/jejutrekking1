import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, PolylineF, MarkerF } from '@react-google-maps/api';
import { OLLE_COURSES } from '../data/olleCoursesData';
import type { OlleCourse } from '../data/olleCoursesData';

const JEJU_CENTER = { lat: 33.3617, lng: 126.5292 };
const MAP_OPTIONS = { disableDefaultUI: true, zoomControl: true, gestureHandling: 'greedy' as const };

interface TrackerMapProps {
  completedCourses: number[];
  onCourseSelect: (course: OlleCourse) => void;
}

const TrackerMap: React.FC<TrackerMapProps> = ({ completedCourses, onCourseSelect }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const onLoad = useCallback((m: google.maps.Map) => setMap(m), []);

  useEffect(() => {
    if (!map || !isLoaded) return;
    const bounds = new window.google.maps.LatLngBounds();
    OLLE_COURSES.forEach(c => c.waypoints.forEach(p => bounds.extend(p)));
    map.fitBounds(bounds, 16);
  }, [map, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500 mb-3" />
        <p className="text-sm text-gray-500">지도 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={JEJU_CENTER}
        zoom={10}
        onLoad={onLoad}
        options={MAP_OPTIONS}
      >
        {OLLE_COURSES.map(course => {
          const isDone = completedCourses.includes(course.id);
          const path = course.waypoints.map(p => ({ lat: p.lat, lng: p.lng }));
          return (
            <PolylineF
              key={course.id}
              path={path}
              options={{
                strokeColor: isDone ? '#2E9E5B' : course.isAlt ? '#AAAAAA' : '#CCCCCC',
                strokeWeight: isDone ? 4 : 3,
                strokeOpacity: isDone ? 1 : course.isAlt ? 0.4 : 0.6,
                clickable: true,
                zIndex: isDone ? 2 : 1,
              }}
              onClick={() => onCourseSelect(course)}
            />
          );
        })}

        {OLLE_COURSES.filter(c => !c.isAlt).map(course => {
          const isDone = completedCourses.includes(course.id);
          const label = course.name.replace('코스', '');
          return (
            <MarkerF
              key={`marker-${course.id}`}
              position={course.startPoint}
              title={`${course.name} · ${course.fullName}`}
              onClick={() => onCourseSelect(course)}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 14,
                fillColor: isDone ? '#2E9E5B' : '#FFFFFF',
                fillOpacity: 1,
                strokeColor: isDone ? '#2E9E5B' : '#CCCCCC',
                strokeWeight: 2,
              }}
              label={{ text: label, color: isDone ? '#FFFFFF' : '#666666', fontSize: '10px', fontWeight: 'bold' }}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default TrackerMap;
