import React from "react";
import ReactDOM from "react-dom";
import { FormBuilder } from "./FormBuilder/FormBuilder";
import TextInputField from "./components/input/TextInputField";
import Button from "./components/input/FormButton";
import SelectInputField from "./components/input/SelectInputField";

export const COMPONENT_FACTORY = {
  string: TextInputField,
  button: Button,
  Select: SelectInputField
};

const schema = {
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

ReactDOM.render(
  <FormBuilder
    componentFactory={COMPONENT_FACTORY}
    bottomBar={Button}
    schema={schema}
    layoutName={"edit"}
    entityName={"EKYC"}
    formProps={{
      onSubmit: (value: any) => {
        console.log("value");
      }
    }}
  />,
  document.getElementById("root")
);
