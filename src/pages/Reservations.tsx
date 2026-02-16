import React from 'react';
import { RESERVATIONS } from '../data/reservations';
import { Plane, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Reservations: React.FC = () => {
    const { flights, car } = RESERVATIONS;

    // Dates for Car
    const pickupDate = new Date(car.pickupDate);
    const returnDate = new Date(car.returnDate);

    // Formatter
    const formatFullDate = (date: Date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        // Weekday in Korean
        const weeks = ['일', '월', '화', '수', '목', '금', '토'];
        const week = weeks[date.getDay()];
        const time = date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
        return `${yyyy}-${mm}-${dd}(${week}) ${time}`;
    };

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-gray-100 min-h-screen pb-safe">
            {/* Header Area */}
            <div className="bg-white p-6 sticky top-0 z-10 shadow-sm">
                <h1 className="text-xl font-bold text-center">예약 완료</h1>
            </div>

            <motion.div
                className="p-4 space-y-6"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {/* Car Reservation Card - Matching the Image Style */}
                <motion.div variants={item} className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                </motion.div>

                {/* Flight Card (Simplified) */}
                <motion.div variants={item} className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center mb-4">
                        <div className="p-2 bg-blue-100 rounded-full mr-3">
                            <Plane className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">항공권 정보</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="relative pl-4 border-l-2 border-blue-200">
                            <div className="text-sm text-gray-500 mb-1">가는 편 (김포 &rarr; 제주)</div>
                            <div className="font-bold text-gray-800">{flights.outgoing.airline} {flights.outgoing.flightNumber}</div>
                            <div className="text-sm">
                                {new Date(flights.outgoing.departureTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                                {" - "}
                                {new Date(flights.outgoing.arrivalTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                        <div className="relative pl-4 border-l-2 border-blue-200">
                            <div className="text-sm text-gray-500 mb-1">오는 편 (제주 &rarr; 김포)</div>
                            <div className="font-bold text-gray-800">{flights.incoming.airline} {flights.incoming.flightNumber}</div>
                            <div className="text-sm">
                                {new Date(flights.incoming.departureTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                                {" - "}
                                {new Date(flights.incoming.arrivalTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default Reservations;
