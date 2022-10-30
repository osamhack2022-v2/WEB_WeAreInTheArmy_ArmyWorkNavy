# 여긴군대지(여긴 군 대민지원) - 온라인 군 대민지원 연결 플랫폼
<p>
    <img src="https://user-images.githubusercontent.com/78669550/193375765-98e1234b-9095-4ca7-b136-b71c0fb4ea59.png" />
</p>
"여긴 군대지"는 피해를 입은 국민들이 정상적인 삶을 신속하게 회복할 수 있도록 국민과 국군을 연결해주는 플랫폼입니다.    

  "여긴 군대지" 서비스를 통해 재난에 맞서
  군과 사회가 함께 어우러 살아갈 수 있는 기회가 되었으면 합니다.

## 기획 의도 | Service Needs
**뉴스기사1) ["태풍 직격탄 뚫고, 국민 지키러 긴급출동"](https://www.mnd.go.kr/user/boardList.action?parent=&boardId=I_26349&siteId=mnd&page=1&search=&column=&boardType=02&albumType=&listType=&id=mnd_020107030000&boardSeq=I_10033349&command=albumView&chkBoxSeq=&chkBoxId=&chkBoxPos=&chkBoxDepth=&chkBoxFam_Seq=&warningYn=) / 국방부**    
     내용) 군, ‘힌남노’ 피해지역 대민지원 돌입 해병대1사단, 경북 포항 지역 병력 급파    
           한국형 상륙돌격장갑차 동원 구조작전    
           해군항공사·7전단도 피해 복구 구슬땀    
           육군, 부산·울산 실종자 수색·잔해 수거    
           공군, 화재 발생 포스코 헬기 투입 구조   
           
**뉴스기사2) ["[공군18전비] 혈액 수급난에 너도나도 팔뚝 내밀어"](https://www.mnd.go.kr/user/boardList.action?parent=&boardId=I_26349&siteId=mnd&page=1&search=&column=&boardType=02&albumType=&listType=&id=mnd_020107030000&boardSeq=I_9809362&command=albumView&chkBoxSeq=&chkBoxId=&chkBoxPos=&chkBoxDepth=&chkBoxFam_Seq=&warningYn=) / 국방부**    
     내용) 국가적 혈액 수급난 해소를 위한 22-2차 사랑의 헌혈 운동을 지난달 31일부터 이달 3일까지 나흘간 전개    
           장병들은 자발적으로 행사에 참여해 공군 핵심가치 ‘헌신’을 구현    
           
**뉴스기사3) ["해군 7전단, 제주 힌남노 피해 대민지원"](https://www.newsis.com/view/?id=NISX20220906_0002005156) / 뉴시스**    
     내용) 7전단 장병 및 군무원 여명이 함께 대민지원에 나서고 있다.     

 최근 침수 혹은 태풍과 같은 자연재해, 혹은 재난으로 인해 피해를 받는 민간지역이 많아지고 있습니다.
 
 이종섭 국방부 장관은 "국민의 생명과 재산 보호는 우리 군의 기본 임무임을 명심하고 태풍 피해를 하루 빨리 복구할 수 있도록 최선을 다해 달라"라는 지시를 내리시기도 하였습니다.

 누군가는 "대민지원은 군의 역할이 아니다"라고 하기도 합니다. 하지만 민간의 인원으로는 도저히 해결할 수 없고, 더욱 더 피해를 입은 주민들의 고통이 심해지기 전 도울 수 있는 것은 우리 군밖에 없다고 생각합니다. 

**뉴스기사4) ["20년간 재난 현장 찾아가 내 일처럼... '외진 곳일수록 도움이 절실'](https://m.khan.co.kr/people/people-general/article/202208221148001#c2b) / 경향신문**    

 위 뉴스 칼럼과 같이 외진 지역같은 곳은 복구 지원에 소외되기도 합니다. "여긴 군대지" 서비스를 통해 재난에 맞서 군과 사회가 함께 어우러 살아갈 수 있는 기회가 되었으면 합니다.
 
## 기능 | Features
"여긴 군대지" 서비스는 웹으로 구현될 예정입니다.
민간 페이지와 군 페이지가 분리되어 구현될 예정입니다.

1. 민간페이지 
 "여긴 군대지" 서비스를 통해 지역적으로 대민지원을 신청할 수 있습니다. 지역적으로 라는 단어는 대한민국의 행정 구역을 나누어 "시군구"와 "읍면동"으로 나누어 대민지원을 신청합니다. 신청을 할 때, 피해지역, 피해수준( 사진과 동영상 그리고 텍스트를 근거로 합니다. ), 그리고 얼만큼의 인원이 필요할지 등 현재 상황에 대하여 구체적으로 작성합니다. 

 신청을 조회하는 페이지는 지도로 구현되어 행정 구역별로 도움이 필요한 수준을 짐작할 수 있습니다.  

2. 군페이지
 대민지원을 나갈 수 있는 부대는 인근 부대(5km 이내 혹은 10km 이내 등과 같이 거리로 제한됩니다.) 인근 부대의 관리자는 해당 요청에 대하여 승인을 하거나 반려를 할 수 있습니다.

 해당 지역의 대민지원 요청이 승인이 나게 되면 최적의 동선을 세워 피해가 적은 곳부터 순서대로 지원 계획서를 작성해줍니다.

 장병 혹은 군 간부는 온라인으로 해당 작업에 자진하여 지원할 수 있습니다. 만일 작업이 끝나고 난 뒤에는 해당 인원들에게 봉사시간과 상점을 부여받을 수 있도록 개발합니다. 이를 위해 봉사기관과 협업할 수 있도록 서비스를 기획하여야 합니다. 

 대민지원을 나간 부대는 페이지에 영구히 기록됩니다. 추후에 부대에 기부할 수 있는 기능을 추가하여 대민지원을 통해 군과 사회가 함께 국방력을 증진시킬 수 있는 기회가 되었으면 합니다. 
 
## 기대 효과
- 신속하고 정확하게 효율적인 재난 피해 극복 가능
- 군에 대한 국민의 신뢰도 상승
- 용사에게는 큰 동기가 피해지역에는 도움을 줌
- 쉽고 간편하게 도움이 필요한 위치 파악

## 권장 사양 | Prerequisities
* ECMAScript 6 지원 브라우저 사용
* 권장: Google Chrome 버젼 77 이상

## 설치 방법 | How to Install
### 백엔드
```bash
$ git clone https://github.com/osamhack2022/WEB_WeAreInTheArmy_ArmyWorkNavy.git
$ cd devBe
$ npm install or yarn
$ yarn run start or npm run start
```
### 프론트엔드
```bash
$ git clone https://github.com/osamhack2022/WEB_WeAreInTheArmy_ArmyWorkNavy.git
$ cd WEB_FE/React_WeAreInTheArmy/
$ npm install or yarn
$ yarn run dev or npm run dev
```


## 기술 스택 | Technique Used
### 프론트엔드
- `React`
- `Tailwind CSS`
- `TypeScript`
### 백엔드
- `NestJS`
- `TypeScript`
- `MySQL`
- `Azure`
### 기획 및 디자인
- `Notion` (문서, 회의 내용 기록)
- `Figma`
- `Slack` (회의 및 일정관리)
### 오픈소스
- `Kakao Map API`
- `Git` (소스코드 관리)

### 팀 정보 | Team Information
| 이름 | 역할 | 이메일 | Github ID | 소속 |
|---|---|---|---|---|
| 공민제 | 팀장, 프론트엔드 | minje621@gmail.com | minai621 | 해군 |
| 이혜성 | 백엔드 | mireflare@gmail.com | mireflare | 상근 |
| 황준하 | PM 및 디자인 | juneha2002@gmail.com | ecrire06 | 육군 |

## 저작권 안내
`license.md` 참고
