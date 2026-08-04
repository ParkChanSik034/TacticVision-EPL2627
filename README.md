# TacticVision – EPL Tactical Lab

> **Stop Searching. Start Understanding.**

TacticVision은 스포츠 데이터를 단순히 보여주는 것을 넘어, 팬과 전문가가 선수·팀·감독·전술·경기를 비교하고 이해하며 의사결정을 내릴 수 있도록 돕는 Sports Intelligence Platform입니다.

특히 **2026/27 잉글랜드 프리미어리그(EPL)**를 중심으로 한 인터랙티브 전술 분석 플랫폼을 지향하며, 단순한 포메이션 제작 도구가 아니라 축구 팬들이 경기 전·중·후에 전술을 이해하고 비교하며 직접 체험할 수 있는 플랫폼을 목표로 합니다.

---

# 비전(Vision)

- ⚽ EPL Guide
- 🧠 Tactical Lab
- 🤖 AI Match Simulation

---

# 현재 구현 기능

## 홈 대시보드
- Match of the Week
- Today's Matches
- Trending Managers
- Latest News (임시 데이터)
- EPL 순위표 (임시 데이터)

## 전술 보드(Tactical Board)
- 팀 선택
- 포메이션 변경
- 선수 드래그 앤 드롭
- 포지션 자동 변경
- 선발 ↔ 후보 교체
- 전술 슬라이더
- 데스크톱 최적화 UI

---

# 저장소 구조

```text
index.html            원격 구버전/임시 진입점 (EPL2627)
apps/web              사용자용 웹 앱 (Monorepo)
services/api          메인 백엔드 API
docs/bluebook         회사 비전과 원칙
docs/standards        TVS 표준 문서
docs/decisions        기술 의사결정 기록
data/taxonomy         프로그램이 읽는 구조화 데이터
data/                 EPL2627 경기 데이터 (teams.json, players.json 등)
database              스키마·마이그레이션·시드
packages              공통 타입과 검증 로직
tests                 통합·E2E 테스트
```

---

# 개발 로드맵

## Phase 1 : 핵심 플랫폼 구축
- 홈 대시보드
- 전술 보드
- Match Hub(경기 상세 페이지)
- EPL 20개 팀
- 실제 선수단 데이터
- 감독 프로필
- 선수 프로필
- 포메이션 라이브러리

## Phase 2 : 전술 분석 기능
- 감독 전술 프리셋
- 클래식 전술 아카이브
- 팀 비교
- 감독 비교
- 선수 비교
- Tactical Timeline
- 팀 스타일 평점

## Phase 3 : AI 기능
- AI 전술 분석
- 경기 시뮬레이터
- 승률 예측
- xG 예측
- 점유율 예측
- AI 경기 리포트

## Phase 4 : 플랫폼 확장
- 전술 저장
- 전술 공유
- 사용자 계정
- Premium 기능
- PWA 지원
- 모바일 최적화

---

# 서비스 구조

Home
→ Match Hub
→ 양 팀 라인업
→ Tactical Board
→ 팀 비교
→ 감독 비교
→ 선수 비교
→ 경기 통계
→ 뉴스
→ AI 시뮬레이션

---

# Sprint 계획

### Sprint 1
- 홈 대시보드
- Tactical Board
- Match Hub

### Sprint 2
- EPL Guide
- 감독 페이지
- 선수 페이지
- 팀 비교

### Sprint 3
- Tactical Lab
- Tactical Timeline
- AI 전술 분석

### Sprint 4
- Match Simulation
- 전술 저장 및 공유
- PWA 지원

---

# 장기 목표

TacticVision은 단순한 전술판이 아닌 **축구 경기 중심 플랫폼**을 목표로 합니다.

사용자는 하나의 경기에서 다음과 같은 경험을 할 수 있습니다.

- 경기 정보 확인
- 양 팀 비교
- 감독 비교
- 선수 비교
- 실제 전술 편집
- AI 기반 경기 시뮬레이션
- 경기 중 전술 변화 분석

---

# 핵심 사용자 흐름

```
Home
   ↓
Match Hub
   ↓
Tactical Analysis
   ↓
AI Match Simulation
```

**핵심 철학**

> 하나의 경기를 중심으로 모든 전술 정보를 연결하는 플랫폼

---

## 로컬 실행 (Starter 패키지)

현재 웹 앱은 단일 HTML 파일로 구성되어 있습니다.

```bash
cd apps/web
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`으로 접속합니다.
