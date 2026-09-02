import React, { useState, useMemo, useCallback } from 'react';
import { GoogleMap, MarkerF, InfoWindowF, useJsApiLoader } from '@react-google-maps/api';
import { DollarSign, Utensils, Home, Award, ExternalLink, Map as MapIcon, List } from 'lucide-react';
import { BUDGET_ITEMS, FOOD_RECS, ACCOMMODATIONS, REAL_SCHEDULE, GUESTHOUSE_NIGHT_RATE, CAMPING_NIGHT_RATE, CURRENT_EXPEDITION } from '../data/olleData';
import type { AccommodationRec } from '../data/olleData';
import { useOlleProgress } from '../hooks/useOlleProgress';

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
      <div className="bg-gradient-to-r from-sky-600 to-cyan-400 px-4 pt-4 pb-2 sticky top-0 z-10 shadow-sm">
        <h1 className="text-lg font-black text-white text-center mb-3">여행 정보</h1>
        <div className="grid grid-cols-4 gap-1.5">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`py-1.5 rounded-xl text-xs font-bold flex flex-col items-center gap-0.5 transition-all ${
                tab === key ? 'bg-white text-sky-700 shadow' : 'bg-white/20 text-white'
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
  const { records } = useOlleProgress();

  const lodging = useMemo(() => {
    const costByCourse: Record<number, number> = {};
    records.forEach((r) => { if (r.lodgeCost != null) costByCourse[r.courseId] = r.lodgeCost; });

    let cost = 0;
    let actualNights = 0;
    REAL_SCHEDULE.forEach((day) => {
      const recorded = day.courseIds.map((id) => costByCourse[id]).find((c) => c != null);
      if (recorded != null) {
        cost += recorded;
        actualNights += 1;
      } else {
        cost += day.accommodation === 'camping' ? CAMPING_NIGHT_RATE : GUESTHOUSE_NIGHT_RATE;
      }
    });
    return { cost, actualNights, totalNights: REAL_SCHEDULE.length };
  }, [records]);

  const budgetItems = useMemo(
    () =>
      BUDGET_ITEMS.map((item) =>
        item.item.startsWith('숙박')
          ? {
              ...item,
              cost: lodging.cost,
              note:
                lodging.actualNights > 0
                  ? `실제 기록 ${lodging.actualNights}박 반영, 나머지 ${lodging.totalNights - lodging.actualNights}박은 게하 2.5만/캠핑 1만 추정`
                  : item.note,
            }
          : item
      ),
    [lodging]
  );

  const total = budgetItems.reduce((s, i) => s + i.cost, 0);

  return (
    <div className="space-y-3">
      <div className="bg-sky-600 rounded-2xl p-4 text-white text-center mb-2">
        <p className="text-xs opacity-75">26일 확정 일정 예상 비용</p>
        <p className="text-3xl font-black mt-1">{(total / 10000).toFixed(0)}만원</p>
        {lodging.actualNights > 0 && (
          <p className="text-xs opacity-75 mt-1">숙박 {lodging.actualNights}박은 트래커에 기록된 실제 금액이에요</p>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-3 bg-gray-50 px-4 py-2 text-xs text-gray-500 font-bold border-b border-gray-100">
          <span className="col-span-2">항목</span>
          <span className="text-center text-sky-600">금액</span>
        </div>
        {budgetItems.map((item) => (
          <div key={item.item} className="px-4 py-3 border-b border-gray-50 last:border-0">
            <div className="grid grid-cols-3 items-center">
              <span className="col-span-2 text-xs text-gray-800 font-medium leading-snug">{item.item}</span>
              <span className="text-center text-sm font-bold text-sky-700">
                {(item.cost / 10000).toFixed(0)}만
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{item.note}</p>
          </div>
        ))}
        <div className="grid grid-cols-3 px-4 py-3 bg-gray-50 border-t border-gray-100">
          <span className="col-span-2 text-sm font-black text-gray-900">합계</span>
          <span className="text-center text-sm font-black text-sky-700">{(total / 10000).toFixed(0)}만원</span>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-700">
        아침 식비 제외 (생략 기준). 올레패스포트 2만원 포함. 캠핑 비중 높일수록 절약 가능.
        트래커에서 완주 기록에 숙박비를 입력하면 여기 총액에 자동 반영돼요.
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

const JEJU_MAP_CENTER = { lat: 33.38, lng: 126.55 };

const AccommodationMap: React.FC = () => {
  const [selected, setSelected] = useState<AccommodationRec | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });
  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    ACCOMMODATIONS.forEach((a) => bounds.extend({ lat: a.lat, lng: a.lng }));
    map.fitBounds(bounds, 24);
  }, []);

  if (!isLoaded) {
    return (
      <div className="h-56 rounded-2xl bg-gray-100 flex items-center justify-center text-xs text-gray-400">
        지도 로딩 중...
      </div>
    );
  }

  return (
    <div className="relative h-56 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={JEJU_MAP_CENTER}
        zoom={10}
        onLoad={onLoad}
        options={{ disableDefaultUI: true, zoomControl: true, gestureHandling: 'greedy' }}
      >
        {ACCOMMODATIONS.map((a) => (
          <MarkerF
            key={`${a.zone}-${a.name}`}
            position={{ lat: a.lat, lng: a.lng }}
            title={a.name}
            onClick={() => setSelected(a)}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: a.type === 'guesthouse' ? '#0284C7' : '#D97706',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 1.5,
            }}
          />
        ))}
        {selected && (
          <InfoWindowF
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div className="text-xs max-w-[180px]">
              <p className="font-bold text-gray-900 mb-1">{selected.name}</p>
              <p className="text-gray-500 mb-1.5">{selected.note}</p>
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 font-medium underline"
              >
                정보·예약 보기
              </a>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
};

const StayTab: React.FC = () => {
  const [view, setView] = useState<'list' | 'map'>('list');
  const zones = [...new Set(ACCOMMODATIONS.map((a) => a.zone))];
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setView('list')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
            view === 'list' ? 'bg-sky-600 text-white' : 'bg-white text-gray-500 border border-gray-100'
          }`}
        >
          <List className="w-3.5 h-3.5" /> 목록
        </button>
        <button
          onClick={() => setView('map')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
            view === 'map' ? 'bg-sky-600 text-white' : 'bg-white text-gray-500 border border-gray-100'
          }`}
        >
          <MapIcon className="w-3.5 h-3.5" /> 지도
        </button>
      </div>
      {view === 'map' && (
        <div className="space-y-2">
          <AccommodationMap />
          <p className="text-xs text-gray-400 flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-600 inline-block" /> 게스트하우스</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-600 inline-block" /> 캠핑</span>
          </p>
        </div>
      )}
      {view === 'list' && zones.map((zone) => {
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
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{acc.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{acc.note}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        acc.type === 'guesthouse'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {acc.type === 'guesthouse' ? '게스트하우스 ~2.5만원' : '캠핑 ~1만원'}
                      </span>
                      <a
                        href={acc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-2 py-0.5 rounded-full font-medium bg-sky-600 text-white flex items-center gap-1"
                      >
                        정보·예약 <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
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
    <div className="bg-sky-600 rounded-2xl p-5 text-white text-center">
      <Award className="w-10 h-10 mx-auto mb-2 opacity-90" />
      <p className="font-black text-xl">완주 인증</p>
      <p className="text-sky-100 text-sm mt-1">제주올레 완주자 클럽</p>
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
      <p className="text-gray-500 text-sm italic">"Not all who wander are lost"</p>
      <p className="text-gray-300 text-xs mt-1 font-medium tracking-wide">{CURRENT_EXPEDITION} to JMT</p>
    </div>
  </div>
);

export default OlleInfo;
