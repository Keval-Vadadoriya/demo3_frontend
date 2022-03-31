import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";

function WorkerCard(props) {
  return (
    <>
      <Card sx={{}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200px"
            width="200px"
            maxwidth="200px"
            image={`${process.env.REACT_APP_HOST}/${props.avatar}`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
            <Typography
              variant="body2"
              color={props.availability === true ? "green" : "red"}
            >
              {props.availability === true ? "available" : "false"}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default WorkerCard;
