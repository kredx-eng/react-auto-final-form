"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by aman on 10/7/17.
 */
var DocManagerMultipleUploadsEntity = {
    // Entity for Upload DocManagerMultipleUploads component
    name: "verify_document",
    fields: [
        {
            name: "document",
            type: "entity",
            entityName: "doc_ref"
        },
        {
            name: "uid",
            type: "string"
        },
        {
            name: "verification",
            type: "entity",
            entityName: "verification_container"
        },
        {
            name: "waive_off_requested",
            type: "string"
        },
        {
            name: "comment",
            type: "string",
            error: function (m, r, g) {
                return m.waive_off_requested
                    ? !m.comment
                        ? "Please give a reason for waive off"
                        : ""
                    : "";
            }
        },
        {
            name: "is_group",
            type: "bool"
        },
        {
            name: "document_type",
            type: "string"
        },
        {
            name: "is_multi_file",
            type: "bool"
        }
    ]
};
exports.DocManagerMultipleUploadsEntity = DocManagerMultipleUploadsEntity;
var VerificationStatusEntity = {
    // Entity for Verification Status which contains history and latest verification object
    name: "verification_container",
    fields: [
        {
            name: "latest",
            type: "entity",
            entityName: "verification_entity"
        },
        {
            name: "history",
            type: "array",
            arrayType: "entity",
            entityType: "verification_entity"
        }
    ]
};
exports.VerificationStatusEntity = VerificationStatusEntity;
var latestVerificationStatusEntity = {
    // Entity for Latest Verification Status
    name: "verification_entity",
    fields: [
        {
            name: "timestamp",
            type: "string"
        },
        {
            name: "status",
            type: "string"
        },
        {
            name: "comments",
            type: "string"
        },
        {
            name: "verification_details",
            type: "entity",
            entityName: "verification_details_entity"
        }
    ]
};
exports.latestVerificationStatusEntity = latestVerificationStatusEntity;
var verificationDetailsEntity = {
    // Entity for verification_details
    name: "verification_details_entity",
    fields: [
        {
            name: "method",
            type: "string"
        },
        {
            name: "admin_verification_details",
            type: "entity",
            entityName: "admin_verification_detail_entity"
        }
    ]
};
exports.verificationDetailsEntity = verificationDetailsEntity;
var adminVerificationDetailEntity = {
    // Entity for admin_verification_detail_entity
    name: "admin_verification_detail_entity",
    fields: [
        {
            name: "checked_by_user_name",
            type: "string"
        }
    ]
};
exports.adminVerificationDetailEntity = adminVerificationDetailEntity;
var uploadDocumentEntity = {
    // Entity for Upload document component
    name: "doc_ref",
    fields: [
        {
            name: "doc_uid",
            type: "string"
        },
        {
            name: "temp_url",
            type: "string"
        }
    ]
};
exports.uploadDocumentEntity = uploadDocumentEntity;
//# sourceMappingURL=documentEntity.js.map