import { AnyObject } from "../FormBuilder/interfaces/SchemaInterfaces";
import omit from "lodash/omit";

export const canonizeSchema = (schema: AnyObject): AnyObject => {
  let canonizedSchema: AnyObject = {};
  Object.assign(canonizedSchema, schema);
  if (!schema.entities) {
    throw Error("Cannot find any entity passed in the provided schema");
  } else if (!Array.isArray(schema.entities)) {
    canonizedSchema.entities = [];
    Object.keys(schema.entities).forEach(entityName => {
      const canonizedEntity = canonizeFields(schema.entities[entityName]);
      canonizedSchema.entities.push(
        Object.assign({}, { ...canonizedEntity, name: entityName })
      );
    });
    return canonizedSchema;
  } else {
    canonizedSchema.entities = [];
    schema.entities.forEach((entity: AnyObject) => {
      const canonizedEntity = canonizeFields(entity);
      canonizedSchema.entities.push(Object.assign({}, { ...canonizedEntity }));
    });
    return canonizedSchema;
  }
};

const canonizeFields = (entity: AnyObject) => {
  let canonizedEntity = omit(entity, ["fields"]);
  if (entity.fields) {
    if (Array.isArray(entity.fields)) {
      return entity;
    } else {
      canonizedEntity.fields = [];
      Object.keys(entity.fields).forEach(fieldName => {
        canonizedEntity.fields.push(
          Object.assign({}, { ...entity.fields[fieldName], name: fieldName })
        );
      });
      return canonizedEntity;
    }
  } else {
    throw Error("The provided entity doesn't contain a name");
  }
};
