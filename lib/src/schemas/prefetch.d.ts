export declare const prefetchDealSchema: {
    entities: {
        name: string;
        fields: ({
            name: string;
            displayName: string;
            type: string;
            options: {
                value: string;
                text: string;
            }[];
            required: boolean;
        } | {
            name: string;
            type: string;
            displayName?: undefined;
            options?: undefined;
            required?: undefined;
        })[];
        layouts: {
            name: string;
            groups: {
                orientation: string;
                fields: ({
                    name: string;
                    displayName: string;
                    defaultValue: string;
                    required: boolean;
                    error: (model: any) => "Please select Deal type" | null;
                    size: number;
                    extraProps?: undefined;
                } | {
                    name: string;
                    displayName: string;
                    defaultValue: string;
                    required: boolean;
                    error: (model: any) => "Please select Line of Business" | "Deal type Invoice, Inventory or Purchase Order must have RECEIVABLES as line of business" | "Deal type BOE must have PAYABLES as line of business" | "Deal type LRD should have LRD as line of business" | null;
                    size: number;
                    extraProps?: undefined;
                } | {
                    name: string;
                    displayName: string;
                    extraProps: {
                        url: string;
                        createListObject: (record: any) => {
                            value: any;
                            label: string;
                        };
                        createLabel: (record: any) => string;
                    };
                    required: boolean;
                    size: number;
                    defaultValue?: undefined;
                })[];
            }[];
        }[];
    }[];
};
