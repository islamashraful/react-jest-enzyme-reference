import { shallow } from "enzyme";
import React from "react";
import HasIndex from "../HasIndex";

describe("HasIndex()", () => {
  const MockComponent = () => null;
  MockComponent.displayName = "MockComponent";
  const MockComponentWithIndex = HasIndex(MockComponent, "index");

  it("has the expected displayName", () => {
    expect(MockComponentWithIndex.displayName).toBe("HasIndex(MockComponent)");
  });

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MockComponentWithIndex />);
  });

  it("should have initial index state of 0", () => {
    expect(wrapper.state("index")).toBe(0);
  });

  it("should be able to decrement index", () => {
    wrapper.setState({ index: 3 });
    wrapper.prop("indexDecrement")();
    expect(wrapper.state("index")).toBe(2);
  });

  it("should be able to increment index", () => {
    wrapper.setState({ index: 3 });
    wrapper.prop("indexIncrement")();
    expect(wrapper.state("index")).toBe(4);
  });

  it("should set max index while decrement from 0", () => {
    wrapper.setState({ index: 0 });
    wrapper.prop("indexDecrement")(3);
    expect(wrapper.state("index")).toBe(2);
  });

  it("should set min index while increment from max", () => {
    wrapper.setState({ index: 2 });
    wrapper.prop("indexIncrement")(3);
    expect(wrapper.state("index")).toBe(0);
  });

  it("should have index:0 for uncontrolled and index:1 for controller", () => {
    expect(wrapper.state("index")).toBe(0);
    const wrapper2 = shallow(<MockComponentWithIndex defaultIndex={1} />);
    expect(wrapper2.state("index")).toBe(1);
  });

  it("always has `index` state equal to the `index` prop", () => {
    const wrapperWithInitialIndex = shallow(
      <MockComponentWithIndex index={1} />
    );
    expect(wrapperWithInitialIndex.state("index")).toBe(1);
    wrapper.setProps({ index: 2 });
    expect(wrapper.state("index")).toBe(2);
  });

  // Uncontrolled
  it("allows `index` state to change if the `index` prop is unset", () => {
    const wrapperWithInitialIndex = shallow(
      <MockComponentWithIndex index={1} />
    );
    wrapperWithInitialIndex.setProps({ index: undefined });
    wrapperWithInitialIndex.setState({ index: 3 });
    expect(wrapperWithInitialIndex.state("index")).toBe(3);
  });

  it("calls `onIndexChange` on decrement/increment", () => {
    const onIndexChange = jest.fn();
    wrapper.setProps({ index: 0, onIndexChange });
    wrapper.prop("indexDecrement")(3);
    expect(onIndexChange).toHaveBeenCalledWith({ target: { value: 2 } });
    wrapper.prop("indexIncrement")(3);
    expect(onIndexChange).toHaveBeenCalledWith({ target: { value: 1 } });
  });
});
