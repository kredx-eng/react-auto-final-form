import { AnyObject } from "./interfaces/SchemaInterfaces";
import React from "react";
export declare class AutoformComponentFactory {
    componentFactory: AnyObject;
    registerFieldComponent: (name: string, type: string | any[], component: React.ElementType<any>) => void;
}
