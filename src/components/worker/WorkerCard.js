import React from "react";
import classes from "./WorkerCard.module.css";

function WorkerCard(props) {
  return (
    <div className={classes.card}>
      <h1>{props.name}</h1>
      <h3>{props.profession}</h3>
    </div>
  );
}

export default WorkerCard;
