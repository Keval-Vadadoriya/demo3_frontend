import React from "react";
import { Link } from "react-router-dom";
import classes from "./ProjectCard.module.css";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Grid,
} from "@mui/material";

function ProjectCard({ project }) {
  return (
    // <div className={classes.card}>
    //   <h1>{project.project_name}</h1>
    //   <h3>{project.profession}</h3>
    //   <h3>{project.location}</h3>
    //   <Link to={`/home/chats/${project.owner}`}>Chat</Link>
    // </div>
    <Card sx={{}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {project.project_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {project.profession}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography component={Link} to={`/home/chats/${project.owner}`}>
          Chats
        </Typography>
      </CardActions>
    </Card>
  );
}

export default ProjectCard;
