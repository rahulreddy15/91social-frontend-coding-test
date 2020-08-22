import React, { useEffect, useState } from "react";
import { io } from "../utils/io";

const Payloads = () => {
  const [payloads, setPayloads] = useState();

  useEffect(() => {
    io({
      url: "/payloads",
      method: "GET",
    })
      .then(({ data }) => {
        setPayloads(data);
      })
      .catch((error) => console.log(error));
  }, [payloads]);

  return (
    <div>
      <pre>
        <code>{JSON.stringify(payloads, null, 4)}</code>
      </pre>
    </div>
  );
};

export default Payloads;
