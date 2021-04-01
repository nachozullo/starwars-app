import React from "react";
import { screen } from "@testing-library/react";
import Home from "../Home";
import { render } from "../../../test-utils/renderMock";

const component = () => render(<Home />);

describe("Home test suite", () => {
  it("Renders correctly", () => {
    component();

    expect(screen.getByText("List of characters")).toBeVisible();
  });
});
