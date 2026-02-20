import React, { useState } from 'react';
import { RESERVATIONS } from '../data/reservations';
import { Plane, Car, MoreHorizontal, CheckCircle, MapPin, Bus, ArrowRight, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScheduleMap from '../components/ScheduleMap';

type Tab = 'flight' | 'car' | 'accommodation' | 'bus' | 'etc';

const Reservations: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('flight'); // Default to flight
    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const [showQRModal, setShowQRModal] = useState(false);
    const { flights, car, accommodations, busTickets, others } = RESERVATIONS;

    const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
        { id: 'flight', label: '항공권', icon: Plane },
        { id: 'car', label: '렌트카', icon: Car },
        { id: 'accommodation', label: '숙박', icon: MapPin },
        { id: 'bus', label: '승차권', icon: Bus },
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

    // --- Mobile Ticket Modal ---
    const MobileTicketModal = ({ ticket, onClose }: { ticket: any; onClose: () => void }) => {
        const BASE_URL = import.meta.env.BASE_URL;

        let galleryItems: { type: string; src: string; label: string }[] = [];

        if (ticket.id === 'b1') {
            // Mangpo -> Gimpo (Existing)
            galleryItems = [
                { type: 'ticket', src: `${BASE_URL}images/ticket_09.jpeg`, label: '좌석 09 (아동)' },
                { type: 'qr', src: `${BASE_URL}images/QR_09.jpeg`, label: 'QR코드 09' },
                { type: 'ticket', src: `${BASE_URL}images/ticket_10.jpeg`, label: '좌석 10 (아동)' },
                { type: 'qr', src: `${BASE_URL}images/QR_10.jpeg`, label: 'QR코드 10' },
                { type: 'ticket', src: `${BASE_URL}images/ticket_11.jpeg`, label: '좌석 11 (일반)' },
                { type: 'qr', src: `${BASE_URL}images/QR_11.jpeg`, label: 'QR코드 11' },
                { type: 'ticket', src: `${BASE_URL}images/ticket_12.jpeg`, label: '좌석 12 (아동)' },
                { type: 'qr', src: `${BASE_URL}images/QR_12.jpeg`, label: 'QR코드 12' },
            ];
        } else if (ticket.id === 'b2') {
            // Gimpo -> Suwon (New)
            galleryItems = [
                { type: 'ticket', src: `${BASE_URL}images/ticket_04.jpeg`, label: '좌석 04 (일반)' },
                { type: 'qr', src: `${BASE_URL}images/QR_04.jpeg`, label: 'QR코드 04' },
                { type: 'ticket', src: `${BASE_URL}images/ticket_05.jpeg`, label: '좌석 05 (아동)' },
                { type: 'qr', src: `${BASE_URL}images/QR_05.jpeg`, label: 'QR코드 05' },
                { type: 'ticket', src: `${BASE_URL}images/ticket_07.jpeg`, label: '좌석 07 (일반)' },
                { type: 'qr', src: `${BASE_URL}images/QR_07.jpeg`, label: 'QR코드 07' },
                { type: 'ticket', src: `${BASE_URL}images/ticket_08.jpeg`, label: '좌석 08 (아동)' },
                { type: 'qr', src: `${BASE_URL}images/QR_08.jpeg`, label: 'QR코드 08' },
            ];
        }

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl w-full max-w-sm overflow-hidden flex flex-col max-h-[90vh]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-4 bg-gray-900 text-white flex justify-between items-center shrink-0">
                        <div>
                            <h3 className="font-bold text-lg">모바일 승차권</h3>
                            <p className="text-xs text-gray-400">{ticket.departureLocation} <ArrowRight className="inline w-3 h-3" /> {ticket.arrivalLocation}</p>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">닫기</button>
                    </div>

                    {/* Carousel Area */}
                    <div className="overflow-x-auto whitespace-nowrap scroll-smooth p-4 bg-gray-100 no-scrollbar flex items-center flex-1" style={{ scrollSnapType: 'x mandatory' }}>
                        {galleryItems.map((item, idx) => (
                            <div key={idx} className="inline-block w-full flex-shrink-0 px-2 h-full flex items-center justify-center" style={{ scrollSnapAlign: 'center' }}>
                                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative group w-full max-w-[320px] flex flex-col">
                                    <div className="aspect-[9/16] bg-gray-200 relative flex items-center justify-center overflow-hidden">
                                        <img
                                            src={item.src}
                                            alt={item.label}
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://placehold.co/300x500?text=Image+Not+Found';
                                            }}
                                        />
                                    </div>
                                    <div className="p-3 text-center bg-white border-t border-gray-100">
                                        <div className="flex justify-center items-center space-x-2 text-sm text-gray-600 mb-1">
                                            {item.type === 'qr' ? <QrCode className="w-5 h-5 text-blue-500" /> : <Bus className="w-5 h-5 text-red-500" />}
                                            <span className="font-medium">{item.label}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 text-center text-sm text-gray-500 bg-white border-t border-gray-100 shrink-0">
                        좌우로 슬라이드하여 승차권과 QR코드를 확인하세요
                    </div>
                </motion.div>
            </div>
        );
    };

    // --- QR Code Modal (Keeping for reference, but main flow uses MobileTicketModal) ---
    const QRCodeModal = ({ onClose }: { onClose: () => void }) => {
        const BASE_URL = import.meta.env.BASE_URL;
        const qrImages = [
            { src: `${BASE_URL}images/QR_09.jpeg`, number: '20260216-1545-51-00143-12', sub: '20260221-1445-09-00-1', type: '(일반)' },
            { src: `${BASE_URL}images/QR_10.jpeg`, number: '20260216-1545-51-00145-41', sub: '20260221-1445-10-32-1', type: '(아동)' },
            { src: `${BASE_URL}images/QR_11.jpeg`, number: '20260216-1545-51-00144-28', sub: '20260221-1445-11-00-1', type: '(일반)' },
            { src: `${BASE_URL}images/QR_12.jpeg`, number: '20260216-1545-51-00143-12', sub: '20260221-1445-12-32-1', type: '(아동)' }
        ];

        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-lg w-full max-w-2xl overflow-hidden relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="p-6 pb-2">
                        <h3 className="text-3xl font-bold text-gray-900 border-b-2 border-red-500 inline-block pb-1">QR코드</h3>
                    </div>

                    {/* Carousel Area */}
                    <div className="overflow-x-auto whitespace-nowrap scroll-smooth p-4 no-scrollbar flex items-center" style={{ scrollSnapType: 'x mandatory' }}>
                        {qrImages.map((item, idx) => (
                            <div key={idx} className="inline-block w-full flex-shrink-0 px-4 flex flex-col items-center justify-center" style={{ scrollSnapAlign: 'center' }}>
                                <div className="aspect-square w-full max-w-[600px] bg-white flex items-center justify-center mb-6">
                                    <img
                                        src={item.src}
                                        alt={`QR Code ${idx + 1}`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="text-center space-y-2">
                                    <div className="text-lg font-medium text-gray-800 tracking-tight">{item.number}</div>
                                    <div className="text-lg font-medium text-gray-800 tracking-tight">{item.sub}</div>
                                    <div className="text-2xl font-bold text-gray-900 mt-2">{item.type}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center pb-6">
                        <div className="flex justify-center space-x-1">
                            {qrImages.map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                            ))}
                        </div>
                    </div>

                </motion.div>
            </div>
        );
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

            {/* Seat Check-in Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">좌석 체크인</h2>
                <div className="mb-6 relative">
                    {/* Seat Map Image */}
                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                        <img src="./images/seat_map.jpg" alt="Seat Map" className="w-full object-cover" />
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">* 실제 탑승 기종에 따라 좌석 배치는 상이할 수 있습니다.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {flights.passengers.map((p, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">{p.name}</span>
                            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{p.seat}</span>
                        </div>
                    ))}
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

    const AccommodationView = () => {
        // Sort accommodations by check-in date
        const sortedAccs = accommodations ? [...accommodations].sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime()) : [];

        // Prepare items for ScheduleMap
        const mapItems = sortedAccs.map((acc, index) => {
            // Rough hardcoded coordinates for the 3 specific hotels to fit on the custom map image
            let lat = 50;
            let lng = 50;
            if (acc.name.includes("신신호텔")) {
                lat = 85; // South
                lng = 50; // Center
            } else if (acc.name.includes("항공우주")) {
                lat = 75; // South
                lng = 25; // West
            } else if (acc.name.includes("켄싱턴")) {
                lat = 82; // South
                lng = 55; // Center-East
            }

            return {
                id: `acc-${index}`,
                title: acc.name,
                type: 'checkin' as const,
                location: { name: acc.name, lat, lng }
            };
        });

        // Add dummy activity structure needed by ScheduleMap
        const dummyActivityItems = mapItems.map((item, idx) => ({ ...item, day: idx + 1, time: '' }));


        return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6 relative">

                {/* Map View */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-purple-600" />
                            숙소 위치 안내
                        </h3>
                    </div>
                    <div className="h-[250px] relative">
                        {/* We import ScheduleMap at the top and use it here */}
                        <ScheduleMap customActivities={dummyActivityItems} hideTimeline={true} />
                    </div>
                </div>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-purple-100/80 z-0"></div>

                    {sortedAccs.map((acc, idx) => {
                        const checkInDate = new Date(acc.checkIn);
                        const checkOutDate = new Date(acc.checkOut);
                        // Use Math.round to fix daylight savings or exact hour discrepancies
                        const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

                        return (
                            <div key={idx} className="relative z-10 flex mb-6 last:mb-0 pt-2">
                                {/* Timeline Node */}
                                <div className="flex-none flex flex-col items-center mr-4 w-12">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center border-4 border-gray-100 shadow-sm z-10">
                                        <span className="text-purple-700 font-bold">{idx + 1}</span>
                                    </div>
                                    <div className="mt-2 text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                                        {nights}박 {nights + 1}일
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                                    <div className="p-4 bg-gradient-to-r from-purple-50 to-white border-b border-gray-100">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-lg font-bold text-gray-900 leading-tight">{acc.name}</h3>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{acc.address}</p>
                                        {acc.roomType && (
                                            <div className="inline-block mt-2 text-xs font-medium text-purple-700 bg-white border border-purple-200 px-2 py-1 rounded-md shadow-sm">
                                                {acc.roomType}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-center flex-1">
                                                <div className="text-[10px] text-gray-400 font-medium mb-1 bg-gray-50 rounded-full px-2 py-0.5 inline-block">체크인</div>
                                                <div className="font-bold text-gray-800 text-sm mt-1">
                                                    {formatFullDate(checkInDate).split(' ')[0]}
                                                </div>
                                                <div className="text-lg font-black text-gray-900 mt-1">
                                                    {formatFullDate(checkInDate).split(' ')[1]}
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center px-1">
                                                <div className="w-full flex items-center justify-center">
                                                    <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                                    <div className="w-6 h-px bg-gray-300 dashed"></div>
                                                    <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                                </div>
                                                <span className="text-[10px] text-gray-400 mt-1 font-medium">{nights}박</span>
                                            </div>

                                            <div className="text-center flex-1">
                                                <div className="text-[10px] text-gray-400 font-medium mb-1 bg-gray-50 rounded-full px-2 py-0.5 inline-block">체크아웃</div>
                                                <div className="font-bold text-gray-800 text-sm mt-1">
                                                    {formatFullDate(checkOutDate).split(' ')[0]}
                                                </div>
                                                <div className="text-lg font-black text-gray-900 mt-1">
                                                    {formatFullDate(checkOutDate).split(' ')[1]}
                                                </div>
                                            </div>
                                        </div>

                                        {acc.cost !== undefined && acc.cost > 0 && (
                                            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                                <span className="text-gray-500 text-xs font-medium">결제금액</span>
                                                <span className="font-bold text-lg text-red-500 tracking-tight">{acc.cost.toLocaleString()}원</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        );
    };

    const BusTicketView = () => (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            {busTickets && busTickets.map((ticket) => (
                <div key={ticket.id} className="space-y-2">
                    <div className="text-sm font-bold text-gray-600 ml-1">예매일 : {ticket.bookingDate}</div>
                    <div
                        className={`bg-white rounded-xl shadow-md overflow-hidden transition-transform active:scale-95 cursor-pointer ring-2 ring-transparent hover:ring-sky-200`}
                        onClick={() => setSelectedTicket(ticket)}
                    >
                        {/* Header - Sky Blue */}
                        <div className="bg-sky-400 p-4 text-white">
                            <div className="flex justify-between items-center px-2">
                                <span className="text-lg font-bold">{ticket.departureLocation}</span>
                                <ArrowRight className="w-6 h-6 text-white/80" />
                                <span className="text-lg font-bold">{ticket.arrivalLocation}</span>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-5 flex justify-between">
                            <div className="flex-1">
                                <div className="mb-3">
                                    <span className="text-red-500 font-bold text-sm bg-red-50 px-1 rounded">출발일자</span>
                                    <span className="text-red-500 font-bold ml-1 text-lg">
                                        {ticket.departureTime} 출발
                                    </span>
                                </div>

                                <div className="space-y-1 text-gray-600 text-sm">
                                    {ticket.seats.map((seat, idx) => (
                                        <div key={idx} className="flex items-center space-x-1">
                                            <span>좌석 {seat.seatNumber}</span>
                                            <span className="text-gray-300">/</span>
                                            <span>{seat.type}</span>
                                            <span className="text-gray-300">/</span>
                                            <span>{seat.busType}</span>
                                            {seat.tagless && (
                                                <span className="ml-1 px-1.5 py-0.5 bg-yellow-400 text-yellow-900 text-[10px] font-bold rounded">Tagless</span>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 flex space-x-3 text-sm font-medium text-gray-500">
                                    <span>발권완료</span>
                                    <span className="text-gray-300">|</span>
                                    <span>상세보기</span>
                                </div>
                            </div>

                            {/* Mobile Ticket Button (Triggers Interleaved Modal) */}
                            <div
                                className="flex flex-col items-center justify-center border-l border-gray-100 pl-4 ml-2 min-w-[80px] cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTicket(ticket);
                                }}
                            >
                                <QrCode className="w-16 h-16 text-gray-800 mb-1" />
                                <span className="text-xs text-gray-500">모바일 발권</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {(!busTickets || busTickets.length === 0) && (
                <div className="text-center py-10 text-gray-400">예약된 승차권이 없습니다.</div>
            )}
        </motion.div>
    );


    const EtcView = () => (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
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
            {/* If there are generic tickets (like Entry Tickets) they can be shown here if needed, or moved to 'others' data */}
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
            <div className="p-4 pb-24 relative">
                <AnimatePresence mode="wait">
                    {activeTab === 'flight' && <FlightView key="flight" />}
                    {activeTab === 'car' && <CarView key="car" />}
                    {activeTab === 'accommodation' && <AccommodationView key="accommodation" />}
                    {activeTab === 'bus' && <BusTicketView key="bus" />}
                    {activeTab === 'etc' && <EtcView key="etc" />}
                </AnimatePresence>

                {/* Modal Overlay */}
                <AnimatePresence>
                    {selectedTicket && (
                        <MobileTicketModal
                            ticket={selectedTicket}
                            onClose={() => setSelectedTicket(null)}
                        />
                    )}
                    {showQRModal && (
                        <QRCodeModal
                            onClose={() => setShowQRModal(false)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Reservations;
