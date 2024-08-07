# 🧑🏻‍💻 SANDBURG 테스트

## 💁🏻프로젝트 소개
**커뮤니티 서비스 api 서버 개발**
- JWT 인증 기반 로그인 및 서비스 
- 공지, 운영 게시판은 user 접근 불가
- 공지, 운영, 자유 게시판은 admin 접근 가능 및 user 게시글 삭제 권한 부여
- DTO(Data Transfer Object) 유효성 검증을 통해 사용자 입력 검사
- swagger 사용하여 직관적, API 엔드포인트를 쉽게 탐색 가능


## 🛠️개발 환경
- BackEnd : NestJS, MySQL, Docker, Swagger, PostMan
- Tool : VScode, ERD cloud

## 📂기능 개발
### DDD (Domain Drive Design)
https://www.figma.com/board/hxgMfehKF5KkeE2jayydhz/SANDBURT_TEST?node-id=0-1&t=MiRq5DhlkcgSRn6Z-1
<img width="700" alt="SANDBURT_TEST" src="https://github.com/user-attachments/assets/f419a85f-c25b-4a44-96d0-2272251cf98b">
- 핵심 도메인 8개를 선정하여 진행하였습니다.
- 각각의 도메인 중심 설계를 통해 필요한 비즈니스 로직을 파악 후 진행하였습니다. 

### API명세
https://docs.google.com/spreadsheets/d/1k-lKQTUKsfWyV2H92IBcKlqI2I-RFoHWxrbBsK50bDA/edit?usp=sharing
![image](https://github.com/user-attachments/assets/fcbe29d6-9f04-4ed8-927f-a5450ce5860d)

### ERD 
<img width="703" alt="image" src="https://github.com/user-attachments/assets/67631dae-8462-4c9d-ace4-ef6ee926d445">

