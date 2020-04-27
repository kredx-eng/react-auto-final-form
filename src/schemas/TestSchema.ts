import { organizationDetailPreSanctionEntity } from "./common/organizationEntity";
import { bankInfoEntity } from "./common/bankInfoEntity";
import { addressEntity, phonesEntity } from "./common/addressEntity";

const baseSchema = {
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
  organizationDetailPreSanctionEntity,
  bankInfoEntity,
  addressEntity,
  phonesEntity
);

export default baseSchema;
