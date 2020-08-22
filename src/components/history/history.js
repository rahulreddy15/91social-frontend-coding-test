import React, { useEffect, useState } from "react";
import { io } from "../../utils/io";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    io({
      url: "/history",
      method: "GET",
    })
      .then(({ data }) => {
        setHistory(data);
      })
      .catch((error) => console.log(error));
  }, [history]);

  return (
    <div>
      <pre>
        <code>{JSON.stringify(history, null, 4)}</code>
      </pre>
    </div>
  );
};

export default History;
