/// <reference types="react" />
import { ComponentFactory, SchemaFields } from "../FormBuilder/interfaces/SchemaInterfaces";
export declare const getComponent: (field: SchemaFields, componentFactory?: ComponentFactory | undefined) => import("react").ComponentClass<any, any> | import("react").FunctionComponent<any> | ((props: any) => JSX.Element);
