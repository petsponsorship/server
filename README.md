# 유기 동물 후원 플랫폼

<br/>

## 📆 프로젝트 기간

23.02.13 ~ 진행중

<br/>

## 👩🏻‍🔧 팀원 정보

<img style="margin:5px; border: 1px solid white; border-radius: 20px" src="https://img.shields.io/badge/Back 문이슬-black"/> <img style="margin:5px; border: 1px solid white; border-radius: 20px" src="https://img.shields.io/badge/Front 조수진-black"/> <img style="margin:5px; border: 1px solid white; border-radius: 20px" src="https://img.shields.io/badge/Front 차혜인-black"/>

<br/>

## ⚙️ 사용 스택

<img style="margin:5px; border: 2px solid white; border-radius: 20px" src="https://img.shields.io/badge/javascript-yellow?style=flat-square&logo=javascript&logoColor=white"/> <img style="margin:5px; border: 2px solid white; border-radius: 20px" src="https://img.shields.io/badge/Express-blue?style=flat-square&logo=Express&logoColor=white"/> <img style="margin:5px; border: 2px solid white; border-radius: 20px" src="https://img.shields.io/badge/MySQL-midnightblue?style=flat-square&logo=MySQL&logoColor=white"/> <img style="margin:5px; border: 2px solid white; border-radius: 20px" src="https://img.shields.io/badge/Sequelize-orange?style=flat-square&logo=Sequelize&logoColor=white"/> <img style="margin:5px; border: 2px solid white; border-radius: 20px" src="https://img.shields.io/badge/AWS-232f3e?style=flat-square&logo=amazon&logoColor=white"/>

<br/>

## 💻 구현 기능

- 게시글 CRUD
- 로그인, 회원가입
- JWT 활용한 토큰 관리(Refresh Token, Access Token)
- 게시글 후원하기
- 게시글 좋아요
- 마이페이지 (내가 쓴 글, 후원한 글, 좋아요한 글)
- `multer` 패키지 활용 - 이미지 S3 에 저장
- `node-schedule` 패키지 활용 - 게시 후 2주가 경과한 글은 자동 만료

<br/>

## 💡 깨달은 점

- 텍스트 에디터의 데이터를 html 형식으로 받으면, 이미지를 base64 형식으로 받아 데이터가 커짐. 이미지 추가시 URL 로 바꿔주는 단계가 필요하다.
- 데이터들의 유기적인 관계를 잘 파악하고 있어야 함. 예를들어, `후원하기`를 하면 support 테이블 에 row 가 쌓이고 post 의 후원 금액과 후원자 카운트가 올라가야 한다.
- DB 설계가 중요하다고 생각 됨. 중간에 필드가 추가되는 경우 전에 작성했던 코드를 수정해야 한다.
- JavaScript 가 아닌 TypeScript 를 사용했어야 했다. `species` 의 경우 3가지 값만을 가질 수 있어야 한다. 그 외의 값이 들어오면 error 를 뱉어줘야 하지만, if 조건절에 하나씩 명시해서 걸러주는 방법은 코드의 가독성이 좋지 않다. 그 밖에도 함수의 리턴값의 타입, 변수의 타입 등 을 log 로 찍어 보기 전에 알 수 없어서 불편했다.

<br />

## 🗂️ [API 명세](https://www.notion.so/leeseulmoon/Pet-a66aae279b884887bc0e2708241ea013?pvs=4)
