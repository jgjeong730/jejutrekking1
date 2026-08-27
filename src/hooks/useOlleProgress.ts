import { useState, useCallback, useMemo, useEffect } from 'react';
import { OLLE_COURSES } from '../data/olleCoursesData';
import { supabase } from '../lib/supabaseClient';

export interface CompletionRecord {
  courseId: number;
  date: string;          // YYYY-MM-DD
  companions?: string;
  memo?: string;
  actualDistance?: number; // km, as actually walked/recorded (GPS watch, phone, etc.)
  actualDuration?: string; // free text, e.g. "4시간 30분"
  lodgeName?: string;      // where they actually stayed that night
  lodgeCost?: number;      // KRW, actual amount paid
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

// Supabase row <-> CompletionRecord mapping (DB uses snake_case columns).
interface CompletionRow {
  course_id: number;
  date: string;
  companions: string | null;
  memo: string | null;
  actual_distance: number | null;
  actual_duration: string | null;
  lodge_name: string | null;
  lodge_cost: number | null;
}

function fromRow(row: CompletionRow): CompletionRecord {
  return {
    courseId: row.course_id,
    date: row.date,
    companions: row.companions ?? undefined,
    memo: row.memo ?? undefined,
    actualDistance: row.actual_distance ?? undefined,
    actualDuration: row.actual_duration ?? undefined,
    lodgeName: row.lodge_name ?? undefined,
    lodgeCost: row.lodge_cost ?? undefined,
  };
}

function toRow(record: CompletionRecord): CompletionRow {
  return {
    course_id: record.courseId,
    date: record.date,
    companions: record.companions ?? null,
    memo: record.memo ?? null,
    actual_distance: record.actualDistance ?? null,
    actual_duration: record.actualDuration ?? null,
    lodge_name: record.lodgeName ?? null,
    lodge_cost: record.lodgeCost ?? null,
  };
}

export function useOlleProgress() {
  const [records, setRecords] = useState<CompletionRecord[]>(loadFromStorage);

  // Pull the shared copy from Supabase on load so anyone opening the link
  // (family, friends) sees the latest recorded progress. Falls back silently
  // to whatever's in localStorage if offline or Supabase isn't configured.
  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('completions')
      .select('*')
      .then(({ data, error }) => {
        if (error || !data) return;
        const next = (data as CompletionRow[]).map(fromRow);
        setRecords(next);
        saveToStorage(next);
      });
  }, []);

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
    // Best-effort sync — the local write above already updated the UI, so a
    // failed/offline upsert just means this device's copy is ahead until the
    // next successful sync.
    supabase?.from('completions').upsert(toRow(record)).then(({ error }) => {
      if (error) console.warn('Supabase sync (upsert) failed:', error.message);
    });
  }, []);

  const removeCompletion = useCallback((courseId: number) => {
    setRecords(prev => {
      const next = prev.filter(r => r.courseId !== courseId);
      saveToStorage(next);
      return next;
    });
    supabase?.from('completions').delete().eq('course_id', courseId).then(({ error }) => {
      if (error) console.warn('Supabase sync (delete) failed:', error.message);
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
