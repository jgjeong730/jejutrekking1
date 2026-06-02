import { useState, useCallback, useMemo } from 'react';
import { OLLE_COURSES } from '../data/olleCoursesData';

export interface CompletionRecord {
  courseId: number;
  date: string;          // YYYY-MM-DD
  companions?: string;
  memo?: string;
}

interface StoredProgress {
  records: CompletionRecord[];
}

const STORAGE_KEY = 'olle_progress_v1';

function loadFromStorage(): CompletionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: StoredProgress = JSON.parse(raw);
    return Array.isArray(parsed.records) ? parsed.records : [];
  } catch {
    return [];
  }
}

function saveToStorage(records: CompletionRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ records }));
}

export function useOlleProgress() {
  const [records, setRecords] = useState<CompletionRecord[]>(loadFromStorage);

  const completedCourses = useMemo(
    () => records.map(r => r.courseId),
    [records]
  );

  const completionDates = useMemo(() => {
    const map: Record<number, string> = {};
    records.forEach(r => { map[r.courseId] = r.date; });
    return map;
  }, [records]);

  const totalDistance = useMemo(() => {
    return OLLE_COURSES
      .filter(c => completedCourses.includes(c.id))
      .reduce((sum, c) => sum + c.distance, 0);
  }, [completedCourses]);

  const totalCourseCount = useMemo(
    () => OLLE_COURSES.filter(c => !c.isAlt).length,
    []
  );

  const completedMainCount = useMemo(
    () => OLLE_COURSES.filter(c => !c.isAlt && completedCourses.includes(c.id)).length,
    [completedCourses]
  );

  const progressRate = useMemo(
    () => Math.round((completedMainCount / totalCourseCount) * 100),
    [completedMainCount, totalCourseCount]
  );

  const totalRemainingDistance = useMemo(() => {
    return OLLE_COURSES
      .filter(c => !c.isAlt && !completedCourses.includes(c.id))
      .reduce((sum, c) => sum + c.distance, 0);
  }, [completedCourses]);

  const addCompletion = useCallback((record: CompletionRecord) => {
    setRecords(prev => {
      const filtered = prev.filter(r => r.courseId !== record.courseId);
      const next = [...filtered, record];
      saveToStorage(next);
      return next;
    });
  }, []);

  const removeCompletion = useCallback((courseId: number) => {
    setRecords(prev => {
      const next = prev.filter(r => r.courseId !== courseId);
      saveToStorage(next);
      return next;
    });
  }, []);

  const getRecord = useCallback(
    (courseId: number) => records.find(r => r.courseId === courseId),
    [records]
  );

  const isCompleted = useCallback(
    (courseId: number) => completedCourses.includes(courseId),
    [completedCourses]
  );

  return {
    records,
    completedCourses,
    completionDates,
    totalDistance,
    totalRemainingDistance,
    totalCourseCount,
    completedMainCount,
    progressRate,
    addCompletion,
    removeCompletion,
    getRecord,
    isCompleted,
  };
}
