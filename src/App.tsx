import React, { Fragment } from "react";
import { MemoApp } from "./features/memo/MemoApp";
import GlobalStyle from "./globalStyles";

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <MemoApp />
    </Fragment>
  );
}

export default App;
