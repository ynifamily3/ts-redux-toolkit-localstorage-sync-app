import React, { useCallback, useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  syncWithLocalStorage,
  selectMemoApp,
  addMemo,
  removeMemo,
  addMemoAsync,
} from "./memoAppSlice";
import { getMemosFromLocalStorage } from "./utils";
import { Button } from "react-bootstrap";
import { store } from "../../app/store";
declare global {
  interface Window {
    trigger: () => void;
  }
}

export function MemoApp() {
  const memos = useSelector(selectMemoApp);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  // localStorage 를 수신하고 있다가 바꾼다.
  useEffect(() => {
    const handleStorageChanged = () => {
      console.log("로컬 스토리지가 바뀐 사항을 인지함.");
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

  const handleAddMemoAsync = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const val = inputRef.current?.value;
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      dispatch(
        addMemoAsync({
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
      <Button variant="info" onClick={handleAddMemo}>
        메모 쓰기
      </Button>
      <Button variant="success" onClick={handleAddMemoAsync}>
        메모 1초 뒤에 쓰기
      </Button>
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
