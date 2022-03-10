import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../UI/Input";
import { useSelector } from "react-redux";
import useHttp from "../../custom-hooks/useHttp";

// const socket = socketIOClient("http://127.0.0.1:3001");
function Chats() {
  const workerid = useParams();
  // let message2;

  const [isLoading, error, sendRequest] = useHttp();
  const userId = useSelector((state) => state.user._id);
  const role = useSelector((state) => state.login.role);

  const socket = useSelector((state) => state.socket.socket);
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  useEffect(() => {
    socket.on("messag", (message) => {
      console.log(message);
      setMessage2(message);
    });

    sendRequest({
      url: `http://127.0.0.1:3001/addtochatlist/${userId}?role=${role}&&id=${workerid.workerid}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);
  console.log("Chatssssssss");

  const changeMessageHandler = (event) => {
    setMessage(event.target.value);
  };

  const sendMessageHandler = (event) => {
    event.preventDefault();
    console.log(workerid);
    socket.emit("message", message, workerid.workerid);
  };
  console.log(workerid);
  return (
    <div>
      <h1>{workerid.workerid}</h1>
      {message2 && <h1>{message2}</h1>}
      <form onSubmit={sendMessageHandler}>
        <Input
          input={{
            placeholder: "name",
            required: true,
            id: "Name",
            onChange: changeMessageHandler,
            type: "text",
          }}
        />
        <input type="submit" value="send"></input>
      </form>
    </div>
  );
}

export default Chats;
