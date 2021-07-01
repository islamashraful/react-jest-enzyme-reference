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
});
