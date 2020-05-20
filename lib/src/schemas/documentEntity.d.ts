/**
 * Created by aman on 10/7/17.
 */
declare const DocManagerMultipleUploadsEntity: {
    name: string;
    fields: ({
        name: string;
        type: string;
        entityName: string;
    } | {
        name: string;
        type: string;
        entityName?: undefined;
    } | {
        name: string;
        type: string;
        error(m: any, r: any, g: any): "" | "Please give a reason for waive off";
        entityName?: undefined;
    })[];
};
declare const VerificationStatusEntity: {
    name: string;
    fields: ({
        name: string;
        type: string;
        entityName: string;
        arrayType?: undefined;
        entityType?: undefined;
    } | {
        name: string;
        type: string;
        arrayType: string;
        entityType: string;
        entityName?: undefined;
    })[];
};
declare const latestVerificationStatusEntity: {
    name: string;
    fields: ({
        name: string;
        type: string;
        entityName?: undefined;
    } | {
        name: string;
        type: string;
        entityName: string;
    })[];
};
declare const verificationDetailsEntity: {
    name: string;
    fields: ({
        name: string;
        type: string;
        entityName?: undefined;
    } | {
        name: string;
        type: string;
        entityName: string;
    })[];
};
declare const adminVerificationDetailEntity: {
    name: string;
    fields: {
        name: string;
        type: string;
    }[];
};
declare const uploadDocumentEntity: {
    name: string;
    fields: {
        name: string;
        type: string;
    }[];
};
export { uploadDocumentEntity, DocManagerMultipleUploadsEntity, VerificationStatusEntity, latestVerificationStatusEntity, verificationDetailsEntity, adminVerificationDetailEntity };
