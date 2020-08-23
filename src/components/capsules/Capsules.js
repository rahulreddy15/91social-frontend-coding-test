import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import CapsuleCard from "./CapsuleCard";

const Capsules = () => {
  const [capsules, setCapsules] = useState([]);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v2/capsules")
      .then((res) => res.json())
      .then((data) => setCapsules(data))
      .catch((err) => console.error(err));
  }, [capsules]);

  return (
    <div className="component-wrapper">
      <Helmet>
        <title>SpaceX Capsules</title>
        <meta name="description" content="Information about SpaceX capsules" />
      </Helmet>

      <article>
        <header className="article-header">
          <h1>SpaceX Capsules</h1>
        </header>
        <div className="wrapper card-wrapper">
          {capsules.map((item) => (
            <CapsuleCard {...item} key={"capsule-" + item.id} />
          ))}
        </div>
      </article>
    </div>
  );
};

export default Capsules;
