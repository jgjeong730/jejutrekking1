import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Ticket, TrendingDown, Info, ArrowRight, XCircle, Ship, Navigation2, Clock, Coffee, Map, AlertCircle, ShieldAlert } from 'lucide-react';

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

            {/* Divider */}
            <div>
                <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-gray-50 px-4 text-gray-400 text-sm font-bold tracking-widest">UDO GUIDE</div>
            </div>

            {/* Udo Guide Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6 px-2"
            >
                <div className="flex items-center gap-2 mb-1">
                    <span className="bg-teal-100 text-teal-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Special Tip</span>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">우도 여행 완벽 가이드</h2>
                <p className="text-gray-500 mt-2 text-sm font-medium leading-relaxed">배편부터 전기차, 맛집까지 가족 여행에 꼭 필요한 핵심 정보만 모았습니다 🏝️</p>
            </motion.div>

            {/* 1. 배편 정보 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-6"
            >
                <div className="bg-white rounded-[24px] shadow-sm overflow-hidden border border-gray-100 relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                    <div className="p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-50 p-2.5 rounded-full">
                                <Ship className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-800">성산항 배편 정보</h3>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">매 30분 간격 운항</p>
                                        <p className="text-xs text-gray-500 mt-0.5">매 정각(00분) 및 30분 출발</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold bg-white px-2 py-1 rounded-md text-blue-600 border border-blue-100">수시운항</span>
                            </div>
                            <div className="bg-red-50/50 rounded-2xl p-4 border border-red-100">
                                <div className="flex items-start gap-3">
                                    <ShieldAlert className="w-5 h-5 text-red-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-red-700 mb-1">승선 필수 준비물</p>
                                        <p className="text-xs text-red-600/80 leading-relaxed">
                                            전원 <strong>신분증(자녀는 등본 등)</strong> 필수! 도착 후 '우도항선' 매표소에서 승선신고서 2부(성산출발용, 우도출발용) 작성 후 발권하세요.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* 2. 전기차 대여 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-6"
            >
                <div className="bg-white rounded-[24px] shadow-sm overflow-hidden border border-gray-100 relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-teal-500"></div>
                    <div className="p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-teal-50 p-2.5 rounded-full">
                                <Navigation2 className="w-6 h-6 text-teal-600" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-800">우도 내 이동수단 대여</h3>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-600 leading-relaxed">우도는 렌터카 반입이 불가하므로 천진항에 내리자마자 <strong>'코코나라'</strong> 등 업체에서 3륜 전기차 대여가 필수입니다.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-center">
                                <p className="text-xs text-gray-500 mb-1">가족 추천</p>
                                <p className="text-sm font-bold text-gray-800">사이드카 / 오픈카</p>
                                <p className="text-base font-extrabold text-teal-600 mt-1">약 3~4만원</p>
                                <p className="text-[10px] text-gray-400 mt-1">2인승 / 무제한 기준</p>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-amber-500 mb-2" />
                                <p className="text-xs text-gray-700 font-bold text-center">운전면허증 지참 필수</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl"><strong>주의:</strong> 전기 자전거는 언덕 지형(우도봉 등)에서 페달 밟기가 매우 힘들어 아이들에게 무리일 수 있으니 꼭 전기차를 대여하세요.</p>
                    </div>
                </div>
            </motion.div>

            {/* 3. 코스 및 소요시간 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-6"
            >
                <div className="bg-gray-900 text-white rounded-[24px] shadow-md overflow-hidden relative">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <Map className="w-6 h-6 text-yellow-400" />
                                <h3 className="font-bold text-lg">핵심 관광 코스 안내</h3>
                            </div>
                            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-yellow-300">총 4~6시간 소요</span>
                        </div>

                        <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
                            {[
                                { title: '서빈백사 (산호해수욕장)', desc: '산호가 부서져 만들어진 하얀 모래와 에메랄드 빛 바다' },
                                { title: '하고수동 해수욕장', desc: '이국적인 풍경, 유명 카페 집중 구역' },
                                { title: '검멀레 해변', desc: '웅장한 절벽과 검은 모래가 어우러진 비경' },
                                { title: '우도봉 (소머리오름)', desc: '우도의 가장 높은 곳, 섬 전체 조망 가능' },
                            ].map((step, idx) => (
                                <div key={idx} className="relative flex items-start gap-4">
                                    <div className="w-7 h-7 rounded-full bg-gray-800 border-2 border-yellow-400 flex items-center justify-center shrink-0 z-10 text-xs font-bold text-yellow-400">{idx + 1}</div>
                                    <div className="pt-1">
                                        <h4 className="font-bold text-white text-sm">{step.title}</h4>
                                        <p className="text-gray-400 text-xs mt-1 leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* 4. 맛집 및 카페 추천 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mb-10"
            >
                <div className="px-2 mb-3 flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-orange-500" />
                    <h3 className="font-bold text-gray-800">검증된 맛집 & 카페 리스트</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex items-start gap-3">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-xl shrink-0">🍔</div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm">하하호호 우도</p>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">제주산 흑돼지 수제버거와 고소한 우도 땅콩 쉐이크가 맛있는 줄서는 식당</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex items-start gap-3">
                        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-xl shrink-0">🍜</div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm">섬소나이 우도점</p>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">하고수동 앞 오션뷰 베이스로 불맛 가득 해물 짬뽕과 백짬뽕, 피자 세트 인기</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex items-start gap-3">
                        <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-xl shrink-0">🍚</div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm">풍원</p>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">한치/흑돼지 주물럭을 먹은 뒤 만들어주는 스토리텔링 듬뿍 '한라산 볶음밥'</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex items-start gap-3">
                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-xl shrink-0">🍦</div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm flex items-center gap-1">블랑로쉐 <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">필수</span></p>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">우도 필수 코스. 하고수동 해수욕장이 한눈에 보이는 뷰에서 먹는 땅콩 아이스크림</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div >
    );
};

export default Guide;
