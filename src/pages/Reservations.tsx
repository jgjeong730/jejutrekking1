import React from 'react';
import { RESERVATIONS } from '../data/reservations';
import { Plane, Car, ArrowRight, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const Reservations: React.FC = () => {
    const { flights, car } = RESERVATIONS;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    // Card Animation Variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="p-6 pt-12">
            <h1 className="text-3xl font-bold mb-2">My Trip</h1>
            <p className="text-gray-500 mb-8">Jeju Island • Feb 21 - Feb 25</p>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-6"
            >
                {/* Flight Section */}
                <motion.div variants={item}>
                    <div className="flex items-center mb-3">
                        <div className="p-2 bg-blue-100 rounded-full mr-3">
                            <Plane className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Flights</h2>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Plane className="w-32 h-32" />
                        </div>

                        {/* Outgoing */}
                        <div className="mb-6 relative z-10">
                            <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                                <span>Outgoing</span>
                                <span className="font-semibold text-blue-600">{formatDate(flights.outgoing.departureTime)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-2xl font-bold">{flights.outgoing.departureAirport.split(' ')[0]}</div>
                                <ArrowRight className="text-gray-300" />
                                <div className="text-2xl font-bold">{flights.outgoing.arrivalAirport.split(' ')[0]}</div>
                            </div>
                            <div className="flex justify-between text-gray-600 text-sm">
                                <span>{formatTime(flights.outgoing.departureTime)}</span>
                                <span>{formatTime(flights.outgoing.arrivalTime)}</span>
                            </div>
                            <div className="mt-2 text-xs text-gray-400 bg-gray-50 inline-block px-2 py-1 rounded-lg">
                                {flights.outgoing.airline} • {flights.outgoing.flightNumber}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-dashed border-gray-200 my-4 relative">
                            <div className="absolute -left-8 -top-3 w-6 h-6 bg-gray-50 rounded-full"></div>
                            <div className="absolute -right-8 -top-3 w-6 h-6 bg-gray-50 rounded-full"></div>
                        </div>

                        {/* Incoming */}
                        <div className="mb-4 relative z-10">
                            <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                                <span>Incoming</span>
                                <span className="font-semibold text-blue-600">{formatDate(flights.incoming.departureTime)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-2xl font-bold">{flights.incoming.departureAirport.split(' ')[0]}</div>
                                <ArrowRight className="text-gray-300" />
                                <div className="text-2xl font-bold">{flights.incoming.arrivalAirport.split(' ')[0]}</div>
                            </div>
                            <div className="flex justify-between text-gray-600 text-sm">
                                <span>{formatTime(flights.incoming.departureTime)}</span>
                                <span>{formatTime(flights.incoming.arrivalTime)}</span>
                            </div>
                            <div className="mt-2 text-xs text-gray-400 bg-gray-50 inline-block px-2 py-1 rounded-lg">
                                {flights.incoming.airline} • {flights.incoming.flightNumber}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Rental Car Section */}
                <motion.div variants={item}>
                    <div className="flex items-center mb-3 mt-8">
                        <div className="p-2 bg-green-100 rounded-full mr-3">
                            <Car className="w-5 h-5 text-green-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Rental Car</h2>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Car className="w-32 h-32" />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-lg font-bold mb-1">{car.model}</h3>
                            <p className="text-sm text-gray-500 mb-4">{car.company}</p>

                            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="text-xs text-gray-400 mb-1">Pickup</div>
                                        <div className="font-semibold text-gray-800">{formatDate(car.pickupDate)}</div>
                                        <div className="text-sm text-gray-600">{formatTime(car.pickupDate)}</div>
                                    </div>
                                    <div className="h-10 w-px bg-gray-200 mx-2"></div>
                                    <div className="text-right">
                                        <div className="text-xs text-gray-400 mb-1">Return</div>
                                        <div className="font-semibold text-gray-800">{formatDate(car.returnDate)}</div>
                                        <div className="text-sm text-gray-600">{formatTime(car.returnDate)}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md">
                                    Included
                                </span>
                                <span className="text-sm text-gray-600">{car.insurance}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{car.cost.toLocaleString()} KRW</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Reservations;
