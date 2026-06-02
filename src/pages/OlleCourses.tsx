import React from 'react';
import { Mountain, Clock, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';

const HALLASAN_COURSES = [
  { name: '성판악', distance: '9.6km (편도)', difficulty: '중 ★★☆', desc: '완만한 숲속 트레킹, 사라오름 경유, 초보자 가능', recommended: false },
  { name: '관음사', distance: '8.7km (편도)', difficulty: '상 ★★★', desc: '급경사, 삼각봉·왕관릉 전망 탁월, 체력 필요', recommended: false },
  { name: '★ 종주 추천', distance: '19km', difficulty: '중~상', desc: '성판악 오름 + 관음사 하산, 두 코스 하이라이트 모두 경험', recommended: true },
];

// 공항 출발 기준 순서: 18코스→21코스→1코스→...→17코스
const OLLE_ZONES = [
  { zone: '북동부권 (D1~D4)', courses: '18~21코스', highlight: '조천·함덕·김녕·한동·종달 → 공항 출발 첫 구간', km: '77km' },
  { zone: '동부권 (D5~D8)', courses: '1~4코스', highlight: '시흥초교·성산일출봉·섭지코지·표선·남원', km: '79km' },
  { zone: '서귀포권 (D9~D12)', courses: '5~8코스', highlight: '쇠소깍·천지연폭포·올레시장·박수기정', km: '60km' },
  { zone: '서부권 (D13~D19)', courses: '9~14코스', highlight: '화순·모슬포·수월봉·용수리·저지·한림', km: '94km' },
  { zone: '북부·애월권 (D20~D23)', courses: '15~17코스', highlight: '고내·광령·애월해안도로 → 관덕정 귀환', km: '53km' },
];

const OlleCourses: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-4 pt-4 pb-5 sticky top-0 z-10 shadow-sm">
        <h1 className="text-lg font-black text-white text-center">한라산 & 코스 안내</h1>
      </div>

      {/* Hallasan plan */}
      <div className="mx-4 mt-4">
        <div className="flex items-center gap-2 mb-3">
          <Mountain className="w-5 h-5 text-orange-600" />
          <h2 className="font-black text-gray-900">한라산 등반 계획</h2>
        </div>

        {/* Route badge */}
        <div className="bg-orange-600 rounded-2xl p-4 text-white mb-3">
          <p className="font-black text-lg">성판악 → 백록담 → 관음사</p>
          <p className="text-orange-100 text-sm mt-0.5">완전 종주 (추천)</p>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div className="bg-white/20 rounded-xl p-2">
              <p className="font-black text-base">19km</p>
              <p className="text-orange-100 text-xs">총 거리</p>
            </div>
            <div className="bg-white/20 rounded-xl p-2">
              <p className="font-black text-base">약 8h</p>
              <p className="text-orange-100 text-xs">소요 시간</p>
            </div>
            <div className="bg-white/20 rounded-xl p-2">
              <p className="font-black text-base">05:30</p>
              <p className="text-orange-100 text-xs">출발 권장</p>
            </div>
          </div>
        </div>

        {/* Key info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          {[
            { icon: Clock, label: '정상 입산 마감', value: '12:00 (성판악 기준)' },
            { icon: MapPin, label: '사전 예약', value: '국립공원 탐방예약시스템 (무료, 필수)' },
            { icon: MapPin, label: '이동', value: '모슬포 → 제주시버스터미널 → 5.16도로 버스 → 성판악' },
            { icon: AlertTriangle, label: '점심', value: '진달래밭 대피소(해발 1,500m)에서 도시락 섭취' },
          ].map((item) => (
            <div key={item.label} className="flex gap-3 items-start p-3.5">
              <item.icon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Course comparison */}
        <div className="mt-4">
          <h3 className="text-sm font-bold text-gray-700 mb-2">코스 비교</h3>
          <div className="space-y-2">
            {HALLASAN_COURSES.map((c) => (
              <div
                key={c.name}
                className={`rounded-2xl p-4 border shadow-sm ${
                  c.recommended ? 'bg-orange-50 border-orange-300' : 'bg-white border-gray-100'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <p className={`font-bold text-sm ${c.recommended ? 'text-orange-700' : 'text-gray-900'}`}>
                    {c.name}
                  </p>
                  {c.recommended && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">추천</span>
                  )}
                </div>
                <div className="flex gap-3 text-xs text-gray-500 mb-1">
                  <span>{c.distance}</span>
                  <span>·</span>
                  <span>{c.difficulty}</span>
                </div>
                <p className="text-xs text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Olle course zones */}
      <div className="mx-4 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <h2 className="font-black text-gray-900">올레길 코스 권역</h2>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          출발 기점 : 1코스 시흥초등학교 (성산읍) — 시계 방향 순환
        </p>
        <div className="space-y-2">
          {OLLE_ZONES.map((z) => (
            <div key={z.zone} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
              <div className="min-w-[44px] h-12 bg-green-600 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                <p className="text-white text-[10px] font-semibold">{z.courses}</p>
                <p className="text-white text-xs font-black">{z.km}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm">{z.zone}</p>
                <p className="text-xs text-gray-500 truncate">{z.highlight}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certification info */}
        <div className="mt-4 bg-green-50 border border-green-200 rounded-2xl p-4">
          <p className="text-xs font-bold text-green-700 mb-1">완주 인증 기준</p>
          <p className="text-xs text-green-600 leading-relaxed">
            본섬 21개 정규 코스 + 지선 포함 26코스 스탬프 완료 → 올레패스포트에 전 코스 스탬프 후 제주올레 여행자센터 방문
          </p>
          <p className="text-xs text-green-600 mt-1">
            📍 서귀포시 중앙로 55 · 수령 : 완주인증서 + 간세(조랑말) 뱃지
          </p>
        </div>
      </div>
    </div>
  );
};

export default OlleCourses;
