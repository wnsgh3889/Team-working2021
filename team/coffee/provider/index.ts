//reducer
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export { store };
export type AppDispatch = typeof store.dispatch;
