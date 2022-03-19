import { Fragment, useEffect } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import classes from "./Chat.module.css";
import { useSelector, useDispatch } from "react-redux";
import ChatListCard from "./ChatListCard";
import { getChatList } from "../../store/actions/chat-actions";
import { chatActions } from "../../store/actions/chat-actions";
const Chat = () => {
  const userId = useSelector((state) => state.user._id);
  const role = useSelector((state) => state.login.role);
  const { status, chatList, errorMessage } = useSelector((state) => state.chat);
  const socket = useSelector((state) => state.socket.socket);
  const workerId = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("chatlist", (list) => {
      console.log(list, "second");
      dispatch(chatActions.setChatList({ list }));
    });
    socket.emit("getchatlist", userId, role);
  }, []);
  // useEffect(async () => {
  //   dispatch(getChatList({ userId, role }));
  // }, [workerId.workerid]);

  let chatListUi;
  if (chatList) {
    chatListUi = chatList.map((worker) => (
      <Link to={`/home/chats/${worker._id}`} key={worker._id}>
        <ChatListCard name={worker.name} />
      </Link>
    ));
    // chatListUi.reverse();
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
