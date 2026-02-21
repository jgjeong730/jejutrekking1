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
                    time: "08:30",
                    title: "신신호텔 조기 출발 (서부 이동)",
                    type: "checkin",
                    location: { lat: 33.4842, lng: 126.4862, name: "제주시내" }
                },
                {
                    id: 'd2-2-new',
                    day: 2,
                    time: "09:10",
                    title: "스타벅스 제주협재점 (더마파크 근처 모닝 커피)",
                    type: "cafe",
                    location: { lat: 33.3938, lng: 126.2396, name: "스타벅스" }
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
                    title: "협재 점심 (수우동, 안동국밥, 협재칼국수, 면뽑는선생, 협재온다정 추천)",
                    type: "food",
                    location: { lat: 33.3938, lng: 126.2396, name: "협재맛집" }
                },
                {
                    id: 'd2-5-new',
                    day: 2,
                    time: "13:30",
                    title: "투어패스 카페 2 (디저트 & 예쁜 공간)",
                    type: "cafe",
                    location: { lat: 33.3916, lng: 126.2625, name: "한림/한경 카페" }
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
                    time: "16:30",
                    title: "항공우주호텔 조기 체크인 & 휴식",
                    type: "checkin",
                    location: { lat: 33.3039, lng: 126.2995, name: "우주호텔" }
                }
            ]
        },
        {
            day: 3,
            date: "2026-02-23",
            title: "종일 맑음☀️ 우도 환상 투어",
            activities: [
                {
                    id: 'd3-1',
                    day: 3,
                    time: "08:30",
                    title: "이른 아침 우주호텔 체크아웃 및 동쪽 이동",
                    type: "checkin",
                    location: { lat: 33.3039, lng: 126.2995, name: "우주호텔" }
                },
                {
                    id: 'd3-2',
                    day: 3,
                    time: "10:00",
                    title: "성산항 도착 & 여객선 탑승 (매 정각/30분 운항)",
                    type: "tour",
                    location: { lat: 33.4725, lng: 126.9335, name: "성산항" }
                },
                {
                    id: 'd3-3',
                    day: 3,
                    time: "10:30",
                    title: "우도 전기자전거 스마일 투어",
                    type: "tour",
                    location: { lat: 33.5050, lng: 126.9530, name: "우도" }
                },
                {
                    id: 'd3-4',
                    day: 3,
                    time: "12:30",
                    title: "우도 해물라면 & 땅콩아이스크림 점심",
                    type: "food",
                    location: { lat: 33.5050, lng: 126.9530, name: "우도맛집" }
                },
                {
                    id: 'd3-5',
                    day: 3,
                    time: "15:30",
                    title: "여유있게 우도 탈출 및 서귀포 이동",
                    type: "checkin",
                    location: { lat: 33.4725, lng: 126.9335, name: "성산항" }
                },
                {
                    id: 'd3-6',
                    day: 3,
                    time: "17:00",
                    title: "켄싱턴 리조트 서귀포 체크인",
                    type: "checkin",
                    location: { lat: 33.2388, lng: 126.5055, name: "켄싱턴서귀포" }
                },
                {
                    id: 'd3-7',
                    day: 3,
                    time: "18:30",
                    title: "서귀포 올레시장 구경 및 저녁 식사",
                    type: "food",
                    location: { lat: 33.2500, lng: 126.5600, name: "올레시장" }
                }
            ]
        },
        {
            day: 4,
            date: "2026-02-24",
            title: "종일 비☔ 중문 자연 & 실내 서커스",
            activities: [
                {
                    id: 'd4-1',
                    day: 4,
                    time: "10:30",
                    title: "느긋한 기상 후 리조트 출발",
                    type: "checkin",
                    location: { lat: 33.2388, lng: 126.5055, name: "켄싱턴서귀포" }
                },
                {
                    id: 'd4-2',
                    day: 4,
                    time: "11:00",
                    title: "카멜리아힐 (우천 시 운치 있는 온실/산책)",
                    type: "tour",
                    location: { lat: 33.2905, lng: 126.3683, name: "카멜리아힐" }
                },
                {
                    id: 'd4-3',
                    day: 4,
                    time: "12:30",
                    title: "중문 관광단지 부근 따뜻한 국물 점심",
                    type: "food",
                    location: { lat: 33.2500, lng: 126.4100, name: "중문맛집" }
                },
                {
                    id: 'd4-4',
                    day: 4,
                    time: "14:00",
                    title: "한라봉/레드향 픽업 (비닐하우스 실내)",
                    type: "tour",
                    location: { lat: 33.2800, lng: 126.3800, name: "한라봉농장" }
                },
                {
                    id: 'd4-5',
                    day: 4,
                    time: "16:30",
                    title: "제주 아트서커스 (실내 관람)",
                    type: "tour",
                    location: { lat: 33.2980, lng: 126.3350, name: "아트서커스" }
                },
                {
                    id: 'd4-6',
                    day: 4,
                    time: "18:30",
                    title: "숙소 복귀 및 근처 저녁 식사",
                    type: "checkin",
                    location: { lat: 33.2388, lng: 126.5055, name: "켄싱턴서귀포" }
                }
            ]
        },
        {
            day: 5,
            date: "2026-02-25",
            title: "비오는 아침☔ 휴식 및 제주시 복귀",
            activities: [
                {
                    id: 'd5-1',
                    day: 5,
                    time: "10:30",
                    title: "켄싱턴 리조트 여유로운 체크아웃",
                    type: "checkin",
                    location: { lat: 33.2388, lng: 126.5055, name: "켄싱턴서귀포" }
                },
                {
                    id: 'd5-2',
                    day: 5,
                    time: "11:00",
                    title: "서귀포 바다뷰 카페 (실내 커피타임)",
                    type: "cafe",
                    location: { lat: 33.2450, lng: 126.4150, name: "뷰카페" }
                },
                {
                    id: 'd5-3',
                    day: 5,
                    time: "12:30",
                    title: "제주시 방향 이동 및 점심 식사",
                    type: "food",
                    location: { lat: 33.3500, lng: 126.5000, name: "제주이동" }
                },
                {
                    id: 'd5-4',
                    day: 5,
                    time: "14:30",
                    title: "도두해수파크 입성 (찜질방 & 오션뷰 휴식)",
                    type: "cafe",
                    location: { lat: 33.5117, lng: 126.4719, name: "도두해수파크" }
                },
                {
                    id: 'd5-5',
                    day: 5,
                    time: "18:00",
                    title: "개운하게 렌터카 반납 & 김포행 비행기 대기",
                    type: "flight",
                    location: { lat: 33.5043, lng: 126.4945, name: "제주공항" }
                }
            ]
        }
    ]
};
