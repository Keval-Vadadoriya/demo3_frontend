import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { loginActions } from "../../store/login-slice";
import { userActions } from "../../store/user-slice";

import Input from "../UI/Input";
import classes from "./Form.module.css";
import useHttp from "../../custom-hooks/useHttp";
console.log("login2");

const LoginForm = (props) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginEmailIsValid, setLoginEmailIsValid] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPasswordIsValid, setLoginPasswordIsValid] = useState(false);
  const [loginFormIsValid, setLoginFormIsValid] = useState(false);

  const role = useSelector((state) => state.login.role);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isLoading, error, sendRequest] = useHttp();

  console.log("Login");

  //Login Request
  if (loginFormIsValid) {
    sendRequest({
      url: `http://127.0.0.1:3001/login?role=${role}`,
      method: "POST",
      body: {
        email: loginEmail,
        password: loginPassword,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!error) {
          console.log(error);
          dispatch(
            loginActions.setLoginStatus({
              isLoggedIn: true,
              token: "Bearer " + res.token,
            })
          );
          dispatch(
            userActions.setLoggedInUser({
              age: res.user.age,
              email: res.user.email,
              name: res.user.name,
              _id: res.user._id,
            })
          );
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("token", "Bearer " + res.token);
          localStorage.setItem("role", role);
          localStorage.setItem("age", res.user.age);
          localStorage.setItem("email", res.user.email);
          localStorage.setItem("name", res.user.name);
          localStorage.setItem("_id", res.user._id);

          console.log(res);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setLoginFormIsValid(false);
  }

  const changeRoleHandler = (event) => {
    dispatch(loginActions.setRole({ role: event.target.value }));
  };
  //Submit Handler
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (loginEmailIsValid === true && loginPasswordIsValid === true) {
      setLoginFormIsValid(true);
    } else {
      setLoginFormIsValid(false);
    }
  };

  //validations
  const changeEmailHandler = (event) => {
    setLoginEmail(event.target.value);
    if (event.target.value.includes("@")) {
      setLoginEmailIsValid(true);
    } else {
      setLoginEmailIsValid(false);
    }
  };

  const changePasswordHandler = (event) => {
    setLoginPassword(event.target.value);
    if (event.target.value.length > 6) {
      setLoginPasswordIsValid(true);
    } else {
      setLoginPasswordIsValid(false);
    }
  };

  return (
    <div className={classes["form-container"]}>
      {isLoading && <p>Loading</p>}
      {
        <form onSubmit={onSubmitHandler} className={classes.form}>
          <h1>Login Form</h1>

          <div className={classes.select}>
            <label htmlFor="role">Role</label>
            <select
              name="role"
              id="role"
              onChange={changeRoleHandler}
              defaultValue="none"
              required={true}
            >
              <option value="none" disabled hidden>
                select your Role
              </option>
              <option value="user">user</option>
              <option value="worker">worker</option>
            </select>
          </div>

          <Input
            label="Email"
            input={{
              placeholder: "Enter an Email",
              id: "email",
              onChange: changeEmailHandler,
              type: "email",
              required: true,
            }}
          />
          <Input
            label="Password"
            input={{
              placeholder: "Enter a Password",
              id: "password",
              onChange: changePasswordHandler,
              type: "password",
              required: true,
            }}
          />
          <input type="submit" value="Login"></input>
          <span>Don't Have Account? </span>
          <Link to="/signup">signup</Link>
          {!isLoading && error && <p>{error.message}</p>}
        </form>
      }
    </div>
  );
};

export default LoginForm;
