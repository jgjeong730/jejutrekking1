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
}

export interface FoodRec {
  zone: string;
  lunch: string;
  dinner: string;
}

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

export const ACCOMMODATIONS: AccommodationRec[] = [
  { zone: '북동부 (D1~D4, 18~21코스)', type: 'guesthouse', name: '조천·하도·종달 게스트하우스', note: '함덕·김녕 해변 접근성 좋음' },
  { zone: '북동부 (D1~D4, 18~21코스)', type: 'camping', name: '김녕해수욕장 오토캠핑장', note: '19코스 종점 바로 앞' },
  { zone: '동부 (D5~D8, 1~4코스)', type: 'guesthouse', name: '성산·표선해비치 게스트하우스', note: '우도 배편, 4코스 종점 인접' },
  { zone: '동부 (D5~D8, 1~4코스)', type: 'camping', name: '신양리 섭지코지 / 남원 큰엉 캠핑장', note: '2·4코스 구간 내' },
  { zone: '서귀포권 (D9~D14, 5~9코스)', type: 'guesthouse', name: '제주 올레스테이 (서귀포시 중정로 22)', note: '제주올레 사단법인 직영, 7코스 시작점(서귀포올레여행자센터) 바로 앞, D10~D11 연박. 1층 간세스테이션에 공유주방·세탁실, 카페·식당·펍 입점. 예약 jejuolle.org/trail#/center/stay 또는 064-762-2167' },
  { zone: '서귀포권 (D9~D14, 5~9코스)', type: 'camping', name: '월평·대평포구 인근 캠핑', note: '7·8코스 구간 내 (사전 확인 필요)' },
  { zone: '서부 (D16~D20, 10~14코스)', type: 'guesthouse', name: '모슬포·용수·저지 게스트하우스', note: '가파도 배편(운진항), D19~D20 저지 연박' },
  { zone: '서부 (D16~D20, 10~14코스)', type: 'camping', name: '무릉·한림 캠핑장', note: '11·14코스 구간 내' },
  { zone: '북부 (D22~D24, 15~17코스)', type: 'guesthouse', name: '애월·제주시 게스트하우스', note: '해안도로 근처, D24 본섬 완주' },
  { zone: '북부 (D22~D24, 15~17코스)', type: 'camping', name: '제주올레캠핑 (애월읍 소길리)', note: '숲속 분지형 캠핑장' },
  { zone: '추자도 (D25~D26, 18-1·18-2코스)', type: 'guesthouse', name: '추자도 대서리 게스트하우스', note: '제주항에서 배로 약 1시간' },
];

export const FOOD_RECS: FoodRec[] = [
  { zone: '조천·김녕·하도 (18~20코스)', lunch: '함덕 해수욕장 앞 횟집', dinner: '조천·김녕 고기국수 또는 갈치조림' },
  { zone: '성산·표선 (1~4코스, 우도)', lunch: '성산포 해녀의집 (해산물 직판), 우도 땅콩아이스크림', dinner: '표선 냉면·비빔밥' },
  { zone: '서귀포 (5~9코스)', lunch: '올레시장 흑돼지 도시락, 제주 올레스테이 1층 카페·식당', dinner: '서귀포 매일올레시장 야시장, 올레스테이 1층 펍 (숙박객 도보 이동)' },
  { zone: '모슬포·가파도 (10~14코스)', lunch: '모슬포항 방어회 (9~11월 제철), 가파도 청보리막걸리', dinner: '모슬포 마늘삼겹살' },
  { zone: '한림·애월 (14~17코스)', lunch: '한림항 앞 카페·분식', dinner: '애월 해안도로 해물뚝배기·전복죽' },
  { zone: '추자도 (18-1·18-2코스)', lunch: '추자도 특산 참굴비 정식', dinner: '추자항 활어회 (완주 축하)' },
];

export const BUDGET_ITEMS: BudgetItem[] = [
  { item: '숙박 (게스트하우스+캠핑 혼합, 25박)', cost: 550000, note: '게하 2.5만 × 19박 + 캠핑 1만 × 6박 기준' },
  { item: '식비 (점심+저녁, 26일)', cost: 520000, note: '1일 평균 2만원, 아침 제외' },
  { item: '항공 (김포↔제주 왕복)', cost: 100000, note: '저비용항공 특가 기준' },
  { item: '여객선 (우도·가파도·추자도 왕복)', cost: 70000, note: '우도 8천, 가파도 8천, 추자도 왕복 3만원대' },
  { item: '올레패스포트·간식·비품', cost: 100000, note: '패스포트 1.5만원 포함' },
];

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
