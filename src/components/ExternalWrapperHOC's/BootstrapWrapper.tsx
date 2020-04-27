import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export const BootstrapWrapper = (WrappedComponent: React.ComponentType) => {
  return class extends React.Component<any, any> {
    render(): React.ReactNode {
      return <WrappedComponent {...this.props} />;
    }
  };
};
