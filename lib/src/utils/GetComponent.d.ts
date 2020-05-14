/// <reference types="react" />
import { ComponentFactory, SchemaFields } from "../FormBuilder/interfaces/SchemaInterfaces";
export declare const getComponent: (field: SchemaFields, componentFactory?: ComponentFactory | undefined) => ((props: any) => JSX.Element) | import("react").ComponentClass<any, any> | import("react").FunctionComponent<any>;
