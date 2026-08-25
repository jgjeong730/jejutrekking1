import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, PolylineF, MarkerF } from '@react-google-maps/api';
import { LocateFixed, LoaderCircle } from 'lucide-react';
import { OLLE_COURSES } from '../data/olleCoursesData';
import type { OlleCourse } from '../data/olleCoursesData';
import { COURSE_DAY_MAP, HALLASAN_COORD, HALLASAN_DAY } from '../data/olleData';

const formatMD = (iso: string) => {
  const [, m, d] = iso.split('-');
  return `${Number(m)}/${Number(d)}`;
};

const JEJU_CENTER = { lat: 33.3617, lng: 126.5292 };
const MAP_OPTIONS = { disableDefaultUI: true, zoomControl: true, gestureHandling: 'greedy' as const };

interface TrackerMapProps {
  completedCourses: number[];
  onCourseSelect: (course: OlleCourse) => void;
}

const TrackerMap: React.FC<TrackerMapProps> = ({ completedCourses, onCourseSelect }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState<string | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const onLoad = useCallback((m: google.maps.Map) => setMap(m), []);

  useEffect(() => {
    if (!map || !isLoaded) return;
    const bounds = new window.google.maps.LatLngBounds();
    // Chuja-do (18-1/18-2) sits ~100km north of the main island — including it
    // in the fit would zoom out so far that Jeju itself looks tiny. Keep the
    // initial view on the main island + Udo/Gapado, which sit right off its coast.
    OLLE_COURSES.filter(c => c.id !== 18.1 && c.id !== 18.2)
      .forEach(c => c.waypoints.forEach(p => bounds.extend(p)));
    map.fitBounds(bounds, 16);
  }, [map, isLoaded]);

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) {
      setLocateError('이 브라우저는 위치 확인을 지원하지 않아요');
      return;
    }
    setLocating(true);
    setLocateError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setMyLocation(loc);
        setLocating(false);
        map?.panTo(loc);
        map?.setZoom(15);
      },
      (err) => {
        setLocating(false);
        setLocateError(
          err.code === err.PERMISSION_DENIED
            ? '위치 권한이 꺼져 있어요. 브라우저 설정에서 허용해주세요'
            : '현재 위치를 가져올 수 없어요'
        );
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [map]);

  if (!isLoaded) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-500 mb-3" />
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
                strokeColor: isDone ? '#0284C7' : course.isAlt ? '#AAAAAA' : '#CCCCCC',
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
          const num = course.name.replace('코스', '');
          const day = COURSE_DAY_MAP[course.id];
          const label = day != null ? `D${day}/${num}` : num;
          return (
            <MarkerF
              key={`marker-${course.id}`}
              position={course.startPoint}
              title={`${course.name} · ${course.fullName}${day != null ? ` · D${day}` : ''}`}
              onClick={() => onCourseSelect(course)}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 19,
                fillColor: isDone ? '#0284C7' : '#FFFFFF',
                fillOpacity: 1,
                strokeColor: isDone ? '#0284C7' : '#CCCCCC',
                strokeWeight: 2,
              }}
              label={{ text: label, color: isDone ? '#FFFFFF' : '#666666', fontSize: '8px', fontWeight: 'bold' }}
            />
          );
        })}

        {HALLASAN_DAY && (
          <MarkerF
            position={HALLASAN_COORD}
            title={`한라산 성판악~관음사 · D${HALLASAN_DAY.day} · ${HALLASAN_DAY.date}`}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 19,
              fillColor: '#f97316',
              fillOpacity: 1,
              strokeColor: '#f97316',
              strokeWeight: 2,
            }}
            label={{ text: formatMD(HALLASAN_DAY.date), color: '#ffffff', fontSize: '8px', fontWeight: 'bold' }}
          />
        )}

        {myLocation && (
          <MarkerF
            position={myLocation}
            title="내 위치"
            zIndex={999}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
            }}
          />
        )}
      </GoogleMap>

      {/* Locate-me control */}
      <div className="absolute bottom-4 right-3 z-10 flex flex-col items-end gap-1.5">
        {locateError && (
          <p className="bg-white/95 backdrop-blur text-xs text-red-500 px-3 py-1.5 rounded-xl shadow-sm max-w-[180px] text-right">
            {locateError}
          </p>
        )}
        <button
          onClick={handleLocate}
          disabled={locating}
          className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center active:scale-95 transition-transform disabled:opacity-60"
          aria-label="내 위치로 이동"
        >
          {locating ? (
            <LoaderCircle className="w-5 h-5 text-sky-600 animate-spin" />
          ) : (
            <LocateFixed className="w-5 h-5 text-sky-600" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TrackerMap;
