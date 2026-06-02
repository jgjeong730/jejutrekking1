import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Home, CalendarDays, Mountain, ClipboardList, Info, Navigation } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { path: '/',         icon: Home,          label: '홈'   },
  { path: '/schedule', icon: CalendarDays,   label: '일정' },
  { path: '/tracker',  icon: Navigation,     label: '트래커' },
  { path: '/courses',  icon: Mountain,       label: '한라산' },
  { path: '/prep',     icon: ClipboardList,  label: '준비' },
  { path: '/info',     icon: Info,           label: '정보' },
];

const MobileLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl overflow-hidden relative flex flex-col">
        <main className="flex-1 overflow-y-auto no-scrollbar">
          <Outlet />
        </main>

        <nav className="flex-none bg-white/90 backdrop-blur-md border-t border-gray-200">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    'flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200',
                    isActive ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
                  )}
                >
                  <item.icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={clsx('mb-0.5 transition-transform', isActive && 'scale-110')}
                  />
                  <span className="text-[9px] font-medium leading-tight">{item.label}</span>
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
