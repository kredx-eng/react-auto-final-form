/**
 * Created by aman on 10/7/17.
 */
declare const organizationDetailPreSanctionEntity: {
    name: string;
    fields: ({
        name: string;
        displayName: string;
        type: string;
        help(m: any): "" | "Please enter Name of Company";
        component?: undefined;
        options?: undefined;
        visible?: undefined;
        min?: undefined;
        max?: undefined;
        entityName?: undefined;
        parentClassname?: undefined;
    } | {
        name: string;
        displayName: string;
        type: string;
        component: string;
        options: {
            value: string;
            text: string;
        }[];
        help(m: any): "" | "Please select Type of Company";
        visible?: undefined;
        min?: undefined;
        max?: undefined;
        entityName?: undefined;
        parentClassname?: undefined;
    } | {
        name: string;
        displayName: string;
        type: string;
        component: string;
        options: {
            value: string;
            text: string;
        }[];
        help(m: any): "" | "Please enter Type of Industry";
        visible?: undefined;
        min?: undefined;
        max?: undefined;
        entityName?: undefined;
        parentClassname?: undefined;
    } | {
        name: string;
        displayName: string;
        type: string;
        visible(m: any, r: any, g: any): boolean;
        error(m: any, r: any, g: any): "" | "Please enter a valid CIN/LLPIN number";
        component?: undefined;
        options?: undefined;
        min?: undefined;
        max?: undefined;
        entityName?: undefined;
        parentClassname?: undefined;
    } | {
        name: string;
        displayName: string;
        type: string;
        error(m: any): void;
        component?: undefined;
        options?: undefined;
        visible?: undefined;
        min?: undefined;
        max?: undefined;
        entityName?: undefined;
        parentClassname?: undefined;
    } | {
        name: string;
        displayName: string;
        type: string;
        min: number;
        max: number;
        error(m: any): void;
        component?: undefined;
        options?: undefined;
        visible?: undefined;
        entityName?: undefined;
        parentClassname?: undefined;
    } | {
        name: string;
        type: string;
        entityName: string;
        displayName: string;
        component?: undefined;
        options?: undefined;
        visible?: undefined;
        min?: undefined;
        max?: undefined;
        parentClassname?: undefined;
    } | {
        name: string;
        displayName: string;
        type: string;
        visible: (m: any) => boolean;
        error(m: any): "" | "Invalid TAN number. Valid format is AAAA99999A";
        component?: undefined;
        options?: undefined;
        min?: undefined;
        max?: undefined;
        entityName?: undefined;
        parentClassname?: undefined;
    } | {
        name: string;
        displayName: string;
        type: string;
        parentClassname: string;
        error(m: any): "" | "Invalid GST lD number. Valid format is 22ABCDE1234F1Z5";
        component?: undefined;
        options?: undefined;
        visible?: undefined;
        min?: undefined;
        max?: undefined;
        entityName?: undefined;
    } | {
        name: string;
        displayName: string;
        type: string;
        visible: boolean;
        component?: undefined;
        options?: undefined;
        min?: undefined;
        max?: undefined;
        entityName?: undefined;
        parentClassname?: undefined;
    })[];
    layouts: {
        name: string;
        orientation: string;
        groups: ({
            orientation: string;
            fields: {
                name: string;
                layoutName: string;
                size: number;
            }[];
        } | {
            orientation: string;
            fields: ({
                name: string;
                size: number;
                visible?: undefined;
            } | {
                name: string;
                size: number;
                visible: boolean;
            })[];
        })[];
    }[];
};
declare const organizationDetailPostSanctionEntity: {
    name: string;
    fields: ({
        name: string;
        displayName: string;
        type: string;
        component: string;
        options: {
            value: string;
            text: string;
        }[];
        help(m: any): "" | "Please select Type of Company";
        visible: boolean;
    } | {
        name: string;
        displayName: string;
        type: string;
        error(m: any): "" | "Invalid TAN number. Valid format is AAAA99999A" | "TAN Number is required";
        component?: undefined;
        options?: undefined;
        visible?: undefined;
    } | {
        name: string;
        displayName: string;
        type: string;
        error(m: any): "" | "Invalid GST lD number. Valid format is 22ABCDE1234F1Z5" | "GSTN Number is required";
        component?: undefined;
        options?: undefined;
        visible?: undefined;
    })[];
    layouts: {
        name: string;
        orientation: string;
        groups: {
            orientation: string;
            fields: {
                name: string;
                size: number;
                visible: boolean;
            }[];
        }[];
    }[];
};
export { organizationDetailPreSanctionEntity, organizationDetailPostSanctionEntity };
