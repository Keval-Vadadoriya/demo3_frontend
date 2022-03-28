import React from "react";
import classes from "./MyProjectCard.module.css";

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

function MyProjectCard({ project, onClick }) {
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
        <Button onClick={onClick.bind(null, project._id)}>Remove</Button>
      </CardActions>
    </Card>
  );
}

export default MyProjectCard;
