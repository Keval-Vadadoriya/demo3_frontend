import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { loginActions, loggedInUser } from "../../store/login-slice";

import Input from "../UI/Input";
import classes from "./Form.module.css";

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { status, role, token, errorMessage } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();
  console.log(status);
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
  const changeRoleHandler = (event) => {
    dispatch(loginActions.setRole({ role: event.target.value }));
  };
  const changeEmailHandler = (event) => {
    setLoginEmail(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setLoginPassword(event.target.value);
  };

  return (
    <div className={classes["form-container"]}>
      {status === "loading" && <p>Loading</p>}
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
              minLength: 7,
              autoComplete: "on",
            }}
          />
          <input type="submit" value="Login"></input>
          <span>Don't Have Account? </span>
          <Link to="/signup">signup</Link>
          {status !== "loading" && errorMessage && <p>{errorMessage}</p>}
        </form>
      }
    </div>
  );
};

export default LoginForm;
