# MVP 구현 기준선 검증

- 기준 Issue: [#9 공식 실행 경로와 현재 구현 기준선 검증](https://github.com/ParkChanSik034/TacticVision-EPL2627/issues/9)
- 검증일: 2026-08-24
- 검증 브랜치: `audit/9-mvp-implementation-baseline`
- 공식 실행 진입점: `app/index.html`
- 실행 명령: `python3 -m http.server 8000 --directory app`

## 판정 기준

- **구현**: 현재 코드와 정적 검증으로 핵심 동작을 확인함
- **부분 구현**: 화면 또는 동작은 있으나 데모 데이터, 자리표시자, 잘못된 연결이 남음
- **미검증**: 현재 환경에서 브라우저 시각·콘솔·접근성 검증 증거를 확보하지 못함

이 문서는 화면 존재 여부가 아니라 현재 구현의 출발점을 기록한다. 발견된 문제는
Issue #11~#15에서 수정한 뒤 공통 Acceptance Criteria로 다시 판정한다.

## 실행 및 정적 검증 결과

| 검증 항목 | 결과 | 근거 |
| --- | --- | --- |
| 공식 진입점 | 통과 | `app/index.html`을 루트로 HTTP 서버 실행 |
| HTML·CSS·JavaScript 응답 | 통과 | `/`, `assets/css/style.css`, `assets/js/app.js` HTTP 200 |
| 앱 JSON 7종 응답 | 통과 | formations, managers, players, roles, squads, tactics, teams HTTP 200 |
| JSON 문법 | 통과 | 7개 파일 모두 `jq empty` 통과 |
| JavaScript 문법 | 통과 | JavaScriptCore `new Function()` 파싱 통과 |
| favicon | 실패 | `/favicon.ico` HTTP 404 |
| 브라우저 시각·콘솔 | 미검증 | 자동 브라우저 실행 도구가 없어 통과 증거를 만들지 못함 |

## 화면별 구현 기준선

| 영역 | 상태 | 현재 확인 내용 | 다음 Issue |
| --- | --- | --- | --- |
| Home·통합 검색 | 부분 구현 | 팀·선수·감독 검색과 상세 진입 함수 존재. 데이터는 JavaScript 내부 정의와 JSON이 혼재 | #11 |
| 팀 상세 | 부분 구현 | 20팀 디렉터리가 있으나 다수 설명과 지표가 기본값 또는 `업데이트 예정` | #11 |
| 선수 상세 | 부분 구현 | 상세 화면은 있으나 `players.json`에는 선수 1명만 존재 | #10, #11 |
| 감독 상세 | 부분 구현 | 상세 화면과 전술 적용 동작 존재. 일부 프로필은 시나리오 데이터 | #10, #11 |
| Team Compare | 부분 구현 | 비교 UI와 6팀 프로토타입 데이터 존재 | #12 |
| Player Compare | 부분 구현 | 비교 UI와 8명 프로토타입 데이터 존재 | #12 |
| Manager Compare | 부분 구현 | 비교 UI와 6명 프로토타입 데이터 존재 | #12 |
| Match Hub | 부분 구현 | 주요 진입 버튼 존재. 경기 통계·뉴스는 안내 토스트만 제공 | #13 |
| Match Lineups | 부분 구현 | 양 팀 라인업, 벤치, 포메이션 편집 코드 존재. 실제 경기 데이터 미연동 | #13 |
| Tactical Board | 부분 구현 | 전술 편집 코드가 있으나 레이아웃 HTML 오류와 잘못된 Hub 연결 발견 | #14 |
| Role Guide | 구현 | `data/roles.json`을 실제로 불러오는 유일한 데이터 경로 확인 | #10 |

## 핵심 사용자 흐름

### 흐름 A — 탐색에서 비교까지

```text
Home → 팀·선수·감독 검색 → 상세 → Compare → 결과
```

**판정: 부분 구현**

검색, 상세 화면 전환, 비교 화면과 결과 렌더링 함수는 존재한다. 그러나 비교
데이터가 각각 일부 대상만 포함한 JavaScript 내부 `Prototype Dataset`이며,
앱 JSON과 단일 데이터 계약으로 연결되지 않았다. 새로고침으로 해시 상세 주소를
직접 열 때 상태를 복원하는 초기 라우팅도 확인되지 않았다.

### 흐름 B — 경기에서 전술 보드까지

```text
Home → Match Hub → Match Lineups → Tactical Board → 배치·분석
```

**판정: 부분 구현 / 연결 결함 있음**

Match Hub와 라인업 편집 화면은 존재한다. 다만 Match Hub의 `전술 보드` 버튼은
`tactical-view`가 아니라 `match-compare-view`를 연다. Tactical Board 자체도
`class` 속성 문법 오류 때문에 의도한 그리드 레이아웃 클래스가 적용되지 않는다.

## 발견 항목

### BL-001 — Tactical Board `class` 속성 오류

- 중요도: 높음
- 위치: `app/index.html`의 `tactical-view`
- 현재 값: `class="hidden class="flex-grow ...`
- 영향: `flex-grow`, grid, 간격, 최대 너비 클래스가 class 목록이 아닌 잘못된
  HTML 속성으로 해석되어 레이아웃이 무너질 수 있다.
- 처리 대상: #14

### BL-002 — Match Hub 전술 보드 연결 오류

- 중요도: 높음
- 위치: `openHubFeature('tactical')`
- 현재 동작: `openFeaturedMatch('compare')`를 호출해 Match Compare로 이동
- 기대 동작: Tactical Board 진입 또는 라인업에서 Tactical Board로 이어지는
  명시적인 경로 제공
- 처리 대상: #13, #14

### BL-003 — 화면 데이터와 JSON 데이터의 이중 관리

- 중요도: 높음
- 근거: 실제 `fetch()`는 `data/roles.json` 한 곳뿐이며 팀·선수·감독·경기·비교
  데이터 대부분이 `app.js` 안에 하드코딩되어 있다.
- 영향: JSON을 갱신해도 화면에 반영되지 않고 데이터 불일치가 발생할 수 있다.
- 처리 대상: #10~#14

### BL-004 — 선수 JSON 기준선 부족

- 중요도: 높음
- 근거: `players.json`은 선수 1명, Player Compare 내부 데이터는 8명이다.
- 영향: 공식 선수 데이터의 범위와 참조 무결성을 판정할 수 없다.
- 처리 대상: #10, #11, #12

### BL-005 — favicon 404

- 중요도: 낮음
- 영향: 브라우저 요청에 불필요한 404가 발생한다.
- 처리 대상: #15

### BL-006 — 상세 주소 초기 복원 미구현 가능성

- 중요도: 보통
- 근거: 상세 이동 시 `pushState`와 뒤로가기 `popstate` 처리는 있으나 첫 로드에서
  `location.hash`를 해석하는 초기화 경로를 찾지 못했다.
- 상태: 브라우저 수동 재현 필요
- 처리 대상: #11

### BL-007 — 자동 브라우저 검증 증거 없음

- 중요도: 검증 공백
- 범위: 반응형 레이아웃, 실제 클릭 흐름, 콘솔 오류, 키보드 접근성
- 처리 대상: #15 또는 브라우저 자동화 환경이 준비되는 즉시 재검증

## Acceptance Criteria 기준 현재 상태

| 기준 | 현재 판정 | 사유 |
| --- | --- | --- |
| 공식 실행 경로 | 통과 | README와 실제 실행이 `app/`으로 일치 |
| 핵심 흐름 A | 부분 통과 | 기능은 있으나 프로토타입 데이터와 초기 라우팅 공백 존재 |
| 핵심 흐름 B | 실패 | Tactical Board 연결과 레이아웃 결함 존재 |
| 데이터 정확성·무결성 | 미충족 | 데이터 계약 미확정, JSON과 화면 데이터 불일치 |
| 로딩·오류·빈 상태 | 미검증 | 실제 데이터 요청 범위가 작고 브라우저 종단 증거 없음 |
| 콘솔·404 | 미충족 | favicon 404 확인, 콘솔은 미검증 |
| 문서와 실행 구조 일치 | 통과 | 공식 진입점과 레거시 경로가 구분됨 |
| PR·main 병합 | 진행 중 | 이 기준선 문서 PR 병합 후 Issue #9 완료 판정 가능 |

## 다음 실행 순서

1. 이 기준선 기록을 병합하고 Issue #9를 닫는다.
2. Issue #10에서 데이터 출처, 계약, ID와 참조 무결성을 확정한다.
3. Issue #11~#14에서 화면별 하드코딩을 계약 데이터로 교체하며 BL-001~006을
   함께 수정한다.
4. Issue #15에서 실제 브라우저 종단 흐름, 콘솔, 접근성, 반응형과 배포 환경을
   최종 검증한다.

## 재현 명령

```bash
python3 -m http.server 8000 --directory app
curl -I http://127.0.0.1:8000/
jq empty app/data/*.json
/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc \
  -e 'new Function(read("app/assets/js/app.js")); print("app.js syntax OK")'
```

