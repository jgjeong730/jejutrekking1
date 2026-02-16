export interface Flight {
    airline: string;
    flightNumber: string;
    departureTime: string; // ISO string 2026-02-21T18:30:00
    arrivalTime: string;
    departureAirport: string;
    arrivalAirport: string;
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
}

export interface ReservationData {
    flights: {
        outgoing: Flight;
        incoming: Flight;
        passengers: string[];
        totalCost: number;
        paymentMethod: string;
    };
    car: RentalCar;
    accommodations: Accommodation[];
    tickets: Ticket[]; // New
    others: OtherItem[]; // New
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

export interface OtherItem {
    id: string;
    category: string; // e.g., "숙소" (Accommodation), "보험" (Insurance), etc.
    title: string;
    period?: string;
    details: string;
    cost?: number;
    status: 'confirmed' | 'pending';
}
