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

// 코스 데이터 출처: jejuolle.org, visitjeju.net 코스 상세 페이지 및 다수 답사 후기 교차 확인 (2026-08 기준)
// 주의: waypoints는 실제 GPX 트랙이 아니라 시작~종점을 잇는 근사 직선 보간입니다.
// 정확한 트랙이 필요하면 올레패스 앱(ollepass.org) 또는 공공데이터포털의
// "제주특별자치도_올레코스현황" 파일을 내려받아 교체하세요.
export const OLLE_COURSES: OlleCourse[] = [
  {
    id: 1, name: '1코스', fullName: '시흥초등학교 ~ 광치기해변', distance: 15.1, duration: 5, difficulty: '보통',
    startPoint: { lat: 33.4629, lng: 126.9206, name: '시흥초등학교' },
    endPoint:   { lat: 33.4460, lng: 126.9270, name: '광치기해변' },
    color: '#E74C3C', gpxFile: '/gpx/course_01.gpx',
    description: '말미오름·알오름을 넘고 성산일출봉을 배경으로 걷는 시작 코스',
    waypoints: [
      { lat: 33.4629, lng: 126.9206 }, { lat: 33.4590, lng: 126.9255 },
      { lat: 33.4540, lng: 126.9280 }, { lat: 33.4500, lng: 126.9300 },
      { lat: 33.4480, lng: 126.9285 }, { lat: 33.4460, lng: 126.9270 },
    ],
  },
  {
    id: 1.1, name: '1-1코스', fullName: '우도 일주 (하우목동항 ~ 천진항)', distance: 11.5, duration: 4, difficulty: '쉬움',
    startPoint: { lat: 33.5063, lng: 126.9508, name: '우도 하우목동항' },
    endPoint:   { lat: 33.5069, lng: 126.9524, name: '우도 천진항' },
    color: '#F1948A', gpxFile: '/gpx/course_01_1.gpx', isAlt: true,
    description: '성산항에서 배로 건너 도는 우도 섬 일주 코스',
    waypoints: [
      { lat: 33.5063, lng: 126.9508 }, { lat: 33.5140, lng: 126.9560 },
      { lat: 33.5170, lng: 126.9520 }, { lat: 33.5100, lng: 126.9480 },
      { lat: 33.5069, lng: 126.9524 },
    ],
  },
  {
    id: 2, name: '2코스', fullName: '광치기해변 ~ 온평포구', distance: 15.2, duration: 5, difficulty: '보통',
    startPoint: { lat: 33.4460, lng: 126.9270, name: '광치기해변' },
    endPoint:   { lat: 33.4188, lng: 126.8937, name: '온평포구' },
    color: '#E67E22', gpxFile: '/gpx/course_02.gpx',
    description: '섭지코지와 신양해수욕장을 지나는 평탄한 해안 코스',
    waypoints: [
      { lat: 33.4460, lng: 126.9270 }, { lat: 33.4390, lng: 126.9200 },
      { lat: 33.4300, lng: 126.9120 }, { lat: 33.4240, lng: 126.9020 },
      { lat: 33.4200, lng: 126.8970 }, { lat: 33.4188, lng: 126.8937 },
    ],
  },
  {
    id: 3, name: '3코스', fullName: '온평포구 ~ 표선해수욕장', distance: 20.9, duration: 6, difficulty: '어려움',
    startPoint: { lat: 33.4188, lng: 126.8937, name: '온평포구' },
    endPoint:   { lat: 33.3255, lng: 126.8340, name: '표선해수욕장' },
    color: '#F39C12', gpxFile: '/gpx/course_03.gpx',
    description: '신천목장과 통오름·독자봉을 지나는 최장거리 코스',
    waypoints: [
      { lat: 33.4188, lng: 126.8937 }, { lat: 33.4020, lng: 126.8800 },
      { lat: 33.3800, lng: 126.8650 }, { lat: 33.3550, lng: 126.8500 },
      { lat: 33.3350, lng: 126.8400 }, { lat: 33.3255, lng: 126.8340 },
    ],
  },
  {
    id: 4, name: '4코스', fullName: '표선해수욕장 ~ 남원포구', distance: 19.0, duration: 5, difficulty: '보통',
    startPoint: { lat: 33.3255, lng: 126.8340, name: '표선해수욕장' },
    endPoint:   { lat: 33.2795, lng: 126.7168, name: '남원포구' },
    color: '#27AE60', gpxFile: '/gpx/course_04.gpx',
    description: '큰엉 해안 절경과 남원 바닷가를 잇는 코스',
    waypoints: [
      { lat: 33.3255, lng: 126.8340 }, { lat: 33.3100, lng: 126.8000 },
      { lat: 33.2950, lng: 126.7700 }, { lat: 33.2850, lng: 126.7400 },
      { lat: 33.2795, lng: 126.7168 },
    ],
  },
  {
    id: 5, name: '5코스', fullName: '남원포구 ~ 쇠소깍', distance: 13.0, duration: 4, difficulty: '보통',
    startPoint: { lat: 33.2795, lng: 126.7168, name: '남원포구' },
    endPoint:   { lat: 33.2472, lng: 126.6260, name: '쇠소깍' },
    color: '#2ECC71', gpxFile: '/gpx/course_05.gpx',
    description: '제주 남부 해안을 따라 쇠소깍 에메랄드 물색까지',
    waypoints: [
      { lat: 33.2795, lng: 126.7168 }, { lat: 33.2700, lng: 126.6950 },
      { lat: 33.2580, lng: 126.6780 }, { lat: 33.2500, lng: 126.6480 },
      { lat: 33.2472, lng: 126.6260 },
    ],
  },
  {
    id: 6, name: '6코스', fullName: '쇠소깍 ~ 서귀포올레여행자센터', distance: 11.0, duration: 3, difficulty: '쉬움',
    startPoint: { lat: 33.2472, lng: 126.6260, name: '쇠소깍' },
    endPoint:   { lat: 33.2515, lng: 126.5622, name: '서귀포올레여행자센터' },
    color: '#16A085', gpxFile: '/gpx/course_06.gpx',
    description: '외돌개와 서귀포 매일올레시장까지',
    waypoints: [
      { lat: 33.2472, lng: 126.6260 }, { lat: 33.2500, lng: 126.6050 },
      { lat: 33.2510, lng: 126.5850 }, { lat: 33.2515, lng: 126.5622 },
    ],
  },
  {
    id: 7.1, name: '7-1코스', fullName: '제주월드컵경기장 ~ 서귀포올레여행자센터', distance: 15.0, duration: 5, difficulty: '쉬움',
    startPoint: { lat: 33.2459, lng: 126.4763, name: '제주월드컵경기장' },
    endPoint:   { lat: 33.2515, lng: 126.5622, name: '서귀포올레여행자센터' },
    color: '#5DADE2', gpxFile: '/gpx/course_07_1.gpx', isAlt: true,
    description: '엉또폭포·강정천을 지나는 서귀포 중산간 지선',
    waypoints: [
      { lat: 33.2459, lng: 126.4763 }, { lat: 33.2500, lng: 126.5000 },
      { lat: 33.2530, lng: 126.5300 }, { lat: 33.2515, lng: 126.5622 },
    ],
  },
  {
    id: 7, name: '7코스', fullName: '서귀포올레여행자센터 ~ 월평아왜낭목', distance: 17.7, duration: 5, difficulty: '보통',
    startPoint: { lat: 33.2515, lng: 126.5622, name: '서귀포올레여행자센터' },
    endPoint:   { lat: 33.2453, lng: 126.5117, name: '월평아왜낭목' },
    color: '#2980B9', gpxFile: '/gpx/course_07.gpx',
    description: '천지연폭포와 외돌개를 지나 서귀포 서쪽으로',
    waypoints: [
      { lat: 33.2515, lng: 126.5622 }, { lat: 33.2490, lng: 126.5450 },
      { lat: 33.2470, lng: 126.5280 }, { lat: 33.2453, lng: 126.5117 },
    ],
  },
  {
    id: 8, name: '8코스', fullName: '월평아왜낭목 ~ 대평포구', distance: 19.2, duration: 6, difficulty: '어려움',
    startPoint: { lat: 33.2453, lng: 126.5117, name: '월평아왜낭목' },
    endPoint:   { lat: 33.2277, lng: 126.4283, name: '대평포구' },
    color: '#8E44AD', gpxFile: '/gpx/course_08.gpx',
    description: '박수기정과 군산오름을 넘는 코스 중 가장 도전적인 구간',
    waypoints: [
      { lat: 33.2453, lng: 126.5117 }, { lat: 33.2400, lng: 126.4900 },
      { lat: 33.2340, lng: 126.4650 }, { lat: 33.2300, lng: 126.4450 },
      { lat: 33.2277, lng: 126.4283 },
    ],
  },
  {
    id: 9, name: '9코스', fullName: '대평포구 ~ 화순금모래해변', distance: 11.9, duration: 4, difficulty: '보통',
    startPoint: { lat: 33.2277, lng: 126.4283, name: '대평포구' },
    endPoint:   { lat: 33.2334, lng: 126.3592, name: '화순금모래해변' },
    color: '#6C3483', gpxFile: '/gpx/course_09.gpx',
    description: '월라봉과 안덕계곡을 지나 산방산을 바라보며 걷는 해안',
    waypoints: [
      { lat: 33.2277, lng: 126.4283 }, { lat: 33.2300, lng: 126.4050 },
      { lat: 33.2320, lng: 126.3800 }, { lat: 33.2334, lng: 126.3592 },
    ],
  },
  {
    id: 10, name: '10코스', fullName: '화순금모래해변 ~ 하모체육공원(모슬포)', distance: 15.6, duration: 5, difficulty: '보통',
    startPoint: { lat: 33.2334, lng: 126.3592, name: '화순금모래해변' },
    endPoint:   { lat: 33.2136, lng: 126.2513, name: '하모체육공원' },
    color: '#C0392B', gpxFile: '/gpx/course_10.gpx',
    description: '사계해안도로·산방연대·송악산을 지나 마라도·가파도를 조망',
    waypoints: [
      { lat: 33.2334, lng: 126.3592 }, { lat: 33.2280, lng: 126.3300 },
      { lat: 33.2220, lng: 126.2950 }, { lat: 33.2170, lng: 126.2700 },
      { lat: 33.2136, lng: 126.2513 },
    ],
  },
  {
    id: 10.1, name: '10-1코스', fullName: '가파도 일주 (상동포구 ~ 하동포구)', distance: 4.3, duration: 2, difficulty: '쉬움',
    startPoint: { lat: 33.1738, lng: 126.2685, name: '가파도 상동포구' },
    endPoint:   { lat: 33.1697, lng: 126.2707, name: '가파도 하동포구' },
    color: '#F5B7B1', gpxFile: '/gpx/course_10_1.gpx', isAlt: true,
    description: '모슬포 운진항에서 배로 건너는 국내 유인도 최저점 섬, 청보리밭 명소',
    waypoints: [
      { lat: 33.1738, lng: 126.2685 }, { lat: 33.1770, lng: 126.2650 },
      { lat: 33.1730, lng: 126.2620 }, { lat: 33.1697, lng: 126.2707 },
    ],
  },
  {
    id: 11, name: '11코스', fullName: '하모체육공원 ~ 무릉생태학교', distance: 17.8, duration: 6, difficulty: '보통',
    startPoint: { lat: 33.2136, lng: 126.2513, name: '하모체육공원' },
    endPoint:   { lat: 33.2586, lng: 126.1913, name: '무릉생태학교' },
    color: '#E74C3C', gpxFile: '/gpx/course_11.gpx',
    description: '삶과 죽음이 공존하는 길, 셋알오름·모슬봉을 지나 무릉리까지',
    waypoints: [
      { lat: 33.2136, lng: 126.2513 }, { lat: 33.2250, lng: 126.2350 },
      { lat: 33.2400, lng: 126.2150 }, { lat: 33.2510, lng: 126.2000 },
      { lat: 33.2586, lng: 126.1913 },
    ],
  },
  {
    id: 12, name: '12코스', fullName: '무릉생태학교 ~ 용수포구(절부암)', distance: 17.1, duration: 6, difficulty: '보통',
    startPoint: { lat: 33.2586, lng: 126.1913, name: '무릉생태학교' },
    endPoint:   { lat: 33.2949, lng: 126.1656, name: '용수포구' },
    color: '#D35400', gpxFile: '/gpx/course_12.gpx',
    description: '신도생태연못·수월봉·당산봉, 3개의 오르막을 지나는 서부 해안',
    waypoints: [
      { lat: 33.2586, lng: 126.1913 }, { lat: 33.2720, lng: 126.1810 },
      { lat: 33.2850, lng: 126.1720 }, { lat: 33.2949, lng: 126.1656 },
    ],
  },
  {
    id: 13, name: '13코스', fullName: '용수포구 ~ 저지예술정보화마을', distance: 16.2, duration: 5, difficulty: '보통',
    startPoint: { lat: 33.2949, lng: 126.1656, name: '용수포구' },
    endPoint:   { lat: 33.3245, lng: 126.2645, name: '저지예술정보화마을' },
    color: '#F39C12', gpxFile: '/gpx/course_13.gpx',
    description: '해안을 떠나 내륙으로 들어가는 첫 코스, 저지오름 전망',
    waypoints: [
      { lat: 33.2949, lng: 126.1656 }, { lat: 33.3020, lng: 126.1950 },
      { lat: 33.3120, lng: 126.2280 }, { lat: 33.3245, lng: 126.2645 },
    ],
  },
  {
    id: 14.1, name: '14-1코스', fullName: '저지예술정보화마을 ~ 오설록', distance: 9.3, duration: 3, difficulty: '쉬움',
    startPoint: { lat: 33.3245, lng: 126.2645, name: '저지예술정보화마을' },
    endPoint:   { lat: 33.3057, lng: 126.2892, name: '오설록' },
    color: '#7DCEA0', gpxFile: '/gpx/course_14_1.gpx', isAlt: true,
    description: '강정동산·저지곶자왈·문도지오름을 지나 오설록 녹차밭까지',
    waypoints: [
      { lat: 33.3245, lng: 126.2645 }, { lat: 33.3180, lng: 126.2750 },
      { lat: 33.3110, lng: 126.2830 }, { lat: 33.3057, lng: 126.2892 },
    ],
  },
  {
    id: 14, name: '14코스', fullName: '저지예술정보화마을 ~ 한림항', distance: 19.0, duration: 6, difficulty: '보통',
    startPoint: { lat: 33.3245, lng: 126.2645, name: '저지예술정보화마을' },
    endPoint:   { lat: 33.4130, lng: 126.2690, name: '한림항' },
    color: '#1E8449', gpxFile: '/gpx/course_14.gpx',
    description: '월령리 선인장마을과 협재해수욕장을 지나는 아름다운 코스',
    waypoints: [
      { lat: 33.3245, lng: 126.2645 }, { lat: 33.3550, lng: 126.2650 },
      { lat: 33.3850, lng: 126.2670 }, { lat: 33.4130, lng: 126.2690 },
    ],
  },
  {
    id: 15, name: '15코스', fullName: '한림항 ~ 고내포구', distance: 16.5, duration: 6, difficulty: '보통',
    startPoint: { lat: 33.4130, lng: 126.2690, name: '한림항' },
    endPoint:   { lat: 33.4638, lng: 126.3520, name: '고내포구' },
    color: '#2874A6', gpxFile: '/gpx/course_15.gpx',
    description: '수원농로·영생이물통·납읍숲길·고내봉을 지나는 A코스',
    waypoints: [
      { lat: 33.4130, lng: 126.2690 }, { lat: 33.4250, lng: 126.2870 },
      { lat: 33.4400, lng: 126.3150 }, { lat: 33.4530, lng: 126.3350 },
      { lat: 33.4638, lng: 126.3520 },
    ],
  },
  {
    id: 16, name: '16코스', fullName: '고내포구 ~ 광령1리사무소', distance: 15.5, duration: 5, difficulty: '보통',
    startPoint: { lat: 33.4638, lng: 126.3520, name: '고내포구' },
    endPoint:   { lat: 33.4701, lng: 126.4174, name: '광령1리사무소' },
    color: '#1A5276', gpxFile: '/gpx/course_16.gpx',
    description: '애월 해안도로를 따라 걷는 비교적 평탄한 코스',
    waypoints: [
      { lat: 33.4638, lng: 126.3520 }, { lat: 33.4660, lng: 126.3720 },
      { lat: 33.4680, lng: 126.3950 }, { lat: 33.4701, lng: 126.4174 },
    ],
  },
  {
    id: 17, name: '17코스', fullName: '광령1리사무소 ~ 제주원도심(산지천마당)', distance: 17.9, duration: 6, difficulty: '보통',
    startPoint: { lat: 33.4701, lng: 126.4174, name: '광령1리사무소' },
    endPoint:   { lat: 33.5140, lng: 126.5290, name: '산지천마당' },
    color: '#154360', gpxFile: '/gpx/course_17.gpx',
    description: '이호테우해변과 도두봉을 거쳐 제주 원도심으로',
    waypoints: [
      { lat: 33.4701, lng: 126.4174 }, { lat: 33.4800, lng: 126.4480 },
      { lat: 33.4920, lng: 126.4800 }, { lat: 33.5040, lng: 126.5080 },
      { lat: 33.5140, lng: 126.5290 },
    ],
  },
  {
    id: 18, name: '18코스', fullName: '제주원도심(산지천마당) ~ 조천만세동산', distance: 19.7, duration: 6, difficulty: '보통',
    startPoint: { lat: 33.5140, lng: 126.5290, name: '산지천마당' },
    endPoint:   { lat: 33.5400, lng: 126.6370, name: '조천만세동산' },
    color: '#196F3D', gpxFile: '/gpx/course_18.gpx',
    description: '제주 북부 해안도로와 화북포구를 따라 조천까지',
    waypoints: [
      { lat: 33.5140, lng: 126.5290 }, { lat: 33.5220, lng: 126.5620 },
      { lat: 33.5300, lng: 126.5980 }, { lat: 33.5360, lng: 126.6180 },
      { lat: 33.5400, lng: 126.6370 },
    ],
  },
  {
    id: 18.1, name: '18-1코스', fullName: '추자도 (추자항 ~ 추자교)', distance: 18.2, duration: 7, difficulty: '어려움',
    startPoint: { lat: 33.9636, lng: 126.3007, name: '추자항(대서리)' },
    endPoint:   { lat: 33.9585, lng: 126.3130, name: '추자교' },
    color: '#5499C7', gpxFile: '/gpx/course_18_1.gpx', isAlt: true,
    description: '제주항에서 배로 1시간 남짓, 상추자도를 오르내리는 등대·봉우리 코스',
    waypoints: [
      { lat: 33.9636, lng: 126.3007 }, { lat: 33.9700, lng: 126.3080 },
      { lat: 33.9660, lng: 126.3160 }, { lat: 33.9585, lng: 126.3130 },
    ],
  },
  {
    id: 18.2, name: '18-2코스', fullName: '추자도 (추자교 ~ 신양항)', distance: 10.0, duration: 4, difficulty: '보통',
    startPoint: { lat: 33.9585, lng: 126.3130, name: '추자교' },
    endPoint:   { lat: 33.9448, lng: 126.3013, name: '신양항' },
    color: '#2E86C1', gpxFile: '/gpx/course_18_2.gpx', isAlt: true,
    description: '하추자도를 도는 코스, 신양항에서 제주항행 배편 이용',
    waypoints: [
      { lat: 33.9585, lng: 126.3130 }, { lat: 33.9520, lng: 126.3090 },
      { lat: 33.9470, lng: 126.3040 }, { lat: 33.9448, lng: 126.3013 },
    ],
  },
  {
    id: 19, name: '19코스', fullName: '조천만세동산 ~ 김녕서포구', distance: 19.2, duration: 6, difficulty: '보통',
    startPoint: { lat: 33.5400, lng: 126.6370, name: '조천만세동산' },
    endPoint:   { lat: 33.5510, lng: 126.7620, name: '김녕서포구' },
    color: '#0B5345', gpxFile: '/gpx/course_19.gpx',
    description: '함덕해수욕장·서우봉과 북동 해안을 따라',
    waypoints: [
      { lat: 33.5400, lng: 126.6370 }, { lat: 33.5460, lng: 126.6650 },
      { lat: 33.5500, lng: 126.6950 }, { lat: 33.5520, lng: 126.7280 },
      { lat: 33.5510, lng: 126.7620 },
    ],
  },
  {
    id: 20, name: '20코스', fullName: '김녕서포구 ~ 제주해녀박물관(하도)', distance: 17.4, duration: 5, difficulty: '보통',
    startPoint: { lat: 33.5510, lng: 126.7620, name: '김녕서포구' },
    endPoint:   { lat: 33.5254, lng: 126.8567, name: '제주해녀박물관' },
    color: '#512E5F', gpxFile: '/gpx/course_20.gpx',
    description: '만장굴과 월정리 해변을 지나는 동북 코스',
    waypoints: [
      { lat: 33.5510, lng: 126.7620 }, { lat: 33.5480, lng: 126.7900 },
      { lat: 33.5400, lng: 126.8200 }, { lat: 33.5300, lng: 126.8420 },
      { lat: 33.5254, lng: 126.8567 },
    ],
  },
  {
    id: 21, name: '21코스', fullName: '제주해녀박물관(하도) ~ 종달바당', distance: 11.1, duration: 4, difficulty: '쉬움',
    startPoint: { lat: 33.5254, lng: 126.8567, name: '제주해녀박물관' },
    endPoint:   { lat: 33.4972, lng: 126.9181, name: '종달바당' },
    color: '#4A235A', gpxFile: '/gpx/course_21.gpx',
    description: '지미봉과 종달리 소금밭을 거쳐 완주하는 마지막 코스',
    waypoints: [
      { lat: 33.5254, lng: 126.8567 }, { lat: 33.5120, lng: 126.8790 },
      { lat: 33.5030, lng: 126.8990 }, { lat: 33.4972, lng: 126.9181 },
    ],
  },
];

export const TOTAL_COURSES = OLLE_COURSES.filter(c => !c.isAlt).length;
export const TOTAL_DISTANCE = OLLE_COURSES.filter(c => !c.isAlt).reduce((s, c) => s + c.distance, 0);

export function getCourseById(id: number): OlleCourse | undefined {
  return OLLE_COURSES.find(c => c.id === id);
}
