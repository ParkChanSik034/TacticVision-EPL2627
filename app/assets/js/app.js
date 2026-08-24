// Pre-defined formations coordinates and slot mappings
        const formationsMap = {
            "4-3-3": [
                { pos: "GK", x: 50, y: 92, role: "gk" },
                { pos: "RB", x: 80, y: 75, role: "wide" },
                { pos: "RCB", x: 62, y: 78, role: "def" },
                { pos: "LCB", x: 38, y: 78, role: "def" },
                { pos: "LB", x: 20, y: 75, role: "wide" },
                { pos: "RCM", x: 65, y: 58, role: "mid" },
                { pos: "DM", x: 50, y: 63, role: "mid" },
                { pos: "LCM", x: 35, y: 58, role: "mid" },
                { pos: "RW", x: 80, y: 32, role: "wide" },
                { pos: "ST", x: 50, y: 18, role: "att" },
                { pos: "LW", x: 20, y: 32, role: "wide" }
            ],
            "4-4-2": [
                { pos: "GK", x: 50, y: 92, role: "gk" },
                { pos: "RB", x: 82, y: 75, role: "wide" },
                { pos: "RCB", x: 62, y: 78, role: "def" },
                { pos: "LCB", x: 38, y: 78, role: "def" },
                { pos: "LB", x: 18, y: 75, role: "wide" },
                { pos: "RM", x: 85, y: 52, role: "wide" },
                { pos: "RCM", x: 60, y: 58, role: "mid" },
                { pos: "LCM", x: 40, y: 58, role: "mid" },
                { pos: "LM", x: 15, y: 52, role: "wide" },
                { pos: "RST", x: 60, y: 18, role: "att" },
                { pos: "LST", x: 40, y: 18, role: "att" }
            ],
            "3-5-2": [
                { pos: "GK", x: 50, y: 92, role: "gk" },
                { pos: "RCB", x: 68, y: 78, role: "def" },
                { pos: "CB", x: 50, y: 80, role: "def" },
                { pos: "LCB", x: 32, y: 78, role: "def" },
                { pos: "RWB", x: 85, y: 55, role: "wide" },
                { pos: "RCM", x: 62, y: 60, role: "mid" },
                { pos: "DM", x: 50, y: 65, role: "mid" },
                { pos: "LCM", x: 38, y: 60, role: "mid" },
                { pos: "LWB", x: 15, y: 55, role: "wide" },
                { pos: "RST", x: 60, y: 18, role: "att" },
                { pos: "LST", x: 40, y: 18, role: "att" }
            ],
            "4-2-3-1": [
                { pos: "GK", x: 50, y: 92, role: "gk" },
                { pos: "RB", x: 82, y: 70, role: "wide" },
                { pos: "RCB", x: 62, y: 76, role: "def" },
                { pos: "LCB", x: 38, y: 76, role: "def" },
                { pos: "LB", x: 18, y: 70, role: "wide" },
                { pos: "RDM", x: 60, y: 60, role: "mid" },
                { pos: "LDM", x: 40, y: 60, role: "mid" },
                { pos: "RAM", x: 78, y: 36, role: "wide" },
                { pos: "AM", x: 50, y: 36, role: "mid" },
                { pos: "LAM", x: 22, y: 36, role: "wide" },
                { pos: "ST", x: 50, y: 16, role: "att" }
            ],
            "3-4-2-1": [
                { pos: "GK", x: 50, y: 92, role: "gk" },
                { pos: "RCB", x: 68, y: 76, role: "def" },
                { pos: "CB", x: 50, y: 78, role: "def" },
                { pos: "LCB", x: 32, y: 76, role: "def" },
                { pos: "RWB", x: 86, y: 55, role: "wide" },
                { pos: "RCM", x: 60, y: 62, role: "mid" },
                { pos: "LCM", x: 40, y: 62, role: "mid" },
                { pos: "LWB", x: 14, y: 55, role: "wide" },
                { pos: "RAM", x: 65, y: 38, role: "mid" },
                { pos: "LAM", x: 35, y: 38, role: "mid" },
                { pos: "ST", x: 50, y: 16, role: "att" }
            ]
        };

        // Static Tactical Team Player Names mapped to indices
        const teamPlayersBase = {
            chelsea: ["산체스", "포파나", "콜윌", "인카피에", "리스 제임스", "카이세도", "엔조", "쿠쿠렐라", "콜 파머", "은쿤쿠", "잭슨"],
            mancity: ["에데르송", "아칸지", "디아스", "그바르디올", "스톤스", "로드리", "포든", "더 브라위너", "엘리엇 앤더슨", "도쿠", "홀란드"],
            tottenham: ["비카리오", "포로", "로메로", "반더벤", "우도기", "토날리", "페르난데스", "쿨루셉스키", "매디슨", "손흥민", "솔랑케"]
        };

        const teamData = {
            chelsea: {
                manager: "사비 알론소 (Xabi Alonso)",
                nationality: "국적 정보 업데이트 예정",
                career: [],
                keyPlayers: [],
                defaultFormation: "3-4-2-1",
                style: "하이브리드 윙백 & 하프스페이스 좁은 채널 빌드업",
                signings: "피에로 인카피에 (Piero Hincapié) 완전 영입",
                presets: {
                    tikitaka: { defline: 55, width: 35, pressing: 65 },
                    gegen: { defline: 80, width: 45, pressing: 95 },
                    lowblock: { defline: 20, width: 25, pressing: 20 }
                },
                feedback: "알론소 감독의 첼시는 가변 3백과 좁혀진 공격 포지션이 특징입니다. 인카피에의 합류로 수비 시 백4로 부드럽게 복귀할 수 있습니다."
            },
            mancity: {
                manager: "엔초 마레스카 (Enzo Maresca)",
                nationality: "국적 정보 업데이트 예정",
                career: [],
                keyPlayers: [],
                defaultFormation: "3-2-4-1", // default map uses closest "3-4-2-1" or custom representation
                style: "극단적 인버티드 풀백 기용 및 하프스페이스 수적 우위 점유",
                signings: "엘리엇 앤더슨 (Elliot Anderson) 영입 (€135M)",
                presets: {
                    tikitaka: { defline: 60, width: 65, pressing: 75 },
                    gegen: { defline: 82, width: 55, pressing: 90 },
                    lowblock: { defline: 25, width: 45, pressing: 30 }
                },
                feedback: "마레스카 볼은 인버티드 풀백인 스톤스 또는 그바르디올이 로드리와 나란히 서서 중앙 박스를 장악하고, 더 브라위너와 신입생 앤더슨이 메짤라처럼 전진합니다."
            },
            tottenham: {
                manager: "로베르토 데 제르비 (Roberto De Zerbi)",
                nationality: "국적 정보 업데이트 예정",
                career: [],
                keyPlayers: [],
                defaultFormation: "4-2-3-1",
                style: "골키퍼를 유인 요소로 삼는 고도 설계 빌드업 및 빠른 종전환",
                signings: "산드로 토날리 (€108M), 마테우스 페르난데스 (€99M)",
                presets: {
                    tikitaka: { defline: 65, width: 70, pressing: 80 },
                    gegen: { defline: 85, width: 60, pressing: 95 },
                    lowblock: { defline: 22, width: 40, pressing: 25 }
                },
                feedback: "데 제르비 수장 아래에서 토트넘은 토날리와 페르난데스라는 엄청난 더블 피벗을 구축해 후방 빌드업에서 상대 압박을 유도하고 손흥민과 쿨루셉스키 공간을 엽니다."
            }
        };

        const managerExperienceData = {
            chelsea: { traits: ['가변 백3', '하프스페이스', '구조적 전환'], metrics: { buildUp: 88, pressing: 78, possession: 86, transition: 76 }, comparisonId: 'alonso' },
            mancity: { traits: ['인버티드 풀백', '위치 플레이', '중앙 장악'], metrics: { buildUp: 92, pressing: 73, possession: 95, transition: 67 }, comparisonId: 'maresca' },
            tottenham: { traits: ['압박 유인', '더블 피벗', '빠른 전진'], metrics: { buildUp: 90, pressing: 81, possession: 82, transition: 91 }, comparisonId: 'dezerbi' }
        };

        const managerComparisonData = [
            {
                id: 'alonso', name: '사비 알론소', english: 'Xabi Alonso', team: 'Chelsea',
                formation: '3-4-2-1', identity: '가변 백3와 하프스페이스 점유',
                keyIdea: '후방 숫자 우위를 만든 뒤 윙백과 두 명의 10번이 전진하는 구조',
                strengths: ['가변 빌드업', '중앙 수적 우위', '구조적 전환'],
                metrics: { buildUp: 88, pressing: 78, width: 63, defensiveLine: 82, transition: 76 }
            },
            {
                id: 'maresca', name: '엔초 마레스카', english: 'Enzo Maresca', team: 'Manchester City',
                formation: '3-2-4-1', identity: '인버티드 풀백과 점유 기반 위치 플레이',
                keyIdea: '중앙 박스를 형성해 짧은 패스로 압박을 해체하고 전진 패스 경로를 확보',
                strengths: ['위치 플레이', '중앙 장악', '패스 네트워크'],
                metrics: { buildUp: 92, pressing: 73, width: 70, defensiveLine: 79, transition: 67 }
            },
            {
                id: 'dezerbi', name: '로베르토 데 제르비', english: 'Roberto De Zerbi', team: 'Tottenham',
                formation: '4-2-3-1', identity: '유인 빌드업과 빠른 종방향 전환',
                keyIdea: '상대 압박을 골문 가까이 끌어들인 뒤 한 번의 전진으로 넓은 공간을 공략',
                strengths: ['압박 유인', '더블 피벗', '빠른 전진'],
                metrics: { buildUp: 90, pressing: 81, width: 74, defensiveLine: 75, transition: 91 }
            },
            {
                id: 'arteta', name: '미켈 아르테타', english: 'Mikel Arteta', team: 'Arsenal',
                formation: '4-3-3', identity: '점유 구조와 강한 전방 압박의 결합',
                keyIdea: '후방 빌드업에서 3-2 구조를 만든 뒤 측면과 하프스페이스를 단계적으로 공략',
                strengths: ['점유 구조', '전방 압박', '세트피스'],
                metrics: { buildUp: 87, pressing: 89, width: 76, defensiveLine: 86, transition: 74 }
            },
            {
                id: 'slot', name: '아르네 슬롯', english: 'Arne Slot', team: 'Liverpool',
                formation: '4-3-3', identity: '중원 3명과 빠른 공격 전개',
                keyIdea: '중앙 안정성을 유지하면서 전방의 위치 교환과 직선적인 전진 패스를 활용',
                strengths: ['더블 피벗', '위치 교환', '직선 전개'],
                metrics: { buildUp: 84, pressing: 86, width: 72, defensiveLine: 83, transition: 88 }
            },
            {
                id: 'emery', name: '우나이 에메리', english: 'Unai Emery', team: 'Aston Villa',
                formation: '4-2-2-2', identity: '상대 맞춤형 블록과 정교한 전환 공격',
                keyIdea: '중앙을 압축한 수비 블록으로 상대를 유도한 뒤 빠른 전진과 침투로 공간을 공략',
                strengths: ['상대 맞춤', '수비 블록', '전환 공격'],
                metrics: { buildUp: 76, pressing: 72, width: 61, defensiveLine: 68, transition: 90 }
            }
        ];

        const teamComparisonData = [
            { id:'arsenal', name:'Arsenal', short:'ARS', manager:'미켈 아르테타', formation:'4-3-3', identity:'구조적인 점유와 강한 전방 압박', stadium:'Emirates Stadium', founded:1886, keyPlayer:'Bukayo Saka', strengths:['전방 압박','점유 구조','세트피스'], summary:'3-2 빌드업을 기반으로 하프스페이스와 측면을 단계적으로 공략하는 팀.', metrics:{attack:88, defense:86, possession:90, pressing:91, transition:78}},
            { id:'liverpool', name:'Liverpool', short:'LIV', manager:'아르네 슬롯', formation:'4-3-3', identity:'중앙 안정성과 빠른 전진 전개', stadium:'Anfield', founded:1892, keyPlayer:'Mohamed Salah', strengths:['전환 속도','강한 압박','위치 교환'], summary:'더블 피벗의 안정성을 유지하면서 전방의 유동성과 직선적인 전진을 활용하는 팀.', metrics:{attack:91, defense:82, possession:84, pressing:89, transition:93}},
            { id:'mancity', name:'Manchester City', short:'MCI', manager:'엔초 마레스카', formation:'3-2-4-1', identity:'중앙 수적 우위와 위치 플레이', stadium:'Etihad Stadium', founded:1880, keyPlayer:'Erling Haaland', strengths:['패스 네트워크','중앙 장악','공격 점유'], summary:'인버티드 풀백과 중앙 박스를 활용해 상대 압박을 해체하고 높은 점유율을 유지하는 팀.', metrics:{attack:94, defense:84, possession:95, pressing:83, transition:80}},
            { id:'chelsea', name:'Chelsea', short:'CHE', manager:'사비 알론소', formation:'3-4-2-1', identity:'가변 백3와 하프스페이스 점유', stadium:'Stamford Bridge', founded:1905, keyPlayer:'Cole Palmer', strengths:['가변 빌드업','중앙 전개','유연한 대형'], summary:'가변적인 후방 구조와 두 명의 공격형 미드필더를 활용해 중앙과 측면을 연결하는 팀.', metrics:{attack:86, defense:80, possession:87, pressing:84, transition:85}},
            { id:'tottenham', name:'Tottenham Hotspur', short:'TOT', manager:'로베르토 데 제르비', formation:'4-2-3-1', identity:'압박 유인과 빠른 종방향 전환', stadium:'Tottenham Hotspur Stadium', founded:1882, keyPlayer:'Son Heung-min', strengths:['압박 유인','빠른 전진','공격 전환'], summary:'후방에서 상대 압박을 끌어낸 뒤 넓어진 공간을 빠르게 공략하는 팀.', metrics:{attack:87, defense:74, possession:82, pressing:86, transition:94}},
            { id:'astonvilla', name:'Aston Villa', short:'AVL', manager:'우나이 에메리', formation:'4-2-2-2', identity:'상대 맞춤형 블록과 전환 공격', stadium:'Villa Park', founded:1874, keyPlayer:'Ollie Watkins', strengths:['상대 맞춤','수비 블록','침투 공격'], summary:'중앙을 압축하고 상대의 전진을 유도한 뒤 빠른 침투와 전환으로 기회를 만드는 팀.', metrics:{attack:81, defense:79, possession:72, pressing:75, transition:90}}
        ];

        const playerComparisonData = [
            {id:'haaland',name:'엘링 홀란',english:'Erling Haaland',club:'Manchester City',position:'ST',positionGroup:'forward',nationality:'Norway',birthDate:'2000-07-21',height:'195cm',foot:'왼발',image:'',tags:['피니셔','침투','피지컬','박스 스트라이커'],attributes:{passing:72,control:84,dribbling:80,tackling:28,heading:92,physical:94,speed:91,workRate:76,positioning:96,decision:89},roleStats:{goals:'28',goalsPer90:'0.88',xG:'25.4',shotsPer90:'4.1',shotsOnTarget:'61',boxTouchesPer90:'7.8'}},
            {id:'isak',name:'알렉산데르 이사크',english:'Alexander Isak',club:'Newcastle United',position:'ST',positionGroup:'forward',nationality:'Sweden',birthDate:'1999-09-21',height:'192cm',foot:'오른발',image:'',tags:['테크니컬 피니셔','드리블','연계','공간 침투'],attributes:{passing:78,control:89,dribbling:88,tackling:31,heading:79,physical:82,speed:89,workRate:80,positioning:91,decision:88},roleStats:{goals:'23',goalsPer90:'0.74',xG:'20.8',shotsPer90:'3.6',shotsOnTarget:'54',boxTouchesPer90:'6.9'}},
            {id:'saka',name:'부카요 사카',english:'Bukayo Saka',club:'Arsenal',position:'RW',positionGroup:'forward',nationality:'England',birthDate:'2001-09-05',height:'178cm',foot:'왼발',image:'',tags:['인버티드 윙어','찬스메이커','볼 운반','압박'],attributes:{passing:88,control:91,dribbling:90,tackling:48,heading:55,physical:78,speed:88,workRate:88,positioning:89,decision:90},roleStats:{goals:'16',goalsPer90:'0.48',xG:'14.2',shotsPer90:'2.9',shotsOnTarget:'39',boxTouchesPer90:'6.1'}},
            {id:'palmer',name:'콜 파머',english:'Cole Palmer',club:'Chelsea',position:'AM',positionGroup:'midfielder',nationality:'England',birthDate:'2002-05-06',height:'189cm',foot:'왼발',image:'',tags:['플레이메이커','하프스페이스','키패스','페널티 킥'],attributes:{passing:91,control:92,dribbling:88,tackling:42,heading:58,physical:75,speed:81,workRate:82,positioning:90,decision:92},roleStats:{assists:'13',xA:'12.1',keyPassesPer90:'2.8',progressivePassesPer90:'7.4',passAccuracy:'86%',carriesPer90:'5.9'}},
            {id:'rice',name:'데클란 라이스',english:'Declan Rice',club:'Arsenal',position:'DM',positionGroup:'defensiveMidfielder',nationality:'England',birthDate:'1999-01-14',height:'188cm',foot:'오른발',image:'',tags:['볼 위닝','전진 운반','커버','세트피스'],attributes:{passing:88,control:86,dribbling:82,tackling:91,heading:83,physical:91,speed:79,workRate:95,positioning:92,decision:90},roleStats:{tacklesPer90:'2.5',interceptionsPer90:'1.8',recoveriesPer90:'8.7',duelWin:'61%',progressivePassesPer90:'6.8',possessionLostPer90:'8.1'}},
            {id:'saliba',name:'윌리엄 살리바',english:'William Saliba',club:'Arsenal',position:'CB',positionGroup:'defender',nationality:'France',birthDate:'2001-03-24',height:'192cm',foot:'오른발',image:'',tags:['빌드업 수비수','대인 수비','스피드','공중볼'],attributes:{passing:86,control:84,dribbling:74,tackling:92,heading:88,physical:90,speed:85,workRate:87,positioning:93,decision:91},roleStats:{tacklesPer90:'1.7',interceptionsPer90:'1.5',clearancesPer90:'4.3',aerialWin:'69%',defensiveDuelWin:'72%',progressivePassesPer90:'5.5'}},
            {id:'alisson',name:'알리송 베케르',english:'Alisson Becker',club:'Liverpool',position:'GK',positionGroup:'goalkeeper',nationality:'Brazil',birthDate:'1992-10-02',height:'193cm',foot:'오른발',image:'',tags:['스위퍼 키퍼','1대1','반사신경','빌드업'],attributes:{passing:86,control:82,dribbling:63,tackling:35,heading:40,physical:84,speed:62,workRate:80,positioning:95,decision:93},roleStats:{saveRate:'76%',cleanSheets:'14',goalsPrevented:'+6.4',crossClaims:'38',longPassAccuracy:'58%',sweeperActionsPer90:'1.4'}}
        ];
        const selectedPlayerIds = new Set(['haaland','rice','saliba']);
        const MAX_PLAYER_SELECTION = 3;
        const playerAttributeLabels = {passing:'패스',control:'볼 컨트롤',dribbling:'드리블',tackling:'태클',heading:'헤딩',physical:'몸싸움',speed:'속도',workRate:'활동량',positioning:'위치 선정',decision:'판단력'};
        const playerRoleStatLabels = {
            forward:{goals:'득점',goalsPer90:'90분당 득점',xG:'xG',shotsPer90:'90분당 슈팅',shotsOnTarget:'유효 슈팅',boxTouchesPer90:'90분당 박스 안 터치'},
            midfielder:{assists:'도움',xA:'xA',keyPassesPer90:'90분당 키패스',progressivePassesPer90:'90분당 전진 패스',passAccuracy:'패스 성공률',carriesPer90:'90분당 볼 운반'},
            defensiveMidfielder:{tacklesPer90:'90분당 태클',interceptionsPer90:'90분당 인터셉트',recoveriesPer90:'90분당 볼 회수',duelWin:'경합 성공률',progressivePassesPer90:'90분당 전진 패스',possessionLostPer90:'90분당 소유권 상실'},
            defender:{tacklesPer90:'90분당 태클',interceptionsPer90:'90분당 인터셉트',clearancesPer90:'90분당 클리어링',aerialWin:'공중볼 승률',defensiveDuelWin:'수비 경합 승률',progressivePassesPer90:'90분당 전진 패스'},
            fullback:{tacklesPer90:'90분당 태클',interceptionsPer90:'90분당 인터셉트',crossesPer90:'90분당 크로스',keyPassesPer90:'90분당 키패스',progressivePassesPer90:'90분당 전진 패스',passAccuracy:'패스 성공률'},
            goalkeeper:{saveRate:'선방률',cleanSheets:'클린시트',goalsPrevented:'실점 방지',crossClaims:'크로스 차단',longPassAccuracy:'롱패스 정확도',sweeperActionsPer90:'90분당 스위퍼 활동'}
        };

        
const completeTeamDirectory = [{"id": "arsenal", "name": "Arsenal", "short": "ARS", "manager": "미켈 아르테타", "formation": "4-3-3", "identity": "팀 전술 데이터 확장 예정", "stadium": "Emirates Stadium", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "아스널의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "astonvilla", "name": "Aston Villa", "short": "AVL", "manager": "우나이 에메리", "formation": "4-2-3-1", "identity": "팀 전술 데이터 확장 예정", "stadium": "Villa Park", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "애스턴 빌라의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "bournemouth", "name": "AFC Bournemouth", "short": "BOU", "manager": "안도니 이라올라", "formation": "4-2-3-1", "identity": "팀 전술 데이터 확장 예정", "stadium": "Vitality Stadium", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "본머스의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "brentford", "name": "Brentford", "short": "BRE", "manager": "감독 정보 업데이트 예정", "formation": "4-3-3", "identity": "팀 전술 데이터 확장 예정", "stadium": "Gtech Community Stadium", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "브렌트퍼드의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "brighton", "name": "Brighton & Hove Albion", "short": "BHA", "manager": "파비안 휘르첼러", "formation": "4-2-3-1", "identity": "팀 전술 데이터 확장 예정", "stadium": "Amex Stadium", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "브라이튼의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "chelsea", "name": "Chelsea", "short": "CHE", "manager": "사비 알론소", "formation": "3-4-2-1", "identity": "팀 전술 데이터 확장 예정", "stadium": "Stamford Bridge", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "첼시의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "coventry", "name": "Coventry City", "short": "COV", "manager": "감독 정보 업데이트 예정", "formation": "4-2-3-1", "identity": "팀 전술 데이터 확장 예정", "stadium": "Coventry Building Society Arena", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "코번트리 시티의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "crystalpalace", "name": "Crystal Palace", "short": "CRY", "manager": "올리버 글라스너", "formation": "3-4-2-1", "identity": "팀 전술 데이터 확장 예정", "stadium": "Selhurst Park", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "크리스털 팰리스의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "everton", "name": "Everton", "short": "EVE", "manager": "데이비드 모예스", "formation": "4-2-3-1", "identity": "팀 전술 데이터 확장 예정", "stadium": "Hill Dickinson Stadium", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "에버턴의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "fulham", "name": "Fulham", "short": "FUL", "manager": "마르코 실바", "formation": "4-2-3-1", "identity": "팀 전술 데이터 확장 예정", "stadium": "Craven Cottage", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "풀럼의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "hullcity", "name": "Hull City", "short": "HUL", "manager": "감독 정보 업데이트 예정", "formation": "4-2-3-1", "identity": "팀 전술 데이터 확장 예정", "stadium": "경기장 정보 업데이트 예정", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "헐 시티의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "ipswich", "name": "Ipswich Town", "short": "IPS", "manager": "감독 정보 업데이트 예정", "formation": "4-2-3-1", "identity": "팀 전술 데이터 확장 예정", "stadium": "경기장 정보 업데이트 예정", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "입스위치 타운의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "leeds", "name": "Leeds United", "short": "LEE", "manager": "다니엘 파르케", "formation": "4-2-3-1", "identity": "팀 전술 데이터 확장 예정", "stadium": "Elland Road", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "리즈 유나이티드의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "liverpool", "name": "Liverpool", "short": "LIV", "manager": "아르네 슬롯", "formation": "4-3-3", "identity": "팀 전술 데이터 확장 예정", "stadium": "Anfield", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "리버풀의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "mancity", "name": "Manchester City", "short": "MCI", "manager": "엔초 마레스카", "formation": "3-4-2-1", "identity": "팀 전술 데이터 확장 예정", "stadium": "Etihad Stadium", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "맨체스터 시티의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "manutd", "name": "Manchester United", "short": "MUN", "manager": "후벵 아모림", "formation": "3-4-2-1", "identity": "팀 전술 데이터 확장 예정", "stadium": "Old Trafford", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "맨체스터 유나이티드의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "newcastle", "name": "Newcastle United", "short": "NEW", "manager": "에디 하우", "formation": "4-3-3", "identity": "팀 전술 데이터 확장 예정", "stadium": "St James' Park", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "뉴캐슬 유나이티드의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "nottinghamforest", "name": "Nottingham Forest", "short": "NFO", "manager": "감독 정보 업데이트 예정", "formation": "4-2-3-1", "identity": "팀 전술 데이터 확장 예정", "stadium": "경기장 정보 업데이트 예정", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "노팅엄 포리스트의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "sunderland", "name": "Sunderland", "short": "SUN", "manager": "레지 르 브리", "formation": "4-3-3", "identity": "팀 전술 데이터 확장 예정", "stadium": "Stadium of Light", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "선덜랜드의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}, {"id": "tottenham", "name": "Tottenham Hotspur", "short": "TOT", "manager": "로베르토 데 제르비", "formation": "4-2-3-1", "identity": "팀 전술 데이터 확장 예정", "stadium": "Tottenham Hotspur Stadium", "founded": "업데이트 예정", "keyPlayer": "스쿼드 데이터 업데이트 예정", "strengths": ["팀 프로필 연결 완료", "전술 데이터 확장 예정"], "summary": "토트넘 홋스퍼의 기본 팀 정보 페이지입니다. 선수단과 상세 전술 데이터는 순차적으로 확장됩니다.", "metrics": {"attack": 70, "defense": 70, "possession": 70, "pressing": 70, "transition": 70}}];

        const selectedTeamIds = new Set(['arsenal','liverpool','mancity']);
        const MAX_TEAM_SELECTION = 3;
        const teamMetricLabels = {played:'경기 수', wins:'승', draws:'무', losses:'패', goalsFor:'득점', goalsAgainst:'실점', goalDifference:'득실차', points:'승점', pointsPerGame:'경기당 승점'};

        const selectedManagerIds = new Set(['arsenal', 'chelsea', 'tottenham']);
        const MAX_MANAGER_SELECTION = 3;

        const metricLabels = {
            buildUp: '빌드업 구조',
            pressing: '압박 강도',
            width: '공격 폭 활용',
            defensiveLine: '수비 라인',
            transition: '전환 속도'
        };

        const managerBarClasses = ['from-eplNeon to-emerald-300', 'from-eplBlue to-cyan-300', 'from-purple-400 to-fuchsia-300'];

        const entityData = { status:'idle', teams:{}, players:{}, managers:{}, squads:{}, roles:[], formations:{}, matches:null, standings:null, teamHistory:null, firstMatchLineups:null, teamComparison:null, peopleComparison:null, error:null, readyPromise:null };
        let selectedMatchId=null;
        let homeSearchRows=[];
        let homeSearchIndex=-1;

        function escapeHtml(value=''){
            return String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
        }

        async function fetchEntityJson(name){
            const response=await fetch(`data/${name}.json`,{cache:'no-store'});
            if(!response.ok) throw new Error(`${name}.json HTTP ${response.status}`);
            return response.json();
        }

        const externalClubKoreanNames={
            'Real Madrid':'레알 마드리드'
        };
        const positionKoreanNames={
            'Centre-Forward':'센터 포워드','Right Winger':'오른쪽 윙어','Attacking Midfield':'공격형 미드필더',
            'Central Midfield':'중앙 미드필더','Centre-Back':'센터백','Right-Back':'오른쪽 풀백','Goalkeeper':'골키퍼'
        };
        function koreanTeamName(teamId,fallback=''){
            const team=entityData.teams?.[teamId];
            return team?.koreanName||externalClubKoreanNames[fallback]||fallback;
        }

        function buildManagerProfilesFromContract(){
            Object.entries(entityData.managers).forEach(([teamId,manager])=>{
                const team=entityData.teams[teamId];
                const current=entityData.currentManagers?.managers?.[teamId];
                const image=current?.imageUrl||(current?.imageFileName?`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(current.imageFileName)}`:'');
                if(!team)return;
                managerProfileData[teamId]={
                    teamId,
                    team:team.koreanName||team.name,
                    name:current?.koreanName||current?.englishName||manager.name,
                    english:current?.englishName||'',
                    birthDate:current?.birthDate||'',
                    image,
                    imageFocus:current?.imageFocus||'50% 18%',
                    imageSourceUrl:current?.imageSourceUrl||current?.sourceUrl||'',
                    nationality:current?.nationalities?.join(', ')||manager.nationality,
                    formation:manager.preferredFormations[0]||team.defaultFormation,
                    identity:manager.identity||manager.style,
                    traits:Array.isArray(manager.traits)?manager.traits:manager.preferredFormations.map(shape=>`${shape} 선호`),
                    style:manager.style,
                    ratings:{},
                    sliders:manager.sliders||{defline:50,width:50,press:50},
                    controlValuesStatus:manager.controlValuesStatus||'unavailable',
                    keyPlayers:Array.isArray(manager.keyPlayers)?manager.keyPlayers:[],
                    career:current?.coachingCareer?.map(item=>({period:item.startDate&&item.endDate?`${item.startDate.slice(0,4)}–${item.endDate.slice(0,4)}`:item.startDate?`${item.startDate.slice(0,4)}–`:item.endDate?`–${item.endDate.slice(0,4)}`:'기간 미확인',club:item.teamName,role:'감독',note:'Wikidata에 등록된 팀 · 감독 관계',sourceUrl:item.sourceUrl}))||[],
                    achievements:Array.isArray(manager.achievements)?manager.achievements:[],
                    principles:Array.isArray(manager.principles)?manager.principles:[],
                    sourceLinks:Array.isArray(manager.sourceLinks)?manager.sourceLinks:[],
                    analysisStatus:manager.analysisStatus||'planned',
                    feedback:manager.analysisStatus?manager.feedback:'출처가 확인된 경기 자료를 기반으로 전술 프로필을 작성할 예정입니다.',
                    dataStatus:team.dataStatus
                };
            });
            const select=document.getElementById('manager-profile-select');
            if(select){delete select.dataset.ready;initialiseManagerProfile();}
        }

        function buildCurrentManagerComparison(){
            const dataset=entityData.currentManagers;if(!dataset?.managers)return;
            const managers=Object.entries(dataset.managers).map(([teamId,facts])=>{
                const team=entityData.teams[teamId]||{},analysis=entityData.managers?.[teamId]||{};
                const image=facts.imageUrl||(facts.imageFileName?`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(facts.imageFileName)}`:'');
                return {id:teamId,name:facts.koreanName||facts.englishName,english:facts.englishName,team:team.koreanName||team.name||teamId,birthDate:facts.birthDate||'—',nationality:facts.nationalities?.join(', ')||'—',height:'—',formation:(analysis.preferredFormations||[]).join(' · ')||team.defaultFormation||'—',identity:analysis.identity||'전술 분석 준비 중',keyIdea:analysis.style||'검증된 전술 설명을 준비 중입니다.',strengths:analysis.traits||[],principles:analysis.principles||[],achievements:analysis.achievements||[],career:facts.coachingCareer||[],analysisStatus:analysis.analysisStatus||'planned',sourceLinks:analysis.sourceLinks||[],metrics:{},image,imageFocus:facts.imageFocus||'50% 18%',imageSelection:facts.imageSelection||'wikidata-p18',sourceUrl:facts.sourceUrl,sourceRevision:facts.sourceRevision,sourceId:dataset.sourceId};
            });
            managerComparisonData.splice(0,managerComparisonData.length,...managers);
            const filter=document.getElementById('manager-team-filter');if(filter)delete filter.dataset.ready;
        }

        function buildTeamComparisonFromExternalFacts(){
            const dataset=entityData.standings;
            if(!dataset?.standings)return;
            const rows=dataset.standings.map(row=>{
                const team=entityData.teams[row.teamId]||{},provider=entityData.teamProviderCrosscheck?.teams?.[row.teamId]||{},squad=entityData.squads?.[row.teamId]||{},manager=entityData.currentManagers?.managers?.[row.teamId]||{},analysis=entityData.managers?.[row.teamId]||{},previous=entityData.teamHistory?.teams?.[row.teamId]||null;
                const recent=(dataset.results||[]).filter(result=>result.homeTeamId===row.teamId||result.awayTeamId===row.teamId).slice(0,5);
                return {id:row.teamId,name:team.koreanName||team.name||row.teamId,englishName:team.name||row.teamId,short:team.shortName||row.teamId.toUpperCase(),badgeUrl:provider.badgeUrl||'',stadium:provider.stadium||'미확정',website:provider.website||'',season:dataset.season,asOf:dataset.asOf,sourceId:dataset.sourceId,sourceUrl:dataset.sourceUrl,formation:(analysis.preferredFormations||[]).join(' · ')||team.defaultFormation||'미확정',manager:manager.koreanName||manager.englishName||'미확정',managerIdentity:analysis.identity||'분석 준비 중',squadSize:(squad.starters||[]).length+(squad.substitutes||[]).length,starterCount:(squad.starters||[]).length,benchCount:(squad.substitutes||[]).length,previous,recent,metrics:{played:row.played,wins:row.wins,draws:row.draws,losses:row.losses,goalsFor:row.goalsFor,goalsAgainst:row.goalsAgainst,goalDifference:row.goalDifference,points:row.points,pointsPerGame:row.played?Math.round(row.points/row.played*100)/100:null,rank:row.rank}};
            });
            teamComparisonData.splice(0,teamComparisonData.length,...rows);
        }

        function buildPeopleComparisonFromExternalFacts(){
            const dataset=entityData.peopleComparison;if(!dataset)return;
            const positionGroupFor=position=>position==='GK'?'goalkeeper':['CB','LB','RB','LWB','RWB'].includes(position)?(position==='CB'?'defender':'fullback'):['DM'].includes(position)?'defensiveMidfielder':['CM','AM','LM','RM'].includes(position)?'midfielder':'forward';
            const canonicalPlayers=Object.entries(entityData.players).map(([id,player])=>{
                const team=entityData.teams[player.teamId]||{},squad=entityData.squads?.[player.teamId]||{},starter=(squad.starters||[]).some(row=>row.id===id),bench=(squad.substitutes||[]).some(row=>row.id===id),standing=currentStanding(player.teamId);
                return {id,name:player.koreanName||player.name,english:player.englishName||player.name,club:team.koreanName||team.name||player.teamId,clubEnglish:team.name||'',teamId:player.teamId,teamRank:standing?.rank||'—',number:player.number??'—',squadRole:starter?'기본 XI 등록':bench?'교체 명단 등록':'1군 스쿼드',position:player.position||'미정',positionGroup:positionGroupFor(player.position),nationality:player.nationality||'미확정',birthDate:player.age?`${player.age}세`:'미확정',height:player.height?`${player.height}cm`:'미확정',foot:player.foot||'미확정',image:player.photoUrl||'',tags:player.positions||[player.position].filter(Boolean),attributes:{},roleStats:{},sourceUrl:player.nameSourceUrl||'',sourceRevision:'현재 EPL 등록 스쿼드',sourceId:player.dataStatus||'canonical-player-contract'};
            });
            playerComparisonData.splice(0,playerComparisonData.length,...canonicalPlayers);
            selectedPlayerIds.clear();const usedTeams=new Set();canonicalPlayers.filter(player=>player.position==='ST').forEach(player=>{if(selectedPlayerIds.size<3&&!usedTeams.has(player.teamId)){selectedPlayerIds.add(player.id);usedTeams.add(player.teamId);}});
            Object.entries(dataset.players).forEach(([id,facts])=>{const player=playerComparisonData.find(item=>item.id===id);if(!player)return;Object.assign(player,{english:facts.englishName,name:facts.koreanName||player.name,birthDate:facts.birthDate,nationality:facts.factWarnings?.nationality?'교차 검증 보류':facts.nationalities.join(', '),height:facts.heightCm?`${facts.heightCm}cm`:'—',club:'소속 검증 보류',foot:'검증 자료 없음',tags:facts.positions,attributes:{},roleStats:{},sourceUrl:facts.sourceUrl,sourceRevision:facts.sourceRevision,sourceId:dataset.sourceId});});
            Object.entries(entityData.playerProviderCrosscheck?.players||{}).forEach(([id,facts])=>{const player=playerComparisonData.find(item=>item.id===id);if(!player)return;Object.assign(player,{club:koreanTeamName(facts.canonicalTeamId,facts.currentTeam)||player.club,clubEnglish:facts.currentTeam||'',teamId:facts.canonicalTeamId||null,position:positionKoreanNames[facts.position]||facts.position||player.position,image:facts.cutoutUrl||facts.thumbnailUrl||'',providerPlayerId:facts.providerPlayerId,providerSourceId:entityData.playerProviderCrosscheck.sourceId,providerAsOf:entityData.playerProviderCrosscheck.asOf});});
            Object.entries(dataset.managers).forEach(([id,facts])=>{const manager=managerComparisonData.find(item=>item.id===id);if(!manager)return;Object.assign(manager,{english:facts.englishName,name:facts.koreanName||manager.name,birthDate:facts.birthDate,nationality:facts.nationalities.join(', '),height:facts.heightCm?`${facts.heightCm}cm`:'—',team:'소속 검증 보류',formation:'—',identity:'외부 전술 데이터 없음',keyIdea:'전술 평가는 검증 가능한 성과 데이터 공급자 연동 후 제공됩니다.',strengths:[],metrics:{},sourceUrl:facts.sourceUrl,sourceRevision:facts.sourceRevision,sourceId:dataset.sourceId});});
            const managerFilter=document.getElementById('manager-team-filter');if(managerFilter)delete managerFilter.dataset.ready;
            const playerFilter=document.getElementById('player-team-filter');if(playerFilter)delete playerFilter.dataset.ready;
        }

        function renderHomeLeagueTable(){
            const table=document.getElementById('home-league-table');
            const status=document.getElementById('home-table-status');
            const source=document.getElementById('home-table-source');
            if(!table||!status||!source)return;
            if(entityData.status==='error'){
                status.textContent='LOAD ERROR';
                status.className='text-[10px] px-2 py-1 rounded-full bg-rose-400/10 border border-rose-400/20 text-rose-300';
                table.innerHTML='<div class="p-6 text-center text-xs text-rose-300">순위 데이터를 불러오지 못했습니다. HTTP 서버 실행 상태를 확인해 주세요.</div>';
                source.textContent='';
                return;
            }
            if(entityData.status!=='ready')return;
            const ranked=entityData.standings?.standings||[];
            table.innerHTML=ranked.map((row,index)=>{
                const team=entityData.teams[row.teamId]||{},provider=entityData.teamProviderCrosscheck?.teams?.[row.teamId]||{},gd=row.goalDifference;
                return `<button type="button" onclick="openTeamProfile('${row.teamId}')" class="w-full grid grid-cols-[36px_1fr_38px_50px_50px] px-4 py-3 text-left hover:bg-white/5 focus:bg-white/5 transition group"><span class="${index<4?'text-eplNeon font-bold':'text-slate-500'}">${row.rank}</span><span class="font-bold truncate group-hover:text-eplNeon flex items-center gap-2">${provider.badgeUrl?`<img src="${escapeHtml(provider.badgeUrl)}" alt="" class="w-5 h-5 object-contain" loading="lazy" referrerpolicy="no-referrer">`:''}<span class="truncate">${escapeHtml(team.koreanName||team.name||row.teamId)}</span></span><span class="text-slate-500">${row.played}</span><span class="text-slate-500">${gd>0?'+':''}${gd}</span><span class="font-bold">${row.points}</span></button>`;
            }).join('');
            status.textContent='RESULTS SYNCED';
            status.className='text-[10px] px-2 py-1 rounded-full bg-eplNeon/10 border border-eplNeon/20 text-eplNeon';
            const collected=new Date(entityData.standings.asOf).toLocaleString('ko-KR');
            source.textContent=`TheSportsDB 완료 경기 ${entityData.standings.completedMatches}개 기준 · ${collected} 갱신`;
        }
        function currentStanding(teamId){return entityData.standings?.standings?.find(row=>row.teamId===teamId)||null;}

        function upcomingMatches(){
            const now=Date.now();
            return [...(entityData.matches?.matches||[])]
                .filter(match=>match.status==='scheduled'&&new Date(match.kickoff).getTime()>now)
                .sort((a,b)=>new Date(a.kickoff)-new Date(b.kickoff));
        }
        function selectedMatch(){
            const rows=entityData.matches?.matches||[];
            return rows.find(match=>match.id===selectedMatchId)||upcomingMatches()[0]||rows[rows.length-1]||null;
        }
        function matchKickoffLabel(match,compact=false){
            if(!match)return '일정 미정';
            return new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',month:'long',day:'numeric',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false,...(compact?{}:{year:'numeric'})}).format(new Date(match.kickoff));
        }
        function teamBadge(teamId){
            const provider=entityData.teamProviderCrosscheck?.teams?.[teamId]||{};
            return provider.badgeUrl?`<img src="${escapeHtml(provider.badgeUrl)}" alt="" class="w-16 h-16 object-contain" loading="lazy" referrerpolicy="no-referrer">`:'<i class="fa-solid fa-shield-halved"></i>';
        }
        function renderHomeVerifiedContent(){
            const status=document.getElementById('home-data-status'),results=document.getElementById('home-recent-results');if(!status||!results)return;
            const updated=new Date(entityData.standings.asOf).toLocaleString('ko-KR');
            status.innerHTML=`<div class="flex justify-between"><span>시즌 일정</span><strong class="text-white">380경기</strong></div><div class="flex justify-between"><span>완료 결과</span><strong class="text-eplNeon">${entityData.standings.completedMatches}경기</strong></div><div class="flex justify-between"><span>최근 갱신</span><strong class="text-white">${escapeHtml(updated)}</strong></div><p class="mt-2 text-[10px] text-slate-500">뉴스·추천 콘텐츠 없이 검증 가능한 일정과 결과만 표시합니다.</p>`;
            results.innerHTML=(entityData.standings.results||[]).slice(0,6).map(row=>`<button onclick="openTeamProfile('${row.homeTeamId}')" class="rounded-2xl border border-white/5 bg-white/[.025] p-5 text-left hover:border-eplNeon/20 transition"><div class="text-[10px] text-slate-500">${escapeHtml(row.date)} · 경기 종료</div><div class="mt-4 grid grid-cols-[1fr_auto] gap-3 text-sm"><span>${escapeHtml(matchTeamLabel(row.homeTeamId))}</span><strong>${row.homeScore}</strong><span>${escapeHtml(matchTeamLabel(row.awayTeamId))}</span><strong>${row.awayScore}</strong></div></button>`).join('');
        }
        function chooseMatch(matchId,target='hub'){
            if(!(entityData.matches?.matches||[]).some(match=>match.id===matchId))return;
            selectedMatchId=matchId;
            if(target==='compare')return openFeaturedMatch('compare');
            openMatchHub();
        }
        function renderMatchHubSummary(){
            const root=document.getElementById('match-hub-summary'),match=selectedMatch();if(!root||!match)return;
            const home=entityData.teams[match.homeTeamId]||{},away=entityData.teams[match.awayTeamId]||{};
            root.innerHTML=`<div class="flex flex-wrap items-center justify-between gap-3"><div><span class="text-[10px] tracking-[.22em] uppercase text-eplNeon font-bold">Premier League · Matchweek ${match.matchday}</span><p class="text-xs text-slate-400 mt-2">${escapeHtml(matchKickoffLabel(match))} · ${escapeHtml(match.venue||'경기장 미정')}</p></div><span class="px-3 py-1.5 rounded-full bg-eplNeon/10 border border-eplNeon/20 text-[10px] font-bold text-eplNeon">실제 공식 일정 연동</span></div><div class="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-10 mt-8"><button onclick="openTeamProfile('${match.homeTeamId}')" class="text-center hover:text-eplNeon transition"><div class="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-cyan-300/10 border border-cyan-300/20 grid place-items-center text-cyan-300 text-4xl">${teamBadge(match.homeTeamId)}</div><h2 class="font-urban text-xl md:text-3xl font-extrabold mt-4">${escapeHtml(home.koreanName||home.name)}</h2><p class="text-xs text-slate-500 mt-1">홈 · ${escapeHtml(home.defaultFormation||'포메이션 미정')}</p></button><div class="text-center"><div class="text-4xl md:text-6xl font-black text-slate-700">VS</div><div class="mt-2 text-[10px] tracking-widest text-slate-500">MATCH HUB</div></div><button onclick="openTeamProfile('${match.awayTeamId}')" class="text-center hover:text-eplNeon transition"><div class="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-rose-400/10 border border-rose-400/20 grid place-items-center text-rose-300 text-4xl">${teamBadge(match.awayTeamId)}</div><h2 class="font-urban text-xl md:text-3xl font-extrabold mt-4">${escapeHtml(away.koreanName||away.name)}</h2><p class="text-xs text-slate-500 mt-1">원정 · ${escapeHtml(away.defaultFormation||'포메이션 미정')}</p></button></div>`;
            renderMatchHubContent();
        }
        function renderMatchHubContent(){
            const root=document.getElementById('match-hub-live-content'),match=selectedMatch();if(!root||!match||!entityData.standings)return;
            const teamIds=[match.homeTeamId,match.awayTeamId],table=entityData.standings.standings||[],results=entityData.standings.results||[];
            const teamPanel=(teamId,tint)=>{const team=entityData.teams[teamId]||{},row=table.find(item=>item.teamId===teamId)||{},manager=entityData.currentManagers?.managers?.[teamId]||{},squad=entityData.squads?.[teamId]||{},recent=results.filter(item=>item.homeTeamId===teamId||item.awayTeamId===teamId).slice(0,5);const form=recent.map(item=>{const home=item.homeTeamId===teamId,scored=home?item.homeScore:item.awayScore,conceded=home?item.awayScore:item.homeScore;return scored>conceded?'W':scored<conceded?'L':'D';});return `<article class="rounded-2xl border border-${tint}-400/15 bg-${tint}-400/[.035] p-6"><div class="flex items-start justify-between gap-4"><div><div class="text-[10px] uppercase tracking-[.2em] text-${tint}-300">${teamId===match.homeTeamId?'Home':'Away'} team</div><button onclick="openTeamProfile('${teamId}')" class="font-urban text-2xl font-extrabold mt-1 hover:text-eplNeon">${escapeHtml(team.koreanName||team.name)}</button></div><div class="w-14 h-14 grid place-items-center">${teamBadge(teamId)}</div></div><div class="grid grid-cols-4 gap-2 mt-6 text-center"><div class="rounded-xl bg-black/20 p-3"><strong class="text-xl">${row.rank||'—'}</strong><span class="block text-[10px] text-slate-500 mt-1">순위</span></div><div class="rounded-xl bg-black/20 p-3"><strong class="text-xl">${row.played??0}</strong><span class="block text-[10px] text-slate-500 mt-1">경기</span></div><div class="rounded-xl bg-black/20 p-3"><strong class="text-xl">${row.goalDifference>0?'+':''}${row.goalDifference??0}</strong><span class="block text-[10px] text-slate-500 mt-1">득실</span></div><div class="rounded-xl bg-black/20 p-3"><strong class="text-xl">${row.points??0}</strong><span class="block text-[10px] text-slate-500 mt-1">승점</span></div></div><div class="mt-5 flex items-center justify-between gap-3"><span class="text-xs text-slate-400">감독</span><strong class="text-sm">${escapeHtml(manager.koreanName||manager.englishName||'미확정')}</strong></div><div class="mt-3 flex items-center justify-between gap-3"><span class="text-xs text-slate-400">최근 결과</span><div class="flex gap-1">${form.length?form.map(value=>`<span class="form-dot ${value==='W'?'bg-emerald-500':value==='L'?'bg-rose-500':'bg-slate-500'}">${value}</span>`).join(''):'<span class="text-xs text-slate-600">아직 없음</span>'}</div></div><div class="mt-3 flex items-center justify-between gap-3"><span class="text-xs text-slate-400">선발 상태</span><strong class="text-xs text-amber-200">${squad.selectionStatus==='official-starting-lineup'?'공식 선발 발표':'공식 발표 전'}</strong></div></article>`;};
            root.innerHTML=`<div class="grid grid-cols-1 xl:grid-cols-2 gap-6">${teamPanel(teamIds[0],'cyan')}${teamPanel(teamIds[1],'rose')}</div><article class="rounded-2xl border border-white/5 bg-white/[.025] p-6"><div class="flex flex-col md:flex-row md:items-center justify-between gap-4"><div><div class="text-[10px] uppercase tracking-[.2em] text-eplNeon">Availability</div><h3 class="font-urban text-2xl font-extrabold mt-1">현재 제공 가능한 경기 정보</h3><p class="text-xs text-slate-500 mt-2">실제 일정·순위·결과는 연결됨. 공식 선발은 발표 전까지 표시하지 않습니다.</p></div><div class="flex flex-wrap gap-2"><span class="px-3 py-2 rounded-lg bg-eplNeon/10 text-eplNeon text-xs font-bold">일정 연결</span><span class="px-3 py-2 rounded-lg bg-eplNeon/10 text-eplNeon text-xs font-bold">순위 연결</span><span class="px-3 py-2 rounded-lg bg-eplNeon/10 text-eplNeon text-xs font-bold">최근 결과 연결</span><span class="px-3 py-2 rounded-lg bg-amber-300/10 text-amber-200 text-xs font-bold">선발 대기</span></div></div></article>`;
        }
        function renderHomeMatches(){
            if(entityData.status!=='ready')return;
            const matches=upcomingMatches();if(!selectedMatchId&&matches[0])selectedMatchId=matches[0].id;
            const featured=selectedMatch(),hero=document.getElementById('home-featured-match'),cards=document.getElementById('home-upcoming-matches'),ticker=document.getElementById('home-match-ticker');
            if(!featured||!hero||!cards)return;
            const home=entityData.teams[featured.homeTeamId]||{},away=entityData.teams[featured.awayTeamId]||{};
            hero.innerHTML=`<div class="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-eplNeon/10 blur-3xl"></div><div class="relative flex items-start justify-between gap-4"><div><div class="text-[10px] uppercase tracking-[0.22em] text-eplNeon font-extrabold">Next Premier League match</div><h2 class="font-urban text-3xl md:text-5xl font-extrabold mt-3">${escapeHtml(home.koreanName||home.name)} <span class="text-slate-600">vs</span> ${escapeHtml(away.koreanName||away.name)}</h2><p class="mt-3 text-sm text-slate-400">실제 2026-27 공식 일정 · ${escapeHtml(featured.venue||'경기장 미정')}</p></div><span class="shrink-0 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300">${escapeHtml(matchKickoffLabel(featured,true))}</span></div><div class="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-5 py-8"><button onclick="openTeamProfile('${featured.homeTeamId}')" class="text-center md:text-left hover:text-eplNeon transition"><div class="mx-auto md:mx-0 w-20 h-20 rounded-2xl bg-cyan-300/10 border border-cyan-300/20 grid place-items-center text-cyan-300 text-3xl">${teamBadge(featured.homeTeamId)}</div><div class="font-urban text-2xl font-extrabold mt-4">${escapeHtml(home.koreanName||home.name)}</div><div class="text-xs text-slate-500 mt-1">${escapeHtml(home.defaultFormation||'포메이션 미정')}</div></button><div class="text-center"><div class="text-5xl font-black text-slate-700">VS</div><div class="text-[10px] text-slate-500 mt-2">MATCHWEEK ${featured.matchday}</div></div><button onclick="openTeamProfile('${featured.awayTeamId}')" class="text-center md:text-right hover:text-eplNeon transition"><div class="mx-auto md:ml-auto md:mr-0 w-20 h-20 rounded-2xl bg-rose-400/10 border border-rose-400/20 grid place-items-center text-rose-300 text-3xl">${teamBadge(featured.awayTeamId)}</div><div class="font-urban text-2xl font-extrabold mt-4">${escapeHtml(away.koreanName||away.name)}</div><div class="text-xs text-slate-500 mt-1">${escapeHtml(away.defaultFormation||'포메이션 미정')}</div></button></div><button onclick="openMatchHub()" class="relative w-full mb-3 py-4 rounded-xl bg-gradient-to-r from-eplPurple/80 to-cyan-500/30 border border-eplNeon/20 text-sm font-extrabold hover:border-eplNeon/50 transition"><i class="fa-solid fa-circle-nodes mr-2 text-eplNeon"></i>경기 허브 열기</button><div class="relative grid grid-cols-1 sm:grid-cols-3 gap-3"><button onclick="openFeaturedMatch('compare')" class="py-3.5 rounded-xl bg-eplNeon text-slate-950 text-sm font-extrabold">매치 비교</button><button onclick="openFeaturedMatch('lineup')" class="py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm font-bold">라인업</button><button onclick="openFeaturedMatch('data')" class="py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm font-bold">팀 데이터</button></div>`;
            cards.innerHTML=matches.slice(0,3).map(match=>`<button onclick="chooseMatch('${match.id}')" class="text-left rounded-2xl border border-white/5 bg-white/[.025] p-5 hover:border-eplNeon/25 hover:-translate-y-1 transition"><div class="flex justify-between gap-3 text-[10px] text-slate-500"><span>${escapeHtml(matchKickoffLabel(match,true))}</span><span class="truncate">${escapeHtml(match.venue||'미정')}</span></div><div class="mt-5 flex items-center justify-between gap-2 text-base font-bold"><span>${escapeHtml(matchTeamLabel(match.homeTeamId))}</span><span class="text-slate-600">VS</span><span class="text-right">${escapeHtml(matchTeamLabel(match.awayTeamId))}</span></div><div class="mt-4 text-xs text-eplNeon font-bold">MATCH HUB 열기</div></button>`).join('');
            if(ticker)ticker.innerHTML=matches.slice(0,5).map(match=>`<button onclick="chooseMatch('${match.id}')" class="hover:text-white"><b class="text-white">${escapeHtml(entityData.teams[match.homeTeamId]?.shortName||match.homeTeamId.toUpperCase())}</b> ${escapeHtml(matchKickoffLabel(match,true))} <b class="text-white">${escapeHtml(entityData.teams[match.awayTeamId]?.shortName||match.awayTeamId.toUpperCase())}</b></button>`).join('');
            renderMatchHubSummary();
        }

        async function initialiseEntityData(){
            if(entityData.readyPromise)return entityData.readyPromise;
            entityData.status='loading';
            entityData.readyPromise=Promise.all(['teams','players','managers','managers-current','squads','roles','formations','matches','standings','team-history','first-match-lineups','people-comparison','player-provider-crosscheck','team-provider-crosscheck'].map(fetchEntityJson))
                .then(([teams,players,managers,currentManagers,squads,roles,formations,matches,standings,teamHistory,firstMatchLineups,peopleComparison,playerProviderCrosscheck,teamProviderCrosscheck])=>{
                    entityData.teams=teams;entityData.players=players;entityData.managers=managers;entityData.currentManagers=currentManagers;entityData.squads=squads;entityData.roles=roles;entityData.formations=formations;entityData.matches=matches;entityData.standings=standings;entityData.teamHistory=teamHistory;entityData.firstMatchLineups=firstMatchLineups;entityData.teamComparison=null;entityData.peopleComparison=peopleComparison;entityData.playerProviderCrosscheck=playerProviderCrosscheck;entityData.teamProviderCrosscheck=teamProviderCrosscheck;
                    Object.assign(formationsMap,formations);
                    buildTeamComparisonFromExternalFacts();
                    buildPeopleComparisonFromExternalFacts();
                    buildCurrentManagerComparison();
                    entityData.status='ready';entityData.error=null;
                    renderHomeLeagueTable();
                    renderHomeMatches();
                    renderHomeVerifiedContent();
                    renderManagerComparison();
                    renderPlayerComparison();
                    buildManagerProfilesFromContract();
                    initMatchCompare();
                    renderTacticalTeamFinder();
                    if(!entityData.teams[currentTeam])currentTeam=Object.keys(entityData.teams)[0]||'arsenal';
                    changeTeam(currentTeam,false);
                    restoreEntityRoute();
                    return entityData;
                })
                .catch(error=>{
                    entityData.status='error';entityData.error=error;
                    console.error('Entity data load failed',error);
                    renderHomeLeagueTable();
                    renderHomeSearch();
                    return entityData;
                });
            return entityData.readyPromise;
        }

        function getContractPlayers(){
            return Object.entries(entityData.players).map(([id,player])=>{
                const team=entityData.teams[player.teamId];
                const comparison=playerComparisonData.find(item=>normalisePersonName(item.english)===normalisePersonName(player.name));
                return {
                    id,
                    comparisonId:comparison?.id||null,
                    teamId:player.teamId,
                    club:team?.koreanName||team?.name||'소속 미확정',
                    name:comparison?.name||player.koreanName||player.name,
                    english:player.englishName||player.name,
                    number:player.number,
                    position:player.position,
                    positions:player.positions,
                    nationality:player.nationality,
                    age:player.age,
                    birthDate:player.age==null?'미확정':`${player.age}세 · ${entityData.teams[player.teamId]?.dataStatus||'prototype'} snapshot`,
                    height:player.height==null?'미확정':`${player.height} cm`,
                    foot:player.foot||'미확정',
                    nameLocalizationSource:player.nameLocalizationSource||'unverified-use-english',
                    tags:player.positions,
                    attributes:{},
                    positionGroup:'',
                    roleStats:{}
                };
            });
        }

        function setSearchExpanded(expanded){
            document.getElementById('home-global-search')?.setAttribute('aria-expanded',String(expanded));
        }

        function getHomeSearchItems(){
            const tools = [
                {label:'전술 보드',meta:'기능 · 팀 포메이션 편집',type:'view',target:'tactical',icon:'fa-chess-board'},
                {label:'매치 비교',meta:'기능 · 두 팀 전술·스쿼드 비교',type:'view',target:'matchCompare',icon:'fa-futbol'},
                {label:'감독 비교',meta:'기능 · 감독 철학과 지표 비교',type:'view',target:'compare',icon:'fa-code-compare'},
                {label:'팀 비교',meta:'기능 · 팀 스타일 비교',type:'view',target:'teamCompare',icon:'fa-shield-halved'},
                {label:'선수 비교',meta:'기능 · 선수 데이터 비교',type:'view',target:'playerCompare',icon:'fa-person-running'}
            ];
            const players = getContractPlayers().filter(p=>p.nameLocalizationSource!=='unverified-use-english').map(p=>({label:p.name,meta:`선수 · ${p.club} · ${p.position}`,type:'player',target:p.id,icon:'fa-person-running'}));
            const managers = Object.entries(entityData.currentManagers?.managers||{}).map(([teamId,m])=>({label:m.koreanName||m.englishName,meta:`감독 · ${entityData.teams[teamId]?.koreanName||entityData.teams[teamId]?.name||teamId}`,type:'manager',target:teamId,icon:'fa-user-tie'}));
            const teams = getAllTeams().map(t=>({label:t.name,sub:`${t.koreanName||''} ${t.short}`,meta:`팀 · ${t.manager} · ${t.formation}`,type:'team',target:t.id,icon:'fa-shield-halved'}));
            return [...players,...managers,...teams,...tools];
        }
        function renderHomeSearch(){
            const input=document.getElementById('home-global-search'),box=document.getElementById('home-search-results');
            if(!input||!box)return;
            const q=input.value.toLowerCase().trim();
            if(!q){box.classList.add('hidden');box.innerHTML='';homeSearchRows=[];homeSearchIndex=-1;setSearchExpanded(false);return;}
            if(entityData.status==='idle')initialiseEntityData();
            if(entityData.status==='loading'){
                box.innerHTML='<div role="status" class="p-5 text-center text-xs text-slate-400"><i class="fa-solid fa-spinner fa-spin mr-2"></i>계약 데이터를 불러오는 중입니다.</div>';
                box.classList.remove('hidden');setSearchExpanded(true);return;
            }
            if(entityData.status==='error'){
                box.innerHTML='<div role="alert" class="p-5 text-center text-xs text-rose-300">데이터를 불러오지 못했습니다. HTTP 서버로 실행한 뒤 다시 시도해 주세요.<button type="button" onclick="retryEntityData()" class="block mx-auto mt-3 text-eplNeon font-bold">다시 시도</button></div>';
                box.classList.remove('hidden');setSearchExpanded(true);return;
            }
            homeSearchRows=getHomeSearchItems().filter(x=>`${x.label} ${x.sub||''} ${x.meta}`.toLowerCase().includes(q)).slice(0,8);
            homeSearchIndex=-1;
            box.innerHTML=homeSearchRows.length?homeSearchRows.map((x,index)=>`<button id="home-search-option-${index}" role="option" aria-selected="false" onclick="openHomeSearchResult('${x.type}','${x.target}')" class="w-full flex items-center gap-3 p-3.5 border-b border-white/5 last:border-0 hover:bg-white/5 focus:bg-white/5 text-left"><span class="w-9 h-9 rounded-lg bg-white/5 grid place-items-center text-eplNeon"><i class="fa-solid ${x.icon}"></i></span><span class="min-w-0"><strong class="block text-sm truncate">${escapeHtml(x.label)}</strong><span class="text-[11px] text-slate-500">${escapeHtml(x.meta)}</span></span></button>`).join(''):'<div role="status" class="p-5 text-center text-xs text-slate-500">검색 결과가 없습니다.</div>';
            box.classList.remove('hidden');setSearchExpanded(true);
        }
        function handleHomeSearchKeydown(event){
            if(event.key==='Escape'){
                document.getElementById('home-search-results')?.classList.add('hidden');setSearchExpanded(false);return;
            }
            if(!['ArrowDown','ArrowUp','Enter'].includes(event.key)||!homeSearchRows.length)return;
            if(event.key==='Enter'&&homeSearchIndex<0)return;
            event.preventDefault();
            if(event.key==='ArrowDown')homeSearchIndex=(homeSearchIndex+1)%homeSearchRows.length;
            if(event.key==='ArrowUp')homeSearchIndex=(homeSearchIndex-1+homeSearchRows.length)%homeSearchRows.length;
            if(event.key==='Enter')return openHomeSearchResult(homeSearchRows[homeSearchIndex].type,homeSearchRows[homeSearchIndex].target);
            document.querySelectorAll('#home-search-results [role="option"]').forEach((option,index)=>{
                const active=index===homeSearchIndex;option.setAttribute('aria-selected',String(active));option.classList.toggle('bg-white/5',active);
                if(active){document.getElementById('home-global-search')?.setAttribute('aria-activedescendant',option.id);option.scrollIntoView({block:'nearest'});}
            });
        }
        async function retryEntityData(){entityData.readyPromise=null;entityData.error=null;await initialiseEntityData();renderHomeSearch();}
        async function openHomeSearchResult(type,target){
            if(entityData.status!=='ready')await initialiseEntityData();
            if(entityData.status!=='ready')return showToast('데이터를 불러오지 못해 상세 화면을 열 수 없습니다.');
            document.getElementById('home-search-results')?.classList.add('hidden');
            setSearchExpanded(false);
            if(type==='player') return openPlayerProfile(target);
            if(type==='team') return openTeamProfile(target);
            if(type==='manager') return openManagerProfile(target);
            switchView(target);
        }

        document.addEventListener('DOMContentLoaded',initialiseEntityData);

        function setFeaturedMatchTeams(){
            initMatchCompare();
            const match=selectedMatch();
            const home=document.getElementById('match-home-team');
            const away=document.getElementById('match-away-team');
            if(home) home.value=match?.homeTeamId||'arsenal';
            if(away) away.value=match?.awayTeamId||'liverpool';
            const homeFormation=document.getElementById('match-home-formation');
            const awayFormation=document.getElementById('match-away-formation');
            if(homeFormation) homeFormation.value=entityData.teams?.[match?.homeTeamId]?.defaultFormation||'4-3-3';
            if(awayFormation) awayFormation.value=entityData.teams?.[match?.awayTeamId]?.defaultFormation||'4-3-3';
            if(home)handleMatchTeamChange('home',false);
            if(away)handleMatchTeamChange('away',false);
        }

        function openFeaturedMatch(mode){
            if(mode==='data'){
                const match=selectedMatch();
                selectedTeamIds.clear();
                if(match){selectedTeamIds.add(match.homeTeamId);selectedTeamIds.add(match.awayTeamId);}
                switchView('teamCompare');
                renderTeamComparison();
                return;
            }
            setFeaturedMatchTeams();
            switchView('matchCompare');
            renderMatchCompare();
            if(mode==='lineup'){
                document.getElementById('match-compare-view')?.scrollIntoView({behavior:'smooth',block:'start'});
                const match=selectedMatch();showToast(`${matchTeamLabel(match?.homeTeamId)}과 ${matchTeamLabel(match?.awayTeamId)}의 라인업 화면을 열었습니다.`);
            }
        }


        async function openMatchHub(){
            if(entityData.status!=='ready')await initialiseEntityData();
            renderMatchHubSummary();
            switchView('matchHub');
            window.scrollTo({top:0,behavior:'smooth'});
        }
        function openHubFeature(type){
            if(type==='lineup') return openFeaturedMatch('lineup');
            if(type==='tactical'){
                const teamId=document.getElementById('match-home-team')?.value||'arsenal';
                if(typeof changeTeam==='function')changeTeam(teamId);
                switchView('tactical');
                return;
            }
            if(type==='team') return openFeaturedMatch('data');
            if(type==='manager'){
                const match=selectedMatch();selectedManagerIds.clear();
                if(match){selectedManagerIds.add(match.homeTeamId);selectedManagerIds.add(match.awayTeamId);}
                switchView('compare');renderManagerComparison();return;
            }
            if(type==='player') return switchView('playerCompare');
        }
        function openKeyBattle(firstId, secondId){
            selectedPlayerIds.clear();
            if(firstId) selectedPlayerIds.add(firstId);
            if(secondId && playerComparisonData.some(p=>p.id===secondId)) selectedPlayerIds.add(secondId);
            switchView('playerCompare');
            showToast('Key Battle 선수 비교 화면을 열었습니다. 실제 스쿼드 데이터 연동 후 양 팀 선수가 자동 선택됩니다.');
        }

        function switchView(viewName) {
            const views = {
                home: document.getElementById('home-view'),
                manager: document.getElementById('manager-view'),
                player: document.getElementById('player-view'),
                team: document.getElementById('team-view'),
                matchHub: document.getElementById('match-hub-view'),
                tactical: document.getElementById('tactical-view'),
                compare: document.getElementById('compare-view'),
                teamCompare: document.getElementById('team-compare-view'),
                playerCompare: document.getElementById('player-compare-view'),
                roleGuide: document.getElementById('role-guide-view'),
                matchCompare: document.getElementById('match-compare-view')
            };
            const tabs = {
                home: document.getElementById('tab-home'),
                manager: document.getElementById('tab-manager'),
                matchHub: document.getElementById('tab-match-hub'),
                tactical: document.getElementById('tab-tactical'),
                compare: document.getElementById('tab-compare'),
                teamCompare: document.getElementById('tab-team-compare'),
                playerCompare: document.getElementById('tab-player-compare'),
                roleGuide: document.getElementById('tab-role-guide'),
                matchCompare: document.getElementById('tab-match-compare')
            };
            Object.entries(views).forEach(([key, el]) => el?.classList.toggle('hidden', key !== viewName));
            Object.entries(tabs).forEach(([key, el]) => el?.classList.toggle('active', key === viewName));
            if (viewName === 'manager') renderManagerProfile(activeManagerProfileKey);
            if (viewName === 'compare') renderManagerComparison();
            if (viewName === 'teamCompare') renderTeamComparison();
            if (viewName === 'playerCompare') renderPlayerComparison();
            if (viewName === 'roleGuide') initialiseRoleGuide();
            if (viewName === 'matchCompare') renderMatchCompare();
        }

        function renderManagerSelector() {
            const selector=document.getElementById('manager-selector'),count=document.getElementById('selected-manager-count'),guide=document.getElementById('manager-selection-guide'),teamFilter=document.getElementById('manager-team-filter');
            if(!selector||!count||!guide)return;
            if(teamFilter&&!teamFilter.dataset.ready){const teams=[...new Set(managerComparisonData.map(m=>m.team))].sort();teamFilter.innerHTML='<option value="All">모든 팀</option>'+teams.map(t=>`<option>${t}</option>`).join('');teamFilter.dataset.ready='1';}
            const q=(document.getElementById('manager-search')?.value||'').toLowerCase().trim(),team=teamFilter?.value||'All';
            const filtered=managerComparisonData.filter(m=>(team==='All'||m.team===team)&&(!q||`${m.name} ${m.english} ${m.team}`.toLowerCase().includes(q)));
            selector.innerHTML=filtered.length?filtered.map(manager=>{const selected=selectedManagerIds.has(manager.id),disabled=!selected&&selectedManagerIds.size>=MAX_MANAGER_SELECTION;const portrait=manager.image?`<img src="${manager.image}" alt="${manager.name} 감독 프로필" class="w-12 h-14 shrink-0 rounded-lg border border-white/10 bg-slate-900 object-cover" style="object-position:${manager.imageFocus}" loading="lazy" referrerpolicy="no-referrer">`:'<div class="w-12 h-14 shrink-0 rounded-lg border border-dashed border-white/10 bg-white/5 flex items-center justify-center text-slate-600"><i class="fa-solid fa-user-tie"></i></div>';return `<button type="button" onclick="toggleManagerSelection('${manager.id}')" class="text-left rounded-xl border p-4 transition-all ${selected?'bg-eplNeon/10 border-eplNeon/40 shadow-lg shadow-eplNeon/5':'bg-white/[0.025] border-white/5 hover:bg-white/5 hover:border-white/10'} ${disabled?'opacity-45 cursor-not-allowed':''}"><div class="flex items-start justify-between gap-3"><div class="flex items-center gap-3">${portrait}<div><span class="text-[10px] font-mono text-eplNeon">${manager.team}</span><h4 class="font-bold text-sm text-white mt-1">${manager.name}</h4><p class="text-[11px] text-slate-500">${manager.english}</p></div></div><span class="w-6 h-6 rounded-full border flex items-center justify-center ${selected?'bg-eplNeon border-eplNeon text-slate-950':'border-white/15 text-transparent'}"><i class="fa-solid fa-check text-[10px]"></i></span></div><div class="mt-3 flex items-center justify-between gap-2"><span class="text-[11px] text-slate-400 truncate">${manager.identity}</span><span class="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-300">${manager.formation}</span></div></button>`}).join(''):'<div class="col-span-full p-8 text-center text-xs text-slate-600">검색 결과가 없습니다.</div>';
            count.textContent=`${selectedManagerIds.size} / ${MAX_MANAGER_SELECTION} 선택`;guide.textContent=selectedManagerIds.size===0?'감독을 1명 이상 선택하세요.':selectedManagerIds.size===MAX_MANAGER_SELECTION?'최대 3명의 감독이 선택되었습니다.':`감독을 ${MAX_MANAGER_SELECTION-selectedManagerIds.size}명 더 선택할 수 있습니다.`;
        }

        function toggleManagerSelection(managerId) {
            if (selectedManagerIds.has(managerId)) {
                selectedManagerIds.delete(managerId);
            } else {
                if (selectedManagerIds.size >= MAX_MANAGER_SELECTION) {
                    showToast('감독은 최대 3명까지 선택할 수 있습니다.');
                    return;
                }
                selectedManagerIds.add(managerId);
            }
            renderManagerComparison();
        }

        function resetManagerSelection() {
            selectedManagerIds.clear();
            renderManagerComparison();
        }

        function renderManagerComparison() {
            const cards = document.getElementById('manager-cards');
            const metrics = document.getElementById('comparison-metrics');
            const summary = document.getElementById('manager-summary');
            const empty = document.getElementById('empty-comparison');
            const content = document.getElementById('comparison-content');
            if (!cards || !metrics || !summary || !empty || !content) return;

            renderManagerSelector();
            const selectedManagers = managerComparisonData.filter(manager => selectedManagerIds.has(manager.id));
            const hasSelection = selectedManagers.length > 0;
            empty.classList.toggle('hidden', hasSelection);
            content.classList.toggle('hidden', !hasSelection);
            cards.classList.toggle('hidden', !hasSelection);

            if (!hasSelection) {
                cards.innerHTML = '';
                metrics.innerHTML = '';
                summary.innerHTML = '';
                return;
            }

            cards.className = 'p-6';
            const managerColumns=`minmax(150px,.8fr) repeat(${selectedManagers.length},minmax(210px,1fr))`;
            cards.innerHTML=`<div class="overflow-x-auto rounded-2xl border border-white/5 bg-slate-950/40"><div class="min-w-[760px]">
                <div class="grid border-b border-white/5" style="grid-template-columns:${managerColumns}"><div class="p-4 bg-white/[.02] text-[10px] font-mono uppercase tracking-widest text-slate-500">Manager Profile</div>${selectedManagers.map((m,i)=>`<div class="p-4 border-l border-white/5 relative"><div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${managerBarClasses[i]}"></div><button onclick="openManagerFromComparison('${m.id}')" class="flex items-center gap-3 text-left hover:text-eplNeon transition">${m.image?`<img src="${m.image}" alt="${m.name} 감독 프로필" class="w-14 h-[68px] shrink-0 rounded-xl border border-white/10 bg-slate-900 object-cover" style="object-position:${m.imageFocus}" loading="lazy" referrerpolicy="no-referrer">`:'<div class="w-14 h-[68px] shrink-0 rounded-xl border border-dashed border-white/10 bg-white/5 flex items-center justify-center text-slate-600"><i class="fa-solid fa-user-tie"></i></div>'}<span><strong class="block">${m.name}</strong><span class="block text-[11px] text-slate-500 mt-1">${m.english}</span></span></button></div>`).join('')}</div>
                ${[['소속팀',m=>m.team],['선호 포메이션',m=>m.formation],['전술 정체성',m=>m.identity],['생년월일',m=>m.birthDate],['국적',m=>m.nationality],['지도 경력 구간',m=>`${m.career.length}개`]].map(([l,getValue])=>`<div class="grid border-b border-white/5" style="grid-template-columns:${managerColumns}"><div class="px-4 py-3 bg-white/[.015] text-xs font-semibold text-slate-400">${l}</div>${selectedManagers.map(m=>`<div class="px-4 py-3 border-l border-white/5 text-sm text-slate-200">${escapeHtml(getValue(m))}</div>`).join('')}</div>`).join('')}
                <div class="grid" style="grid-template-columns:${managerColumns}"><div class="px-4 py-4 bg-white/[.015] text-xs font-semibold text-slate-400">출처</div>${selectedManagers.map(m=>`<div class="px-4 py-4 border-l border-white/5"><a href="${m.sourceUrl}" target="_blank" rel="noopener noreferrer" class="text-xs text-eplNeon hover:underline">Wikidata ${m.sourceRevision}</a></div>`).join('')}</div>
            </div></div>`;

            metrics.innerHTML = `<div class="grid grid-cols-1 gap-4" style="grid-template-columns:repeat(${selectedManagers.length},minmax(0,1fr))">${selectedManagers.map((manager,index)=>`<article class="rounded-xl border border-white/5 bg-white/[.025] p-5"><div class="flex items-center justify-between gap-3"><h4 class="font-bold text-white">${escapeHtml(manager.name)}</h4><span class="text-[10px] text-eplNeon">${manager.analysisStatus.startsWith('reviewed')?'REVIEWED':'PARTIAL'}</span></div><div class="mt-4"><div class="text-[10px] uppercase tracking-widest text-slate-500">전술 정체성</div><p class="text-sm text-eplNeon font-bold mt-1">${escapeHtml(manager.identity)}</p><p class="text-xs text-slate-400 leading-5 mt-3">${escapeHtml(manager.keyIdea)}</p></div><div class="mt-4 flex flex-wrap gap-2">${manager.strengths.length?manager.strengths.map(item=>`<span class="px-2 py-1 rounded-md bg-white/5 text-[10px] text-slate-300">${escapeHtml(item)}</span>`).join(''):'<span class="text-xs text-slate-600">전술 특징 검토 중</span>'}</div><div class="mt-5 space-y-3">${manager.principles.map(item=>`<div class="border-l-2 border-eplNeon/30 pl-3"><strong class="block text-xs text-white">${escapeHtml(item[0])}</strong><p class="text-[11px] text-slate-500 leading-5 mt-1">${escapeHtml(item[1])}</p></div>`).join('')}</div></article>`).join('')}</div>`;
            /* Object.keys(metricLabels).map(metricKey => `
                <div>
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-sm font-semibold text-slate-200">${metricLabels[metricKey]}</span>
                        <span class="text-[10px] text-slate-600 font-mono">TACTICAL INDEX</span>
                    </div>
                    <div class="space-y-2.5">
                        ${selectedManagers.map((manager, index) => `
                            <div class="grid grid-cols-[92px_1fr_34px] md:grid-cols-[140px_1fr_42px] gap-3 items-center">
                                <span class="text-xs text-slate-400 truncate">${manager.name}</span>
                                <div class="h-2.5 rounded-full bg-white/5 overflow-hidden">
                                    <div class="metric-bar h-full rounded-full bg-gradient-to-r ${managerBarClasses[index]}" style="width:${manager.metrics[metricKey]}%"></div>
                                </div>
                                <span class="text-xs font-mono font-bold text-white text-right">${manager.metrics[metricKey]}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join(''); */

            summary.className = `px-6 pb-6 grid grid-cols-1 gap-4 ${selectedManagers.length === 1 ? 'md:grid-cols-1' : selectedManagers.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`;
            summary.innerHTML = selectedManagers.map((manager, index) => `
                <article class="rounded-xl border border-white/5 bg-white/[0.025] p-4">
                    <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-gradient-to-r ${managerBarClasses[index]}"></span>
                        <h4 class="font-bold text-sm text-white">${manager.name} 경력·성과</h4>
                    </div>
                    <p class="text-xs text-slate-400 leading-relaxed mt-3">지도 경력 ${manager.career.length}개 구간 · 검토된 주요 성과 ${manager.achievements.length}개</p><div class="mt-3 space-y-2">${manager.achievements.slice(0,3).map(item=>`<div class="text-[11px] text-slate-300 flex gap-2"><i class="fa-solid fa-trophy text-amber-300 mt-0.5"></i><span>${escapeHtml(item)}</span></div>`).join('')||'<span class="text-[11px] text-slate-600">검증된 성과 자료를 준비 중입니다.</span>'}</div>${manager.sourceLinks[0]?`<a href="${escapeHtml(manager.sourceLinks[0].url)}" target="_blank" rel="noopener noreferrer" class="inline-flex mt-4 text-[11px] text-eplNeon hover:underline">분석 근거 확인</a>`:''}
                </article>
            `).join('');
        }

        function renderTeamSelector() {
            const selector=document.getElementById('team-selector'),count=document.getElementById('selected-team-count'),guide=document.getElementById('team-selection-guide');if(!selector||!count||!guide)return;
            if(entityData.status!=='ready'){selector.innerHTML='<div class="col-span-full p-8 text-center text-xs text-slate-500">실제 경기 데이터를 불러오는 중입니다.</div>';return;}
            const q=(document.getElementById('team-search')?.value||'').toLowerCase().trim();const filtered=teamComparisonData.filter(team=>!q||`${team.name} ${team.englishName||''} ${team.short}`.toLowerCase().includes(q)).map(team=>{const live=currentStanding(team.id);return live?{...team,metrics:{...team.metrics,...live}}:team;});
            selector.innerHTML=filtered.length?filtered.map(team=>{const selected=selectedTeamIds.has(team.id),disabled=!selected&&selectedTeamIds.size>=MAX_TEAM_SELECTION;return `<button type="button" onclick="toggleTeamSelection('${team.id}')" class="text-left rounded-xl border p-4 transition-all ${selected?'bg-eplBlue/10 border-eplBlue/40 shadow-lg shadow-eplBlue/5':'bg-white/[0.025] border-white/5 hover:bg-white/5 hover:border-white/10'} ${disabled?'opacity-45 cursor-not-allowed':''}"><div class="flex items-start justify-between gap-3"><div><span class="text-[10px] font-mono text-eplBlue">현재 ${team.metrics.rank}위 · ${team.short}</span><h4 class="font-bold text-sm text-white mt-1">${team.name}</h4><p class="text-[11px] text-slate-500">2026-27 Premier League</p></div><span class="w-6 h-6 rounded-full border flex items-center justify-center ${selected?'bg-eplBlue border-eplBlue text-slate-950':'border-white/15 text-transparent'}"><i class="fa-solid fa-check text-[10px]"></i></span></div><div class="mt-3 text-[11px] text-slate-400">${team.metrics.played}경기 · ${team.metrics.wins}승 ${team.metrics.draws}무 ${team.metrics.losses}패 · ${team.metrics.goalsFor}득점 ${team.metrics.goalsAgainst}실점</div><div class="mt-2 flex gap-2"><span class="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-300">${team.metrics.points} PTS</span><span class="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-300">GD ${team.metrics.goalDifference>0?'+':''}${team.metrics.goalDifference}</span></div></button>`}).join(''):'<div class="col-span-full p-8 text-center text-xs text-slate-600">검색 결과가 없습니다.</div>';
            count.textContent=`${selectedTeamIds.size} / ${MAX_TEAM_SELECTION} 선택`;guide.textContent=selectedTeamIds.size===0?'팀을 1개 이상 선택하세요.':selectedTeamIds.size===MAX_TEAM_SELECTION?'최대 3개 팀이 선택되었습니다. 다른 팀을 고르려면 기존 선택을 해제하세요.':`팀을 ${MAX_TEAM_SELECTION-selectedTeamIds.size}개 더 선택할 수 있습니다.`;
        }

        function toggleTeamSelection(teamId){
            if(selectedTeamIds.has(teamId)) selectedTeamIds.delete(teamId);
            else { if(selectedTeamIds.size>=MAX_TEAM_SELECTION){showToast('팀은 최대 3개까지 선택할 수 있습니다.'); return;} selectedTeamIds.add(teamId); }
            renderTeamComparison();
        }
        function resetTeamSelection(){selectedTeamIds.clear(); renderTeamComparison();}

        function renderTeamComparison(){
            const cards=document.getElementById('team-cards'), metrics=document.getElementById('team-comparison-metrics'), summary=document.getElementById('team-summary'), empty=document.getElementById('empty-team-comparison'), content=document.getElementById('team-comparison-content');
            if(!cards||!metrics||!summary||!empty||!content) return;
            if(entityData.status!=='ready'){renderTeamSelector();initialiseEntityData().then(()=>renderTeamComparison());return;}
            renderTeamSelector();
            const selected=teamComparisonData.filter(t=>selectedTeamIds.has(t.id)).map(team=>{const live=currentStanding(team.id);return live?{...team,metrics:{...team.metrics,...live,pointsPerGame:live.played?Math.round(live.points/live.played*100)/100:null}}:team;});
            const has=selected.length>0;
            empty.classList.toggle('hidden',has); content.classList.toggle('hidden',!has); cards.classList.toggle('hidden',!has);
            if(!has){cards.innerHTML='';metrics.innerHTML='';summary.innerHTML='';return;}
            cards.className='p-6';
            const teamColumns=`minmax(150px,.8fr) repeat(${selected.length},minmax(210px,1fr))`;
            cards.innerHTML=`<div class="overflow-x-auto rounded-2xl border border-white/5 bg-slate-950/40"><div class="min-w-[760px]">
                <div class="grid border-b border-white/5" style="grid-template-columns:${teamColumns}"><div class="p-4 bg-white/[.02] text-[10px] font-mono uppercase tracking-widest text-slate-500">Team Profile</div>${selected.map((t,i)=>`<div class="p-4 border-l border-white/5 relative"><div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${managerBarClasses[i]}"></div><strong class="text-white">${t.name}</strong><p class="text-[11px] text-slate-500 mt-1">${t.short}</p></div>`).join('')}</div>
                ${[['현재 감독',t=>t.manager],['전술 정체성',t=>t.managerIdentity],['선호 포메이션',t=>t.formation],['등록 선수단',t=>`${t.squadSize}명 · 선발 기준 ${t.starterCount} · 벤치 ${t.benchCount}`],['━━ 2025-26 최종 순위',t=>t.previous?`${t.previous.rank}위`:'전년도 EPL 미참가'],['2025-26 경기 수',t=>t.previous?t.previous.played:'—'],['2025-26 승',t=>t.previous?t.previous.wins:'—'],['2025-26 무',t=>t.previous?t.previous.draws:'—'],['2025-26 패',t=>t.previous?t.previous.losses:'—'],['2025-26 득점',t=>t.previous?t.previous.goalsFor:'—'],['2025-26 실점',t=>t.previous?t.previous.goalsAgainst:'—'],['2025-26 득실차',t=>t.previous?`${t.previous.goalDifference>0?'+':''}${t.previous.goalDifference}`:'—'],['2025-26 승점',t=>t.previous?t.previous.points:'—'],['━━ 2026-27 현재 순위',t=>`${t.metrics.rank}위`],['2026-27 경기 수',t=>t.metrics.played],['2026-27 승',t=>t.metrics.wins],['2026-27 무',t=>t.metrics.draws],['2026-27 패',t=>t.metrics.losses],['2026-27 득점',t=>t.metrics.goalsFor],['2026-27 실점',t=>t.metrics.goalsAgainst],['2026-27 득실차',t=>`${t.metrics.goalDifference>0?'+':''}${t.metrics.goalDifference}`],['2026-27 승점',t=>t.metrics.points]].map(([l,getValue])=>`<div class="grid border-b border-white/5 ${String(l).startsWith('━━')?'bg-eplBlue/[.035]':''}" style="grid-template-columns:${teamColumns}"><div class="px-4 py-3 bg-white/[.015] text-xs font-semibold ${String(l).startsWith('━━')?'text-eplBlue':'text-slate-400'}">${l}</div>${selected.map(t=>`<div class="px-4 py-3 border-l border-white/5 text-sm ${String(l).startsWith('━━')?'font-bold text-white':'text-slate-200'}">${escapeHtml(getValue(t))}</div>`).join('')}</div>`).join('')}
                <div class="grid" style="grid-template-columns:${teamColumns}"><div class="px-4 py-4 bg-white/[.015] text-xs font-semibold text-slate-400">출처</div>${selected.map(()=>`<div class="px-4 py-4 border-l border-white/5 text-xs text-slate-400">2025-26 openfootball · 2026-27 TheSportsDB</div>`).join('')}</div>
            </div></div>`;
            metrics.innerHTML=`<div class="grid gap-4" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">${selected.map((team,i)=>{const recent=team.recent.map(result=>{const home=result.homeTeamId===team.id,scored=home?result.homeScore:result.awayScore,conceded=home?result.awayScore:result.homeScore;return scored>conceded?'W':scored<conceded?'L':'D';});const stat=(label,value)=>`<div class="rounded-lg bg-black/20 p-3 text-center"><strong class="text-base">${value}</strong><span class="block text-[10px] text-slate-500 mt-1">${label}</span></div>`;return `<article class="rounded-xl border border-white/5 bg-white/[.025] p-5"><div class="flex items-center justify-between"><h4 class="font-bold">${escapeHtml(team.name)}</h4><span class="text-xs text-eplBlue">현재 ${team.metrics.rank}위</span></div><div class="grid grid-cols-4 gap-2 mt-4">${stat('경기',team.metrics.played)}${stat('승',team.metrics.wins)}${stat('무',team.metrics.draws)}${stat('패',team.metrics.losses)}${stat('득점',team.metrics.goalsFor)}${stat('실점',team.metrics.goalsAgainst)}${stat('득실',`${team.metrics.goalDifference>0?'+':''}${team.metrics.goalDifference}`)}${stat('승점',team.metrics.points)}</div><div class="mt-4 flex items-center justify-between"><span class="text-xs text-slate-500">최근 결과</span><div class="flex gap-1">${recent.length?recent.map(value=>`<span class="form-dot ${value==='W'?'bg-emerald-500':value==='L'?'bg-rose-500':'bg-slate-500'}">${value}</span>`).join(''):'<span class="text-xs text-slate-600">없음</span>'}</div></div></article>`;}).join('')}</div>`;
            summary.className=`px-6 pb-6 grid grid-cols-1 gap-4 ${selected.length===1?'md:grid-cols-1':selected.length===2?'md:grid-cols-2':'md:grid-cols-3'}`;
            summary.innerHTML=selected.map((team,i)=>`<article class="rounded-xl border border-white/5 bg-white/[0.025] p-4"><div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-gradient-to-r ${managerBarClasses[i]}"></span><h4 class="font-bold text-sm text-white">${escapeHtml(team.name)} 시즌 변화</h4></div><p class="text-xs text-slate-400 leading-relaxed mt-3">${team.previous?`2025-26 시즌 ${team.previous.rank}위·${team.previous.points}점에서`:'2025-26 EPL 미참가 후 승격해'} 2026-27 현재 ${team.metrics.rank}위·${team.metrics.points}점입니다. 현재 감독은 ${escapeHtml(team.manager)}이며 등록 선수단 ${team.squadSize}명이 연결되어 있습니다.</p><p class="mt-3 text-[10px] font-mono text-slate-600">이전 시즌 380경기 완료 · 현재 시즌 ${entityData.standings.completedMatches}경기 완료</p></article>`).join('');
        }

        let playerPositionFilter='All';
        function renderPlayerFinder(){
            const teamSelect=document.getElementById('player-team-filter');
            if(!teamSelect)return;
            const teams=[...new Set(playerComparisonData.map(p=>p.club))].sort();
            if(!teamSelect.dataset.ready){teamSelect.innerHTML='<option value="All">모든 팀</option>'+teams.map(t=>`<option>${t}</option>`).join('');teamSelect.dataset.ready='1';}
            const posBox=document.getElementById('player-position-filter');
            const positions=['All','GK','DF','MF','FW'];
            posBox.innerHTML=positions.map(pos=>`<button onclick="playerPositionFilter='${pos}';renderPlayerFinder()" class="px-2 py-2 rounded-lg border text-xs ${playerPositionFilter===pos?'bg-purple-400/15 border-purple-400/40 text-purple-200':'bg-white/[0.02] border-white/5 text-slate-500'}">${pos==='All'?'전체':pos}</button>`).join('');
            const q=(document.getElementById('player-search').value||'').toLowerCase().trim();
            const team=teamSelect.value;
            const groupMap={GK:'goalkeeper',DF:'defender',MF:'midfielder',FW:'forward'};
            const filtered=playerComparisonData.filter(p=>(team==='All'||p.club===team)&&(playerPositionFilter==='All'||(playerPositionFilter==='DF'?(p.positionGroup==='defender'||p.positionGroup==='fullback'):playerPositionFilter==='MF'?(p.positionGroup==='midfielder'||p.positionGroup==='defensiveMidfielder'):p.positionGroup===groupMap[playerPositionFilter]))&&(!q||`${p.name} ${p.english} ${p.club}`.toLowerCase().includes(q)));
            document.getElementById('finder-result-count').textContent=`${filtered.length}명`;
            document.getElementById('player-finder-list').innerHTML=filtered.length?filtered.map(p=>{const selected=selectedPlayerIds.has(p.id);const portrait=p.image?`<img src="${p.image}" alt="" class="w-9 h-9 rounded-lg bg-white/5 object-contain object-bottom" loading="lazy" referrerpolicy="no-referrer">`:'<div class="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-600"><i class="fa-solid fa-user"></i></div>';return `<button onclick="togglePlayerSelection('${p.id}')" class="w-full p-3 rounded-xl border text-left flex items-center gap-3 ${selected?'bg-purple-400/10 border-purple-400/40':'bg-white/[0.025] border-white/5 hover:border-white/15'}">${portrait}<div class="min-w-0 flex-1"><div class="flex items-center justify-between gap-2"><strong class="text-xs text-white truncate">${p.name}</strong><span class="text-[10px] font-mono text-purple-300">${p.position}</span></div><p class="text-[10px] text-slate-500 truncate mt-1">${p.club} · ${p.nationality}</p></div>${selected?'<i class="fa-solid fa-check text-purple-300 text-xs"></i>':''}</button>`}).join(''):'<div class="p-5 text-center text-xs text-slate-600">검색 결과가 없습니다.</div>';
            renderPlayerSlots();
        }
        function renderPlayerSlots(){
            const box=document.getElementById('player-slots');if(!box)return;
            const selected=playerComparisonData.filter(p=>selectedPlayerIds.has(p.id));
            box.innerHTML=[0,1,2].map(i=>{const p=selected[i];return p?`<div class="p-2.5 rounded-lg bg-purple-400/10 border border-purple-400/20 flex items-center justify-between"><div><strong class="text-xs text-white">${i+1}. ${p.name}</strong><p class="text-[10px] text-slate-500">${p.club}</p></div><button onclick="togglePlayerSelection('${p.id}')" class="text-slate-500 hover:text-white"><i class="fa-solid fa-xmark"></i></button></div>`:`<div class="p-3 rounded-lg border border-dashed border-white/10 text-xs text-slate-600">${i+1}. Empty</div>`}).join('');
        }
        function renderPlayerSelector(){renderPlayerFinder();}
        function togglePlayerSelection(id){if(selectedPlayerIds.has(id)) selectedPlayerIds.delete(id); else {if(selectedPlayerIds.size>=MAX_PLAYER_SELECTION){showToast('선수는 최대 3명까지 선택할 수 있습니다.');return;} selectedPlayerIds.add(id);} renderPlayerComparison();}
        function resetPlayerSelection(){selectedPlayerIds.clear();renderPlayerComparison();}
        function renderPlayerComparison(){
            const cards=document.getElementById('player-cards'),common=document.getElementById('player-common-metrics'),role=document.getElementById('player-role-stats'),empty=document.getElementById('empty-player-comparison'),content=document.getElementById('player-comparison-content');
            if(!cards||!common||!role||!empty||!content)return;
            renderPlayerSelector();
            const selected=playerComparisonData.filter(p=>selectedPlayerIds.has(p.id));
            const has=selected.length>0;
            empty.classList.toggle('hidden',has);
            content.classList.toggle('hidden',!has);
            cards.classList.toggle('hidden',!has);
            if(!has){cards.innerHTML='';common.innerHTML='';role.innerHTML='';return;}

            const columnTemplate=`minmax(130px,0.8fr) repeat(${selected.length}, minmax(190px,1fr))`;
            const bestAttribute=(key)=>Math.max(...selected.map(p=>Number(p.attributes[key]||0)));

            cards.innerHTML=`
                <div class="overflow-x-auto rounded-2xl border border-white/5 bg-slate-950/40">
                    <div class="min-w-[760px]">
                        <div class="grid border-b border-white/5" style="grid-template-columns:${columnTemplate}">
                            <div class="p-4 bg-white/[0.02] flex items-end"><span class="text-[10px] font-mono uppercase tracking-widest text-slate-500">Player Profile</span></div>
                            ${selected.map((p,i)=>`<div class="p-4 border-l border-white/5 relative"><div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${managerBarClasses[i]}"></div><div class="flex items-center gap-3 pt-1">${p.image?`<img src="${p.image}" alt="${p.name}" class="w-14 h-14 shrink-0 rounded-xl border border-white/10 bg-white/[0.02] object-contain object-bottom" loading="lazy" referrerpolicy="no-referrer">`:'<div class="w-14 h-14 shrink-0 rounded-xl border border-dashed border-white/10 bg-white/[0.02] flex items-center justify-center text-slate-600"><i class="fa-regular fa-image"></i></div>'}<div class="min-w-0"><div class="flex items-center gap-2"><span class="text-[10px] font-mono text-purple-300">${p.position}</span><span class="text-[10px] text-slate-600">${p.club}</span></div><button onclick="openPlayerProfile('${p.id}')" class="text-left group"><h3 class="text-base font-bold text-white mt-1 truncate group-hover:text-eplNeon">${p.name}</h3><p class="text-[11px] text-slate-500 truncate">${p.english}</p></button></div></div></div>`).join('')}
                        </div>
                        ${[['소속팀','club'],['소속팀 현재 순위','teamRank'],['등번호','number'],['등록 포지션','position'],['스쿼드 상태','squadRole'],['나이','birthDate'],['국적','nationality'],['신장','height'],['주발','foot']].map(([label,key])=>`<div class="grid border-b border-white/5 last:border-b-0" style="grid-template-columns:${columnTemplate}"><div class="px-4 py-3 bg-white/[0.015] text-xs font-semibold text-slate-400">${label}</div>${selected.map(p=>`<div class="px-4 py-3 border-l border-white/5 text-sm text-slate-200">${escapeHtml(key==='teamRank'&&p[key]!=='—'?`${p[key]}위`:p[key])}</div>`).join('')}</div>`).join('')}
                        <div class="grid border-b border-white/5" style="grid-template-columns:${columnTemplate}"><div class="px-4 py-4 bg-white/[0.015] text-xs font-semibold text-slate-400">등록 포지션</div>${selected.map(p=>`<div class="px-4 py-4 border-l border-white/5"><div class="flex flex-wrap gap-2">${p.tags.map(t=>`<span class="px-2 py-1 rounded-md bg-purple-400/10 border border-purple-400/20 text-[11px] text-purple-200">${t}</span>`).join('')}</div></div>`).join('')}</div>
                        <div class="grid" style="grid-template-columns:${columnTemplate}"><div class="px-4 py-4 bg-white/[0.015] text-xs font-semibold text-slate-400">출처</div>${selected.map(p=>`<div class="px-4 py-4 border-l border-white/5">${p.sourceUrl?`<a href="${escapeHtml(p.sourceUrl)}" target="_blank" rel="noopener noreferrer" class="text-xs text-purple-300 hover:underline">${escapeHtml(p.sourceId)}</a>`:`<span class="text-xs text-slate-500">${escapeHtml(p.sourceId)}</span>`}</div>`).join('')}</div>
                    </div>
                </div>`;

            common.innerHTML=`<div class="grid gap-3 p-5" style="grid-template-columns:repeat(auto-fit,minmax(210px,1fr))">${selected.map(player=>{const standing=currentStanding(player.teamId)||{};return `<article class="rounded-xl border border-white/5 bg-white/[.025] p-4"><div class="flex items-center justify-between"><strong class="text-sm">${escapeHtml(player.club)}</strong><span class="text-xs text-purple-300">${standing.rank||'—'}위</span></div><div class="grid grid-cols-4 gap-2 mt-4 text-center"><div><b>${standing.played??0}</b><span class="block text-[9px] text-slate-500">경기</span></div><div><b>${standing.points??0}</b><span class="block text-[9px] text-slate-500">승점</span></div><div><b>${standing.goalsFor??0}</b><span class="block text-[9px] text-slate-500">득점</span></div><div><b>${standing.goalsAgainst??0}</b><span class="block text-[9px] text-slate-500">실점</span></div></div></article>`;}).join('')}</div>`;
            /* `
                <div class="overflow-x-auto"><div class="min-w-[760px]">
                    <div class="grid border-b border-white/5" style="grid-template-columns:${columnTemplate}"><div class="px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-slate-500">Attribute</div>${selected.map((p,i)=>`<div class="px-4 py-3 border-l border-white/5 flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-gradient-to-r ${managerBarClasses[i]}"></span><span class="text-xs font-semibold text-slate-300 truncate">${p.name}</span></div>`).join('')}</div>
                    ${Object.keys(playerAttributeLabels).map(key=>{const best=bestAttribute(key);return `<div class="grid border-b border-white/5 last:border-b-0" style="grid-template-columns:${columnTemplate}"><div class="px-4 py-3 bg-white/[0.015] text-xs font-semibold text-slate-300">${playerAttributeLabels[key]}</div>${selected.map(p=>{const value=p.attributes[key];const isBest=value===best&&selected.length>1;return `<div class="px-4 py-3 border-l border-white/5"><div class="flex items-center gap-3"><div class="h-2 flex-1 rounded-full bg-white/5 overflow-hidden"><div class="h-full rounded-full ${isBest?'bg-eplNeon':'bg-purple-400'}" style="width:${value}%"></div></div><strong class="w-8 text-right text-sm font-mono ${isBest?'text-eplNeon':'text-white'}">${value}</strong></div></div>`;}).join('')}</div>`;}).join('')}
                </div></div>`; */

            const allRoleKeys=[];
            selected.forEach(p=>Object.keys(playerRoleStatLabels[p.positionGroup]||{}).forEach(k=>{if(!allRoleKeys.includes(k))allRoleKeys.push(k)}));
            role.innerHTML=`<div class="grid gap-3 p-5" style="grid-template-columns:repeat(auto-fit,minmax(210px,1fr))">${selected.map(player=>`<article class="rounded-xl border border-white/5 bg-white/[.025] p-4"><div class="flex items-center justify-between"><strong class="text-sm">${escapeHtml(player.name)}</strong><span class="font-mono text-xs text-purple-300">${escapeHtml(player.position)}</span></div><div class="mt-3 flex flex-wrap gap-2">${player.tags.map(tag=>`<span class="px-2 py-1 rounded bg-purple-400/10 text-[10px] text-purple-200">${escapeHtml(tag)}</span>`).join('')}</div><p class="mt-4 text-xs text-slate-400">${escapeHtml(player.squadRole)} · 등번호 ${escapeHtml(player.number)}</p></article>`).join('')}</div>`;
            /* `
                <div class="overflow-x-auto"><div class="min-w-[760px]">
                    <div class="grid border-b border-white/5" style="grid-template-columns:${columnTemplate}"><div class="px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-slate-500">Role Metric</div>${selected.map(p=>`<div class="px-4 py-3 border-l border-white/5"><span class="text-xs font-semibold text-slate-300">${p.name}</span><span class="ml-2 text-[10px] font-mono text-purple-300">${p.position}</span></div>`).join('')}</div>
                    ${allRoleKeys.map(key=>{let label=key;for(const group of Object.values(playerRoleStatLabels)){if(group[key]){label=group[key];break;}}return `<div class="grid border-b border-white/5 last:border-b-0" style="grid-template-columns:${columnTemplate}"><div class="px-4 py-3 bg-white/[0.015] text-xs font-semibold text-slate-300">${label}</div>${selected.map(p=>{const applicable=Object.prototype.hasOwnProperty.call(playerRoleStatLabels[p.positionGroup]||{},key);return `<div class="px-4 py-3 border-l border-white/5"><strong class="text-base ${applicable?'text-white':'text-slate-600'}">${applicable?(p.roleStats[key]??'—'):'—'}</strong></div>`;}).join('')}</div>`;}).join('')}
                </div></div>`; */
        }

        const formationAliases={'4-4-2 Diamond':'4-1-2-1-2'};
        const matchPositionOptions=['GK','RB','RCB','CB','LCB','LB','RWB','RM','DM','RCM','CM','LCM','LM','LWB','RW','RAM','AM','LAM','LW','RF','ST','LF'];
        function formationCounts(form){const normalized=formationAliases[form]||form;const counts=String(normalized).split('-').map(Number).filter(n=>Number.isFinite(n)&&n>0);return counts.reduce((a,b)=>a+b,0)===10?counts:[4,3,3];}
        function spreadRoles(count,zone,lineIndex,totalLines){
            if(zone==='DF'){const maps={1:['CB'],2:['LCB','RCB'],3:['LCB','CB','RCB'],4:['LB','LCB','RCB','RB'],5:['LWB','LCB','CB','RCB','RWB']};return maps[count]||Array.from({length:count},(_,i)=>i===0?'LB':i===count-1?'RB':'CB');}
            if(zone==='FW'){const maps={1:['ST'],2:['LF','RF'],3:['LW','ST','RW'],4:['LW','LF','RF','RW'],5:['LW','LF','ST','RF','RW']};return maps[count]||Array(count).fill('ST');}
            const isAdvanced=lineIndex>=totalLines-2;const maps=isAdvanced?{1:['AM'],2:['LAM','RAM'],3:['LW','AM','RW'],4:['LM','LAM','RAM','RM'],5:['LW','LAM','AM','RAM','RW']}:{1:['DM'],2:['LCM','RCM'],3:['LCM','CM','RCM'],4:['LM','LCM','RCM','RM'],5:['LWB','LCM','CM','RCM','RWB']};return maps[count]||Array(count).fill(isAdvanced?'AM':'CM');
        }
        function buildFormationSlots(form){const counts=formationCounts(form),total=counts.length,slots=['GK'];counts.forEach((count,lineIndex)=>{const zone=lineIndex===0?'DF':lineIndex===total-1?'FW':'MF';slots.push(...spreadRoles(count,zone,lineIndex,total));});return slots;}
        const defaultMatchPositions=['GK','RB','RCB','LCB','LB','DM','RCM','LCM','RW','ST','LW'];
        let matchSelected={home:null,away:null};
        let matchLineupState={home:null,away:null};
        let latestSubstitutionImpact=null;
        let provisionalLineupEnabled=false;
        function matchTeamLabel(teamId){const team=entityData.teams?.[teamId];return team?.koreanName||team?.name||teamId;}
        function canonicalLineupPlayer(row,index){const player=entityData.players?.[row.id]||{};return {id:row.id,name:player.koreanName||row.name||player.name||'선수 미확정',pos:row.position||player.position||defaultMatchPositions[index]||'CM',naturalPos:row.position||player.position||'CM',custom:null};}
        function initMatchCompare(){
            const h=document.getElementById('match-home-team'),a=document.getElementById('match-away-team');if(!h||!a)return;
            if(entityData.status!=='ready'){
                h.innerHTML='<option>선수단 불러오는 중…</option>';a.innerHTML=h.innerHTML;
                initialiseEntityData().then(()=>{delete h.dataset.ready;delete a.dataset.ready;initMatchCompare();});return;
            }
            if(h.dataset.ready)return;
            const teamIds=Object.keys(entityData.teams).filter(id=>entityData.squads?.[id]);
            const opts=teamIds.map(id=>`<option value="${id}">${escapeHtml(matchTeamLabel(id))}</option>`).join('');h.innerHTML=opts;a.innerHTML=opts;
            h.value=teamIds.includes('arsenal')?'arsenal':teamIds[0];a.value=teamIds.includes('liverpool')?'liverpool':teamIds[1]||teamIds[0];
            h.dataset.ready='1';a.dataset.ready='1';handleMatchTeamChange('home',false);handleMatchTeamChange('away',false);renderMatchCompare();
        }
        function ensureMatchSideState(side,teamId){
            const current=matchLineupState[side];if(current?.teamId===teamId)return current;
            const squad=entityData.squads?.[teamId];const starters=(squad?.starters||[]).map(canonicalLineupPlayer);const bench=(squad?.substitutes||[]).map(canonicalLineupPlayer);
            const formation=entityData.teams?.[teamId]?.defaultFormation||'4-3-3',slots=buildFormationSlots(formation);
            starters.forEach((player,index)=>player.pos=slots[index]||player.pos);
            matchLineupState[side]={teamId,team:matchTeamLabel(teamId),formation,starters,bench,complete:starters.length===11,confirmed:squad?.selectionStatus==='official-starting-lineup',selectionStatus:squad?.selectionStatus||'unavailable',sourceId:squad?.sourceId||'unavailable'};
            setFormationSelectorValue(side,formation);
            return matchLineupState[side];
        }
        function handleMatchTeamChange(side,render=true){const teamId=document.getElementById(`match-${side}-team`)?.value;if(!teamId)return;matchLineupState[side]=null;const state=ensureMatchSideState(side,teamId);setFormationSelectorValue(side,state.formation);latestSubstitutionImpact=null;provisionalLineupEnabled=false;if(render)renderMatchCompare();}
        function enableProvisionalLineup(){provisionalLineupEnabled=true;latestSubstitutionImpact=null;renderMatchCompare();showToast('등록 스쿼드 기반 예상 배치를 열었습니다. 실제 선발이 아닙니다.');}
        function formationCoords(form,away=false){
            const counts=formationCounts(form),coords=[[50,91]],lineTotal=counts.length;
            counts.forEach((count,lineIndex)=>{const depth=lineTotal===1?50:76-(lineIndex*(58/(lineTotal-1)));for(let i=0;i<count;i++){const lateral=count===1?50:12+i*(76/(count-1));coords.push([lateral,depth]);}});
            return coords.map(([x,y])=>away?[100-x,100-y]:[x,y]);
        }
        function resetMatchLayout(){
            ['home','away'].forEach(side=>{const team=document.getElementById(`match-${side}-team`)?.value;if(!team)return;matchLineupState[side]=null;const state=ensureMatchSideState(side,team),form=state.formation,slots=buildFormationSlots(form);state.starters.forEach((p,i)=>{p.pos=slots[i]||p.pos;p.custom=null;});setFormationSelectorValue(side,form);});
            renderMatchCompare(true);showToast('양 팀 배치를 기본 포메이션으로 초기화했습니다.');
        }
        function updateMatchPosition(side,index,pos){
            const state=matchLineupState[side];if(!state)return;
            const player=state.starters[index],oldPos=player.pos;
            if(oldPos===pos)return;
            const occupiedIndex=state.starters.findIndex((p,i)=>i!==index&&p.pos===pos);
            player.pos=pos;
            if(occupiedIndex>=0){
                state.starters[occupiedIndex].pos=oldPos;
                showToast(`${player.name} → ${pos} · ${state.starters[occupiedIndex].name} → ${oldPos}`);
            }else{
                showToast(`${player.name}의 포지션을 ${pos}(으)로 변경했습니다.`);
            }
            player.custom=null;if(occupiedIndex>=0)state.starters[occupiedIndex].custom=null;
            renderMatchCompare(false);
        }
        function buildSubstitutionImpact(side,incoming,outgoing,targetPos,team){
            const roleImpact={GK:'후방 안정성과 빌드업 선택지가 변합니다.',RB:'오른쪽 폭과 오버래핑 빈도가 달라집니다.',LB:'왼쪽 전진 폭과 수비 복귀 속도가 달라집니다.',CB:'수비 라인의 커버 범위와 전진 패스가 달라집니다.',RCB:'오른쪽 빌드업과 대인 방어 구조가 변합니다.',LCB:'왼쪽 빌드업과 커버 구조가 변합니다.',DM:'중앙 보호와 1차 전개 방식이 달라집니다.',CM:'중원 볼 운반과 압박 연결이 달라집니다.',RCM:'오른쪽 하프스페이스 점유가 달라집니다.',LCM:'왼쪽 하프스페이스 점유가 달라집니다.',AM:'라인 사이 창의성과 마지막 패스 비중이 증가합니다.',RW:'오른쪽 1대1과 안쪽 침투 패턴이 달라집니다.',LW:'왼쪽 1대1과 안쪽 침투 패턴이 달라집니다.',ST:'최전방 압박, 침투, 박스 점유 방식이 달라집니다.'}[targetPos]||'해당 구역의 움직임과 연결 방식이 달라집니다.';
            const risk={GK:'발밑 전개 호흡이 흔들릴 수 있습니다.',CB:'수비 라인 간격 적응이 필요합니다.',RCB:'측면 커버 타이밍 적응이 필요합니다.',LCB:'측면 커버 타이밍 적응이 필요합니다.',DM:'중앙 전환 수비의 균형을 확인해야 합니다.',CM:'중원 간격과 압박 타이밍이 바뀔 수 있습니다.',RCM:'오른쪽 측면과의 역할 중복을 확인해야 합니다.',LCM:'왼쪽 측면과의 역할 중복을 확인해야 합니다.',RW:'수비 가담과 폭 유지가 약해질 수 있습니다.',LW:'수비 가담과 폭 유지가 약해질 수 있습니다.',ST:'연계 또는 공중볼 비중이 달라질 수 있습니다.'}[targetPos]||'기존 선수와의 역할 차이로 초기 간격 조정이 필요합니다.';
            return {side,team,incoming,outgoing,targetPos,roleImpact,risk};
        }
        function renderSubstitutionImpact(){
            const box=document.getElementById('substitution-impact');if(!box)return;
            if(!latestSubstitutionImpact){box.textContent='선수를 교체하면 선택한 포지션을 기준으로 예상되는 구조 변화와 확인할 항목을 표시합니다. 실제 경기 성과 예측은 아닙니다.';return;}
            const i=latestSubstitutionImpact,tint=i.side==='home'?'cyan':'rose';
            box.innerHTML=`<div class="flex flex-wrap items-center gap-2 mb-3"><span class="px-2 py-1 rounded bg-${tint}-400/10 border border-${tint}-400/20 text-${tint}-200 font-bold">${i.team}</span><strong class="text-emerald-300">${i.incoming} IN</strong><span class="text-slate-600">·</span><strong class="text-rose-300">${i.outgoing} OUT</strong><span class="px-2 py-1 rounded bg-white/5 text-slate-300 font-mono">${i.targetPos}</span></div><div class="grid grid-cols-1 md:grid-cols-2 gap-3"><div class="rounded-xl bg-white/[0.025] border border-white/5 p-3"><span class="text-[10px] uppercase tracking-widest text-cyan-300 font-bold">포지션 구조 변화</span><p class="mt-2 text-slate-300 leading-relaxed">${i.roleImpact}</p></div><div class="rounded-xl bg-white/[0.025] border border-white/5 p-3"><span class="text-[10px] uppercase tracking-widest text-amber-300 font-bold">사용자가 확인할 항목</span><p class="mt-2 text-slate-300 leading-relaxed">${i.risk}</p></div></div><p class="mt-3 text-[10px] text-slate-500">등록 스쿼드와 사용자가 선택한 배치를 바탕으로 한 구조 설명이며, 실제 선수 성과나 경기 결과 예측이 아닙니다.</p>`;
        }
        function substituteMatchPlayer(side,benchIndex,starterIndex){
            const state=matchLineupState[side];if(!state||starterIndex<0)return;
            const incomingPlayer=state.bench[benchIndex],outgoingPlayer=state.starters[starterIndex];if(!incomingPlayer||!outgoingPlayer)return;
            const incoming=incomingPlayer.name,outgoing=outgoingPlayer.name,targetPos=outgoingPlayer.pos;
            state.starters[starterIndex]={...incomingPlayer,pos:targetPos,custom:null};state.bench[benchIndex]={...outgoingPlayer,pos:outgoingPlayer.naturalPos||targetPos,custom:null};
            latestSubstitutionImpact=buildSubstitutionImpact(side,incoming,outgoing,targetPos,state.team);
            renderMatchCompare(false);showToast(`${incoming} IN · ${outgoing} OUT`);
        }
        function positionGroup(pos){if(pos==='GK')return'GK';if(['RB','RCB','CB','LCB','LB','RWB','LWB'].includes(pos))return'DF';if(['DM','RCM','CM','LCM','RAM','AM','LAM'].includes(pos))return'MF';return'FW';}
        function bestStarterForBench(state,benchPlayer){
            let idx=state.starters.findIndex(p=>p.pos===benchPlayer.pos);
            if(idx>=0)return idx;
            const group=positionGroup(benchPlayer.pos);
            idx=state.starters.findIndex(p=>positionGroup(p.pos)===group);
            return idx>=0?idx:0;
        }
        function renderBench(side){
            const state=matchLineupState[side],box=document.getElementById(`match-${side}-bench`);if(!state||!box)return;
            const tint=side==='home'?'cyan':'rose';
            box.innerHTML=state.bench.map((player,bIndex)=>{const preferred=bestStarterForBench(state,player);return `<div class="w-full rounded-xl border border-${tint}-400/15 bg-${tint}-400/[0.04] p-3"><div class="flex items-center justify-between gap-2"><div class="min-w-0"><strong class="text-sm text-white truncate block">${player.name}</strong><span class="text-[10px] text-${tint}-200 font-mono">${player.pos}</span></div><span class="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-slate-400">${bIndex+1}</span></div><div class="mt-2 flex gap-2"><select id="${side}-bench-target-${bIndex}" class="min-w-0 flex-1 bg-slate-950 border border-white/10 rounded-lg px-2 py-2 text-[11px]">${state.starters.map((p,i)=>`<option value="${i}" ${i===preferred?'selected':''}>${p.pos} · ${p.name}</option>`).join('')}</select><button onclick="substituteMatchPlayer('${side}',${bIndex},Number(document.getElementById('${side}-bench-target-${bIndex}').value))" class="px-3 py-2 rounded-lg border border-${tint}-400/20 bg-${tint}-400/10 text-${tint}-200 text-[11px] font-bold hover:bg-${tint}-400/20">교체</button></div></div>`}).join('');
        }
        function changeMatchFormation(side,form){
            const select=document.getElementById(`match-${side}-formation`);if(select)select.value=form;
            const team=document.getElementById(`match-${side}-team`).value;
            const state=ensureMatchSideState(side,team),slots=buildFormationSlots(form);
            if(slots)state.starters.forEach((p,i)=>{p.pos=slots[i]||p.pos;p.custom=null;});
            renderMatchCompare(false);showToast(`${side==='home'?'홈':'원정'} 포메이션을 ${form}(으)로 변경했습니다.`);
        }
        function setFormationSelectorValue(side,formation){
            const selector=document.getElementById(`match-${side}-formation`);
            if(!selector)return;
            if(!Array.from(selector.options).some(o=>o.value===formation)){
                selector.add(new Option(formation,formation));
            }
            selector.value=formation;
        }
        function attackingProgress(side,coord){if(!coord)return null;const raw=side==='home'?(coord[0]-4)/43:(96-coord[0])/43;return Math.max(0,Math.min(1,raw));}
        function clusterOutfieldLines(items){
            const sorted=[...items].sort((a,b)=>a.progress-b.progress),clusters=[];
            sorted.forEach(item=>{const last=clusters[clusters.length-1];if(!last||item.progress-last.mean>0.13)clusters.push({items:[item],mean:item.progress});else{last.items.push(item);last.mean=last.items.reduce((sum,x)=>sum+x.progress,0)/last.items.length;}});
            while(clusters.length>5){let gapIndex=0,minGap=Infinity;for(let i=0;i<clusters.length-1;i++){const gap=clusters[i+1].mean-clusters[i].mean;if(gap<minGap){minGap=gap;gapIndex=i;}}const merged={items:[...clusters[gapIndex].items,...clusters[gapIndex+1].items]};merged.mean=merged.items.reduce((sum,x)=>sum+x.progress,0)/merged.items.length;clusters.splice(gapIndex,2,merged);}return clusters;
        }
        function inferFormationFromCoords(side){
            const state=matchLineupState[side];if(!state)return '4-3-3';
            const items=state.starters.map((p,index)=>({p,index,coord:p.custom,progress:attackingProgress(side,p.custom)})).filter(x=>x.p.pos!=='GK'&&x.index!==0).map(x=>({...x,progress:x.progress??(positionGroup(x.p.pos)==='DF'?0.22:positionGroup(x.p.pos)==='MF'?0.55:0.86)}));
            const clusters=clusterOutfieldLines(items),formation=clusters.map(c=>c.items.length).join('-');
            clusters.forEach((cluster,lineIndex)=>{const zone=lineIndex===0?'DF':lineIndex===clusters.length-1?'FW':'MF',ordered=[...cluster.items].sort((a,b)=>(a.coord?.[1]??50)-(b.coord?.[1]??50)),roles=spreadRoles(ordered.length,zone,lineIndex,clusters.length);ordered.forEach((item,i)=>item.p.pos=roles[i]||item.p.pos);});
            setFormationSelectorValue(side,formation);document.getElementById(`match-${side}-board-title`).textContent=`${state.team} · ${formation}`;return formation;
        }
        function renderMatchCompare(resetSelection=true){
            initMatchCompare();const pitch=document.getElementById('match-pitch');if(!pitch)return;
            const ht=document.getElementById('match-home-team').value,at=document.getElementById('match-away-team').value,hf=document.getElementById('match-home-formation').value,af=document.getElementById('match-away-formation').value;
            const hs=ensureMatchSideState('home',ht),as=ensureMatchSideState('away',at);
            const currentHF=document.getElementById('match-home-formation').value,currentAF=document.getElementById('match-away-formation').value;
            const homeLabel=matchTeamLabel(ht),awayLabel=matchTeamLabel(at);
            document.getElementById('match-title').textContent=`${homeLabel}  vs  ${awayLabel}`;document.getElementById('match-home-board-title').textContent=`${homeLabel} · ${currentHF}`;document.getElementById('match-away-board-title').textContent=`${awayLabel} · ${currentAF}`;
            pitch.querySelectorAll('.match-player').forEach(x=>x.remove());if(resetSelection){matchSelected={home:null,away:null};document.getElementById('matchup-info').textContent='홈 선수와 원정 선수를 차례로 클릭하면 두 선수의 배치 위치와 직접 대결 구역을 표시합니다.';}
            const officialLineupAvailable=hs.confirmed&&as.confirmed;
            if(!officialLineupAvailable&&!provisionalLineupEnabled){
                document.getElementById('match-home-live-team-rating').textContent='선발 대기';document.getElementById('match-away-live-team-rating').textContent='선발 대기';
                document.getElementById('match-home-squad-title').textContent=homeLabel;document.getElementById('match-away-squad-title').textContent=awayLabel;
                document.getElementById('match-squad-compare').innerHTML=`<div class="p-8 text-center"><div class="text-amber-300 font-bold">공식 선발 라인업 발표 전</div><p class="mt-2 text-xs text-slate-500">현재 등록 스쿼드는 실제 경기 선발 명단이 아니므로 기본 화면에 표시하지 않습니다.</p><button type="button" onclick="enableProvisionalLineup()" class="mt-4 px-4 py-2.5 rounded-xl border border-amber-300/20 bg-amber-300/10 text-xs font-bold text-amber-200">스쿼드 기반 예상 배치 보기</button></div>`;
                document.getElementById('match-home-bench').innerHTML='<div class="text-xs text-slate-600">공식 후보 명단 발표 전입니다.</div>';document.getElementById('match-away-bench').innerHTML='<div class="text-xs text-slate-600">공식 후보 명단 발표 전입니다.</div>';
                document.getElementById('matchup-info').textContent='공식 선발 발표 후 실제 선수 ID 기반 매치업을 제공합니다.';latestSubstitutionImpact=null;renderSubstitutionImpact();return;
            }
            if(!officialLineupAvailable)document.getElementById('matchup-info').textContent='스쿼드 기반 예상 배치입니다. 실제 경기 선발 라인업이 아닙니다.';
            if(!hs.complete||!as.complete){
                const missing=[!hs.complete?`${homeLabel} ${hs.starters.length}명`:'',!as.complete?`${awayLabel} ${as.starters.length}명`:''].filter(Boolean).join(' · ');
                document.getElementById('matchup-info').textContent=`라인업이 불완전합니다: ${missing}. 선발 11명이 연결된 팀을 선택해 주세요.`;
            }
            document.getElementById('match-home-live-team-rating').textContent=officialLineupAvailable?'공식 선발':'예상 배치';document.getElementById('match-away-live-team-rating').textContent=officialLineupAvailable?'공식 선발':'예상 배치';
            const positionDepth={GK:94,RB:76,RCB:79,CB:80,LCB:79,LB:76,RWB:61,DM:63,RCM:56,CM:55,LCM:56,LWB:61,RW:32,RAM:39,AM:40,LAM:39,LW:32,RF:23,ST:18,LF:23};
            const positionLateral={GK:50,RB:84,RCB:64,CB:50,LCB:36,LB:16,RWB:88,DM:50,RCM:67,CM:50,LCM:33,LWB:12,RW:84,RAM:70,AM:50,LAM:30,LW:16,RF:65,ST:50,LF:35};
            function coordsFromSelectedPositions(state,side){
                const used={};
                return state.starters.map(player=>{
                    if(player.custom)return player.custom;
                    const pos=player.pos||'CM';
                    const count=used[pos]||0;
                    used[pos]=count+1;
                    let lateral=positionLateral[pos]??50;
                    let depth=positionDepth[pos]??55;
                    if(count>0){
                        const spread=Math.ceil(count/2)*7;
                        lateral+=count%2?spread:-spread;
                        depth+=Math.floor((count-1)/2)*3;
                    }
                    lateral=Math.max(8,Math.min(92,lateral));
                    depth=Math.max(12,Math.min(94,depth));
                    const homeX=4+(100-depth)*0.43;
                    return side==='home'?[homeX,lateral]:[100-homeX,100-lateral];
                });
            }
            const add=(state,side,coords)=>state.starters.forEach((player,i)=>{const el=document.createElement('button');el.className=`match-player absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border text-[8px] font-bold shadow-xl cursor-move select-none ${side==='home'?'bg-cyan-400/90 border-cyan-100 text-slate-950':'bg-rose-400/90 border-rose-100 text-slate-950'}`;el.style.left=coords[i][0]+'%';el.style.top=coords[i][1]+'%';el.innerHTML=`<span class="block truncate px-1 leading-tight">${player.name}</span><span class="text-[7px] opacity-75">${player.pos}</span>`;el.onclick=()=>selectMatchPlayer(side,player.name);makeDraggable(el,pitch,side,i);pitch.appendChild(el);});
            add(hs,'home',coordsFromSelectedPositions(hs,'home'));add(as,'away',coordsFromSelectedPositions(as,'away'));
            document.getElementById('match-home-squad-title').textContent=homeLabel;document.getElementById('match-away-squad-title').textContent=awayLabel;
            document.getElementById('match-squad-compare').innerHTML=hs.starters.map((homePlayer,i)=>{const awayPlayer=as.starters[i];const posSelect=(side,p)=>`<select onchange="updateMatchPosition('${side}',${i},this.value)" class="w-full bg-slate-950 border border-white/10 rounded-lg px-2 py-2 text-xs font-mono">${matchPositionOptions.map(pos=>`<option ${pos===p.pos?'selected':''}>${pos}</option>`).join('')}</select>`;return `<div class="grid grid-cols-[150px_1fr_150px_1fr] border-b border-white/5 last:border-b-0"><div class="px-3 py-2 bg-white/[0.015]">${posSelect('home',homePlayer)}</div><button onclick="selectMatchPlayer('home','${homePlayer.name}')" class="px-4 py-3 border-l border-white/5 text-left text-sm text-cyan-100 hover:bg-cyan-400/[0.06]">${homePlayer.name}</button><div class="px-3 py-2 border-l border-white/5 bg-white/[0.015]">${posSelect('away',awayPlayer)}</div><button onclick="selectMatchPlayer('away','${awayPlayer.name}')" class="px-4 py-3 border-l border-white/5 text-left text-sm text-rose-100 hover:bg-rose-400/[0.06]">${awayPlayer.name}</button></div>`}).join('');
            renderBench('home');renderBench('away');renderSubstitutionImpact();
        }
        function makeDraggable(el,pitch,side,index){let drag=false;el.addEventListener('pointerdown',e=>{drag=true;el.setPointerCapture(e.pointerId)});el.addEventListener('pointermove',e=>{if(!drag)return;const r=pitch.getBoundingClientRect();el.style.left=Math.max(4,Math.min(96,(e.clientX-r.left)/r.width*100))+'%';el.style.top=Math.max(5,Math.min(95,(e.clientY-r.top)/r.height*100))+'%'});el.addEventListener('pointerup',()=>{if(!drag)return;drag=false;const x=parseFloat(el.style.left),y=parseFloat(el.style.top);if(matchLineupState[side]?.starters[index])matchLineupState[side].starters[index].custom=[x,y];renderMatchCompare(false);showToast('선수 위치를 자유 배치로 저장했습니다.');})}
        function selectMatchPlayer(side,name){matchSelected[side]=name;const info=document.getElementById('matchup-info');if(matchSelected.home&&matchSelected.away)info.innerHTML=`<strong class="text-cyan-300">${matchSelected.home}</strong> vs <strong class="text-rose-300">${matchSelected.away}</strong><span class="block mt-2 text-slate-400">선택한 두 선수의 직접 대결 위치를 경기장에서 조정할 수 있습니다.</span>`;else info.textContent=`${name} 선택됨. 반대 팀 선수를 선택하세요.`;}

        function renderTacticalTeamFinder(){
            const select=document.getElementById('tactical-team-select'),results=document.getElementById('tactical-team-results');if(!select||!results)return;
            const entries=Object.keys(entityData.teams||{}).map(id=>{const config=tacticalTeamConfig(id);return {id,name:config.name,manager:config.manager};});
            if(select.options.length!==entries.length){select.innerHTML=entries.map(t=>`<option value="${t.id}">${t.name} · ${t.manager}</option>`).join('');select.dataset.ready='1';}select.value=currentTeam;
            const q=(document.getElementById('tactical-team-search')?.value||'').toLowerCase().trim(),filtered=entries.filter(t=>!q||`${t.name} ${t.manager}`.toLowerCase().includes(q));
            results.innerHTML=filtered.length?filtered.map(t=>`<button onclick="changeTeam('${t.id}')" id="btn-${t.id}" class="team-btn px-3 py-3 rounded-xl border font-bold text-sm transition-all duration-300 flex items-center justify-between ${currentTeam===t.id?'bg-eplPurple/20 border-eplNeon/40 text-white shadow-lg shadow-eplNeon/10':'border-white/5 bg-white/5 text-slate-400 hover:bg-white/10'}"><span><span class="block text-left">${t.name}</span><span class="block text-left text-[10px] opacity-60 mt-1">${t.manager}</span></span><i class="fa-solid fa-chevron-right text-[10px] opacity-50"></i></button>`).join(''):'<div class="p-4 text-center text-xs text-slate-600">검색 결과가 없습니다.</div>';
        }

        const tacticalPresetLibrary={tikitaka:{defline:55,width:35,pressing:65},gegen:{defline:80,width:45,pressing:95},lowblock:{defline:20,width:25,pressing:20}};
        const tacticalSquadState={};
        const tacticalPositionOverrides={
            'player-api-19465':['GK'],'player-api-22090':['RCB','CB'],'player-api-333682':['CB','RB'],'player-api-37127':['RCM','AM','CM'],'player-api-19586':['AM','LW','CM'],'player-api-1460':['RW'],'player-api-643':['ST','RW'],'player-api-19959':['RB','CB'],'player-api-127817':['LCB','LB'],'player-api-22224':['LCB','CB'],'player-api-127769':['LW'],
            'player-api-727':['RW','LW'],'player-api-38746':['RB','CB'],'player-api-2273':['GK'],'player-api-18979':['ST'],'player-api-161800':['LW','RW'],'player-api-136723':['RW','LW'],'player-api-41725':['AM','CM'],'player-api-313236':['AM','RW'],'player-api-47311':['CM','DM'],'player-api-978':['ST','AM'],'player-api-20619':['GK'],
            'player-api-47315':['DM','CM'],'player-api-10135':['CM','DM'],'player-api-2937':['LCM','DM','CM'],'player-api-313245':['LB','CM'],'player-api-442044':['AM','RW'],'player-api-157052':['LB','LCB']
        };
        const tacticalPreferredXI={arsenal:['player-api-19465','player-api-38746','player-api-22090','player-api-22224','player-api-157052','player-api-37127','player-api-47315','player-api-2937','player-api-1460','player-api-18979','player-api-127769']};
        function tacticalSquadPlayer(row){const player=entityData.players?.[row.id]||{};let available=row.grid?[row.position]:(tacticalPositionOverrides[row.id]||row.availablePositions||player.positions||[row.position||player.position||'CM']);if(typeof available==='string')available=[available];return {id:row.id,name:player.koreanName||row.name||player.name||'선수 미확정',position:available[0],availablePositions:available};}
        function tacticalPositionGroup(position){if(position==='GK')return'GK';if(['CB','RCB','LCB','RB','LB','RWB','LWB'].includes(position))return'DF';if(['CM','RCM','LCM','DM','RDM','LDM','AM','RAM','LAM','RM','LM'].includes(position))return'MF';return'FW';}
        function tacticalFormationRequirements(formation){return (formationsMap[formation]||formationsMap['4-3-3']).reduce((counts,slot)=>{const group=tacticalPositionGroup(slot.pos);counts[group]=(counts[group]||0)+1;return counts;},{GK:0,DF:0,MF:0,FW:0});}
        function buildBalancedTacticalSquad(teamId,formation){
            const squad=entityData.squads?.[teamId]||{};
            const preferred=(squad.starters||[]).map(tacticalSquadPlayer);
            const reserves=(squad.substitutes||[]).map(tacticalSquadPlayer);
            const priority=tacticalPreferredXI[teamId]||[];
            const all=[...preferred,...reserves].filter((player,index,list)=>player.id&&list.findIndex(item=>item.id===player.id)===index).sort((a,b)=>{const ai=priority.indexOf(a.id),bi=priority.indexOf(b.id);return (ai<0?999:ai)-(bi<0?999:bi);});
            const requirements=tacticalFormationRequirements(formation);
            const selected=[];
            ['GK','DF','MF','FW'].forEach(group=>{
                const candidates=all.filter(player=>tacticalPositionGroup(player.position)===group&&!selected.some(item=>item.id===player.id));
                selected.push(...candidates.slice(0,requirements[group]));
            });
            if(selected.length<11)selected.push(...all.filter(player=>!selected.some(item=>item.id===player.id)).slice(0,11-selected.length));
            const ordered=(formationsMap[formation]||formationsMap['4-3-3']).map(slot=>{
                const group=tacticalPositionGroup(slot.pos);
                const exact=selected.find(player=>player.availablePositions?.includes(slot.pos)&&!player.assigned);
                const compatible=selected.find(player=>tacticalPositionGroup(player.position)===group&&!player.assigned);
                const fallback=selected.find(player=>!player.assigned);
                const player=exact||compatible||fallback;if(player)player.assigned=true;return player;
            }).filter(Boolean).map(player=>{const clean={...player};delete clean.assigned;return clean;});
            const selectedIds=new Set(ordered.map(player=>player.id));
            return {starters:ordered,bench:all.filter(player=>!selectedIds.has(player.id))};
        }
        function ensureTacticalSquad(teamId){
            if(tacticalSquadState[teamId])return tacticalSquadState[teamId];
            const firstMatch=entityData.firstMatchLineups?.teams?.[teamId];
            if(firstMatch){tacticalSquadState[teamId]={starters:firstMatch.starters.map(tacticalSquadPlayer),bench:firstMatch.substitutes.map(tacticalSquadPlayer),status:firstMatch.status,formation:firstMatch.formation};return tacticalSquadState[teamId];}
            const requested=entityData.teams?.[teamId]?.defaultFormation;const formation=formationsMap[requested]?requested:(requested==='3-2-4-1'?'3-4-2-1':'4-3-3');
            tacticalSquadState[teamId]=buildBalancedTacticalSquad(teamId,formation);
            return tacticalSquadState[teamId];
        }
        function tacticalTeamConfig(teamId=currentTeam){
            const team=entityData.teams?.[teamId]||{};const manager=entityData.managers?.[teamId]||{};const current=entityData.currentManagers?.managers?.[teamId]||{};const squad=entityData.squads?.[teamId]||{};
            const players=ensureTacticalSquad(teamId).starters;
            const firstMatch=entityData.firstMatchLineups?.teams?.[teamId];return {id:teamId,name:team.koreanName||team.name||teamId,manager:current.koreanName||current.englishName||manager.name||'감독 미확정',nationality:current.nationalities?.join(', ')||manager.nationality||'미확정',defaultFormation:firstMatch?.formation||team.defaultFormation||'4-3-3',style:manager.style||'검증된 전술 설명을 준비 중입니다.',signings:manager.signings||'이적 정보 미확정',feedback:manager.feedback||'검증된 경기 자료 기반 전술 분석을 준비 중입니다.',traits:Array.isArray(manager.traits)?manager.traits:[],career:(current.coachingCareer||[]).slice(-3).map(item=>item.teamName),keyPlayers:players.slice(0,3).map(player=>player.name),players,presets:tacticalPresetLibrary};
        }
        let currentTeam = 'arsenal';
        let currentFormation = '4-3-3';
        const tacticalCustomPositions={};
        const tacticalPlayerRoles={};
        let selectedTacticalPlayerId=null;
        function tacticalPositionKey(playerId){return `${currentTeam}:${currentFormation}:${playerId}`;}
        function tacticalRoleKey(playerId){return `${currentTeam}:${currentFormation}:${playerId}`;}
        function compatibleTacticalRoles(position){const groups=position==='GK'?['골키퍼']:['CB','RCB','LCB'].includes(position)?['센터백']:['RB','LB','RWB','LWB'].includes(position)?['풀백·윙백']:['DM','RDM','LDM'].includes(position)?['수비형 미드필더']:['CM','RCM','LCM','AM','RAM','LAM'].includes(position)?['미드필더']:['RW','LW','RM','LM'].includes(position)?['윙어']:['공격수'];return entityData.roles.filter(role=>groups.includes(role.group));}
        function renderTacticalRoleControls(playerId=selectedTacticalPlayerId){
            const pitch=document.getElementById('pitch-players'),header=pitch?.parentElement?.previousElementSibling;if(!header)return;let controls=document.getElementById('tactical-player-controls');if(!controls){controls=document.createElement('div');controls.id='tactical-player-controls';controls.className='hidden items-center gap-2';controls.innerHTML='<span id="tactical-selected-player" class="text-xs text-slate-300"></span><select id="tactical-role-select" class="max-w-[180px] bg-slate-950 border border-white/10 rounded-lg px-2 py-2 text-xs"></select><button id="tactical-player-detail" type="button" class="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs">선수 상세</button>';header.appendChild(controls);}
            const node=playerId?document.querySelector(`#pitch-players [data-player-id="${playerId}"]`):null;if(!node){controls.classList.add('hidden');controls.classList.remove('flex');return;}
            selectedTacticalPlayerId=playerId;controls.classList.remove('hidden');controls.classList.add('flex');document.getElementById('tactical-selected-player').textContent=node.dataset.playerName||'선수';const roles=compatibleTacticalRoles(node.dataset.position);const select=document.getElementById('tactical-role-select');select.innerHTML='<option value="">역할 미지정</option>'+roles.map(role=>`<option value="${role.id}">${role.nameKo}</option>`).join('');select.value=tacticalPlayerRoles[tacticalRoleKey(playerId)]||'';select.onchange=()=>{if(select.value)tacticalPlayerRoles[tacticalRoleKey(playerId)]=select.value;else delete tacticalPlayerRoles[tacticalRoleKey(playerId)];updateSliders();renderTacticalRoleControls(playerId);showToast(`${node.dataset.playerName} 역할 상태를 변경했습니다.`);};document.getElementById('tactical-player-detail').onclick=()=>openPlayerProfile(playerId);
        }
        function inferTacticalShape(){
            const nodes=[...document.querySelectorAll('#pitch-players [data-player-id]')].filter(node=>node.dataset.position!=='GK');const ys=nodes.map(node=>Number.parseFloat(node.style.top)).filter(Number.isFinite).sort((a,b)=>b-a);if(!ys.length)return currentFormation;
            const lines=[];ys.forEach(y=>{const line=lines[lines.length-1];if(!line||Math.abs(line.mean-y)>12)lines.push({values:[y],mean:y});else{line.values.push(y);line.mean=line.values.reduce((sum,value)=>sum+value,0)/line.values.length;}});return lines.map(line=>line.values.length).join('-');
        }
        function makeTacticalPlayerDraggable(node,pitch,playerId){let dragging=false,moved=false;node.addEventListener('pointerdown',event=>{dragging=true;moved=false;node.dataset.dragged='false';node.setPointerCapture(event.pointerId);});node.addEventListener('pointermove',event=>{if(!dragging)return;const rect=pitch.getBoundingClientRect(),x=Math.max(4,Math.min(96,(event.clientX-rect.left)/rect.width*100)),y=Math.max(5,Math.min(95,(event.clientY-rect.top)/rect.height*100));node.style.left=`${x}%`;node.style.top=`${y}%`;moved=true;});node.addEventListener('pointerup',()=>{if(!dragging)return;dragging=false;if(!moved)return;node.dataset.dragged='true';const x=Number.parseFloat(node.style.left),y=Number.parseFloat(node.style.top);tacticalCustomPositions[tacticalPositionKey(playerId)]={x,y};const inferred=inferTacticalShape();showToast(`자유 배치 저장 · 감지 대형 ${inferred} · 사용자 위치는 유지됩니다.`);});}
        function resetTacticalBoard(){const prefix=`${currentTeam}:${currentFormation}:`;Object.keys(tacticalCustomPositions).filter(key=>key.startsWith(prefix)).forEach(key=>delete tacticalCustomPositions[key]);Object.keys(tacticalPlayerRoles).filter(key=>key.startsWith(prefix)).forEach(key=>delete tacticalPlayerRoles[key]);selectedTacticalPlayerId=null;updateSliders();renderTacticalRoleControls(null);showToast(`${currentFormation} 기본 배치와 역할 상태로 초기화했습니다.`);}
        function renderTacticalBench(){
            const box=document.getElementById('tactical-bench'),count=document.getElementById('tactical-bench-count');if(!box)return;
            const state=ensureTacticalSquad(currentTeam);if(count)count.textContent=`${state.bench.length}명 · ${state.status==='official-first-match-xi'?'첫 경기 공식 명단':'예상 명단'}`;
            box.innerHTML=state.bench.length?state.bench.map((player,index)=>`<button type="button" onclick="substituteTacticalPlayer(${index})" class="shrink-0 min-w-[132px] rounded-lg border border-white/10 bg-white/[.035] px-3 py-2 text-left hover:border-eplNeon/30 hover:bg-eplNeon/5 transition"><strong class="block truncate text-xs text-white">${escapeHtml(player.name)}</strong><span class="mt-1 block text-[10px] font-mono text-eplNeon">${escapeHtml(player.position)} · 투입</span></button>`).join(''):'<span class="text-xs text-slate-600">등록된 교체 선수가 없습니다.</span>';
        }
        function substituteTacticalPlayer(benchIndex){
            const state=ensureTacticalSquad(currentTeam),starterIndex=state.starters.findIndex(player=>player.id===selectedTacticalPlayerId);
            if(starterIndex<0)return showToast('먼저 전술판에서 교체할 선발 선수를 선택해 주세요.');
            const incoming=state.bench[benchIndex],outgoing=state.starters[starterIndex];if(!incoming||!outgoing)return;
            state.starters[starterIndex]=incoming;state.bench[benchIndex]=outgoing;
            const oldPositionKey=tacticalPositionKey(outgoing.id),newPositionKey=tacticalPositionKey(incoming.id);if(tacticalCustomPositions[oldPositionKey]){tacticalCustomPositions[newPositionKey]=tacticalCustomPositions[oldPositionKey];delete tacticalCustomPositions[oldPositionKey];}
            selectedTacticalPlayerId=incoming.id;updateSliders();renderTacticalBench();renderTacticalRoleControls(incoming.id);showToast(`${outgoing.name} OUT · ${incoming.name} IN`);
        }

        // Initialize Screen safely after DOM is ready
        document.addEventListener('DOMContentLoaded', function () {
            renderTeam();
            renderManagerComparison();
            renderTeamComparison();
            renderPlayerComparison();
            initMatchCompare();
            renderTacticalTeamFinder();
        });

        // Select Team
        function changeTeam(teamKey,notify=true) {
            if(!entityData.teams?.[teamKey]){if(notify)showToast('선택한 팀 데이터를 찾을 수 없습니다.');return;}
            currentTeam = teamKey;
            selectedTacticalPlayerId=null;

            // Toggle Button Styling
            document.querySelectorAll('.team-btn').forEach(btn => {
                btn.classList.remove('bg-eplPurple/20', 'border-eplNeon/40', 'text-white', 'shadow-lg', 'shadow-eplNeon/10');
                btn.classList.add('border-white/5', 'bg-white/5', 'text-slate-400');
            });

            const selectedBtn = document.getElementById(`btn-${teamKey}`);
            if (selectedBtn) {
                selectedBtn.classList.remove('border-white/5', 'bg-white/5', 'text-slate-400');
                selectedBtn.classList.add('bg-eplPurple/20', 'border-eplNeon/40', 'text-white', 'shadow-lg', 'shadow-eplNeon/10');
            }

            // Fallback default formation mapping if the team has default config
            const teamDefaultForm = tacticalTeamConfig(teamKey).defaultFormation;
            if (entityData.firstMatchLineups?.teams?.[teamKey]) {
                currentFormation = teamDefaultForm;
            } else if (formationsMap[teamDefaultForm]) {
                currentFormation = teamDefaultForm;
            } else {
                currentFormation = '3-4-2-1'; // fallback
            }
            if(!entityData.firstMatchLineups?.teams?.[teamKey])tacticalSquadState[teamKey]=buildBalancedTacticalSquad(teamKey,currentFormation);

            const tacticalSelect=document.getElementById('tactical-team-select');if(tacticalSelect)tacticalSelect.value=teamKey;renderTacticalTeamFinder();
            if(notify)showToast(`${tacticalTeamConfig(teamKey).name} 데이터를 불러왔습니다.`);
            renderTeam();
        }

        // Handle Manual Formation Button click
        function changeFormation(formKey) {
            currentFormation = formKey;
            selectedTacticalPlayerId=null;
            tacticalSquadState[currentTeam]=buildBalancedTacticalSquad(currentTeam,currentFormation);
            showToast(`대형 포메이션이 ${formKey} 상태로 실시간 재배치되었습니다.`);
            renderTeam();
        }

        // Show Custom Animated Toast Notification (No-Alert Policy)
        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toast-msg');
            toastMsg.innerText = message;

            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Render details and sync configuration controls
        function renderTeam() {
            const team = tacticalTeamConfig(currentTeam);
            if (!team) return;

            // Sync formation select buttons highlighted
            document.querySelectorAll('.form-btn').forEach(btn => {
                btn.classList.remove('bg-eplBlue/20', 'border-eplBlue', 'text-eplBlue', 'shadow-lg', 'shadow-eplBlue/10');
                btn.classList.add('bg-slate-950', 'border-white/10', 'text-slate-300');
            });
            const activeFormBtn = document.getElementById(`form-${currentFormation}`);
            if (activeFormBtn) {
                activeFormBtn.classList.remove('bg-slate-950', 'border-white/10', 'text-slate-300');
                activeFormBtn.classList.add('bg-eplBlue/20', 'border-eplBlue', 'text-eplBlue', 'shadow-lg', 'shadow-eplBlue/10');
            }

            // Text values inject
            document.getElementById('txt-formation').innerText = currentFormation;
            document.getElementById('txt-manager').innerText = `${team.manager} 감독`;
            document.getElementById('txt-nationality').innerText = team.nationality || '국적 정보 업데이트 예정';
            document.getElementById('txt-style').innerText = team.style || '전술 스타일 업데이트 예정';
            document.getElementById('txt-signings').innerText = team.signings || '이적 정보 업데이트 예정';
            document.getElementById('txt-manager-feedback').innerText = team.feedback || '감독 분석 업데이트 예정';
            document.getElementById('txt-ai-feedback').innerText = team.feedback || '선택한 감독의 전술 데이터를 분석합니다.';

            const experience = {traits:team.traits.length?team.traits:['전술 데이터 준비 중'],metrics:{}};
            const traitBox = document.getElementById('manager-traits');
            if (traitBox) traitBox.innerHTML = experience.traits.map(trait => `<span class="manager-trait">${trait}</span>`).join('');
            const metricIds = { buildUp: 'build-up', pressing: 'pressing', possession: 'possession', transition: 'transition' };
            Object.entries(experience.metrics).forEach(([key, value]) => {
                const suffix = metricIds[key];
                const label = document.getElementById(`rating-${suffix}`);
                const bar = document.getElementById(`bar-${suffix}`);
                if (label) label.textContent = value;
                if (bar) requestAnimationFrame(() => { bar.style.width = `${value}%`; });
            });
            if(!Object.keys(experience.metrics).length){document.querySelectorAll('#manager-rating-grid strong').forEach(node=>node.textContent='—');document.querySelectorAll('#manager-rating-grid i').forEach(node=>node.style.width='0%');}

            const careerList = document.getElementById('txt-career');
            const keyPlayerList = document.getElementById('txt-key-players');
            careerList.innerHTML = Array.isArray(team.career) && team.career.length
                ? team.career.map(item => `<li>• ${item}</li>`).join('')
                : '<li>경력 정보 업데이트 예정</li>';
            keyPlayerList.innerHTML = Array.isArray(team.keyPlayers) && team.keyPlayers.length
                ? team.keyPlayers.map(item => `<li>• ${item}</li>`).join('')
                : '<li>선수 정보 업데이트 예정</li>';

            // Apply positions based on slider values
            updateSliders();
            const pitch=document.getElementById('pitch-players'),header=pitch?.parentElement?.previousElementSibling;if(header&&!document.getElementById('tactical-reset-button')){const button=document.createElement('button');button.id='tactical-reset-button';button.type='button';button.className='px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/10';button.innerHTML='<i class="fa-solid fa-rotate-right mr-1"></i>기본 배치';button.onclick=resetTacticalBoard;header.appendChild(button);}
        }

        function compareCurrentManager() {
            if (!managerComparisonData.some(manager=>manager.id===currentTeam)) {
                showToast('이 감독의 비교 데이터는 준비 중입니다.');
                return;
            }
            selectedManagerIds.clear();
            selectedManagerIds.add(currentTeam);
            switchView('compare');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast('현재 감독을 비교 화면에 추가했습니다. 최대 2명을 더 선택할 수 있습니다.');
        }

        function applyManagerTactic() {
            const team = tacticalTeamConfig(currentTeam);
            if (!team) return;

            const supportedFormations = Object.keys(formationsMap);
            const requestedFormation = team.defaultFormation;
            const fallbackMap = { '3-2-4-1': '3-4-2-1' };
            currentFormation = supportedFormations.includes(requestedFormation)
                ? requestedFormation
                : (fallbackMap[requestedFormation] || '4-3-3');
            tacticalSquadState[currentTeam]=buildBalancedTacticalSquad(currentTeam,currentFormation);

            const preset = tacticalPresetLibrary.tikitaka;
            if (preset) {
                document.getElementById('slider-defline').value = preset.defline;
                document.getElementById('slider-width').value = preset.width;
                document.getElementById('slider-pressing').value = preset.pressing;
            }

            renderTeam();
            const note = requestedFormation === currentFormation
                ? `${team.manager} 감독의 ${currentFormation} 기본 전술을 적용했습니다.`
                : `${team.manager} 감독의 ${requestedFormation}을 현재 보드에서 지원하는 ${currentFormation} 구조로 변환해 적용했습니다.`;
            showToast(note);
        }

        // Sliders change calculations dynamically affecting DOM elements (Player dots)
        function updateSliders() {
            const team = tacticalTeamConfig(currentTeam);
            const players = team.players;
            const firstMatch=entityData.firstMatchLineups?.teams?.[currentTeam];
            const formationLayouts=firstMatch&&currentFormation===firstMatch.formation?firstMatch.starters.map(player=>({pos:player.position,x:player.x,y:player.y,role:tacticalPositionGroup(player.position)==='GK'?'gk':tacticalPositionGroup(player.position)==='DF'?'def':['RB','LB','RWB','LWB','RW','LW','RM','LM','RAM','LAM'].includes(player.position)?'wide':'mid'})):formationsMap[currentFormation];
            if (!team || players.length<11 || !formationLayouts) {const pitch=document.getElementById('pitch-players');if(pitch)pitch.innerHTML='<div class="absolute inset-0 grid place-items-center text-xs text-amber-200">유효한 11명 라인업 또는 포메이션 데이터가 없습니다.</div>';return;}

            const defLine = parseInt(document.getElementById('slider-defline').value);
            const width = parseInt(document.getElementById('slider-width').value);
            const pressing = parseInt(document.getElementById('slider-pressing').value);

            // Print values inside panel
            document.getElementById('val-defline').innerText = defLine;
            document.getElementById('val-width').innerText = width;
            document.getElementById('val-pressing').innerText = pressing;

            // Target DOM render box
            const pitch = document.getElementById('pitch-players');
            if (!pitch) return;
            pitch.innerHTML = '';
            renderTacticalBench();

            // Compute dynamic positions based on formation & sliders
            formationLayouts.forEach((p, idx) => {
                let x = p.x;
                let y = p.y;
                const player = players[idx];
                const playerName = player?.name || `선수 ${idx + 1}`;

                // 1. Shift Defensive Line (Y axis offset except GK)
                if (p.role !== 'gk') {
                    const shiftY = (defLine - 50) * 0.35; // mapping offset factor
                    y = y - shiftY;
                    if (y < 5) y = 5;
                    if (y > 88) y = 88;
                }

                // 2. Shift Width (X axis offset)
                if (p.role === 'wide') {
                    const offset = (width - 50) * 0.28; // stretch outwards or inwards
                    if (x > 50) {
                        x = x + offset;
                    } else {
                        x = x - offset;
                    }
                    if (x < 4) x = 4;
                    if (x > 96) x = 96;
                } else if (p.role === 'mid') {
                    const offset = (width - 50) * 0.12; // mild adjustment for mids
                    if (x > 50) {
                        x = x + offset;
                    } else if (x < 50) {
                        x = x - offset;
                    }
                }

                // Create player node
                const dot = document.createElement('button');
                dot.type='button';dot.dataset.playerId=player?.id||'';dot.dataset.playerName=playerName;dot.setAttribute('aria-label',`${playerName} ${p.pos} 위치 및 역할 선택`);
                dot.dataset.position=p.pos;dot.className = `absolute flex flex-col items-center justify-center transition-all duration-200 ease-out z-10 select-none cursor-move touch-none ${selectedTacticalPlayerId===player?.id?'ring-2 ring-eplBlue rounded-xl':''}`;
                dot.title = `${playerName} 선택 · 드래그로 이동`;
                dot.addEventListener('click', () => {if(dot.dataset.dragged==='true'){dot.dataset.dragged='false';return;}if(player?.id){selectedTacticalPlayerId=player.id;updateSliders();renderTacticalRoleControls(player.id);}else showToast('선수 상세 데이터를 찾을 수 없습니다.');});
                dot.addEventListener('dblclick',()=>{if(player?.id)openPlayerProfile(player.id);});
                dot.style.left = `${x}%`;
                dot.style.top = `${y}%`;
                const custom=tacticalCustomPositions[tacticalPositionKey(player?.id||String(idx))];if(custom){dot.style.left=`${custom.x}%`;dot.style.top=`${custom.y}%`;}
                dot.style.transform = "translate(-50%, -50%)";

                // CSS Pressing Glow Pulse effect (Fast ping animation on high intensity)
                const pulseClass = pressing > 75
                    ? "absolute w-10 h-10 rounded-full bg-eplNeon/30 animate-ping"
                    : (pressing > 40 ? "absolute w-9 h-9 rounded-full bg-eplNeon/15 animate-pulse" : "hidden");

                // Check if signing to highlight them uniquely
                const isSigning = false;
                const borderClass = isSigning
                    ? "border-eplBlue shadow-[0_0_12px_rgba(0,240,255,0.8)]"
                    : "border-eplNeon shadow-[0_0_8px_rgba(0,255,135,0.4)]";

                const labelClass = isSigning
                    ? "bg-gradient-to-r from-slate-900 to-eplBlue/20 border border-eplBlue/40 text-eplBlue"
                    : "bg-slate-900/95 border border-slate-700/50 text-white";

                const assignedRole=entityData.roles.find(role=>role.id===tacticalPlayerRoles[tacticalRoleKey(player?.id||'')]);
                dot.innerHTML = `
                    <div class="relative flex items-center justify-center cursor-pointer group">
                        <div class="${pulseClass}"></div>
                        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-950 via-[#190933] to-slate-950 border-2 ${borderClass} flex items-center justify-center text-[10px] font-bold text-white tracking-tighter group-hover:scale-110 transition-transform">
                            ${p.pos}
                        </div>
                    </div>
                    <span class="mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-md ${labelClass}">
                        ${playerName}
                    </span>
                    ${assignedRole?`<span class="mt-0.5 text-[8px] text-eplBlue bg-slate-950/90 px-1 rounded">${assignedRole.nameKo}</span>`:''}
                `;
                makeTacticalPlayerDraggable(dot,pitch,player?.id||String(idx));
                pitch.appendChild(dot);
            });
            renderTacticalRoleControls(selectedTacticalPlayerId);
        }

        // Apply tactical master template presets
        function applyPreset(presetKey) {
            const preset = tacticalPresetLibrary[presetKey];
            if (!preset) return;

            // Update inputs values
            document.getElementById('slider-defline').value = preset.defline;
            document.getElementById('slider-width').value = preset.width;
            document.getElementById('slider-pressing').value = preset.pressing;

            showToast(`${presetKey.toUpperCase()} 전술 템플릿 프리셋이 적용되었습니다.`);
            updateSliders();
        }

        // Export Data and Trigger Mock Diagnostic report modal
        function exportTactics() {
            const team = tacticalTeamConfig(currentTeam);
            if (!team) return;
            const defLine = document.getElementById('slider-defline').value;
            const width = document.getElementById('slider-width').value;
            const pressing = document.getElementById('slider-pressing').value;

            document.getElementById('modal-team').innerText = `${team.manager} | ${currentFormation}`;
            document.getElementById('modal-def').innerText = defLine;
            document.getElementById('modal-wid').innerText = width;
            document.getElementById('modal-press').innerText = pressing;

            // Generate Diagnostic text
            let diagnosticText = "";
            if (defLine > 70 && pressing > 75) {
                diagnosticText = `극단적인 초고전방 압박 대형입니다. ${team.manager} 감독의 핵심 전력들이 높은 하이라인 백업에서 배후 노출 리스크가 증가할 수 있으므로 민첩성이 강한 CB 조합이 필수적으로 요구됩니다.`;
            } else if (defLine < 35) {
                diagnosticText = "단단한 백블록 저지 구조입니다. 상대 역공을 원천 차단하고 종방향으로 빠르게 치고 갈 수 있는 기동력 좋은 공격 채널의 순간 카운터 역량에 의존해야 합니다.";
            } else {
                diagnosticText = "공수 균형이 고도로 이식된 가변 밸런스 지공 대형입니다. 현대 전술가들이 가장 지향하는 수적 우위를 통한 패스 레인 확보에 용이합니다.";
            }

            document.getElementById('modal-analysis').innerText = diagnosticText;
            document.getElementById('export-modal').classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('export-modal').classList.add('hidden');
        }


// ===== Integrated manager profile SPA =====
const managerProfileData = {
  chelsea: { teamId:'chelsea', team:'Chelsea', name:'사비 알론소 (Xabi Alonso)', nationality:'스페인', formation:'3-4-2-1', identity:'Hybrid back three', traits:['후방 빌드업','중앙 과부하','유동적 백3'], style:'3명의 센터백과 더블 피벗을 기반으로 안정적인 전진 패스를 만들고, 두 명의 공격형 미드필더가 하프스페이스를 점유하는 모델입니다.', ratings:{빌드업:92,압박:83,점유:88,전환:79}, sliders:{defline:68,width:55,press:83}, keyPlayers:[['딥라잉 플레이메이커','1차 빌드업과 방향 전환','palmer'],['인버티드 윙백','중앙 숫자 우위 형성',''],['하프스페이스 10번','라인 사이 침투와 찬스 생성','palmer']], career:[{period:'2018–2019',club:'레알 마드리드 유소년',role:'유소년 지도자',note:'지도자 경력을 시작하며 점유와 위치 플레이의 기초 모델을 구축'},{period:'2019–2022',club:'레알 소시에다드 B',role:'감독',note:'젊은 선수 중심의 빌드업 체계와 조직적인 압박을 발전'},{period:'2022–2025',club:'바이어 레버쿠젠',role:'감독',note:'가변 백3와 윙백 구조를 활용해 팀의 전술적 완성도를 크게 향상'},{period:'2026–',club:'Chelsea',role:'감독 · 프로젝트 시나리오',note:'기존 자원을 바탕으로 하이브리드 백3 모델을 적용'}], achievements:['가변 백3와 더블 피벗을 결합한 안정적 전진 구조','선수별 역할을 명확히 나누면서도 공격 시 위치 교환을 허용','수비 전환 시 중앙 보호와 측면 복귀의 균형'], principles:[['빌드업','골키퍼와 센터백으로 첫 압박을 유인한 뒤 중앙 패스 레인을 확보'],['공격','두 명의 10번이 하프스페이스에서 전진 패스와 침투를 연결'],['수비','공을 잃은 즉시 중앙을 닫고 윙백이 빠르게 최종 라인으로 복귀']], feedback:'상대 압박이 강할수록 골키퍼와 중앙 수비수의 패스 각도를 넓혀 첫 압박선을 유인하는 것이 핵심입니다.' },
  mancity: { teamId:'mancity', team:'Manchester City', name:'엔초 마레스카 (Enzo Maresca)', nationality:'이탈리아', formation:'4-3-3', identity:'Positional control', traits:['포지셔널 플레이','인버티드 풀백','높은 점유율'], style:'후방에서 한 명의 풀백을 중원으로 이동시켜 3-2 빌드업을 만들고, 넓은 윙어와 하프스페이스 미드필더로 수비 블록을 벌립니다.', ratings:{빌드업:90,압박:78,점유:93,전환:74}, sliders:{defline:72,width:70,press:78}, keyPlayers:[['인버티드 풀백','중앙 빌드업 보조와 세컨드볼 회수',''],['8번 미드필더','하프스페이스 점유와 박스 침투',''],['터치라인 윙어','폭 유지와 1대1 돌파','']], career:[{period:'2017–2018',club:'아스콜리·세비야',role:'코칭스태프',note:'선수 은퇴 후 분석과 코칭 업무로 지도자 경력을 시작'},{period:'2020–2021',club:'Manchester City U23',role:'감독',note:'포지셔널 플레이와 유소년 선수 개발 경험을 축적'},{period:'2022–2023',club:'Manchester City',role:'코칭스태프',note:'1군의 점유 구조와 세부 위치 훈련에 참여'},{period:'2023–2024',club:'Leicester City',role:'감독',note:'후방 3-2 구조와 높은 점유율을 중심으로 팀 모델을 확립'},{period:'2026–',club:'Manchester City',role:'감독 · 프로젝트 시나리오',note:'중앙 숫자 우위와 넓은 공격 폭을 결합한 모델을 적용'}], achievements:['인버티드 풀백을 활용한 중앙 3-2 빌드업','포지션별 점유 구역을 명확히 나누는 공격 구조','볼 소유를 수비 수단으로 활용하는 경기 통제'], principles:[['빌드업','한 명의 풀백을 중원으로 이동시켜 중앙에서 항상 추가 패스 옵션 확보'],['공격','윙어는 폭을 유지하고 8번은 하프스페이스에서 박스 침투'],['수비','공격 구조를 유지한 채 가까운 선수들이 즉시 역압박']], feedback:'측면 폭을 유지하면서 중앙에 최소 3명의 패스 옵션을 확보해야 전술의 장점이 살아납니다.' },
  tottenham: { teamId:'tottenham', team:'Tottenham Hotspur', name:'로베르토 데 제르비 (Roberto De Zerbi)', nationality:'이탈리아', formation:'4-2-3-1', identity:'Pressure invitation', traits:['압박 유인','짧은 패스','빠른 전진'], style:'낮은 위치에서 상대 압박을 의도적으로 끌어들인 뒤, 짧은 패스 조합으로 압박선을 제거하고 전방 숫자 우위를 활용합니다.', ratings:{빌드업:95,압박:75,점유:87,전환:86}, sliders:{defline:62,width:64,press:75}, keyPlayers:[['더블 피벗','압박 탈출을 위한 짧은 연결',''],['공격형 미드필더','라인 사이 수신과 전진 패스',''],['스피드 윙어','압박선 돌파 이후 넓은 공간 공략','']], career:[{period:'2013–2016',club:'다르포 보아리오·포자',role:'감독',note:'짧은 패스와 후방 빌드업 중심의 지도 철학을 형성'},{period:'2017–2018',club:'Benevento',role:'감독',note:'강한 상대를 상대로도 빌드업 원칙을 유지'},{period:'2018–2021',club:'Sassuolo',role:'감독',note:'공격적인 점유 축구와 기술적 미드필더 활용으로 주목'},{period:'2022–2024',club:'Brighton',role:'감독',note:'프리미어리그에서 압박 유인형 후방 빌드업을 성공적으로 구현'},{period:'2026–',club:'Tottenham Hotspur',role:'감독 · 프로젝트 시나리오',note:'빠른 공격 자원과 압박 유인 구조를 결합'}], achievements:['상대 전방 압박을 공격 기회로 바꾸는 빌드업','더블 피벗과 골키퍼를 활용한 짧은 패스 탈압박','첫 압박선 돌파 후 빠르게 전진하는 종방향 공격'], principles:[['빌드업','상대를 가까이 끌어들여 뒤쪽 공간을 의도적으로 생성'],['공격','첫 압박선을 통과하면 짧은 패스보다 빠른 전진을 우선'],['수비','전방 압박보다 공을 잃은 위치 주변의 즉각적인 수적 우위 확보']], feedback:'선수 간격이 지나치게 벌어지면 빌드업 리스크가 커지므로 후방 6명의 연결 거리를 일정하게 유지해야 합니다.' }
}
let activeManagerProfileKey = localStorage.getItem('tv-selected-manager') || 'chelsea';

function initialiseManagerProfile(){
  const select=document.getElementById('manager-profile-select');
  if(!select || select.dataset.ready) return;
  select.innerHTML=Object.entries(managerProfileData).map(([key,m])=>`<option value="${key}">${m.team} · ${m.name}</option>`).join('');
  select.dataset.ready='1';
  renderManagerProfile(activeManagerProfileKey);
}
function openManagerProfile(key){
  if(entityData.status!=='ready')return initialiseEntityData().then(()=>openManagerProfile(key));
  if(!key||!managerProfileData[key]){showToast('해당 ID의 감독 정보를 찾을 수 없습니다.');switchView('home');return;}
  activeManagerProfileKey=key;
  renderManagerProfile(activeManagerProfileKey);
  switchView('manager');
  history.pushState({view:'manager',key:activeManagerProfileKey},'',`#manager/${activeManagerProfileKey}`);
  window.scrollTo({top:0,behavior:'smooth'});
}
function renderManagerProfile(key=activeManagerProfileKey){
  initialiseManagerProfile();
  if(!managerProfileData[key]) key='chelsea';
  activeManagerProfileKey=key;
  localStorage.setItem('tv-selected-manager',key);
  const m=managerProfileData[key];
  const select=document.getElementById('manager-profile-select'); if(select) select.value=key;
  const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value};
  set('profile-team',m.team.toUpperCase()); set('profile-name',m.name); set('profile-english-name',m.english&&m.english!==m.name?m.english:''); set('profile-nationality',`🌍 ${m.nationality}`); set('profile-birth-date',m.birthDate?`생년월일 ${m.birthDate}`:'생년월일 데이터 준비 중'); set('profile-formation',m.formation); set('profile-identity',m.identity); set('profile-style',m.style); set('profile-feedback',m.feedback);
  const photo=document.getElementById('profile-photo-frame');
  if(photo)photo.innerHTML=m.image?`<a href="${m.imageSourceUrl||m.image}" target="_blank" rel="noopener noreferrer" class="block w-full h-full" title="사진 출처 확인"><img src="${m.image}" alt="${m.name} 감독 프로필" class="w-full h-full object-cover" style="object-position:${m.imageFocus}" referrerpolicy="no-referrer"></a>`:'<i class="fa-solid fa-user-tie"></i>';
  const traits=document.getElementById('profile-traits'); if(traits) traits.innerHTML=m.traits.map(x=>`<span class="manager-trait">${x}</span>`).join('');
  const sources=document.getElementById('profile-sources'); if(sources){const provisional=String(m.analysisStatus).startsWith('provisional');const status=`<span class="px-2.5 py-1.5 rounded-lg border text-[10px] ${provisional?'border-amber-300/20 bg-amber-300/5 text-amber-300':'border-eplNeon/20 bg-eplNeon/5 text-eplNeon'}">${provisional?'초기·이전 팀 자료 기반':'경기 자료 검토 완료'}</span><span class="px-2.5 py-1.5 rounded-lg border border-purple-300/20 bg-purple-300/5 text-[10px] text-purple-300">전술판 값 · TacticVision 분석</span>`;sources.innerHTML=status+(m.sourceLinks?.length?m.sourceLinks.map((source,index)=>`<a href="${source.url}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[10px] text-slate-300 hover:text-white">출처 ${index+1} · ${source.label}</a>`).join(''):'');}
  const ratings=document.getElementById('profile-ratings'); if(ratings) ratings.innerHTML=Object.keys(m.ratings).length?Object.entries(m.ratings).map(([k,v])=>`<div class="manager-metric"><div class="flex justify-between text-xs"><span class="font-bold text-slate-300">${k}</span><b class="font-mono text-eplNeon">${v}</b></div><div class="manager-metric-track"><div class="manager-metric-fill" style="width:${v}%"></div></div></div>`).join(''):'<div class="md:col-span-2 rounded-xl border border-white/5 p-4 text-xs text-slate-500">감독 평가 지표가 아직 없습니다.</div>';
  const roles=document.getElementById('profile-roles'); if(roles) roles.innerHTML=m.keyPlayers.length?m.keyPlayers.map(([a,b,pid])=>`<button ${pid?`onclick="openPlayerProfile('${pid}')"`:''} class="manager-role w-full text-left ${pid?'hover:border-eplNeon/30 cursor-pointer':''}"><b class="text-sm">${a}</b><span>${b}${pid?' · 선수 보기':''}</span></button>`).join(''):'<div class="rounded-xl border border-white/5 p-4 text-xs text-slate-500">핵심 선수 역할 데이터가 아직 없습니다.</div>';
  const career=document.getElementById('profile-career'); if(career) career.innerHTML=m.career.length?m.career.map(x=>`<div class="relative pl-5 border-l border-white/10"><span class="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-eplNeon"></span><div class="text-[10px] font-mono text-eplNeon">${x.period}</div><a href="${x.sourceUrl||'#'}" target="_blank" rel="noopener noreferrer" class="inline-block font-bold text-sm mt-1 text-left hover:text-eplNeon transition">${x.club} <i class="fa-solid fa-arrow-up-right-from-square ml-1 text-[9px] opacity-50"></i></a><div class="text-[11px] text-cyan-300 mt-0.5">${x.role}</div><p class="text-xs text-slate-400 leading-5 mt-2">${x.note}</p></div>`).join(''):'<div class="rounded-xl border border-white/5 p-4 text-xs text-slate-500">검증된 경력 데이터가 아직 없습니다.</div>';
  const achievements=document.getElementById('profile-achievements'); if(achievements) achievements.innerHTML=m.achievements.length?m.achievements.map(x=>`<div class="flex gap-3 rounded-xl bg-white/[.02] border border-white/5 p-3"><i class="fa-solid fa-star text-amber-300 mt-0.5"></i><span class="text-xs text-slate-300 leading-5">${x}</span></div>`).join(''):'<div class="rounded-xl border border-white/5 p-4 text-xs text-slate-500">성과 분석 데이터가 아직 없습니다.</div>';
  const principles=document.getElementById('profile-principles'); if(principles) principles.innerHTML=m.principles.length?m.principles.map(([a,b])=>`<div class="rounded-xl bg-slate-950/50 border border-white/5 p-4"><div class="text-xs font-bold text-rose-300">${a}</div><p class="text-xs text-slate-400 leading-5 mt-2">${b}</p></div>`).join(''):'<div class="md:col-span-3 rounded-xl border border-white/5 p-4 text-xs text-slate-500">전술 원칙 분석 데이터가 아직 없습니다.</div>';
  const teamLink=document.getElementById('profile-team-link'); if(teamLink) teamLink.onclick=()=>openTeamProfile(m.teamId);
}
function applyProfileTactic(){
  const m=managerProfileData[activeManagerProfileKey];
  if(typeof changeTeam==='function') changeTeam(activeManagerProfileKey);
  if(typeof changeFormation==='function') changeFormation(m.formation);
  const map={ 'slider-defline':m.sliders.defline, 'slider-width':m.sliders.width, 'slider-press':m.sliders.press };
  Object.entries(map).forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.value=v});
  if(typeof updateSliders==='function') updateSliders();
  localStorage.setItem('tv-applied-manager',JSON.stringify({key:activeManagerProfileKey,...m}));
  switchView('tactical');
  showToast(`${m.name} 전술을 전술판에 적용했습니다.`);
  window.scrollTo({top:0,behavior:'smooth'});
}
function compareCurrentManager(){
  const aliases={chelsea:'alonso',mancity:'maresca',tottenham:'dezerbi'};
  selectedManagerIds.clear();
  const target=managerComparisonData.find(x=>x.id===aliases[activeManagerProfileKey]) || managerComparisonData.find(x=>x.team.includes(managerProfileData[activeManagerProfileKey].team.split(' ')[0]));
  if(target) selectedManagerIds.add(target.id);
  switchView('compare');
}
document.addEventListener('DOMContentLoaded',initialiseManagerProfile);



// ===== Contextual player / manager detail navigation =====
function normalisePersonName(value=''){
  return String(value).toLowerCase().replace(/[^a-z0-9가-힣]/g,'');
}
function findPlayerByName(name){
  const n=normalisePersonName(name);
  const aliases={alisson:'alisson',haaland:'haaland',saka:'saka',saliba:'saliba',rice:'rice',palmer:'palmer',isak:'isak'};
  const alias=Object.entries(aliases).find(([k])=>n.includes(k));
  if(alias) return playerComparisonData.find(p=>p.id===alias[1]);
  return playerComparisonData.find(p=>[p.name,p.english,p.english.split(' ').pop()].some(v=>n.includes(normalisePersonName(v))||normalisePersonName(v).includes(n)));
}
function openPlayerProfileByName(name){
  const player=getContractPlayers().find(p=>normalisePersonName(p.name).includes(normalisePersonName(name))||normalisePersonName(name).includes(normalisePersonName(p.name)))||findPlayerByName(name);
  if(player) openPlayerProfile(player.id);
  else showToast(`${name}의 상세 데이터는 다음 데이터 업데이트에서 연결됩니다.`);
}
function openPlayerProfile(id){
  if(entityData.status!=='ready')return initialiseEntityData().then(()=>openPlayerProfile(id));
  const p=getContractPlayers().find(x=>x.id===id);
  if(!p){showToast('해당 ID의 선수 정보를 찾을 수 없습니다.');switchView('home');return;}
  renderPlayerProfile(p);
  switchView('player');
  history.pushState({view:'player',id},'',`#player/${id}`);
  window.scrollTo({top:0,behavior:'smooth'});
}
function renderPlayerProfile(p){
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v};
  const clubEl=document.getElementById('player-detail-club'); if(clubEl){clubEl.innerHTML=`<button onclick="openTeamProfile('${p.teamId}')" class="hover:text-cyan-200 underline-offset-4 hover:underline">${p.club} · 팀 정보 보기</button>`;}set('player-detail-name',p.name);set('player-detail-english',p.id);set('player-detail-position',p.position);
  const basic=document.getElementById('player-detail-basic');
  if(basic) basic.innerHTML=[['국적',p.nationality||'미확정'],['나이 기준',p.birthDate],['신장',p.height],['주발',p.foot]].map(([k,v])=>`<div class="flex justify-between border-b border-white/5 pb-3"><span class="text-xs text-slate-500">${k}</span><strong class="text-sm">${v}</strong></div>`).join('');
  const tags=document.getElementById('player-detail-tags');if(tags)tags.innerHTML=p.tags.map(t=>`<span class="px-3 py-1.5 rounded-lg bg-purple-400/10 border border-purple-400/20 text-xs text-purple-200">${escapeHtml(t)}</span>`).join('');
  const attrs=document.getElementById('player-detail-attributes');if(attrs)attrs.innerHTML=Object.keys(p.attributes).length?Object.entries(p.attributes).map(([k,v])=>`<div><div class="flex justify-between text-xs"><span class="text-slate-400">${playerAttributeLabels[k]||k}</span><b>${v}</b></div><div class="h-2 bg-white/5 rounded-full mt-2 overflow-hidden"><div class="h-full bg-purple-400 rounded-full" style="width:${v}%"></div></div></div>`).join(''):'<div class="sm:col-span-2 rounded-xl border border-white/5 p-5 text-xs text-slate-500">분석 지표는 실제 데이터 연동 후 제공됩니다.</div>';
  const labels=playerRoleStatLabels[p.positionGroup]||{};const stats=document.getElementById('player-detail-role-stats');if(stats)stats.innerHTML=Object.keys(p.roleStats).length?Object.entries(p.roleStats).map(([k,v])=>`<div class="rounded-xl bg-white/[.025] border border-white/5 p-4"><div class="text-[10px] text-slate-500">${labels[k]||k}</div><strong class="text-xl mt-1 block">${v}</strong></div>`).join(''):'<div class="col-span-full rounded-xl border border-white/5 p-5 text-xs text-slate-500">포지션 성과 데이터가 아직 없습니다.</div>';
  const btn=document.getElementById('player-detail-compare');if(btn){btn.disabled=!p.comparisonId;btn.classList.toggle('opacity-50',!p.comparisonId);btn.title=p.comparisonId?'선수 비교에 추가':'비교 데이터 미연결';btn.onclick=()=>{if(!p.comparisonId)return showToast('이 선수의 비교 데이터는 아직 연결되지 않았습니다.');selectedPlayerIds.add(p.comparisonId);switchView('playerCompare');renderPlayerComparison();};}
}
function openManagerFromComparison(id){openManagerProfile(id);}

// ===== Team detail navigation =====
function getAllTeams(){
  if(entityData.status==='ready'){
    return Object.entries(entityData.teams).map(([id,team])=>{
      const manager=entityData.managers[id];
      const currentManager=entityData.currentManagers?.managers?.[id];
      const provider=entityData.teamProviderCrosscheck?.teams?.[id]||{};
      return {...team,id,name:team.koreanName||team.name,englishName:team.name,short:team.shortName,koreanName:team.koreanName,formation:team.defaultFormation,manager:currentManager?.koreanName||currentManager?.englishName||manager?.name||'감독 미확정',founded:'미확정',stadium:provider.stadium||'미확정',website:provider.website||'',badgeUrl:provider.badgeUrl||'',keyPlayer:'미확정',summary:manager?.feedback||'상세 분석 데이터가 아직 없습니다.',strengths:[],metrics:{},dataStatus:team.dataStatus};
    });
  }
  const merged=new Map();
  completeTeamDirectory.forEach(t=>merged.set(t.id,t));
  teamComparisonData.forEach(t=>merged.set(t.id,{...merged.get(t.id),...t}));
  return [...merged.values()];
}
function findTeamByName(name=''){
  const n=normalisePersonName(name);
  const aliases={manchesterunited:'manutd',manunited:'manutd',manutd:'manutd',manchestercity:'mancity',mancity:'mancity',newcastleunited:'newcastle',tottenhamhotspur:'tottenham',spurs:'tottenham',wolverhamptonwanderers:'wolves',wolverhampton:'wolves',nottinghamforest:'nottingham',westhamunited:'westham',brightonandhovealbion:'brighton',afcbournemouth:'bournemouth'};
  const aliasId=aliases[n];
  if(aliasId) return getAllTeams().find(t=>t.id===aliasId);
  return getAllTeams().find(t=>[t.id,t.name,t.englishName,t.short].filter(Boolean).some(v=>normalisePersonName(v)===n||normalisePersonName(v).includes(n)||n.includes(normalisePersonName(v))));
}
function openTeamProfileByName(name){const team=findTeamByName(name); if(team) openTeamProfile(team.id); else showToast(`${name}의 팀 상세 데이터는 다음 업데이트에서 연결됩니다.`);}
function openTeamProfile(id){
  if(entityData.status!=='ready')return initialiseEntityData().then(()=>openTeamProfile(id));
  const t=getAllTeams().find(x=>x.id===id);
  if(!t){showToast('해당 ID의 팀 정보를 찾을 수 없습니다.');switchView('home');return;}
  renderTeamProfile(t);switchView('team');history.pushState({view:'team',id},'',`#team/${id}`);window.scrollTo({top:0,behavior:'smooth'});
}
function renderTeamProfile(t){
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v};
  set('team-detail-short',`${t.short} · 프리미어리그 · ${String(t.dataStatus||'prototype').toUpperCase()}`);set('team-detail-name',t.name);set('team-detail-korean',t.englishName||'');set('team-detail-formation',t.formation);set('team-detail-summary',t.summary);
  const badge=document.getElementById('team-detail-badge');if(badge)badge.innerHTML=t.badgeUrl?`<img src="${t.badgeUrl}" alt="${escapeHtml(t.name)} 엠블럼" class="w-16 h-16 object-contain" referrerpolicy="no-referrer">`:escapeHtml(t.short);
  const basic=document.getElementById('team-detail-basic'); if(basic) basic.innerHTML=[['창단',t.founded],['홈구장',t.stadium],['감독',t.manager],['기본 포메이션',t.formation],['핵심 선수',t.keyPlayer]].map(([k,v])=>`<div class="flex justify-between gap-4 border-b border-white/5 pb-3"><span class="text-xs text-slate-500">${k}</span><strong class="text-sm text-right">${v}</strong></div>`).join('');
  if(basic&&t.website){const href=/^https?:\/\//.test(t.website)?t.website:`https://${t.website}`;basic.insertAdjacentHTML('beforeend',`<div class="flex justify-between gap-4"><span class="text-xs text-slate-500">공식 사이트</span><a href="${href}" target="_blank" rel="noopener noreferrer" class="text-sm text-cyan-300 hover:underline">방문하기</a></div>`);}
  const strengths=document.getElementById('team-detail-strengths');if(strengths)strengths.innerHTML=t.strengths.length?t.strengths.map(x=>`<span class="px-3 py-1.5 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-xs text-cyan-200">${escapeHtml(x)}</span>`).join(''):'<span class="text-xs text-slate-500">전술 강점 데이터가 아직 없습니다.</span>';
  const metrics=document.getElementById('team-detail-metrics');if(metrics)metrics.innerHTML=Object.keys(t.metrics).length?Object.entries(t.metrics).map(([k,v])=>`<div><div class="flex justify-between text-xs"><span class="text-slate-400">${teamMetricLabels[k]||k}</span><b>${v}</b></div><div class="h-2 bg-white/5 rounded-full mt-2 overflow-hidden"><div class="h-full bg-cyan-400 rounded-full" style="width:${v}%"></div></div></div>`).join(''):'<div class="sm:col-span-2 rounded-xl border border-white/5 p-4 text-xs text-slate-500">팀 분석 지표가 아직 없습니다.</div>';
  const managerKey=Object.entries(managerProfileData).find(([,m])=>m.teamId===t.id)?.[0]; const manager=document.getElementById('team-detail-manager');if(manager)manager.innerHTML=managerKey?`<button onclick="openManagerProfile('${managerKey}')" class="w-full text-left rounded-xl border border-eplNeon/20 bg-eplNeon/5 p-4 hover:bg-eplNeon/10"><div class="text-[10px] text-eplNeon">MANAGER PROFILE</div><strong class="block mt-1">${managerProfileData[managerKey].name}</strong><p class="text-xs text-slate-400 mt-2">${managerProfileData[managerKey].identity} · 감독 상세 보기</p></button>`:`<div class="rounded-xl border border-white/5 p-4 text-sm text-slate-400">${t.manager}<p class="text-xs mt-2 text-slate-600">상세 감독 프로필은 데이터 업데이트 예정입니다.</p></div>`;
  const allPlayers=getContractPlayers().filter(p=>p.teamId===t.id);const players=allPlayers.filter(p=>p.nameLocalizationSource!=='unverified-use-english');const hiddenCount=allPlayers.length-players.length;const box=document.getElementById('team-detail-players');if(box)box.innerHTML=(players.length?players.map(p=>`<button onclick="openPlayerProfile('${p.id}')" class="text-left rounded-xl border border-white/5 bg-white/[.025] p-4 hover:border-purple-400/30"><div class="text-[10px] font-mono text-purple-300">${p.position}</div><strong class="block mt-1">${escapeHtml(p.name)}</strong><span class="text-[11px] text-slate-500">#${p.number??'—'} · 선수 상세 보기</span></button>`).join(''):`<div class="sm:col-span-2 rounded-xl border border-white/5 p-5 text-xs text-slate-500">검증된 한글 이름 선수가 아직 없습니다.</div>`)+(hiddenCount?`<div class="sm:col-span-2 rounded-xl border border-amber-300/10 bg-amber-300/[.03] p-4 text-xs text-amber-100/70">한글 이름을 확인하지 못한 ${hiddenCount}명은 잘못된 표기를 방지하기 위해 숨겼습니다.</div>`:'');
  const tactic=document.getElementById('team-detail-tactics');if(tactic)tactic.onclick=()=>{if(typeof changeTeam==='function')changeTeam(t.id);switchView('tactical');};
}

function restoreEntityRoute(){
  const hash=location.hash;
  if(!hash)return;
  const [kind,id]=hash.slice(1).split('/');
  if(kind==='manager'&&managerProfileData[id]){activeManagerProfileKey=id;renderManagerProfile(id);switchView('manager');return;}
  if(kind==='player'){const player=getContractPlayers().find(item=>item.id===id);if(player){renderPlayerProfile(player);switchView('player');return;}}
  if(kind==='team'){const team=getAllTeams().find(item=>item.id===id);if(team){renderTeamProfile(team);switchView('team');return;}}
  if(['manager','player','team'].includes(kind)){switchView('home');showToast('주소에 해당하는 데이터를 찾을 수 없어 Home으로 이동했습니다.');}
}
window.addEventListener('popstate',()=>{if(entityData.status==='ready')restoreEntityRoute();else initialiseEntityData();});

// ===== Tactical role dictionary =====
let tacticalRoles=[];
let activeRoleGroup='전체';
let activeRoleId='advanced-forward';
const roleGroups=['전체','공격수','윙어','미드필더','수비형 미드필더','풀백·윙백','센터백','골키퍼'];

async function initialiseRoleGuide(){
  if(!tacticalRoles.length){
    try{
      const response=await fetch('data/roles.json');
      if(!response.ok) throw new Error('roles.json load failed');
      tacticalRoles=await response.json();
    }catch(error){
      const detail=document.getElementById('role-guide-detail');
      if(detail) detail.innerHTML='<div class="role-empty"><i class="fa-solid fa-triangle-exclamation"></i><h3>역할 데이터를 불러오지 못했습니다.</h3><p>파일을 직접 더블클릭하지 말고 로컬 서버에서 실행해 주세요.</p></div>';
      return;
    }
  }
  renderRoleGroupFilter();
  renderRoleGuideList();
  renderRoleDetail(activeRoleId);
}
function renderRoleGroupFilter(){
  const box=document.getElementById('role-group-filter'); if(!box)return;
  box.innerHTML=roleGroups.map(group=>`<button onclick="setRoleGroup('${group}')" class="px-2 py-2 rounded-lg border text-xs ${activeRoleGroup===group?'bg-eplNeon/10 border-eplNeon/35 text-eplNeon':'bg-white/[0.02] border-white/5 text-slate-500 hover:text-white'}">${group}</button>`).join('');
}
function setRoleGroup(group){activeRoleGroup=group;renderRoleGroupFilter();renderRoleGuideList();}
function getFilteredRoles(){
  const q=(document.getElementById('role-search')?.value||'').toLowerCase().trim();
  return tacticalRoles.filter(role=>(activeRoleGroup==='전체'||role.group===activeRoleGroup)&&(!q||`${role.nameKo} ${role.nameEn} ${role.summary} ${role.movements.join(' ')}`.toLowerCase().includes(q)));
}
function renderRoleGuideList(){
  if(!tacticalRoles.length)return;
  const roles=getFilteredRoles(),list=document.getElementById('role-guide-list'),count=document.getElementById('role-result-count');
  if(count)count.textContent=`${roles.length} roles`;
  if(!list)return;
  list.innerHTML=roles.length?roles.map(role=>`<button onclick="renderRoleDetail('${role.id}')" class="role-list-item ${activeRoleId===role.id?'active':''}"><span class="role-list-icon"><i class="fa-solid ${role.icon}"></i></span><span class="min-w-0 flex-1"><b>${role.nameKo}</b><small>${role.nameEn} · ${role.group}</small></span><i class="fa-solid fa-chevron-right text-[10px] text-slate-600"></i></button>`).join(''):'<div class="p-6 text-center text-xs text-slate-600">검색 결과가 없습니다.</div>';
}
function renderRoleDetail(roleId){
  const role=tacticalRoles.find(x=>x.id===roleId);if(!role)return;
  activeRoleId=roleId;renderRoleGuideList();
  const detail=document.getElementById('role-guide-detail');if(!detail)return;
  detail.innerHTML=`
    <div class="role-detail-head">
      <div class="role-hero-icon"><i class="fa-solid ${role.icon}"></i></div>
      <div class="min-w-0"><div class="text-[10px] uppercase tracking-[.22em] text-eplNeon font-extrabold">${role.group}</div><h3>${role.nameKo}</h3><p class="role-en">${role.nameEn}</p></div>
    </div>
    <p class="role-lead">${role.description}</p>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
      <article class="role-panel"><div class="role-panel-title"><i class="fa-solid fa-bullseye"></i>전술적 목적</div><p>${role.purpose}</p></article>
      <article class="role-panel"><div class="role-panel-title"><i class="fa-solid fa-clock"></i>감독은 언제 사용할까?</div><ul>${role.usedWhen.map(x=>`<li>${x}</li>`).join('')}</ul></article>
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-[1fr_.9fr] gap-4 mt-4">
      <article class="role-panel"><div class="role-panel-title"><i class="fa-solid fa-route"></i>경기장에서 보이는 움직임</div><div class="role-movements">${role.movements.map((x,i)=>`<div><span>${String(i+1).padStart(2,'0')}</span><p>${x}</p></div>`).join('')}</div></article>
      <article class="role-panel"><div class="role-panel-title"><i class="fa-solid fa-chart-simple"></i>핵심 능력 요구치</div><div class="space-y-3 mt-4">${role.attributes.map(([name,value])=>`<div><div class="flex justify-between text-xs"><span class="text-slate-300">${name}</span><b class="font-mono text-eplNeon">${value}</b></div><div class="role-attribute-track"><div style="width:${value}%"></div></div></div>`).join('')}</div></article>
    </div>
    <article class="role-difference mt-4"><div><i class="fa-solid fa-code-compare"></i><b>비슷한 역할과 무엇이 다른가?</b></div><p>${role.difference}</p></article>
    <div class="mt-4 flex flex-wrap gap-2">${role.examples.map(x=>`<span class="role-tag">${x}</span>`).join('')}</div>`;
}


// ===== Global entity linking: any visible team label can open its profile =====
function linkTeamTextEverywhere(){
  const protectedTags=new Set(['SCRIPT','STYLE','OPTION','INPUT','TEXTAREA']);
  const teams=getAllTeams().sort((a,b)=>b.name.length-a.name.length);
  document.querySelectorAll('[data-team-id]').forEach(el=>{
    el.classList.add('entity-link');
    el.setAttribute('role','button'); el.setAttribute('tabindex','0');
  });
  // Explicitly decorate common team controls/cards without mutating input areas.
  document.querySelectorAll('button, [onclick], .font-bold, h2, h3, h4, span').forEach(el=>{
    if(protectedTags.has(el.tagName)||el.closest('#team-profile-view,#player-profile-view,#manager-profile-view')) return;
    if(el.onclick || el.closest('button')) return;
    const text=(el.textContent||'').trim();
    const team=teams.find(t=> text===t.name || text===t.short || text===({arsenal:'Arsenal',liverpool:'Liverpool',mancity:'Manchester City',chelsea:'Chelsea',newcastle:'Newcastle',tottenham:'Tottenham'}[t.id]));
    if(team){
      el.dataset.teamId=team.id; el.classList.add('entity-link'); el.title=`${team.name} 팀 정보 보기`;
    }
  });
}
document.addEventListener('click',e=>{
  const teamEl=e.target.closest('[data-team-id]');
  if(teamEl){ e.preventDefault(); e.stopPropagation(); openTeamProfile(teamEl.dataset.teamId); }
});
document.addEventListener('keydown',e=>{
  const teamEl=e.target.closest?.('[data-team-id]');
  if(teamEl && (e.key==='Enter'||e.key===' ')){e.preventDefault();openTeamProfile(teamEl.dataset.teamId);}
});
document.addEventListener('DOMContentLoaded',()=>setTimeout(linkTeamTextEverywhere,100));
const originalSwitchView=switchView;
switchView=function(view){ originalSwitchView(view); setTimeout(linkTeamTextEverywhere,60); };
