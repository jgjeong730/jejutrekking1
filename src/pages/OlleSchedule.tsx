import React, { useState } from 'react';
import { Tent, Home, Mountain, Pause, Trophy } from 'lucide-react';
import { STANDARD_SCHEDULE, TIGHT_SCHEDULE } from '../data/olleData';
import type { OlleDay } from '../data/olleData';
import OlleMap from '../components/OlleMap';

const OlleSchedule: React.FC = () => {
  const [mode, setMode] = useState<'standard' | 'tight'>('standard');
  const [selectedDay, setSelectedDay] = useState<OlleDay | null>(null);
  const schedule = mode === 'standard' ? STANDARD_SCHEDULE : TIGHT_SCHEDULE;
  const totalDays = mode === 'standard' ? 22 : 17;
  const avgKm = mode === 'standard' ? 21 : 25;
  const budget = mode === 'standard' ? '114만원' : '87만원';
  const accentColor = mode === 'standard' ? 'green' : 'orange';
  const activeDay = selectedDay ?? schedule[0];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className={`bg-gradient-to-r ${mode === 'standard' ? 'from-green-700 to-emerald-500' : 'from-orange-600 to-amber-500'} sticky top-0 z-10 shadow-sm`}>
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-lg font-black text-white text-center">완주 일정표</h1>
        </div>
        <div className="flex gap-2 px-4 pb-3">
          <button
            onClick={() => setMode('standard')}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
              mode === 'standard' ? 'bg-white text-green-700 shadow' : 'bg-white/20 text-white'
            }`}
          >
            표준 22일
          </button>
          <button
            onClick={() => setMode('tight')}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
              mode === 'tight' ? 'bg-white text-orange-600 shadow' : 'bg-white/20 text-white'
            }`}
          >
            타이트 17일
          </button>
        </div>
      </div>

      {/* Map: shows selected day's position on the trail */}
      <div className="px-4 pt-4 pb-2">
        <OlleMap
          mode="day"
          height="180px"
          selectedLat={activeDay.lat}
          selectedLng={activeDay.lng}
          selectedLabel={`D${activeDay.day}`}
          completedRouteIdx={activeDay.routeIdx >= 0 ? activeDay.routeIdx : undefined}
          interactive
        />
        <p className="text-xs text-gray-400 text-center mt-1">
          D{activeDay.day} · {activeDay.course}
          {activeDay.cumulative ? ` · 누적 ${activeDay.cumulative}km` : ''}
        </p>
      </div>

      {/* Summary bar */}
      <div className="px-4 pt-2 pb-2">
        <div className={`rounded-2xl p-4 ${mode === 'standard' ? 'bg-green-600' : 'bg-orange-500'} text-white flex justify-between`}>
          <div className="text-center">
            <p className="text-2xl font-black">{totalDays}일</p>
            <p className="text-xs opacity-75 mt-0.5">총 일수</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black">{avgKm}km</p>
            <p className="text-xs opacity-75 mt-0.5">1일 평균</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black">437km</p>
            <p className="text-xs opacity-75 mt-0.5">총 거리</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-black">{budget}</p>
            <p className="text-xs opacity-75 mt-0.5">예상 비용</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 pb-2">
        <div className="flex gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Home className="w-3 h-3 text-blue-500" /> 게스트하우스</span>
          <span className="flex items-center gap-1"><Tent className="w-3 h-3 text-amber-500" /> 캠핑</span>
          <span className="flex items-center gap-1"><Mountain className="w-3 h-3 text-orange-500" /> 한라산</span>
          <span className="flex items-center gap-1"><Pause className="w-3 h-3 text-purple-500" /> 휴식</span>
        </div>
      </div>

      {/* Day cards */}
      <div className="px-4 space-y-2">
        {schedule.map((day) => (
          <DayCard
            key={day.day}
            day={day}
            accentColor={accentColor}
            isSelected={activeDay.day === day.day}
            onSelect={() => setSelectedDay(day)}
          />
        ))}
      </div>

      {mode === 'tight' && (
        <div className="mx-4 mt-4 bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-xs font-bold text-red-700 mb-1">⚠️ 타이트 일정 주의사항</p>
          <p className="text-xs text-red-600 leading-relaxed">
            하루 2코스 병합 구간 다수 (최대 30km). 발바닥 물집·무릎 부하 대비 테이핑·압박스타킹 필수. 한라산 등반 다음 날은 단코스로 배치.
          </p>
        </div>
      )}
    </div>
  );
};

const DayCard: React.FC<{ day: OlleDay; accentColor: string; isSelected: boolean; onSelect: () => void }> = ({ day, accentColor, isSelected, onSelect }) => {
  const isHallasan = day.isSpecial === 'hallasan';
  const isRest = day.isSpecial === 'rest';
  const isComplete = day.isSpecial === 'complete';

  const dayBg = isHallasan
    ? 'bg-orange-500'
    : isRest
    ? 'bg-purple-500'
    : isComplete
    ? 'bg-yellow-500'
    : accentColor === 'green'
    ? 'bg-green-600'
    : 'bg-orange-500';

  const cardBg = isHallasan
    ? 'bg-orange-50 border-orange-200'
    : isRest
    ? 'bg-purple-50 border-purple-200'
    : isComplete
    ? 'bg-yellow-50 border-yellow-300'
    : 'bg-white border-gray-100';

  const AccomIcon =
    isHallasan ? Mountain
    : isRest ? Pause
    : isComplete ? Trophy
    : day.accommodation === 'camping' ? Tent : Home;

  const accomColor =
    isHallasan ? 'text-orange-500'
    : isRest ? 'text-purple-500'
    : isComplete ? 'text-yellow-600'
    : day.accommodation === 'camping' ? 'text-amber-500' : 'text-blue-500';

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-2xl p-3.5 border shadow-sm transition-all active:scale-98 ${cardBg} ${isSelected ? 'ring-2 ring-green-500 ring-offset-1' : ''}`}
    >
      <div className="flex gap-3 items-start">
        <div className={`min-w-[42px] h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${dayBg}`}>
          <span className="text-white text-[9px] font-semibold leading-tight">D</span>
          <span className="text-white text-base font-black leading-tight">{day.day}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-bold text-gray-900 text-sm leading-snug flex-1">{day.course}</p>
            <AccomIcon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${accomColor}`} />
          </div>
          <p className="text-xs text-gray-500 mt-0.5 leading-snug">{day.section}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {day.distance && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                {day.distance}km
              </span>
            )}
            {day.cumulative && (
              <span className="text-xs text-gray-400">
                누적 {day.cumulative}km
                {day.cumulative === 437 && ' 🎉'}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1 truncate">📍 {day.lodge}</p>
        </div>
      </div>
    </button>
  );
};

export default OlleSchedule;
