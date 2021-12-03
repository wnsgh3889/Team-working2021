import { fork } from "redux-saga/effects";
import noticeSaga from "./modules/notice";
import profileSaga from "./modules/profile";

export default function* rootSaga() {
  yield fork(noticeSaga);
  yield fork(profileSaga);
}
