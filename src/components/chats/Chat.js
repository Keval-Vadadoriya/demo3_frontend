import { Fragment, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import classes from "./Chat.module.css";
import { useSelector, useDispatch } from "react-redux";
import ChatListCard from "./ChatListCard";
import { chatActions } from "../../store/actions/chat-actions";
const Chat = () => {
  const userId = useSelector((state) => state.user.user._id);
  const role = useSelector((state) => state.login.role);
  const { status, chatList, errorMessage } = useSelector((state) => state.chat);
  const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("chatlist", (list) => {
      dispatch(chatActions.setChatList({ list }));
    });
    socket.emit("getchatlist", userId, role);
  }, []);

  let chatListUi;
  if (chatList) {
    chatListUi = chatList.map((worker) => (
      <Link to={`/home/chats/${worker._id}`} key={worker._id}>
        <ChatListCard name={worker.name} />
      </Link>
    ));
  }

  return (
    <Fragment>
      <div className={classes.x}>
        <div className={classes.side2}>
          <h1>Chat list</h1>
          {chatList && chatListUi}
        </div>
        <div className={classes.side1}>
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};
export default Chat;
