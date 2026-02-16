import type { ReservationData } from '../types';

export const RESERVATIONS: ReservationData = {
    flights: {
        outgoing: {
            airline: "T'way Air",
            flightNumber: "TW731",
            departureTime: "2026-02-21T18:30:00",
            arrivalTime: "2026-02-21T19:40:00",
            departureAirport: "GMP (Gimpo)",
            arrivalAirport: "CJU (Jeju)",
        },
        incoming: {
            airline: "T'way Air",
            flightNumber: "TW734",
            departureTime: "2026-02-25T20:30:00",
            arrivalTime: "2026-02-25T22:05:00",
            departureAirport: "CJU (Jeju)",
            arrivalAirport: "GMP (Gimpo)",
        },
        passengers: ["Lee Hee-keun", "Adult 2", "Child 1", "Child 2"],
        totalCost: 81600,
        paymentMethod: "Mileage + Tax/Fuel Surcharge",
    },
    car: {
        company: "Jeju Into (Jeju Sok-euro)",
        model: "2020 Kona Electric (White)",
        pickupDate: "2026-02-21T20:30:00",
        returnDate: "2026-02-25T19:30:00",
        insurance: "Full Coverage (완전자차)",
        cost: 80700,
    },
    accommodations: [
        // Placeholder for now as user hasn't provided details yet in images
        {
            name: "West Side Resort (TBD)",
            address: "Aewol-eup, Jeju",
            checkIn: "2026-02-21T15:00:00",
            checkOut: "2026-02-23T11:00:00",
        },
        {
            name: "Seogwipo Hotel (TBD)",
            address: "Seogwipo-si, Jeju",
            checkIn: "2026-02-23T15:00:00",
            checkOut: "2026-02-25T11:00:00",
        }
    ]
};
