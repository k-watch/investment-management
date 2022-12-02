# 투자 관리 서비스 관리자 사이트

> 투자 관리 서비스의 관리자 기능 구현
>
> ### 🌍 [배포링크](https://investment-management.vercel.app/)

<br/>

```command
TEST AUTH
ID : admin@admin.com
PW : 1234
```

<br/>

## 📖 목차

- [구현기능](#-구현-기능)
- [기술스택](#-기술-스택)
- [구현방법](#-구현-방법)
- [폴더구조](#-폴더-구조)
- [컨벤션](#컨벤션)

</br>

## 🚀 구현 기능

- 공통
  - Next.js 를 이용하여 SSR 구현
  - Redux Toolkit 을 사용한 클라이언트 상태 관리
  - React Query 를 사용하면 서버 상태 관리
  - 페이지네이션
  - Side 메뉴에서 현재 보고 있는 화면에 해당하는 메뉴 하이라이트
- 로그인
  - 로그인 시 헤더에 토큰 첨부에서 전송
- 로그아웃
  - 토큰 삭제 및 로그인 페이지 이동
- 계좌 목록
  ![image](https://user-images.githubusercontent.com/30553624/205331872-064b0b54-1520-41d7-999d-a7bc8b24ddd1.png)
  - 계좌명 검색 기능
  - 증권사, 계좌 상태, 계좌 활성화 필터링 버튼
  - 평가금액과 입금금액 손익 비교 후 표시되는 컬러 세팅
- 사용자 목록
  ![image](https://user-images.githubusercontent.com/30553624/205332154-6cd55778-7398-4ca2-b636-3f970f8b7335.png)
  - 계좌 활성화, 임직원 여부 필터링 버튼
  - 사용자 검색 기능
- 사용자 상세
  ![image](https://user-images.githubusercontent.com/30553624/205332278-4d483036-8270-4e1f-89ca-46449f5c86ae.png)
  - 사용자 정보 수정
  - 사용자 정보 삭제

</br>

## ✏ 기술 스택

TypeScript | Next.js | Redux Toolkit | React Query | MUI

 </br>
 
## ✔ 구현 방법
### Redux Toolkit 을 사용한 클라이언트 상태 관리
- 전역 상태 관리를 위한 Redux Toolkit 은 기존 Redux의 방대한 보일러 코드들을 사용하지 않고도 동일한 기능을 발휘하고, 가독성이 뛰어나다 생각하여 사용했습니다. 
https://github.com/k-watch/investment-management/blob/9da04fd8a2fbcf031ad836df55a5ee68587ca510/src/store/accounts/accounts.ts#L13-L24

- 모든 상태값을 RTK로 관리하는 건 비효율적이라고 판단하여 목록 필터링, 검색등은 URLSearchParams 을 이용하여 쿼리스트링을 파싱했습니다.

![image](https://user-images.githubusercontent.com/30553624/205331197-2d8c4e60-d609-4ecf-9052-943b0e0df960.png)

https://github.com/k-watch/investment-management/blob/20210ad11dcc695f4ee209bb2a7466a80c06e625/src/components/common/CommonSelect.tsx#L27-L31

### React Query 를 사용한 서버 상태 관리

- 서버 상태 관리 및 캐싱 전략을 위해 React Query 를 사용했습니다. stale 값을 세팅해 결과값을 캐싱하는 전략을 사용할 수 있지만 계좌 관리인만큼 금액 노출은 민감하다고 판단하여 값을 설정하지 않았습니다.
  https://github.com/k-watch/investment-management/blob/9da04fd8a2fbcf031ad836df55a5ee68587ca510/src/components/accounts/api/useAccountsQuery.ts#L12-L35
  https://github.com/k-watch/investment-management/blob/20210ad11dcc695f4ee209bb2a7466a80c06e625/src/utils/common.ts#L12-L29

### 페이지네이션

- UI 프레임워크는 MUI 를 사용했으며, api header 응답값에서 총 페이지 수를 URLSearchParams 를 이용 쿼리스트링을 파싱하여 현재 페이지를 추출했습니다.
  https://github.com/k-watch/investment-management/blob/9da04fd8a2fbcf031ad836df55a5ee68587ca510/src/components/common/Pagination.tsx#L17-L24

### 사용자 정보 수정

- 사용자 정보를 수정 후 갱신된 값을 바로 보기 위해 invalidateQueries로 값을 refetch 했습니다.
  https://github.com/k-watch/investment-management/blob/9da04fd8a2fbcf031ad836df55a5ee68587ca510/src/components/user/api/useUpdateUserQuery.ts#L8-L13
  </br>

## 📚 폴더 구조

```jsx
📂 pages
├── 📂 accounts
├── 📂 api
├── 📂 user
└── 📂 users
📂 public
📂 src
├── 📂 api
│   ├── 📂 accounts
│   ├── 📂 login
│   ├── 📂 user
│   └── 📂 users
├── 📂 components
│   ├── 📂 accounts
│   ├── 📂 common
│   ├── 📂 login
│   ├── 📂 user
│   └── 📂 users
├── 📂 models
├── 📂 store
│   └── 📂 accounts
├── 📂 styles
├── 📂 types
└── 📂 utils
```

</br>

## 컨벤션

| 커밋명     | 내용                             |
| ---------- | -------------------------------- |
| ✨ feat    | 파일, 폴더, 새로운 기능 추가     |
| 🐛 fix     | 버그 수정                        |
| 💄 style   | 코드 스타일 변경                 |
| 🛠 refactor | 코드 리팩토링                    |
| 📝 docs    | 문서 생성, 추가, 수정(README.md) |
