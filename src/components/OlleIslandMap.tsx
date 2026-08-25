import { useMemo } from 'react';
import { OLLE_COURSES } from '../data/olleCoursesData';
import { HALLASAN_COORD, COURSE_DAY_MAP, HALLASAN_DAY } from '../data/olleData';

const formatMD = (iso: string) => {
  const [, m, d] = iso.split('-');
  return `${Number(m)}/${Number(d)}`;
};

// Simple equirectangular projection tuned to Jeju's real lat/lng bounding box,
// scaled so 1° lng and 1° lat cover roughly the same real-world distance
// (1° lng ≈ 92.9km, 1° lat ≈ 111km at this latitude) — keeps the island's
// proportions honest instead of stretching it into a generic oval.
const LNG0 = 126.16;
const LAT0 = 33.57;
const SCALE_X = 683.5;
const SCALE_Y = 816.6;
const MARGIN = 50;

function project(lat: number, lng: number) {
  return { x: MARGIN + (lng - LNG0) * SCALE_X, y: MARGIN + (LAT0 - lat) * SCALE_Y };
}

// Coastal waypoints in trail order (18→21→1→…→17), traced from each course's
// real start/end coordinates — since the Olle trail hugs the coast almost the
// entire way, this doubles as a reasonable island silhouette. Course 13's
// inland leg to 저지 is skipped so the coastline stays clean.
const COASTLINE: [number, number][] = [
  [33.5140, 126.5290], [33.5400, 126.6370], [33.5510, 126.7620], [33.5254, 126.8567],
  [33.4972, 126.9181], [33.4629, 126.9206], [33.4460, 126.9270], [33.4188, 126.8937],
  [33.3255, 126.8340], [33.2795, 126.7168], [33.2472, 126.6260], [33.2515, 126.5622],
  [33.2453, 126.5117], [33.2277, 126.4283], [33.2334, 126.3592], [33.2136, 126.2513],
  [33.2586, 126.1913], [33.2949, 126.1656], [33.4130, 126.2690], [33.4638, 126.3520],
  [33.4701, 126.4174],
];

interface Badge {
  id: number;
  label: string;
  color: string;
  dot: { x: number; y: number };
  pos: { x: number; y: number };
}

// Manual nudges for courses whose real coastal midpoint would collide with a
// neighbor, or whose real location (an offshore island) needs to be pulled
// toward the frame instead of pushed radially like the mainland courses.
const NUDGE: Record<number, { dx: number; dy: number; out?: number }> = {
  1.1: { dx: -6, dy: -8, out: 14 },    // 우도 — pull NE, out to sea (kept inside the frame)
  10.1: { dx: -4, dy: 0, out: 8 },     // 가파도 — pull south, out to sea
  7.1: { dx: -14, dy: -18 },           // inland spur, tuck above course 7
  14.1: { dx: 10, dy: 14 },            // inland spur, tuck below course 14
  13: { dx: 10, dy: -8 },              // 13 cuts inland; nudge off the coast dot
};

export default function OlleIslandMap() {
  const { islandPath, badges, centroid, hallasan } = useMemo(() => {
    const pts = COASTLINE.map(([lat, lng]) => project(lat, lng));
    const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
    const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;

    const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';

    const list: Badge[] = OLLE_COURSES.filter(c => c.id !== 18.1 && c.id !== 18.2).map(course => {
      const midLat = (course.startPoint.lat + course.endPoint.lat) / 2;
      const midLng = (course.startPoint.lng + course.endPoint.lng) / 2;
      const dot = project(midLat, midLng);
      const nudge = NUDGE[course.id];

      let pos: { x: number; y: number };
      if (nudge?.out) {
        const dx = dot.x - cx, dy = dot.y - cy;
        const len = Math.hypot(dx, dy) || 1;
        pos = { x: dot.x + (dx / len) * nudge.out + nudge.dx, y: dot.y + (dy / len) * nudge.out + nudge.dy };
      } else {
        const dx = dot.x - cx, dy = dot.y - cy;
        const len = Math.hypot(dx, dy) || 1;
        const out = 26;
        pos = {
          x: dot.x + (dx / len) * out + (nudge?.dx ?? 0),
          y: dot.y + (dy / len) * out + (nudge?.dy ?? 0),
        };
      }

      const num = course.name.replace('코스', '');
      const day = COURSE_DAY_MAP[course.id];
      const label = !course.isAlt && day != null ? `D${day}/${num}` : num;

      return {
        id: course.id,
        label,
        color: course.color,
        dot,
        pos,
      };
    });

    const hallasanRaw = project(HALLASAN_COORD.lat, HALLASAN_COORD.lng);
    // Nudge the peak away from the centroid so it doesn't sit under the title.
    const hallasan = { x: hallasanRaw.x - 6, y: hallasanRaw.y + 58 };

    return { islandPath: path, badges: list, centroid: { x: cx, y: cy }, hallasan };
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-sky-100 bg-sky-50">
      <svg viewBox="0 0 660 430" className="w-full h-auto block">
        {/* sea */}
        <rect x="0" y="0" width="660" height="430" fill="#eaf6fc" />

        {/* Chuja-do inset (~100km offshore, drawn out of true position) */}
        <g transform="translate(14,14)">
          <rect x="0" y="0" width="70" height="46" rx="10" fill="#ffffff" stroke="#bcdff2" strokeWidth="1" />
          <text x="35" y="15" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0369a1">추자도</text>
          <circle cx="20" cy="28" r="9" fill="#5499C7" />
          <text x="20" y="31" textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff">18-1</text>
          <circle cx="50" cy="28" r="9" fill="#2E86C1" />
          <text x="50" y="31" textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff">18-2</text>
          <text x="35" y="42" textAnchor="middle" fontSize="6" fill="#64748b">제주항 배 1h</text>
        </g>

        {/* island */}
        <path d={islandPath} fill="#f7faf5" stroke="#cfe3d6" strokeWidth="2" strokeLinejoin="round" />

        {/* Hallasan */}
        <g transform={`translate(${hallasan.x},${hallasan.y})`}>
          <path d="M -7 6 L 0 -8 L 7 6 Z" fill="#f97316" />
          <text x="0" y="20" textAnchor="middle" fontSize="8" fontWeight="700" fill="#c2410c">
            한라산{HALLASAN_DAY ? ` · ${formatMD(HALLASAN_DAY.date)}` : ''}
          </text>
        </g>

        {/* center title */}
        <text x={centroid.x} y={centroid.y - 6} textAnchor="middle" fontSize="11" fill="#64748b">제주를 한 바퀴</text>
        <text x={centroid.x} y={centroid.y + 14} textAnchor="middle" fontSize="20" fontWeight="900" fill="#0369a1">
          437km 27코스
        </text>

        {/* course dots + connector + badge */}
        {badges.map(b => {
          const r = b.label.length >= 5 ? 15.5 : b.label.length > 2 ? 13 : 10.5;
          const fs = b.label.length >= 5 ? 7 : b.label.length > 2 ? 8 : 9.5;
          return (
            <g key={b.id}>
              <circle cx={b.dot.x} cy={b.dot.y} r="2.5" fill={b.color} />
              <line x1={b.dot.x} y1={b.dot.y} x2={b.pos.x} y2={b.pos.y} stroke={b.color} strokeWidth="0.75" opacity="0.6" />
              <circle cx={b.pos.x} cy={b.pos.y} r={r} fill="#ffffff" stroke={b.color} strokeWidth="1.5" />
              <text x={b.pos.x} y={b.pos.y + 3.2} textAnchor="middle" fontSize={fs} fontWeight="700" fill="#334155">
                {b.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
