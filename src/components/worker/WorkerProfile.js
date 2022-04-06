import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getWorker } from "../../store/actions/workers-action";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Typography,
  CardActionArea,
  Avatar,
  CardContent,
  Rating,
} from "@mui/material";
function WorkerProfile() {
  const dispatch = useDispatch();
  const { status, worker, errorMessage } = useSelector(
    (state) => state.workerslist
  );
  const token = useSelector((state) => state.login.token);

  const workerid = useParams();
  useEffect(async () => {
    dispatch(getWorker({ token, workerId: workerid.workerid }));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {worker && (
        <Card
          sx={{
            minWidth: "410px",
            minHeight: "410px",
            borderRadius: "20px",
            margin: "15px",
            padding: "5px",
            boxShadow: `5px 5px 10px grey`,
            // transition: "all 0.5s ease",
            // "&:hover": { transform: "scale(1.1)" },
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
              src={`${process.env.REACT_APP_HOST}/${worker.avatar}`}
              sx={{
                minWidth: "250px",
                minHeight: "250px",
                boxShadow: `0px 0px 10px ${
                  worker.availability === false ? "rgb(247, 130, 35)" : "green"
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
                {worker.name}
              </Typography>
              <Rating value={worker.review} readOnly />

              <Typography
                variant="body2"
                color="text.secondary"
                fontFamily="Roboto"
                fontSize="20px"
              >
                {worker.profession}
              </Typography>
              <Typography
                variant="body2"
                fontFamily="Roboto"
                fontSize="20px"
                color={worker.availability === true ? "green" : "red"}
              >
                {worker.availability === true ? "Available" : "Not Available"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontFamily="Roboto"
                fontSize="20px"
              >
                {worker.location}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                fontFamily="Roboto"
                fontSize="20px"
              >
                {worker.contact}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontFamily="Roboto"
                fontSize="20px"
              >
                {worker.email}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontFamily="Roboto"
                fontSize="20px"
              >
                {worker.age}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontFamily="Roboto"
                fontSize="20px"
              >
                {worker.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
      <Typography component={Link} to={`review/${workerid.workerid}`}>
        Reviews
      </Typography>
      <Typography component={Link} to={`/home/chats/${workerid.workerid}`}>
        Chat
      </Typography>
    </Box>
  );
}

export default WorkerProfile;
