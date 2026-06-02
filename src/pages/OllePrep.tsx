import React, { useState } from 'react';
import { Package, CheckSquare, Square, CheckCircle2 } from 'lucide-react';
import { GEAR_ITEMS, CHECKLIST } from '../data/olleData';

const OllePrep: React.FC = () => {
  const [checked, setChecked] = useState<boolean[]>(new Array(CHECKLIST.length).fill(false));

  const toggle = (idx: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const checkedCount = checked.filter(Boolean).length;
  const progress = Math.round((checkedCount / CHECKLIST.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 px-4 pt-4 pb-5 sticky top-0 z-10 shadow-sm">
        <h1 className="text-lg font-black text-white text-center">준비사항</h1>
      </div>

      {/* Gear */}
      <div className="mx-4 mt-4">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-5 h-5 text-blue-600" />
          <h2 className="font-black text-gray-900">필수 장비 3가지</h2>
        </div>
        <div className="space-y-3">
          {GEAR_ITEMS.map((gear, i) => (
            <div key={gear.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-start gap-3">
                <div className="min-w-[32px] h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-sm">{i + 1}</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{gear.name}</p>
                  {gear.detail.split('\n').map((line, j) => (
                    <p key={j} className="text-xs text-gray-500 mt-0.5">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="mx-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-blue-600" />
            <h2 className="font-black text-gray-900">출발 전 체크리스트</h2>
          </div>
          <span className="text-sm font-bold text-blue-600">{checkedCount}/{CHECKLIST.length}</span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {progress === 100 && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-3 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm font-bold text-green-700">모든 항목 완료! 출발 준비 완료</p>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          {CHECKLIST.map((item, idx) => (
            <button
              key={idx}
              onClick={() => toggle(idx)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              {checked[idx] ? (
                <CheckSquare className="w-5 h-5 text-blue-500 flex-shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-gray-300 flex-shrink-0" />
              )}
              <span className={`text-sm ${checked[idx] ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                {item}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mx-4 mt-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-xs font-bold text-amber-700 mb-2">출발 전 체력 빌드업 팁</p>
          <ul className="space-y-1.5 text-xs text-amber-700">
            <li>• 러닝·테니스 강도 유지하며 발바닥·무릎 단련</li>
            <li>• 목표 체중(62kg) 달성 후 출발이 최적</li>
            <li>• 트레일화 2주 전부터 착용해 길들이기</li>
            <li>• 주말 롱런으로 15km+ 연속 보행 적응</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OllePrep;
