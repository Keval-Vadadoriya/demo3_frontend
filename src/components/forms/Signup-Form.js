import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginActions } from "../../store/login-slice";
import {
  signupActions,
  signupUser,
  verifyUser,
} from "../../store/actions/signup-actions";

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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { snackbarActions } from "../../store/snackbar-slice";
import { useTheme } from "@mui/styles";

const SignupForm = () => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:600px)");
  const [touched, setTouched] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);
  const [profession, setProfession] = useState("");
  const [professionIsValid, setProfessionIsValid] = useState(false);
  const [location, setLocation] = useState("");
  const [locationIsValid, setLocationIsValid] = useState(false);
  const role = useSelector((state) => state.login.role);
  const [roleIsValid, setRoleIsValid] = useState(role !== "");
  const token = useSelector((state) => state.login.token);
  const [otp, setOtp] = useState();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { status, errorMessage } = useSelector((state) => state.signup);
  if (token) {
    navigate("/home");
  }
  useEffect(() => {
    if (status === "Signup Successful") {
      setOpen(true);
    }
    if (errorMessage) {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "error",
          message: errorMessage,
        })
      );
      dispatch(signupActions.setErrorMessage({ errorMessage: "" }));
    }
    if (
      status === "Signup Successful" ||
      status === "Verification Successful"
    ) {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "success",
          message: "Otp Sent",
        })
      );
      dispatch(signupActions.setStatus({ status: "idle" }));
    }
  }, [status, errorMessage]);

  const handleClose = () => {
    setOpen(false);
  };
  const verify = () => {
    dispatch(verifyUser({ otp }));
  };
  const changeOtpHandler = (event) => {
    setOtp(event.target.value);
  };
  //changing Role
  const changeRole = (event) => {
    setRoleIsValid(true);
    dispatch(loginActions.setRole({ role: event.target.value }));
  };

  //Submit Handler
  const SubmitHandler = (event) => {
    event.preventDefault();

    let body =
      role === "user"
        ? {
            name,
            email,
            password,
          }
        : { name, email, password, profession, location };
    if (confirmPasswordIsValid) {
      dispatch(signupUser({ body, role }));
    }
  };

  //Validations
  const changeNameHandler = (event) => {
    setName(event.target.value);
    if (event.target.value.length > 0) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
  };

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
    if (
      event.target.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length >= 7) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };
  const changeConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
    if (password === event.target.value) {
      setConfirmPasswordIsValid(true);
    } else {
      setConfirmPasswordIsValid(false);
    }
  };

  const changeProfessionHandler = (event) => {
    setProfession(event.target.value);
    if (event.target.value !== "none") {
      setProfessionIsValid(true);
    } else {
      setProfessionIsValid(false);
    }
  };

  const changeLocationHandler = (event) => {
    setLocation(event.target.value);
    if (event.target.value !== "none") {
      setLocationIsValid(true);
    } else {
      setLocationIsValid(false);
    }
  };

  //return
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "92.5vh",
          width: "100vw",
          backgroundImage: "url(https://wallpaperaccess.com/full/2581470.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={SubmitHandler}
          sx={{ mt: 3, width: { xs: "80%", md: "40%" } }}
          onClick={() => setTouched(true)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth required error={touched && !roleIsValid}>
                <InputLabel id="role">Role</InputLabel>
                <Select
                  labelId="role"
                  id="role"
                  value={role}
                  label="Role"
                  color="success"
                  onChange={changeRole}
                  sx={{ backgroundColor: theme.palette.third.light }}
                >
                  <MenuItem value={""} disabled hidden>
                    {"Select Role"}
                  </MenuItem>
                  <MenuItem value={"user"}>{"User"}</MenuItem>
                  <MenuItem value={"worker"}>{"Worker"}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                error={touched && !nameIsValid}
                color="success"
                name="Name"
                required
                fullWidth
                id="Name"
                label="Name"
                onChange={changeNameHandler}
                sx={{ backgroundColor: theme.palette.third.light }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={touched && !emailIsValid}
                color="success"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={changeEmailHandler}
                sx={{ backgroundColor: theme.palette.third.light }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={touched && !passwordIsValid}
                color="success"
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={changePasswordHandler}
                sx={{ backgroundColor: theme.palette.third.light }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={touched && !confirmPasswordIsValid}
                color="success"
                name="confirm password"
                label="Confirm Password"
                type="password"
                id="confirm password"
                autoComplete="new-password"
                onChange={changeConfirmPasswordHandler}
                sx={{ backgroundColor: theme.palette.third.light }}
              />
            </Grid>
            {role === "worker" && (
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  required
                  error={touched && !professionIsValid}
                >
                  <InputLabel id="profession">Profession</InputLabel>
                  <Select
                    labelId="profession"
                    id="profession"
                    value={profession}
                    label="Profession"
                    color="success"
                    required
                    sx={{ backgroundColor: theme.palette.third.light }}
                    onChange={changeProfessionHandler}
                  >
                    <MenuItem value={"none"} disabled hidden>
                      {"Select Profession"}
                    </MenuItem>
                    <MenuItem value={"carpenter"}>{"Carpenter"}</MenuItem>
                    <MenuItem value={"plumber"}>{"Plumber"}</MenuItem>
                    <MenuItem value={"electrician"}>{"Electrician"}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            {role === "worker" && (
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  required
                  error={touched && !locationIsValid}
                >
                  <InputLabel id="location">Location</InputLabel>
                  <Select
                    labelId="location"
                    id="location"
                    value={location}
                    color="success"
                    required
                    label="Location"
                    onChange={changeLocationHandler}
                    sx={{ backgroundColor: theme.palette.third.light }}
                  >
                    <MenuItem value={"none"} disabled hidden>
                      {"Select Location"}
                    </MenuItem>
                    <MenuItem value={"surat"}>{"Surat"}</MenuItem>
                    <MenuItem value={"anand"}>{"Anand"}</MenuItem>
                    <MenuItem value={"vadodara"}>{"Vadodara"}</MenuItem>
                    <MenuItem value={"ahmedabad"}>{"Ahmedabad"}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.third.extra,
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.third.light,
              },
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2" component={Link} to={"/login"}>
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Dialog fullScreen={matches} open={open} onClose={handleClose}>
        <DialogTitle>Email Verification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To verify, please enter otp we have sent to your email address here.
          </DialogContentText>
          <TextField
            required
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
    </>
  );
};

export default SignupForm;
