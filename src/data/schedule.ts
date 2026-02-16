import type { ScheduleData } from '../types';

export const SCHEDULE: ScheduleData = {
    days: [
        {
            day: 1,
            date: "2026-02-21",
            title: "제주 도착 & 렌트카 인수",
            activities: [
                {
                    id: 'd1-1',
                    day: 1,
                    time: "14:45",
                    title: "망포역 7번출구 공항리무진 탑승",
                    type: "checkin",
                    location: { lat: 37.2455, lng: 127.0572, name: "망포역" } // Mangpo Station Exit 7
                },
                {
                    id: 'd1-2',
                    day: 1,
                    time: "18:30",
                    title: "김포공항 출발 (OZ8983)",
                    type: "flight",
                    location: { lat: 37.5587, lng: 126.7945, name: "김포" }
                },
                {
                    id: 'd1-3',
                    day: 1,
                    time: "19:45",
                    title: "제주공항 도착",
                    type: "flight",
                    location: { lat: 33.5104, lng: 126.4914, name: "제주공항" }
                },
                {
                    id: 'd1-4',
                    day: 1,
                    time: "20:30",
                    title: "렌트카 인수 (제주속으로)",
                    type: "checkin",
                    location: { lat: 33.5043, lng: 126.4945, name: "렌트카" } // Approx location near airport
                },
                {
                    id: 'd1-5',
                    day: 1,
                    time: "21:30",
                    title: "숙소 체크인 (에어씨티 제주호텔)",
                    type: "checkin",
                    location: { lat: 33.4996, lng: 126.5065, name: "에어씨티" } // Jeju City
                },
                {
                    id: 'd1-6',
                    day: 1,
                    time: "22:00",
                    title: "호텔 객실에서 치맥 (선택)",
                    type: "food",
                    location: { lat: 33.4996, lng: 126.5065, name: "치맥" }
                }
            ]
        },
        {
            day: 2,
            date: "2026-02-22",
            title: "서쪽 해안 & 카멜리아 힐",
            activities: [
                {
                    id: 'd2-1',
                    day: 2,
                    time: "09:30",
                    title: "호텔 체크아웃 & 출발",
                    type: "checkin",
                    location: { lat: 33.4996, lng: 126.5065, name: "출발" }
                },
                {
                    id: 'd2-2',
                    day: 2,
                    time: "10:30",
                    title: "협재 해안도로 카페 휴식",
                    type: "cafe",
                    location: { lat: 33.3938, lng: 126.2396, name: "협재" }
                },
                {
                    id: 'd2-3',
                    day: 2,
                    time: "12:30",
                    title: "점심 식사 (협재/금능 인근)",
                    type: "food",
                    location: { lat: 33.3890, lng: 126.2300, name: "금능" }
                },
                {
                    id: 'd2-4',
                    day: 2,
                    time: "14:30",
                    title: "카멜리아 힐 (동백꽃 관람)",
                    type: "tour",
                    location: { lat: 33.2905, lng: 126.3683, name: "카멜리아" }
                },
                {
                    id: 'd2-5',
                    day: 2,
                    time: "17:00",
                    title: "숙소 체크인 (신화월드)",
                    type: "checkin",
                    location: { lat: 33.3050, lng: 126.3150, name: "신화월드" }
                },
                {
                    id: 'd2-6',
                    day: 2,
                    time: "18:30",
                    title: "저녁 식사 (신화월드 다이닝)",
                    type: "food",
                    location: { lat: 33.3050, lng: 126.3150, name: "저녁" }
                }
            ]
        },
        {
            day: 3,
            date: "2026-02-23",
            title: "가파도 & 쇠소깍 (동쪽 이동)",
            activities: [
                {
                    id: 'd3-1',
                    day: 3,
                    time: "09:00",
                    title: "체크아웃 & 운진항 이동",
                    type: "checkin",
                    location: { lat: 33.2185, lng: 126.2515, name: "운진항" }
                },
                {
                    id: 'd3-2',
                    day: 3,
                    time: "10:00",
                    title: "가파도 반나절 여행",
                    type: "tour",
                    location: { lat: 33.1700, lng: 126.2650, name: "가파도" }
                },
                {
                    id: 'd3-3',
                    day: 3,
                    time: "13:00",
                    title: "점심 (모슬포 방어/해산물)",
                    type: "food",
                    location: { lat: 33.2180, lng: 126.2510, name: "모슬포" }
                },
                {
                    id: 'd3-4',
                    day: 3,
                    time: "15:30",
                    title: "쇠소깍 카약 체험",
                    type: "tour",
                    location: { lat: 33.2520, lng: 126.6230, name: "쇠소깍" }
                },
                {
                    id: 'd3-5',
                    day: 3,
                    time: "17:30",
                    title: "동쪽으로 이동",
                    type: "checkin",
                    location: { lat: 33.4285, lng: 126.9240, name: "이동" }
                },
                {
                    id: 'd3-6',
                    day: 3,
                    time: "19:00",
                    title: "숙소 체크인 (휘닉스 섭지코지)",
                    type: "checkin",
                    location: { lat: 33.4285, lng: 126.9240, name: "섭지코지" }
                }
            ]
        },
        {
            day: 4,
            date: "2026-02-24",
            title: "우도 종일 투어",
            activities: [
                {
                    id: 'd4-1',
                    day: 4,
                    time: "09:30",
                    title: "성산포항 이동 & 승선",
                    type: "checkin",
                    location: { lat: 33.4725, lng: 126.9335, name: "성산항" }
                },
                {
                    id: 'd4-2',
                    day: 4,
                    time: "10:30",
                    title: "우도 도착 & 전기차 대여",
                    type: "tour",
                    location: { lat: 33.5050, lng: 126.9530, name: "우도" }
                },
                {
                    id: 'd4-3',
                    day: 4,
                    time: "12:00",
                    title: "점심 (우도 땅콩아이스크림 등)",
                    type: "food",
                    location: { lat: 33.5050, lng: 126.9530, name: "우도맛집" }
                },
                {
                    id: 'd4-4',
                    day: 4,
                    time: "14:00",
                    title: "우도 해안일주 & 검멀레 해변",
                    type: "tour",
                    location: { lat: 33.4965, lng: 126.9650, name: "검멀레" }
                },
                {
                    id: 'd4-5',
                    day: 4,
                    time: "16:00",
                    title: "성산항 복귀 & 숙소 휴식",
                    type: "checkin",
                    location: { lat: 33.4285, lng: 126.9240, name: "휴식" }
                },
                {
                    id: 'd4-6',
                    day: 4,
                    time: "18:30",
                    title: "저녁 식사 (성산 흑돼지)",
                    type: "food",
                    location: { lat: 33.4500, lng: 126.9150, name: "성산" }
                }
            ]
        },
        {
            day: 5,
            date: "2026-02-25",
            title: "동쪽 관광 & 공항 복귀",
            activities: [
                {
                    id: 'd5-1',
                    day: 5,
                    time: "10:00",
                    title: "체크아웃 & 아쿠아플라넷",
                    type: "tour",
                    location: { lat: 33.4245, lng: 126.9310, name: "아쿠아" }
                },
                {
                    id: 'd5-2',
                    day: 5,
                    time: "13:00",
                    title: "점심 (성산/구좌 해맞이해안로)",
                    type: "food",
                    location: { lat: 33.5300, lng: 126.8500, name: "구좌" }
                },
                {
                    id: 'd5-3',
                    day: 5,
                    time: "15:00",
                    title: "함덕/김녕 해변 카페",
                    type: "cafe",
                    location: { lat: 33.5430, lng: 126.6690, name: "함덕" }
                },
                {
                    id: 'd5-4',
                    day: 5,
                    time: "17:00",
                    title: "공항 이동 & 렌트카 반납",
                    type: "checkin",
                    location: { lat: 33.5043, lng: 126.4945, name: "반납" }
                },
                {
                    id: 'd5-5',
                    day: 5,
                    time: "18:00",
                    title: "제주공항 수속 & 면세점",
                    type: "checkin",
                    location: { lat: 33.5104, lng: 126.4914, name: "공항" }
                },
                {
                    id: 'd5-6',
                    day: 5,
                    time: "20:30",
                    title: "제주 출발 (TW734)",
                    type: "flight",
                    location: { lat: 33.5104, lng: 126.4914, name: "출발" }
                }
            ]
        }
    ]
};
