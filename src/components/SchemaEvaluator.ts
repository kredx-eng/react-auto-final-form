import {
  AnyObject,
  Fields,
  IEntities,
  IFields,
  IGroups,
  ILayout,
  ISchema
} from "../interfaces/SchemaInterfaces";
import omit from "lodash/omit";
import merge from "lodash/merge";

export class SchemaEvaluator {
  schema: ISchema;
  parsedSchema: AnyObject | Array<any>;
  fieldNameStack: Array<string>;
  subscribedFields: Array<string>;
  layoutFields: Array<any> = [];

  //Private variables
  private fields: AnyObject = {};
  // private layoutName: string | undefined;

  constructor(schema: ISchema, initialEntityName: string, layoutName?: string) {
    this.schema = schema;
    this.fieldNameStack = [];
    this.parsedSchema = {};
    this.subscribedFields = [];
    this.parseEntity(initialEntityName, layoutName);
    this.fields = {};
  }
  private parseEntity = (entityName: string, layoutName?: string) => {
    const { entities } = this.schema;
    const requiredEntity = entities.find(entity => entity.name === entityName);
    if (!requiredEntity) {
      throw new Error(
        `Provided property entityName: ${entityName}, does not exist in the provided schema`
      );
    } else {
      if (layoutName && requiredEntity.layouts) {
        this.getLayoutFields(requiredEntity, layoutName);
      } else if (requiredEntity.fields) {
        this.getFields(requiredEntity);
      }
    }
  };
  private getFields = (entity: IEntities, isLayoutField?: boolean) => {
    if (entity.fields) {
      const { fields } = entity;
      this.fieldNameStack.push(entity.name);
      // @ts-ignore
      fields.forEach((field, key) => {
        if (field.type === "entity") {
          if (!field.entityName) {
            throw new Error(
              `Please provide entityName for a field type of entity for field with name: ${field.name}`
            );
          } else {
            this.parseEntity(field.entityName);
          }
        } else if (field.type === "array") {
          Object.assign(isLayoutField ? this.fields : this.parsedSchema, {
            [this.getName(field.name)]: { ...field }
          });
        } else {
          Object.assign(isLayoutField ? this.fields : this.parsedSchema, {
            [this.getName(Array.isArray(fields) ? field.name : key)]: {
              ...field
            }
          });
          if (field.subscription) {
          }
        }
      });
      this.fieldNameStack.pop();
    }
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

  private getLayoutFields = (entity: IEntities, layoutName: string) => {
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
        requiredLayout.groups.forEach((group: IGroups) => {
          this.layoutFields.push(this.generateLayoutFields(group, entity));
          this.fields = {};
        });
      } else {
        this.layoutFields.push(
          this.generateLayoutFields(requiredLayout, entity)
        );
        this.fields = {};
      }
    }
  };

  private generateLayoutFields = (
    layout: ILayout | IGroups,
    entity: IEntities
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
    let customEntity = entity;
    customEntity.fields = mergedFields;
    this.getFields(customEntity, true);
    return {
      ...omit(layout, ["fields"]),
      fields: this.fields,
      isLayoutField: true
    };
  };
}
