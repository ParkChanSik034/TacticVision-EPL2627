# Issue #13 Match Hub·Match Lineups 데이터 연동 검증

- 검증일: 2026-08-24
- 브랜치: `feature/13-match-lineups-data`
- 환경: Python 정적 HTTP 서버, Chrome Headless, `http://127.0.0.1:8000/`
- 데이터: `app/data/teams.json`, `players.json`, `squads.json`

## 변경 범위

```text
20팀 canonical Team ID
→ 팀별 15명 이상 검증된 스쿼드
→ 선발·후보 Player ID 상태
→ 포메이션·교체·자유 배치
→ 공식 선발 발표 전 비노출 상태
```

## 완료 조건 검증

| 항목 | 상태 | 확인 내용 |
| --- | --- | --- |
| 경기 팀 일관성 | 통과 | Match Hub 기본 경기와 Match Lineups 기본 선택이 아스널·리버풀로 일치 |
| 팀·선수 ID | 통과 | 20팀, 선발 220개와 후보 명단이 canonical ID를 사용하며 끊어진 참조 0건 |
| 팀 선택 | 통과 | EPL 20팀을 선택할 수 있고 팀 변경 시 해당 팀 스쿼드와 기본 포메이션을 다시 구성 |
| 포메이션 변경 | 통과 | 사용자가 포메이션을 선택할 때만 기본 배치를 적용 |
| 자유 배치 | 통과 | 드래그 좌표를 상태에 저장하며 포메이션을 자동 추론하거나 사용자 배치를 덮어쓰지 않음 |
| 선수 교체 | 통과 | 선발·후보 교체 시 이름뿐 아니라 Player ID와 자연 포지션을 함께 이동 |
| 공식 선발 전 상태 | 통과 | 공식 선발이 아니면 피치 선수, 선발·후보와 평점을 기본 비노출 |
| 예상 배치 구분 | 통과 | 사용자가 명시적으로 요청할 때만 등록 스쿼드 기반 예상 배치를 열고 실제 선발이 아님을 안내 |
| Tactical Board 이동 | 통과 | Match Hub 전술 보드 버튼이 현재 홈 팀을 선택해 Tactical Board로 이동 |
| 데이터 계약 | 통과 | `python3 scripts/validate_data.py` |
| 브라우저 렌더링 | 통과 | Chrome Headless에서 20팀 선택기, 공식 선발 전 안내, 예상 배치 버튼 확인 |
| 사용자 확인 | 통과 | 팀·선수 변경, 자유 배치와 공식 선발 전 비노출 동작 확인 |

## 공식 선발과 예상 배치 정책

`squads.json`의 현재 `selectionStatus`는
`tacticvision-provisional-default-xi`이며 실제 경기 선발 데이터가 아니다. 따라서
이를 Match Lineups의 기본값으로 표시하지 않는다.

- `official-starting-lineup`: 공식 선발로 기본 표시 가능
- 그 외 상태: 기본 비노출, 발표 전 안내 표시
- 사용자가 `스쿼드 기반 예상 배치 보기`를 선택한 경우에만 편집 가능한 초안 표시

예상 배치는 포트폴리오의 전술 편집 흐름을 검증하기 위한 대체 상태이며 실제
출전 예측이나 공식 명단으로 해석하지 않는다.

## 재현 명령

```bash
python3 -m http.server 8000 --bind 127.0.0.1 --directory app
python3 scripts/validate_data.py
```

브라우저에서 `매치 허브 → 양 팀 라인업`으로 이동한다. 기본 상태에서 선수
토큰이 없어야 하며, 예상 배치 버튼을 선택한 뒤에만 11명과 후보 명단이
표시되어야 한다.
