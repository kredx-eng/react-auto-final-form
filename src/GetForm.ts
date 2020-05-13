import React from "react";
import { BootstrapWrapper } from "./components/ExternalWrapperHOC's/BootstrapWrapper";
import { FormBuilder } from "./FormBuilder/FormBuilder";

export const GetForm = (props: any) => {
  if (props.useBootstrap) {
    return React.createElement(BootstrapWrapper(FormBuilder), { ...props });
  } else {
    return React.createElement(FormBuilder, { ...props });
  }
};
