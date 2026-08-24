# Issue #12 Compare 실제 데이터 연동 검증

- 검증일: 2026-08-24
- 브랜치: `data/12-real-compare-data`
- 환경: Python 정적 HTTP 서버, `http://127.0.0.1:8000/`
- 데이터: `app/data/manifest.json`의 `2026.08.24-openfootball.1`

## 이번 변경 범위

```text
openfootball/england 2026/27 원본
→ raw snapshot과 SHA-256 저장
→ canonical Team ID 매핑
→ 경기 결과 집계와 검증
→ Team Compare
→ Home EPL 순위
→ GitHub Actions 정기 갱신 PR
```

## 구현 및 검증 결과

| 항목 | 상태 | 증거 |
| --- | --- | --- |
| 데이터 출처와 라이선스 | 통과 | openfootball/england, Public Domain |
| 원본 추적 | 통과 | URL, 수집 시각, SHA-256 snapshot 저장 |
| EPL Team ID 매핑 | 통과 | 원본 20팀과 canonical 20팀이 정확히 일치 |
| 경기 집계 | 통과 | 6경기, 팀별 경기 수·승무패·득실·승점 계산 |
| Team Compare | 구현·수동 확인 | 실제 결과 지표와 원본 링크 표시 |
| Home EPL 순위 | 구현·수동 확인 | 승점→득실차→득점 정렬, 20팀 표시 |
| HTTP 데이터 요청 | 통과 | 앱 JS와 JSON 5종 HTTP 200 서버 로그 확인 |
| 데이터 계약 | 통과 | `python3 scripts/validate_data.py` |
| 자동 갱신 | 구현 | 매일 2회 원본 SHA 확인, 변경 시 검증 PR 생성 |
| JavaScript 자동 브라우저 검증 | 미검증 | 현재 환경에 `agent-browser` 실행 파일이 없음 |
| Player Compare 실제 통계 | 미완료 | 사용 가능한 무료 검증 원본 미확정 |
| Manager Compare 실제 통계 | 미완료 | 임명·전술 지표 원본 미확정 |

## 순위 계산

Home 순위는 현재 공개 원본으로 계산할 수 있는 다음 값을 사용한다.

1. 승점 내림차순
2. 득실차 내림차순
3. 득점 내림차순
4. 위 값이 모두 같으면 안정적인 화면 출력을 위해 영문 팀명순

시즌 초 경기하지 않은 팀은 0경기·0승점으로 표시한다. 이 순위는 원본에
존재하는 현재 완료 경기만 반영하며 실시간 API 응답이 아니라 마지막 동기화
snapshot 기준이다.

## 자동 갱신 안전장치

- 원본 SHA-256이 같으면 파일과 PR을 변경하지 않는다.
- 원본이 바뀌면 Team Compare JSON을 다시 생성한다.
- 생성 후 데이터 계약과 산술 무결성 검증을 실행한다.
- 검증된 변경은 자동 병합하지 않고 별도 PR로 올린다.
- GitHub 저장소에서 Actions의 PR 생성 권한을 활성화해야 한다.

## 남은 Issue #12 범위

이번 변경으로 Team Compare와 Home 순위의 실제 데이터 연동은 완료했다.
Player Compare와 Manager Compare의 기존 0~100 값은 여전히 프로토타입이며,
공개 포트폴리오에서 실제 통계로 오인하지 않도록 후속 변경에서 제거하거나
사용 허용이 확인된 공급자 데이터로 교체해야 한다. 따라서 이 PR만으로 Issue
#12 전체를 닫지 않는다.

## 재현 명령

```bash
python3 -m http.server 8000 --directory app
python3 scripts/sync_openfootball.py
python3 scripts/validate_data.py
```
