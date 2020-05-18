import React from "react";
import classNames from "classnames";

export const FieldWrapper = (WrappedComponent: React.ElementType) => {
  return class extends React.PureComponent<any, any> {
    render() {
      const { size, input, meta, displayName, disabled, visible } = this.props;
      return (
        <div
          className={classNames("form-group", `col${size ? `-${size}` : ""}`)}
        >
          <div className={"row"}>
            <label>{displayName}</label>
            <WrappedComponent
              {...this.props}
              className={classNames(
                "form-control",
                {
                  "is-invalid": meta.invalid
                },
                { disabled: disabled },
                { "d-none": visible === false }
              )}
              id={input.name}
            />
          </div>
          <div className={"invalid-feedback"}>{meta.error}</div>
        </div>
      );
    }
  };
};
