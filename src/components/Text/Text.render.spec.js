import React from "react";
import Renderer from "react-test-renderer";
import Text from "./Text.render";

describe("Test.render", () => {
  it("Renders the passed text", () => {
    const component = Renderer.create(<Text text="Hello" />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
