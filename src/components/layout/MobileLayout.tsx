import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Home, CalendarDays, Mountain, ClipboardList, Info } from 'lucide-react';
import clsx from 'clsx';

const MobileLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: '홈' },
    { path: '/schedule', icon: CalendarDays, label: '일정' },
    { path: '/courses', icon: Mountain, label: '한라산' },
    { path: '/prep', icon: ClipboardList, label: '준비' },
    { path: '/info', icon: Info, label: '정보' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-24">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl overflow-hidden relative">
        <main className="h-full overflow-y-auto no-scrollbar">
          <Outlet />
        </main>

        <nav className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-md border-t border-gray-200 pb-safe">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    'flex flex-col items-center justify-center w-full h-full transition-colors duration-200',
                    isActive ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
                  )}
                >
                  <item.icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={clsx('mb-0.5 transition-transform', isActive && 'scale-110')}
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
