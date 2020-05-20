import { AnyObject } from "./interfaces/SchemaInterfaces";
import React from "react";
import { FieldWrapper } from "../components/FieldWrapper";

export class AutoformComponentFactory {
  componentFactory: AnyObject;
  constructor() {
    this.componentFactory = {};
  }
  registerFieldComponent = (
    name: string,
    type: Array<any> | string,
    component: React.ElementType
  ) => {
    Object.assign(this.componentFactory, { [name]: FieldWrapper(component) });
  };
}
