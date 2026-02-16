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
    pickupDate: string;
    returnDate: string;
    insurance: string;
    cost: number;
}

export interface Accommodation {
    name: string;
    address: string;
    checkIn: string;
    checkOut: string;
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
}
