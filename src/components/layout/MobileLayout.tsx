import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Home, Map, Ticket, BookOpen, Camera } from 'lucide-react';
import clsx from 'clsx';

const MobileLayout: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', icon: Home, label: '홈' },
        { path: '/schedule', icon: Map, label: '일정' },
        { path: '/reservations', icon: Ticket, label: '예약' },
        { path: '/guide', icon: BookOpen, label: '가이드' },
        { path: '/records', icon: Camera, label: '기록' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-24">
            <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl overflow-hidden relative">
                {/* Main Content Area */}
                <main className="h-full overflow-y-auto no-scrollbar">
                    <Outlet />
                </main>

                {/* Bottom Navigation */}
                <nav className="fixed bottom-0 w-full max-w-md bg-white/80 backdrop-blur-md border-t border-gray-200 pb-safe">
                    <div className="flex justify-around items-center h-16">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={clsx(
                                        "flex flex-col items-center justify-center w-full h-full transition-colors duration-200",
                                        isActive ? "text-primary-600" : "text-gray-400 hover:text-gray-600"
                                    )}
                                >
                                    <item.icon
                                        size={24}
                                        strokeWidth={isActive ? 2.5 : 2}
                                        className={clsx("mb-1 transition-transform", isActive && "scale-105")}
                                    />
                                    <span className="text-[10px] font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default MobileLayout;
