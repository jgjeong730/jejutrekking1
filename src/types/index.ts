export interface Flight {
    airline: string;
    flightNumber: string;
    departureTime: string; // ISO string 2026-02-21T18:30:00
    arrivalTime: string;
    departureAirport: string;
    arrivalAirport: string;
    duration?: string;
    logo?: string;
    aircraft?: string;
    seatClass?: string;
}

export interface RentalCar {
    company: string;
    model: string;
    specs: string; // e.g. "5인승 | 전기"
    manualModelName: string; // e.g. "2020년형 2020 코나 일렉트릭"
    pickupDate: string;
    returnDate: string;
    insurance: string;
    cost: number;
    reservationNumber: string;
    rentalDuration: string; // e.g. "95시간 대여"
    imgUrl?: string;
}

export interface Accommodation {
    name: string;
    address: string;
    checkIn: string;
    checkOut: string;
    cost?: number; // Added
    notes?: string;
    roomType?: string; // Added
}

export interface Passenger {
    name: string;
    type: '성인' | '소아';
    ticketNumber: string;
    memberId?: string;
    seat?: string; // Added seat
}

export interface Activity {
    id: string;
    day: number; // 1 (Day 1), 2 (Day 2), etc.
    time: string;
    title: string;
    type: 'flight' | 'food' | 'tour' | 'cafe' | 'checkin' | 'checkout';
    location: { lat: number; lng: number; name: string }; // Approximate relative coordinates for map (0-100%)
}

export interface ScheduleData {
    days: {
        day: number;
        date: string;
        title: string;
        activities: Activity[];
    }[];
}

export interface ReservationData {
    flights: {
        reservationNumber: string; // e.g. E22T42
        outgoing: Flight;
        incoming: Flight;
        passengers: Passenger[];
        paymentDate: string;
        totalCost: number;
    };
    car: RentalCar;
    accommodations: Accommodation[];
    tickets: Ticket[];
    busTickets: BusTicket[];
    others: OtherItem[];
}

export interface Ticket {
    id: string;
    title: string;
    date: string;
    count: number;
    price: number;
    status: 'confirmed' | 'pending';
    imgUrl?: string; // Optional thumbnail
}

export interface BusSeat {
    seatNumber: string; // e.g. "09번"
    type: '일반' | '아동';
    busType: string; // e.g. "일반버스", "심야고속버스"
    tagless?: boolean;
}

export interface BusTicket {
    id: string;
    bookingDate: string; // e.g. "2026.02.16 (월)"
    departureLocation: string; // e.g. "[경기]망포역"
    arrivalLocation: string; // e.g. "[서울]김포공항"
    departureTime: string; // e.g. "2026-02-21 14:45"
    seats: BusSeat[];
    status: 'confirmed' | 'pending';
    qrCodeUrl?: string; // For "Mobile Ticket" placeholder
}

export interface OtherItem {
    id: string;
    category: string; // e.g., "숙소" (Accommodation), "보험" (Insurance), etc.
    title: string;
    period?: string;
    details: string;
    cost?: number;
    status: 'confirmed' | 'pending';
}

export interface ReservationData {
    flights: {
        reservationNumber: string; // e.g. E22T42
        outgoing: Flight;
        incoming: Flight;
        passengers: Passenger[];
        paymentDate: string;
        totalCost: number;
    };
    car: RentalCar;
    accommodations: Accommodation[];
    tickets: Ticket[];
    busTickets: BusTicket[]; // New
    others: OtherItem[];
}
