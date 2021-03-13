import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import memoAppReducer from "../features/memo/memoAppSlice";
import createSagaMiddleware from "redux-saga";
import memoSaga from "../features/memo/memoSaga";
import { all } from "@redux-saga/core/effects";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    memoApp: memoAppReducer,
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
});

function* rootSaga() {
  yield all([memoSaga()]);
}

// 사가 미들웨어 실행...
sagaMiddleware.run(rootSaga);

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
