import { useContext, useState } from "react";
import Input from "../UI/Input";
import classes from "./Form.module.css";
import useHttp from "../../custom-hooks/useHttp";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const SignupForm = (props) => {
  const [name, setName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [age, setAge] = useState("");
  const [ageIsValid, setAgeIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const ctx = useContext(AuthContext);

  const navigate = useNavigate();
  const [isLoading, errror, sendRequest] = useHttp();

  const showLogin = () => {
    navigate("/login", { replace: true });
  };
  if (formIsValid) {
    sendRequest({
      url: "http://127.0.0.1:3001/signup",
      method: "POST",
      body: {
        name,
        email,
        password,
        age,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      ctx.setToken("Bearer " + res.token);
      ctx.setIsLoggedIn(true);
      console.log(res);
    });
    setFormIsValid(false);
  }
  const SubmitHandler = (event) => {
    event.preventDefault();
    if (
      nameIsValid === true &&
      emailIsValid === true &&
      passwordIsValid === true &&
      ageIsValid === true
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  };

  const changeNameHandler = (event) => {
    setName(event.target.value);
    if (event.target.value !== "") {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
  };

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
    if (event.target.value.includes("@")) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length > 6) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const changeAgeHandler = (event) => {
    setAge(event.target.value);
    if (event.target.value > 10) {
      setAgeIsValid(true);
    } else {
      setAgeIsValid(false);
    }
  };

  return (
    <div className={classes["form-container"]}>
      {isLoading && <p>Loading</p>}
      {!isLoading && (
        <form onSubmit={SubmitHandler} className={classes.form}>
          <h1>Signup Form</h1>
          <Input
            label="Name"
            input={{
              id: "name",
              onChange: changeNameHandler,
              type: "text",
            }}
          />
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
          <Input
            label="Age"
            input={{
              id: "age",
              onChange: changeAgeHandler,
              type: "text",
            }}
          />
          <input type="submit"></input>
          <button onClick={showLogin}>login</button>
          {/* {!formIsValid && <p>Please Enter Valid Data</p>} */}
          {!isLoading && errror && <p>{errror.message}</p>}
        </form>
      )}
    </div>
  );
};

export default SignupForm;
