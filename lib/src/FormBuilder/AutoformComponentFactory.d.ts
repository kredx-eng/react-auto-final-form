import { AnyObject } from "./interfaces/SchemaInterfaces";
import React from "react";
export declare class AutoformComponentFactory {
    componentFactory: AnyObject;
    registerFieldComponent: (name: string, type: Array<any> | string, component: React.ElementType) => void;
}
