import React, { useState } from 'react';
import { RESERVATIONS } from '../data/reservations';
import { Plane, Car, Ticket as TicketIcon, MoreHorizontal, CheckCircle, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'car' | 'flight' | 'ticket' | 'etc';

const Reservations: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('car');
    const { flights, car, tickets, others } = RESERVATIONS;

    const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
        { id: 'car', label: '렌트카', icon: Car },
        { id: 'flight', label: '항공권', icon: Plane },
        { id: 'ticket', label: '입장권', icon: TicketIcon },
        { id: 'etc', label: '기타', icon: MoreHorizontal },
    ];

    // --- Helpers ---
    const formatFullDate = (date: Date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const weeks = ['일', '월', '화', '수', '목', '금', '토'];
        const week = weeks[date.getDay()];
        const time = date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
        return `${yyyy}-${mm}-${dd}(${week}) ${time}`;
    };

    // --- Tab Views ---
    const CarView = () => {
        const pickupDate = new Date(car.pickupDate);
        const returnDate = new Date(car.returnDate);
        return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="text-red-500 font-bold text-lg">J</span>
                            <span className="font-bold text-lg text-gray-800">렌트카 : {car.company}</span>
                        </div>
                        <div className="text-center py-4">
                            <CheckCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                            <h2 className="text-xl font-bold text-red-500 mb-1">결제완료/예약확정 되었습니다.</h2>
                            <p className="text-sm text-gray-500">인수 1일전 셔틀버스안내 메세지가 발송됩니다.</p>
                        </div>
                    </div>
                    {/* Car Image & Info */}
                    <div className="p-6">
                        <div className="flex flex-col items-center mb-6">
                            {car.imgUrl && (
                                <img src={car.imgUrl} alt={car.model} className="w-full max-w-[200px] object-contain mb-4" />
                            )}
                            <div className="text-right w-full">
                                <div className="text-sm text-gray-500">2020년형</div>
                                <div className="text-lg font-bold text-gray-800">{car.model}</div>
                                <div className="text-sm text-gray-500">{car.specs}</div>
                            </div>
                        </div>
                        {/* Details Table */}
                        <div className="border-t border-gray-100">
                            <div className="flex justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">인수일</span>
                                <span className="text-gray-800">{formatFullDate(pickupDate)}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">반납일</span>
                                <span className="text-gray-800">{formatFullDate(returnDate)}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">자차선택</span>
                                <span className="text-gray-800">{car.insurance}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">차량대수</span>
                                <span className="text-gray-800">1 대</span>
                            </div>
                            {/* Total Cost */}
                            <div className="flex justify-between items-center py-4">
                                <span className="text-gray-600 font-medium">총 대여료</span>
                                <div className="text-right">
                                    <div className="text-xs text-red-400 mb-0.5">{car.rentalDuration}</div>
                                    <div className="text-xl font-bold text-red-500">
                                        {car.cost.toLocaleString()}원
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reservation Info */}
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-800">예약자 정보</span>
                                <span className="text-sm text-gray-500">접수번호 : <span className="text-red-500">{car.reservationNumber}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    const FlightView = () => (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">

            {/* Reservation Header Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-[#DC032D] p-4 flex justify-between items-center text-white">
                    <span className="font-bold">예약번호</span>
                    <span className="font-bold text-lg">{flights.reservationNumber}</span>
                </div>
                <div className="divide-y divide-gray-100">
                    {flights.passengers.map((p, idx) => (
                        <div key={idx} className="p-4 bg-gray-50/50">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-gray-900">{p.name}</h3>
                                    <span className="text-xs text-gray-500">{p.type}</span>
                                </div>
                                {p.memberId && <div className="text-xs text-gray-400">{p.memberId}</div>}
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">항공권 번호</span>
                                <span className="font-medium text-red-500 truncate">{p.ticketNumber}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Outgoing Itinerary */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
                <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
                    <div className="font-bold text-gray-900">가는 여정</div>
                    <div className="text-sm text-gray-500">{formatFullDate(new Date(flights.outgoing.departureTime))}</div>
                </div>

                <div className="flex justify-between items-center mb-6 text-center">
                    <div>
                        <div className="text-sm text-gray-500 mb-1">서울/김포</div>
                        <div className="text-2xl font-bold text-gray-900">
                            {new Date(flights.outgoing.departureTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}
                        </div>
                    </div>
                    <div className="flex-1 px-4 relative">
                        <div className="h-px bg-gray-300 w-full absolute top-1/2 left-0"></div>
                        <span className="relative bg-white px-2 text-xs text-gray-400">직항</span>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 mb-1">제주</div>
                        <div className="text-2xl font-bold text-gray-900">
                            {new Date(flights.outgoing.arrivalTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}
                        </div>
                    </div>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-50 border-dashed">
                        <span className="text-gray-500">편명</span>
                        <span className="font-medium text-gray-900 underline decoration-gray-300">{flights.outgoing.flightNumber} <span className="text-gray-400 no-underline text-xs bg-gray-100 px-1 rounded">{flights.outgoing.aircraft}</span></span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-500">클래스</span>
                        <span className="font-medium text-gray-900">{flights.outgoing.seatClass}</span>
                    </div>
                </div>
            </div>

            {/* Incoming Itinerary */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
                <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
                    <div className="font-bold text-gray-900">오는 여정</div>
                    <div className="text-sm text-gray-500">{formatFullDate(new Date(flights.incoming.departureTime))}</div>
                </div>

                <div className="flex justify-between items-center mb-6 text-center">
                    <div>
                        <div className="text-sm text-gray-500 mb-1">제주</div>
                        <div className="text-2xl font-bold text-gray-900">
                            {new Date(flights.incoming.departureTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}
                        </div>
                    </div>
                    <div className="flex-1 px-4 relative">
                        <div className="h-px bg-gray-300 w-full absolute top-1/2 left-0"></div>
                        <span className="relative bg-white px-2 text-xs text-gray-400">직항</span>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 mb-1">서울/김포</div>
                        <div className="text-2xl font-bold text-gray-900">
                            {new Date(flights.incoming.arrivalTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}
                        </div>
                    </div>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-50 border-dashed">
                        <span className="text-gray-500">편명</span>
                        <span className="font-medium text-gray-900 underline decoration-gray-300">{flights.incoming.flightNumber} <span className="text-gray-400 no-underline text-xs bg-gray-100 px-1 rounded">{flights.incoming.aircraft}</span></span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-500">클래스</span>
                        <span className="font-medium text-gray-900">{flights.incoming.seatClass}</span>
                    </div>
                </div>
            </div>

            {/* Payment Info */}
            <div className="bg-gray-100 p-4 rounded-xl text-sm">
                <div className="flex justify-between mb-1">
                    <span className="text-gray-600">총 결제금액</span>
                    <span className="font-bold text-lg text-red-600">KRW {flights.totalCost.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-400 text-right">
                    {flights.paymentDate} 카드결제 완료
                </div>
            </div>

        </motion.div>
    );

    const TicketView = () => (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            {tickets && tickets.length > 0 ? (
                tickets.map((ticket) => (
                    <div key={ticket.id} className="bg-white rounded-xl shadow-sm p-5 border border-dashed border-gray-300 relative">
                        {/* Ticket Notch */}
                        <div className="absolute -left-3 top-1/2 w-6 h-6 bg-gray-100 rounded-full"></div>
                        <div className="absolute -right-3 top-1/2 w-6 h-6 bg-gray-100 rounded-full"></div>

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">{ticket.title}</h3>
                                <div className="text-sm text-gray-500 flex items-center mt-1">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(ticket.date).toLocaleDateString()}
                                </div>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">예약확정</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-gray-600">{ticket.count}명</span>
                            <span className="text-lg font-bold">{ticket.price.toLocaleString()}원</span>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-10 text-gray-400">예약된 입장권이 없습니다.</div>
            )}
        </motion.div>
    );

    const EtcView = () => (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            {/* Accommodation (from Others or Accommodations array) */}
            {others && others.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-blue-500 font-bold">{item.category}</span>
                        {item.status === 'confirmed' && <CheckCircle className="w-4 h-4 text-blue-500" />}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.details}</p>
                    {item.period && <div className="text-xs text-gray-400">{item.period}</div>}
                </div>
            ))}
            {/* Fallback layout for Accommodations if separate */}
            {RESERVATIONS.accommodations.map((acc, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center mb-3">
                        <div className="p-2 bg-purple-100 rounded-full mr-2">
                            <MapPin className="w-4 h-4 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">숙소</h3>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{acc.name}</h4>
                    <p className="text-sm text-gray-500">{acc.address}</p>
                </div>
            ))}
        </motion.div>
    );

    return (
        <div className="bg-gray-100 min-h-screen pb-safe">
            {/* Header with Tabs */}
            <div className="bg-white sticky top-0 z-20 shadow-sm">
                <div className="p-4 pb-2">
                    <h1 className="text-2xl font-bold text-gray-900">예약/티켓</h1>
                </div>
                {/* Tab Bar */}
                <div className="flex px-4 overflow-x-auto no-scrollbar space-x-4 pb-0">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex flex-col items-center min-w-[60px] pb-3 relative transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                <div className={`p-2 rounded-xl mb-1 transition-all ${isActive ? 'bg-blue-50' : 'bg-transparent'}`}>
                                    <Icon className={`w-6 h-6 ${isActive ? 'stroke-2' : 'stroke-1.5'}`} />
                                </div>
                                <span className={`text-xs ${isActive ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute bottom-0 w-full h-0.5 bg-blue-600 rounded-t-full"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 pb-24">
                <AnimatePresence mode="wait">
                    {activeTab === 'car' && <CarView key="car" />}
                    {activeTab === 'flight' && <FlightView key="flight" />}
                    {activeTab === 'ticket' && <TicketView key="ticket" />}
                    {activeTab === 'etc' && <EtcView key="etc" />}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Reservations;
