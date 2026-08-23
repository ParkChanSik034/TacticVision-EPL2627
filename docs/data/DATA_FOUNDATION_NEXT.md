# MVP Data Foundation

Status: Contract v1
Baseline date: 2026-08-24
Owner Issue: [#10](https://github.com/ParkChanSik034/TacticVision-EPL2627/issues/10)

## 목적

이 문서는 `app/data/`를 TacticVision MVP의 공식 데이터 경계로 정의한다. 화면
내부 JavaScript 데모 데이터는 이 계약으로 이전해야 할 레거시이며 공식 데이터
소스로 간주하지 않는다.

## 데이터 계층

| 계층 | 의미 | 현재 파일 |
| --- | --- | --- |
| External Facts | 팀, 선수, 감독, 소속처럼 외부 근거가 필요한 사실 | `teams.json`, `players.json`, `managers.json`, `squads.json` |
| TacticVision Standards | 제품이 직접 정의하고 버전 관리하는 분류와 전술 구조 | `formations.json`, `roles.json` |
| TacticVision Analysis | 사실과 표준을 조합한 제품 분석값 | `tactics.json` |
| Metadata | 버전, 기준 시점, 출처와 사용 제한 | `manifest.json` |

현재 External Facts 파일은 실제 2026/27 EPL 데이터셋이 아니라 UI 검증용
프로토타입이다. 외부 출처 메타데이터가 없는 이름, 이적, 소속과 감독 정보는
검증된 사실로 인용하거나 배포 자료에 사용하면 안 된다.

## 공통 규칙

- 인코딩은 UTF-8, 형식은 JSON이다.
- ID와 참조는 소문자 ASCII kebab-case를 기본으로 하며 표시 이름과 분리한다.
- 객체형 데이터셋의 최상위 key가 해당 레코드의 ID다.
- 존재하지 않는 사실은 빈 문자열이나 임의 숫자 대신 `null` 또는 문서화된
  `dataStatus`를 사용한다.
- 단위가 있는 숫자는 필드명 또는 계약에 단위를 고정한다. 현재 `height`는 cm다.
- 외부 데이터가 실패해도 검증을 통과한 마지막 snapshot을 덮어쓰지 않는다.
- 데이터 변경 후 `python3 scripts/validate_data.py`를 반드시 실행한다.

## 안정 ID와 참조 관계

| 대상 | 형식 | 예 | 참조 |
| --- | --- | --- | --- |
| Team | EPL에서 지속되는 구단 slug | `arsenal`, `manchester-united` | managers, squads, tactics의 최상위 key |
| Player | `player-<영문 이름 slug>` | `player-cole-palmer` | 향후 squad의 `playerId` |
| Manager | 별도 ID를 만들기 전까지 Team key에 귀속 | `chelsea` | managers의 최상위 key |
| Formation | 숫자 라인 표기 | `4-3-3`, `3-2-4-1` | team.defaultFormation, manager.preferredFormations |
| Role | 영문 역할 kebab-case | `advanced-forward` | 향후 player/tactical role 참조 |
| Squad record | `<team-prefix>-NN` 임시 roster 레코드 | `che-01` | 현재 라인업 내부에서만 사용 |
| Tactic | Team key에 귀속된 preset | `arsenal.presets.gegen` | 해당 팀의 전술 화면 |

Team slug는 한 번 공개한 뒤 구단명이 바뀌지 않는 한 변경하지 않는다. Player
동명이인은 `player-<name>-<birth-year>`를 사용한다. 외부 제공자의 ID는 내부 ID를
대체하지 않고 향후 `externalIds` 객체에 저장한다.

현재 squad record는 이름을 내장한 프로토타입 레코드이며 `players.json`의
canonical player와 아직 연결되지 않는다. 실제 데이터 이전 시 `name` 중복 저장을
제거하고 필수 `playerId` 참조로 전환한다.

## 파일별 계약

표에서 `필수`는 레코드가 존재할 때 반드시 있어야 한다는 뜻이다.

### `teams.json`

최상위 형식: `{ [teamId]: Team }`

| 필드 | 형식 | 필수 | 규칙 |
| --- | --- | --- | --- |
| `id` | string | 예 | 최상위 key와 동일 |
| `name` | string | 예 | 영문 표시 이름 |
| `koreanName` | string | 예 | 한국어 표시 이름 |
| `shortName` | string | 예 | EPL 내 고유한 3자 대문자 코드 |
| `primaryColor` | string | 예 | `#RRGGBB` |
| `defaultFormation` | string | 예 | `formations.json`에 존재 |
| `dataStatus` | enum | 예 | `planned`, `partial`, `ready` |

### `players.json`

최상위 형식: `{ [playerId]: Player }`

| 필드 | 형식 | 필수 | 규칙 |
| --- | --- | --- | --- |
| `name` | string | 예 | 표시 이름 |
| `teamId` | string | 예 | `teams.json`에 존재하는 소속 팀 ID |
| `number` | integer/null | 예 | 1~99 또는 미확정 `null` |
| `position` | string | 예 | 주 포지션이며 `positions`에 포함 |
| `positions` | string[] | 예 | 비어 있지 않고 중복 없음 |
| `age` | integer/null | 예 | snapshot 기준 만 나이, 미확정은 `null` |
| `height` | number/null | 예 | cm, 미확정은 `null` |
| `foot` | enum/null | 예 | `Left`, `Right`, `Both`, `null` |
| `nationality` | string/null | 예 | 표시용 국적, 미확정은 `null` |

실제 연동 단계에서는 변하는 `age` 대신 `dateOfBirth`를 canonical 필드로 추가하고
화면에서 기준일에 따라 나이를 계산한다.

### `managers.json`

최상위 형식: `{ [teamId]: ManagerAssignment }`

필수 필드: `name`, `nationality`, `preferredFormations`, `style`, `signings`,
`feedback`. 선택 필드: `career`, `keyPlayers`. `preferredFormations`의 모든 값은
`formations.json`에 존재해야 한다. 현재 파일은 팀별 시나리오 데이터이므로 실제
감독 임명 이력으로 사용하지 않는다.

### `squads.json`

최상위 형식: `{ [teamId]: Squad }`. 각 Squad는 `starters`와 `substitutes` 배열을
필수로 가진다. roster 레코드의 필수 필드는 `id`, `name`, `position`,
`availablePositions`다. 한 팀은 starter 11명을 가져야 하고 같은 팀 및 전체 파일
안에서 roster ID가 중복되면 안 된다. `position`은 배치 위치이고
`availablePositions`는 선수가 이동 가능한 기본 포지션 목록이다.

### `formations.json`

최상위 형식: `{ [formationId]: FormationSlot[11] }`. 각 slot은 `pos`, `x`, `y`,
`role`을 필수로 가진다. 좌표는 보드 비율 0~100이며, `role`은 `gk`, `def`,
`wide`, `mid`, `att` 중 하나다. 한 포메이션 안에서 `pos`는 고유해야 한다.

### `roles.json`

최상위 형식: `Role[]`. 필수 필드는 `id`, `group`, `nameKo`, `nameEn`, `icon`,
`summary`, `description`, `purpose`, `movements`, `attributes`, `usedWhen`,
`difference`, `examples`다. `id`는 전역 고유하다. `attributes`는
`[표시 이름, 0~100 점수]` 쌍의 배열이다. 역할은 TacticVision의 편집 기준이며
공식 축구 규칙이나 외부 평가값을 의미하지 않는다.

### `tactics.json`

최상위 형식: `{ [teamId]: TeamTactics }`. `presets`는 `tikitaka`, `gegen`,
`lowblock`을 필수로 가지며 각 preset의 `defline`, `width`, `pressing`은 0~100
정수다. 이 값은 실제 경기 통계가 아니라 UI용 TacticVision Analysis다.

### `manifest.json`

데이터 snapshot 전체의 `schemaVersion`, `datasetVersion`, `asOf`, `generatedAt`,
기본 출처와 파일별 `layer`, `sourceId`, `status`를 기록한다. External Facts가
실제 공급자로 교체될 때 source registry와 manifest를 같은 PR에서 갱신한다.

## 출처와 라이선스 상태

| Source ID | 상태 | 사용 범위 | 라이선스·제한 |
| --- | --- | --- | --- |
| `internal-prototype` | 현재 | 팀·선수·감독·스쿼드 데모 | 프로젝트 내부 UI 검증용. 외부 사실 정확성 미검증, 재배포용 사실 데이터로 사용 금지 |
| `tacticvision-standard-v1` | 현재 | formations, roles | 프로젝트 자체 표준. 출처 사실과 혼동하지 않고 버전 표시 |
| `tacticvision-analysis-demo-v1` | 현재 | tactics | 데모 분석값. 관측 통계나 예측 결과로 표시 금지 |
| 외부 EPL 공급자 | 미선정 | 실제 일정·소속·선수·감독 | API 약관, 저장·캐시·재배포·상업적 포트폴리오 사용 권한 확인 전 도입 금지 |

현재 데이터에는 제3자 원본 URL, 수집 시각과 라이선스 증거가 없다. 따라서
`manifest.json`의 External Facts 상태는 `prototype`으로 유지한다. 실제 공급자를
선정할 때는 공식 문서 URL, 약관 URL, 확인일, 허용 범위, attribution 요구사항과
snapshot 기준 시점을 기록해야 한다.

## 원본 변환 규칙

```text
외부 원본 수집
→ 원본을 날짜별 immutable snapshot으로 저장
→ external ID를 내부 안정 ID에 매핑
→ 자료형·단위·결측값 정규화
→ app/data 계약 형태로 변환
→ validate_data.py 실행
→ 검증 성공 시에만 app/data snapshot 교체
→ manifest의 버전·시점·출처 갱신
```

- 이름으로 자동 병합하지 않는다. 동명이인과 구단명 변형은 명시적 매핑을 쓴다.
- 원본 값이 없으면 추정값을 채우지 않는다.
- 날짜는 ISO 8601, 시각은 UTC `Z`, 색상은 `#RRGGBB`, 비율은 0~100을 사용한다.
- 변환 실패 시 현재 배포 snapshot을 유지하고 실패 로그를 남긴다.
- 공급자별 변환기는 원본 파일을 직접 수정하지 않고 새 결과를 생성해야 한다.

## 반복 검증

```bash
python3 scripts/validate_data.py
```

검사기는 JSON 구문, root 형식, 필수 필드, ID 형식과 중복, 팀 key 집합,
포메이션 참조, roster ID, 좌표·분석 범위를 검증한다. 오류가 하나라도 있으면
exit code 1을 반환하므로 CI와 PR 검증에 그대로 연결할 수 있다.

## 현재 한계와 다음 단계

- External Facts는 실제 EPL 데이터가 아닌 prototype이다.
- `app.js` 내부 데이터는 아직 이 계약으로 이전되지 않았다.
- squad와 canonical player 사이 `playerId` 연결이 없다.
- 경기 일정·경기 ID·라인업 snapshot 계약은 실제 공급자 선정 후 #13에서 추가한다.
- #11~#14는 화면 데이터를 이 계약으로 이전하고 로딩·오류·빈 상태를 구현한다.
