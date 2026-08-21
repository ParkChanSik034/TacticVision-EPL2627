# TacticVision EPL 26/27 - Interactive Tactical Sandbox
- "내가 EPL 구단 감독이라면?" 26/27 시즌 프리미어리그 프리시즌 감독들의 변동된 전술 모델과 메가 이적생들의 전술적 배치를 실험할 수 있는 동적 가변형 2D 전술판 시뮬레이터 프로젝트입니다.

# Live Demo
- GitHub Pages 바로가기: https://<여러분의-깃허브-아이디>.github.io/TacticVision-EPL2627/
(실제 배포 완료 후 본인의 깃허브 페이지 주소로 변경하여 포트폴리오를 꾸며보세요!)

# 핵심 전술 구현 기능 (Core Features)
1. 26/27 시즌 최신화된 로스터 & 감독진
- 사비 알론소 (Chelsea) - 레버쿠젠의 무패 우승을 이끈 3-4-2-1 하이브리드 백3 및 인카피에 완전 영입 반영
- 엔초 마레스카 (Man City) - 로드리와 스톤스를 활용한 인버티드 풀백 및 €135M 이적생 엘리엇 앤더슨 배치
- 로베르토 데 제르비 (Tottenham) - 토날리 & 페르난데스를 유인 기반 더블 피벗 후방 빌드업 핵심 축으로 기용

2. 실시간 물리 좌표 반응형 2D 전술 보드 (DOM & CSS Grid)
- 수비 라인 높이 (Defensive Line): 슬라이더 값을 조작할 시 백3/백4 라인 선수 노드의 Y좌표가 비례적으로 즉시 상승/하락하며 공간 유격을 시각화합니다.
- 공격 폭 (Attack Width): 윙백 및 와이드 플레이어의 좌우 X좌표 간격이 실시간으로 벌어지거나 좁혀집니다.
- 압박 강도 (Pressing Intensity): 설정값을 75 이상으로 조절하면 선수 노드 배경에 실시간으로 고주파 애니메이션 펄스(Glow Ping Effect)가 생성되어 강력한 전방 압박 중임을 암시합니다.

3. 유저 피드백 경험 고도화 (UX-Driven Development)
- 전술 마스터 템플릿: 클릭 한 번으로 '티키타카', '게겐프레싱', '텐백 수비'의 수치 프리셋을 일괄 적용할 수 있습니다.
- 전술 카드 내보내기 모달: 사용자가 세부 튜닝한 구단 전술을 기반으로 시뮬레이션 지수 진단 알고리즘을 계산해 맞춤 보고서 분석 카드를 출력합니다.
- 부드러운 Toast 알림 피드백: 브라우저의 기본 alert() 경고창을 원천 배제하고 웹 흐름을 방해하지 않는 커스텀 토스트 알림창을 제작해 안전한 유저 피드백을 전달합니다.

# 기술 스택 (Tech Stack)
- Frontend: HTML5, CSS3 (CSS Custom properties), Tailwind CSS (CDN), JavaScript (ES6+)
- Visual Icons & Web Fonts: FontAwesome Icons v6, Google Fonts (Urbanist, Noto Sans KR, Fira Code)
- Hosting / CI-CD: GitHub Pages

# 폴더 구조 (Folder Structure)
- TacticVision-EPL2627/
  ├── index.html       # 메인 반응형 전술 시뮬레이터 실행 파일 (HTML/JS/Tailwind CSS 합본)
  └── README.md        # 포트폴리오를 위한 프로젝트 소개문서 (마크다운)

# 깃허브 업로드 및 호스팅 배포 방법 (Deployment)
- 본 프로젝트는 순수 바닐라 JS와 CDN 환경으로 제작되어 별도의 복잡한 서버/빌드 셋업 없이 즉시 배포하여 전 세계 사람들에게 공유할 수 있습니다.

# 깃허브 저장소(Repository) 생성:
- 본인의 GitHub 계정에 로그인 후 TacticVision-EPL2627 이라는 이름으로 빈 퍼블릭 저장소를 생성합니다.

# 코드 파일 업로드:
- 폴더를 만들고 다운로드한 index.html과 README.md를 저장소 루트 폴더에 업로드(git push 또는 웹 업로드)합니다.

# GitHub Pages 서비스 활성화:
- 생성된 깃허브 저장소 상단의 Settings 메뉴로 이동합니다.
- 좌측 사이드바의 Pages 탭을 클릭합니다.
- Build and deployment 섹션의 Source 설정을 Deploy from a branch로 선택하고, Branch를 main (또는 master), 폴더를 / (root)로 지정한 뒤 Save를 누릅니다.
- 약 1분 뒤 상단에 생성되는 전용 호스팅 고유 링크를 통해 본인의 전술 포트폴리오 프로젝트가 라이브로 작동하게 됩니다!

# 📈 향후 로드맵 (Future Roadmap)
- [ ] 드래그 앤 드롭: 선수 아이콘을 유저가 직접 드래그해서 배치할 수 있는 인터랙티브 라이브러리 연동
- [ ] 백엔드 DB 연동: 완성한 나만의 전술 스쿼드를 클라우드에 고유 번호(ID)로 저장하고 공유 링크 생성하기
- [ ] 스마트 AI 분석: 실제 전술가들의 데이터를 학습해 가상의 시나리오로 매치 시뮬레이션을 돌려주는 생성형 AI 연동 모델