import React from "react";
import { Button } from "react-bootstrap";
import { Ctx, SetCtx } from "./App";

function InnerComponent() {
  return (
    <Ctx.Consumer>
      {(value) => {
        return (
          <SetCtx.Consumer>
            {(setValue) => {
              return (
                <>
                  <div>{value.username + ", " + value.helloCount}</div>
                  <Button
                    onClick={() => {
                      setValue({
                        helloCount: value.helloCount + 1,
                        username: value.username,
                      });
                    }}
                  >
                    갱신
                  </Button>
                </>
              );
            }}
          </SetCtx.Consumer>
        );
      }}
    </Ctx.Consumer>
  );
}

export default InnerComponent;
