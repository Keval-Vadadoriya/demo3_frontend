import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { loginActions } from "../../store/login-slice";
import { userActions } from "../../store/user-slice";
import { loggedInUser } from "../../store/actions/login-actions";

import Input from "../UI/Input";
import classes from "./Form.module.css";
console.log("login2");

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const role = useSelector((state) => state.login.role);
  const { status, user, errorMessage } = useSelector(
    (state) => state.loginuser
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  console.log("Login");
  console.log(user, status, errorMessage);
  //Login Request
  if (user) {
    localStorage.setItem("userInfo", JSON.stringify(user.user));
    localStorage.setItem("token", user.token);
    localStorage.setItem("role", role);

    dispatch(
      loginActions.setLoginStatus({
        token: "Bearer " + user.token,
      })
    );
    dispatch(
      userActions.setLoggedInUser({
        age: user.user.age,
        email: user.user.email,
        name: user.user.name,
        _id: user.user._id,
        avatar: user.user.avatar,
      })
    );

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
