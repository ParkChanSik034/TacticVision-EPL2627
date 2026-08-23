# Issue #11 Home·검색·상세 흐름 검증

- 검증일: 2026-08-24
- 브랜치: `feature/11-home-search-details`
- 환경: Python 정적 HTTP 서버, `http://127.0.0.1:8000/`
- 데이터: `app/data/manifest.json`의 `2026.08.24-prototype.2`

## 사용자 흐름

```text
Home
→ 계약 JSON 4종 로드
→ 팀·선수·감독 통합 검색
→ canonical ID 선택
→ 팀·선수·감독 상세
→ 관련 팀·선수·Compare·Tactical Board 이동
```

## 구현 결과

| 경계 | 상태 | 증거 |
| --- | --- | --- |
| Home 응답 | 통과 | `/` HTTP 200 |
| JavaScript 응답 | 통과 | `/assets/js/app.js` HTTP 200, JavaScriptCore 문법 파싱 통과 |
| Entity 데이터 요청 | 통과 | teams, players, managers, squads HTTP 200 |
| 데이터 계약 | 통과 | `python3 scripts/validate_data.py` 통과 |
| 통합 검색 데이터 | 통과 | 검색 목록을 계약 JSON의 Team·Player·Manager ID로 구성 |
| 검색 결과 없음 | 구현 | 결과가 없을 때 별도 status 문구 표시 |
| 로딩·실패 | 구현 | 로딩 상태, HTTP/JSON 실패 안내와 다시 시도 동작 추가 |
| 잘못된 ID | 구현 | 상세 대신 Home과 오류 안내로 복귀 |
| 새로고침 상세 복원 | 구현 | `#team`, `#player`, `#manager`를 데이터 로드 후 복원 |
| 키보드 구조 | 통과 | combobox/listbox/option, 방향키, Enter, Escape와 ARIA 연결 확인 |
| 브라우저 클릭·콘솔 | 미검증 | 현재 환경에 `agent-browser` 실행 파일이 없음 |
| 모바일 시각 | 미검증 | 자동 viewport·스크린샷 증거를 확보하지 못함 |

## 데이터 일치

- Team 상세의 이름, 한국어 이름, shortName, 기본 포메이션과 상태는
  `teams.json`의 동일 Team ID를 사용한다.
- Manager 상세의 이름, 국적, 선호 포메이션, 스타일과 피드백은
  `managers.json`의 Team ID 귀속 레코드를 사용한다.
- Player 상세의 이름, 소속 Team ID, 번호, 포지션, 나이 snapshot, 키, 주발과
  국적은 `players.json`의 canonical Player ID를 사용한다.
- 계약에 없는 경기장, 창단연도, 분석 지표, 경력과 성과는 기존 하드코딩 값을
  섞지 않고 `미확정` 또는 빈 데이터 상태로 표시한다.
- Compare 데이터는 여전히 별도 Prototype Dataset이며 Issue #12 범위다.

## 접근성 구조

- 검색 입력은 `role="combobox"`, 결과는 `role="listbox"`를 사용한다.
- 결과 항목은 `role="option"`과 `aria-selected` 상태를 가진다.
- `ArrowDown`과 `ArrowUp`으로 결과를 이동하고 `Enter`로 선택한다.
- `Escape`로 결과 목록을 닫는다.
- 검색 로딩·빈 결과·실패 메시지는 status 또는 alert 의미를 가진다.

실제 스크린리더, 브라우저 키보드 포커스와 모바일 viewport는 자동 브라우저
환경이 준비된 뒤 다시 확인해야 한다. 구조 검사만으로 최종 접근성 통과를
판정하지 않는다.

## 재현 명령

```bash
python3 -m http.server 8000 --directory app
python3 scripts/validate_data.py
jq empty app/data/*.json
/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc \
  -e 'new Function(read("app/assets/js/app.js")); print("app.js syntax OK")'
```

## Acceptance Criteria 상태

| 조건 | 상태 |
| --- | --- |
| Home 새로고침 | 정적·HTTP 통과, 브라우저 콘솔 미검증 |
| 입력과 데이터에 맞는 검색 | 구현, 자동 클릭 미검증 |
| 검색 결과에서 올바른 상세 ID 이동 | 구현, 자동 클릭 미검증 |
| 상세 정보와 동일 ID 데이터 일치 | 통과 |
| 빈 데이터·잘못된 ID·로드 실패 | 구현 |
| 데스크톱·모바일·키보드 | 구조 통과, 실제 브라우저·모바일 미검증 |
| 검증 증거 | 이 문서에 기록 |
| main 병합 | PR 병합 후 충족 |
