import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginActions } from "../../store/login-slice";
import { signupUser } from "../../store/actions/signup-actions";

import Input from "../UI/Input";

import classes from "./Form.module.css";

const SignupForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [avatar, setAvatar] = useState("");
  const [age, setAge] = useState("");
  const [profession, setProfession] = useState("");
  const [professionIsValid, setProfessionIsValid] = useState(false);
  const [location, setLocation] = useState("");
  const [locationIsValid, setLocationIsValid] = useState(false);
  const role = useSelector((state) => state.login.role);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { status, errorMessage } = useSelector((state) => state.signupuser);
  if (status === "succeeded") {
    navigate("/login");
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
    const formData = new FormData();
    if (role === "user") {
      formData.append("avatar", avatar);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("contact", contact);
      formData.append("age", age);
    }
    if (role === "worker") {
      formData.append("avatar", avatar);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("contact", contact);
      formData.append("age", age);
      formData.append("profession", profession);
      formData.append("location", location);
    }

    if (role === "worker") {
      if (locationIsValid && professionIsValid) {
        dispatch(signupUser({ body: formData, role }));
      }
    } else {
      dispatch(signupUser({ body: formData, role }));
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

  const changeAgeHandler = (event) => {
    setAge(event.target.value);
  };
  const changeContactHandler = (event) => {
    setContact(event.target.value);
  };
  const changeAvatarHandler = (event) => {
    setAvatar(event.target.files[0]);
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
              minLength: 7,
            }}
          />
          <Input
            label="Contact"
            input={{
              placeholder: "Enter a Password",
              id: "contact",
              name: "contact",
              onChange: changeContactHandler,
              type: "tel",
              pattern: "[6-9]{1}[0-9]{9}",
            }}
          />
          <Input
            label="Age"
            input={{
              placeholder: "Enter an Age",
              id: "age",
              name: "age",
              onChange: changeAgeHandler,
              type: "text",
              min: 18,
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
          <Input
            label="avatar"
            input={{
              type: "file",
              id: "avatar",
              name: "avatar",
              accept: "image/png, image/jpeg",
              onChange: changeAvatarHandler,
            }}
          />
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
    </div>
  );
};

export default SignupForm;
