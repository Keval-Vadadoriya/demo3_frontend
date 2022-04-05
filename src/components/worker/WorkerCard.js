import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Avatar,
  Rating,
} from "@mui/material";
import { Scale } from "@mui/icons-material";

function WorkerCard(props) {
  return (
    <Card
      sx={{
        maxWidth: "410px",
        maxHeight: "410px",
        borderRadius: "20px",
        margin: "15px",
        padding: "5px",
        boxShadow: `5px 5px 10px grey`,
        transition: "all 0.5s ease",
        "&:hover": { transform: "scale(1.1)" },
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={`${process.env.REACT_APP_HOST}/${props.avatar}`}
          sx={{
            minWidth: "250px",
            minHeight: "250px",
            boxShadow: `0px 0px 10px ${
              props.availability === false ? "rgb(247, 130, 35)" : "green"
            }`,
          }}
        />
        <CardContent
          sx={{
            alignSelf: "flex-start",
            marginTop: "20px",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            fontFamily="Roboto"
            fontSize="25px"
          >
            {props.name}
          </Typography>
          <Rating value={props.review} readOnly />

          <Typography
            variant="body2"
            color="text.secondary"
            fontFamily="Roboto"
            fontSize="20px"
          >
            {props.profession}
          </Typography>
          <Typography
            variant="body2"
            fontFamily="Roboto"
            fontSize="20px"
            color={props.availability === true ? "green" : "red"}
          >
            {props.availability === true ? "Available" : "Not Available"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default WorkerCard;
