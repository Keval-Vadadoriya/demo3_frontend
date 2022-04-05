import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { chatActions } from "../../store/actions/chat-actions";
import {
  Button,
  Grid,
  TextField,
  Box,
  Typography,
  Avatar,
  Container,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { socketActions } from "../../store/socket-slice";
import { makeStyles } from "@mui/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { snackbarActions } from "../../store/snackbar-slice";

const useStyles = makeStyles({
  chatOwner: {
    backgroundColor: "grey",
    color: "white",
    fontSize: 20,
    padding: 5,
    borderRadius: 10,
    position: "-webkit-sticky",
    position: "sticky",
    top: 0,
  },
  sendMessage: {
    // position: "fixed",
    position: "-webkit-sticky",
    position: "sticky",
    margin: 10,
    top: "calc(100vh-20px)",
    bottom: 0,
    backgroundColor: "white",
  },
  chats: {
    top: 0,
    height: "90vh",
    overflowY: "scroll",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 10,
    // margin: "5px",
    "&::-webkit-scrollbar": {
      // width: "5px",
      display: "none",
    },
    // "&::-webkit-scrollbar-track": {
    //   boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    //   webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    // },
    // "&::-webkit-scrollbar-thumb": {
    //   backgroundColor: "rgba(0,0,0,.1)",
    //   outline: "1px solid slategrey",
    // },
  },
  chatList: {
    backgroundColor: "rgb(200,200,200)",
    // marginTop: 5,
    // marginBottom: 10,
    overflow: "hidden",
  },
  message: {
    margin: 10,
    padding: 7,
    borderRadius: 15,
  },
});

function Chats() {
  const navigate = useNavigate();
  const classes = useStyles();
  const receiverId = useParams();
  let messageList;
  const messagesEndRef = useRef();
  const userId = useSelector((state) => state.user.user._id);
  const role = useSelector((state) => state.login.role);
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const [message, setMessage] = useState("");
  const { chats, chatsOwner } = useSelector((state) => state.chat);
  const data = useSelector((state) => state.socket.data);

  //scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats[receiverId.workerid]]);

  useEffect(() => {
    if (data) {
      socket.emit(
        "delivered",
        data.message._id,
        data.sender,
        data.receiver,
        data.role,
        receiverId.workerid === data.sender ? true : false,
        (response) => {
          dispatch(chatActions.setChatList({ list: response.chatList }));
        }
      );
    }
  }, [data]);

  useEffect(async () => {
    socket.removeAllListeners();

    socket.on("message", (data) => {
      dispatch(socketActions.setData({ data }));
      dispatch(
        chatActions.setChat({
          message: data.message,
          receiverId: data.sender,
        })
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
    dispatch(snackbarActions.setPage({ page: false }));
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
          className={classes.message}
          sx={{
            textAlign: message.owner === userId ? "right" : "left",
            backgroundColor:
              message.owner !== userId && message.status === "sent"
                ? "rgb(218, 255, 227)"
                : "white",
          }}
        >
          <Typography variant="h5" sx={{ wordBreak: "break-word" }}>
            {message.message}
            <Typography
              sx={{ fontSize: "15px", fontStyle: "italic" }}
            >{`${date.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}${
              message.owner === userId ? ` ${message.status}` : ""
            }`}</Typography>
          </Typography>
        </Box>
      );
    });
  }
  return (
    <Box className={classes.chats}>
      <Container>
        <Grid container>
          <Grid item xs={12} className={classes.chatOwner}>
            <Button
              onClick={() => {
                dispatch(snackbarActions.setPage({ page: true }));
                // socket.removeAllListeners();
                navigate(-1);
              }}
            >
              <ArrowBackIosIcon />
              <Avatar
                src={`${process.env.REACT_APP_HOST}/${chatsOwner.avatar}`}
                sx={{ marginLeft: 1 }}
              />
            </Button>
            <Typography sx={{ display: "inline", marginLeft: 3, fontSize: 25 }}>
              {chatsOwner && chatsOwner.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.chatList}>{messageList && messageList}</Box>
            <Box ref={messagesEndRef} />
          </Grid>

          <Grid
            item
            xs={12}
            component="form"
            onSubmit={sendMessageHandler}
            className={classes.sendMessage}
          >
            <Grid container>
              <Grid item xs={10} md={11}>
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
              <Grid item xs={1}>
                <Button type="submit">
                  <SendIcon fontSize="large" />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Chats;
