import React from "react";
import classes from "./ChatListCard.module.css";

function ChatListCard(props) {
  return (
    <div className={classes.card}>
      <h1>{props.name}</h1>
      <h3>{props.profession}</h3>
    </div>
  );
}

export default ChatListCard;
