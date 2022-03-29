import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";

import {
  loginActions,
  loggedInUser,
  forgotPassword,
  verifyPassword,
} from "../../store/login-slice";
import { verifyUser } from "../../store/actions/signup-actions";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Copyright } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [forgotDialog, setForgotDialog] = useState(false);
  const [verifyDialog, setVerifyDialog] = useState(false);
  const [otp, setOtp] = useState();

  const { status, role, token, errorMessage } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //afkads
  useEffect(() => {
    if (errorMessage === "Plese Verify Your Email") {
      setOpen(true);
    }
    if (status === "succeeded") {
      setForgotDialog(false);
      setVerifyDialog(true);
    }
  }, [status]);

  const handleClose = () => {
    setOpen(false);
  };
  const verify = () => {
    dispatch(verifyUser({ otp }));
  };
  const changeOtpHandler = (event) => {
    setOtp(event.target.value);
  };
  //sdfhsdhf

  const forgotPasswordHandler = () => {
    setForgotDialog(true);
  };
  const handleForgotClose = () => {
    setForgotDialog(false);
  };
  const changeForgotPasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  const changeConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };
  const verifyPasswordx = () => {
    console.log(password === confirmPassword);
    if (password === confirmPassword) {
      console.log(password);
      const body = {
        password,
      };
      dispatch(verifyPassword({ otp, body }));
    }
  };
  const forgotPasswordx = () => {
    const body = {
      email: loginEmail,
    };
    console.log(body);
    dispatch(forgotPassword({ body }));
  };
  //forgot password
  //Login Request
  if (token) {
    navigate("/home");
  }

  //Submit Handler
  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(loggedInUser({ role, loginEmail, loginPassword }));
  };

  // validations
  const changeEmailHandler = (event) => {
    setLoginEmail(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setLoginPassword(event.target.value);
  };
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={onSubmitHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={changeEmailHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={changePasswordHandler}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="space-around">
              <Grid item>
                <Typography
                  variant="body2"
                  onClick={forgotPasswordHandler}
                  color="blue"
                >
                  forgot password
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" component={Link} to={"/signup"}>
                  don't have an account? Sign up
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={changeOtpHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={verify}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={verifyDialog} onClose={handleForgotClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Otp"
            label="Otp"
            type="text"
            fullWidth
            variant="standard"
            onChange={changeOtpHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Password"
            type="text"
            fullWidth
            variant="standard"
            onChange={changeForgotPasswordHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Confirm Password"
            type="text"
            fullWidth
            variant="standard"
            onChange={changeConfirmPasswordHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={verifyPasswordx}>verify</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen={matches}
        open={forgotDialog}
        onClose={handleForgotClose}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="Email"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            onChange={changeEmailHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={forgotPasswordx}>forgot</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginForm;
