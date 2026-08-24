#!/usr/bin/env python3
"""Localize player names from explicit Korean/English pairs in NamuWiki squad templates."""
from __future__ import annotations
import html, json, re, socket, unicodedata, urllib.error, urllib.parse, urllib.request
from datetime import datetime, timezone
from difflib import SequenceMatcher
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]; DATA=ROOT/"app"/"data"
PLAYERS_PATH=DATA/"players.json"; SQUADS_PATH=DATA/"squads.json"; OUTPUT_PATH=DATA/"player-name-ko-namuwiki.json"
TEMPLATES={
 "arsenal":"틀:아스날 FC","astonvilla":"틀:아스톤 빌라 FC","bournemouth":"틀:AFC 본머스","brentford":"틀:브렌트포드 FC",
 "brighton":"틀:브라이튼 앤 호브 알비온 FC","chelsea":"틀:첼시 FC","coventry":"틀:코번트리 시티 FC","crystalpalace":"틀:크리스탈 팰리스 FC",
 "everton":"틀:에버튼 FC","fulham":"틀:풀럼 FC","hullcity":"틀:헐 시티 AFC","ipswich":"틀:입스위치 타운 FC",
 "leeds":"틀:리즈 유나이티드 FC","liverpool":"틀:리버풀 FC","mancity":"틀:맨체스터 시티 FC","manutd":"틀:맨체스터 유나이티드 FC",
 "newcastle":"틀:뉴캐슬 유나이티드 FC","nottinghamforest":"틀:노팅엄 포레스트 FC","sunderland":"틀:선덜랜드 AFC","tottenham":"틀:토트넘 홋스퍼 FC",
}
# These squad templates expose Korean player links without adjacent English text.
# The keys are API-Football's team-scoped names; values are the linked NamuWiki titles.
ROSTER_LINK_OVERRIDES={
 "brighton":{
  "O. Boscagli":"올리비에 보스카글리","Igor":"이고르 줄리우","J. Hinshelwood":"잭 힌셜우드",
  "D. Gómez":"디에고 고메스","C. Kostoulas":"카라람포스 코스툴라스","Y. Minteh":"얀쿠바 민테","K. Mitoma":"미토마 카오루",
 },
 "fulham":{
  "B. Lecomte":"뱅자맹 르콩트","B. Leno":"베른트 레노","J. Andersen":"요아킴 안데르센","C. Bassey":"캘빈 배시",
  "T. Castagne":"티모시 카스타뉴","Jorge Cuenca":"호르헤 쿠엔카","A. Robinson":"안토니 로빈슨","K. Tete":"케니 테터",
  "S. Berge":"산데르 베르게","Oscar Bobb":"오스카르 보브","T. Cairney":"톰 케어니","A. Iwobi":"알렉스 이워비",
  "Joshua King":"조시 킹","H. Reed":"해리슨 리드","R. Sessegnon":"라이언 세세뇽","E. Smith Rowe":"에밀 스미스 로우",
  "Kevin":"케빙","J. Kusi-Asare":"요나 쿠시아사레","Rodrigo Muniz":"호드리구 무니스",
 },
 "coventry":{
  "O. Dovin":"올리버 도빈","C. Rushworth":"칼 러시워스","B. Wilson":"벤 윌슨","A. Amenda":"오렐 아멘다",
  "J. Bidwell":"제이크 비드웰","Miguel Brau":"미겔 앙헬 브라우","J. Dasilva":"제이 다실바","K. Kesler-Hayden":"케인 케슬러헤이든",
  "L. Kitching":"리암 키칭","B. Thomas":"바비 토마스","L. Woolfenden":"루크 울펜덴","M. van Ewijk":"밀란 판에베이크",
  "J. Eccles":"조시 에클스","M. Grimes":"맷 그라임스","J. Latibeaudiere":"조엘 라티보디에어","F. Onyeka":"프랭크 오니에카",
  "J. Rudoni":"잭 루도니","T. Sakamoto":"사카모토 타츠히로","E. Simms":"엘리스 심스","V. Torp":"빅토르 토르프",
  "E. Mason-Clark":"에프런 메이슨클라크","B. Thomas-Asante":"브랜든 토마스아산테","H. Wright":"하지 라이트",
 },
 "hullcity":{
  "J. Butland":"잭 버틀랜드","D. Phillips":"딜런 필립스","K. Tzolakis":"콘스탄티노스 촐라키스","S. Ajayi":"세미 아제이",
  "L. Coyle":"루이 코일","C. Drameh":"코디 드라메","J. Egan":"존 이건","R. Giles":"라이언 자일스",
  "L. Herrington":"루카스 헤링턴","C. Hughes":"찰리 휴즈","M. Jacob":"매티 제이콥","N. Mendy":"노벨 멘디",
  "M. Targett":"맷 타겟","M. Crooks":"맷 크룩스","K. Dowell":"키어런 다월","L. Gourna-Douath":"뤼카 구르나두아트",
  "J. Hjertø-Dahl":"옌스 예르퇴달","E. Matazo":"엘리엇 마타조","H. Morita":"모리타 히데마사","A. Ömür":"압뒬카디르 외뮈르",
  "R. Slater":"리건 슬레이터","E. Stroud":"엘리엇 스트라우드","Óscar Steven Zambrano Preciado":"오스카르 삼브라노",
  "D. Akintola":"데이비드 아킨톨라","M. Belloumi":"모하메드 벨루미","J. Gelhardt":"조 겔하트",
  "O. McBurnie":"올리버 맥버니","L. Millar":"리암 밀러",
 },
}
PAIR_PATTERN=re.compile(r"<a class='GVYyJ7b1' href='(/w/[^']+)' title='([^']+)'[^>]*>([^<]+)</a><br[^>]*>(.*?)</span>",re.S)

def clean(value:str)->str: return html.unescape(re.sub(r"<[^>]+>","",value)).strip()
def normalise(value:str)->str:
 value=unicodedata.normalize("NFKD",value).encode("ascii","ignore").decode().lower()
 return re.sub(r"[^a-z0-9]","",value)

def fetch_template(title:str)->tuple[str,list[dict]]:
 url="https://namu.wiki/w/"+urllib.parse.quote(title)
 req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 (compatible; TacticVision squad verification)"})
 try:
  with urllib.request.urlopen(req,timeout=20) as response: body=response.read().decode("utf-8","replace")
 except (urllib.error.HTTPError,urllib.error.URLError,TimeoutError,socket.timeout) as exc: raise RuntimeError(f"Could not fetch {title}: {exc}") from exc
 rows=[]; seen=set()
 for href,_,raw_korean,raw_english in PAIR_PATTERN.findall(body):
  korean=clean(raw_korean); english=clean(raw_english); key=(korean,english)
  if key in seen or not re.search(r"[가-힣]",korean) or not re.search(r"[A-Za-z]",english): continue
  if len(korean)>40 or len(english)>80: continue
  seen.add(key); rows.append({"koreanName":korean,"englishName":english,"sourceUrl":urllib.parse.urljoin("https://namu.wiki",href)})
 return url,rows

def match_score(player:dict,candidate:dict)->float:
 candidate_name=candidate["englishName"]; candidate_norm=normalise(candidate_name); best=0.0
 for source in {player.get("name",""),player.get("englishName","")}:
  source_norm=normalise(source)
  if not source_norm: continue
  score=SequenceMatcher(None,source_norm,candidate_norm).ratio()
  if source_norm==candidate_norm: score=1.0
  source_parts=re.findall(r"[A-Za-zÀ-ž]+",source); candidate_parts=re.findall(r"[A-Za-zÀ-ž]+",candidate_name)
  if len(source_parts)==1 and candidate_parts and source_norm in {normalise(candidate_parts[0]),normalise(candidate_parts[-1])}: score=max(score,0.94)
  initial=re.match(r"^([A-Za-z])\.\s*(.+)$",source)
  if initial and candidate_parts:
   first,surname=initial.groups()
   if candidate_parts[0].lower().startswith(first.lower()) and normalise(candidate_parts[-1])==normalise(surname): score=0.99
  best=max(best,score)
 return best

def match_team(players:dict[str,dict],candidates:list[dict])->dict[str,dict]:
 pairs=[]
 for player_id,player in players.items():
  for index,candidate in enumerate(candidates):
   score=match_score(player,candidate)
   if score>=0.72: pairs.append((score,player_id,index))
 pairs.sort(reverse=True); matched={}; used=set()
 for score,player_id,index in pairs:
  if player_id in matched or index in used: continue
  matched[player_id]={**candidates[index],"matchScore":round(score,3)}; used.add(index)
 return matched

def main()->int:
 players=json.loads(PLAYERS_PATH.read_text(encoding="utf-8")); squads=json.loads(SQUADS_PATH.read_text(encoding="utf-8"))
 if set(TEMPLATES)!=set(squads): raise ValueError("NamuWiki squad templates must exactly match canonical teams")
 resolved={}; audit={}
 for team_id,title in TEMPLATES.items():
  template_url,candidates=fetch_template(title); team_players={k:v for k,v in players.items() if v["teamId"]==team_id}; matched=match_team(team_players,candidates); resolved.update(matched)
  linked_names=ROSTER_LINK_OVERRIDES.get(team_id,{})
  for player_id,player in team_players.items():
   korean=linked_names.get(player["name"])
   if korean and player_id not in resolved:
    resolved[player_id]={"koreanName":korean,"englishName":player["name"],"sourceUrl":"https://namu.wiki/w/"+urllib.parse.quote(korean),"matchScore":1.0}
  matched={player_id:record for player_id,record in resolved.items() if players[player_id]["teamId"]==team_id}
  audit[team_id]={"title":title,"sourceUrl":template_url,"templatePlayerCount":len(candidates),"matchedPlayerCount":len(matched)}
  print(f"{team_id}: template={len(candidates)} matched={len(matched)}/{len(team_players)}")
 for player_id,player in players.items():
  record=resolved.get(player_id)
  if record:
   player["koreanName"]=record["koreanName"]; player["englishName"]=record["englishName"]; player["nameLocalizationSource"]="namuwiki-squad-template-pair"; player["nameSourceUrl"]=record["sourceUrl"]
 # MVP policy: keep only players whose Korean display name was explicitly verified.
 players={player_id:player for player_id,player in players.items() if player_id in resolved}
 for squad in squads.values():
  verified_rows=[row for row in squad["starters"]+squad["substitutes"] if row["id"] in players]
  squad["starters"]=verified_rows[:11]
  squad["substitutes"]=verified_rows[11:]
  for row in squad["starters"]+squad["substitutes"]:
   player=players[row["id"]]; row["name"]=player["koreanName"]; row["englishName"]=player["englishName"]
 output={"schemaVersion":"2.0.0","asOf":datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00","Z"),"sourceId":"namuwiki-squad-template-pair","sourceUrl":"https://namu.wiki/","usage":"Korean display names from current club squad templates","limitations":["Only explicit Korean/English pairs or verified Korean player links in each current club squad template are adopted.","Unmatched API players are omitted from the MVP dataset instead of receiving an inferred Korean spelling.","NamuWiki is not used for statistics or biographical facts."],"matchedCount":len(resolved),"teams":audit,"players":resolved}
 PLAYERS_PATH.write_text(json.dumps(players,ensure_ascii=False,indent=2)+"\n",encoding="utf-8"); SQUADS_PATH.write_text(json.dumps(squads,ensure_ascii=False,indent=2)+"\n",encoding="utf-8"); OUTPUT_PATH.write_text(json.dumps(output,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
 print(f"Applied verified squad-template names: {len(players)} (unverified players removed for MVP)"); return 0
if __name__=="__main__": raise SystemExit(main())
