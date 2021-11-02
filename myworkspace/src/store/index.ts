import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profileSlice";
import photoReducer from "../features/photo/photoSlice";
import ContactReducer from "../features/contact/ContactSlice";
import AlertReducer from "../../src/components/alert/alertSlice";
import ProgressReducer from"../components/progress/progressSlice";

import rootSaga from "../saga";
import createSagaMiddleWare from "@redux-saga/core"

const sagaMiddleware = createSagaMiddleWare();
// global state(전역 상태) 저장소 만듦
// global state: profile, todo, contact .... 여러개 state가 있음
// ** 이러한 state들은 다른 컴포넌트와 state가 공유 됨
export const store = configureStore({
  // 각 state별로 처리할 reducer 목록
  reducer: {
    // state이름: reducer이름
    // profile state 처리하는 reducer를 등록
    profile: profileReducer,
    // photos state 처리하는 reducer를 등록
    photo: photoReducer,

    contact : ContactReducer,

    alert : AlertReducer,

    progress : ProgressReducer
    
  },
  middleware: [sagaMiddleware],
  devTools: true, // 개발툴 사용여부
});

sagaMiddleware.run(rootSaga);



// typesciprt에서는 몇가지 타입 선언을 해야함

// root state 타입 정의
// 가장 취상위 state
// state.profile, state.contact.....
export type RootState = ReturnType<typeof store.getState>;

// dispatch 타입 정의
// dispatch 함수의 generic type
export type AppDispatch = typeof store.dispatch;