# Issue #15 Release and Portfolio Verification

## 공개 MVP

- 배포 방식: GitHub Pages (`app/`을 `gh-pages` 브랜치 루트로 정적 배포)
- 배포 주소: `https://parkchansik034.github.io/TacticVision-EPL2627/`
- 로컬 주소: `http://127.0.0.1:8000/` (`app/`에서 서버 실행)
- 배포 전 검증: `python3 scripts/validate_data.py`

## 지원 환경

| 구분 | 지원 기준 |
| --- | --- |
| 데스크톱 | Safari·Chrome·Edge 최신 2개 메이저 버전, 1280×720 이상 권장 |
| 태블릿 | Safari·Chrome 최신 버전, 768px 이상 |
| 모바일 | Safari·Chrome 최신 버전, 최소 360×740 |
| 입력 | 마우스·터치, 주요 버튼과 select의 키보드 접근 |

외부 Tailwind CDN, Font Awesome과 Google Fonts를 사용하므로 네트워크가 차단된
환경에서는 스타일·아이콘·폰트가 완전하게 표시되지 않을 수 있다.

## 핵심 흐름

### 흐름 A — 탐색과 비교

1. Home 검색에서 팀·선수·감독을 검색한다.
2. 검색 결과에서 상세 화면을 연다.
3. 관련 비교 화면으로 이동한다.
4. 비교 대상을 선택·해제하고 실제 계약 데이터가 일치하는지 확인한다.

### 흐름 B — 경기와 전술

1. Home의 다음 경기에서 Match Hub를 연다.
2. 일정·순위·최근 결과를 확인한다.
3. Match Lineups 또는 Tactical Board로 이동한다.
4. 팀과 포메이션을 선택하고 선발 선수를 이동한다.
5. 선발 선수를 선택한 뒤 벤치 선수를 투입하고 초기화한다.

## 데이터와 한계

- 일정: openfootball Public Domain 2026/27 일정 snapshot
- 현재 순위·결과: TheSportsDB 완료 경기 응답
- 첫 경기 선발: API-Football fixture lineup, 18팀
- Chelsea·Fulham: 첫 경기 전 TacticVision 예상 XI
- 이전 시즌 비교: openfootball Public Domain 2025/26 380경기
- 선수·스쿼드: API-Football snapshot과 나무위키 한글 이름 매핑
- 감독 기본 사실: Wikidata CC0
- 저장된 외부 데이터의 공개·재배포 조건은 각 공급자 약관을 재확인해야 하며,
  본 MVP는 포트폴리오 시연 목적이다.
- 사용자 계정, 저장·공유, 유료 기능, 실제 AI 예측은 MVP 범위 밖이다.

## 3분 시연 순서

| 시간 | 화면 | 설명 |
| --- | --- | --- |
| 0:00–0:25 | Home | 실제 다음 일정, 완료 경기와 현재 순위를 소개한다. |
| 0:25–0:55 | 검색·상세 | 한글 선수 검색과 팀·선수·감독 ID 연결을 보여준다. |
| 0:55–1:30 | Team Compare | 현재 시즌과 이전 시즌의 승·무·패·득실·승점을 비교한다. |
| 1:30–2:00 | Match Hub | 선택 경기의 일정·순위·최근 결과와 라인업 상태를 확인한다. |
| 2:00–2:45 | Tactical Board | 첫 경기 XI, 포메이션, 드래그, 역할과 선수 교체를 시연한다. |
| 2:45–3:00 | 데이터 문서 | 출처·한계·자동 검증을 설명하며 마무리한다. |

## 자동 검증

- [x] JSON 구문·필수 필드·ID·참조 무결성
- [x] 19개 계약 파일, 20팀, 479명 canonical 선수
- [x] 18팀 공식 첫 경기 XI와 2팀 예상 XI 구분
- [x] JavaScript 구문 검사
- [x] 로컬 앱과 핵심 JSON HTTP 200
- [x] 검증 후 `git subtree push --prefix app origin gh-pages` 배포 절차 문서화

## 실제 브라우저 검증

- [x] Safari 26.5 데스크톱에서 검색 → 아스널 상세 → Match Hub → Tactical Board 흐름
- [x] Safari에서 공식 첫 경기 XI 11명, 벤치 9명과 실제 OUT/IN 교체
- [x] Safari에서 Tactical Board 버튼 포커스 후 Enter 이동
- [x] Chrome 390×844 viewport에서 Home, 실제 일정·순위 로드와 세로 경기 카드
- [x] 로컬·공개 Pages 핵심 자산과 JSON 요청 21개 모두 HTTP 200
- [x] 브라우저 성능 리소스 목록에서 동일 출처 4xx 요청 없음
- [x] GitHub Pages 빌드 및 공식 MVP HTML·첫 경기 lineup JSON 공개 확인
- [x] Safari 데스크톱 전술보드와 Chrome 390×844 Home 대표 화면 캡처

### QA 중 발견·수정한 결함

- JSON 로딩 전에 생성된 빈 Tactical Board 스쿼드 캐시가 로딩 후에도 재사용되던
  문제를 수정했다. 선발 11명이 있는 캐시만 재사용한다.
- 390px Home 경기 카드에서 날짜 배지가 잘리던 문제를 수정했다. 작은 화면에서는
  경기 제목과 날짜를 세로 배치한다.
- Chrome headless의 GCM 등록·macOS 프로세스 정책 경고는 앱 JavaScript 또는
  네트워크 요청 오류가 아니며, 앱의 `Uncaught`, `Failed to load`, 404는 없었다.
