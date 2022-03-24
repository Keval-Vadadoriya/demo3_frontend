import React from "react";
import { Link } from "react-router-dom";
import classes from "./ProjectCard.module.css";

function ProjectCard(props) {
  return (
    <div className={classes.card}>
      <h1>{props.name}</h1>
      <h3>{props.profession}</h3>
      <h3>{props.location}</h3>
      <Link to={`/home/chats/${props.owner}`}>Chat</Link>
    </div>
  );
}

export default ProjectCard;
