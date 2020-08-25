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
      <div className="App Fade">
        <Header />
        <Suspense fallback={<div>Loading ...</div>}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/launches" component={LaunchesHooks} />
            <Route path="/rockets" component={Rockets} />
            <Route path="/dragons" component={Dragons} />
            <Route component={Error404} />
          </Switch>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
