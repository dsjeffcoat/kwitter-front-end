import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import NotFound from "./NotFound";
import MessageCard from "./components/MessageCard";


class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profiles/:username" component={Profile} />
        {/* <Route path="/" component={MessageFeed} /> */}
        <Route exact path="/profiles/:username" component={MessageCard} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default App;
