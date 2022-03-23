import React from "react";
import classes from "./ProjectCard.module.css";

function ProjectCard(props) {
  return (
    <div className={classes.card}>
      <h1>{props.name}</h1>
      <h3>{props.profession}</h3>
      <h3>{props.location}</h3>
    </div>
  );
}

export default ProjectCard;
