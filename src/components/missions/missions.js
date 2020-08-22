import React, { useEffect, useState } from "react";
import { io } from "../../utils/io";

const Missions = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    io({
      url: "/missions",
      method: "GET",
    })
      .then(({ data }) => {
        setMissions(data);
      })
      .catch((error) => console.log(error));
  }, [missions]);

  return (
    <div>
      <pre>
        <code>{JSON.stringify(missions, null, 4)}</code>
      </pre>
    </div>
  );
};

export default Missions;
