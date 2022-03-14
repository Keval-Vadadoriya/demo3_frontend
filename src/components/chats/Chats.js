import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../UI/Input";
import { useSelector } from "react-redux";
import useHttp from "../../custom-hooks/useHttp";
import classes from "./Chats.module.css";

function Chats() {
  const receiverId = useParams();
  let chats, messageList;
  const messagesEndRef = useRef();
  const [isLoading, error, sendRequest] = useHttp();
  const userId = useSelector((state) => state.user._id);
  const role = useSelector((state) => state.login.role);

  const socket = useSelector((state) => state.socket.socket);
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState([]);

  //scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [message2]);
  useEffect(async () => {
    socket.on("messag", (message) => {
      console.log(message);
      socket.emit("delivered");
      console.log("hey");
      setMessage2((x) => [...x, message]);
    });

    //add to chat list
    console.log(receiverId.workerid);
    if (role === "user") {
      sendRequest({
        url: `http://127.0.0.1:3001/addtochatlist/${userId}?role=${role}&&id=${receiverId.workerid}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }, []);
  useEffect(async () => {
    chats = await sendRequest({
      url: `http://127.0.0.1:3001/getchats/${userId}?role=${role}&&id=${receiverId.workerid}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (chats) {
      setMessage2((x) => [...chats]);
    }
    console.log(chats);
  }, [receiverId.workerid]);
  console.log("Chatssssssss");

  const changeMessageHandler = (event) => {
    setMessage(event.target.value);
  };

  const sendMessageHandler = async (event) => {
    event.preventDefault();
    const createMessage = {
      message,
      time: new Date().getTime(),
      owner: userId,
      role: role === "user" ? "User" : "Worker",
    };
    socket.emit(
      "message",
      createMessage,
      userId,
      receiverId.workerid,
      role,
      (response) => {
        console.log(response.status);
      }
    );

    setMessage2((x) => [...x, createMessage]);

    console.log(chats);
  };
  if (message2) {
    messageList = message2.map((message) => {
      const date = new Date(message.time);
      console.log(date);
      return (
        <div
          key={message._id}
          className={
            message.owner === userId ? classes.sender : classes.receiver
          }
        >
          <p className={classes.p}>
            {message.message}
            <span
              className={classes.time}
            >{`${date.getHours()}:${date.getMinutes()}`}</span>
          </p>
        </div>
      );
    });
  }
  return (
    <div className={classes.chat}>
      <div>
        <h1>{receiverId.workerid}</h1>
        {messageList && <h1>{messageList}</h1>}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessageHandler} className={classes.form}>
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
