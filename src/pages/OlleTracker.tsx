import React, { useState, useCallback } from 'react';
import { Trophy, TrendingUp, List } from 'lucide-react';
import NaverOlleMap from '../components/NaverOlleMap';
import CourseBottomSheet from '../components/CourseBottomSheet';
import { useOlleProgress } from '../hooks/useOlleProgress';
import { OLLE_COURSES } from '../data/olleCoursesData';
import type { OlleCourse } from '../data/olleCoursesData';

type ViewMode = 'map' | 'list';

const OlleTracker: React.FC = () => {
  const {
    completedCourses, completedMainCount, totalCourseCount,
    totalDistance, totalRemainingDistance, progressRate,
    addCompletion, removeCompletion, getRecord, isCompleted,
  } = useOlleProgress();

  const [selectedCourse, setSelectedCourse] = useState<OlleCourse | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('map');

  const handleCourseSelect = useCallback((course: OlleCourse) => {
    setSelectedCourse(course);
  }, []);

  const handleClose = useCallback(() => setSelectedCourse(null), []);

  const handleComplete = useCallback((record: Parameters<typeof addCompletion>[0]) => {
    addCompletion(record);
    setSelectedCourse(null);
  }, [addCompletion]);

  const handleRemove = useCallback((courseId: number) => {
    removeCompletion(courseId);
    setSelectedCourse(null);
  }, [removeCompletion]);

  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex-none bg-white border-b border-gray-100 px-4 pt-3 pb-2 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-black text-gray-900 leading-tight">올레길 완주 트래커</h1>
            <p className="text-xs text-gray-400">코스를 탭해 완주를 기록하세요</p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${viewMode === 'map' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              지도
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              목록
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{completedMainCount} / {totalCourseCount} 코스 완주</span>
            <span className="font-bold text-green-600">{progressRate}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${progressRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        {viewMode === 'map' ? (
          <>
            {/* Progress overlay (top-right) */}
            <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur rounded-2xl shadow-md p-3 min-w-[130px]">
              <div className="flex items-center gap-1.5 mb-1">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-black text-gray-800">
                  {completedMainCount}/{totalCourseCount} 코스
                </span>
              </div>
              <div className="text-xs text-gray-500">
                <span className="text-green-600 font-bold">{totalDistance.toFixed(1)}km</span> 완주
              </div>
              <div className="text-xs text-gray-400">
                {totalRemainingDistance.toFixed(1)}km 남음
              </div>
              <div className="mt-1.5 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${progressRate}%` }}
                />
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-3 z-10 bg-white/90 backdrop-blur rounded-xl px-3 py-2 shadow-sm">
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-4 h-1 bg-green-600 rounded inline-block" /> 완주
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-4 h-1 bg-gray-300 rounded inline-block" /> 미완주
                </span>
              </div>
            </div>

            <NaverOlleMap
              completedCourses={completedCourses}
              onCourseSelect={handleCourseSelect}
            />
          </>
        ) : (
          <CourseListView
            completedCourses={completedCourses}
            onCourseSelect={(c) => { handleCourseSelect(c); setViewMode('map'); }}
          />
        )}
      </div>

      {/* Bottom sheet */}
      {selectedCourse && (
        <CourseBottomSheet
          course={selectedCourse}
          isCompleted={isCompleted(selectedCourse.id)}
          existingRecord={getRecord(selectedCourse.id)}
          onClose={handleClose}
          onComplete={handleComplete}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
};

const CourseListView: React.FC<{
  completedCourses: number[];
  onCourseSelect: (c: OlleCourse) => void;
}> = ({ completedCourses, onCourseSelect }) => {
  const mainCourses = OLLE_COURSES.filter(c => !c.isAlt);
  const altCourses = OLLE_COURSES.filter(c => c.isAlt);

  return (
    <div className="h-full overflow-y-auto pb-6">
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2 mb-3">
          <List className="w-4 h-4 text-green-600" />
          <p className="text-sm font-bold text-gray-700">정규 코스 ({mainCourses.length})</p>
        </div>
        <div className="space-y-2">
          {mainCourses.map(course => (
            <CourseListItem
              key={course.id}
              course={course}
              isDone={completedCourses.includes(course.id)}
              onSelect={onCourseSelect}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 mb-3 mt-5">
          <TrendingUp className="w-4 h-4 text-gray-400" />
          <p className="text-sm font-bold text-gray-500">지선 코스 ({altCourses.length})</p>
        </div>
        <div className="space-y-2">
          {altCourses.map(course => (
            <CourseListItem
              key={course.id}
              course={course}
              isDone={completedCourses.includes(course.id)}
              onSelect={onCourseSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CourseListItem: React.FC<{
  course: OlleCourse;
  isDone: boolean;
  onSelect: (c: OlleCourse) => void;
}> = ({ course, isDone, onSelect }) => (
  <button
    onClick={() => onSelect(course)}
    className={`w-full text-left rounded-2xl p-4 border shadow-sm flex items-center gap-3 transition-all active:scale-98 ${isDone ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100'}`}
  >
    <span
      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-black text-white"
      style={{ background: isDone ? '#2E9E5B' : course.color }}
    >
      {course.id > 100 ? `${Math.floor(course.id / 10)}A` : course.id}
    </span>
    <div className="flex-1 min-w-0">
      <p className={`font-bold text-sm ${isDone ? 'text-green-700' : 'text-gray-900'}`}>
        {course.name}
        {isDone && ' ✅'}
      </p>
      <p className="text-xs text-gray-500 truncate">{course.fullName}</p>
    </div>
    <div className="text-right flex-shrink-0">
      <p className="text-xs font-bold text-gray-700">{course.distance}km</p>
      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
        course.difficulty === '어려움' ? 'bg-red-50 text-red-500' :
        course.difficulty === '보통' ? 'bg-amber-50 text-amber-600' :
        'bg-green-50 text-green-600'
      }`}>
        {course.difficulty}
      </span>
    </div>
  </button>
);

export default OlleTracker;
