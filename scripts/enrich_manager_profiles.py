#!/usr/bin/env python3
"""Apply reviewed/provisional tactical profile summaries to managers.json."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "app" / "data" / "managers.json"
CURRENT_MANAGERS = ROOT / "app" / "data" / "managers-current.json"


def profile(formations, identity, traits, style, build, attack, defend, feedback, source, status="reviewed-2026-08-24", achievements=None):
    formation_map = {"4-2-2-2": "4-2-3-1", "5-3-2": "3-5-2", "3-4-3": "3-4-2-1", "3-2-5": "3-2-4-1"}
    supported_formations = list(dict.fromkeys(formation_map.get(shape, shape) for shape in formations))
    return {
        "preferredFormations": supported_formations,
        "identity": identity,
        "traits": traits,
        "style": style,
        "keyPlayers": [],
        "achievements": achievements or [],
        "principles": [["빌드업", build], ["공격", attack], ["수비·전환", defend]],
        "feedback": feedback,
        "sourceLinks": [{"label": label, "url": url} for label, url in source],
        "analysisStatus": status,
        "signings": "검증된 이적 데이터 연동 준비 중",
    }


UPDATES = {
    "astonvilla": profile(["4-2-3-1", "4-4-2"], "상대 맞춤형 인공 전환", ["박스 미드필드", "압박 유인", "하이 라인", "채널 침투"], "상대 분석에 따라 구조를 바꾸면서 후방의 짧은 패스로 압박을 유인한 뒤 빠르게 전진하는 모델", "센터백과 더블 피벗이 상대 압박을 끌어내고 전진 패스 순간을 기다린다.", "공격수의 채널 이동과 2선의 중앙 합류로 박스 미드필드 및 컷백 기회를 만든다.", "좁은 미드블록과 높은 수비 라인을 병행하며 상대에 따라 깊이를 조절한다.", "고정 대형보다 상대 압박 방식에 맞춘 첫 전진 경로와 수비 라인 높이를 먼저 설정해야 합니다.", [("Premier League 전술 분석", "https://www.premierleague.com/en/news/3750635")]),
    "bournemouth": profile(["4-2-2-2", "4-2-3-1"], "레드불 계열 수직 압박", ["전방 압박", "빠른 전진", "좁은 2선", "세컨드볼"], "마르코 로제의 이전 팀에서 확인된 강한 압박과 수직 전개 성향을 본머스에 적용할 가능성을 정리한 잠정 프로필", "중앙 미드필더를 가깝게 두고 첫 패스부터 전진 방향을 우선한다.", "두 명의 10번 또는 좁은 윙어가 세컨드볼과 하프스페이스를 공략한다.", "공을 잃은 지점 주변에서 즉시 압박하되 배후 공간 보호가 핵심이다.", "현재 본머스 경기 표본이 쌓이기 전까지 압박 높이와 대형은 잠정값으로 사용해야 합니다.", [("Bournemouth 공식 첫 인터뷰 요약", "https://www.premierleague.com/en/news/4673195/the-briefing-roses-first-day-brentfords-future-plans-and-transfer-news")], "provisional-2026-08-24"),
    "brentford": profile(["4-2-3-1", "5-3-2"], "직선적 전환·상대 맞춤 대형", ["롱패스", "빠른 역습", "투톱 전환", "세트피스"], "상대에 따라 백4와 백5를 바꾸며 탈취 직후 빠른 공격수에게 긴 패스를 연결하는 모델", "후방에서 무리하게 점유하기보다 상대 전진을 유도한 뒤 전방 공간을 확인한다.", "빠른 공격수의 배후 침투와 중앙 공격수의 경합으로 짧은 시간에 슈팅을 만든다.", "대형을 낮춰 공간을 지키고 세트피스 및 공중볼 상황을 조직적으로 관리한다.", "상대가 전원을 전진시켰을 때 전환 패스의 목표와 두 번째 침투 선수를 미리 지정해야 합니다.", [("Premier League Brentford 분석", "https://www.premierleague.com/en/news/4450551/talking-tactics-analysis-can-brentford-direct-playing-style-keep-delivering-big-wins")]),
    "brighton": profile(["4-2-3-1", "4-4-2"], "고강도 압박·직접적 전진", ["맨투맨 압박", "전진 패스", "다수 박스 침투", "투톱 연계"], "점유를 유지하되 기회가 보이면 빠른 전진 패스를 선택하고 여러 명이 최종 라인을 공격하는 모델", "후방 전개 능력은 유지하지만 긴 점유보다 전진 가능한 순간을 빠르게 선택한다.", "투톱과 2선의 위치 교환으로 박스 안 숫자와 깊은 침투를 늘린다.", "전방 맨투맨 압박과 역압박을 사용하며 많은 선수가 전진한 뒤의 역습 대비가 과제다.", "공격 숫자를 늘릴수록 잔류 수비와 중앙 커버 위치를 명확히 해야 합니다.", [("Premier League Hurzeler 분석", "https://www.premierleague.com/en/news/4171172")]),
    "chelsea": profile(["3-4-2-1", "3-4-3"], "중앙 과밀·윙백 폭", ["백3", "더블 피벗", "인사이드 포워드", "즉시 역압박"], "레버쿠젠 시절의 3-4-2-1을 기준으로 중앙에 인원을 모으고 윙백이 폭을 제공하는 첼시 초기 모델", "세 명의 수비수와 더블 피벗이 중앙 패스망을 만들고 한쪽 윙백이 빌드업에 가담한다.", "두 명의 인사이드 포워드가 라인 사이를 점유하고 윙백이 바깥 폭을 제공한다.", "소유권 상실 직후 높은 위치에서 압박해 상대 전진을 차단한다.", "첼시 실전 표본이 적으므로 레버쿠젠 기반 예상과 실제 경기 분석을 구분해야 합니다.", [("Premier League Alonso 전망", "https://www.premierleague.com/en/news/4677087/analysis-how-will-chelsea-look-under-alonso")], "provisional-2026-08-24", ["2023/24 레버쿠젠 분데스리가 무패 우승"]),
    "coventry": profile(["4-2-3-1"], "점유 기반 전진·2선 활용", ["더블 피벗", "10번 활용", "측면 전개", "전방 압박"], "프랭크 램퍼드의 코번트리 경기 데이터와 공식 전술 자료를 추가 확인하기 전 사용하는 잠정 구조", "더블 피벗을 거쳐 측면과 10번에게 안정적으로 전진한다.", "2선 미드필더의 박스 침투와 측면 공격수의 직접성을 활용한다.", "중앙 간격을 유지하며 전방 압박 시 풀백 뒤 공간을 관리한다.", "코번트리의 2026/27 경기 표본 확보 후 압박과 빌드업 설명을 재검증해야 합니다.", [("Premier League 감독 프로필", "https://www.premierleague.com/")], "provisional-2026-08-24"),
    "crystalpalace": profile(["4-2-3-1", "4-3-3"], "선수 개발·균형형 점유", ["중앙 연결", "유동적 2선", "조직적 압박", "선수 개발"], "리옹과 랑스 경력을 바탕으로 한 잠정 프로필이며 팰리스 실전 전술은 경기 표본 이후 확정", "중앙 미드필더를 통해 안정적으로 전진하고 2선이 패스 각도를 만든다.", "유동적인 2선과 측면 전개로 박스 진입 경로를 다양화한다.", "라인 간격을 유지한 조직적 압박과 수비 전환을 우선한다.", "현재 팰리스에서 검증된 전술 표본이 적으므로 대형과 역할을 단정하지 않아야 합니다.", [("Premier League Pierre Sage 프로필", "https://www.premierleague.com/en/news/4679663/pierre-sage")], "provisional-2026-08-24", ["2025/26 RC Lens 쿠프 드 프랑스 우승", "2025/26 Ligue 1 준우승"]),
    "everton": profile(["4-2-3-1"], "통제된 전진·박스 공략", ["점진적 빌드업", "측면 창출", "빠른 시작", "수비 조직"], "이전보다 긴 패스를 줄이고 수비진에서 차분히 전진하면서 박스 안 숫자와 찬스 질을 높이는 모델", "센터백의 볼 운반과 중원을 거친 전진으로 첫 패스를 서두르지 않는다.", "측면 창의성과 10번을 활용해 크로스 일변도에서 벗어나 더 좋은 슈팅을 만든다.", "조직적인 블록을 유지하고 탈취 후에는 빠르게 전방 공간을 공격한다.", "점유 안정성과 전진 속도 사이의 균형을 경기 상태에 따라 조절해야 합니다.", [("Premier League Moyes 분석", "https://www.premierleague.com/en/news/4429115/analysis-dewsbury-hall-at-the-centre-of-moyes-everton-evolution")]),
    "fulham": profile(["4-2-3-1"], "측면 과부하·오버래핑", ["측면 2대1", "공격적 풀백", "넓은 폭", "박스 공급"], "프리시즌에서 확인된 4-2-3-1과 풀백 오버래핑을 바탕으로 측면 수적 우위를 만드는 초기 모델", "더블 피벗이 풀백의 전진을 지원하고 반대쪽은 잔류 균형을 잡는다.", "윙어와 풀백이 2대1 또는 3대2를 만들고 박스 안 공격수에게 공급한다.", "풀백 전진 뒤 측면 공간과 수비 전환을 더블 피벗이 커버한다.", "프리시즌 기반이므로 리그 경기에서 측면 과부하가 유지되는지 재검증해야 합니다.", [("Premier League 2026/27 라인업 분석", "https://www.premierleague.com/en/news/4688364/how-every-premier-league-club-could-line-up-in-202627")], "provisional-2026-08-24"),
    "hullcity": profile(["4-2-3-1", "4-3-3"], "조직적 전환·실용적 운영", ["중앙 안정", "빠른 전환", "상대 맞춤", "플레이오프 운영"], "승격 과정에서 확인된 상대 맞춤 운영을 기반으로 한 잠정 프로필이며 EPL 표본 이후 세부 전술을 확정", "중앙 숫자를 확보하고 위험 지역에서 단순한 전진 선택을 사용한다.", "측면 속도와 2선 합류를 통해 전환 상황을 마무리한다.", "조직적 블록과 경합 강도를 유지하며 경기 상태에 맞춰 위험을 조절한다.", "승격 시즌과 프리미어리그의 압박 수준 차이를 반영해 빌드업 위험도를 낮춰야 합니다.", [("Premier League 2026/27 라인업 분석", "https://www.premierleague.com/en/news/4688364/how-every-premier-league-club-could-line-up-in-202627")], "provisional-2026-08-24", ["2025/26 Championship 플레이오프 승격"]),
    "ipswich": profile(["3-4-2-1", "4-2-3-1"], "상대 맞춤 전환·과부하", ["대형 전환", "측면 과부하", "직접적 역습", "세트피스"], "게리 오닐의 이전 프리미어리그 팀에서 확인된 대형 유연성과 빠른 전환을 입스위치에 적용한 잠정 모델", "상대 압박에 따라 백3와 백4를 바꾸며 과부하 지점을 만든다.", "측면 속도와 10번의 하프스페이스 수신으로 빠르게 박스에 접근한다.", "점유보다 공간 보호를 우선하고 탈취 직후 직접적인 역습을 시도한다.", "입스위치 실전 표본이 쌓일 때까지 울버햄프턴 시절 분석과 구분해야 합니다.", [("Premier League O'Neil 전술 분석", "https://www.premierleague.com/en/news/3959985")], "provisional-2026-08-24"),
    "leeds": profile(["4-3-3", "3-5-2"], "상황 대응형 점유·직접 전환", ["4-5-1 수비", "투톱 전환", "공중 경합", "선택적 압박"], "점유형 4-3-3에서 필요 시 직접적인 3-5-2로 바꾸며 생존 경쟁에 맞춰 실용성을 높인 모델", "4-3-3으로 전개하되 강한 압박에는 투톱과 윙백을 활용한 직접 전개를 선택한다.", "측면 전개 또는 두 공격수의 경합과 세컨드볼로 박스 접근을 단순화한다.", "안정 시 4-5-1로 후퇴하고 압박 타이밍을 선택해 중앙을 보호한다.", "상대와 경기 상태에 따라 점유형 4-3-3과 직접형 3-5-2를 빠르게 전환해야 합니다.", [("Premier League Leeds 전술 변화", "https://www.premierleague.com/en/news/4515136/dominic-calvert-lewin-analysis-leeds-united")]),
    "liverpool": profile(["4-2-3-1"], "초고강도 압박·직선 전진", ["게겐프레싱", "높은 턴오버", "빠른 공격", "공격적 풀백"], "높은 압박으로 혼란을 만든 뒤 짧은 시간 안에 9번과 전방 공간으로 직선적으로 전진하는 모델", "긴 점유보다 전진 가능한 패스와 풀백의 높은 위치를 우선한다.", "탈취 직후 9번 또는 10번에게 연결하고 빠른 드리블러가 배후를 공격한다.", "전방에서 집단으로 압박하고 실패했을 때 수비 라인 앞 공간을 즉시 압축한다.", "낮은 블록을 상대할 때는 직접 전환만으로 공간을 만들기 어려워 점유 구조 보완이 필요합니다.", [("Premier League Iraola 전망", "https://www.premierleague.com/en/news/4673093/analysis-how-will-liverpool-look-under-iraola")], "provisional-2026-08-24", ["2025/26 Bournemouth 리그 6위·유럽대항전 진출"]),
    "mancity": profile(["4-3-3", "3-2-4-1"], "포지셔널 점유·전환 가속", ["인버티드 풀백", "3-2 빌드업", "공간 점유", "빠른 역습"], "세밀한 위치 점유와 후방 빌드업을 기반으로 하되 전환 상황의 직접성과 드리블을 결합하는 모델", "풀백 또는 미드필더가 중앙에 합류해 3-2 구조와 안정적인 패스망을 만든다.", "윙어는 폭을 유지하고 8번이 하프스페이스에서 침투하며 전환 시 빠르게 전진한다.", "소유권 상실 직후 중앙을 닫고 공격 구조를 활용해 역압박한다.", "점유 속도가 느려질 때는 드리블과 빠른 전진 패스로 상대 블록을 흔들어야 합니다.", [("Premier League Maresca 전망", "https://www.premierleague.com/en/news/4676111/analysis-how-will-man-city-look-under-maresca")], "provisional-2026-08-24"),
    "manutd": profile(["4-2-3-1", "4-4-2"], "중앙 관통·측면 가속", ["브루노 10번", "더블 피벗", "빠른 측면", "미드블록"], "더블 피벗으로 수비 기반을 만들고 브루노에게 자유를 주며 탈취 후 측면으로 빠르게 전진하는 모델", "센터백의 라인 브레이킹 패스와 더블 피벗을 통해 10번에게 연결한다.", "브루노의 자유로운 창조성과 공격수·윙어의 빠른 위치 교환을 활용한다.", "4-4-2 미드블록으로 중앙을 닫고 박스 수비의 안정성을 우선한다.", "브루노의 자유를 보장하는 대신 두 중앙 미드필더와 측면의 복귀 책임을 명확히 해야 합니다.", [("Premier League Carrick 변화 분석", "https://www.premierleague.com/en/news/4590795/five-changes-carrick-has-made-to-spark-man-utd-back-on-track")]),
    "newcastle": profile(["4-2-2-2", "4-3-3"], "레드불식 압박·속도", ["공격적 압박", "빠른 전환", "좁은 공격", "세컨드볼"], "잘츠부르크에서 확인된 공격적 압박과 빠른 전환을 뉴캐슬에 적용할 가능성을 정리한 초기 프로필", "중앙에 선수를 가깝게 배치하고 탈압박보다 전진 가능성을 우선한다.", "탈취 후 적은 패스로 배후를 공격하고 빠른 공격수가 채널을 점유한다.", "공격적인 전방 압박과 세컨드볼 회수를 통해 상대 진영에 머문다.", "뉴캐슬 공식 경기 표본이 없으므로 잘츠부르크·알아흘리 성향과 구분해야 합니다.", [("Premier League Jaissle 소개", "https://www.premierleague.com/en/news/4682104/who-is-newcastle-new-head-coach-matthias-jaissle")], "provisional-2026-08-24"),
    "nottinghamforest": profile(["3-4-2-1"], "백3·직접 전환", ["윙백 폭", "두 명의 10번", "공중 경합", "빠른 역습"], "글라스너가 이전 팀에서 주로 사용한 3-4-2-1과 프리시즌 발언을 바탕으로 한 초기 프로필", "세 명의 수비수와 중앙 미드필더가 안정적으로 첫 전진을 준비한다.", "윙백이 폭을 제공하고 두 명의 10번이 공격수 주변에서 박스로 침투한다.", "중앙 블록을 유지한 뒤 탈취하면 전방으로 빠르게 연결한다.", "포레스트 실전에서는 윙백 높이와 공격 시 박스 진입 숫자를 우선 확인해야 합니다.", [("Premier League Glasner 프리시즌", "https://www.premierleague.com/en/news/4680069/glasner-happy-with-opening-win")], "provisional-2026-08-24"),
    "sunderland": profile(["4-3-3", "4-2-3-1", "3-4-3"], "유연한 점유·강한 전환", ["측면 3대2", "빠른 역습", "중원 에너지", "대형 전환"], "점유 시 측면 수적 우위를 만들고 필요하면 깊게 수비한 뒤 긴 패스와 빠른 전환으로 공격하는 모델", "풀백이 전진해 측면 3대2를 만들고 중앙 미드필더가 전환 패스를 공급한다.", "공간이 열리면 빠른 공격수를 향한 직접 패스로 적은 시간 안에 박스에 도달한다.", "상대에 따라 백3로 바꾸며 공중 경합과 세컨드볼, 활동량으로 경기 강도를 높인다.", "점유와 깊은 수비를 모두 사용할 수 있으므로 상대 전진 구조에 맞춰 기준 대형을 선택해야 합니다.", [("Premier League Sunderland 분석", "https://www.premierleague.com/en/news/4323178")], achievements=["2024/25 Championship 플레이오프 승격", "2025/26 Premier League 7위·유로파리그 진출"]),
    "tottenham": profile(["4-3-3", "3-2-5"], "압박 유인·맨투맨 압박", ["프레스 베이팅", "3-2-5", "넓은 윙어", "고강도 압박"], "후방 점유로 상대 압박을 끌어들여 라인을 통과하고, 공격 시 3-2-5와 넓은 윙어를 활용하는 모델", "골키퍼와 수비수가 상대를 가까이 유인한 뒤 중앙 조합 또는 대각 전환으로 압박을 넘는다.", "윙어는 터치라인 폭을 유지하고 중앙의 다섯 명이 라인 사이와 박스를 점유한다.", "공격적인 맨투맨 압박으로 높은 위치에서 탈취하지만 압박 실패 뒤 공간이 위험하다.", "후방 선수 간격이 벌어지면 압박 유인 구조가 무너지므로 짧은 연결 거리를 유지해야 합니다.", [("Premier League De Zerbi 변화", "https://www.premierleague.com/en/news/4639124/what-has-de-zerbi-changed-at-spurs-and-which-players-have-benefited")]),
}

ACHIEVEMENTS = {
    "arsenal": ["2025/26 프리미어리그 우승", "2019/20 FA컵 우승", "2025/26 리그 19클린시트·최소 실점 수비"],
    "astonvilla": ["UEFA 유로파리그 4회 우승(세비야 3회·비야레알 1회)", "2023/24 애스턴 빌라 프리미어리그 4위·챔피언스리그 진출", "2022/23 강등권 인근의 빌라를 리그 7위로 반등"],
    "bournemouth": ["RB 잘츠부르크 오스트리아 리그 2연패", "2022/23 RB 라이프치히 DFB-포칼 우승", "묀헨글라트바흐를 2019/20 챔피언스리그 진출로 이끔"],
    "brentford": ["2025/26 첫 감독 시즌 프리미어리그 14승", "2025/26 프리미어리그 올해의 감독 후보", "맨유·리버풀·애스턴 빌라 상대 승리"],
    "brighton": ["2023/24 장크트파울리 2.분데스리가 우승·분데스리가 승격", "브라이튼 구단 역사상 최고 수준의 프리미어리그 초반 성적", "2024/25 맨시티·맨유·뉴캐슬·토트넘 상대 승리"],
    "chelsea": ["2023/24 레버쿠젠 분데스리가 무패 우승", "2023/24 DFB-포칼 우승", "2023/24 전 대회 53경기 중 1패"],
    "coventry": ["2018/19 더비 카운티 Championship 플레이오프 결승 진출", "2019/20 첼시를 프리미어리그 4위·FA컵 결승으로 이끔", "이적 금지 상황에서 첼시 유스 자원 다수 정착"],
    "crystalpalace": ["2025/26 RC Lens 쿠프 드 프랑스 우승", "2025/26 Ligue 1 준우승·챔피언스리그 진출", "2023/24 리옹을 강등권에서 유럽대항전 진출권으로 반등"],
    "everton": ["2022/23 웨스트햄 UEFA 유로파 콘퍼런스리그 우승", "LMA 올해의 감독 3회", "에버턴 첫 임기 중 8차례 리그 7위 이상"],
    "fulham": ["2025/26 레알 마드리드 임시 감독으로 LaLiga 2위", "2025/26 UEFA 챔피언스리그 8강", "레알 마드리드 유소년·카스티야를 거쳐 1군 감독 승격"],
    "hullcity": ["2025/26 헐 시티 Championship 플레이오프 우승·승격", "2023/24 디나모 자그레브 리그·컵 더블", "2021/22 즈린스키 모스타르 보스니아 리그 우승"],
    "ipswich": ["2022/23 본머스를 강등 예상 속 프리미어리그 잔류로 이끔", "2023/24 울버햄프턴의 득점력과 리그 성적 반등", "2023/24 울버햄프턴에서 세트피스 12골"],
    "leeds": ["노리치 시티 Championship 우승 2회", "2024/25 리즈 유나이티드 Championship 우승·승격", "2025/26 4-3-3에서 3-5-2로 전환해 강등권 탈출 기반 마련"],
    "liverpool": ["2025/26 본머스 프리미어리그 6위·구단 최초 유럽대항전 진출", "본머스에서 프리미어리그 18경기 연속 무패", "2020/21 라요 바예카노 LaLiga 승격"],
    "mancity": ["2023/24 레스터 시티 Championship 우승·프리미어리그 승격", "2024/25 첼시 UEFA 콘퍼런스리그 우승", "2025 FIFA 클럽 월드컵 우승"],
    "manutd": ["2022/23 미들즈브러를 강등권 인근에서 Championship 플레이오프로 반등", "2025/26 맨유 부임 후 리그 첫 4경기 전승", "2025/26 프리미어리그 올해의 감독 후보"],
    "newcastle": ["2021/22 잘츠부르크 오스트리아 리그·컵 더블", "잘츠부르크 구단 최초 챔피언스리그 16강", "2024/25·2025/26 알아흘리 AFC 챔피언스리그 엘리트 2연패"],
    "nottinghamforest": ["2021/22 아인트라흐트 프랑크푸르트 UEFA 유로파리그 우승", "2024/25 크리스털 팰리스 FA컵 우승", "팰리스 구단 사상 첫 주요 국내 컵 우승 달성"],
    "sunderland": ["2024/25 Championship 플레이오프 우승·프리미어리그 승격", "2025/26 프리미어리그 7위·유로파리그 진출", "선덜랜드의 53년 만의 유럽대항전 진출"],
    "tottenham": ["2022/23 브라이튼 프리미어리그 6위·구단 최초 유럽대항전 진출", "2024/25 마르세유 Ligue 1 준우승", "2021 샤흐타르 도네츠크 우크라이나 슈퍼컵 우승"],
}

ROLE_CONTROLS = {
    "arsenal": ([['더블 피벗', '라이스의 전진과 중앙 보호를 상황에 따라 전환', 'rice'], ['우측 플레이메이커', '사카와 10번이 우측 하프스페이스를 연결', 'saka'], ['빌드업 키퍼', '후방 수적 우위와 중·장거리 전개 선택', '']], {"defline": 76, "width": 68, "press": 86}),
    "astonvilla": ([['전진형 센터백', '압박을 유인한 뒤 라인 사이로 패스', ''], ['채널 스트라이커', '수비 뒷공간과 측면 채널을 반복 공략', ''], ['인사이드 10번', '박스 미드필드와 컷백 지점 점유', '']], {"defline": 78, "width": 57, "press": 67}),
    "bournemouth": ([['압박형 9번', '센터백 전개를 막고 전진 패스의 첫 목표가 됨', ''], ['좁은 10번', '세컨드볼과 하프스페이스를 공격', ''], ['볼 위닝 6번', '역압박 뒤 전진 패스를 즉시 선택', '']], {"defline": 74, "width": 54, "press": 88}),
    "brentford": ([['타깃 9번', '긴 패스를 지키고 전환 공격을 마무리', ''], ['스프린트 포워드', '탈취 순간 빈 배후 공간을 공격', ''], ['롱패스 미드필더', '전환 첫 패스와 세컨드볼 회수를 담당', '']], {"defline": 52, "width": 62, "press": 64}),
    "brighton": ([['연결형 9번', '투톱 사이 연계와 박스 침투를 병행', ''], ['전진형 10번', '라인 사이 수신 후 위험 패스를 선택', ''], ['역압박 8번', '전진 지원과 즉시 압박의 균형 담당', '']], {"defline": 73, "width": 69, "press": 87}),
    "chelsea": ([['전진 윙백', '마지막 라인의 폭과 깊이를 제공', ''], ['인사이드 포워드', '라인 사이에서 전진 패스와 박스 침투 연결', 'palmer'], ['볼 플레이잉 센터백', '백3 외곽에서 전진 패스와 운반 담당', '']], {"defline": 72, "width": 72, "press": 84}),
    "coventry": ([['중앙 10번', '2선 창조성과 박스 침투의 중심', ''], ['전진형 윙어', '측면 1대1과 뒷공간 공격', ''], ['균형형 더블 피벗', '전진 패스와 풀백 전진 커버', '']], {"defline": 62, "width": 66, "press": 70}),
    "crystalpalace": ([['유동적 10번', '중앙과 측면 사이를 이동하며 공격 연결', ''], ['볼 운반 윙어', '전환 상황에서 직접 전진', ''], ['커버형 6번', '2선 전진 뒤 중앙 공간 보호', '']], {"defline": 61, "width": 65, "press": 72}),
    "everton": ([['측면 창조자', '드리블과 컷백으로 찬스 질을 높임', ''], ['박스 10번', '공격수 주변에서 세컨드볼과 침투 담당', ''], ['운반형 센터백', '성급한 롱패스 대신 중원까지 전진', '']], {"defline": 56, "width": 67, "press": 68}),
    "fulham": ([['오버래핑 풀백', '윙어 바깥을 돌아 측면 수적 우위 형성', ''], ['인사이드 윙어', '풀백에게 폭을 넘기고 박스 안으로 이동', ''], ['박스 스트라이커', '크로스와 컷백의 최종 지점 점유', '']], {"defline": 65, "width": 78, "press": 72}),
    "hullcity": ([['전환형 윙어', '탈취 후 측면 공간으로 빠르게 전진', ''], ['연결형 10번', '중앙 공격수와 2선 사이를 연결', ''], ['수비형 6번', '실용적인 경기 운영과 중앙 보호', '']], {"defline": 54, "width": 63, "press": 66}),
    "ipswich": ([['공격형 윙백', '측면에서 폭과 박스 침투를 제공', ''], ['하프스페이스 10번', '전환 패스를 받아 직접 공격', ''], ['커버 센터백', '윙백 뒤와 넓은 공간을 방어', '']], {"defline": 55, "width": 73, "press": 69}),
    "leeds": ([['타깃 스트라이커', '직접 전개의 경합과 박스 마무리', ''], ['왕복 윙백', '3-5-2 전환 시 폭과 수비 복귀 담당', ''], ['볼 위닝 8번', '선택적 압박과 세컨드볼 회수', '']], {"defline": 57, "width": 65, "press": 73}),
    "liverpool": ([['압박형 9번', '첫 압박과 탈취 후 전진 패스의 기준점', ''], ['다이내믹 10번', '압박·운반·배후 침투를 연속 수행', ''], ['공격형 풀백', '높은 위치에서 폭과 빠른 전진 제공', '']], {"defline": 82, "width": 72, "press": 94}),
    "mancity": ([['인버티드 풀백', '중앙 3-2 빌드업과 역압박 기반 형성', ''], ['하프스페이스 8번', '라인 사이 수신과 박스 침투', ''], ['폭 유지 윙어', '블록을 넓히고 1대1 돌파', '']], {"defline": 79, "width": 76, "press": 82}),
    "manutd": ([['자유 10번', '브루노가 전진 패스와 최종 선택에 집중', ''], ['균형형 더블 피벗', '10번의 자유와 중앙 수비를 지원', ''], ['스피드 윙어', '탈취 후 측면 배후를 직접 공격', '']], {"defline": 60, "width": 72, "press": 71}),
    "newcastle": ([['압박형 투톱', '전방 수비와 배후 침투를 분담', ''], ['좁은 10번', '세컨드볼 회수와 즉시 전진', ''], ['볼 위닝 미드필더', '강한 경합 후 전환의 첫 패스 담당', '']], {"defline": 77, "width": 55, "press": 91}),
    "nottinghamforest": ([['전진 윙백', '백3 바깥에서 폭과 크로스 제공', ''], ['두 명의 10번', '공격수 주변에서 전환과 박스 침투 연결', ''], ['경합형 9번', '직접 패스의 기준점과 공중볼 담당', '']], {"defline": 54, "width": 72, "press": 66}),
    "sunderland": ([['딥 플레이메이커', '후방 안정과 긴 전환 패스를 제공', ''], ['공격형 풀백', '측면 3대2와 크로스 생산', ''], ['멀티 포워드', '9번·10번·측면을 오가며 전환 공격', '']], {"defline": 58, "width": 69, "press": 78}),
    "tottenham": ([['탈압박 더블 피벗', '상대 압박을 유인하고 짧은 패스로 통과', ''], ['터치라인 윙어', '넓은 폭을 유지한 뒤 대각 전진', ''], ['전진 압박 8번', '맨투맨 압박과 박스 침투를 병행', '']], {"defline": 75, "width": 79, "press": 90}),
}


def main() -> int:
    data = json.loads(TARGET.read_text(encoding="utf-8"))
    current = json.loads(CURRENT_MANAGERS.read_text(encoding="utf-8"))["managers"]
    if set(current) != set(data):
        raise ValueError("Current manager team IDs must match managers.json")
    for team_id, facts in current.items():
        data[team_id]["name"] = facts["koreanName"] or facts["englishName"]
        data[team_id]["nationality"] = ", ".join(facts.get("nationalities", [])) or "미확정"
    missing = sorted(set(UPDATES) - set(data))
    if missing:
        raise ValueError(f"Unknown manager team IDs: {missing}")
    for team_id, update in UPDATES.items():
        data[team_id].update(update)
    if set(ACHIEVEMENTS) != set(data):
        raise ValueError("ACHIEVEMENTS must contain every manager team ID")
    for team_id, achievements in ACHIEVEMENTS.items():
        data[team_id]["achievements"] = achievements
    if set(ROLE_CONTROLS) != set(data):
        raise ValueError("ROLE_CONTROLS must contain every manager team ID")
    for team_id, (roles, sliders) in ROLE_CONTROLS.items():
        data[team_id]["keyPlayers"] = roles
        data[team_id]["sliders"] = sliders
        data[team_id]["controlValuesStatus"] = "tacticvision-analysis-estimate"
    TARGET.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Enriched manager profiles: {len(data)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
