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
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Hyundai_Kona_Electric_Classic_Chalk_White_%281%29.jpg/640px-Hyundai_Kona_Electric_Classic_Chalk_White_%281%29.jpg"
    },
    accommodations: [
        {
            name: "제주 신화월드 (예시)",
            checkIn: "2026-02-21T15:00:00",
            checkOut: "2026-02-23T11:00:00",
            address: "제주특별자치도 서귀포시 안덕면 신화역사로 304번길 38",
            cost: 0
        }
    ],
    tickets: [
        {
            id: 't1',
            title: '아르떼뮤지엄 제주',
            date: '2026-02-22T14:00:00',
            count: 4,
            price: 68000,
            status: 'confirmed'
        }
    ],
    others: [
        {
            id: 'o1',
            category: '여행자 보험',
            title: '마이뱅크 여행자 보험',
            period: '2026-02-21 ~ 2026-02-25',
            details: '든든플랜 (성인 2, 소아 2)',
            status: 'confirmed'
        }
    ]
};
