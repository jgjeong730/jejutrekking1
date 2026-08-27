import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tent, Home, Mountain, Trophy, MapPin, Clock, ExternalLink } from 'lucide-react';
import { REAL_SCHEDULE, TOTAL_BUDGET_ESTIMATE } from '../data/olleData';
import type { OlleDay } from '../data/olleData';
import { OLLE_COURSES } from '../data/olleCoursesData';
import type { OlleCourse } from '../data/olleCoursesData';

// jejuolle.org's course-detail pages follow /trail#/road/NN for the 21
// numbered main courses; the branch courses (1-1, 7-1 etc.) aren't confirmed
// to follow a predictable path, so they link to the course picker instead.
const officialCourseUrl = (id: number) =>
  Number.isInteger(id) && id >= 1 && id <= 21
    ? `https://www.jejuolle.org/trail#/road/${String(id).padStart(2, '0')}`
    : 'https://www.jejuolle.org/trail#/';

const TOTAL_DAYS = REAL_SCHEDULE.length;
const TOTAL_DISTANCE = REAL_SCHEDULE.reduce((s, d) => s + (d.distance ?? 0), 0);
const AVG_KM = Math.round((TOTAL_DISTANCE / TOTAL_DAYS) * 10) / 10;

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${d.getMonth() + 1}/${d.getDate()}(${days[d.getDay()]})`;
};

const OlleSchedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<OlleDay | null>(null);
  const activeDay = selectedDay ?? REAL_SCHEDULE[0];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-r from-sky-600 to-cyan-400 sticky top-0 z-10 shadow-sm">
        <div className="px-4 pt-4 pb-3">
          <h1 className="text-lg font-black text-white text-center">완주 일정표</h1>
          <p className="text-sky-100 text-xs text-center mt-0.5">2026.10.24 ~ 11.18 확정 일정</p>
        </div>
      </div>

      {/* Selected day detail */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-xs text-gray-400 mb-2">
          D{activeDay.day} · {formatDate(activeDay.date)}
          {activeDay.cumulative != null ? ` · 누적 ${activeDay.cumulative}km` : ''}
        </p>
        {activeDay.isSpecial === 'hallasan' ? (
          <HallasanDetailCard />
        ) : (
          <div className="space-y-2">
            {activeDay.courseIds.map((id) => {
              const course = OLLE_COURSES.find((c) => c.id === id);
              return course ? <CourseDetailCard key={id} course={course} /> : null;
            })}
          </div>
        )}
      </div>

      {/* Summary bar */}
      <div className="px-4 pt-2 pb-2">
        <div className="rounded-2xl p-4 bg-sky-600 text-white flex justify-between">
          <div className="text-center">
            <p className="text-2xl font-black">{TOTAL_DAYS}일</p>
            <p className="text-xs opacity-75 mt-0.5">총 일수</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black">{AVG_KM}km</p>
            <p className="text-xs opacity-75 mt-0.5">1일 평균</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black">27개</p>
            <p className="text-xs opacity-75 mt-0.5">코스(437km)</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-black">{Math.round(TOTAL_BUDGET_ESTIMATE / 10000)}만원</p>
            <p className="text-xs opacity-75 mt-0.5">예상 비용</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 pb-2">
        <div className="flex gap-3 text-xs text-gray-500 flex-wrap">
          <span className="flex items-center gap-1"><Home className="w-3 h-3 text-blue-500" /> 게스트하우스</span>
          <span className="flex items-center gap-1"><Tent className="w-3 h-3 text-amber-500" /> 캠핑</span>
          <span className="flex items-center gap-1"><Mountain className="w-3 h-3 text-orange-500" /> 한라산</span>
          <span className="flex items-center gap-1"><Trophy className="w-3 h-3 text-yellow-500" /> 완주</span>
        </div>
      </div>

      {/* Day cards */}
      <div className="px-4 space-y-2">
        {REAL_SCHEDULE.map((day) => (
          <DayCard
            key={day.day}
            day={day}
            isSelected={activeDay.day === day.day}
            onSelect={() => setSelectedDay(day)}
          />
        ))}
      </div>

      <div className="mx-4 mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-xs font-bold text-amber-700 mb-1">⚠️ 무휴식 연속 일정 안내</p>
        <p className="text-xs text-amber-600 leading-relaxed">
          26일간 휴식일 없이 매일 코스를 이어갑니다. 발바닥 물집·무릎 부하 대비 테이핑·압박스타킹 필수.
          우도(D5)·가파도(D16)·추자도(D25~D26)는 여객선 시간표에 따라 일정이 앞뒤로 밀릴 수 있으니 출발 전 최신 시간표를 꼭 확인하세요.
        </p>
      </div>
    </div>
  );
};

const DayCard: React.FC<{ day: OlleDay; isSelected: boolean; onSelect: () => void }> = ({ day, isSelected, onSelect }) => {
  const isHallasan = day.isSpecial === 'hallasan';
  const isComplete = day.isSpecial === 'complete';

  const dayBg = isHallasan ? 'bg-orange-500' : isComplete ? 'bg-yellow-500' : 'bg-sky-600';
  const cardBg = isHallasan
    ? 'bg-orange-50 border-orange-200'
    : isComplete
    ? 'bg-yellow-50 border-yellow-300'
    : 'bg-white border-gray-100';

  const AccomIcon = isHallasan ? Mountain : isComplete ? Trophy : day.accommodation === 'camping' ? Tent : Home;
  const accomColor = isHallasan ? 'text-orange-500' : isComplete ? 'text-yellow-600' : day.accommodation === 'camping' ? 'text-amber-500' : 'text-blue-500';

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-2xl p-3.5 border shadow-sm transition-all active:scale-98 ${cardBg} ${isSelected ? 'ring-2 ring-sky-500 ring-offset-1' : ''}`}
    >
      <div className="flex gap-3 items-start">
        <div className={`min-w-[42px] h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${dayBg}`}>
          <span className="text-white text-[9px] font-semibold leading-tight">{formatDate(day.date)}</span>
          <span className="text-white text-base font-black leading-tight">D{day.day}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-bold text-gray-900 text-sm leading-snug flex-1">{day.course}</p>
            <AccomIcon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${accomColor}`} />
          </div>
          <p className="text-xs text-gray-500 mt-0.5 leading-snug">{day.section}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {day.distance != null && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                {day.distance}km
              </span>
            )}
            {day.cumulative != null && (
              <span className="text-xs text-gray-400">
                누적 {day.cumulative}km
                {isComplete && ' 🎉'}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1 truncate">📍 {day.lodge}</p>
        </div>
      </div>
    </button>
  );
};

const difficultyColor = (d: OlleCourse['difficulty']) =>
  d === '어려움' ? 'text-red-500 bg-red-50' : d === '보통' ? 'text-amber-600 bg-amber-50' : 'text-green-600 bg-green-50';

const CourseDetailCard: React.FC<{ course: OlleCourse }> = ({ course }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
    <div className="flex items-center gap-2 mb-1">
      <span className="w-3.5 h-3.5 rounded-full flex-shrink-0 inline-block" style={{ background: course.color }} />
      <span className="font-black text-gray-900">{course.name}</span>
      {course.isAlt && <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">지선</span>}
    </div>
    <p className="text-xs text-gray-500 mb-3">{course.fullName}</p>

    <div className="grid grid-cols-3 gap-2 mb-3">
      <div className="bg-gray-50 rounded-xl p-2 text-center">
        <p className="text-[10px] text-gray-400 mb-0.5">거리</p>
        <p className="text-sm font-bold text-gray-800">{course.distance}km</p>
      </div>
      <div className="bg-gray-50 rounded-xl p-2 text-center">
        <p className="text-[10px] text-gray-400 mb-0.5">소요</p>
        <p className="text-sm font-bold text-gray-800">약 {course.duration}h</p>
      </div>
      <div className={`rounded-xl p-2 text-center ${difficultyColor(course.difficulty)}`}>
        <p className="text-[10px] opacity-70 mb-0.5">난이도</p>
        <p className="text-sm font-bold">{course.difficulty}</p>
      </div>
    </div>

    <div className="flex items-center gap-2 text-xs mb-3">
      <MapPin className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
      <span className="text-gray-700 font-medium truncate">{course.startPoint.name}</span>
      <span className="text-gray-300 flex-1 border-t border-dashed border-gray-200 mx-1" />
      <span className="text-gray-700 font-medium truncate">{course.endPoint.name}</span>
      <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
    </div>

    {course.description && <p className="text-xs text-gray-500 leading-relaxed mb-3">{course.description}</p>}

    <a
      href={officialCourseUrl(course.id)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-1.5 w-full bg-sky-50 text-sky-700 text-xs font-bold py-2.5 rounded-xl hover:bg-sky-100 transition-colors"
    >
      공식 코스 지도·고도·구간거리 보기
      <ExternalLink className="w-3.5 h-3.5" />
    </a>
  </div>
);

const HallasanDetailCard: React.FC = () => (
  <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-4">
    <div className="flex items-center gap-2 mb-1">
      <Mountain className="w-4 h-4 text-orange-500" />
      <span className="font-black text-gray-900">한라산 성판악 ↔ 관음사 종주</span>
    </div>
    <p className="text-xs text-gray-500 mb-3">국립공원 탐방예약시스템 사전 예약 필수 (무료)</p>

    <div className="grid grid-cols-3 gap-2 mb-3">
      <div className="bg-gray-50 rounded-xl p-2 text-center">
        <p className="text-[10px] text-gray-400 mb-0.5">총 거리</p>
        <p className="text-sm font-bold text-gray-800">19km</p>
      </div>
      <div className="bg-gray-50 rounded-xl p-2 text-center">
        <p className="text-[10px] text-gray-400 mb-0.5">소요</p>
        <p className="text-sm font-bold text-gray-800">약 8h</p>
      </div>
      <div className="rounded-xl p-2 text-center text-red-500 bg-red-50">
        <p className="text-[10px] opacity-70 mb-0.5">난이도</p>
        <p className="text-sm font-bold">중~상</p>
      </div>
    </div>

    <div className="flex items-start gap-2 text-xs text-gray-500 mb-3">
      <Clock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
      <span>정상 입산 마감 12:00(성판악 기준) · 05:30 출발 권장 · 진달래밭 대피소에서 점심</span>
    </div>

    <Link
      to="/courses"
      className="flex items-center justify-center gap-1.5 w-full bg-orange-50 text-orange-700 text-xs font-bold py-2.5 rounded-xl hover:bg-orange-100 transition-colors"
    >
      한라산 등반 정보 자세히 보기
    </Link>
  </div>
);

export default OlleSchedule;
