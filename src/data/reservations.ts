import type { ReservationData } from '../types';

export const RESERVATIONS: ReservationData = {
    flights: {
        reservationNumber: "E22T42",
        paymentDate: "2026-02-16",
        totalCost: 85600,
        passengers: [
            { name: "이/희근", type: "성인", ticketNumber: "9882436031458", memberId: "OZ 473 510 981", seat: "3A" },
            { name: "이/건경", type: "성인", ticketNumber: "9882436031459", memberId: "OZ 351 178 841", seat: "3C" },
            { name: "이/다원", type: "소아", ticketNumber: "9882436031460", memberId: "OZ 663 501 554", seat: "4A" },
            { name: "이/세찬", type: "소아", ticketNumber: "9882436031461", memberId: "OZ 663 502 950", seat: "4C" }
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
        imgUrl: "./images/car_thumb.jpg"
    },
    accommodations: [
        {
            name: "신신호텔 (shinshin 호텔)",
            checkIn: "2026-02-21T15:00:00",
            checkOut: "2026-02-22T11:00:00",
            address: "제주 서귀포시 지정 지점",
            cost: 0,
            roomType: "스탠다드"
        },
        {
            name: "제주항공우주호텔",
            checkIn: "2026-02-22T15:00:00",
            checkOut: "2026-02-23T11:00:00",
            address: "제주특별자치도 서귀포시 안덕면 녹차분재로 218",
            cost: 0,
            roomType: "스탠다드"
        },
        {
            name: "켄싱턴리조트 서귀포",
            checkIn: "2026-02-23T15:00:00",
            checkOut: "2026-02-25T11:00:00",
            address: "제주특별자치도 서귀포시 이어도로 684",
            cost: 0,
            roomType: "스탠다드"
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
    busTickets: [
        {
            id: 'b1',
            bookingDate: '2026.02.16 (월)',
            departureLocation: '[경기]망포역',
            arrivalLocation: '[서울]김포공항',
            departureTime: '2026-02-21 14:45',
            seats: [
                { seatNumber: '09번', type: '일반', busType: '일반버스' },
                { seatNumber: '10번', type: '아동', busType: '일반버스' },
                { seatNumber: '11번', type: '일반', busType: '일반버스' },
                { seatNumber: '12번', type: '아동', busType: '일반버스' }
            ],
            status: 'confirmed'
        },
        {
            id: 'b2',
            bookingDate: '2026.02.19 (목)',
            departureLocation: '[서울]김포공항',
            arrivalLocation: '[경기]수원(동수원)',
            departureTime: '2026-02-25 23:00',
            seats: [
                { seatNumber: '04번', type: '일반', busType: '심야고속버스', tagless: true },
                { seatNumber: '05번', type: '아동', busType: '심야고속버스', tagless: true },
                { seatNumber: '07번', type: '일반', busType: '심야고속버스', tagless: true },
                { seatNumber: '08번', type: '아동', busType: '심야고속버스', tagless: true }
            ],
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
