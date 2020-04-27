import React from "react";
import { BootstrapWrapper } from "./components/ExternalWrapperHOC's/BootstrapWrapper";
import { NewFormBuilder } from "./components/NewFormBuilder";

export const GetForm = (props: any) => {
  console.log("getformprops", props);
  if (props.useBootstrap) {
    return React.createElement(BootstrapWrapper(NewFormBuilder), { ...props });
  } else {
    return React.createElement(NewFormBuilder, { ...props });
  }
};
