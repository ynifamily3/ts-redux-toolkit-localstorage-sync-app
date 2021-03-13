import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getMemosFromLocalStorage } from "./utils";

export interface Tag {
  textContent: string;
}

export type MemoID = number;

export interface Memo {
  id: MemoID;
  modifiedAt: number;
  textContent: string;
  tags: Tag[];
}

export interface MemoState {
  memos: Memo[];
}

const initialState: MemoState = {
  memos: getMemosFromLocalStorage(),
};

export const memoAppSlice = createSlice({
  name: "memoApp",
  initialState,
  reducers: {
    syncWithLocalStorage: (state, action: PayloadAction<Memo[]>) => {
      state.memos = action.payload;
    },
    addMemo: (state, action: PayloadAction<Memo>) => {
      state.memos.push(action.payload);
    },
    addMemoAsync: (state, action: PayloadAction<Memo>) => {
      console.log("addmemoasync ... (아무것도안해용)");
    },
    removeMemo: (state, action: PayloadAction<number>) => {
      state.memos.splice(action.payload, 1);
    },
  },
});

export const {
  syncWithLocalStorage,
  addMemo,
  addMemoAsync,
  removeMemo,
} = memoAppSlice.actions;

export const selectMemoApp = (state: RootState) => state.memoApp.memos;

export default memoAppSlice.reducer;
