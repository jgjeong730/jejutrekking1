import React, { useEffect, useRef, useState, useCallback } from 'react';
import { OLLE_COURSES } from '../data/olleCoursesData';
import type { OlleCourse } from '../data/olleCoursesData';

const JEJU_CENTER = { lat: 33.3617, lng: 126.5292 };

interface NaverOlleMapProps {
  completedCourses: number[];
  onCourseSelect: (course: OlleCourse) => void;
}

type MapStatus = 'loading' | 'ready' | 'error';

const NaverOlleMap: React.FC<NaverOlleMapProps> = ({ completedCourses, onCourseSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<naver.maps.Map | null>(null);
  const polylinesRef = useRef<Map<number, naver.maps.Polyline>>(new Map());
  const markersRef = useRef<Map<number, naver.maps.Marker>>(new Map());
  const [mapStatus, setMapStatus] = useState<MapStatus>('loading');

  // Initialize Naver Map
  const initMap = useCallback(() => {
    if (!containerRef.current || mapRef.current) return;
    try {
      mapRef.current = new window.naver.maps.Map(containerRef.current, {
        center: new window.naver.maps.LatLng(JEJU_CENTER.lat, JEJU_CENTER.lng),
        zoom: 10,
        mapTypeId: window.naver.maps.MapTypeId?.NORMAL ?? 'normal',
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
        zoomControl: true,
        mapTypeControl: false,
      });
      setMapStatus('ready');
    } catch (e) {
      console.error('Naver Map init failed:', e);
      setMapStatus('error');
    }
  }, []);

  // Poll for naver maps SDK to load
  useEffect(() => {
    if (window.naver?.maps) { initMap(); return; }
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (window.naver?.maps) { clearInterval(interval); initMap(); }
      else if (attempts > 50) { clearInterval(interval); setMapStatus('error'); }
    }, 200);
    return () => clearInterval(interval);
  }, [initMap]);

  // Draw / update polylines + markers whenever status or completedCourses changes
  useEffect(() => {
    if (mapStatus !== 'ready' || !mapRef.current) return;
    const map = mapRef.current;

    OLLE_COURSES.forEach(course => {
      const isDone = completedCourses.includes(course.id);

      // --- Polyline ---
      const path = course.waypoints.map(
        p => new window.naver.maps.LatLng(p.lat, p.lng)
      );

      const strokeColor = isDone ? '#2E9E5B' : course.isAlt ? '#AAAAAA' : '#CCCCCC';
      const strokeWeight = isDone ? 4 : 3;
      const strokeOpacity = isDone ? 1 : course.isAlt ? 0.4 : 0.6;

      if (polylinesRef.current.has(course.id)) {
        const pl = polylinesRef.current.get(course.id)!;
        pl.setOptions({ strokeColor, strokeWeight, strokeOpacity });
      } else {
        const pl = new window.naver.maps.Polyline({
          map,
          path,
          strokeColor,
          strokeWeight,
          strokeOpacity,
          strokeStyle: 'solid',
          clickable: true,
        });
        window.naver.maps.Event.addListener(pl, 'click', () => onCourseSelect(course));
        polylinesRef.current.set(course.id, pl);
      }

      // --- Start marker (only main courses) ---
      if (!course.isAlt) {
        const pos = new window.naver.maps.LatLng(
          course.startPoint.lat, course.startPoint.lng
        );
        const bgColor = isDone ? '#2E9E5B' : '#FFFFFF';
        const textColor = isDone ? '#FFFFFF' : '#666666';
        const borderColor = isDone ? '#2E9E5B' : '#CCCCCC';
        const label = course.id > 100
          ? `${Math.floor(course.id / 10)}A`
          : `${course.id}`;

        const content = `
          <div style="
            width:28px;height:28px;border-radius:50%;
            background:${bgColor};border:2px solid ${borderColor};
            display:flex;align-items:center;justify-content:center;
            font-size:10px;font-weight:bold;color:${textColor};
            cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,0.2);
          ">${label}</div>`;

        if (markersRef.current.has(course.id)) {
          const mk = markersRef.current.get(course.id)!;
          mk.setIcon({ content, anchor: new window.naver.maps.Point(14, 14) });
        } else {
          const mk = new window.naver.maps.Marker({
            map,
            position: pos,
            icon: { content, anchor: new window.naver.maps.Point(14, 14) },
            clickable: true,
          });
          window.naver.maps.Event.addListener(mk, 'click', () => onCourseSelect(course));
          markersRef.current.set(course.id, mk);
        }
      }
    });
  }, [mapStatus, completedCourses, onCourseSelect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      polylinesRef.current.forEach(pl => pl.setMap(null));
      markersRef.current.forEach(mk => mk.setMap(null));
      mapRef.current?.destroy?.();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Map container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Loading overlay */}
      {mapStatus === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500 mb-3" />
          <p className="text-sm text-gray-500">네이버 지도 로딩 중...</p>
        </div>
      )}

      {/* Error overlay */}
      {mapStatus === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
          <p className="text-2xl mb-2">🗺️</p>
          <p className="font-bold text-gray-700 mb-1">네이버 지도를 불러올 수 없습니다</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            index.html의 ncpClientId를<br />
            발급받은 Client ID로 교체해주세요
          </p>
          <code className="mt-3 text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600 break-all">
            YOUR_NAVER_CLIENT_ID
          </code>
        </div>
      )}
    </div>
  );
};

export default NaverOlleMap;
