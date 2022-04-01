import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/login-slice";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setRole = (event) => {
    dispatch(loginActions.setRole({ role: event.target.value }));
    navigate("/signup");
  };
  return (
    <>
      <Container fixed>
        <Box>
          <Typography>Welcome To EasyWork</Typography>
          <Button onClick={setRole} value="user">
            Starving To Work?Click Here
          </Button>
          <Button onClick={setRole} value="worker">
            Looking For Worker?Click Here
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Welcome;
