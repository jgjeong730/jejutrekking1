import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Ticket, BookOpen, Camera } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="p-6 pt-16 min-h-[calc(100vh-80px)] flex flex-col bg-gray-50">
            <div className="text-center mb-12 flex-none">
                <h1 className="text-[32px] font-black tracking-tight text-gray-900 leading-tight mb-2">
                    Jeju Winter Trip<br />2026
                </h1>
                <p className="text-gray-500 font-medium">
                    (2026.2.21 ~ 2026.2.25)
                </p>
            </div>

            <div className="grid grid-cols-2 gap-5 flex-1 content-start">
                <Link to="/schedule" className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center aspect-square hover:bg-gray-50 transition-all active:scale-95 group">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                        <CalendarDays className="w-10 h-10 text-blue-500" strokeWidth={2} />
                    </div>
                    <span className="font-bold text-gray-800 text-lg tracking-tight">일정표</span>
                </Link>
                <Link to="/reservations" className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center aspect-square hover:bg-gray-50 transition-all active:scale-95 group">
                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                        <Ticket className="w-10 h-10 text-indigo-500" strokeWidth={2} />
                    </div>
                    <span className="font-bold text-gray-800 text-lg tracking-tight">예약 확인</span>
                </Link>
                <Link to="/guide" className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center aspect-square hover:bg-gray-50 transition-all active:scale-95 group">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                        <BookOpen className="w-10 h-10 text-emerald-500" strokeWidth={2} />
                    </div>
                    <span className="font-bold text-gray-800 text-lg tracking-tight">가이드</span>
                </Link>
                <Link to="/records" className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center aspect-square hover:bg-gray-50 transition-all active:scale-95 group">
                    <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-100 transition-colors">
                        <Camera className="w-10 h-10 text-rose-500" strokeWidth={2} />
                    </div>
                    <span className="font-bold text-gray-800 text-lg tracking-tight">여행 기록</span>
                </Link>
            </div>
        </div>
    );
};

export default Home;
