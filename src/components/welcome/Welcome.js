import React from "react";
import { Box, Button, Slide, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/login-slice";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgb(256, 256, 256)",
    height: "92.5vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage:
      "url(https://www.fulltimenomad.com/wp-content/uploads/2017/03/What-is-Upwork.jpg)",
    backgroundRepeat: "no-repeat",
    // objectFit: "cover",
    backgroundSize: "100% 100%",
    // backgroundSize: "cover",
  },
  welcome: {
    textAlign: "center",
    width: "100%",
    color: theme.palette.secondary.main,
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
    backgroundColor: theme.palette.third.extra,
    margin: "10px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
    },
  },
}));

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
            <Slide direction="up" in={true}>
              <Typography className={classes.welcome}>
                Welcome To EasyWork
              </Typography>
            </Slide>
          </Grid>
          <Grid item xs={12} className={classes.buttons}>
            <Button onClick={setRole} value="worker" className={classes.button}>
              Want To Work?
            </Button>
            <Button onClick={setRole} value="user" className={classes.button}>
              Looking For Worker?
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Welcome;
