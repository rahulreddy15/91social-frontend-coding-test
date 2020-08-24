import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Error404 from "./404";

const Home = lazy(() => import("./Home"));
const LaunchesHooks = lazy(() => import("./launches/LaunchesHooks"));
const Rockets = lazy(() => import("./rockets/Rockets"));
const Dragons = lazy(() => import("./dragons/Dragons"));

const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment className="App Fade">
        <Header />
        <Suspense fallback={<React.Fragment />}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/launches" component={LaunchesHooks} />
            <Route path="/rockets" component={Rockets} />
            <Route path="/dragons" component={Dragons} />
            <Route component={Error404} />
          </Switch>
        </Suspense>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
