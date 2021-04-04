import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Home from "./screens/Home/Home";
import GalacticLeague from "./screens/GalacticLeague/GalacticLeague";
import { Header } from "./components/common";
import { useLocalStorage } from "./hooks";
import { darkTheme, lightTheme } from "./theme";

function App() {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  return (
    <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Header onToggleDarkMode={() => setDarkMode(prevDarkMode => !prevDarkMode)} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/my_galactic_league" component={GalacticLeague} />
          <Route path="/404" component={() => <div>404 Not Found</div>} />
          <Redirect from="*" to="/404" />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
