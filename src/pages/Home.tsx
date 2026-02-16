import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const today = new Date();
    const tripStart = new Date('2026-02-21T00:00:00');
    const diffTime = tripStart.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return (
        <div className="p-6 pt-12">
            <div className="mb-8">
                <h2 className="text-gray-500 font-medium mb-1">제주 여행 2026</h2>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                    D-{diffDays > 0 ? diffDays : 'Day'}
                </h1>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Link to="/schedule" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center aspect-square hover:bg-gray-50 transition-colors">
                    <span className="text-7xl mb-4">📅</span>
                    <span className="font-semibold">일정표</span>
                </Link>
                <Link to="/reservations" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center aspect-square hover:bg-gray-50 transition-colors">
                    <span className="text-7xl mb-4">🎫</span>
                    <span className="font-semibold">예약 확인</span>
                </Link>
                <Link to="/guide" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center aspect-square hover:bg-gray-50 transition-colors">
                    <span className="text-7xl mb-4">📖</span>
                    <span className="font-semibold">가이드</span>
                </Link>
                <Link to="/records" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center aspect-square hover:bg-gray-50 transition-colors">
                    <span className="text-7xl mb-4">📸</span>
                    <span className="font-semibold">여행 기록</span>
                </Link>
            </div>
        </div>
    );
};

export default Home;
