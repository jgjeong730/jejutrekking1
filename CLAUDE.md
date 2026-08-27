# Jeju Olle 437 — 프로젝트 가이드

## 개요

JG의 2026년 제주 올레길 완주 여행을 위한 개인용 트레킹 플래너 + 진행상황 트래커.
437km, 27개 공식 코스(21개 정규 + 6개 지선), 26일 일정(2026-10-24 ~ 11-18, 10/23 저녁 도착 · 11/19 10:45 귀경)을 다룬다.
배포 주소: https://jgjeong730.github.io/jejutrekking1/

## 목적

- 실제 여행에서 쓸 확정 일정·코스 정보·예산·준비물 체크리스트를 한 화면에서 확인
- 트레킹 중 코스별 완주 기록(날짜, 실제 거리/시간, 숙소, 숙박비, 동행, 메모, 사진)을 남김
- 그 기록을 링크로 공유해 가족/친구가 실시간 진행상황을 볼 수 있게 함
- "Jeju Olle" 자체를 하나의 챕터로 두고, 이후 백두대간 → 일본 알프스 → ... → JMT(존 뮤어 트레일)로 이어지는
  개인적인 다년간 트레킹 여정의 첫 기록으로 설계됨 (아래 `CURRENT_EXPEDITION` 참고)

## 기술 스택

- React 19 + TypeScript + Vite 7, Tailwind CSS
- `react-router-dom` `HashRouter` (GitHub Pages 정적 호스팅에 맞춤)
- `@react-google-maps/api` — 전 지도 렌더링 (Google Maps Javascript API, 도메인 제한 키)
- Supabase (`@supabase/supabase-js`) — 완주 기록 클라우드 동기화
- IndexedDB(직접 구현, `src/lib/photoStore.ts`) — 코스별 사진 최대 5장
- localStorage — 완주 기록 오프라인 캐시, 체크리스트 상태
- `gh-pages` 패키지로 GitHub Pages 배포

## 프로젝트 구조

```
src/
  App.tsx                    # 라우트 정의 (HashRouter)
  components/
    layout/MobileLayout.tsx  # 앱 전체를 감싸는 max-w-md 모바일 프레임 + 하단 탭바
    OlleMark.tsx              # 자체 제작 브랜드 아이콘 (공식 올레 로고 아님, 독자 디자인)
    OlleIslandMap.tsx          # 홈 화면용 SVG 일러스트 지도 (27개 코스 배지 표시)
    TrackerMap.tsx             # 트래커 페이지의 Google Maps 지도
    CourseBottomSheet.tsx      # 코스 상세/완주 기록 입력 바텀시트
  pages/
    OlleHome.tsx               # 홈 — 히어로, 일정 요약, 예산 요약
    OlleSchedule.tsx           # 완주 일정표 (26일 상세)
    OlleCourses.tsx            # 27개 코스 목록/상세
    OllePrep.tsx               # 준비사항 — 장비, 체크리스트(localStorage 저장)
    OlleInfo.tsx                # 예산/맛집/숙박/완주인증 탭
    OlleTracker.tsx             # 완주 트래커 — 지도/목록 뷰, 진행률
  data/
    olleCoursesData.ts          # 27개 코스 고정 데이터 (거리/난이도/좌표 등)
    olleWaypoints.generated.ts   # scripts/import-gpx.mjs가 생성 (현재 비어있음, 아래 참고)
    olleData.ts                  # 26일 일정, 숙소/맛집/예산/체크리스트, CURRENT_EXPEDITION
  hooks/useOlleProgress.ts        # 완주 기록 상태 — localStorage + Supabase 동기화
  lib/
    supabaseClient.ts             # Supabase 클라이언트 (.env 없으면 null, 앱은 오프라인으로 동작)
    photoStore.ts                  # IndexedDB 사진 저장
scripts/
  import-gpx.mjs                   # GPX → olleWaypoints.generated.ts 변환 파이프라인
  og-image-template.html            # 공유용 OG 이미지(1200x630) 렌더링용 템플릿
supabase/schema.sql                  # completions 테이블 스키마 + RLS 정책 (Supabase SQL Editor에서 실행)
docs/dev-journal.html                 # 이 프로젝트의 AI 협업 과정을 정리한 별도 문서 (앱 기능 아님)
public/
  gpx/                                 # 실제 GPX 파일을 넣는 곳 (현재 비어있음)
  images/og-share.png                   # 링크 공유 시 노출되는 배너 이미지
```

## 핵심 아키텍처 결정 (왜 이렇게 했는지)

- **`CURRENT_EXPEDITION`** (`olleData.ts`): 홈 히어로와 완주인증 탭의 `"{CURRENT_EXPEDITION} to JMT"` 문구를
  구동하는 상수. 지금은 `'Olle'`. 다음 여정(백두대간, 일본 알프스 등) 시작 시 이 값 하나만 바꾸면 관련 문구가
  전부 갱신됨.
- **코스 라인은 직선 근사치**: 실제 GPX 트랙을 무료로 구할 공식 소스가 없음을 확인함(공공데이터포털, OSM,
  Komoot/AllTrails 등 다 검토). `scripts/import-gpx.mjs`가 `public/gpx/course_NN.gpx` 파일을 감지해 자동으로
  실좌표로 교체하는 구조만 미리 만들어둠 — 파일이 없으면 그냥 직선 근사치로 렌더링됨.
- **Supabase는 완전 오픈 (읽기/쓰기 둘 다 anon key로)**: 로그인 화면 없이 anon key만으로 누구나 읽고 쓸 수 있음.
  개인 1인용 여행 앱이라 의도적으로 단순하게 선택한 것 — 필요해지면 Supabase Auth로 쓰기 권한만 제한 가능.
  `.env`(실제 URL/키)는 git에 커밋되지 않음; `.env.example`에 placeholder만 있음.
- **`useOlleProgress`**: 완주 기록을 localStorage(즉시 UI, 오프라인 캐시)와 Supabase(공유용 소스)에 동시에
  반영. 페이지 로드 시 Supabase 값이 로컬 값을 덮어씀 — Supabase가 최종 소스.
- **예산 계산**: 숙박비는 실제 기록이 있으면 그 값, 없으면 요일 무관 게하/캠핑 추정치. 식비는 요일별로
  자동 계산(평일 3.5만/주말 특식 5만, `olleData.ts`의 `TOTAL_MEAL_COST`). `TOTAL_BUDGET_ESTIMATE`를
  홈/일정표/예산탭이 공통으로 참조하므로 한 곳만 수정하면 전체 동기화됨 — 과거엔 페이지마다 하드코딩된
  총액이 따로 있어서 서로 어긋난 적 있었음, 재발 주의.
- **텍스트 폭**: 문단/설명 텍스트에 임의로 `max-w-`(또는 `ch` 단위) 제한을 걸지 않는다. 컨테이너 폭을
  그대로 채우는 게 기본값 — 명시적으로 여백 연출을 요청받았을 때만 예외.

## 배포 워크플로우

1. 코드 수정
2. `npm run build` — 타입 체크 + 빌드 확인
3. 브라우저로 실제 동작 확인 (스크린샷 또는 DOM 검증)
4. `git add` → `git commit` → `git push origin main`
5. `npm run deploy` (내부적으로 build 후 `gh-pages -d dist`)

OG 공유 이미지를 다시 만들 때: `scripts/` 폴더에서 로컬 정적 서버(`python -m http.server`)를 띄우고
`og-image-template.html`을 브라우저로 열어 스크린샷 → PowerShell(System.Drawing)로 크롭/리사이즈 →
`public/images/og-share.png`로 저장.

## 현재 상태 / 남은 일

- [ ] 실제 GPX 트랙 파일 미확보 (올레패스 앱에서 export 필요, 우선순위 낮음으로 보류 중)
- [x] Supabase 연동 완료, 종단 테스트 완료
- [x] 예산 현실화 완료 (2026-08-27 기준 식비/항공/패스포트 반영)
- Supabase 프로젝트는 무료 플랜 — 7일간 API 호출 없으면 자동 일시정지됨. 여행 시작(10/23) 전까지 가끔
  링크를 열어 활성 상태를 유지할 것.
