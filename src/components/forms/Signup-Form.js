import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginActions } from "../../store/login-slice";
import { signupUser, verifyUser } from "../../store/actions/signup-actions";

import Input from "../UI/Input";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Copyright } from "@mui/icons-material";

import classes from "./Form.module.css";

const SignupForm = (props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profession, setProfession] = useState("");
  const [professionIsValid, setProfessionIsValid] = useState(false);
  const [location, setLocation] = useState("");
  const [locationIsValid, setLocationIsValid] = useState(false);
  const role = useSelector((state) => state.login.role);
  const token = useSelector((state) => state.login.token);
  const [otp, setOtp] = useState();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { status, errorMessage } = useSelector((state) => state.signup);
  if (token) {
    navigate("/home");
  }
  useEffect(() => {
    if (status === "succeeded") {
      setOpen(true);
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
  //changing Role
  const changeRole = (event) => {
    dispatch(loginActions.setRole({ role: event.target.value }));
    console.log("here");
    // if (role === "user" || role === "") {
    //   dispatch(loginActions.setRole({ role: "worker" }));
    // }
    // if (role === "worker") {
    //   dispatch(loginActions.setRole({ role: "user" }));
    // }
  };

  //Submit Handler
  const SubmitHandler = (event) => {
    event.preventDefault();
    console.log("sdfgsdjfg");
    console.log(role);
    let body =
      role === "user"
        ? {
            name,
            email,
            password,
          }
        : { name, email, password, profession, location };
    if (passwordIsValid) {
      dispatch(signupUser({ body, role }));
    }
  };

  //Validations
  const changeNameHandler = (event) => {
    setName(event.target.value);
  };

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  const changeConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
    if (password === event.target.value) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
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
      {/* <div className={classes["form-container"]}>
        {status === "loading" && <p>Loading</p>}
        {status !== "loading" && (
          <form
            action="/signup"
            method="post"
            encType="multipart/form-data"
            onSubmit={SubmitHandler}
            className={classes.form}
          >
            <h1>Signup Form</h1>
            <Input
              label="Name"
              input={{
                placeholder: "name",
                required: true,
                id: "name",
                name: "name",
                onChange: changeNameHandler,
                type: "text",
              }}
            />
            <Input
              label="Email"
              input={{
                placeholder: "Enter an Email",
                id: "email",
                name: "email",
                onChange: changeEmailHandler,
                type: "email",
              }}
            />
            <Input
              label="Password"
              input={{
                placeholder: "Enter a Password",
                id: "password",
                name: "password",
                onChange: changePasswordHandler,
                type: "password",
                autoComplete: "on",
                minLength: 7,
              }}
            />
            <Input
              label="Confirm Password"
              input={{
                placeholder: "Enter a Password Again",
                id: "confirm password",
                name: "confirm password",
                onChange: changeConfirmPasswordHandler,
                type: "password",
                autoComplete: "on",
                minLength: 7,
              }}
              className={passwordIsValid ? "valid" : "invalid"}
            />

            {role !== "user" && (
              <div className={classes.select}>
                <label htmlFor="profession">Profession</label>
                <select
                  name="profession"
                  id="profession"
                  onChange={changeProfessionHandler}
                  defaultValue="none"
                  required
                >
                  <option value="none" disabled hidden>
                    select your profession
                  </option>
                  <option value="carpenter">Carpenter</option>
                  <option value="plumber">Plumber</option>
                  <option value="electrician">Electrician</option>
                </select>
              </div>
            )}
            {role !== "user" && (
              <div className={classes.select}>
                <label htmlFor="location">Location</label>
                <select
                  name="location"
                  id="location"
                  onChange={changeLocationHandler}
                  defaultValue="none"
                  required={true}
                >
                  <option value="none" disabled hidden>
                    select your location
                  </option>
                  <option value="surat">Surat</option>
                  <option value="ahmedabad">Ahmedabad</option>
                  <option value="anand">Anand</option>
                  <option value="vadodara">vadodara</option>
                </select>
              </div>
            )}

            <div></div>
            <input type="submit" value="Signup"></input>
            <button type="button" onClick={changeRole}>
              {role === "user" ? "Want to work?" : "Want to hire?"}
            </button>
            <p>
              Already Have Account? <Link to="/login">login</Link>
            </p>
            {status !== "loading" && errorMessage && <p>{errorMessage}</p>}
          </form>
        )}
      </div> */}
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={SubmitHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Role"
                    onChange={changeRole}
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
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  onChange={changeNameHandler}
                />
              </Grid>

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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm password"
                  label="Confirm Password"
                  type="password"
                  id="confirm password"
                  autoComplete="new-password"
                  onChange={changeConfirmPasswordHandler}
                />
              </Grid>
              {role === "worker" && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Profession
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={profession}
                      label="Profession"
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
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Location
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={location}
                      label="Location"
                      onChange={changeLocationHandler}
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
              sx={{ mt: 3, mb: 2 }}
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
    </>
  );
};

export default SignupForm;
