---
id: TVS-001
title: Position Standard
status: draft
version: 0.1.0
owner: TacticVision Labs
related:
  - TVS-002
  - TVS-003
---

# TVS-001 Position Standard

## 1. 목적

Position은 선수가 경기 공간에서 **주로 활동하는 위치 또는 영역**을 정의한다.

Position은 Role, Playstyle, Tactical Function과 구분한다.

- **Position**: 어디에서 활동하는가
- **Role**: 그 위치에서 어떤 임무를 수행하는가
- **Playstyle**: 그 임무를 어떤 행동 성향으로 수행하는가
- **Tactical Function**: 팀 전술 안에서 어떤 효과를 만드는가

## 2. 공통 계층

```text
Sport
  ↓
Discipline
  ↓
Unit
  ↓
Position
```

축구 예시:

```text
Football → 11v11 → Attack → ST
```

농구 예시:

```text
Basketball → 5v5 → Backcourt → PG
```

## 3. 축구 Position 초안

### Goalkeeper

- GK

### Defensive Line

- RB
- RCB
- CB
- LCB
- LB

### Wide / Wingback

- RWB
- LWB
- RM
- LM
- RW
- LW

### Midfield

- DM
- RCM
- CM
- LCM
- AM

### Attack

- CF
- SS
- ST

## 4. 필수 메타데이터

| 필드 | 설명 |
|---|---|
| `position_id` | 전역 고유 ID |
| `sport` | 종목 |
| `discipline` | 세부 경기 형식 |
| `unit` | 경기 영역 또는 라인 |
| `code` | 표준 축약 코드 |
| `name` | 정식 명칭 |
| `description` | 위치 중심 정의 |
| `adjacent_positions` | 이동·전환 가능성이 높은 인접 포지션 |
| `status` | draft, review, approved |
| `version` | 표준 버전 |

## 5. 금지 규칙

Position 정의에는 다음을 직접 포함하지 않는다.

- 역할명: False 9, Poacher, Mezzala
- 플레이스타일: Direct Runner, Tempo Controller
- 주관적 능력치 점수
- 특정 선수나 감독의 적합도
- 특정 포메이션에서의 성과 평가

위 항목은 별도 관계 또는 별도 표준에서 관리한다.

## 6. 승인 조건

- Position과 Role의 경계가 명확한가
- 특정 선수 사례 없이 위치 자체를 설명할 수 있는가
- 다른 스포츠에도 동일한 계층 구조를 적용할 수 있는가
- 코드와 ID가 충돌하지 않는가
- 구조화 데이터 파일과 일치하는가
