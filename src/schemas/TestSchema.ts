import { organizationDetailPreSanctionEntity } from "./common/organizationEntity";
import { bankInfoEntity } from "./common/bankInfoEntity";
import { addressEntity } from "./common/addressEntity";

const baseSchema = {
  entities: [
    {
      name: "base",
      fields: [
        {
          name: "baseAddress",
          type: "entity",
          entityName: "address"
        },
        {
          name: "baseOrganization",
          type: "entity",
          entityName: "organization_info"
        },
        {
          name: "baseBankInfo",
          type: "entity",
          entityName: "bank_info_entity"
        }
      ]
    }
  ]
};

baseSchema.entities.push(
  // @ts-ignore
  organizationDetailPreSanctionEntity,
  bankInfoEntity,
  addressEntity
);

export default baseSchema;
