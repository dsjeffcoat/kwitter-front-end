import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import NotFound from "./NotFound";
import MessageFeed from "./MessageFeed"

import Signup from "./Signup";
import { CssBaseline } from "@material-ui/core";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profiles/:username" component={Profile} />
          <Route exact path ="/messagefeed" component={MessageFeed} />
          <Route path="/signup" component={Signup} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
