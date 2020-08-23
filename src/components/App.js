import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Error404 from "./404";

import Home from "./Home";
import Launches from "./launches/Launches";
import Rockets from "./rockets/Rockets";
import Dragons from "./dragons/Dragons";

const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/launches" component={Launches} />
          <Route path="/rockets" component={Rockets} />
          <Route path="/dragons" component={Dragons} />
          <Route component={Error404} />
        </Switch>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
