import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Ticket, TrendingDown, Info, ArrowRight, XCircle } from 'lucide-react';

const Guide: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen pb-20 p-4 pt-8 md:pt-12 font-sans text-gray-900">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 px-2"
            >
                <h1 className="text-3xl font-extrabold tracking-tight">제주투어패스 가이드</h1>
                <p className="text-gray-500 mt-2 font-medium">비용 분석 및 완벽 활용법 🎫</p>
            </motion.div>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-blue-600 rounded-[28px] p-6 text-white shadow-lg mb-6 relative overflow-hidden"
            >
                <div className="relative z-10">
                    <span className="bg-blue-500/50 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm mb-4 inline-block">강력 추천</span>
                    <h2 className="text-2xl font-bold mb-2">제주투어패스 48시간권</h2>
                    <p className="text-blue-100 mb-6 text-sm leading-relaxed">
                        현재 일정을 분석한 결과, 48시간권 구매 시
                        개별 결제보다 <span className="text-yellow-300 font-bold">비용이 약 45% 절감</span>되며 매표소 대기 시간도 단축됩니다.
                    </p>
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-blue-200 text-xs mb-1">예상 비용 (1인)</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-extrabold">37,900</span>
                                <span className="text-blue-200 font-medium">원</span>
                            </div>
                        </div>
                        <Ticket className="w-12 h-12 text-blue-500/50 absolute right-4 bottom-4" />
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-50 transform translate-x-10 -translate-y-10" />
            </motion.div>

            {/* Benefit List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
            >
                <div className="px-2 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <h3 className="font-bold text-gray-800">투어패스 프리패스 여행지</h3>
                </div>
                <div className="bg-white rounded-[24px] shadow-sm overflow-hidden divide-y divide-gray-50 border border-gray-100">
                    {[
                        { day: '2일차', time: '10:30', name: '더마파크 기마공연', price: '25,000원' },
                        { day: '2일차', time: '14:30', name: '비체올린 카약', price: '18,000원' },
                        { day: '3일차', time: '10:30', name: '카멜리아힐', price: '10,000원' },
                        { day: '4일차', time: '10:30', name: '제주 아트서커스', price: '25,000원' },
                    ].map((item, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-50 w-12 h-12 flex flex-col items-center justify-center rounded-xl text-blue-600 font-bold">
                                    <span className="text-xs">{item.day}</span>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{item.name}</p>
                                    <p className="text-xs text-gray-500 font-medium mt-0.5">{item.time}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-300 line-through">{item.price}</p>
                                <p className="text-sm font-bold text-blue-600">무료</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Cost Comparison */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
            >
                <div className="px-2 mb-3 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-gray-800">비용 시뮬레이션 (1인 기준)</h3>
                </div>
                <div className="bg-white rounded-[24px] shadow-sm p-5 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-bold text-gray-500">인터넷 개별 결제 최저가</span>
                        <span className="font-extrabold text-gray-800 text-lg">약 71,000원</span>
                    </div>

                    <div className="flex justify-center my-4">
                        <ArrowRight className="w-5 h-5 text-gray-300 rotate-90" />
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-indigo-600 flex items-center gap-1">투어패스 + 추가결제</span>
                            <span className="font-extrabold text-indigo-600 text-lg">37,900원</span>
                        </div>
                        <ul className="text-xs text-gray-500 space-y-1.5 mt-3">
                            <li className="flex justify-between"><span>• 48시간 투어패스</span> <span>~26,900원</span></li>
                            <li className="flex justify-between"><span>• 승마 현장추가 (더마파크)</span> <span>~11,000원</span></li>
                        </ul>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-600 font-semibold">
                            결과적으로 <strong className="text-blue-600 text-base">약 33,100원</strong> 이득!
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Excluded Items */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="px-2 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-orange-500" />
                    <h3 className="font-bold text-gray-800">참고사항 및 미적용 대상</h3>
                </div>
                <div className="bg-white rounded-[24px] shadow-sm p-4 border border-gray-100 space-y-3">
                    <div className="flex items-start gap-3">
                        <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-gray-800">더마파크 승마 체험</p>
                            <p className="text-xs text-gray-500 mt-0.5">승마는 투어패스 미포함 항목입니다. 현장에서 할인을 적용받거나 인터넷에서 개별 구매하세요.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-gray-800">우도 배편 및 도두해수파크</p>
                            <p className="text-xs text-gray-500 mt-0.5">5일차 일정은 투어패스 혜택 시설이 아닙니다. 모두 동일하게 개별 지출이 필요합니다.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Info className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-gray-800">시간 활성화 시점 꿀팁</p>
                            <p className="text-xs text-gray-500 mt-0.5">2일차(10:30) 더마파크에서 처음 바코드를 찍고, 4일차(10:30) 아트서커스 입장을 조금만 앞당기면 48시간을 1분도 남김없이 완벽하게 쓸 수 있습니다.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Guide;
