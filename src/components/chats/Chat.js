import { Fragment, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import { chatActions } from "../../store/actions/chat-actions";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  chat: {
    position: "sticky",
    top: 70,
    height: "100%",
    backgroundColor: "rgb(206, 255, 218)",
  },
  chatList: {
    boxSizing: "border-box",
    width: "100%",
    // maxWidth: 360,
    padding: 10,
  },
  chatListItem: {
    margin: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "rgb(195, 199, 196)",
    "&:hover": {
      backgroundColor: "rgb(87, 87, 87)",
      textColor: "white",
    },
  },
  userName: {
    borderRadius: 10,
    padding: 5,
    fontSize: 40,
    marginLeft: 1,
    position: "sticky",
    top: "65px",
    zIndex: "1",
    backgroundColor: "rgb(150,150,150)",
  },
});
const Chat = () => {
  const classes = useStyles();
  const userId = useSelector((state) => state.user.user._id);
  const user = useSelector((state) => state.user.user);
  const role = useSelector((state) => state.login.role);
  const { chatList } = useSelector((state) => state.chat);
  const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.snackbar.page);

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
    return () => {
      socket.removeAllListeners("chatlist");
    };
  });
  useEffect(() => {
    if (userId && role) {
      socket.emit("getchatlist", userId, role);
    }
  }, [userId, role]);

  let chatListUi;
  if (chatList) {
    chatListUi = chatList.map((worker) => {
      return (
        <ListItem
          key={worker._id}
          component={NavLink}
          to={`/home/chats/${worker.user._id}`}
          className={classes.chatListItem}
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#808080" } : {}
          }
        >
          <ListItemAvatar>
            <Avatar
              src={`${process.env.REACT_APP_HOST}/${worker.user.avatar}`}
            />
          </ListItemAvatar>
          <ListItemText id={worker.user._id} primary={`${worker.user.name}`} />
          <ListItemText id={worker.user._id} primary={`${worker.count}`} />
        </ListItem>
      );
    });
  }

  return (
    <Fragment>
      <Grid container sx={{ height: "92vh" }}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            visibility: { xs: page ? "visible" : "hidden", md: "visible" },
          }}
        >
          <Box className={classes.chat}>
            <Box className={classes.userName}>{user.name}</Box>
            <List dense className={classes.chatList}>
              {chatListUi && chatListUi}
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Outlet />
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default Chat;
