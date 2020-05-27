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
exports.canonizeSchema = function (schema) {
    var canonizedSchema = {};
    Object.assign(canonizedSchema, schema);
    if (!schema.entities) {
        throw Error("Cannot find any entity passed in the provided schema");
    }
    else if (!Array.isArray(schema.entities)) {
        canonizedSchema.entities = [];
        Object.keys(schema.entities).forEach(function (entityName) {
            var canonizedEntity = Object.assign({}, canonizeItems(schema.entities[entityName]));
            Object.assign(canonizedEntity, canonizeLayouts(canonizedEntity, "layouts"));
            canonizedSchema.entities.push(Object.assign({}, __assign({}, canonizedEntity, { name: entityName })));
        });
        return canonizedSchema;
    }
    else {
        canonizedSchema.entities = [];
        schema.entities.forEach(function (entity) {
            var canonizedEntity = Object.assign({}, canonizeItems(entity));
            Object.assign(canonizedEntity, canonizeLayouts(canonizedEntity, "layouts"));
            canonizedSchema.entities.push(Object.assign({}, __assign({}, canonizedEntity)));
        });
        console.log("canonizedSchema", canonizedSchema);
        return canonizedSchema;
    }
};
var canonizeLayouts = function (entity, type) {
    if (entity[type]) {
        var canonizedEntity = omit_1.default(entity, [type]);
        if (Array.isArray(entity[type])) {
            if (type === "layouts" && entity.layouts[0].groups) {
                Object.assign(canonizedEntity[type], canonizeLayouts(entity.layouts, "groups"));
            }
            else {
                Object.assign(canonizedEntity[type], canonizeItems(entity[type]));
            }
        }
        else {
            canonizedEntity[type] = Object.keys(entity[type]).map(function (name) {
                if (entity[type][name].fields) {
                    console.log("here", name);
                    return canonizeLayouts(Object.assign({}, __assign({}, canonizeItems(entity[type][name]), { name: name })), "groups");
                }
                else {
                    return canonizeLayouts(Object.assign({}, __assign({}, entity[type][name], { name: name })), "groups");
                }
            });
        }
        return canonizedEntity;
    }
    else {
        return entity;
    }
};
var canonizeItems = function (entity) {
    var canonizedEntity = omit_1.default(entity, ["fields"]);
    console.log("heenya", omit_1.default(entity, ["fields"]));
    if (entity.fields) {
        if (Array.isArray(entity.fields)) {
            return entity;
        }
        else {
            canonizedEntity.fields = Object.keys(entity.fields).map(function (fieldName) {
                return Object.assign({}, __assign({}, entity.fields[fieldName], { name: fieldName }));
            });
            console.log("fields", canonizedEntity);
            return canonizedEntity;
        }
    }
    else {
        return entity;
    }
};
//# sourceMappingURL=CanonizeSchema.js.map