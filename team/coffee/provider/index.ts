import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./modules/profile";
import noticeReduer from "./modules/notice";
// import contactReducer from "../features/contact/contactSlice";
import progressReducer from "./modules/progress";
import alertReducer from "./modules/alert";

// 최상위 사가
import rootSaga from "../middleware";
import createSagaMiddleware from "@redux-saga/core";

// saga middleware 생성
// middleware: 중간에 먼가를 처리하는 소프트웨어
// redux saga는 redux 상태처리 전/후에 먼가를 해주는 라이브러리
const sagaMiddleware = createSagaMiddleware();

// global state(전역 상태) 저장소 만듦
// global state: profile, todo, contact .... 여러개 state가 있음
// ** 이러한 state들은 다른 컴포넌트와 state가 공유 됨
export const store = configureStore({
  // 각 state별로 처리할 reducer 목록
  reducer: {
    // state이름: reducer이름
    // profile state 처리하는 reducer를 등록
    profile: profileReducer,
    // notice state를 처리하는 reducer를 등록
    notice: noticeReduer,
    // contact: contactReducer,
    progress: progressReducer,
    alert: alertReducer,
  },
  // redux store(dispatcher)에 미들웨어 적용
  // middleware는 여러개 사용할 수 있음, [defaultMiddlware, sagaMiddleware, thunkMiddlware]
  middleware: [sagaMiddleware],
  devTools: true, // 개발툴 사용여부
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
