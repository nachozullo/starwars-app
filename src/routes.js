import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./screens/Home";
import GalacticLeague from "./screens/GalacticLeague";

const routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/my_galactic_league" component={GalacticLeague} />
        <Route path="/404" component={() => <div>404 Not Found</div>} />
        <Redirect from="*" to="/404" />
      </Switch>
    </Router>
  );
};

export default routes;
