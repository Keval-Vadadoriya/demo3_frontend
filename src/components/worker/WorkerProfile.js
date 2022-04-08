import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getWorker } from "../../store/actions/workers-action";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Avatar, Rating } from "@mui/material";
import { useTheme } from "@mui/styles";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  link: {
    margin: "5px",
    backgroundColor: theme.palette.fifth.light,
    color: "black",
    margin: 10,
    padding: 10,
    borderRadius: 5,
    width: "100px",
    textAlign: "center",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
function WorkerProfile() {
  const theme = useTheme();
  const classes = useStyles();
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
        height: "91.5vh",
        overflow: "scroll",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      {worker && (
        <Box
          sx={{
            borderRadius: "20px",
            minWidth: "300px",
            maxWidth: "350px",
            margin: "20px",
            marginTop: "200px",
            padding: "5px",
            boxShadow: `5px 5px 10px grey`,
            backgroundColor: theme.palette.third.light,
            // transition: "all 0.5s ease",
            // "&:hover": { transform: "scale(1.1)" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={`${process.env.REACT_APP_HOST}/${worker.avatar}`}
              sx={{
                minWidth: "200px",
                minHeight: "200px",
                height: "auto",
                boxShadow: `0px 0px 10px ${
                  worker.availability === false ? "rgb(247, 130, 35)" : "green"
                }`,
              }}
            />
            <Box
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
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontFamily="Roboto"
                fontSize="25px"
              >
                {worker.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontFamily="Roboto"
                fontSize="25px"
              >
                {worker.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontFamily="Roboto"
                fontSize="25px"
              >
                {worker.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontFamily="Roboto"
                fontSize="25px"
              >
                {worker.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontFamily="Roboto"
                fontSize="25px"
              >
                {worker.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontFamily="Roboto"
                fontSize="25px"
              >
                {worker.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontFamily="Roboto"
                fontSize="25px"
              >
                {worker.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontFamily="Roboto"
                fontSize="25px"
              >
                {worker.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontFamily="Roboto"
                fontSize="25px"
              >
                {worker.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontFamily="Roboto"
                fontSize="25px"
              >
                {worker.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontFamily="Roboto"
                fontSize="25px"
              >
                {worker.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontFamily="Roboto"
                fontSize="25px"
              >
                {worker.name}
              </Typography>
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
            </Box>
          </Box>
        </Box>
      )}
      <Typography
        component={Link}
        className={classes.link}
        to={`review/${workerid.workerid}`}
      >
        Reviews
      </Typography>
      <Typography
        className={classes.link}
        component={Link}
        to={`/home/chats/${workerid.workerid}`}
      >
        Chat
      </Typography>
    </Box>
  );
}

export default WorkerProfile;
