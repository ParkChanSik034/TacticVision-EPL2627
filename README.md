# TacticVision EPL 26/27

## 현재 구조

```text
TacticVision-EPL2627/
├── index.html
├── README.md
├── data/
│   ├── teams.json       # EPL 20개 팀 기본 정보
│   ├── squads.json      # 팀별 선발 11명과 후보 선수
│   ├── managers.json    # 감독 프로필과 전술 설명
│   ├── formations.json  # 포메이션별 좌표
│   └── tactics.json     # 팀별 전술 프리셋
├── js/                  # 다음 단계에서 기능별 스크립트 분리 예정
└── css/                 # 다음 단계에서 스타일 분리 예정
```

## 이번 업데이트

- EPL 20개 팀 선택 구조 추가
- 기존 첼시, 맨체스터 시티, 토트넘 데이터 유지
- 나머지 17개 팀은 공통 데이터 뼈대 연결
- HTML 내부 팀·선수·감독·포메이션 데이터를 JSON 파일로 분리
- 기존 포메이션 변경, 드래그, 후보 선택, 선수 교체 기능 유지

## 실행 방법

JSON 파일을 `fetch()`로 읽으므로 파일을 더블클릭해 여는 방식보다 GitHub Pages에서 실행하는 것을 권장합니다. 모든 파일과 폴더를 저장소 루트에 같은 구조로 업로드하세요.
