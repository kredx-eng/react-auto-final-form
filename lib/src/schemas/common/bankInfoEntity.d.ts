/**
 * Created by aman on 10/7/17.
 */
declare const bankInfoEntity: {
    name: string;
    fields: ({
        name: string;
        displayName: string;
        type: string;
        error?: undefined;
    } | {
        name: string;
        displayName: string;
        type: string;
        error(m: any): string;
    })[];
    layouts: {
        name: string;
        orientation: string;
        size: number;
        groups: {
            orientation: string;
            size: number;
            fields: {
                name: string;
                size: number;
            }[];
        }[];
    }[];
};
export { bankInfoEntity };
