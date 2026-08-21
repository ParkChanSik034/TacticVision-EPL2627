# TacticVision MVP - START HERE

## 목적
새 노트북에서 TacticVision MVP 개발을 바로 재개하기 위한 복구 패키지입니다.

## 가장 먼저 볼 폴더
- `app/` : 현재까지 구현된 웹 MVP (v2.8 connected profiles 기준)
- `docs/bluebook/` : 제품 철학과 장기 방향
- `docs/standards/` : TVS Position / Role / Playstyle / Archetype / Tactical Function
- `docs/product/MVP.md` : MVP 범위
- `docs/roadmap/` : 개발 로드맵

## VS Code에서 실행
1. 이 폴더를 VS Code에서 엽니다.
2. 터미널에서 아래 명령을 실행합니다.

```bash
cd app
python -m http.server 8000
```

3. 브라우저에서 `http://localhost:8000` 을 엽니다.

Windows에서 `python`이 동작하지 않으면:
```bash
py -m http.server 8000
```

## 현재 앱 구조
`app/index.html` + `app/assets/css/style.css` + `app/assets/js/app.js` + JSON 데이터 구조입니다.

## 다음 MVP 작업 권장 순서
1. 현재 v2.8 화면/기능 정상 동작 확인
2. EPL 팀/선수/감독 데이터 구조 점검
3. TVS 문서와 실제 JSON 데이터 매핑
4. MVP 기능 범위 고정
5. 백엔드/API 도입 여부 결정
6. 실제 데이터 소스 연결
7. 배포

## 주의
이 패키지는 대화 중 생성·보존된 파일 중 현재 컨테이너에서 확인 가능한 최신 통합본과 기획 문서를 묶은 복구본입니다. 여러 중간 버전 전체를 개발 기준으로 섞지 않고, v2.8을 앱 기준점으로 사용합니다.
