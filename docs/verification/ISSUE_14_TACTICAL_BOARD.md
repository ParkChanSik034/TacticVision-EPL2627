# Issue #14 Tactical Board Verification

## Verification

- 검증 환경: 로컬 HTTP 서버 `http://127.0.0.1:8000/app/`, Python 3.9 데이터 검증, JavaScript 구문 검증
- 사용 데이터: `first-match-lineups.json`, `squads.json`, `players.json`, `formations.json`, `roles.json`
- 수행 경로: Home → Match Hub → Tactical Board → 팀 선택 → 선수 선택 → 교체 선수 투입 → 포메이션 변경 → 기본 배치

## 구현 결과

- 첫 경기를 완료한 18팀은 API-Football fixture lineup의 공식 선발 11명, 포메이션과 grid 좌표를 사용한다.
- 아직 첫 경기를 완료하지 않은 Chelsea와 Fulham은 `tacticvision-predicted-xi`로 명확히 구분한 예상 XI를 사용한다.
- 20팀 모두 선발 11명과 최소 8명의 교체 명단을 가진다.
- 선수 선택 후 교체 명단의 선수를 투입할 수 있고 OUT 선수가 벤치로 이동한다.
- 공식 첫 경기 대형과 사용자가 선택한 수동 포메이션을 구분해 배치한다.
- 드래그 위치, 역할 선택과 기본 배치 초기화 상태는 팀·포메이션·선수 ID 조합으로 관리한다.
- 잘못된 팀 선택과 11명 미만 데이터는 안내 상태를 표시하고 앱 전체 실행을 중단하지 않는다.

## 자동 검증 결과

- `python3 scripts/validate_data.py`: 통과
  - JSON 계약 파일 19개
  - 팀 20개
  - canonical 선수 479명
  - 첫 경기 공식 XI 18팀
  - 예상 XI 2팀(Chelsea, Fulham)
- JavaScript 전체 구문 검사: 통과
- `git diff --check`: 통과
- 로컬 HTTP 응답: 앱 JavaScript와 핵심 JSON 모두 HTTP 200

## 데이터 출처와 제한

- 공식 첫 경기 XI: API-Football `fixtures/lineups`, TheSportsDB event의 API-Football fixture ID 연결
- Chelsea·Fulham: 첫 경기 전 TacticVision 예상 XI이며 실제 공식 선발이 아니다.
- 일부 첫 경기 출전 선수는 기존 canonical squad snapshot 이후 등록되어 선수 상세 페이지 연결이 제한될 수 있으나, 공식 lineup의 이름과 위치는 유지한다.

## 병합 전 수동 확인

- [ ] 데스크톱에서 20팀 선택과 교체 동작을 표본 확인한다.
- [ ] 모바일 화면에서 전술판과 가로 교체 명단이 잘리지 않는지 확인한다.
- [ ] 키보드로 팀·포메이션·선수·교체 버튼에 접근 가능한지 확인한다.
- [ ] 브라우저 콘솔 오류와 실패한 핵심 데이터 요청이 없는지 확인한다.
- [ ] PR을 `main`에 병합한다.

자동 검증 환경에는 브라우저 자동화 실행 도구가 없어 위 항목은 병합 전 수동 확인 대상으로 남긴다.
