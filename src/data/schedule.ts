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
                    title: "숙소 체크인 (에어씨티 제주호텔)",
                    type: "checkin",
                    location: { lat: 33.4996, lng: 126.5065, name: "에어씨티" }
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
            title: "서쪽 예술 & 동백꽃 힐링",
            activities: [
                {
                    id: 'd2-1',
                    day: 2,
                    time: "09:30",
                    title: "애월 해안도로 드라이브 & 브런치",
                    type: "cafe",
                    location: { lat: 33.4650, lng: 126.3200, name: "애월" }
                },
                {
                    id: 'd2-2',
                    day: 2,
                    time: "11:30",
                    title: "협재 해변 산책 (비양도 뷰)",
                    type: "tour",
                    location: { lat: 33.3938, lng: 126.2396, name: "협재" }
                },
                {
                    id: 'd2-3',
                    day: 2,
                    time: "12:30",
                    title: "제주현대미술관 (저지 문화예술마을)",
                    type: "tour",
                    location: { lat: 33.3330, lng: 126.2600, name: "미술관" }
                },
                {
                    id: 'd2-4',
                    day: 2,
                    time: "15:00",
                    title: "카멜리아 힐 (동백꽃 정원)",
                    type: "tour",
                    location: { lat: 33.2905, lng: 126.3683, name: "카멜리아" }
                },
                {
                    id: 'd2-5',
                    day: 2,
                    time: "18:00",
                    title: "서귀포 감성숙소 체크인 (위미/남원)",
                    type: "checkin",
                    location: { lat: 33.2700, lng: 126.6600, name: "서귀포숙소" }
                },
                {
                    id: 'd2-6',
                    day: 2,
                    time: "19:00",
                    title: "숙소 자쿠지 온수탕 (피로 회복)",
                    type: "checkin",
                    location: { lat: 33.2700, lng: 126.6600, name: "자쿠지" }
                }
            ]
        },
        {
            day: 3,
            date: "2026-02-23",
            title: "감귤 체험 & 남쪽 바다",
            activities: [
                {
                    id: 'd3-1',
                    day: 3,
                    time: "10:00",
                    title: "감귤따기 체험 (위미 농가)",
                    type: "tour",
                    location: { lat: 33.2800, lng: 126.6700, name: "감귤체험" }
                },
                {
                    id: 'd3-2',
                    day: 3,
                    time: "11:30",
                    title: "남원 큰엉/위미 해안 드라이브",
                    type: "tour",
                    location: { lat: 33.2750, lng: 126.7000, name: "해안도로" }
                },
                {
                    id: 'd3-3',
                    day: 3,
                    time: "12:30",
                    title: "점심 식사 (서귀포 맛집)",
                    type: "food",
                    location: { lat: 33.2500, lng: 126.5600, name: "서귀포" }
                },
                {
                    id: 'd3-4',
                    day: 3,
                    time: "14:00",
                    title: "쇠소깍 투명카약 or 외돌개 산책",
                    type: "tour",
                    location: { lat: 33.2520, lng: 126.6230, name: "쇠소깍" }
                },
                {
                    id: 'd3-5',
                    day: 3,
                    time: "17:30",
                    title: "숙소 복귀 & 자쿠지 2차 힐링",
                    type: "checkin",
                    location: { lat: 33.2700, lng: 126.6600, name: "자쿠지" }
                },
                {
                    id: 'd3-6',
                    day: 3,
                    time: "19:00",
                    title: "저녁 식사 (숙소 근처/배달)",
                    type: "food",
                    location: { lat: 33.2700, lng: 126.6600, name: "저녁" }
                }
            ]
        },
        {
            day: 4,
            date: "2026-02-24",
            title: "우도 종일 투어 & 성산",
            activities: [
                {
                    id: 'd4-1',
                    day: 4,
                    time: "09:10",
                    title: "성산항으로 이동 (약 40분)",
                    type: "checkin",
                    location: { lat: 33.4725, lng: 126.9335, name: "이동" }
                },
                {
                    id: 'd4-2',
                    day: 4,
                    time: "10:00",
                    title: "성산항 도착 & 승선 신고",
                    type: "checkin",
                    location: { lat: 33.4725, lng: 126.9335, name: "성산항" }
                },
                {
                    id: 'd4-3',
                    day: 4,
                    time: "10:30",
                    title: "우도 입도 & 전기차 대여",
                    type: "tour",
                    location: { lat: 33.5050, lng: 126.9530, name: "우도" }
                },
                {
                    id: 'd4-4',
                    day: 4,
                    time: "12:00",
                    title: "점심 (우도 땅콩아이스크림 등)",
                    type: "food",
                    location: { lat: 33.5050, lng: 126.9530, name: "우도맛집" }
                },
                {
                    id: 'd4-5',
                    day: 4,
                    time: "14:00",
                    title: "검멀레 해변 & 우도 보트",
                    type: "tour",
                    location: { lat: 33.4965, lng: 126.9650, name: "검멀레" }
                },
                {
                    id: 'd4-6',
                    day: 4,
                    time: "17:30",
                    title: "성산 숙소 체크인 (일출봉 뷰)",
                    type: "checkin",
                    location: { lat: 33.4650, lng: 126.9300, name: "성산숙소" }
                }
            ]
        },
        {
            day: 5,
            date: "2026-02-25",
            title: "성산 일출 & 공항 복귀",
            activities: [
                {
                    id: 'd5-1',
                    day: 5,
                    time: "08:00",
                    title: "성산일출봉 조망 & 바다 산책",
                    type: "tour",
                    location: { lat: 33.4580, lng: 126.9420, name: "일출봉" }
                },
                {
                    id: 'd5-2',
                    day: 5,
                    time: "10:00",
                    title: "체크아웃 & 공항 방향 이동",
                    type: "checkin",
                    location: { lat: 33.5300, lng: 126.8500, name: "이동" }
                },
                {
                    id: 'd5-3',
                    day: 5,
                    time: "12:00",
                    title: "점심 & 기념품 구매 (동문시장 등)",
                    type: "food",
                    location: { lat: 33.5120, lng: 126.5280, name: "제주시" }
                },
                {
                    id: 'd5-4',
                    day: 5,
                    time: "15:00",
                    title: "공항 인근 카페 or 용두암",
                    type: "cafe",
                    location: { lat: 33.5160, lng: 126.4880, name: "용두암" }
                },
                {
                    id: 'd5-5',
                    day: 5,
                    time: "19:00",
                    title: "렌트카 반납 & 공항 셔틀 탑승",
                    type: "checkin",
                    location: { lat: 33.5043, lng: 126.4945, name: "반납" }
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
