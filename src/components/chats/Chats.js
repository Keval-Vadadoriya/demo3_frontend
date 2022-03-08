import React from "react";
import { useParams } from "react-router-dom";

function Chats() {
  const workerid = useParams();
  console.log(workerid);
  return (
    <div>
      <h1>{workerid.workerid}</h1>
    </div>
  );
}

export default Chats;
