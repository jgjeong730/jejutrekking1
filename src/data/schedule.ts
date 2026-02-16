import type { ScheduleData } from '../types';

export const SCHEDULE: ScheduleData = {
    days: [
        {
            day: 1,
            date: "2026-02-21",
            title: "제주 도착 & 렌트카 인수",
            activities: [
                {
                    id: 'd1-0',
                    day: 1,
                    time: "16:00",
                    title: "동수원호텔캐슬 공항리무진 탑승(4인)",
                    type: "checkin",
                    location: { lat: 5, lng: 55, name: "리무진" }
                },
                {
                    id: 'd1-1',
                    day: 1,
                    time: "18:30",
                    title: "김포공항 출발 (OZ8983)",
                    type: "flight",
                    location: { lat: 10, lng: 50, name: "김포" } // Outside map usually, but for flow
                },
                {
                    id: 'd1-2',
                    day: 1,
                    time: "19:45",
                    title: "제주공항 도착",
                    type: "flight",
                    location: { lat: 15, lng: 48, name: "제주공항" }
                },
                {
                    id: 'd1-3',
                    day: 1,
                    time: "20:30",
                    title: "렌트카 인수 (제주속으로)",
                    type: "checkin",
                    location: { lat: 16, lng: 49, name: "렌트카하우스" }
                },
                {
                    id: 'd1-4',
                    day: 1,
                    time: "21:30",
                    title: "숙소 체크인 (신화월드)",
                    type: "checkin",
                    location: { lat: 65, lng: 25, name: "신화월드" }
                }
            ]
        },
        {
            day: 2,
            date: "2026-02-22",
            title: "서쪽 호핑투어 & 아르떼뮤지엄",
            activities: [
                {
                    id: 'd2-1',
                    day: 2,
                    time: "10:00",
                    title: "아르떼뮤지엄 제주",
                    type: "tour",
                    location: { lat: 45, lng: 20, name: "아르떼뮤지엄" }
                },
                {
                    id: 'd2-2',
                    day: 2,
                    time: "13:00",
                    title: "점심 (협재 해수욕장 근처)",
                    type: "food",
                    location: { lat: 40, lng: 18, name: "협재" }
                },
                {
                    id: 'd2-3',
                    day: 2,
                    time: "15:00",
                    title: "오설록 티 뮤지엄",
                    type: "cafe",
                    location: { lat: 60, lng: 22, name: "오설록" }
                }
            ]
        },
        // Add more days...
    ]
};
