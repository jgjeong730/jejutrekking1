import type { ReservationData } from '../types';

export const RESERVATIONS: ReservationData = {
    flights: {
        reservationNumber: "E22T42",
        paymentDate: "2026-02-16",
        totalCost: 85600,
        passengers: [
            { name: "이/희근", type: "성인", ticketNumber: "9882436031458", memberId: "OZ 473 510 981" },
            { name: "이/건경", type: "성인", ticketNumber: "9882436031459", memberId: "OZ 351 178 841" },
            { name: "이/다원", type: "소아", ticketNumber: "9882436031460", memberId: "OZ 663 501 554" },
            { name: "이/세찬", type: "소아", ticketNumber: "9882436031461", memberId: "OZ 663 502 950" }
        ],
        outgoing: {
            airline: "Asiana Airlines",
            flightNumber: "OZ8983",
            departureTime: "2026-02-21T18:30:00",
            arrivalTime: "2026-02-21T19:45:00",
            departureAirport: "GMP Seoul/Gimpo",
            arrivalAirport: "CJU Jeju",
            duration: "1h 15m",
            aircraft: "A330",
            seatClass: "비즈니스(마일리지)(I)"
        },
        incoming: {
            airline: "Asiana Airlines",
            flightNumber: "OZ8986",
            departureTime: "2026-02-25T20:50:00",
            arrivalTime: "2026-02-25T22:05:00",
            departureAirport: "CJU Jeju",
            arrivalAirport: "GMP Seoul/Gimpo",
            duration: "1h 15m",
            aircraft: "A330",
            seatClass: "비즈니스(마일리지)(I)"
        }
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
