# EPL 2026/27 Data Provider Assessment

- 확인일: 2026-08-24
- 대상 Issue: [#12](https://github.com/ParkChanSik034/TacticVision-EPL2627/issues/12)
- 목적: 공개 포트폴리오에서 출처와 사용 조건을 설명할 수 있는 실제 비교 데이터 선정

## 결정

1차 External Facts 공급자로 `openfootball/england`를 선택한다.

Player·Manager Compare의 기본 인물 정보 공급자로 `Wikidata`를 선택한다.
Wikidata의 구조화 데이터는 CC0이며, 비교 대상의 고유 QID와 생년월일·국적·
신장·선수 포지션만 사용한다. 소속팀, 시즌 경기력과 전술 평가는 이 데이터로
추정하지 않는다.

- 데이터 접근: <https://www.wikidata.org/wiki/Help:Data_access>
- 라이선스: <https://www.wikidata.org/wiki/Wikidata:Licensing>
- API: <https://www.mediawiki.org/wiki/Wikibase/API>

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
| TheSportsDB | 2026/27 팀·순위 응답 확인 | 무료 응답은 팀 10개·순위 5개로 제한 | 무료 키, crowd-sourced | 팀 소속·ID 교차검증에만 채택 |
| 나무위키 | 한국어 인명 표기·최근 소속을 문서에서 확인 가능 | 구조화 API가 아니며 사용자 편집 자료 | 본문 CC BY-NC-SA 2.0 KR, 이미지는 파일별 조건 상이 | 수동 교차검증 링크에만 사용 |
| Hudl StatsBomb Open Data | 고품질 event·lineup JSON | 공개된 특정 대회·시즌만 | 공개 분석 시 출처와 로고 표시 요구 | 현재 EPL 부적합 |
| Sportmonks | EPL과 선수·라인업·통계 제공 | 전문 데이터 범위 | EPL은 유료 plan 필요 | MVP 비용상 보류 |

공식 확인 자료:

- football-data.org 가격: <https://www.football-data.org/pricing>
- football-data.org API 정책: <https://docs.football-data.org/general/v4/policies.html>
- football-data.org Competition API: <https://docs.football-data.org/general/v4/competition.html>
- API-Football 가격: <https://www.api-football.com/pricing>
- TheSportsDB 문서: <https://www.thesportsdb.com/documentation>
- 나무위키 콘텐츠 라이선스: <https://creativecommons.org/licenses/by-nc-sa/2.0/kr/>
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
- TheSportsDB는 20팀을 개별 이름으로 조회해 canonical Team ID와 명시적으로
  연결한다. crowd-sourced 자료이므로 순위·선수 경기력의 기준 출처로 사용하지
  않고 팀 소속과 외부 ID의 교차검증에만 사용한다.
- 나무위키는 한국어 이름·별칭과 최신 소속을 사람이 확인하는 보조 출처로만
  사용한다. 본문을 복사하거나 자동 스크래핑하지 않으며, 사실값은 구단 공식
  자료·Wikidata·채택된 데이터 공급자 중 하나와 일치할 때만 반영한다.
- 나무위키 이미지는 문서 본문 라이선스와 별개일 수 있으므로 복사·핫링크하지
  않는다. 이미지가 필요하면 Wikimedia Commons에서 재사용 가능한 파일을 찾고
  파일별 라이선스와 저작자 표시 조건을 기록한다.

## 단계별 도입

1. openfootball 2026/27 원본 snapshot 동기화
2. 팀 이름 → canonical Team ID 매핑 검증
3. 경기 결과로 Team Compare 사실 지표 생성
4. 득점자 파싱 가능 범위와 선수 ID 매핑 검토
5. 상세 선수·감독 데이터 보조 공급자 약관 및 API key 결정
6. TacticVision Analysis 계산식은 External Facts와 별도 파일·표시로 제공
