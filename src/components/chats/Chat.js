import { Fragment, useEffect, useState } from "react";
// import socketIOClient from "socket.io-client";
import { Outlet, Link } from "react-router-dom";
import classes from "./Chat.module.css";
import { useSelector } from "react-redux";
import useHttp from "../../custom-hooks/useHttp";
import ChatListCard from "./ChatListCard";
// const socket = socketIOClient("http://127.0.0.1:3001");
let chatList;
const Chat = () => {
  const [data, setData] = useState(false);
  const socket = useSelector((state) => state.socket.socket);
  const [isLoading, error, sendRequest] = useHttp();
  const userId = useSelector((state) => state.user._id);
  const role = useSelector((state) => state.login.role);
  const [response, setResponse] = useState("");
  useEffect(async () => {
    chatList = await sendRequest({
      url: `http://127.0.0.1:3001/getchatlist/${userId}?role=${role}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    setData(true);
    socket.on("FromAPI", (data) => {
      setResponse(data);
      console.log(data);
    });
    console.log(chatList);
  }, []);

  console.log("chat");
  let chatListUi;
  if (data && chatList) {
    chatListUi = chatList[role === "user" ? "workers" : "users"].map(
      (worker) => (
        <Link to={`${worker._id}`} key={worker._id}>
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
          <h1>Chats {response}</h1>
          <Outlet />
        </div>
        <div className={classes.side2}>
          <h1>Chat list</h1>
          {data && chatListUi}
        </div>
      </div>
    </Fragment>
  );
};
export default Chat;
