import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { chatActions } from "../../store/actions/chat-actions";
import { Button, Grid, TextField, Box, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

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

  useEffect(() => {
    scrollToBottom();
  }, [chats[receiverId.workerid]]);

  useEffect(async () => {
    socket.on("messag", ({ message, role, sender, receiver }) => {
      socket.emit(
        "delivered",
        message._id,
        sender,
        receiver,
        role,
        // getId() === sender ? true : false,
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
        <Box
          key={message._id}
          sx={{
            textAlign: message.owner === userId ? "right" : "left",
            backgroundColor:
              message.owner !== userId && message.status === "sent"
                ? "brown"
                : "",
          }}
        >
          <Typography variant="body" sx={{ wordBreak: "break-all" }}>
            {message.message}
            <Typography
              sx={{ fontSize: "15px", fontStyle: "italic" }}
            >{`${date.getHours()}:${date.getMinutes()}`}</Typography>
            {message.owner === userId && (
              <Typography sx={{ fontSize: "15px", fontStyle: "italic" }}>
                {message.status}
              </Typography>
            )}
          </Typography>
        </Box>
      );
    });
  }
  return (
    <Box sx={{ overflow: "auto" }}>
      <Box>
        <Typography>{chatsOwner && chatsOwner.name}</Typography>
        {messageList && messageList}
        <Box ref={messagesEndRef} />
      </Box>
      <Box component="form" onSubmit={sendMessageHandler}>
        <Grid item xs={12}>
          <TextField
            autoComplete="message"
            name="Message"
            required
            fullWidth
            id="Message"
            label="Message"
            autoFocus
            value={message}
            onChange={changeMessageHandler}
          />
        </Grid>
        <Button type="submit">
          <SendIcon fontSize="large" />
        </Button>
      </Box>
    </Box>
  );
}

export default Chats;
