export interface CourseWaypoint {
  lat: number;
  lng: number;
}

export interface OlleCourse {
  id: number;
  name: string;
  fullName: string;
  distance: number;     // km
  duration: number;     // 시간
  difficulty: '쉬움' | '보통' | '어려움';
  startPoint: { lat: number; lng: number; name: string };
  endPoint: { lat: number; lng: number; name: string };
  waypoints: CourseWaypoint[];
  color: string;
  gpxFile: string;
  isAlt?: boolean;
  description?: string;
}

export const OLLE_COURSES: OlleCourse[] = [
  {
    id: 1, name: '1코스', fullName: '시흥 ~ 광치기해변', distance: 15.1, duration: 4, difficulty: '보통',
    startPoint: { lat: 33.5135, lng: 126.9205, name: '시흥초등학교' },
    endPoint:   { lat: 33.4634, lng: 126.9225, name: '광치기해변' },
    color: '#E74C3C', gpxFile: '/gpx/course_01.gpx',
    description: '성산일출봉을 배경으로 동쪽 해안을 따라 걷는 시작 코스',
    waypoints: [
      { lat: 33.5135, lng: 126.9205 }, { lat: 33.5060, lng: 126.9255 },
      { lat: 33.4980, lng: 126.9280 }, { lat: 33.4880, lng: 126.9300 },
      { lat: 33.4780, lng: 126.9295 }, { lat: 33.4700, lng: 126.9265 },
      { lat: 33.4634, lng: 126.9225 },
    ],
  },
  {
    id: 2, name: '2코스', fullName: '광치기해변 ~ 온평포구', distance: 15.4, duration: 4, difficulty: '쉬움',
    startPoint: { lat: 33.4634, lng: 126.9225, name: '광치기해변' },
    endPoint:   { lat: 33.4080, lng: 126.8930, name: '온평포구' },
    color: '#E67E22', gpxFile: '/gpx/course_02.gpx',
    description: '섭지코지와 신양해수욕장을 지나는 평탄한 해안 코스',
    waypoints: [
      { lat: 33.4634, lng: 126.9225 }, { lat: 33.4550, lng: 126.9200 },
      { lat: 33.4450, lng: 126.9180 }, { lat: 33.4350, lng: 126.9100 },
      { lat: 33.4250, lng: 126.9020 }, { lat: 33.4150, lng: 126.8960 },
      { lat: 33.4080, lng: 126.8930 },
    ],
  },
  {
    id: 3, name: '3코스', fullName: '온평포구 ~ 표선해수욕장', distance: 22.0, duration: 6, difficulty: '보통',
    startPoint: { lat: 33.4080, lng: 126.8930, name: '온평포구' },
    endPoint:   { lat: 33.3790, lng: 126.8240, name: '표선해수욕장' },
    color: '#F39C12', gpxFile: '/gpx/course_03.gpx',
    description: '신천목장과 제주 동쪽 해안의 아름다운 경치',
    waypoints: [
      { lat: 33.4080, lng: 126.8930 }, { lat: 33.3980, lng: 126.8800 },
      { lat: 33.3880, lng: 126.8680 }, { lat: 33.3800, lng: 126.8530 },
      { lat: 33.3760, lng: 126.8420 }, { lat: 33.3790, lng: 126.8240 },
    ],
  },
  {
    id: 4, name: '4코스', fullName: '표선해수욕장 ~ 남원포구', distance: 23.6, duration: 6, difficulty: '보통',
    startPoint: { lat: 33.3790, lng: 126.8240, name: '표선해수욕장' },
    endPoint:   { lat: 33.2820, lng: 126.7120, name: '남원포구' },
    color: '#27AE60', gpxFile: '/gpx/course_04.gpx',
    description: '큰엉 해안 절경과 남원 바닷가를 잇는 장거리 코스',
    waypoints: [
      { lat: 33.3790, lng: 126.8240 }, { lat: 33.3650, lng: 126.8050 },
      { lat: 33.3450, lng: 126.7800 }, { lat: 33.3200, lng: 126.7550 },
      { lat: 33.3000, lng: 126.7350 }, { lat: 33.2820, lng: 126.7120 },
    ],
  },
  {
    id: 5, name: '5코스', fullName: '남원포구 ~ 쇠소깍', distance: 13.4, duration: 4, difficulty: '쉬움',
    startPoint: { lat: 33.2820, lng: 126.7120, name: '남원포구' },
    endPoint:   { lat: 33.2370, lng: 126.6390, name: '쇠소깍' },
    color: '#2ECC71', gpxFile: '/gpx/course_05.gpx',
    description: '제주 남부 해안을 따라 쇠소깍 에메랄드 물색까지',
    waypoints: [
      { lat: 33.2820, lng: 126.7120 }, { lat: 33.2700, lng: 126.6950 },
      { lat: 33.2580, lng: 126.6780 }, { lat: 33.2450, lng: 126.6580 },
      { lat: 33.2370, lng: 126.6390 },
    ],
  },
  {
    id: 51, name: '5A코스', fullName: '쇠소깍 ~ 제지기오름', distance: 5.1, duration: 2, difficulty: '쉬움',
    startPoint: { lat: 33.2370, lng: 126.6390, name: '쇠소깍' },
    endPoint:   { lat: 33.2280, lng: 126.6200, name: '제지기오름' },
    color: '#1ABC9C', gpxFile: '/gpx/course_05a.gpx', isAlt: true,
    description: '쇠소깍 지선코스',
    waypoints: [
      { lat: 33.2370, lng: 126.6390 }, { lat: 33.2320, lng: 126.6300 },
      { lat: 33.2280, lng: 126.6200 },
    ],
  },
  {
    id: 6, name: '6코스', fullName: '쇠소깍 ~ 서귀포올레여행자센터', distance: 11.2, duration: 3, difficulty: '쉬움',
    startPoint: { lat: 33.2370, lng: 126.6390, name: '쇠소깍' },
    endPoint:   { lat: 33.2460, lng: 126.5620, name: '서귀포올레여행자센터' },
    color: '#16A085', gpxFile: '/gpx/course_06.gpx',
    description: '외돌개와 서귀포 올레시장까지',
    waypoints: [
      { lat: 33.2370, lng: 126.6390 }, { lat: 33.2420, lng: 126.6200 },
      { lat: 33.2460, lng: 126.6000 }, { lat: 33.2470, lng: 126.5800 },
      { lat: 33.2460, lng: 126.5620 },
    ],
  },
  {
    id: 61, name: '6A코스', fullName: '서귀포보건소 ~ 제지기오름', distance: 5.9, duration: 2, difficulty: '쉬움',
    startPoint: { lat: 33.2460, lng: 126.5620, name: '서귀포보건소' },
    endPoint:   { lat: 33.2280, lng: 126.6200, name: '제지기오름' },
    color: '#0E6655', gpxFile: '/gpx/course_06a.gpx', isAlt: true,
    description: '서귀포 지선코스',
    waypoints: [
      { lat: 33.2460, lng: 126.5620 }, { lat: 33.2380, lng: 126.5900 },
      { lat: 33.2280, lng: 126.6200 },
    ],
  },
  {
    id: 7, name: '7코스', fullName: '서귀포올레여행자센터 ~ 월평아왜낭목', distance: 15.3, duration: 4, difficulty: '보통',
    startPoint: { lat: 33.2460, lng: 126.5620, name: '서귀포올레여행자센터' },
    endPoint:   { lat: 33.2330, lng: 126.4680, name: '월평아왜낭목' },
    color: '#2980B9', gpxFile: '/gpx/course_07.gpx',
    description: '천지연폭포와 외돌개를 지나 서귀포 서쪽으로',
    waypoints: [
      { lat: 33.2460, lng: 126.5620 }, { lat: 33.2440, lng: 126.5400 },
      { lat: 33.2400, lng: 126.5200 }, { lat: 33.2360, lng: 126.5000 },
      { lat: 33.2340, lng: 126.4850 }, { lat: 33.2330, lng: 126.4680 },
    ],
  },
  {
    id: 71, name: '7A코스', fullName: '호근마을 ~ 서호마을', distance: 6.0, duration: 2, difficulty: '쉬움',
    startPoint: { lat: 33.2400, lng: 126.5300, name: '호근마을' },
    endPoint:   { lat: 33.2340, lng: 126.4900, name: '서호마을' },
    color: '#1A5276', gpxFile: '/gpx/course_07a.gpx', isAlt: true,
    description: '7코스 지선',
    waypoints: [
      { lat: 33.2400, lng: 126.5300 }, { lat: 33.2380, lng: 126.5100 },
      { lat: 33.2340, lng: 126.4900 },
    ],
  },
  {
    id: 8, name: '8코스', fullName: '월평아왜낭목 ~ 대평포구', distance: 17.6, duration: 5, difficulty: '어려움',
    startPoint: { lat: 33.2330, lng: 126.4680, name: '월평아왜낭목' },
    endPoint:   { lat: 33.2210, lng: 126.3980, name: '대평포구' },
    color: '#8E44AD', gpxFile: '/gpx/course_08.gpx',
    description: '박수기정과 군산오름을 넘는 도전적인 코스',
    waypoints: [
      { lat: 33.2330, lng: 126.4680 }, { lat: 33.2300, lng: 126.4500 },
      { lat: 33.2270, lng: 126.4320 }, { lat: 33.2240, lng: 126.4160 },
      { lat: 33.2210, lng: 126.3980 },
    ],
  },
  {
    id: 9, name: '9코스', fullName: '대평포구 ~ 화순금모래해변', distance: 11.3, duration: 3, difficulty: '쉬움',
    startPoint: { lat: 33.2210, lng: 126.3980, name: '대평포구' },
    endPoint:   { lat: 33.2370, lng: 126.3190, name: '화순금모래해변' },
    color: '#6C3483', gpxFile: '/gpx/course_09.gpx',
    description: '산방산을 바라보며 걷는 화순 해안',
    waypoints: [
      { lat: 33.2210, lng: 126.3980 }, { lat: 33.2260, lng: 126.3780 },
      { lat: 33.2320, lng: 126.3580 }, { lat: 33.2360, lng: 126.3380 },
      { lat: 33.2370, lng: 126.3190 },
    ],
  },
  {
    id: 10, name: '10코스', fullName: '화순금모래해변 ~ 모슬포항', distance: 15.6, duration: 4, difficulty: '쉬움',
    startPoint: { lat: 33.2370, lng: 126.3190, name: '화순금모래해변' },
    endPoint:   { lat: 33.2140, lng: 126.2500, name: '모슬포하모항' },
    color: '#C0392B', gpxFile: '/gpx/course_10.gpx',
    description: '사계해안도로와 마라도 전망',
    waypoints: [
      { lat: 33.2370, lng: 126.3190 }, { lat: 33.2310, lng: 126.3000 },
      { lat: 33.2240, lng: 126.2820 }, { lat: 33.2180, lng: 126.2660 },
      { lat: 33.2140, lng: 126.2500 },
    ],
  },
  {
    id: 101, name: '10A코스', fullName: '가파도', distance: 7.1, duration: 2, difficulty: '쉬움',
    startPoint: { lat: 33.1720, lng: 126.2680, name: '가파도 상동항' },
    endPoint:   { lat: 33.1720, lng: 126.2680, name: '가파도 상동항' },
    color: '#922B21', gpxFile: '/gpx/course_10a.gpx', isAlt: true,
    description: '모슬포에서 배로 가는 가파도 섬 일주',
    waypoints: [
      { lat: 33.1720, lng: 126.2680 }, { lat: 33.1700, lng: 126.2780 },
      { lat: 33.1680, lng: 126.2850 }, { lat: 33.1650, lng: 126.2800 },
      { lat: 33.1660, lng: 126.2700 }, { lat: 33.1700, lng: 126.2620 },
      { lat: 33.1720, lng: 126.2680 },
    ],
  },
  {
    id: 11, name: '11코스', fullName: '모슬포항 ~ 무릉외갓집', distance: 17.3, duration: 5, difficulty: '보통',
    startPoint: { lat: 33.2140, lng: 126.2500, name: '모슬포하모항' },
    endPoint:   { lat: 33.2560, lng: 126.1920, name: '무릉외갓집' },
    color: '#E74C3C', gpxFile: '/gpx/course_11.gpx',
    description: '서부 해안길을 따라 무릉리까지',
    waypoints: [
      { lat: 33.2140, lng: 126.2500 }, { lat: 33.2200, lng: 126.2350 },
      { lat: 33.2320, lng: 126.2200 }, { lat: 33.2430, lng: 126.2070 },
      { lat: 33.2560, lng: 126.1920 },
    ],
  },
  {
    id: 12, name: '12코스', fullName: '무릉외갓집 ~ 용수저수지', distance: 17.5, duration: 5, difficulty: '보통',
    startPoint: { lat: 33.2560, lng: 126.1920, name: '무릉외갓집' },
    endPoint:   { lat: 33.3120, lng: 126.1650, name: '용수저수지' },
    color: '#D35400', gpxFile: '/gpx/course_12.gpx',
    description: '수월봉과 차귀도를 조망하는 서부 해안',
    waypoints: [
      { lat: 33.2560, lng: 126.1920 }, { lat: 33.2720, lng: 126.1810 },
      { lat: 33.2900, lng: 126.1730 }, { lat: 33.3020, lng: 126.1680 },
      { lat: 33.3120, lng: 126.1650 },
    ],
  },
  {
    id: 13, name: '13코스', fullName: '용수저수지 ~ 저지오름', distance: 15.3, duration: 4, difficulty: '보통',
    startPoint: { lat: 33.3120, lng: 126.1650, name: '용수저수지' },
    endPoint:   { lat: 33.3540, lng: 126.2210, name: '저지오름' },
    color: '#F39C12', gpxFile: '/gpx/course_13.gpx',
    description: '내륙으로 들어가는 유일한 코스, 저지오름 전망',
    waypoints: [
      { lat: 33.3120, lng: 126.1650 }, { lat: 33.3220, lng: 126.1800 },
      { lat: 33.3330, lng: 126.1980 }, { lat: 33.3430, lng: 126.2100 },
      { lat: 33.3540, lng: 126.2210 },
    ],
  },
  {
    id: 131, name: '13A코스', fullName: '저지오름 ~ 무릉외갓집', distance: 10.2, duration: 3, difficulty: '보통',
    startPoint: { lat: 33.3540, lng: 126.2210, name: '저지오름' },
    endPoint:   { lat: 33.2560, lng: 126.1920, name: '무릉외갓집' },
    color: '#D4AC0D', gpxFile: '/gpx/course_13a.gpx', isAlt: true,
    description: '13코스 지선, 저지오름에서 무릉으로',
    waypoints: [
      { lat: 33.3540, lng: 126.2210 }, { lat: 33.3350, lng: 126.2050 },
      { lat: 33.3100, lng: 126.1900 }, { lat: 33.2560, lng: 126.1920 },
    ],
  },
  {
    id: 14, name: '14코스', fullName: '저지오름 ~ 한림항', distance: 18.6, duration: 5, difficulty: '보통',
    startPoint: { lat: 33.3540, lng: 126.2210, name: '저지오름' },
    endPoint:   { lat: 33.4130, lng: 126.2690, name: '한림항' },
    color: '#1E8449', gpxFile: '/gpx/course_14.gpx',
    description: '협재해수욕장과 한림공원을 지나는 아름다운 코스',
    waypoints: [
      { lat: 33.3540, lng: 126.2210 }, { lat: 33.3700, lng: 126.2350 },
      { lat: 33.3850, lng: 126.2480 }, { lat: 33.4000, lng: 126.2580 },
      { lat: 33.4130, lng: 126.2690 },
    ],
  },
  {
    id: 141, name: '14A코스', fullName: '저지오름 ~ 한림항 (대안)', distance: 14.6, duration: 4, difficulty: '쉬움',
    startPoint: { lat: 33.3540, lng: 126.2210, name: '저지오름' },
    endPoint:   { lat: 33.4130, lng: 126.2690, name: '한림항' },
    color: '#117A65', gpxFile: '/gpx/course_14a.gpx', isAlt: true,
    description: '14코스 대안 지선',
    waypoints: [
      { lat: 33.3540, lng: 126.2210 }, { lat: 33.3700, lng: 126.2400 },
      { lat: 33.3900, lng: 126.2550 }, { lat: 33.4130, lng: 126.2690 },
    ],
  },
  {
    id: 15, name: '15코스', fullName: '한림항 ~ 고내포구', distance: 19.2, duration: 5, difficulty: '보통',
    startPoint: { lat: 33.4130, lng: 126.2690, name: '한림항' },
    endPoint:   { lat: 33.4630, lng: 126.3510, name: '고내포구' },
    color: '#2874A6', gpxFile: '/gpx/course_15.gpx',
    description: '북서 해안을 따라 애월로 이어지는 코스',
    waypoints: [
      { lat: 33.4130, lng: 126.2690 }, { lat: 33.4250, lng: 126.2870 },
      { lat: 33.4380, lng: 126.3050 }, { lat: 33.4500, lng: 126.3260 },
      { lat: 33.4630, lng: 126.3510 },
    ],
  },
  {
    id: 16, name: '16코스', fullName: '고내포구 ~ 광령리', distance: 15.6, duration: 4, difficulty: '보통',
    startPoint: { lat: 33.4630, lng: 126.3510, name: '고내포구' },
    endPoint:   { lat: 33.4690, lng: 126.4160, name: '광령리' },
    color: '#1A5276', gpxFile: '/gpx/course_16.gpx',
    description: '애월 해안도로를 따라 걷는 평탄한 코스',
    waypoints: [
      { lat: 33.4630, lng: 126.3510 }, { lat: 33.4660, lng: 126.3700 },
      { lat: 33.4680, lng: 126.3900 }, { lat: 33.4690, lng: 126.4160 },
    ],
  },
  {
    id: 17, name: '17코스', fullName: '광령리 ~ 제주원도심(관덕정)', distance: 18.4, duration: 5, difficulty: '보통',
    startPoint: { lat: 33.4690, lng: 126.4160, name: '광령리' },
    endPoint:   { lat: 33.5060, lng: 126.5210, name: '제주관덕정' },
    color: '#154360', gpxFile: '/gpx/course_17.gpx',
    description: '이호테우해변과 도두봉을 거쳐 제주시내로',
    waypoints: [
      { lat: 33.4690, lng: 126.4160 }, { lat: 33.4780, lng: 126.4450 },
      { lat: 33.4880, lng: 126.4720 }, { lat: 33.4980, lng: 126.4980 },
      { lat: 33.5060, lng: 126.5210 },
    ],
  },
  {
    id: 18, name: '18코스', fullName: '관덕정 ~ 조천만세동산', distance: 18.4, duration: 5, difficulty: '쉬움',
    startPoint: { lat: 33.5060, lng: 126.5210, name: '제주관덕정' },
    endPoint:   { lat: 33.5400, lng: 126.6370, name: '조천만세동산' },
    color: '#196F3D', gpxFile: '/gpx/course_18.gpx',
    description: '제주 북부 해안도로를 따라 조천까지',
    waypoints: [
      { lat: 33.5060, lng: 126.5210 }, { lat: 33.5150, lng: 126.5480 },
      { lat: 33.5250, lng: 126.5760 }, { lat: 33.5330, lng: 126.6060 },
      { lat: 33.5400, lng: 126.6370 },
    ],
  },
  {
    id: 19, name: '19코스', fullName: '조천만세동산 ~ 김녕서포구', distance: 19.8, duration: 5, difficulty: '보통',
    startPoint: { lat: 33.5400, lng: 126.6370, name: '조천만세동산' },
    endPoint:   { lat: 33.5510, lng: 126.7620, name: '김녕서포구' },
    color: '#0B5345', gpxFile: '/gpx/course_19.gpx',
    description: '함덕해수욕장과 북동 해안을 따라',
    waypoints: [
      { lat: 33.5400, lng: 126.6370 }, { lat: 33.5460, lng: 126.6650 },
      { lat: 33.5500, lng: 126.6950 }, { lat: 33.5520, lng: 126.7280 },
      { lat: 33.5510, lng: 126.7620 },
    ],
  },
  {
    id: 20, name: '20코스', fullName: '김녕서포구 ~ 하도리', distance: 17.7, duration: 5, difficulty: '보통',
    startPoint: { lat: 33.5510, lng: 126.7620, name: '김녕서포구' },
    endPoint:   { lat: 33.5190, lng: 126.8430, name: '하도리' },
    color: '#512E5F', gpxFile: '/gpx/course_20.gpx',
    description: '만장굴과 월정리 해변을 지나는 동북 코스',
    waypoints: [
      { lat: 33.5510, lng: 126.7620 }, { lat: 33.5480, lng: 126.7860 },
      { lat: 33.5420, lng: 126.8100 }, { lat: 33.5320, lng: 126.8280 },
      { lat: 33.5190, lng: 126.8430 },
    ],
  },
  {
    id: 21, name: '21코스', fullName: '하도리 ~ 종달리', distance: 10.6, duration: 3, difficulty: '쉬움',
    startPoint: { lat: 33.5190, lng: 126.8430, name: '하도리' },
    endPoint:   { lat: 33.4960, lng: 126.9160, name: '종달리' },
    color: '#4A235A', gpxFile: '/gpx/course_21.gpx',
    description: '지미봉과 종달리 염전을 거쳐 완주하는 마지막 코스',
    waypoints: [
      { lat: 33.5190, lng: 126.8430 }, { lat: 33.5120, lng: 126.8660 },
      { lat: 33.5040, lng: 126.8880 }, { lat: 33.4980, lng: 126.9040 },
      { lat: 33.4960, lng: 126.9160 },
    ],
  },
];

export const TOTAL_COURSES = OLLE_COURSES.filter(c => !c.isAlt).length;
export const TOTAL_DISTANCE = OLLE_COURSES.filter(c => !c.isAlt).reduce((s, c) => s + c.distance, 0);

export function getCourseById(id: number): OlleCourse | undefined {
  return OLLE_COURSES.find(c => c.id === id);
}
