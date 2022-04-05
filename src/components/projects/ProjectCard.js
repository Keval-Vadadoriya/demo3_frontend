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
    <Card sx={{ margin: "5px", border: "1px dashed black" }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {project.project_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Requirement :- {project.profession}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location :- {project.location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            description :- {project.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            money :- {project.money}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography component={Link} to={`/home/chats/${project.owner}`}>
          Chat
        </Typography>
      </CardActions>
    </Card>
  );
}

export default ProjectCard;
