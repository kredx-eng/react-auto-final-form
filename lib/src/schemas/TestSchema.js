"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var organizationEntity_1 = require("./common/organizationEntity");
var bankInfoEntity_1 = require("./common/bankInfoEntity");
var addressEntity_1 = require("./common/addressEntity");
var baseSchema = {
    entities: [
        {
            name: "base",
            fields: [
                {
                    name: "baseAddress",
                    type: "entity",
                    entityName: "address",
                    layoutName: "edit"
                },
                {
                    name: "baseOrganization",
                    type: "entity",
                    entityName: "organization_info",
                    layoutName: "edit"
                },
                {
                    name: "baseBankInfo",
                    type: "entity",
                    entityName: "bank_info_entity",
                    layoutName: "edit"
                }
            ]
        }
    ]
};
baseSchema.entities.push(
// @ts-ignore
organizationEntity_1.organizationDetailPreSanctionEntity, bankInfoEntity_1.bankInfoEntity, addressEntity_1.addressEntity, addressEntity_1.phonesEntity);
exports.default = baseSchema;
//# sourceMappingURL=TestSchema.js.map