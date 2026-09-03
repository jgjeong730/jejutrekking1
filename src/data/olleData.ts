// Update this each time a new expedition kicks off — anywhere in the app that
// reads "{CURRENT_EXPEDITION} to JMT" tracks the multi-year arc toward the
// John Muir Trail: Olle → Baekdu(daegan) → Yarigatake → ... → JMT.
export const CURRENT_EXPEDITION = 'Olle';

export interface OlleDay {
  day: number;
  date: string; // YYYY-MM-DD
  accommodation: 'guesthouse' | 'camping' | 'special';
  course: string;
  courseIds: number[]; // ids into OLLE_COURSES (olleCoursesData.ts); empty for the Hallasan day
  section: string;
  distance: number | null;
  cumulative: number | null;
  lodge: string;
  isSpecial?: 'hallasan' | 'rest' | 'complete';
  lat: number;
  lng: number;
  routeIdx: number; // index in OLLE_ROUTE; -1 for off-trail (Hallasan / 우도 / 가파도 / 추자도)
}

// 본섬 21개 정규 코스 순환 경로 — 제주원도심(산지천마당, 공항 인근) 출발·귀환
// 순서: 원도심 → 동북(18~21) → 동부(1~4) → 남부(5~9) → 서부(10~14) → 북부(15~17) → 원도심 복귀
export const OLLE_ROUTE: { lat: number; lng: number; label: string }[] = [
  { lat: 33.5140, lng: 126.5290, label: '산지천마당 출발 (공항 인근)' }, // 0
  { lat: 33.5400, lng: 126.6370, label: '조천 (18코스 끝)' },            // 1
  { lat: 33.5510, lng: 126.7620, label: '김녕 (19코스 끝)' },            // 2
  { lat: 33.5254, lng: 126.8567, label: '하도 (20코스 끝)' },            // 3
  { lat: 33.4972, lng: 126.9181, label: '종달 (21코스 끝)' },            // 4
  { lat: 33.4629, lng: 126.9206, label: '시흥초교 (1코스 시작)' },       // 5
  { lat: 33.4460, lng: 126.9270, label: '광치기해변 (1코스 끝)' },       // 6
  { lat: 33.4188, lng: 126.8937, label: '온평 (2코스 끝)' },             // 7
  { lat: 33.3255, lng: 126.8340, label: '표선 (3코스 끝)' },             // 8
  { lat: 33.2795, lng: 126.7168, label: '남원 (4코스 끝)' },             // 9
  { lat: 33.2472, lng: 126.6260, label: '쇠소깍 (5코스 끝)' },           // 10
  { lat: 33.2515, lng: 126.5622, label: '서귀포 (6코스 끝)' },           // 11
  { lat: 33.2453, lng: 126.5117, label: '월평 (7코스 끝)' },             // 12
  { lat: 33.2277, lng: 126.4283, label: '대평포구 (8코스 끝)' },         // 13
  { lat: 33.2334, lng: 126.3592, label: '화순 (9코스 끝)' },             // 14
  { lat: 33.2136, lng: 126.2513, label: '모슬포 (10코스 끝)' },          // 15
  { lat: 33.2586, lng: 126.1913, label: '무릉 (11코스 끝)' },            // 16
  { lat: 33.2949, lng: 126.1656, label: '용수포구 (12코스 끝)' },        // 17
  { lat: 33.3245, lng: 126.2645, label: '저지 (13코스 끝)' },            // 18
  { lat: 33.4130, lng: 126.2690, label: '한림항 (14코스 끝)' },          // 19
  { lat: 33.4638, lng: 126.3520, label: '고내포구 (15코스 끝)' },        // 20
  { lat: 33.4701, lng: 126.4174, label: '광령 (16코스 끝)' },            // 21
  { lat: 33.5140, lng: 126.5290, label: '산지천마당 완주 🎉 (17코스 끝)' }, // 22: 본섬 루프 닫힘
];

export const HALLASAN_COORD = { lat: 33.3763, lng: 126.5909, label: '한라산 성판악 탐방로 입구' };
export const UDO_COORD = { lat: 33.5063, lng: 126.9508, label: '우도 (1-1코스)' };
export const GAPADO_COORD = { lat: 33.1738, lng: 126.2685, label: '가파도 (10-1코스)' };
export const OSEOLLOK_COORD = { lat: 33.3057, lng: 126.2892, label: '오설록 (14-1코스)' };
export const CHUJA_COORD = { lat: 33.9636, lng: 126.3007, label: '추자도 (18-1·18-2코스)' };

export interface AccommodationRec {
  zone: string;
  type: 'guesthouse' | 'camping';
  name: string;
  note: string;
  link: string;
  lat: number;
  lng: number;
}

const naverMapSearch = (query: string) => `https://map.naver.com/p/search/${encodeURIComponent(query)}`;

export interface FoodRec {
  zone: string;
  lunch: string;
  dinner: string;
}

// Per-night fallback estimate used for any night without a recorded actual
// lodgeCost yet — matches the rates quoted throughout ACCOMMODATIONS/the info page.
export const GUESTHOUSE_NIGHT_RATE = 25000;
export const CAMPING_NIGHT_RATE = 10000;

export interface BudgetItem {
  item: string;
  cost: number;
  note: string;
}

export interface GearItem {
  name: string;
  detail: string;
}

// 확정 일정 — 2026-10-23(수) 저녁 7:30 제주공항 도착 → 10/24(목)부터 트레킹 시작
// → 11/18(수) 27코스 완주 → 11/19(목) 10:45 제주→김포
// 27개 공식 코스(21개 정규 + 6개 지선) + 한라산(성판악~관음사)을 26일에 배치.
// 우도(1-1)·가파도(10-1)는 인접 정규 코스와 한 날에 묶고, 14-1(오설록)·18-1/18-2(추자도)는
// 여객선·왕복 동선상 별도 날짜로 분리했습니다. 휴식일은 두지 않았습니다(요청 반영).
export const REAL_SCHEDULE: OlleDay[] = [
  { day: 1,  date: '2026-10-24', accommodation: 'guesthouse', course: '18코스', courseIds: [18],              section: '산지천마당 → 조천만세동산',                distance: 19.7, cumulative: 19.7,  lodge: '조천 게스트하우스',            lat: 33.5400, lng: 126.6370, routeIdx: 1  },
  { day: 2,  date: '2026-10-25', accommodation: 'camping',    course: '19코스', courseIds: [19],              section: '조천 → 김녕 (함덕·서우봉)',                distance: 19.2, cumulative: 38.9,  lodge: '김녕해수욕장 캠핑장',          lat: 33.5510, lng: 126.7620, routeIdx: 2  },
  { day: 3,  date: '2026-10-26', accommodation: 'guesthouse', course: '20코스', courseIds: [20],              section: '김녕 → 하도(제주해녀박물관)',              distance: 17.4, cumulative: 56.3,  lodge: '하도 게스트하우스',            lat: 33.5254, lng: 126.8567, routeIdx: 3  },
  { day: 4,  date: '2026-10-27', accommodation: 'guesthouse', course: '21코스', courseIds: [21],              section: '하도 → 종달바당',                          distance: 11.1, cumulative: 67.4,  lodge: '종달 게스트하우스',            lat: 33.4972, lng: 126.9181, routeIdx: 4  },
  { day: 5,  date: '2026-10-28', accommodation: 'guesthouse', course: '1코스 + 1-1코스(우도)', courseIds: [1, 1.1], section: '시흥초교 → 광치기해변 → 성산항 배 → 우도 일주', distance: 26.6, cumulative: 94.0,  lodge: '성산 게스트하우스',            lat: 33.5063, lng: 126.9508, routeIdx: -1 },
  { day: 6,  date: '2026-10-29', accommodation: 'camping',    course: '2코스', courseIds: [2],               section: '광치기해변 → 온평포구 (섭지코지)',          distance: 15.2, cumulative: 109.2, lodge: '신양리 섭지코지 캠핑장',       lat: 33.4188, lng: 126.8937, routeIdx: 7  },
  { day: 7,  date: '2026-10-30', accommodation: 'guesthouse', course: '3코스', courseIds: [3],               section: '온평 → 표선 (신천목장 해안)',               distance: 20.9, cumulative: 130.1, lodge: '표선해비치 게스트하우스',      lat: 33.3255, lng: 126.8340, routeIdx: 8  },
  { day: 8,  date: '2026-10-31', accommodation: 'camping',    course: '4코스', courseIds: [4],               section: '표선 → 남원 (큰엉 해안)',                   distance: 19.0, cumulative: 149.1, lodge: '남원 큰엉 오토캠핑장',         lat: 33.2795, lng: 126.7168, routeIdx: 9  },
  { day: 9,  date: '2026-11-01', accommodation: 'guesthouse', course: '5코스', courseIds: [5],               section: '남원 → 쇠소깍',                             distance: 13.0, cumulative: 162.1, lodge: '쇠소깍 인근 게스트하우스',     lat: 33.2472, lng: 126.6260, routeIdx: 10 },
  { day: 10, date: '2026-11-02', accommodation: 'guesthouse', course: '6코스', courseIds: [6],               section: '쇠소깍 → 서귀포올레여행자센터',             distance: 11.0, cumulative: 173.1, lodge: '제주 올레스테이 (서귀포시 중정로 22)',     lat: 33.2515, lng: 126.5622, routeIdx: 11 },
  { day: 11, date: '2026-11-03', accommodation: 'guesthouse', course: '7-1코스', courseIds: [7.1],             section: '제주월드컵경기장 → 서귀포올레여행자센터',   distance: 15.0, cumulative: 188.1, lodge: '제주 올레스테이 연박 (서귀포시 중정로 22)', lat: 33.2515, lng: 126.5622, routeIdx: 11 },
  { day: 12, date: '2026-11-04', accommodation: 'camping',    course: '7코스', courseIds: [7],               section: '서귀포여행자센터 → 월평아왜낭목 (천지연·외돌개)', distance: 17.7, cumulative: 205.8, lodge: '월평 인근 캠핑',              lat: 33.2453, lng: 126.5117, routeIdx: 12 },
  { day: 13, date: '2026-11-05', accommodation: 'camping',    course: '8코스', courseIds: [8],               section: '월평 → 대평포구 (박수기정·군산오름)',       distance: 19.2, cumulative: 225.0, lodge: '대평포구 인근 캠핑',           lat: 33.2277, lng: 126.4283, routeIdx: 13 },
  { day: 14, date: '2026-11-06', accommodation: 'guesthouse', course: '9코스', courseIds: [9],               section: '대평 → 화순금모래해변',                     distance: 11.9, cumulative: 236.9, lodge: '화순 게스트하우스',            lat: 33.2334, lng: 126.3592, routeIdx: 14 },
  { day: 15, date: '2026-11-07', accommodation: 'special',    course: '★ 한라산 등반', courseIds: [],       section: '성판악 → 백록담 → 관음사 (탐방예약 필수)',  distance: 19.0, cumulative: 236.9, lodge: '제주시내 게스트하우스',        isSpecial: 'hallasan', lat: 33.3763, lng: 126.5909, routeIdx: -1 },
  { day: 16, date: '2026-11-08', accommodation: 'guesthouse', course: '10코스 + 10-1코스(가파도)', courseIds: [10, 10.1], section: '화순 → 모슬포 → 운진항 배 → 가파도 일주', distance: 19.9, cumulative: 256.8, lodge: '모슬포 게스트하우스',          lat: 33.1738, lng: 126.2685, routeIdx: -1 },
  { day: 17, date: '2026-11-09', accommodation: 'camping',    course: '11코스', courseIds: [11],              section: '모슬포 → 무릉생태학교',                     distance: 17.8, cumulative: 274.6, lodge: '무릉 캠핑장',                  lat: 33.2586, lng: 126.1913, routeIdx: 16 },
  { day: 18, date: '2026-11-10', accommodation: 'guesthouse', course: '12코스', courseIds: [12],              section: '무릉 → 용수포구 (수월봉·당산봉)',           distance: 17.1, cumulative: 291.7, lodge: '용수 게스트하우스',            lat: 33.2949, lng: 126.1656, routeIdx: 17 },
  { day: 19, date: '2026-11-11', accommodation: 'guesthouse', course: '13코스', courseIds: [13],              section: '용수포구 → 저지예술정보화마을',             distance: 16.2, cumulative: 307.9, lodge: '저지 게스트하우스',            lat: 33.3245, lng: 126.2645, routeIdx: 18 },
  { day: 20, date: '2026-11-12', accommodation: 'guesthouse', course: '14-1코스', courseIds: [14.1],            section: '저지 → 오설록 (문도지오름), 버스로 저지 복귀', distance: 9.3,  cumulative: 317.2, lodge: '저지 게스트하우스 연박',       lat: 33.3057, lng: 126.2892, routeIdx: -1 },
  { day: 21, date: '2026-11-13', accommodation: 'camping',    course: '14코스', courseIds: [14],              section: '저지 → 한림항 (월령리·협재해변)',           distance: 19.0, cumulative: 336.2, lodge: '한림 캠핑',                    lat: 33.4130, lng: 126.2690, routeIdx: 19 },
  { day: 22, date: '2026-11-14', accommodation: 'guesthouse', course: '15코스', courseIds: [15],              section: '한림 → 고내포구 (납읍숲길·고내봉)',         distance: 16.5, cumulative: 352.7, lodge: '애월 고내 게스트하우스',       lat: 33.4638, lng: 126.3520, routeIdx: 20 },
  { day: 23, date: '2026-11-15', accommodation: 'camping',    course: '16코스', courseIds: [16],              section: '고내 → 광령 (애월 해안도로)',               distance: 15.5, cumulative: 368.2, lodge: '제주올레캠핑 (애월 소길리)',   lat: 33.4701, lng: 126.4174, routeIdx: 21 },
  { day: 24, date: '2026-11-16', accommodation: 'guesthouse', course: '17코스', courseIds: [17],              section: '광령 → 산지천마당 (이호테우·도두봉, 본섬 루프 완주)', distance: 17.9, cumulative: 386.1, lodge: '제주시 게스트하우스',         lat: 33.5140, lng: 126.5290, routeIdx: 22 },
  { day: 25, date: '2026-11-17', accommodation: 'guesthouse', course: '18-1코스', courseIds: [18.1],            section: '제주항 배 → 추자도 상추자 일주',            distance: 18.2, cumulative: 404.3, lodge: '추자도 게스트하우스',          lat: 33.9636, lng: 126.3007, routeIdx: -1 },
  { day: 26, date: '2026-11-18', accommodation: 'guesthouse', course: '18-2코스 완주 🎉', courseIds: [18.2],    section: '하추자 일주 → 제주항 복귀, 27코스 완주',    distance: 10.0, cumulative: 414.3, lodge: '제주시 게스트하우스 (완주 축하)', isSpecial: 'complete', lat: 33.9448, lng: 126.3013, routeIdx: -1 },
];

// courseId -> schedule day number, derived from REAL_SCHEDULE so it can't
// drift out of sync with the itinerary. Used to label map markers "D5/1".
export const COURSE_DAY_MAP: Record<number, number> = REAL_SCHEDULE.reduce((acc, d) => {
  d.courseIds.forEach((id) => { acc[id] = d.day; });
  return acc;
}, {} as Record<number, number>);

export const HALLASAN_DAY = REAL_SCHEDULE.find((d) => d.isSpecial === 'hallasan');

// courseId -> that night's scheduled lodging, same derivation as COURSE_DAY_MAP.
export const LODGE_BY_COURSE: Record<number, string> = REAL_SCHEDULE.reduce((acc, d) => {
  d.courseIds.forEach((id) => { acc[id] = d.lodge; });
  return acc;
}, {} as Record<number, string>);

// 코스별 실제 존재가 확인된 게스트하우스/캠핑장을 우선 수록하고, 특정 업체를 찾지 못한
// 구간은 동네 단위 검색으로 대체했습니다(note에 표시). 예약 전 최신 운영 여부는 꼭 재확인하세요.
export const ACCOMMODATIONS: AccommodationRec[] = [
  { zone: 'D1 · 조천 (18코스)', type: 'guesthouse', name: '우리희망이 게스트하우스', note: '함덕해수욕장 차량 5분, 신흥해수욕장 도보 5분, 조용한 숙소', link: naverMapSearch('제주 우리희망이 게스트하우스'), lat: 33.5400, lng: 126.6370 },
  { zone: 'D1 · 조천 (18코스)', type: 'guesthouse', name: '함덕해수욕장 게스트하우스 밀집지역', note: '해변 바로 앞, 선택지 다수 — 성수기 전 예약 확인', link: naverMapSearch('함덕해수욕장 게스트하우스'), lat: 33.5433, lng: 126.6690 },

  { zone: 'D2 · 김녕 (19코스)', type: 'camping', name: '김녕해수욕장 야영장', note: '해변 바로 옆, 화장실·샤워장·취사장 완비, 19코스 종점', link: naverMapSearch('김녕해수욕장 야영장'), lat: 33.5510, lng: 126.7620 },
  { zone: 'D2 · 김녕 (19코스)', type: 'guesthouse', name: '김녕 게스트하우스', note: '우천 시 대체용, 해변 도보권', link: naverMapSearch('제주 김녕 게스트하우스'), lat: 33.5510, lng: 126.7620 },

  { zone: 'D3 · 하도 (20코스)', type: 'guesthouse', name: '하도살이', note: '하도해수욕장 도보 5분, 조용한 휴식형 숙소', link: naverMapSearch('제주 하도살이 게스트하우스'), lat: 33.5254, lng: 126.8567 },
  { zone: 'D3 · 하도 (20코스)', type: 'guesthouse', name: '아모르하우스 펜션', note: '가성비 좋고 시설 깨끗한 편', link: naverMapSearch('제주 하도 아모르하우스 펜션'), lat: 33.5254, lng: 126.8567 },

  { zone: 'D4 · 종달 (21코스)', type: 'guesthouse', name: '종달스토리 게스트하우스', note: '신축 건물, 개별 욕실 + 조식 제공', link: naverMapSearch('제주 종달스토리 게스트하우스'), lat: 33.4972, lng: 126.9181 },
  { zone: 'D4 · 종달 (21코스)', type: 'guesthouse', name: '아람 (하도 고택 독채)', note: '제주 옛집을 리모델링한 독채, 도보 10분 바닷가', link: naverMapSearch('제주 하도 아람 독채'), lat: 33.4972, lng: 126.9181 },

  { zone: 'D5 · 성산 (1코스 + 우도)', type: 'guesthouse', name: '성산에오거들랑 게스트하우스', note: '올레2코스 스탬프 지점에서 200m, 일부 객실 성산일출봉 뷰', link: naverMapSearch('제주 성산에오거들랑 게스트하우스'), lat: 33.4361, lng: 126.9269 },
  { zone: 'D5 · 성산 (1코스 + 우도)', type: 'guesthouse', name: '어락게스트하우스', note: '성산항 인근', link: naverMapSearch('제주 어락게스트하우스'), lat: 33.4361, lng: 126.9269 },

  { zone: 'D6 · 신양리·섭지코지 (2코스)', type: 'guesthouse', name: '오조리 일출스테이', note: '⚠️ 이 구간은 확인된 지정 야영장이 없어 게스트하우스로 대체 추천 (성산일출봉 조망 펜션)', link: naverMapSearch('제주 오조리 일출스테이'), lat: 33.4237, lng: 126.9139 },
  { zone: 'D6 · 신양리·섭지코지 (2코스)', type: 'guesthouse', name: '신양리 인근 펜션 검색', note: '차박/노지야영 원하면 현지에서 가능 여부 추가 확인 필요', link: naverMapSearch('제주 신양리 펜션'), lat: 33.4237, lng: 126.9139 },

  { zone: 'D7 · 표선 (3코스)', type: 'guesthouse', name: '불턱 게스트하우스', note: '표선해비치해변 진입 전 언덕, 올레3코스 경로상', link: naverMapSearch('제주 불턱 게스트하우스'), lat: 33.3255, lng: 126.8340 },
  { zone: 'D7 · 표선 (3코스)', type: 'guesthouse', name: '표선해수욕장 게스트하우스 밀집지역', note: '해변 도보권, 선택지 다수', link: naverMapSearch('표선해수욕장 게스트하우스'), lat: 33.3255, lng: 126.8340 },

  { zone: 'D8 · 남원 큰엉 (4코스)', type: 'guesthouse', name: '카름스테이', note: '⚠️ 큰엉해안경승지 도보권 펜션, 지정 야영장 확인 안 됨 — 캠핑 대신 대체 숙소로 추천', link: naverMapSearch('제주 카름스테이 남원'), lat: 33.2795, lng: 126.7168 },
  { zone: 'D8 · 남원 큰엉 (4코스)', type: 'guesthouse', name: '남원 게스트하우스 검색', note: '남원포구 주변 대체 옵션', link: naverMapSearch('남원 큰엉 게스트하우스'), lat: 33.2795, lng: 126.7168 },

  { zone: 'D9 · 쇠소깍 (5코스)', type: 'guesthouse', name: '올레5게스트하우스', note: '서귀포시 남원읍 공천포로 137-5, 쇠소깍 인근, 2층 일출·일몰 뷰', link: naverMapSearch('제주 올레5게스트하우스 공천포'), lat: 33.2472, lng: 126.6260 },
  { zone: 'D9 · 쇠소깍 (5코스)', type: 'guesthouse', name: '쇠소깍 게스트하우스 검색', note: '쇠소깍 인근 대체 옵션', link: naverMapSearch('쇠소깍 게스트하우스'), lat: 33.2472, lng: 126.6260 },

  { zone: 'D10~D11 · 서귀포 올레스테이 (6, 7-1코스 연박)', type: 'guesthouse', name: '제주 올레스테이 (서귀포시 중정로 22)', note: '제주올레 사단법인 직영, 7코스 시작점(서귀포올레여행자센터) 바로 앞, D10~D11 연박. 1층 간세스테이션에 공유주방·세탁실, 카페·식당·펍 입점. 전화 064-762-2167', link: 'https://booking.naver.com/booking/3/bizes/48586', lat: 33.2515, lng: 126.5622 },
  { zone: 'D10~D11 · 서귀포 올레스테이 (6, 7-1코스 연박)', type: 'guesthouse', name: '서귀포 이중섭거리 게스트하우스 밀집지역', note: '올레스테이 만실 시 대체 옵션, 매일올레시장 도보권', link: naverMapSearch('서귀포 이중섭거리 게스트하우스'), lat: 33.2515, lng: 126.5622 },

  { zone: 'D12 · 월평 (7코스)', type: 'camping', name: '서귀포호텔 카라반 캠핑장', note: '⚠️ 월평에서 차량 이동 필요(사전 거리 확인), 카라반형', link: naverMapSearch('서귀포호텔 카라반 캠핑장'), lat: 33.2453, lng: 126.5117 },
  { zone: 'D12 · 월평 (7코스)', type: 'guesthouse', name: '라퓨타 게스트하우스', note: '서귀포시 호근남로 37, 올레7코스 인근, 조식 포함', link: naverMapSearch('제주 라퓨타 게스트하우스'), lat: 33.2453, lng: 126.5117 },

  { zone: 'D13 · 대평포구 (8코스)', type: 'guesthouse', name: '올레풍차펜션&게스트하우스', note: '대평리 소재, 박수기정 인근, 냉난방·무료주차', link: naverMapSearch('제주 올레풍차펜션 게스트하우스'), lat: 33.2277, lng: 126.4283 },
  { zone: 'D13 · 대평포구 (8코스)', type: 'guesthouse', name: '안덕·대평 펜션 검색', note: '군산오름 인근 대체 옵션', link: naverMapSearch('안덕 대평 펜션'), lat: 33.2277, lng: 126.4283 },

  { zone: 'D14 · 화순 (9코스)', type: 'guesthouse', name: '화순금모래해변 게스트하우스', note: '해변 도보권, 산방산 조망', link: naverMapSearch('화순금모래해변 게스트하우스'), lat: 33.2334, lng: 126.3592 },
  { zone: 'D14 · 화순 (9코스)', type: 'guesthouse', name: '조용한 게스트하우스 산방산점', note: '2018년부터 운영, 1인 여행객 7명 한정 소규모 숙소', link: naverMapSearch('제주 조용한 게스트하우스 산방산점'), lat: 33.2334, lng: 126.3592 },

  { zone: '제주시내 게스트하우스 (D15 한라산 전날 · D24 본섬완주 · D26 완주)', type: 'guesthouse', name: '산지천 게스트하우스 밀집지역', note: '원도심, 공항 접근성 좋음', link: naverMapSearch('제주 산지천 게스트하우스'), lat: 33.5140, lng: 126.5290 },
  { zone: '제주시내 게스트하우스 (D15 한라산 전날 · D24 본섬완주 · D26 완주)', type: 'guesthouse', name: '동문시장 게스트하우스 밀집지역', note: '재래시장 도보권, 야식·식사 편리', link: naverMapSearch('제주 동문시장 게스트하우스'), lat: 33.5140, lng: 126.5290 },

  { zone: 'D16 · 모슬포·가파도 (10, 10-1코스)', type: 'guesthouse', name: '몽게스트하우스', note: '마라도·가파도 선착장 도보 2분, 모슬포 맛집·올레길 도보 5분', link: naverMapSearch('제주 몽게스트하우스 모슬포'), lat: 33.2136, lng: 126.2513 },
  { zone: 'D16 · 모슬포·가파도 (10, 10-1코스)', type: 'guesthouse', name: '오렌지게스트하우스', note: '가파도 올레길 이용객 추천 숙소', link: naverMapSearch('제주 오렌지게스트하우스 모슬포'), lat: 33.2136, lng: 126.2513 },

  { zone: 'D17 · 무릉 (11코스)', type: 'camping', name: '무릉힐링캠프장 (제1힐링캠핑장)', note: '⚠️ 무릉생태문화체험골 내 — 교육/단체 위주 운영 가능성 있어 개별 이용 여부 사전 확인 필요', link: naverMapSearch('무릉힐링캠프장'), lat: 33.2586, lng: 126.1913 },
  { zone: 'D17 · 무릉 (11코스)', type: 'guesthouse', name: '혼울타리게스트하우스', note: '올레11코스 종점, 전통 한옥 게스트하우스', link: naverMapSearch('제주 혼울타리게스트하우스'), lat: 33.2586, lng: 126.1913 },

  { zone: 'D18 · 용수포구 (12코스)', type: 'guesthouse', name: '제주모모 게스트하우스', note: '한경면 용수리 305, 올레13코스 구간 내, 입실 18~19:30 · 퇴실 13:00', link: naverMapSearch('제주모모 게스트하우스 용수리'), lat: 33.2949, lng: 126.1656 },
  { zone: 'D18 · 용수포구 (12코스)', type: 'guesthouse', name: '용수리 한경해안로176 민박', note: '5실, 공용욕실, 에어컨·TV 구비 — 특정 업체명 확인 안 됨, 주소 기준 검색', link: naverMapSearch('제주 한경해안로 176'), lat: 33.2949, lng: 126.1656 },

  { zone: 'D19~D20 · 저지 (13, 14-1코스 연박)', type: 'guesthouse', name: '저지예술마을 게스트하우스', note: 'D19~D20 연박, 오설록(14-1코스) 당일치기 후 복귀', link: naverMapSearch('저지예술마을 게스트하우스'), lat: 33.3245, lng: 126.2645 },
  { zone: 'D19~D20 · 저지 (13, 14-1코스 연박)', type: 'guesthouse', name: '오름펜션', note: '저지리 1724-5, 저지오름 입구', link: 'https://www.jeju.com/item/ld_view.html?agt=jeju&prdno=AC938', lat: 33.3245, lng: 126.2645 },

  { zone: 'D21 · 한림 (14코스)', type: 'camping', name: '제주캠핑베이', note: '협재·한림 근처, 오토캠핑 가능', link: naverMapSearch('제주캠핑베이'), lat: 33.4130, lng: 126.2690 },
  { zone: 'D21 · 한림 (14코스)', type: 'guesthouse', name: '한림항 게스트하우스 검색', note: '우천 시 대체 숙소', link: naverMapSearch('한림항 게스트하우스'), lat: 33.4130, lng: 126.2690 },

  { zone: 'D22 · 애월 고내 (15코스)', type: 'guesthouse', name: '한담누리 게스트하우스', note: '15년차 예약1위, 애월읍 애월리 2443-2, 매일 포트럭 파티', link: naverMapSearch('제주 한담누리 게스트하우스'), lat: 33.4638, lng: 126.3520 },
  { zone: 'D22 · 애월 고내 (15코스)', type: 'guesthouse', name: '고내포구 게스트하우스 검색', note: '대체 옵션', link: naverMapSearch('고내포구 게스트하우스'), lat: 33.4638, lng: 126.3520 },

  { zone: 'D23 · 소길리 (16코스)', type: 'camping', name: '제주올레캠핑', note: '애월읍 평화로 2032-18, 숲속 분지형, 온라인 실시간 예약(땡큐캠핑)', link: 'https://m.thankqcamping.com/resv/view.hbb?cseq=4181', lat: 33.4701, lng: 126.4174 },
  { zone: 'D23 · 소길리 (16코스)', type: 'guesthouse', name: '애월 게스트하우스 검색', note: '만실/우천 시 대체 숙소', link: naverMapSearch('애월 게스트하우스'), lat: 33.4701, lng: 126.4174 },

  { zone: 'D25 · 추자도 (18-1코스)', type: 'guesthouse', name: '추자도에코하우스', note: '추자면 소재 민박', link: naverMapSearch('추자도에코하우스'), lat: 33.9636, lng: 126.3007 },
  { zone: 'D25 · 추자도 (18-1코스)', type: 'guesthouse', name: '대서리 민박 검색', note: '대체 옵션, 여객선 결항 대비 여유 있게 예약', link: naverMapSearch('추자도 대서리 민박'), lat: 33.9636, lng: 126.3007 },
];

export const FOOD_RECS: FoodRec[] = [
  { zone: '조천·김녕·하도 (18~20코스)', lunch: '함덕 해수욕장 앞 횟집', dinner: '조천·김녕 고기국수 또는 갈치조림' },
  { zone: '성산·표선 (1~4코스, 우도)', lunch: '성산포 해녀의집 (해산물 직판), 우도 땅콩아이스크림', dinner: '표선 냉면·비빔밥' },
  { zone: '서귀포 (5~9코스)', lunch: '올레시장 흑돼지 도시락, 제주 올레스테이 1층 카페·식당', dinner: '서귀포 매일올레시장 야시장, 올레스테이 1층 펍 (숙박객 도보 이동)' },
  { zone: '모슬포·가파도 (10~14코스)', lunch: '모슬포항 방어회 (9~11월 제철), 가파도 청보리막걸리', dinner: '모슬포 마늘삼겹살' },
  { zone: '한림·애월 (14~17코스)', lunch: '한림항 앞 카페·분식', dinner: '애월 해안도로 해물뚝배기·전복죽' },
  { zone: '추자도 (18-1·18-2코스)', lunch: '추자도 특산 참굴비 정식', dinner: '추자항 활어회 (완주 축하)' },
];

// 점심 1.5만 + 저녁 2만 = 평일 3.5만, 주말은 특식으로 5만 잡음.
const WEEKDAY_MEAL_COST = 35000;
const WEEKEND_MEAL_COST = 50000;

function isWeekend(dateStr: string): boolean {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return dow === 0 || dow === 6;
}

export const TOTAL_MEAL_COST = REAL_SCHEDULE.reduce(
  (sum, day) => sum + (isWeekend(day.date) ? WEEKEND_MEAL_COST : WEEKDAY_MEAL_COST),
  0
);

export const BUDGET_ITEMS: BudgetItem[] = [
  { item: '숙박 (게스트하우스+캠핑 혼합, 26박)', cost: 530000, note: '게하 2.5만 × 18박 + 캠핑 1만 × 8박 기준' },
  { item: '식비 (점심+저녁, 26일)', cost: TOTAL_MEAL_COST, note: '평일 점심 1.5만+저녁 2만(3.5만/일), 주말 특식 5만/일, 아침 제외' },
  { item: '항공 (김포↔제주 왕복)', cost: 0, note: '마일리지 1만 마일 사용 (현금 지출 없음)' },
  { item: '여객선 (우도·가파도·추자도 왕복)', cost: 70000, note: '우도 8천, 가파도 8천, 추자도 왕복 3만원대' },
  { item: '올레패스포트·간식·비품', cost: 105000, note: '패스포트 2만원 포함' },
];

export const TOTAL_BUDGET_ESTIMATE = BUDGET_ITEMS.reduce((s, i) => s + i.cost, 0);

export const GEAR_ITEMS: GearItem[] = [
  { name: '트레일 러닝화', detail: '발볼 넓고 쿠션 충분한 모델\n호카 HOKA 또는 살로몬 XT-6 권장' },
  { name: '1인용 경량 텐트', detail: '3시즌 1.5kg 이하\nMSR 허블허블 또는 빅아그네스 코퍼 스퍼' },
  { name: '무릎 보호대 + 스틱', detail: '20km+ 구간 다수, 한라산 하산 대비 필수\n카본 스틱 1쌍 + 무릎 압박스타킹 세트' },
];

export const CHECKLIST: string[] = [
  '올레패스포트 구입 (jejuolle.org)',
  '한라산 탐방예약 완료 — 11/7 방문분은 10월 첫 영업일 09:00부터 visithalla.jeju.go.kr에서 신청 가능 (성판악 진달래밭 구간·관음사 삼각봉 구간, 무료·필수)',
  '항공편 예약 확인 (10/23 저녁 제주 도착 · 11/19 10:45 제주→김포)',
  '우도·가파도·추자도 여객선 시간표 확인 (계절/기상에 따라 결항 가능, 특히 추자도)',
  '텐트·침낭·매트 패킹 완료',
  '여행자보험 가입 (의료·물품분실)',
  '무릎 보호대·테이핑 준비',
  '올레패스 공식앱(ollepass.org) 설치 — 코스 변경사항·실시간 GPS 트랙 확인',
  '발수 트레일화 길들이기 (2주 전부터)',
  '게스트하우스 주요 거점 사전 예약 (서귀포·저지 연박 구간 우선)',
  '제주 올레스테이 D10~D11 (11/2~11/3) 2연박 예약 — jejuolle.org/trail#/center/stay 또는 064-762-2167',
  '보조배터리 + 우비·방수팩 준비',
];
