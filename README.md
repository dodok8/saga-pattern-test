# 리덕스를 조금 더 예쁘게 써보기

리덕스를 조금 더 예쁘게 쓸 수 있는 방법을 찾아보는 중입니다.

- [x] `main` : redux와 redux-saga 만 적용하여 작성된 패턴입니다.
- [x] `Custom-Class-Saga` : 커스텀 클래스 `Action`을 만들고, redux-saga를 적용해서 조금 더 깔끔하게 써본 코드입니다.
  - 미들웨어와 액션의 분리, 재사용성이 좋고 보기에 깔끔함.
  - 이터레이터를 TS에서 잘 지원 안해서 타입 선언을 일일히 해야함
- [x] `Custom-Class-Thunk` : 커스텀 클래스 `Action`을 만들고, redux-thunk를 적용해서 조금 더 깔끔하게 써본 코드입니다.
  - 하나로 미들웨어까지 다 관리 가능, 재사용성은 미들웨어에 필요한 함수를 인자로 받는 것으로 해결.
  - `useDispatch` 의 타입 체킹에 문제
- [ ] `RTK-thunk` : RTK와 내장된 redux-thunk를 이용하여 작성한 코드입니다.
- [ ] `RTK-saga` : RTK와 redux-saga를 이용한 패턴입니다.
