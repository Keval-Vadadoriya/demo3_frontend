import React from "react";
import classes from "./MyProjectCard.module.css";

function MyProjectCard(props) {
  return (
    <div className={classes.card}>
      <h1>{props.name}</h1>
      <h3>{props.profession}</h3>
      <h3>{props.location}</h3>
      <button onClick={props.onClick.bind(null, props._id)}>remove</button>
    </div>
  );
}

export default MyProjectCard;
