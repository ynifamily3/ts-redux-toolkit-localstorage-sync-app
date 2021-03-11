import { Memo } from "./memoAppSlice";

function resetMemosFromLocalStorage() {
  window.localStorage.setItem("memos", "[]");
}

function checkTagsAreValid(tags: Array<any>) {
  for (let i = 0; i < tags.length; i++) {
    if (
      !("textContent" in tags[i] && typeof tags[i]["textContext"] === "string")
    ) {
      return false;
    }
  }
  return true;
}

export function getMemosFromLocalStorage(): Memo[] {
  const items = window.localStorage.getItem("memos");
  if (items === null) {
    resetMemosFromLocalStorage();
    return [];
  }
  // 검증하기
  try {
    const json = JSON.parse(items);
    if (Array.isArray(json)) {
      for (let i = 0; i < json.length; i++) {
        if (
          !(typeof json[i] === "object" && !!json[i]) ||
          !(
            "id" in json[i] &&
            Number.isInteger(json[i]["id"]) &&
            "modifiedAt" in json[i] &&
            Number.isInteger(json[i]["modifiedAt"]) &&
            "textContent" in json[i] &&
            typeof json[i]["textContent"] === "string" &&
            "tags" in json[i] &&
            Array.isArray(json[i]["tags"]) &&
            checkTagsAreValid(json[i]["tags"])
          )
        ) {
          resetMemosFromLocalStorage();
          return [];
        }
      }
      return json as Memo[];
    } else {
      resetMemosFromLocalStorage();
      return [];
    }
  } catch (e) {
    console.log(e);
    resetMemosFromLocalStorage();
    return [];
  }
}

// export interface Memo {
//   modifiedAt: Date;
//   textContent: string;
//   tags: Tag[];
// }
