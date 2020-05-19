import React from "react";
import classNames from "classnames";
import "bootstrap/dist/css/bootstrap.min.css";

export const FieldWrapper = (WrappedComponent: React.ElementType) => {
  return class extends React.PureComponent<any, any> {
    render() {
      const { size, input, meta, displayName, disabled, visible } = this.props;
      const colSize = size ? `col-md-${size}` : `col-md-12`;
      return (
        <div
          className={classNames("form-group", colSize, {
            "has-error": meta.invalid && meta.touched
          })}
          style={{ padding: 20 }}
        >
          <div className={"row"}>
            <label>{displayName}</label>
            <WrappedComponent
              {...this.props}
              className={classNames(
                "form-control",
                {
                  "is-invalid": meta.invalid && meta.touched
                },
                { disabled: disabled },
                { "hidden-md hidden-lg hidden-sm hidden-xs": visible === false }
              )}
              id={input.name}
            />
          </div>
          <span
            style={{ color: "red", paddingTop: 10 }}
            className={classNames({
              invisible: !meta.invalid && meta.touched
            })}
          >
            {meta.error}
          </span>
        </div>
      );
    }
  };
};
