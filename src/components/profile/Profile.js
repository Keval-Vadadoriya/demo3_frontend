import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "../forms/Form.module.css";
import Input from "../UI/Input";
import { editUser } from "../../store/user-slice";
const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [age, setAge] = useState("");
  const [profession, setProfession] = useState("");
  const [professionIsValid, setProfessionIsValid] = useState(false);
  const [location, setLocation] = useState("");
  const [locationIsValid, setLocationIsValid] = useState(false);
  const [edit, setEdit] = useState(false);
  const user = useSelector((state) => state.user.user);
  const { status, errorMessage } = useSelector((state) => state.user);
  const role = useSelector((state) => state.login.role);
  const userId = useSelector((state) => state.user.user._id);
  const avatar = user.avatar;
  const dispatch = useDispatch();
  const editProfile = () => {
    setEdit(!edit);
  };

  //Submit Handler
  const SubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (role === "user") {
      if (newAvatar) {
        formData.append("avatar", newAvatar);
      }
      if (name) {
        formData.append("name", name);
      }
      if (email) {
        formData.append("email", email);
      }
      if (password) {
        formData.append("password", password);
      }
      if (contact) {
        formData.append("contact", contact);
      }
      if (age) {
        formData.append("age", age);
      }
    }
    if (role === "worker") {
      if (newAvatar) {
        formData.append("avatar", newAvatar);
      }
      if (name) {
        formData.append("name", name);
      }
      if (email) {
        formData.append("email", email);
      }
      if (password) {
        formData.append("password", password);
      }
      if (contact) {
        formData.append("contact", contact);
      }
      if (age) {
        formData.append("age", age);
      }
      if (profession) {
        formData.append("profession", profession);
      }
      if (location) {
        formData.append("location", location);
      }
    }

    if (role === "worker") {
      if (locationIsValid && professionIsValid) {
        dispatch(editUser({ body: formData, role, userId }));
      }
    } else {
      dispatch(editUser({ body: formData, role, userId }));
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
    setNewAvatar(event.target.files[0]);
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

  return (
    <>
      <div>
        <h1>Name:{user.name}</h1>
        <h1>Email:{user.email}</h1>
        <h1>Age:{user.age}</h1>
        <img src={`http://127.0.0.1:3001/${avatar}`} />
      </div>
      <div>
        <button onClick={editProfile}>Edit Profile</button>
        {edit && (
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
                    id: "name",
                    name: "name",
                    onChange: changeNameHandler,
                    type: "text",
                  }}
                />
                <Input
                  label="About You"
                  input={{
                    placeholder: "Enter Your Description",
                    id: "description",
                    name: "description",
                    onChange: changeEmailHandler,
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
                <input type="submit" value="Save Changes"></input>
                {status !== "loading" && errorMessage && <p>{errorMessage}</p>}
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default Profile;
