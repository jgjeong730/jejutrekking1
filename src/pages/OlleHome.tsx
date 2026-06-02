import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Mountain, ClipboardList, Info, TrendingUp } from 'lucide-react';
import OlleMap from '../components/OlleMap';

const OlleHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-700 to-emerald-500 px-6 pt-14 pb-10 text-white">
        <p className="text-green-200 text-sm font-medium mb-1">Prepared · May 2026</p>
        <h1 className="text-3xl font-black leading-tight mb-1">
          제주 올레길<br />완주 플랜
        </h1>
        <p className="text-green-100 text-sm">Jeju Olle Trail — Complete Trekking Plan 2026</p>

        <div className="mt-6 bg-white/20 backdrop-blur rounded-2xl p-4 flex justify-between text-center">
          <div>
            <p className="text-2xl font-black">437km</p>
            <p className="text-green-100 text-xs mt-0.5">총 연장</p>
          </div>
          <div className="w-px bg-white/30" />
          <div>
            <p className="text-2xl font-black">27개</p>
            <p className="text-green-100 text-xs mt-0.5">공식 코스</p>
          </div>
          <div className="w-px bg-white/30" />
          <div>
            <p className="text-2xl font-black">22일</p>
            <p className="text-green-100 text-xs mt-0.5">표준 일정</p>
          </div>
        </div>
      </div>

      {/* JG Profile */}
      <div className="mx-4 -mt-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">🏃</span>
        </div>
        <div>
          <p className="font-bold text-gray-900">JG (Jung Kunu)</p>
          <p className="text-sm text-gray-500">58세 · 러닝·테니스·트레킹 활동가</p>
          <p className="text-xs text-green-600 font-medium mt-0.5">수원 망포 출발 | 2026년 9월 중순 권장</p>
        </div>
      </div>

      {/* Map overview */}
      <div className="mx-4 mt-4">
        <p className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          올레길 완주 경로 — 제주공항 출발·귀환 (원형 루프)
        </p>
        <OlleMap mode="overview" height="200px" />
        <div className="flex gap-3 mt-2 text-xs text-gray-400 justify-center flex-wrap">
          <span className="flex items-center gap-1"><span>✈️</span> 공항 출발/귀환</span>
          <span className="flex items-center gap-1"><span>🏁</span> 완주 지점</span>
          <span className="flex items-center gap-1"><span>⛰</span> 한라산</span>
        </div>
      </div>

      {/* Recommended time */}
      <div className="mx-4 mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-xs font-bold text-amber-700 mb-2">추천 출발 시기</p>
        <div className="space-y-2">
          {[
            { period: '7월 말~8월', label: '비추 ⚠️', desc: '장마·태풍·35°C↑ 폭염', color: 'text-red-500' },
            { period: '9월 중순~10월', label: '최적 ✅', desc: '기온 22~27°C, 태풍 소강, 습도↓', color: 'text-green-600' },
            { period: '10월 중순~11월', label: '차선 ✅', desc: '선선·단풍, 일몰 빨라 보행 제약', color: 'text-blue-500' },
          ].map((item) => (
            <div key={item.period} className="flex items-center gap-3">
              <p className="text-xs text-gray-600 w-24 flex-shrink-0">{item.period}</p>
              <p className={`text-xs font-bold ${item.color} w-16 flex-shrink-0`}>{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-amber-700 mt-3 leading-relaxed">
          💡 퇴직(6월 말) 후 7~9월 초는 충분한 휴식 + 체력 빌드업 기간으로 활용. 목표 체중(62kg) 달성 후 출발이 최적.
        </p>
      </div>

      {/* Quick nav */}
      <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
        <Link to="/schedule" className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:bg-gray-50 active:scale-95 transition-all">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">완주 일정</p>
            <p className="text-xs text-gray-400">22일 / 17일</p>
          </div>
        </Link>
        <Link to="/courses" className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:bg-gray-50 active:scale-95 transition-all">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
            <Mountain className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">한라산 등반</p>
            <p className="text-xs text-gray-400">성판악→관음사</p>
          </div>
        </Link>
        <Link to="/prep" className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:bg-gray-50 active:scale-95 transition-all">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">준비사항</p>
            <p className="text-xs text-gray-400">장비 + 체크리스트</p>
          </div>
        </Link>
        <Link to="/info" className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:bg-gray-50 active:scale-95 transition-all">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <Info className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">예산·맛집</p>
            <p className="text-xs text-gray-400">숙박·인증 정보</p>
          </div>
        </Link>
      </div>

      {/* Budget summary */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-gray-500" />
          <p className="text-sm font-bold text-gray-700">예상 총 비용</p>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 bg-green-50 rounded-xl p-3 text-center">
            <p className="text-xs text-green-600 font-medium">표준 22일</p>
            <p className="text-xl font-black text-green-700 mt-1">114만원</p>
          </div>
          <div className="flex-1 bg-orange-50 rounded-xl p-3 text-center">
            <p className="text-xs text-orange-600 font-medium">타이트 17일</p>
            <p className="text-xl font-black text-orange-700 mt-1">87만원</p>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="mx-4 mt-4 mb-2 text-center">
        <p className="text-gray-400 text-sm italic">"걷는 것이 곧 완성이다"</p>
        <p className="text-gray-300 text-xs mt-1">32년 현업 후, 제주 437km의 선물을 온전히 누리시길 — JG</p>
      </div>
    </div>
  );
};

export default OlleHome;
