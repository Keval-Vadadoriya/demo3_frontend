import React from "react";
import classes from "./WorkerCard.module.css";
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

function WorkerCard(props) {
  return (
    <>
      {/* <Grid item xs={4}> */}
      <Card sx={{}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200px"
            width="200px"
            maxwidth="200px"
            image={`http://127.0.0.1:3001/${props.avatar}`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
      {/* </Grid> */}
    </>
  );
}

export default WorkerCard;
