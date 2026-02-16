import React, { useState } from 'react';
import { SCHEDULE } from '../data/schedule';
import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import type { Activity } from '../types';

const ScheduleMap: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState(1);
    const activeRoute = SCHEDULE.days.find((d) => d.day === selectedDay);

    // Filter activities that are actually on Jeju (exclude pre-arrival checks for the map, or handle them differently)
    // For Day 1, we only want to show markers for Arrival onwards on the map technically, 
    // but user might want to see the flow. Let's map "Remote" locations to a specific "Entry" point or hide them.
    // Better strategy: Only plot markers that have valid Jeju coordinates (e.g. lat > 15 for this specific projection).
    // Or just manually adjust the data. 
    // Let's assume the user wants to see the "Arrival" as the first map point.

    return (
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                제주 여행 지도
            </h2>

            {/* Map Container - Aspect Video fits Jeju better */}
            <div className="relative w-full aspect-video bg-[#F0F9FF] rounded-xl overflow-hidden border border-blue-100 shadow-inner">
                {/* Background Map */}
                <img
                    src="./images/jeju_map.svg"
                    alt="Jeju Map"
                    className="absolute inset-0 w-full h-full object-fill p-2 opacity-80"
                />

                {/* SVG Overlay for Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        d={`M ${activeRoute?.activities.map((a) => {
                            // Skip mainland locations for the line, or start line from top-left off-screen
                            // Simple logic: if lat < 15, map to '0,0' or similar for visual 'fly-in'
                            // But simpler: Just connect them all.
                            return `${a.location.lng}% ${a.location.lat}%`
                        }).join(' L ')}`}
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        fill="none"
                        strokeLinecap="round"
                    />
                </svg>

                {/* Markers */}
                {activeRoute?.activities.map((activity: Activity, idx: number) => (
                    <motion.div
                        key={activity.id}
                        initial={{ scale: 0, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.15, type: 'spring' }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 group"
                        style={{ top: `${activity.location.lat}%`, left: `${activity.location.lng}%` }}
                    >
                        {/* Marker Circle */}
                        <div className={`
                            w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-white text-white font-bold text-[10px] transition-transform group-hover:scale-125
                            ${activity.type === 'flight' ? 'bg-blue-500' :
                                activity.type === 'food' ? 'bg-orange-500' :
                                    activity.type === 'checkin' ? 'bg-purple-500' : 'bg-green-500'}
                        `}>
                            {idx + 1}
                        </div>

                        {/* Label (Only show for map-relevant items or on hover/active) */}
                        <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm text-[10px] font-medium mt-1 whitespace-nowrap opacity-100 text-gray-700">
                            {activity.location.name}
                        </div>
                    </motion.div>
                ))}

                {/* Legend */}
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur p-2 rounded-lg text-[10px] shadow-sm flex flex-col gap-1 z-20">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div>항공/이동</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div>관광</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500"></div>식사</div>
                </div>
            </div>

            {/* Day Selector - Bubbles */}
            <div className="flex overflow-x-auto space-x-2 mt-6 pb-2 no-scrollbar">
                {SCHEDULE.days.map((day) => (
                    <button
                        key={day.day}
                        onClick={() => setSelectedDay(day.day)}
                        className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all ${selectedDay === day.day
                            ? 'bg-gray-800 text-white shadow-lg scale-105'
                            : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        <div className="text-[10px] opacity-60 font-light mb-0.5">{day.date.slice(5)}</div>
                        <div>Day {day.day}</div>
                    </button>
                ))}
            </div>

            {/* Timeline List */}
            <div className="mt-4 px-1">
                <h3 className="font-bold text-gray-800 mb-4 text-base">{activeRoute?.title}</h3>
                <div className="space-y-0">
                    {activeRoute?.activities.map((activity: Activity, idx: number) => (
                        <div key={activity.id} className="flex gap-4 relative pb-6 last:pb-0 group">
                            {/* Vertical Line */}
                            {idx !== activeRoute.activities.length - 1 && (
                                <div className="absolute left-[9px] top-6 bottom-0 w-[2px] bg-gray-100 group-hover:bg-blue-50 transition-colors"></div>
                            )}

                            {/* Dot */}
                            <div className={`
                                relative z-10 flex-shrink-0 w-5 h-5 rounded-full border-4 border-white shadow-sm mt-1
                                ${activity.type === 'flight' ? 'bg-blue-500' :
                                    activity.type === 'food' ? 'bg-orange-500' :
                                        activity.type === 'checkin' ? 'bg-purple-500' : 'bg-green-500'}
                            `}></div>

                            {/* Content */}
                            <div className="flex-1 -mt-1">
                                <span className="inline-flex items-center text-xs font-semibold text-gray-400 mb-1 bg-gray-50 px-1.5 py-0.5 rounded">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {activity.time}
                                </span>
                                <h4 className="text-sm font-bold text-gray-800 leading-tight mb-1">{activity.title}</h4>
                                <p className="text-xs text-gray-500">{activity.location.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScheduleMap;
