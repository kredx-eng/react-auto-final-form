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
      let canonizedEntity = Object.assign(
        {},
        canonizeItems(schema.entities[entityName])
      );
      Object.assign(
        canonizedEntity,
        canonizeLayouts(canonizedEntity, "layouts")
      );
      canonizedSchema.entities.push(
        Object.assign({}, { ...canonizedEntity, name: entityName })
      );
    });
    return canonizedSchema;
  } else {
    canonizedSchema.entities = [];
    schema.entities.forEach((entity: AnyObject) => {
      let canonizedEntity = Object.assign({}, canonizeItems(entity));
      Object.assign(
        canonizedEntity,
        canonizeLayouts(canonizedEntity, "layouts")
      );
      canonizedSchema.entities.push(Object.assign({}, { ...canonizedEntity }));
    });
    console.log("canonizedSchema", canonizedSchema);
    return canonizedSchema;
  }
};

const canonizeLayouts = (entity: AnyObject, type: "layouts" | "groups") => {
  if (entity[type]) {
    let canonizedEntity = omit(entity, [type]);
    if (Array.isArray(entity[type])) {
      if (type === "layouts" && entity.layouts[0].groups) {
        Object.assign(
          canonizedEntity[type],
          canonizeLayouts(entity.layouts, "groups")
        );
      } else {
        Object.assign(canonizedEntity[type], canonizeItems(entity[type]));
      }
    } else {
      canonizedEntity[type] = Object.keys(entity[type]).map(name => {
        if (entity[type][name].fields) {
          console.log("here", name);
          return canonizeLayouts(
            Object.assign(
              {},
              {
                ...canonizeItems(entity[type][name]),
                name: name
              }
            ),
            "groups"
          );
        } else {
          return canonizeLayouts(
            Object.assign({}, { ...entity[type][name], name: name }),
            "groups"
          );
        }
      });
    }
    return canonizedEntity;
  } else {
    return entity;
  }
};

const canonizeItems = (entity: AnyObject) => {
  const canonizedEntity = omit(entity, ["fields"]);
  console.log("heenya", omit(entity, ["fields"]));
  if (entity.fields) {
    if (Array.isArray(entity.fields)) {
      return entity;
    } else {
      canonizedEntity.fields = Object.keys(entity.fields).map(fieldName => {
        return Object.assign(
          {},
          { ...entity.fields[fieldName], name: fieldName }
        );
      });
      console.log("fields", canonizedEntity);
      return canonizedEntity;
    }
  } else {
    return entity;
  }
};
