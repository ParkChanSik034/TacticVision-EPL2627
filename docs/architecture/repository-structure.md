# Repository Structure

## 현재 원칙

- 하나의 모노레포
- 하나의 메인 백엔드
- 백엔드 내부는 도메인 모듈로 분리
- 표준 문서와 구조화 데이터를 함께 관리

## 백엔드 모듈 예시

```text
services/api/src/modules/
├── players/
├── teams/
├── positions/
├── roles/
├── playstyles/
├── comparisons/
└── reports/
```

## 향후 분리 가능 항목

- Intelligence Engine
- Data Pipeline
- Public SDK
- Mobile App
