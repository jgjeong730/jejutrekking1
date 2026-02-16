import React, { useState } from 'react';
import { SCHEDULE } from '../data/schedule';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

const ScheduleMap: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState(1);
    const activeRoute = SCHEDULE.days.find((d) => d.day === selectedDay);

    // Filter for Jeju activities only (coordinates > 0)
    const jejuActivities = activeRoute?.activities.filter(a => a.location.lat > 0 && a.location.lng > 0) || [];
    const mainlandActivities = activeRoute?.activities.filter(a => a.location.lat < 0) || [];

    // Need to map 0-100% coordinates to the SVG viewbox (approx 40-290 x, 100-200 y)
    // Actually, let's stick to % placement on top of the SVG.
    // Ensure aspect ratio of container matches the SVG roughly (300x120 roughly -> 2.5:1)

    return (
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                제주 여행 지도
            </h2>

            {/* Mainland/Transfer Section (if any) */}
            {mainlandActivities.length > 0 && (
                <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-3 overflow-x-auto">
                    <span className="text-xs font-bold text-gray-500 whitespace-nowrap">출발/이동</span>
                    {mainlandActivities.map((a, i) => (
                        <div key={a.id} className="flex items-center text-xs text-gray-600 whitespace-nowrap">
                            {i > 0 && <ArrowRight className="w-3 h-3 mx-2 text-gray-300" />}
                            <span className="bg-white px-2 py-1 rounded shadow-sm border border-gray-200">{a.title.split(' ')[0]}</span>
                        </div>
                    ))}
                    <ArrowRight className="w-3 h-3 mx-2 text-blue-300" />
                    <span className="text-xs font-bold text-blue-600">제주 도착</span>
                </div>
            )}

            {/* Map Container - Adjusted aspect ratio */}
            <div className="relative w-full aspect-[2/1] bg-[#F8FAFC] rounded-xl overflow-hidden border border-slate-200 shadow-inner">
                {/* SVG Map Layer */}
                <svg className="absolute inset-0 w-full h-full p-6" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <filter id="shadow">
                            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.1" />
                        </filter>
                    </defs>

                    {/* Ocean Texture Overlay (Optional) */}

                    {/* Jeju Island Shape */}
                    <path
                        d="M160,200 C160,180 200,140 300,130 C400,120 550,130 650,160 C730,190 750,230 740,260 C720,310 600,350 450,350 C300,350 180,300 160,250 C150,225 155,210 160,200 Z"
                        fill="white"
                        stroke="#94A3B8"
                        strokeWidth="2"
                        filter="url(#shadow)"
                    />

                    {/* Detail: Hallasan */}
                    <path d="M420,240 L450,200 L480,240 Z" fill="#E2E8F0" opacity="0.5" />

                    {/* Detail: Udo */}
                    <circle cx="760" cy="180" r="8" fill="white" stroke="#94A3B8" strokeWidth="2" />

                    {/* Connection Line */}
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        d={`M ${jejuActivities.map(a => `${a.location.lng * 8} ${a.location.lat * 4}`).join(' L ')}`}
                        stroke="#3B82F6"
                        strokeWidth="3"
                        strokeDasharray="6 6"
                        fill="none"
                        strokeLinecap="round"
                    />
                </svg>

                {/* Markers Layer (HTML for easier tooltip/interaction) */}
                {jejuActivities.map((activity, idx) => (
                    <motion.div
                        key={activity.id}
                        initial={{ scale: 0, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.15, type: 'spring' }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 group cursor-pointer"
                        style={{ top: `${activity.location.lat}%`, left: `${activity.location.lng}%` }}
                    >
                        <div className={`
                            w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-white text-white font-bold text-[10px] transition-transform group-hover:scale-110
                            ${activity.type === 'flight' ? 'bg-blue-500' :
                                activity.type === 'food' ? 'bg-orange-500' :
                                    activity.type === 'checkin' ? 'bg-purple-600' : 'bg-green-500'}
                        `}>
                            {mainlandActivities.length + idx + 1}
                        </div>

                        <div className="absolute top-7 bg-white/95 backdrop-blur px-2 py-1 rounded-md shadow-md text-[10px] font-bold whitespace-nowrap border border-gray-100 text-gray-700">
                            {activity.location.name}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Day Selector */}
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
                <h3 className="font-bold text-gray-800 mb-4 text-base flex items-center">
                    {activeRoute?.title}
                </h3>
                <div className="space-y-0">
                    {/* Render Mainland items first if Day 1 */}
                    {mainlandActivities.length > 0 && selectedDay === 1 && mainlandActivities.map((activity) => (
                        <div key={activity.id} className="flex gap-4 relative pb-6 last:pb-0 group opacity-70">
                            <div className="absolute left-[9px] top-6 bottom-0 w-[2px] bg-gray-100"></div>
                            <div className="relative z-10 flex-shrink-0 w-5 h-5 rounded-full border-4 border-gray-50 bg-gray-400 shadow-sm mt-1"></div>
                            <div className="flex-1 -mt-1">
                                <span className="inline-flex items-center text-xs font-semibold text-gray-400 mb-1 bg-gray-50 px-1.5 py-0.5 rounded">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {activity.time}
                                </span>
                                <h4 className="text-sm font-bold text-gray-500 leading-tight mb-1">{activity.title}</h4>
                                <p className="text-xs text-gray-400">{activity.location.name}</p>
                            </div>
                        </div>
                    ))}

                    {/* Jeju Items */}
                    {jejuActivities.map((activity, idx) => (
                        <div key={activity.id} className="flex gap-4 relative pb-6 last:pb-0 group">
                            {idx !== jejuActivities.length - 1 && (
                                <div className="absolute left-[9px] top-6 bottom-0 w-[2px] bg-gray-100 group-hover:bg-blue-50 transition-colors"></div>
                            )}
                            <div className={`
                                relative z-10 flex-shrink-0 w-5 h-5 rounded-full border-4 border-white shadow-md mt-1
                                ${activity.type === 'flight' ? 'bg-blue-500' :
                                    activity.type === 'food' ? 'bg-orange-500' :
                                        activity.type === 'checkin' ? 'bg-purple-600' : 'bg-green-500'}
                            `}></div>
                            <div className="flex-1 -mt-1">
                                <span className="inline-flex items-center text-xs font-semibold text-gray-500 mb-1 bg-gray-50 px-1.5 py-0.5 rounded">
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
