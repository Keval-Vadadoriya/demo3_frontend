import { Fragment, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import classes from "./Chat.module.css";
import { useSelector, useDispatch } from "react-redux";
import ChatListCard from "./ChatListCard";
import { Grid } from "@mui/material";
import { chatActions } from "../../store/actions/chat-actions";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
const Chat = () => {
  const userId = useSelector((state) => state.user.user._id);
  const user = useSelector((state) => state.user.user);
  const role = useSelector((state) => state.login.role);
  const { chatList } = useSelector((state) => state.chat);
  const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("chatlist", (list, chats) => {
      dispatch(chatActions.setChatList({ list }));
      if (chats) {
        dispatch(
          chatActions.setChats({
            chats,
            role,
            receiverId: chats[role === "user" ? "worker" : "user"]._id,
          })
        );
      }
    });
    socket.emit("getchatlist", userId, role);
  }, []);

  let chatListUi;
  if (chatList) {
    chatListUi = chatList.map((worker) => {
      console.log(worker);
      return (
        <Link
          to={`/home/chats/${worker._id}`}
          key={worker._id}
          className={classes.link}
        >
          <ListItem className={classes.hover}>
            <ListItemAvatar>
              <Avatar src={`http://127.0.0.1:3001/${worker.avatar}`} />
            </ListItemAvatar>
            <ListItemText id={worker._id} primary={`${worker.name}`} />
          </ListItem>
        </Link>
      );
    });
  }

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={3}>
          <div>
            <h1>{user.name}</h1>
            <List
              dense
              sx={{
                width: "100%",
                // maxWidth: 360,
                bgcolor: "background.paper",
                padding: 0,
              }}
            >
              {chatList && chatListUi}
            </List>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div>
            <div>
              <Outlet />
            </div>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default Chat;
