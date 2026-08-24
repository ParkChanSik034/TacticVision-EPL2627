# EPL 2026/27 Data Provider Assessment

- 확인일: 2026-08-24
- 대상 Issue: [#12](https://github.com/ParkChanSik034/TacticVision-EPL2627/issues/12)
- 목적: 공개 포트폴리오에서 출처와 사용 조건을 설명할 수 있는 실제 비교 데이터 선정

## 결정

1차 External Facts 공급자로 `openfootball/england`를 선택한다.

- 2026/27 EPL 20팀, 380경기 일정과 현재 결과가 공개되어 있다.
- 저장소는 데이터·스키마·스크립트를 public domain으로 공개한다.
- 원본을 저장하고 변환 결과를 공개하는 데 명시적인 제약이 없다.
- 텍스트 원본을 날짜별 snapshot으로 보존하고 TacticVision canonical Team ID로
  변환할 수 있다.

공식 원본:

- 저장소: <https://github.com/openfootball/england>
- 2026/27 원본: <https://raw.githubusercontent.com/openfootball/england/master/2026-27/1-premierleague.txt>
- 라이선스 근거: <https://github.com/openfootball/england#license>

이 소스는 팀 일정·결과·득점자처럼 원본에 존재하는 사실만 제공한다. 패스,
슈팅, 출전시간, xG와 같은 상세 선수 통계는 생성하거나 추정하지 않는다.

## 후보 비교

| 후보 | 현재 EPL | 선수·감독 통계 | 비용·제한 | 판정 |
| --- | --- | --- | --- | --- |
| openfootball/england | 2026/27 일정·결과 확인 | 득점자 텍스트, 상세 지표 제한 | Public domain | 1차 채택 |
| football-data.org | PL 팀·경기·순위·scorers API | 무료 tier는 상세 선수 데이터 제한 | 무료 10회/분, API token 필요 | 보조 후보 |
| API-Football | 팀·선수·감독·통계 endpoint 제공 | 범위가 가장 넓음 | 무료 100회/일, API key와 재배포 조건 확인 필요 | 조건부 후보 |
| Hudl StatsBomb Open Data | 고품질 event·lineup JSON | 공개된 특정 대회·시즌만 | 공개 분석 시 출처와 로고 표시 요구 | 현재 EPL 부적합 |
| Sportmonks | EPL과 선수·라인업·통계 제공 | 전문 데이터 범위 | EPL은 유료 plan 필요 | MVP 비용상 보류 |

공식 확인 자료:

- football-data.org 가격: <https://www.football-data.org/pricing>
- football-data.org API 정책: <https://docs.football-data.org/general/v4/policies.html>
- football-data.org Competition API: <https://docs.football-data.org/general/v4/competition.html>
- API-Football 가격: <https://www.api-football.com/pricing>
- Hudl/StatsBomb Open Data: <https://github.com/hudl/open-data>
- Sportmonks Football API: <https://www.sportmonks.com/football-api/>

## 사용 경계

- 원본에 없는 값을 사실 데이터처럼 채우지 않는다.
- raw snapshot은 URL, 수집 시각과 SHA-256을 함께 기록한다.
- 팀 이름은 명시적인 alias table로 canonical Team ID에 연결한다.
- Team Compare에는 실제 경기 결과로 계산 가능한 항목만 표시한다.
- Player Compare는 공개 원본에서 검증 가능한 필드가 2명 이상 준비될 때 교체한다.
- Manager Compare는 감독 임명 사실의 공식 또는 사용 허용 출처가 확정될 때 교체한다.
- API-Football 키가 제공되더라도 약관상 저장·재배포·포트폴리오 공개 범위를
  확인하기 전 raw 응답을 커밋하지 않는다.

## 단계별 도입

1. openfootball 2026/27 원본 snapshot 동기화
2. 팀 이름 → canonical Team ID 매핑 검증
3. 경기 결과로 Team Compare 사실 지표 생성
4. 득점자 파싱 가능 범위와 선수 ID 매핑 검토
5. 상세 선수·감독 데이터 보조 공급자 약관 및 API key 결정
6. TacticVision Analysis 계산식은 External Facts와 별도 파일·표시로 제공
