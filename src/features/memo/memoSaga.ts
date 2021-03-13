import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { addMemo, Memo, addMemoAsync } from "./memoAppSlice";

function* postMemo(action: PayloadAction<Memo>) {
  console.log("포스트메모 실행됨 제네");
  const delay = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, 1000);
    });
  yield call(delay);
  yield put(addMemo(action.payload));
}

// 감시
function* memoSaga() {
  yield takeLatest(addMemoAsync, postMemo);
}

export default memoSaga;
