import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../UI/Input";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Chats.module.css";

import { chatActions } from "../../store/actions/chat-actions";

function Chats() {
  const receiverId = useParams();
  let messageList;
  const messagesEndRef = useRef();
  const userId = useSelector((state) => state.user.user._id);
  const role = useSelector((state) => state.login.role);
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const [message, setMessage] = useState("");
  const { chats, chatsOwner } = useSelector((state) => state.chat);

  //scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const idss = receiverId.workerid;
  console.log("idss", idss);
  console.log(receiverId.workerid);
  useEffect(() => {
    scrollToBottom();
  }, [chats[receiverId.workerid]]);

  useEffect(async () => {
    // const delivered = ({ message, role, sender, receiver }) => {
    //   socket.emit(
    //     "delivered",
    //     message._id,
    //     sender,
    //     receiver,
    //     role,
    //     (response) => {
    //       dispatch(chatActions.setChatList({ list: response.chatList }));
    //     }
    //   );
    // };
    socket.on("messag", ({ message, role, sender, receiver }) => {
      // delivered({ message, role, sender, receiver });

      console.log("ff", idss === sender, idss, sender);
      socket.emit(
        "delivered",
        message._id,
        sender,
        receiver,
        role,
        idss === sender ? true : false,
        (response) => {
          dispatch(chatActions.setChatList({ list: response.chatList }));
        }
      );
      dispatch(
        chatActions.setChat({ message, receiverId: receiverId.workerid })
      );
    });
    socket.on("messageDelivered", (_id) => {
      dispatch(
        chatActions.setStatus({
          status: "delivered",
          _id,
          receiverId: receiverId.workerid,
        })
      );
    });
  }, []);
  useEffect(async () => {
    if (userId && role) {
      socket.emit("getchats", userId, role, receiverId.workerid, (response) => {
        dispatch(
          chatActions.setChats({
            chats: response.chats,
            role,
            receiverId: receiverId.workerid,
          })
        );
        dispatch(chatActions.setChatList({ list: response.chatList }));
      });
      socket.emit("addToChatList", userId, role, receiverId.workerid);
    }
  }, [receiverId.workerid, userId, role]);

  const changeMessageHandler = (event) => {
    setMessage(event.target.value);
  };
  const sendMessageHandler = async (event) => {
    event.preventDefault();
    setMessage("");
    let createMessage = {
      message,
      time: new Date().getTime(),
      owner: userId,
      role: role === "user" ? "User" : "Worker",
      status: "pending",
    };

    socket.emit(
      "message",
      {
        message: createMessage,
        sender: userId,
        receiver: receiverId.workerid,
        role,
      },
      (response) => {
        dispatch(
          chatActions.setChat({
            message: response.message,
            receiverId: receiverId.workerid,
          })
        );
        dispatch(chatActions.setChatList({ list: response.chatlist }));
      }
    );
  };
  if (chats[receiverId.workerid]) {
    messageList = chats[receiverId.workerid].map((message) => {
      const date = new Date(message.time);
      return (
        <div
          key={message._id}
          className={`${
            message.owner === userId ? classes.sender : classes.receiver
          } ${
            message.owner !== userId && message.status === "sent"
              ? classes.sent
              : ""
          }`}
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
            value: `${message}`,
          }}
        />
        <input type="submit" value="send"></input>
      </form>
    </div>
  );
}

export default Chats;
