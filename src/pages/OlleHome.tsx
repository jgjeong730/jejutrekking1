import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Mountain, ClipboardList, Info, TrendingUp } from 'lucide-react';
import OlleIslandMap from '../components/OlleIslandMap';
import OlleMark from '../components/OlleMark';
import { CURRENT_EXPEDITION } from '../data/olleData';

const OlleHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-br from-sky-600 to-cyan-400 px-6 pt-14 pb-10 text-white">
        <p className="text-sky-100 text-sm font-medium mb-1">Updated · Aug 2026</p>
        <div className="flex items-center gap-3 mb-1">
          <OlleMark className="w-9 h-9 flex-shrink-0" />
          <h1 className="text-2xl font-black leading-tight whitespace-nowrap">
            Jeju Olle 437
          </h1>
        </div>
        <p className="text-sky-100 text-sm">2026.10.23 ~ 11.19 확정 일정</p>

        <div className="mt-6 bg-white/20 backdrop-blur rounded-2xl p-4 flex justify-between text-center">
          <div>
            <p className="text-2xl font-black">437km</p>
            <p className="text-sky-100 text-xs mt-0.5">총 연장</p>
          </div>
          <div className="w-px bg-white/30" />
          <div>
            <p className="text-2xl font-black">27개</p>
            <p className="text-sky-100 text-xs mt-0.5">공식 코스</p>
          </div>
          <div className="w-px bg-white/30" />
          <div>
            <p className="text-2xl font-black">26일</p>
            <p className="text-sky-100 text-xs mt-0.5">확정 일정</p>
          </div>
        </div>
      </div>

      {/* Map overview */}
      <div className="mx-4 -mt-4 relative z-10 bg-white rounded-2xl shadow-sm border border-gray-100 p-3">
        <p className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" />
          올레길 27개 코스 한눈에 보기
        </p>
        <OlleIslandMap />
      </div>

      {/* Confirmed dates */}
      <div className="mx-4 mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-xs font-bold text-amber-700 mb-2">확정 일정</p>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <p className="text-xs text-gray-600 w-24 flex-shrink-0">10/23(금) 19:30</p>
            <p className="text-xs text-gray-500">제주공항 도착, 첫 코스는 다음날부터</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs text-gray-600 w-24 flex-shrink-0">10/24~11/18</p>
            <p className="text-xs text-gray-500">26일 연속 트레킹 (휴식일 없음)</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs text-gray-600 w-24 flex-shrink-0">11/07(토)</p>
            <p className="text-xs text-gray-500">한라산 성판악~관음사 종주</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs text-gray-600 w-24 flex-shrink-0">11/19(목) 10:45</p>
            <p className="text-xs text-gray-500">제주 → 김포</p>
          </div>
        </div>
        <p className="text-xs text-amber-700 mt-3 leading-relaxed">
          💡 11월은 일몰이 빨라(17시대) 보행 가능 시간이 짧습니다. 매일 새벽 출발 권장.
        </p>
      </div>

      {/* Quick nav */}
      <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
        <Link to="/schedule" className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:bg-gray-50 active:scale-95 transition-all">
          <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">완주 일정</p>
            <p className="text-xs text-gray-400">10/24 ~ 11/18 (26일)</p>
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
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-indigo-600" />
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
          <div className="flex-1 bg-sky-50 rounded-xl p-3 text-center">
            <p className="text-xs text-sky-600 font-medium">26일 전체</p>
            <p className="text-xl font-black text-sky-700 mt-1">134만원</p>
          </div>
        </div>
      </div>

      {/* Quote — CURRENT_EXPEDITION swaps each time a new trail starts (Olle → Baekdu → Yarigatake → ... → JMT) */}
      <div className="mx-4 mt-4 mb-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-gray-800 text-lg italic font-bold leading-snug">"Not all who wander are lost"</p>
          <p className="text-sky-600 text-base mt-1.5 font-black tracking-wide">{CURRENT_EXPEDITION} to JMT</p>
        </div>
        <img
          src={`${import.meta.env.BASE_URL}images/wanderer.jpg`}
          alt="Jeju Olle Trail wanderer illustration"
          className="w-20 h-28 object-cover rounded-xl border border-gray-100 shadow-sm flex-shrink-0"
        />
      </div>
    </div>
  );
};

export default OlleHome;
