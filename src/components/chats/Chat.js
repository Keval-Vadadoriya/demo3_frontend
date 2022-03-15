import { Fragment, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import classes from "./Chat.module.css";
import { useSelector, useDispatch } from "react-redux";
import ChatListCard from "./ChatListCard";
import { getChatList } from "../../store/actions/chat-actions";
const Chat = () => {
  const userId = useSelector((state) => state.user._id);
  const role = useSelector((state) => state.login.role);
  const { status, chatList, errorMessage } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(getChatList({ userId, role }));
  }, []);

  console.log("chat");
  let chatListUi;
  if (chatList) {
    chatListUi = chatList[role === "user" ? "workers" : "users"].map(
      (worker) => (
        <Link to={`/home/chats/${worker._id}`} key={worker._id}>
          <ChatListCard name={worker.name} />
        </Link>
      )
    );
    chatListUi.reverse();
  }

  return (
    <Fragment>
      <div className={classes.x}>
        <div className={classes.side1}>
          <Outlet />
        </div>
        <div className={classes.side2}>
          <h1>Chat list</h1>
          {chatList && chatListUi}
        </div>
      </div>
    </Fragment>
  );
};
export default Chat;
