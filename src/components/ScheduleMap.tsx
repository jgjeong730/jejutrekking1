import React, { useState } from 'react';
import { SCHEDULE } from '../data/schedule';
import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';
import type { Activity } from '../types';

const ScheduleMap: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState(1);
    const activeRoute = SCHEDULE.days.find((d) => d.day === selectedDay);

    return (
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">제주 여행 지도</h2>

            {/* Map Container */}
            <div className="relative w-full aspect-[4/3] bg-blue-50 rounded-xl overflow-hidden border border-blue-100">
                {/* Background Map */}
                <img
                    src="./images/jeju_map.svg"
                    alt="Jeju Map"
                    className="absolute inset-0 w-full h-full object-contain p-4 opacity-50"
                />

                {/* Markers */}
                {activeRoute?.activities.map((activity: Activity, idx: number) => (
                    <motion.div
                        key={activity.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                        style={{ top: `${activity.location.lat}%`, left: `${activity.location.lng}%` }}
                    >
                        <div className={`
                            w-4 h-4 rounded-full flex items-center justify-center shadow-md text-white font-bold text-[8px] z-10
                            ${activity.type === 'flight' ? 'bg-blue-500' :
                                activity.type === 'food' ? 'bg-orange-500' :
                                    activity.type === 'checkin' ? 'bg-purple-500' : 'bg-green-500'}
                        `}>
                            {idx + 1}
                        </div>
                        <div className="bg-white px-1.5 py-0.5 rounded shadow text-[8px] font-bold mt-1 whitespace-nowrap z-20">
                            {activity.location.name}
                        </div>
                    </motion.div>
                ))}

                {/* Connecting Lines (Simple SVG Overlay) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        d={`M ${activeRoute?.activities.map((a: Activity) => `${a.location.lng * 4} ${a.location.lat * 3}`).join(' L ')}`}
                        stroke="gray"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        fill="none"
                    />
                </svg>

                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-2 rounded-lg text-xs shadow-sm">
                    <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div>항공/이동</div>
                    <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-green-500"></div>관광/액티비티</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div>식사/카페</div>
                </div>
            </div>

            {/* Day Selector */}
            <div className="flex overflow-x-auto space-x-2 mt-4 pb-2 no-scrollbar">
                {SCHEDULE.days.map((day) => (
                    <button
                        key={day.day}
                        onClick={() => setSelectedDay(day.day)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedDay === day.day
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Day {day.day}
                        <span className="block text-[10px] opacity-80">
                            {day.date.slice(5)} ({new Date(day.date).toLocaleDateString('ko-KR', { weekday: 'short' })})
                        </span>
                    </button>
                ))}
            </div>

            {/* Activity List */}
            <div className="mt-6 space-y-4">
                <h3 className="font-bold text-gray-800 flex items-center">
                    <Navigation className="w-4 h-4 mr-2 text-blue-500" />
                    {activeRoute?.title}
                </h3>
                <div className="relative pl-4 border-l-2 border-dashed border-gray-200 space-y-6">
                    {activeRoute?.activities.map((activity: Activity) => (
                        <div key={activity.id} className="relative">
                            <div className={`absolute -left-[21px] top-0 w-3 h-3 rounded-full ${activity.type === 'flight' ? 'bg-blue-500' :
                                activity.type === 'food' ? 'bg-orange-500' : 'bg-green-500'
                                }`}></div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-sm text-gray-500 font-mono block mb-0.5">{activity.time}</span>
                                    <h4 className="font-bold text-gray-800">{activity.title}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScheduleMap;
