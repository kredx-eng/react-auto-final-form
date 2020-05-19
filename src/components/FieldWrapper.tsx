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
          style={{ paddingBottom: 10, paddingTop: 10 }}
        >
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
          <div
            style={{ color: "red" }}
            className={classNames(
              "help-block",
              {
                invisible: !meta.touched && !meta.active
              },
              { visible: meta.invalid && (meta.touched || meta.active) }
            )}
          >
            {meta.error}
          </div>
        </div>
      );
    }
  };
};
