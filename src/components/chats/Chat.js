import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import classes from "./Chat.module.css";

const Chat = () => {
  return (
    <Fragment>
      <div className={classes.x}>
        <div className={classes.side1}>
          <h1>Chats</h1>
          <Outlet />
        </div>
        <div className={classes.side2}>
          <h1>Chat list</h1>
        </div>
      </div>
    </Fragment>
  );
};
export default Chat;
