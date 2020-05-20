"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var omit_1 = __importDefault(require("lodash/omit"));
var merge_1 = __importDefault(require("lodash/merge"));
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var CanonizeSchema_1 = require("../utils/CanonizeSchema");
var SchemaEvaluator = /** @class */ (function () {
    // private layoutName: string | undefined;
    function SchemaEvaluator(schema, initialEntityName, layoutName) {
        var _this = this;
        this.layoutFields = [];
        //Private variables
        this.fields = {};
        this.arrayField = {};
        this.parseEntity = function (entityName, layoutName, isInitialEntity) {
            var requiredEntity = _this.getEntity(entityName);
            if (!requiredEntity) {
                throw new Error("Provided property entityName: " + entityName + ", does not exist in the provided schema");
            }
            else {
                if (layoutName && requiredEntity.layouts) {
                    _this.getLayoutFields(requiredEntity, layoutName);
                }
                else if (requiredEntity.fields) {
                    _this.getFields(requiredEntity, false, isInitialEntity);
                    _this.pushAndEmptyFields();
                }
            }
        };
        this.pushAndEmptyFields = function (orientation) {
            _this.parsedSchema.push({
                orientation: orientation || "vertical",
                fields: _this.fields
            });
            _this.fields = {};
        };
        this.getEntity = function (entityName) {
            var entities = _this.schema.entities;
            return entities.find(function (entity) { return entity.name === entityName; });
        };
        this.getFields = function (entity, isLayoutField, isInitialEntity, isArrayField) {
            if (entity.fields) {
                var fields_1 = entity.fields;
                if (!isInitialEntity) {
                    _this.fieldNameStack.push(entity.name);
                }
                // @ts-ignore
                fields_1.forEach(function (field, key) {
                    var _a, _b;
                    var fieldName = isArrayField
                        ? field.name
                        : _this.getName(Array.isArray(fields_1) ? field.name : key);
                    if (field.type === "entity") {
                        if (!field.entityName) {
                            throw new Error("Please provide entityName for a field type of entity for field with name: " + field.name);
                        }
                        else {
                            if (!isEmpty_1.default(_this.fields)) {
                                _this.pushAndEmptyFields(entity.orientation);
                            }
                            _this.parseEntity(field.entityName, field.layoutName, false);
                        }
                    }
                    else if (field.type === "array") {
                        if (!isEmpty_1.default(_this.fields)) {
                            _this.pushAndEmptyFields(entity.orientation);
                        }
                        if (!field.entityName) {
                            throw new Error("Please provide entityName for a field type of entity for field with name: " + field.name);
                        }
                        else {
                            Object.assign(_this.fields, (_a = {},
                                _a[fieldName] = __assign({}, field, { arrayFields: _this.getArrayFields(field.entityName, field.layoutName) }),
                                _a));
                        }
                    }
                    else {
                        Object.assign(isArrayField ? _this.arrayField : _this.fields, (_b = {},
                            _b[fieldName] = __assign({}, field),
                            _b));
                        if (isArrayField) {
                            Object.assign(_this.arrayField, { orientation: entity.orientation });
                        }
                    }
                });
                _this.fieldNameStack.pop();
            }
        };
        this.getArrayFields = function (entityName, layoutName) {
            var requiredEntity = _this.getEntity(entityName);
            if (!requiredEntity) {
                throw new Error("Provided property entityName: " + entityName + ", does not exist in the provided schema");
            }
            else {
                if (layoutName) {
                    _this.getLayoutFields(requiredEntity, layoutName, true);
                }
                else {
                    _this.getFields(requiredEntity, true, true, true);
                }
            }
            var retVal = Object.assign({}, _this.arrayField);
            _this.arrayField = {};
            return retVal;
        };
        this.getName = function (fieldName) {
            if (_this.fieldNameStack.length) {
                return (_this.fieldNameStack.reduce(function (previousValue, currentValue) { return previousValue + "." + currentValue; }) +
                    "." +
                    fieldName);
            }
            else {
                return fieldName;
            }
        };
        this.getLayoutFields = function (entity, layoutName, isArrayField) {
            var requiredLayout = entity.layouts &&
                //@ts-ignore
                entity.layouts.find(function (layout) { return layout.name === layoutName; });
            if (!requiredLayout) {
                throw new Error("Provided layoutName: " + layoutName + ", isn't provided in the schema");
            }
            else {
                if (requiredLayout.groups) {
                    requiredLayout.groups.forEach(function (group) {
                        _this.generateLayoutFields(group, entity, isArrayField);
                    });
                }
                else {
                    _this.generateLayoutFields(requiredLayout, entity, isArrayField);
                }
            }
        };
        this.generateLayoutFields = function (layout, entity, isArrayField) {
            var mergedFields = [];
            // @ts-ignore
            layout.fields.forEach(function (field) {
                mergedFields.push(merge_1.default(field, 
                // @ts-ignore
                entity.fields.find(function (entityField) { return entityField.name === field.name; }) ||
                    {}));
            });
            var customEntity = Object.assign({}, omit_1.default(entity, ["layouts"]));
            Object.assign(customEntity, {
                fields: mergedFields,
                orientation: layout.orientation
            });
            _this.getFields(customEntity, true, false, isArrayField);
            _this.pushAndEmptyFields(layout.orientation);
        };
        this.schema = CanonizeSchema_1.canonizeSchema(schema);
        this.fieldNameStack = [];
        this.parsedSchema = [];
        this.subscribedFields = [];
        this.parseEntity(initialEntityName, layoutName, true);
        this.fields = {};
    }
    return SchemaEvaluator;
}());
exports.SchemaEvaluator = SchemaEvaluator;
//# sourceMappingURL=SchemaEvaluator.js.map