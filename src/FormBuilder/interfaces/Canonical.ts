import { SchemaFields, Groups, ILayoutFields } from "./SchemaInterfaces";

export interface CanonicalSchema {
  entities: Array<CanonicalEntity>;
}

export interface CanonicalEntity {
  fields: Array<SchemaFields>;
  layouts?: Array<CanonicalLayout>;
  name: string;
}

export interface CanonicalLayout {
  name: string;
  groups?: Array<Groups>;
  fields?: Array<ILayoutFields>;
}
