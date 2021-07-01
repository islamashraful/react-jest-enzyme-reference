import React from "react";

export default (Component, indexPropName) =>
  class ComponentWithIndex extends React.PureComponent {
    static displayName = `HasIndex(${Component.displayName || Component.name})`;

    state = {
      index: 0,
    };

    handleIncrement = (upperBound) => {
      this.setState(({ index }) => {
        const newIndex = upperBound ? (index + 1) % upperBound : index + 1;
        return { index: newIndex };
      });
    };

    handleDecrement = (upperBound) => {
      this.setState(({ index }) => {
        const newIndex = upperBound
          ? (index + upperBound - 1) % upperBound
          : index - 1;
        return { index: newIndex };
      });
    };

    render() {
      const indexProps = {
        [indexPropName]: this.state.index,
        [`${indexPropName}Decrement`]: this.handleDecrement,
        [`${indexPropName}Increment`]: this.handleIncrement,
      };
      return <Component {...this.props} {...indexProps} />;
    }
  };
