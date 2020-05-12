import React from "react";
import { BootstrapWrapper } from "./components/ExternalWrapperHOC's/BootstrapWrapper";
import { NewFormBuilder } from "./FormBuilder/NewFormBuilder";

export const GetForm = (props: any) => {
  if (props.useBootstrap) {
    return React.createElement(BootstrapWrapper(NewFormBuilder), { ...props });
  } else {
    return React.createElement(NewFormBuilder, { ...props });
  }
};
