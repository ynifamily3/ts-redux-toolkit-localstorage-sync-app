import React, { useCallback, useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  syncWithLocalStorage,
  selectMemoApp,
  addMemo,
  removeMemo,
} from "./memoAppSlice";
import { getMemosFromLocalStorage } from "./utils";

export function MemoApp() {
  const memos = useSelector(selectMemoApp);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  // localStorage 를 수신하고 있다가 바꾼다.
  useEffect(() => {
    const handleStorageChanged = () => {
      dispatch(syncWithLocalStorage(getMemosFromLocalStorage()));
    };
    window.addEventListener("storage", handleStorageChanged);
    return () => {
      window.removeEventListener("storage", handleStorageChanged);
    };
  }, [dispatch]);

  const handleAddMemo = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const val = inputRef.current?.value;
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      dispatch(
        addMemo({
          id: +new Date(),
          modifiedAt: +new Date(),
          tags: [],
          textContent: val ? val : "(내용없음)",
        })
      );
    },
    [dispatch]
  );

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleAddMemo}>메모 쓰기</button>
      {memos.length > 0 && (
        <ul>
          {memos.map((memo) => {
            return <li key={memo.id}>{memo.textContent}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
