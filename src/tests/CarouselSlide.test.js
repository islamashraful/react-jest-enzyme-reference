import React from "react";
import { shallow } from "enzyme";
import CarouselSlide from "../CarouselSlide";

describe("CarouselSlide", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CarouselSlide
        imgUrl="https://example.com/default.jpg"
        description="Default test image"
      />
    );
  });

  it("renders a <figure>", () => {
    expect(wrapper.type()).toBe("figure");
  });

  it("renders an <img> and a <figcaption> as children", () => {
    expect(wrapper.childAt(0).type()).toBe("img");
    expect(wrapper.childAt(1).type()).toBe("figcaption");
  });

  it("passes `imgUrl` through to the <img>", () => {
    const imgUrl = "https://example.com/image.png";

    wrapper.setProps({ imgUrl });

    const img = wrapper.find("img");
    expect(img.prop("src")).toBe(imgUrl);
  });

  it("uses `description` and `attribution` as the <figcaption>", () => {
    const description = "This is a sample description";
    const attribution = "Sample Attribution";

    wrapper.setProps({ description, attribution });

    expect(wrapper.find("figcaption").text()).toBe(
      `${description} ${attribution}`
    );
    expect(wrapper.find("figcaption strong").text()).toBe(description);
  });

  it("passes other props through to the <figure>", () => {
    const style = {};
    const onclick = () => {};
    const className = "sample-className";

    wrapper.setProps({ style, onclick, className });

    expect(wrapper.prop("style")).toBe(style);
    expect(wrapper.prop("onclick")).toBe(onclick);
    expect(wrapper.prop("className")).toBe(className);
  });
});
