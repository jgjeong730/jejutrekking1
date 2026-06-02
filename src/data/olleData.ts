export interface OlleDay {
  day: number;
  accommodation: 'guesthouse' | 'camping' | 'special';
  course: string;
  section: string;
  distance: number | null;
  cumulative: number | null;
  lodge: string;
  isSpecial?: 'hallasan' | 'rest' | 'complete';
  lat: number;
  lng: number;
  routeIdx: number; // index in OLLE_ROUTE; -1 for off-trail (Hallasan / rest)
}

// Full Olle Trail circuit waypoints — starts and ends at Jeju Airport (관덕정)
// Order: 공항 → 동쪽(18→21코스) → 1코스 → 남쪽 → 서쪽 → 북쪽 → 공항 귀환(17코스 끝)
export const OLLE_ROUTE: { lat: number; lng: number; label: string }[] = [
  { lat: 33.5068, lng: 126.5220, label: '제주공항 출발 (관덕정)' },      // 0: start = airport
  { lat: 33.5411, lng: 126.6386, label: '조천 (18코스 끝)' },            // 1
  { lat: 33.5523, lng: 126.7645, label: '김녕 (19코스 끝)' },            // 2
  { lat: 33.5239, lng: 126.8454, label: '한동 (20코스 끝)' },            // 3
  { lat: 33.4972, lng: 126.9181, label: '종달 (21코스 끝)' },            // 4
  { lat: 33.4558, lng: 126.9274, label: '시흥초교 (1코스 시작)' },       // 5
  { lat: 33.4686, lng: 126.9143, label: '광치기해변 (1코스 끝)' },       // 6
  { lat: 33.4183, lng: 126.8937, label: '온평리 (2코스 끝)' },           // 7
  { lat: 33.3804, lng: 126.8261, label: '표선 (3코스 끝)' },             // 8
  { lat: 33.2831, lng: 126.7140, label: '남원 (4코스 끝)' },             // 9
  { lat: 33.2375, lng: 126.6403, label: '쇠소깍 (5코스 끝)' },          // 10
  { lat: 33.2465, lng: 126.5628, label: '서귀포 (6코스 끝)' },          // 11
  { lat: 33.2340, lng: 126.4950, label: '서귀포 서쪽 (7코스)' },        // 12
  { lat: 33.2222, lng: 126.3994, label: '대평포구 (8코스 끝)' },        // 13
  { lat: 33.2378, lng: 126.3199, label: '화순 (9코스 끝)' },            // 14
  { lat: 33.2156, lng: 126.2519, label: '모슬포 (10코스 끝)' },         // 15
  { lat: 33.2567, lng: 126.1917, label: '무릉 (11코스 끝)' },           // 16
  { lat: 33.3125, lng: 126.1660, label: '용수리 (12코스 끝)' },         // 17
  { lat: 33.3551, lng: 126.2220, label: '저지 (13코스 끝)' },           // 18
  { lat: 33.4143, lng: 126.2712, label: '한림 (14코스 끝)' },           // 19
  { lat: 33.4638, lng: 126.3520, label: '고내 (15코스 끝)' },           // 20
  { lat: 33.4701, lng: 126.4174, label: '광령 (16코스 끝)' },           // 21
  { lat: 33.5068, lng: 126.5220, label: '관덕정 완주 🎉 (공항 귀환)' }, // 22: loop closed!
];

export const HALLASAN_COORD = { lat: 33.3763, lng: 126.5909, label: '한라산 성판악' };

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
  standard: number;
  tight: number;
  note: string;
}

export interface GearItem {
  name: string;
  detail: string;
}

// 표준 22일 — 제주공항 출발 → 동쪽(18→21코스) → 1코스 → 남쪽 → 서쪽 → 북쪽 → 공항 귀환(17코스 완주)
export const STANDARD_SCHEDULE: OlleDay[] = [
  { day: 1,  accommodation: 'guesthouse', course: '이동일 + 18코스', section: '제주공항 도착 → 관덕정 → 조천', distance: 19, cumulative: 19,  lodge: '조천 게스트하우스',             lat: 33.5411, lng: 126.6386, routeIdx: 1  },
  { day: 2,  accommodation: 'camping',    course: '19코스',          section: '조천→김녕',                      distance: 22, cumulative: 41,  lodge: '김녕해수욕장 캠핑장',           lat: 33.5523, lng: 126.7645, routeIdx: 2  },
  { day: 3,  accommodation: 'guesthouse', course: '20코스',          section: '김녕→한동',                      distance: 18, cumulative: 59,  lodge: '한동 게스트하우스',             lat: 33.5239, lng: 126.8454, routeIdx: 3  },
  { day: 4,  accommodation: 'guesthouse', course: '21코스',          section: '한동→종달바당',                  distance: 18, cumulative: 77,  lodge: '종달 게스트하우스',             lat: 33.4972, lng: 126.9181, routeIdx: 4  },
  { day: 5,  accommodation: 'guesthouse', course: '1코스',           section: '시흥초교→광치기해변 | 성산일출봉', distance: 15, cumulative: 92,  lodge: '성산 일출봉 게스트하우스',      lat: 33.4686, lng: 126.9143, routeIdx: 6  },
  { day: 6,  accommodation: 'camping',    course: '2코스',           section: '광치기→온평리',                  distance: 15, cumulative: 107, lodge: '신양리 섭지코지 캠핑장',        lat: 33.4183, lng: 126.8937, routeIdx: 7  },
  { day: 7,  accommodation: 'guesthouse', course: '3코스',           section: '온평→표선 | 신천목장 해안',       distance: 22, cumulative: 129, lodge: '표선해비치 게스트하우스',       lat: 33.3804, lng: 126.8261, routeIdx: 8  },
  { day: 8,  accommodation: 'camping',    course: '4코스',           section: '표선→남원 | 큰엉해안',           distance: 24, cumulative: 153, lodge: '남원 큰엉 오토캠핑장',          lat: 33.2831, lng: 126.7140, routeIdx: 9  },
  { day: 9,  accommodation: 'guesthouse', course: '5코스',           section: '남원→쇠소깍',                    distance: 14, cumulative: 167, lodge: '쇠소깍 인근 게스트하우스',      lat: 33.2375, lng: 126.6403, routeIdx: 10 },
  { day: 10, accommodation: 'guesthouse', course: '6코스',           section: '쇠소깍→서귀포 올레여행자센터',    distance: 11, cumulative: 178, lodge: '서귀포 올레 게스트하우스',      lat: 33.2465, lng: 126.5628, routeIdx: 11 },
  { day: 11, accommodation: 'guesthouse', course: '7코스(임시)',      section: '서귀포시내 | 천지연폭포 관람',    distance: 15, cumulative: 193, lodge: '서귀포 게스트하우스 연박',      lat: 33.2340, lng: 126.4950, routeIdx: 12 },
  { day: 12, accommodation: 'camping',    course: '8코스',           section: '월평→대평포구 | 박수기정·군산오름', distance: 20, cumulative: 213, lodge: '대평포구 인근 캠핑',           lat: 33.2222, lng: 126.3994, routeIdx: 13 },
  { day: 13, accommodation: 'guesthouse', course: '9코스',           section: '대평→화순금모래해변',             distance: 11, cumulative: 224, lodge: '화순 게스트하우스',             lat: 33.2378, lng: 126.3199, routeIdx: 14 },
  { day: 14, accommodation: 'guesthouse', course: '10코스',          section: '화순→모슬포',                    distance: 15, cumulative: 239, lodge: '모슬포 게스트하우스',           lat: 33.2156, lng: 126.2519, routeIdx: 15 },
  { day: 15, accommodation: 'special',   course: '★ 한라산 등반',   section: '성판악→백록담→관음사 | 19km / 약 8h', distance: 19, cumulative: 258, lodge: '제주시내 게스트하우스', isSpecial: 'hallasan', lat: 33.3763, lng: 126.5909, routeIdx: -1 },
  { day: 16, accommodation: 'camping',    course: '11코스',          section: '모슬포→무릉',                    distance: 17, cumulative: 275, lodge: '무릉 캠핑장',                   lat: 33.2567, lng: 126.1917, routeIdx: 16 },
  { day: 17, accommodation: 'guesthouse', course: '12코스',          section: '무릉→용수리',                    distance: 18, cumulative: 293, lodge: '한림 수월봉 게스트하우스',      lat: 33.3125, lng: 126.1660, routeIdx: 17 },
  { day: 18, accommodation: 'guesthouse', course: '13코스',          section: '용수→저지',                      distance: 16, cumulative: 309, lodge: '저지 게스트하우스',             lat: 33.3551, lng: 126.2220, routeIdx: 18 },
  { day: 19, accommodation: 'camping',    course: '14코스',          section: '저지→한림',                      distance: 19, cumulative: 328, lodge: '한림 캠핑',                     lat: 33.4143, lng: 126.2712, routeIdx: 19 },
  { day: 20, accommodation: 'guesthouse', course: '15코스',          section: '한림→고내',                      distance: 19, cumulative: 347, lodge: '애월 단빌리지 게스트하우스',    lat: 33.4638, lng: 126.3520, routeIdx: 20 },
  { day: 21, accommodation: 'special',   course: '★ 휴식일 (서부권)', section: '발 회복 | 세탁 | 장비 재정비', distance: null, cumulative: 347, lodge: '고내·애월 게스트하우스 연박', isSpecial: 'rest', lat: 33.4638, lng: 126.3520, routeIdx: 20 },
  { day: 22, accommodation: 'camping',    course: '16코스',          section: '고내→광령',                      distance: 16, cumulative: 363, lodge: '제주올레캠핑 (애월 소길리)',    lat: 33.4701, lng: 126.4174, routeIdx: 21 },
  { day: 23, accommodation: 'guesthouse', course: '17코스 완주 🎉', section: '광령→관덕정 | 제주공항 귀환', distance: 18, cumulative: 381, lodge: '제주시 게스트하우스 (완주 축하)', isSpecial: 'complete', lat: 33.5068, lng: 126.5220, routeIdx: 22 },
];

// 타이트 17일 — 제주공항 출발 → 동쪽(18→21코스) → 1코스 → 남·서·북 → 공항 귀환(17코스 완주)
export const TIGHT_SCHEDULE: OlleDay[] = [
  { day: 1,  accommodation: 'guesthouse', course: '이동 + 18코스',           section: '제주공항 도착 → 관덕정 → 조천',      distance: 19, cumulative: 19,  lodge: '조천 게스트하우스',             lat: 33.5411, lng: 126.6386, routeIdx: 1  },
  { day: 2,  accommodation: 'camping',    course: '19코스 + 20코스 전반',     section: '조천→김녕→한동 중간',               distance: 28, cumulative: 47,  lodge: '한동 인근 캠핑',                lat: 33.5380, lng: 126.8050, routeIdx: 2  },
  { day: 3,  accommodation: 'guesthouse', course: '20코스 후반 + 21코스',     section: '한동→종달바당',                     distance: 24, cumulative: 71,  lodge: '종달 게스트하우스',             lat: 33.4972, lng: 126.9181, routeIdx: 4  },
  { day: 4,  accommodation: 'camping',    course: '1코스 + 2코스',            section: '시흥초교→광치기→온평리',            distance: 30, cumulative: 101, lodge: '신양리 섭지코지 캠핑장',        lat: 33.4183, lng: 126.8937, routeIdx: 7  },
  { day: 5,  accommodation: 'guesthouse', course: '3코스 + 4코스 전반',       section: '온평→표선 중간',                    distance: 28, cumulative: 129, lodge: '표선 인근 게스트하우스',        lat: 33.3990, lng: 126.8600, routeIdx: 8  },
  { day: 6,  accommodation: 'guesthouse', course: '4코스 후반 + 5코스',       section: '표선→남원→쇠소깍',                  distance: 25, cumulative: 154, lodge: '쇠소깍 인근 게스트하우스',      lat: 33.2375, lng: 126.6403, routeIdx: 10 },
  { day: 7,  accommodation: 'camping',    course: '6코스 + 7코스',            section: '쇠소깍→서귀포 서쪽',               distance: 26, cumulative: 180, lodge: '서귀포 올레 게스트하우스',      lat: 33.2340, lng: 126.4950, routeIdx: 12 },
  { day: 8,  accommodation: 'camping',    course: '8코스 + 9코스',            section: '월평→대평→화순',                    distance: 28, cumulative: 208, lodge: '화순 인근 캠핑',                lat: 33.2378, lng: 126.3199, routeIdx: 14 },
  { day: 9,  accommodation: 'special',   course: '★ 한라산 등반',            section: '성판악→백록담→관음사 | 약 8h',      distance: 19, cumulative: null, lodge: '제주시내 게스트하우스', isSpecial: 'hallasan', lat: 33.3763, lng: 126.5909, routeIdx: -1 },
  { day: 10, accommodation: 'guesthouse', course: '10코스',                   section: '화순→모슬포 (한라산 후 단코스)',     distance: 15, cumulative: 223, lodge: '모슬포 게스트하우스',           lat: 33.2156, lng: 126.2519, routeIdx: 15 },
  { day: 11, accommodation: 'camping',    course: '11코스 + 12코스',          section: '모슬포→무릉→용수리',               distance: 30, cumulative: 253, lodge: '용수 인근 캠핑',                lat: 33.3125, lng: 126.1660, routeIdx: 17 },
  { day: 12, accommodation: 'guesthouse', course: '13코스 + 14코스',          section: '용수→저지→한림',                    distance: 28, cumulative: 281, lodge: '한림 게스트하우스',             lat: 33.4143, lng: 126.2712, routeIdx: 19 },
  { day: 13, accommodation: 'camping',    course: '15코스 + 16코스',          section: '한림→고내→광령',                    distance: 28, cumulative: 309, lodge: '제주올레캠핑 (애월 소길리)',    lat: 33.4701, lng: 126.4174, routeIdx: 21 },
  { day: 14, accommodation: 'guesthouse', course: '17코스 완주 🎉',           section: '광령→관덕정 | 제주공항 귀환',       distance: 18, cumulative: 327, lodge: '제주시 게스트하우스 (완주 축하)', isSpecial: 'complete', lat: 33.5068, lng: 126.5220, routeIdx: 22 },
];

export const ACCOMMODATIONS: AccommodationRec[] = [
  { zone: '1~2코스', type: 'guesthouse', name: '성산 일출봉 게스트하우스', note: '올레꾼 밀집, 스탬프 정보 공유' },
  { zone: '1~2코스', type: 'camping', name: '신양리 섭지코지 인근 캠핑장', note: '2코스 종점 근처' },
  { zone: '3~5코스', type: 'guesthouse', name: '표선해비치 게스트하우스', note: '4코스 종점 직결' },
  { zone: '3~5코스', type: 'camping', name: '남원 큰엉 해안 오토캠핑장', note: '4코스 구간 내' },
  { zone: '6~8코스', type: 'guesthouse', name: '서귀포 올레 게스트하우스', note: '올레여행자센터 접근 가능' },
  { zone: '6~8코스', type: 'camping', name: '월평 아왜낭목 캠핑장', note: '8코스 구간 내 (사전 확인 필요)' },
  { zone: '11~14코스', type: 'guesthouse', name: '한림 수월봉 게스트하우스', note: '12코스 종점 용수리 인근' },
  { zone: '11~14코스', type: 'camping', name: '돌하르방 캠핑장', note: '제주 1호 캠핑장, 잔디 광장' },
  { zone: '15~17코스', type: 'guesthouse', name: '애월 단빌리지 게스트하우스', note: '해안도로 근처' },
  { zone: '15~17코스', type: 'camping', name: '제주올레캠핑 (애월읍 소길리)', note: '숲속 분지형 / 507-1402-9922' },
  { zone: '19~21코스', type: 'guesthouse', name: '함덕해수욕장 게스트하우스', note: '바다뷰, 19코스 경유' },
  { zone: '19~21코스', type: 'camping', name: '김녕해수욕장 오토캠핑장', note: '20코스 시작점' },
];

export const FOOD_RECS: FoodRec[] = [
  { zone: '성산 (1~2코스)', lunch: '성산포 해녀의집 (해산물 직판)', dinner: '성산읍내 고기국수 또는 갈치조림' },
  { zone: '표선·남원 (3~5코스)', lunch: '표선해수욕장 근처 냉면·비빔밥', dinner: '남원리 해안 횟집 (보말칼국수)' },
  { zone: '서귀포 (6~8코스)', lunch: '올레시장 흑돼지 도시락', dinner: '서귀포 매일올레시장 야시장' },
  { zone: '모슬포 (9~11코스)', lunch: '모슬포항 방어회 (9~11월 제철)', dinner: '모슬포 마늘삼겹살 + 막걸리' },
  { zone: '한림·애월 (14~16코스)', lunch: '한림 수월봉 앞 카페·분식', dinner: '애월 해안도로 해물뚝배기·전복죽' },
  { zone: '함덕·종달 (19~21코스)', lunch: '함덕 해수욕장 앞 횟집', dinner: '종달리 흑돼지삼겹 (완주 축하)' },
];

export const BUDGET_ITEMS: BudgetItem[] = [
  { item: '숙박 (게하+캠핑 혼합)', standard: 450000, tight: 330000, note: '게하 2.5만 / 캠핑 1만 기준' },
  { item: '식비 (점심+저녁)', standard: 440000, tight: 340000, note: '1일 평균 2만원' },
  { item: '교통 (항공+버스)', standard: 150000, tight: 120000, note: '항공 왕복 10만 포함' },
  { item: '올레패스포트·간식·비품', standard: 100000, tight: 80000, note: '패스포트 1.5만 포함' },
];

export const GEAR_ITEMS: GearItem[] = [
  { name: '트레일 러닝화', detail: '발볼 넓고 쿠션 충분한 모델\n호카 HOKA 또는 살로몬 XT-6 권장' },
  { name: '1인용 경량 텐트', detail: '3시즌 1.5kg 이하\nMSR 허블 허블 또는 빅아그네스 코퍼 스퍼' },
  { name: '무릎 보호대 + 스틱', detail: '30km+ 구간 필수\n카본 스틱 1쌍 + 무릎 압박스타킹 세트' },
];

export const CHECKLIST: string[] = [
  '올레패스포트 구입 (jejuolle.org)',
  '한라산 탐방 예약 완료 (reservation.knps.or.kr)',
  '항공편 예약 (9월 중순)',
  '텐트·침낭·매트 패킹 완료',
  '여행자보험 가입 (의료·물품분실)',
  '무릎 보호대·테이핑 준비',
  '올레 공식앱 설치 (코스 변경 확인)',
  '발수 트레일화 길들이기 (2주 전부터)',
  '게스트하우스 주요 거점 사전 예약',
  '보조배터리 + 우비·방수팩 준비',
];
