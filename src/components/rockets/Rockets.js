import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import RocketCard from "./RocketCard";

const Rockets = () => {
  const [rockets, setRockets] = useState([]);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v2/rockets")
      .then((res) => res.json())
      .then((data) => setRockets(data))
      .catch((err) => console.error(err));
  }, [rockets]);

  return (
    <div className="component-wrapper">
      <Helmet>
        <title>SpaceX Rockets</title>
        <meta
          name="description"
          content="Information about past SpaceX rockets"
        />
      </Helmet>

      <article>
        <header className="article-header">
          <h1>SpaceX Rockets</h1>
        </header>
        <div className="wrapper card-wrapper">
          {rockets.map((item) => (
            <RocketCard {...item} key={"rocket-" + item.rocketid} />
          ))}
        </div>
      </article>
    </div>
  );
};

export default Rockets;
