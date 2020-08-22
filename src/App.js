import React, { Suspense, lazy } from "react";
const Missions = lazy(() => import("./components/missions/missions"));
const History = lazy(() => import("./components/history/history"));
const Payloads = lazy(() => import("./components/payloads"));

function App() {
  return (
    <div className="App">
      <h1>Missions</h1>
      <Suspense fallback={<div>Loading......</div>}>
        <Missions />
      </Suspense>
      <h1>History</h1>
      <Suspense fallback={<div>Loading......</div>}>
        <History />
      </Suspense>
      <h1>Payloads</h1>
      <Suspense fallback={<div>Loading......</div>}>
        <Payloads />
      </Suspense>
    </div>
  );
}

export default App;
