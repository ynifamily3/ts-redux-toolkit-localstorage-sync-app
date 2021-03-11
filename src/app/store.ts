import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import memoAppReducer from "../features/memo/memoAppSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    memoApp: memoAppReducer,
  },
});

store.subscribe(() => {
  window.localStorage.setItem(
    "memos",
    JSON.stringify(store.getState().memoApp.memos)
  );
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
