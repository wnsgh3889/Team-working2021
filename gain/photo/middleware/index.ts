import { fork } from "redux-saga/effects";
import photoSaga from "./modules/photo";
import profileSaga from "./modules/profile";

export default function* rootSaga() {
  yield fork(photoSaga);
  yield fork(profileSaga);
}
