import {
  AnyObject,
  FieldsObject,
  SchemaEntities,
  SchemaFields,
  Groups,
  SchemaLayout,
  Schema
} from "./interfaces/SchemaInterfaces";
import omit from "lodash/omit";
import merge from "lodash/merge";
import isEmpty from "lodash/isEmpty";
import { canonizeSchema } from "../utils/CanonizeSchema";

export class SchemaEvaluator {
  schema: AnyObject;
  parsedSchema: AnyObject | Array<any>;
  fieldNameStack: Array<string>;
  subscribedFields: Array<string>;
  layoutFields: Array<any> = [];

  //Private variables
  private fields: AnyObject = {};
  private arrayField: AnyObject = {};
  // private layoutName: string | undefined;

  constructor(schema: any, initialEntityName: string, layoutName?: string) {
    this.schema = canonizeSchema(schema);
    this.fieldNameStack = [];
    this.parsedSchema = [];
    this.subscribedFields = [];
    this.parseEntity(initialEntityName, layoutName, true);
    this.fields = {};
  }
  private parseEntity = (
    entityName: string,
    layoutName?: string,
    isInitialEntity?: boolean
  ) => {
    const requiredEntity = this.getEntity(entityName);
    if (!requiredEntity) {
      throw new Error(
        `Provided property entityName: ${entityName}, does not exist in the provided schema`
      );
    } else {
      if (layoutName && requiredEntity.layouts) {
        this.getLayoutFields(requiredEntity, layoutName);
      } else if (requiredEntity.fields) {
        this.getFields(requiredEntity, false, isInitialEntity);
        this.pushAndEmptyFields();
      }
    }
  };

  pushAndEmptyFields = (orientation?: "vertical" | "horizontal") => {
    this.parsedSchema.push({
      orientation: orientation || "vertical",
      fields: this.fields
    });
    this.fields = {};
  };

  private getEntity = (entityName: string) => {
    console.log("entity", this.schema, entityName);
    const { entities } = this.schema;
    return entities.find((entity: any) => entity.name === entityName);
  };

  private getFields = (
    entity: any,
    isLayoutField?: boolean,
    isInitialEntity?: boolean,
    isArrayField?: boolean
  ) => {
    if (entity.fields) {
      const { fields } = entity;
      if (!isInitialEntity) {
        this.fieldNameStack.push(entity.name);
      }
      // @ts-ignore
      fields.forEach((field, key) => {
        const fieldName = isArrayField
          ? field.name
          : this.getName(Array.isArray(fields) ? field.name : key);

        if (field.type === "entity") {
          if (!field.entityName) {
            throw new Error(
              `Please provide entityName for a field type of entity for field with name: ${field.name}`
            );
          } else {
            if (!isEmpty(this.fields)) {
              this.pushAndEmptyFields(entity.orientation);
            }
            this.parseEntity(field.entityName, field.layoutName, false);
          }
        } else if (field.type === "array") {
          if (!isEmpty(this.fields)) {
            this.pushAndEmptyFields(entity.orientation);
          }
          if (!field.entityName) {
            throw new Error(
              `Please provide entityName for a field type of entity for field with name: ${field.name}`
            );
          } else {
            Object.assign(this.fields, {
              [fieldName]: {
                ...field,
                arrayFields: this.getArrayFields(
                  field.entityName,
                  field.layoutName
                )
              }
            });
          }
        } else {
          Object.assign(isArrayField ? this.arrayField : this.fields, {
            [fieldName]: {
              ...field
            }
          });
          if (isArrayField) {
            Object.assign(this.arrayField, { orientation: entity.orientation });
          }
        }
      });
      this.fieldNameStack.pop();
    }
  };

  private getArrayFields = (entityName: "string", layoutName?: string) => {
    const requiredEntity = this.getEntity(entityName);
    if (!requiredEntity) {
      throw new Error(
        `Provided property entityName: ${entityName}, does not exist in the provided schema`
      );
    } else {
      if (layoutName) {
        this.getLayoutFields(requiredEntity, layoutName, true);
      } else {
        this.getFields(requiredEntity, true, true, true);
      }
    }
    const retVal = Object.assign({}, this.arrayField);
    this.arrayField = {};
    return retVal;
  };

  private getName = (fieldName: string) => {
    if (this.fieldNameStack.length) {
      return (
        this.fieldNameStack.reduce(
          (previousValue, currentValue) => previousValue + "." + currentValue
        ) +
        "." +
        fieldName
      );
    } else {
      return fieldName;
    }
  };

  private getLayoutFields = (
    entity: SchemaEntities,
    layoutName: string,
    isArrayField?: boolean
  ) => {
    const requiredLayout =
      entity.layouts &&
      //@ts-ignore
      entity.layouts.find(layout => layout.name === layoutName);
    if (!requiredLayout) {
      throw new Error(
        `Provided layoutName: ${layoutName}, isn't provided in the schema`
      );
    } else {
      if (requiredLayout.groups) {
        requiredLayout.groups.forEach((group: Groups) => {
          this.generateLayoutFields(group, entity, isArrayField);
        });
      } else {
        this.generateLayoutFields(requiredLayout, entity, isArrayField);
      }
    }
  };

  private generateLayoutFields = (
    layout: SchemaLayout | Groups,
    entity: SchemaEntities,
    isArrayField?: boolean
  ) => {
    let mergedFields: Array<any> = [];
    // @ts-ignore
    layout.fields.forEach(field => {
      mergedFields.push(
        merge(
          field,
          // @ts-ignore
          entity.fields.find(entityField => entityField.name === field.name) ||
            {}
        )
      );
    });
    let customEntity = Object.assign({}, omit(entity, ["layouts"]));
    Object.assign(customEntity, {
      fields: mergedFields,
      orientation: layout.orientation
    });
    this.getFields(customEntity, true, false, isArrayField);
  };
}
