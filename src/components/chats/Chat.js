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
import { makeStyles, useTheme } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  chat: {
    position: "sticky",
    top: 70,
    height: "91.5vh",

    backgroundColor: theme.palette.primary.main,
  },
  chatList: {
    boxSizing: "border-box",
    width: "100%",
    // maxWidth: 360,
    padding: 10,
  },
  chatListItem: {
    margin: 5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: theme.palette.third.extra,
    "&:hover": {
      backgroundColor: "rgb(87, 87, 87)",
      textColor: "white",
    },
  },
  userName: {
    borderRadius: 10,
    margin: "5px",
    padding: 5,
    fontSize: 40,
    marginLeft: 1,
    position: "sticky",
    top: "65px",
    zIndex: "1",
    backgroundColor: theme.palette.third.extra,
  },
}));
const Chat = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const userId = useSelector((state) => state.user.user._id);
  const user = useSelector((state) => state.user.user);
  const role = useSelector((state) => state.login.role);
  const { chatList } = useSelector((state) => state.chat);
  const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.snackbar.page);

  useEffect(() => {
    socket.removeAllListeners("chatlist");
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
  }, []);
  useEffect(() => {
    if (userId && role) {
      socket.emit("getchatlist", userId, role);
    }
  }, [userId, role]);

  let chatListUi;
  if (chatList.length !== 0) {
    chatListUi = chatList.map((worker) => {
      return (
        <ListItem
          key={worker._id}
          component={NavLink}
          to={`/home/chats/${worker.user._id}`}
          className={classes.chatListItem}
          style={({ isActive }) =>
            isActive ? { backgroundColor: theme.palette.third.dark } : {}
          }
        >
          <ListItemAvatar>
            <Avatar
              src={`${process.env.REACT_APP_HOST}/${worker.user.avatar}`}
            />
          </ListItemAvatar>
          <ListItemText
            id={worker.user._id}
            primary={`${worker.user.name}`}
            sx={{ color: "black", fontFamily: "Arvo" }}
          />
          {worker.count !== 0 && (
            <ListItemText id={worker.user._id}>
              <Typography
                variant="body2"
                sx={{ color: "green", fontSize: "20px" }}
              >
                {worker.count}
              </Typography>
            </ListItemText>
          )}
        </ListItem>
      );
    });
  }

  return (
    <Fragment>
      <Grid container sx={{ height: { xs: "91vh", md: "91.5vh" } }}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: { xs: page ? "auto" : "none", md: "block" },
            // visibility:{ xs: page ? "visible" : "hidden", md: "visible" } ,
          }}
        >
          <Box className={classes.chat}>
            <Box className={classes.userName}>{user.name}</Box>
            <List dense className={classes.chatList}>
              {chatListUi && chatListUi}
            </List>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          sx={{ backgroundColor: theme.palette.third.extra }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default Chat;
