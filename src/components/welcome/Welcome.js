import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/login-slice";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

const useStyles = makeStyles({
  container: {
    backgroundColor: "rgb(256, 256, 256)",
    height: "92.8vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage:
      "url(https://engineering.tamu.edu/engineering-online/_files/_images/_content-images/engineering-online-mechanical-29Apr2019.jpg)",
    backgroundRepeat: "no-repeat",
    objectFit: "contain",
    backgroundSize: "cover",
  },
  welcome: {
    textAlign: "center",
    width: "100%",
    color: "white",
    fontSize: "50px",
    wordBreak: "break-word",
  },
  buttons: {
    textAlign: "center",
    marginTop: "20px",
  },
  button: {
    color: "black",
    padding: "10px 20px",
    backgroundColor: "green",
    margin: "10px",
    "&:hover": {
      backgroundColor: "orange",
    },
  },
});

function Welcome() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setRole = (event) => {
    dispatch(loginActions.setRole({ role: event.target.value }));
    navigate("/signup");
  };
  return (
    <>
      <Box className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.welcome}>
              Welcome To EasyWork
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.buttons}>
            <Button onClick={setRole} value="worker" className={classes.button}>
              Starving To Work?Click Here
            </Button>
            <Button onClick={setRole} value="user" className={classes.button}>
              Looking For Worker?Click Here
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Welcome;
