import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, CheckCircle2, Clock, MapPin, ChevronUp, Trash2, Plus, LoaderCircle } from 'lucide-react';
import type { OlleCourse } from '../data/olleCoursesData';
import type { CompletionRecord } from '../hooks/useOlleProgress';
import { getPhotos, addPhoto, removePhoto, MAX_PHOTOS } from '../lib/photoStore';

interface CourseBottomSheetProps {
  course: OlleCourse | null;
  isCompleted: boolean;
  existingRecord?: CompletionRecord;
  onClose: () => void;
  onComplete: (record: CompletionRecord) => void;
  onRemove: (courseId: number) => void;
}

const CourseBottomSheet: React.FC<CourseBottomSheetProps> = ({
  course, isCompleted, existingRecord, onClose, onComplete, onRemove,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [companions, setCompanions] = useState('');
  const [memo, setMemo] = useState('');
  const [actualDistance, setActualDistance] = useState('');
  const [actualDuration, setActualDuration] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (course) {
      setShowForm(false);
      setDate(existingRecord?.date ?? new Date().toISOString().slice(0, 10));
      setCompanions(existingRecord?.companions ?? '');
      setMemo(existingRecord?.memo ?? '');
      setActualDistance(existingRecord?.actualDistance != null ? String(existingRecord.actualDistance) : '');
      setActualDuration(existingRecord?.actualDuration ?? '');
      setPhotoError(null);
      setLightbox(null);
      getPhotos(course.id).then(setPhotos).catch(() => setPhotos([]));
    }
  }, [course, existingRecord]);

  const handlePickPhoto = useCallback(async (file: File) => {
    if (!course) return;
    setPhotoError(null);
    setPhotoBusy(true);
    try {
      const next = await addPhoto(course.id, file);
      setPhotos(next);
    } catch (e) {
      setPhotoError(e instanceof Error ? e.message : '사진을 저장하지 못했어요');
    } finally {
      setPhotoBusy(false);
    }
  }, [course]);

  const handleRemovePhoto = useCallback(async (index: number) => {
    if (!course) return;
    setPhotoBusy(true);
    try {
      const next = await removePhoto(course.id, index);
      setPhotos(next);
    } catch {
      setPhotoError('사진을 지우지 못했어요');
    } finally {
      setPhotoBusy(false);
    }
  }, [course]);

  if (!course) return null;

  const difficultyColor =
    course.difficulty === '어려움' ? 'text-red-500 bg-red-50' :
    course.difficulty === '보통' ? 'text-amber-600 bg-amber-50' :
    'text-green-600 bg-green-50';

  const handleSave = () => {
    const parsedDistance = actualDistance.trim() === '' ? undefined : Number(actualDistance);
    onComplete({
      courseId: course.id,
      date,
      companions: companions || undefined,
      memo: memo || undefined,
      actualDistance: parsedDistance != null && !Number.isNaN(parsedDistance) ? parsedDistance : undefined,
      actualDuration: actualDuration.trim() || undefined,
    });
    setShowForm(false);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      {/* Backdrop */}
      <div className="absolute inset-0 bottom-auto h-screen -top-screen" onClick={onClose} />

      <div className="relative bg-white rounded-t-3xl shadow-2xl max-h-[75vh] flex flex-col">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-5 pb-3 border-b border-gray-100">
          <div className="flex-1 min-w-0 pr-3">
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className="w-5 h-5 rounded-full flex-shrink-0 inline-block"
                style={{ background: course.color }}
              />
              <span className="font-black text-lg text-gray-900">{course.name}</span>
              {isCompleted && <CheckCircle2 className="w-5 h-5 text-sky-500 flex-shrink-0" />}
            </div>
            <p className="text-sm text-gray-500">{course.fullName}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 pb-6 pt-4 space-y-4">
          {/* Course stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: '거리', value: `${course.distance}km` },
              { label: '소요', value: `약 ${course.duration}h` },
              { label: '난이도', value: course.difficulty },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-2xl p-3 text-center">
                <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                <p className={`text-sm font-bold ${label === '난이도' ? difficultyColor.split(' ')[0] : 'text-gray-800'}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Route */}
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0" />
            <span className="text-gray-700 font-medium">{course.startPoint.name}</span>
            <span className="text-gray-300 flex-1 border-t border-dashed border-gray-200 mx-1" />
            <span className="text-gray-700 font-medium">{course.endPoint.name}</span>
            <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
          </div>

          {/* Description */}
          {course.description && (
            <p className="text-sm text-gray-500 leading-relaxed">{course.description}</p>
          )}

          {/* Photos */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-600">사진 ({photos.length}/{MAX_PHOTOS})</label>
              {photoBusy && <LoaderCircle className="w-3.5 h-3.5 text-sky-500 animate-spin" />}
            </div>
            <div className="flex gap-2 flex-wrap">
              {photos.map((src, i) => (
                <div key={i} className="relative w-16 h-16 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 block"
                  >
                    <img src={src} alt={`사진 ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(i)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white shadow flex items-center justify-center"
                    aria-label="사진 삭제"
                  >
                    <X className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              ))}
              {photos.length < MAX_PHOTOS && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={photoBusy}
                  className="w-16 h-16 flex-shrink-0 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                >
                  <Plus className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handlePickPhoto(file);
                e.target.value = '';
              }}
            />
            {photoError && <p className="text-xs text-red-500 mt-1">{photoError}</p>}
          </div>

          {/* Completed record */}
          {isCompleted && existingRecord && !showForm && (
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-bold text-sky-700">완주 기록</span>
                </div>
                <button
                  onClick={() => onRemove(course.id)}
                  className="p-1 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
              <p className="text-sm text-sky-600">
                <Clock className="w-3 h-3 inline mr-1" />
                {existingRecord.date}
              </p>
              {(existingRecord.actualDistance != null || existingRecord.actualDuration) && (
                <p className="text-xs text-sky-600 mt-1">
                  실제 기록: {existingRecord.actualDistance != null ? `${existingRecord.actualDistance}km` : ''}
                  {existingRecord.actualDistance != null && existingRecord.actualDuration ? ' · ' : ''}
                  {existingRecord.actualDuration ?? ''}
                </p>
              )}
              {existingRecord.companions && (
                <p className="text-xs text-sky-600 mt-1">함께: {existingRecord.companions}</p>
              )}
              {existingRecord.memo && (
                <p className="text-xs text-sky-600 mt-1 italic">"{existingRecord.memo}"</p>
              )}
              <button
                onClick={() => setShowForm(true)}
                className="mt-2 text-xs text-sky-700 underline"
              >
                기록 수정
              </button>
            </div>
          )}

          {/* Completion form */}
          {(!isCompleted || showForm) && (
            <div className="space-y-3">
              {showForm && (
                <div className="flex items-center gap-2 mb-1">
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                  <p className="text-sm font-bold text-gray-700">완주 기록 수정</p>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">완주 날짜</label>
                <input
                  type="date"
                  value={date}
                  max={new Date().toISOString().slice(0, 10)}
                  onChange={e => setDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">실제 이동거리 (선택)</label>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      min="0"
                      value={actualDistance}
                      onChange={e => setActualDistance(e.target.value)}
                      placeholder={`${course.distance}`}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">km</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">실제 소요시간 (선택)</label>
                  <input
                    type="text"
                    value={actualDuration}
                    onChange={e => setActualDuration(e.target.value)}
                    placeholder="예: 4시간 30분"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">함께 걸은 사람 (선택)</label>
                <input
                  type="text"
                  value={companions}
                  onChange={e => setCompanions(e.target.value)}
                  placeholder="예: 가족, 친구"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">메모 (선택)</label>
                <textarea
                  value={memo}
                  onChange={e => setMemo(e.target.value)}
                  placeholder="오늘 걸으며 느낀 점..."
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full bg-sky-600 text-white font-bold py-3 rounded-2xl text-sm active:scale-95 transition-transform"
              >
                {isCompleted ? '기록 저장' : '완주 기록하기 ✅'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Photo lightbox */}
      {lightbox != null && photos[lightbox] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img src={photos[lightbox]} alt={`사진 ${lightbox + 1}`} className="max-w-full max-h-full rounded-lg object-contain" />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
            aria-label="닫기"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseBottomSheet;
