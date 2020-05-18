/**
 * Created by aman on 10/7/17.
 */
export declare const addressEntity: {
    name: string;
    fields: ({
        name: string;
        displayName: string;
        type: string;
        error?: undefined;
        component?: undefined;
        options?: undefined;
        min?: undefined;
        max?: undefined;
        entityName?: undefined;
        className?: undefined;
        layoutName?: undefined;
    } | {
        name: string;
        displayName: string;
        type: string;
        error(m: any): "" | "Please add City";
        component?: undefined;
        options?: undefined;
        min?: undefined;
        max?: undefined;
        entityName?: undefined;
        className?: undefined;
        layoutName?: undefined;
    } | {
        name: string;
        displayName: string;
        type: string;
        component: string;
        options: {
            value: string;
            text: string;
        }[];
        error?: undefined;
        min?: undefined;
        max?: undefined;
        entityName?: undefined;
        className?: undefined;
        layoutName?: undefined;
    } | {
        name: string;
        displayName: string;
        type: string;
        min: number;
        max: number;
        error(m: any): "" | "Please provide a valid Pincode.";
        component?: undefined;
        options?: undefined;
        entityName?: undefined;
        className?: undefined;
        layoutName?: undefined;
    } | {
        name: string;
        displayName: string;
        type: string;
        entityName: string;
        className: string;
        layoutName: string;
        error?: undefined;
        component?: undefined;
        options?: undefined;
        min?: undefined;
        max?: undefined;
    })[];
    layouts: {
        name: string;
        orientation: string;
        groups: {
            orientation: string;
            fields: {
                name: string;
                size: number;
            }[];
        }[];
    }[];
};
export declare const phonesEntity: {
    name: string;
    fields: {
        home: {
            name: string;
            type: string;
            displayName: string;
        };
        mobile: {
            name: string;
            type: string;
            displayName: string;
        };
    };
    layouts: {
        name: string;
        orientation: string;
        fields: {
            name: string;
            size: number;
        }[];
    }[];
};
