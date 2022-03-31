import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
} from "@mui/material";

function ProjectCard({ project }) {
  return (
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
