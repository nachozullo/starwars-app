import { createMuiTheme } from "@material-ui/core";

const THEME_TYPOGRAPHY = {
  typography: {
    fontFamily: ['"Roboto"', "sans-serif"].join(","),
    useNextVariants: true,
  },
};

const THEME_PRIMARY = {
  primary: {
    main: "#DBA90C",
    contrastText: "#2E2E2E",
  },
};

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    ...THEME_PRIMARY,
    text: {
      primary: "#2e2e2e",
      secondary: "grey",
    },
    background: {
      default: "#EDEDED",
    },
  },
  ...THEME_TYPOGRAPHY,
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    ...THEME_PRIMARY,
    text: {
      primary: "#FDFDFD",
      secondary: "#B7B7B7",
    },
    background: {
      default: "#212121",
    },
  },
  ...THEME_TYPOGRAPHY,
});
