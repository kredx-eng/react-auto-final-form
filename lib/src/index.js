"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var FormBuilder_1 = require("./FormBuilder/FormBuilder");
var TextInputField_1 = __importDefault(require("./components/input/TextInputField"));
var FormButton_1 = __importDefault(require("./components/input/FormButton"));
var SelectInputField_1 = __importDefault(require("./components/input/SelectInputField"));
exports.COMPONENT_FACTORY = {
    string: TextInputField_1.default,
    button: FormButton_1.default,
    Select: SelectInputField_1.default
};
var schema = {
    entities: [
        {
            name: "EKYC",
            fields: {
                docId: {
                    type: "string",
                    size: 6
                },
                data: {
                    type: "string",
                    size: 12
                }
            },
            layouts: {
                edit: {
                    groups: {
                        defaultGroup: {
                            title: "DefaultGroup",
                            fields: {
                                docId: {
                                    name: "docId",
                                    displayName: "docId",
                                    size: 12
                                },
                                data: {
                                    name: "data",
                                    displayName: "data",
                                    size: 12
                                }
                            }
                        }
                    }
                }
            }
        }
    ]
};
react_dom_1.default.render(react_1.default.createElement(FormBuilder_1.FormBuilder, { componentFactory: exports.COMPONENT_FACTORY, bottomBar: FormButton_1.default, schema: schema, layoutName: "edit", entityName: "EKYC", formProps: {
        onSubmit: function (value) {
            console.log("value");
        }
    } }), document.getElementById("root"));
//# sourceMappingURL=index.js.map