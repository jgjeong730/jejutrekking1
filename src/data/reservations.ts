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
        company: "제주속으로",
        model: "2020 코나 일렉트릭",
        manualModelName: "2020년형 2020 코나 일렉트릭",
        specs: "5인승 | 전기",
        pickupDate: "2026-02-21T20:30:00",
        returnDate: "2026-02-25T19:30:00",
        insurance: "완전자차",
        cost: 80700,
        reservationNumber: "2602165717",
        rentalDuration: "95시간 대여",
        imgUrl: "https://file.carisyou.com/upload/2018/04/12/20180412101340476_w.jpg" // White Kona Electric similar to receipt
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
