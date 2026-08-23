# TacticVision EPL 26/27

> Stop searching. Start understanding.

TacticVision은 EPL 팀·선수·감독·경기·전술 데이터를 연결해 탐색, 비교와
라인업 분석을 지원하는 Football Intelligence MVP입니다. 현재 저장소는
2026/27 EPL을 주제로 한 정적 웹 프로토타입과 제품·데이터·전술 표준 문서를
함께 관리합니다.

## 프로젝트 상태

현재 앱 화면과 주요 상호작용은 `app/`에 통합되어 있습니다. 다음 단계는
샘플·정적 데이터와 화면 내부 데이터 정의를 검증된 EPL 데이터 계약으로
정규화하고, 두 핵심 사용자 흐름을 종단 검증하는 작업입니다.

- 공식 MVP 진입점: `app/index.html`
- 앱 구조: HTML, CSS, JavaScript, JSON
- 현재 데이터: 데모용 정적 데이터와 JSON이 혼합된 상태
- 현재 단계: MVP 기준선 확정 및 데이터 연동 준비
- 구현 완료 판정: [`docs/product/ACCEPTANCE.md`](docs/product/ACCEPTANCE.md)

루트 `index.html`과 `apps/web/`은 이전 구현을 비교하기 위해 보존한 레거시
경로이며 현재 MVP의 공식 실행 기준이 아닙니다.

## 핵심 사용자

- 축구 전술 팬
- FM·EA FC 사용자
- 축구 콘텐츠 제작자
- 초기 스포츠 분석 종사자

## 핵심 사용자 흐름

```text
Home
├─ 팀·선수·감독 탐색
│  └─ 상세 정보
│     └─ Team·Player·Manager Compare
│        └─ 비교 결과 확인
└─ 경기 탐색
   └─ Match Hub
      └─ Match Lineups
         └─ Tactical Board
            └─ 전술 배치 및 분석 결과 확인
```

두 경로는 독립적으로 사용할 수 있습니다. 모든 사용자가 비교 화면이나
Tactical Board를 반드시 거칠 필요는 없습니다.

## 현재 프로토타입에서 확인할 수 있는 기능

- Home 대시보드와 통합 검색
- 팀·선수·감독 상세 화면
- Team·Player·Manager Compare
- Match Hub와 양 팀 라인업
- 포메이션 변경과 선수 교체
- 드래그 기반 선수 배치와 포메이션 추론
- Tactical Board와 전술 설정

위 목록은 프로토타입에 존재하는 기능을 설명합니다. 기능별 최종 완료 여부는
화면 존재가 아니라 Acceptance Criteria와 검증 증거를 기준으로 판정합니다.

## 로컬 실행

Python 3가 필요합니다.

```bash
cd app
python3 -m http.server 8000
```

브라우저에서 <http://127.0.0.1:8000/>으로 접속합니다. 파일을 직접 열면
브라우저 보안 정책 때문에 JSON 요청이 실패할 수 있으므로 HTTP 서버를
사용해야 합니다.

## 저장소 구조

```text
app/                    현재 MVP 정적 웹 앱
├── index.html          공식 실행 진입점
├── assets/css/         앱 스타일
├── assets/js/          화면 상태와 상호작용
└── data/               앱에서 사용하는 JSON 데이터
docs/product/           MVP 범위와 완료 조건
docs/roadmap/           완료 조건 기반 개발 순서
docs/data/              데이터 계층과 다음 작업
docs/standards/         Position·Role·Playstyle 등 TVS 표준
docs/bluebook/          제품 철학과 장기 방향
docs/decisions/         기술 의사결정 기록
data/                   이전 데이터 구조와 taxonomy
apps/web/               이전 웹 구현
services/api/           향후 API 구조를 위한 자리표시자
packages/               향후 공통 타입·검증 모듈 자리표시자
tests/                  향후 통합·E2E 테스트 구조
```

## 데이터 방향

MVP 데이터는 세 층으로 구분합니다.

1. External Facts: 일정, 소속, 출전, 득점 등 외부 출처의 사실 데이터
2. TacticVision Standards: Position, Role, Playstyle, Archetype, Tactical Function
3. TacticVision Analysis: 비교 지표, 전술 적합도와 분석 결과

실제 데이터 연동 전 다음을 확정해야 합니다.

- 데이터 출처, 기준 시점, 라이선스와 재배포 조건
- 팀·선수·감독·포메이션·전술·역할 필드
- 대상별 안정적인 ID와 참조 관계
- 외부 원본을 앱 JSON으로 변환하는 규칙
- 결측·중복·잘못된 참조 검증
- 외부 데이터 실패 시 데모 기준 데이터 유지 방식

자세한 방향은 [`docs/data/DATA_FOUNDATION_NEXT.md`](docs/data/DATA_FOUNDATION_NEXT.md)를
참고하세요.

## MVP 범위

### P0 — 핵심 흐름 필수

- 공식 실행 구조와 데이터 계약
- Home과 탐색
- 팀·선수·감독 상세 정보
- Team·Player·Manager Compare
- Match Hub와 Match Lineups
- Tactical Board

### P1 — 공개 출시 전 필수 품질

- 기본 반응형 화면
- 로딩·오류·빈 상태 처리
- 데이터 참조 무결성
- 기본 접근성
- 주요 브라우저와 배포 환경 검증

### P2 — MVP 이후

- 사용자 계정과 저장·공유
- AI 분석과 경기 시뮬레이션
- 고급 Scout 기능
- 결제·Premium 기능
- PWA와 커뮤니티
- Enterprise API

## 개발 순서

각 Sprint는 날짜를 채우는 대신 완료 조건을 충족하면 즉시 다음 단계로
이동합니다.

1. 현재 구현 기준선 확정
2. 데이터 확보와 계약 확정
3. 실제 데이터 연동
4. 핵심 사용자 흐름 검증
5. 공개 품질과 배포
6. 지원용 포트폴리오 패키지

세부 작업과 완료 조건은 [`docs/roadmap/README.md`](docs/roadmap/README.md)에
정리되어 있습니다.

## 실행 Issue

1. [#9 공식 실행 경로와 현재 구현 기준선 검증](https://github.com/ParkChanSik034/TacticVision-EPL2627/issues/9)
2. [#10 EPL 데이터 계약·출처·무결성 검증 확정](https://github.com/ParkChanSik034/TacticVision-EPL2627/issues/10)
3. [#11 Home·검색·팀·선수·감독 상세 흐름 완성](https://github.com/ParkChanSik034/TacticVision-EPL2627/issues/11)
4. [#12 Team·Player·Manager Compare 데이터 연동과 검증](https://github.com/ParkChanSik034/TacticVision-EPL2627/issues/12)
5. [#13 Match Hub·Match Lineups 데이터 연동과 검증](https://github.com/ParkChanSik034/TacticVision-EPL2627/issues/13)
6. [#14 Tactical Board 데이터 연동과 전술 상태 검증](https://github.com/ParkChanSik034/TacticVision-EPL2627/issues/14)
7. [#15 P1 품질·배포·지원용 포트폴리오 검증](https://github.com/ParkChanSik034/TacticVision-EPL2627/issues/15)

기획 기준과 전체 연결 관계는
[#2 MVP 범위와 로드맵 확정](https://github.com/ParkChanSik034/TacticVision-EPL2627/issues/2)에서
관리합니다. 실제 개발은 #9부터 시작합니다.

## 완료 판정

기능은 다음 조건을 모두 만족한 뒤에만 완료로 처리합니다.

- 공통 Acceptance Criteria 충족
- 기능별 체크리스트 검증
- 검증 환경, 데이터와 사용자 경로 기록
- 미검증 항목과 알려진 문제 공개
- 관련 문서와 실제 동작 일치
- 변경 PR의 `main` 병합

전체 기준과 검증 기록 템플릿은
[`docs/product/ACCEPTANCE.md`](docs/product/ACCEPTANCE.md)를 참고하세요.

## 주요 문서

- [MVP 범위](docs/product/MVP.md)
- [기능 완료 조건](docs/product/ACCEPTANCE.md)
- [개발 로드맵](docs/roadmap/README.md)
- [MVP 구현 기준선 검증](docs/verification/MVP_BASELINE.md)
- [저장소 구조](docs/architecture/repository-structure.md)
- [데이터 다음 단계](docs/data/DATA_FOUNDATION_NEXT.md)
- [TacticVision Standards](docs/standards/README.md)
- [Bluebook](docs/bluebook/README.md)

## 현재 알려진 제한

- 실제 EPL 전체 데이터와 라이브 API는 아직 연결되지 않았습니다.
- 일부 화면 데이터와 비교 지표는 JavaScript 내부 데모 정의를 사용합니다.
- 백엔드, 사용자 계정, 저장, AI 분석과 경기 시뮬레이션은 MVP 범위 밖입니다.
- 자동화된 브라우저·접근성·데이터 무결성 검증은 후속 작업입니다.
- 외부 CDN을 사용하므로 오프라인 환경에서는 일부 스타일·아이콘·폰트가
  표시되지 않을 수 있습니다.

## 장기 방향

TacticVision은 스포츠 데이터를 단순히 나열하는 대신, 사실 데이터와 분석
기준을 분리하고 비교 가능한 설명으로 연결하는 Sports Intelligence Platform을
지향합니다. 장기 기능은 현재 MVP의 데이터와 사용자 검증을 완료한 뒤 별도
Issue에서 재평가합니다.
