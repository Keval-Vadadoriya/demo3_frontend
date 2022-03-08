import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import useHttp from "../../custom-hooks/useHttp";
import { loginActions } from "../../store/login-slice";
import { userActions } from "../../store/user-slice";

import Input from "../UI/Input";

import classes from "./Form.module.css";

const SignupForm = (props) => {
  const [name, setName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [age, setAge] = useState("");
  const [ageIsValid, setAgeIsValid] = useState(false);
  const [profession, setProfession] = useState("");
  const [professionIsValid, setProfessionIsValid] = useState(false);
  const [location, setLocation] = useState("");
  const [locationIsValid, setLocationIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const role = useSelector((state) => state.login.role);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isLoading, errror, sendRequest] = useHttp();

  //Signup Request
  if (formIsValid) {
    let body =
      role === "user"
        ? {
            name,
            email,
            password,
            age,
          }
        : {
            name,
            email,
            password,
            age,
            profession,
            location,
          };
    sendRequest({
      url: `http://127.0.0.1:3001/signup?role=${role}`,
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      if (!errror) {
        console.log(errror);
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
            // user: res.user,
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
    });
    setFormIsValid(false);
  }

  //changing Role
  const changeRole = () => {
    if (role === "user") {
      dispatch(loginActions.setRole({ role: "worker" }));
    }
    if (role === "worker") {
      dispatch(loginActions.setRole({ role: "user" }));
    }
  };

  //Submit Handler
  const SubmitHandler = (event) => {
    event.preventDefault();
    if (role === "user") {
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
    } else {
      if (
        nameIsValid === true &&
        emailIsValid === true &&
        passwordIsValid === true &&
        ageIsValid === true &&
        professionIsValid === true &&
        locationIsValid === true
      ) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      }
    }
  };

  //Validations
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
    <div className={classes["form-container"]}>
      {isLoading && <p>Loading</p>}
      {!isLoading && (
        <form onSubmit={SubmitHandler} className={classes.form}>
          <h1>Signup Form</h1>
          <Input
            label="Name"
            input={{
              placeholder: "name",
              required: true,
              id: "Name",
              onChange: changeNameHandler,
              type: "text",
            }}
          />
          <Input
            label="Email"
            input={{
              placeholder: "Enter an Email",
              id: "Email",
              onChange: changeEmailHandler,
              type: "email",
            }}
          />
          <Input
            label="Password"
            input={{
              placeholder: "Enter a Password",
              id: "Password",
              onChange: changePasswordHandler,
              type: "password",
            }}
          />
          <Input
            label="Age"
            input={{
              placeholder: "Enter an Age",
              id: "Age",
              onChange: changeAgeHandler,
              type: "text",
            }}
          />
          {role !== "user" && (
            <div className={classes.select}>
              <label htmlFor="profession">Profession</label>
              <select
                name="profession"
                id="profession"
                onChange={changeProfessionHandler}
                defaultValue="none"
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

          <button onClick={changeRole}>
            {role === "user" ? "Want to work?" : "Want to hire?"}
          </button>
          <p>
            Already Have Account? <Link to="/login">login</Link>
          </p>
          {!isLoading && errror && <p>{errror.message}</p>}
        </form>
      )}
    </div>
  );
};

export default SignupForm;
