import { fork } from "redux-saga/effects";
import noticeSaga from "./modules/notice";

export default function* rootSaga() {
  
  yield fork(noticeSaga);
}