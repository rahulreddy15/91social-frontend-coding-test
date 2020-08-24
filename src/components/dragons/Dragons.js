import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import DragonCard from "./DragonCard";

const Dragons = () => {
  const [dragons, setDragons] = useState([]);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v3/dragons")
      .then((res) => res.json())
      .then((data) => setDragons(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="component-wrapper">
      <Helmet>
        <title>SpaceX Dragons</title>
        <meta name="description" content="Information about SpaceX capsules" />
      </Helmet>

      <article>
        <header className="article-header">
          <h1>SpaceX Dragons</h1>
        </header>
        <div className="wrapper card-wrapper">
          {dragons.map((item) => (
            <DragonCard {...item} key={"capsule-" + item.id} />
          ))}
        </div>
      </article>
    </div>
  );
};

export default Dragons;
