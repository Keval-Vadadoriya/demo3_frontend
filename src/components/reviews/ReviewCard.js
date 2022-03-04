import React from "react";
import classes from "./ReviewCard.module.css";

function ReviewCard(props) {
  return (
    <div className={classes.card}>
      <h1>{props.description}</h1>
      <h1>{props.name}</h1>
      <h1>{props.rating}</h1>
    </div>
  );
}

export default ReviewCard;
