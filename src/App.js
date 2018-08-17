import React, { Component } from "react";
import indexRoutes from "routes/index.jsx";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

const hist = createBrowserHistory();

class App extends Component {
  render() {
    console.log(indexRoutes);
    return (
      <Router history={hist}>
        <Switch>
          {indexRoutes.map((props, key) => {
            return (
              <Route path={props.path} component={props.component} key={key} />
            );
          })}
        </Switch>
      </Router>
    );
  }
}

export default App;
