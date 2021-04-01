import React from "react";
import { render as testingRender } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "../App";

const render = (ui, renderOptions) => {
  const Wrapper = ({ children }) => (
    <Router>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </Router>
  );

  return {
    ...testingRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
};

export { render };
