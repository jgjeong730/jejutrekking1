import React, { useState } from 'react';
import { DollarSign, Utensils, Home, Award } from 'lucide-react';
import { BUDGET_ITEMS, FOOD_RECS, ACCOMMODATIONS } from '../data/olleData';

type Tab = 'budget' | 'food' | 'stay' | 'cert';

const TABS: { key: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { key: 'budget', label: '예산', icon: DollarSign },
  { key: 'food', label: '맛집', icon: Utensils },
  { key: 'stay', label: '숙박', icon: Home },
  { key: 'cert', label: '인증', icon: Award },
];

const OlleInfo: React.FC = () => {
  const [tab, setTab] = useState<Tab>('budget');

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-r from-purple-600 to-violet-500 px-4 pt-4 pb-2 sticky top-0 z-10 shadow-sm">
        <h1 className="text-lg font-black text-white text-center mb-3">여행 정보</h1>
        <div className="grid grid-cols-4 gap-1.5">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`py-1.5 rounded-xl text-xs font-bold flex flex-col items-center gap-0.5 transition-all ${
                tab === key ? 'bg-white text-purple-700 shadow' : 'bg-white/20 text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        {tab === 'budget' && <BudgetTab />}
        {tab === 'food' && <FoodTab />}
        {tab === 'stay' && <StayTab />}
        {tab === 'cert' && <CertTab />}
      </div>
    </div>
  );
};

const BudgetTab: React.FC = () => {
  const standardTotal = BUDGET_ITEMS.reduce((s, i) => s + i.standard, 0);
  const tightTotal = BUDGET_ITEMS.reduce((s, i) => s + i.tight, 0);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 mb-2">
        <div className="bg-green-600 rounded-2xl p-4 text-white text-center">
          <p className="text-xs opacity-75">표준 22일</p>
          <p className="text-2xl font-black mt-1">{(standardTotal / 10000).toFixed(0)}만원</p>
        </div>
        <div className="bg-orange-500 rounded-2xl p-4 text-white text-center">
          <p className="text-xs opacity-75">타이트 17일</p>
          <p className="text-2xl font-black mt-1">{(tightTotal / 10000).toFixed(0)}만원</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-4 bg-gray-50 px-4 py-2 text-xs text-gray-500 font-bold border-b border-gray-100">
          <span className="col-span-2">항목</span>
          <span className="text-center text-green-600">표준</span>
          <span className="text-center text-orange-500">타이트</span>
        </div>
        {BUDGET_ITEMS.map((item) => (
          <div key={item.item} className="px-4 py-3 border-b border-gray-50 last:border-0">
            <div className="grid grid-cols-4 items-center">
              <span className="col-span-2 text-xs text-gray-800 font-medium leading-snug">{item.item}</span>
              <span className="text-center text-sm font-bold text-green-700">
                {(item.standard / 10000).toFixed(0)}만
              </span>
              <span className="text-center text-sm font-bold text-orange-600">
                {(item.tight / 10000).toFixed(0)}만
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1 col-span-4">{item.note}</p>
          </div>
        ))}
        <div className="grid grid-cols-4 px-4 py-3 bg-gray-50 border-t border-gray-100">
          <span className="col-span-2 text-sm font-black text-gray-900">합계</span>
          <span className="text-center text-sm font-black text-green-700">{(standardTotal / 10000).toFixed(0)}만원</span>
          <span className="text-center text-sm font-black text-orange-600">{(tightTotal / 10000).toFixed(0)}만원</span>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-700">
        아침 식비 제외 (생략 기준). 올레패스포트 1.5만원 포함. 캠핑 비중 높을수록 절약 가능.
      </div>
    </div>
  );
};

const FoodTab: React.FC = () => (
  <div className="space-y-3">
    <p className="text-xs text-gray-500 mb-1">아침 제외, 점심 코스 중간·종점, 저녁 숙박지 인근 기준</p>
    {FOOD_RECS.map((f) => (
      <div key={f.zone} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <p className="font-bold text-gray-900 text-sm mb-2">{f.zone}</p>
        <div className="space-y-2">
          <div className="flex gap-2 items-start">
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold flex-shrink-0">점심</span>
            <p className="text-xs text-gray-600">{f.lunch}</p>
          </div>
          <div className="flex gap-2 items-start">
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold flex-shrink-0">저녁</span>
            <p className="text-xs text-gray-600">{f.dinner}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const StayTab: React.FC = () => {
  const zones = [...new Set(ACCOMMODATIONS.map((a) => a.zone))];
  return (
    <div className="space-y-4">
      {zones.map((zone) => {
        const items = ACCOMMODATIONS.filter((a) => a.zone === zone);
        return (
          <div key={zone}>
            <p className="text-xs font-bold text-gray-500 mb-2">{zone}</p>
            <div className="space-y-2">
              {items.map((acc) => (
                <div key={acc.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start gap-3">
                  <span className={`text-sm flex-shrink-0 mt-0.5 ${acc.type === 'guesthouse' ? '🏠' : '⛺'}`}>
                    {acc.type === 'guesthouse' ? '🏠' : '⛺'}
                  </span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{acc.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{acc.note}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${
                      acc.type === 'guesthouse'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {acc.type === 'guesthouse' ? '게스트하우스 ~2.5만원' : '캠핑 ~1만원'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CertTab: React.FC = () => (
  <div className="space-y-3">
    <div className="bg-green-600 rounded-2xl p-5 text-white text-center">
      <Award className="w-10 h-10 mx-auto mb-2 opacity-90" />
      <p className="font-black text-xl">완주 인증</p>
      <p className="text-green-100 text-sm mt-1">제주올레 완주자 클럽</p>
    </div>

    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
      {[
        { label: '인증 방법', value: '올레패스포트에 전 코스 스탬프 완료 후 제주올레 사무국 방문' },
        { label: '인증 장소', value: '제주올레 여행자센터 (서귀포시 중앙로 55)' },
        { label: '수령 증서', value: '완주인증서 + 간세(조랑말) 뱃지' },
        { label: '완주자 혜택', value: '완주자 클럽 가입 가능 (온라인) — 커뮤니티·할인 혜택' },
      ].map((item) => (
        <div key={item.label} className="p-4">
          <p className="text-xs text-gray-500">{item.label}</p>
          <p className="text-sm font-semibold text-gray-800 mt-0.5 leading-snug">{item.value}</p>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <p className="text-xs font-bold text-gray-700 mb-2">올레패스포트 완주 기준</p>
      <p className="text-xs text-gray-600 leading-relaxed">
        본섬 21개 정규 코스 + 지선 포함 26코스 스탬프 완료
        (추자도 18-2코스 선택 가능)
      </p>
    </div>

    <div className="text-center py-4">
      <p className="text-gray-500 text-sm italic">"걷는 것이 곧 완성이다"</p>
      <p className="text-gray-300 text-xs mt-1">— JG, 437km의 끝에서</p>
    </div>
  </div>
);

export default OlleInfo;
