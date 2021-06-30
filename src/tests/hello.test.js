import React from "react";

describe("JSX", () => {
  it("calls React.createElement", () => {
    const createElementSpy = jest.spyOn(React, "createElement"); // 1
    <h1>Hello, JSX!</h1>;
    expect(createElementSpy).toHaveBeenCalledWith("h1", null, "Hello, JSX!"); // 2
  });
});
