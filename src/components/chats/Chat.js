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
          sx={{
            "&:hover": {
              backgroundColor: "rgb(87, 87, 87)",
              textColor: "white",
            },
          }}
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
      <Grid container>
        <Grid item xs={3}>
          <Box position="sticky" top={70}>
            <Typography variant="h4" marginLeft={1}>
              {user.name}
            </Typography>
            <List
              dense
              sx={{
                width: "100%",
                // maxWidth: 360,
                bgcolor: "background.paper",
                padding: 0,
              }}
            >
              {chatListUi && chatListUi}
            </List>
          </Box>
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
