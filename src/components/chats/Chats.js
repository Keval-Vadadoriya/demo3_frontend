import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../UI/Input";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Chats.module.css";
import {
  getChats,
  addToChatList,
  getChatList,
} from "../../store/actions/chat-actions";
import { chatActions } from "../../store/actions/chat-actions";

function Chats() {
  const receiverId = useParams();
  let messageList;
  const messagesEndRef = useRef();
  const userId = useSelector((state) => state.user._id);
  const role = useSelector((state) => state.login.role);
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const [message, setMessage] = useState("");
  const { status, chats, chatsOwner, errorMessage } = useSelector(
    (state) => state.chat
  );

  //scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chats]);
  useEffect(async () => {
    socket.on("messag", (message) => {
      socket.emit("delivered", message._id, userId, receiverId.workerid, role);
      dispatch(chatActions.setChat({ message }));
    });
    socket.on("messageDelivered", (_id) => {
      dispatch(chatActions.setStatus({ status: "delivered", _id }));
    });

    //add to chat list
    // console.log(receiverId.workerid);
    // if (role === "user") {
    //   dispatch(
    //     addToChatList({ userId, role, receiverId: receiverId.workerid })
    //   );
    // }
  }, []);
  useEffect(async () => {
    // dispatch(getChats({ userId, role, receiverId: receiverId.workerid }));

    socket.emit("getchats", userId, role, receiverId.workerid, (response) => {
      dispatch(chatActions.setChats({ chats: response.chats, role }));
    });
    if (role === "user") {
      console.log("first");
      // dispatch(
      //   addToChatList({ userId, role, receiverId: receiverId.workerid })
      // );
      socket.emit("addToChatList", userId, role, receiverId.workerid);
    }
  }, [receiverId.workerid]);
  console.log("Chatssssssss");

  const changeMessageHandler = (event) => {
    setMessage(event.target.value);
  };
  const sendMessageHandler = async (event) => {
    event.preventDefault();
    let createMessage = {
      message,
      time: new Date().getTime(),
      owner: userId,
      role: role === "user" ? "User" : "Worker",
      status: "pending",
    };

    socket.emit(
      "message",
      createMessage,
      userId,
      receiverId.workerid,
      role,
      (response) => {
        dispatch(chatActions.setChat({ message: response.message }));
        dispatch(chatActions.setChatList({ list: response.chatlist }));
      }
    );
    //dispatch(chatActions.setChat({ message: createMessage }));
  };
  if (chats) {
    messageList = chats.map((message) => {
      const date = new Date(message.time);
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
            {message.owner === userId && (
              <span className={classes.time}>{message.status}</span>
            )}
          </p>
        </div>
      );
    });
  }
  return (
    <div className={classes.chat}>
      <div>
        <h1>{chatsOwner && chatsOwner.name}</h1>
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
