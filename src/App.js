import { MuiThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
import Routes from "./routes";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#DBA90C",
      contrastText: "#2e2e2e",
    },
    state: {
      success: "#1B9F20",
      failure: "#FF0000",
    },
    text: {
      primary: "#2e2e2e",
      secondary: "grey",
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['"Roboto"', "sans-serif"].join(","),
    useNextVariants: true,
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </MuiThemeProvider>
  );
}

export default App;
