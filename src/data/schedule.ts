import type { ScheduleData } from '../types';

export const SCHEDULE: ScheduleData = {
    days: [
        {
            day: 1,
            date: "2026-02-21",
            title: "제주 도착 & 휴식",
            activities: [
                {
                    id: 'd1-1',
                    day: 1,
                    time: "14:45",
                    title: "망포역 7번출구 공항리무진 탑승",
                    type: "checkin",
                    location: { lat: 37.2455, lng: 127.0572, name: "망포역" }
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
                    location: { lat: 33.5043, lng: 126.4945, name: "렌트카" }
                },
                {
                    id: 'd1-5',
                    day: 1,
                    time: "21:30",
                    title: "신신호텔 제주시티 체크인",
                    type: "checkin",
                    location: { lat: 33.4842, lng: 126.4862, name: "신신호텔" }
                },
                {
                    id: 'd1-6',
                    day: 1,
                    time: "22:00",
                    title: "호텔 근처 흑돼지 저녁 식사",
                    type: "food",
                    location: { lat: 33.4850, lng: 126.4900, name: "제주시내" }
                }
            ]
        },
        {
            day: 2,
            date: "2026-02-22",
            title: "서부권 야외 액티비티 맑음",
            activities: [
                {
                    id: 'd2-1',
                    day: 2,
                    time: "09:30",
                    title: "제주시내 출발 (서부 이동)",
                    type: "checkin",
                    location: { lat: 33.4842, lng: 126.4862, name: "제주시내" }
                },
                {
                    id: 'd2-2',
                    day: 2,
                    time: "10:30",
                    title: "더마파크 (기마공연 관람)",
                    type: "tour",
                    location: { lat: 33.3712, lng: 126.2425, name: "더마파크" }
                },
                {
                    id: 'd2-3',
                    day: 2,
                    time: "11:40",
                    title: "더마파크 승마 체험",
                    type: "tour",
                    location: { lat: 33.3712, lng: 126.2425, name: "승마장" }
                },
                {
                    id: 'd2-4',
                    day: 2,
                    time: "12:30",
                    title: "한림/협재 부근 점심 식사",
                    type: "food",
                    location: { lat: 33.3938, lng: 126.2396, name: "협재맛집" }
                },
                {
                    id: 'd2-5',
                    day: 2,
                    time: "14:30",
                    title: "비체올린 숲속 카약 체험",
                    type: "tour",
                    location: { lat: 33.3550, lng: 126.2200, name: "비체올린" }
                },
                {
                    id: 'd2-6',
                    day: 2,
                    time: "17:30",
                    title: "항공우주호텔 체크인 & 휴식",
                    type: "checkin",
                    location: { lat: 33.3039, lng: 126.2995, name: "우주호텔" }
                }
            ]
        },
        {
            day: 3,
            date: "2026-02-23",
            title: "안덕/중문 자연 & 겨울 한라봉",
            activities: [
                {
                    id: 'd3-1',
                    day: 3,
                    time: "10:00",
                    title: "체크아웃 (안덕 이동)",
                    type: "checkin",
                    location: { lat: 33.3039, lng: 126.2995, name: "우주호텔" }
                },
                {
                    id: 'd3-2',
                    day: 3,
                    time: "10:30",
                    title: "카멜리아힐 산책",
                    type: "tour",
                    location: { lat: 33.2905, lng: 126.3683, name: "카멜리아힐" }
                },
                {
                    id: 'd3-3',
                    day: 3,
                    time: "12:30",
                    title: "중문 관광단지 내 점심",
                    type: "food",
                    location: { lat: 33.2500, lng: 126.4100, name: "중문맛집" }
                },
                {
                    id: 'd3-4',
                    day: 3,
                    time: "14:30",
                    title: "한라봉/레드향 픽업 체험",
                    type: "tour",
                    location: { lat: 33.2800, lng: 126.3800, name: "한라봉농장" }
                },
                {
                    id: 'd3-5',
                    day: 3,
                    time: "16:30",
                    title: "서귀포 해안가 바다뷰 카페",
                    type: "cafe",
                    location: { lat: 33.2450, lng: 126.4150, name: "뷰카페" }
                },
                {
                    id: 'd3-6',
                    day: 3,
                    time: "18:00",
                    title: "켄싱턴 리조트 체크인",
                    type: "checkin",
                    location: { lat: 33.2388, lng: 126.5055, name: "켄싱턴서귀포" }
                }
            ]
        },
        {
            day: 4,
            date: "2026-02-24",
            title: "흐린 오전 실내관람 & 오후산책",
            activities: [
                {
                    id: 'd4-1',
                    day: 4,
                    time: "10:00",
                    title: "켄싱턴 리조트 출발",
                    type: "checkin",
                    location: { lat: 33.2388, lng: 126.5055, name: "켄싱턴" }
                },
                {
                    id: 'd4-2',
                    day: 4,
                    time: "10:30",
                    title: "제주 아트서커스 (실내)",
                    type: "tour",
                    location: { lat: 33.2980, lng: 126.3350, name: "아트서커스" }
                },
                {
                    id: 'd4-3',
                    day: 4,
                    time: "12:00",
                    title: "따뜻한 고기국수 점심",
                    type: "food",
                    location: { lat: 33.2680, lng: 126.3350, name: "국수맛집" }
                },
                {
                    id: 'd4-4',
                    day: 4,
                    time: "14:30",
                    title: "용머리해안 or 송악산 둘레길",
                    type: "tour",
                    location: { lat: 33.2355, lng: 126.3150, name: "산책길" }
                },
                {
                    id: 'd4-5',
                    day: 4,
                    time: "17:00",
                    title: "서귀포 올레시장 (저녁/간식 구매)",
                    type: "food",
                    location: { lat: 33.2500, lng: 126.5600, name: "올레시장" }
                },
                {
                    id: 'd4-6',
                    day: 4,
                    time: "18:30",
                    title: "숙소 복귀 & 휴식",
                    type: "checkin",
                    location: { lat: 33.2388, lng: 126.5055, name: "켄싱턴" }
                }
            ]
        },
        {
            day: 5,
            date: "2026-02-25",
            title: "조기 기상 & 우도 종일 투어",
            activities: [
                {
                    id: 'd5-1',
                    day: 5,
                    time: "07:30",
                    title: "이른 체크아웃 (성산항 출발)",
                    type: "checkin",
                    location: { lat: 33.2388, lng: 126.5055, name: "켄싱턴" }
                },
                {
                    id: 'd5-2',
                    day: 5,
                    time: "08:30",
                    title: "성산항 도착 & 여객선 탑승",
                    type: "tour",
                    location: { lat: 33.4725, lng: 126.9335, name: "성산항" }
                },
                {
                    id: 'd5-3',
                    day: 5,
                    time: "09:30",
                    title: "우도 전기자전거 환상 투어",
                    type: "tour",
                    location: { lat: 33.5050, lng: 126.9530, name: "우도" }
                },
                {
                    id: 'd5-4',
                    day: 5,
                    time: "12:00",
                    title: "우도 땅콩아이스크림 및 점심",
                    type: "food",
                    location: { lat: 33.5050, lng: 126.9530, name: "우도맛집" }
                },
                {
                    id: 'd5-5',
                    day: 5,
                    time: "15:30",
                    title: "본섬(성산) 복귀 & 공항 출발",
                    type: "checkin",
                    location: { lat: 33.4725, lng: 126.9335, name: "성산항" }
                },
                {
                    id: 'd5-6',
                    day: 5,
                    time: "17:30",
                    title: "렌터카 반납 & 김포행 대기",
                    type: "flight",
                    location: { lat: 33.5043, lng: 126.4945, name: "제주공항" }
                }
            ]
        }
    ]
};
