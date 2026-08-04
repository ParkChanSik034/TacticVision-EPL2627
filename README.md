# TacticVision

> **Stop Searching. Start Understanding.**

TacticVision은 스포츠 데이터를 단순히 보여주는 것을 넘어, 팬과 전문가가 선수·팀·감독·전술·경기를 비교하고 이해하며 의사결정을 내릴 수 있도록 돕는 Sports Intelligence Platform입니다.

## 현재 제품

- **TacticVision Football**: 축구 중심 MVP
- **TacticVision Pro**: 고급 비교·분석 기능
- **TacticVision Scout**: 선수 분석 및 스카우팅 리포트
- 향후: Coach, Enterprise, Basketball, Baseball, F1 등

## 핵심 기술 구조

```text
TacticVision Standards (TVS)
        ↓
Sports Knowledge Graph (TVKG)
        ↓
TacticVision Intelligence Engine
        ↓
Compare / Scout / Analyze / Workspace
```

## 저장소 구조

```text
apps/web              사용자용 웹 앱
services/api          메인 백엔드 API
docs/bluebook         회사 비전과 원칙
docs/standards        TVS 표준 문서
docs/decisions        기술 의사결정 기록
data/taxonomy         프로그램이 읽는 구조화 데이터
database              스키마·마이그레이션·시드
packages               공통 타입과 검증 로직
tests                  통합·E2E 테스트
```

## 현재 우선순위

1. TVS-001 Position Standard 확정
2. TVS-002 Role Standard 작성
3. TVS-003 Playstyle Standard 작성
4. Football taxonomy 구조화
5. Sports Knowledge Graph 초안
6. 모듈형 백엔드 API 설계

## 문서 상태

- `draft`: 초안
- `review`: 검토 중
- `approved`: 승인된 기준

## 개발 원칙

- 모든 기능은 사용자의 스포츠 이해를 높여야 한다.
- 기능보다 Workflow를 우선한다.
- Position, Role, Playstyle을 혼동하지 않는다.
- AI는 반드시 판단 근거를 제공한다.
- 축구 전용으로 고정되지 않도록 확장 가능한 구조를 유지한다.

## 로컬 실행

현재 웹 앱은 단일 HTML 파일로 구성되어 있습니다.

```bash
cd apps/web
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`으로 접속합니다.
