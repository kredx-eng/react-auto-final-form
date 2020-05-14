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
exports.__esModule = true;
var omit_1 = require("lodash/omit");
exports.canonizeSchema = function (schema) {
    var canonizedSchema = {};
    Object.assign(canonizedSchema, schema);
    if (!schema.entities) {
        throw Error("Cannot find any entity passed in the provided schema");
    }
    else if (!Array.isArray(schema.entities)) {
        canonizedSchema.entities = [];
        Object.keys(schema.entities).forEach(function (entityName) {
            var canonizedEntity = canonizeFields(schema.entities[entityName]);
            canonizedSchema.entities.push(Object.assign({}, __assign({}, canonizedEntity, { name: entityName })));
        });
        return canonizedSchema;
    }
    else {
        canonizedSchema.entities = [];
        schema.entities.forEach(function (entity) {
            var canonizedEntity = canonizeFields(entity);
            canonizedSchema.entities.push(Object.assign({}, __assign({}, canonizedEntity)));
        });
        return canonizedSchema;
    }
};
var canonizeFields = function (entity) {
    var canonizedEntity = omit_1["default"](entity, ["fields"]);
    if (entity.fields) {
        if (Array.isArray(entity.fields)) {
            return entity;
        }
        else {
            canonizedEntity.fields = [];
            Object.keys(entity.fields).forEach(function (fieldName) {
                canonizedEntity.fields.push(Object.assign({}, __assign({}, entity.fields[fieldName], { name: fieldName })));
            });
            return canonizedEntity;
        }
    }
    else {
        throw Error("The provided entity doesn't contain a name");
    }
};
