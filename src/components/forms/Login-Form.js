import { useContext, useState } from "react";
import Input from "../UI/Input";
import classes from "./Form.module.css";
import useHttp from "../../custom-hooks/useHttp";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
console.log("login2");

const LoginForm = (props) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginEmailIsValid, setLoginEmailIsValid] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPasswordIsValid, setLoginPasswordIsValid] = useState(false);
  const [loginFormIsValid, setLoginFormIsValid] = useState(false);
  const navigate = useNavigate();
  const [isLoading, errror, sendRequest] = useHttp();
  const ctx = useContext(AuthContext);

  console.log("Login");
  if (loginFormIsValid) {
    sendRequest({
      url: "http://127.0.0.1:3001/login",
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
        ctx.setToken("Bearer " + res.token);
        ctx.setIsLoggedIn(true);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoginFormIsValid(false);
  }

  const showSignup = () => {
    navigate("/signup", { replace: true });
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (loginEmailIsValid === true && loginPasswordIsValid === true) {
      setLoginFormIsValid(true);
    } else {
      setLoginFormIsValid(false);
    }
  };

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
      {!isLoading && (
        <form onSubmit={onSubmitHandler} className={classes.form}>
          <h1>Login Form</h1>

          <Input
            label="Email"
            input={{
              id: "email",
              onChange: changeEmailHandler,
              type: "text",
            }}
          />
          <Input
            label="Password"
            input={{
              id: "password",
              onChange: changePasswordHandler,
              type: "text",
            }}
          />
          <input type="submit"></input>
          <button onClick={showSignup}>signup</button>
          {!isLoading && errror && <p>{errror.message}</p>}
        </form>
      )}
    </div>
  );
};

export default LoginForm;
