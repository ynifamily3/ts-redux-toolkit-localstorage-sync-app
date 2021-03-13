import React, { Fragment, useState } from "react";
import { MemoApp } from "./features/memo/MemoApp";
import GlobalStyle from "./globalStyles";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import InnerComponent from "./InnerComponent";

export const Ctx = React.createContext({ username: "", helloCount: 0 });
export const SetCtx = React.createContext<
  React.Dispatch<
    React.SetStateAction<{
      username: string;
      helloCount: number;
    }>
  >
>(() => {});

function App() {
  const [userName, setUserName] = useState({
    username: "김 로코",
    helloCount: 2,
  });
  return (
    <Fragment>
      <GlobalStyle />
      <MemoApp />
      <Ctx.Provider value={userName}>
        <SetCtx.Provider value={setUserName}>
          <InnerComponent />
        </SetCtx.Provider>
      </Ctx.Provider>
    </Fragment>
  );
}

export default App;
