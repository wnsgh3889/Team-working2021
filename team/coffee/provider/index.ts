//reducer
import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export { store };
export type AppDispatch = typeof store.dispatch;
