import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Profile.module.css";
import Input from "../UI/Input";
import { editUser } from "../../store/user-slice";
import { Container } from "@mui/material";
import { host } from "../../config";
const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [profession, setProfession] = useState("");
  const [professionIsValid, setProfessionIsValid] = useState(false);
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("none");
  const [locationIsValid, setLocationIsValid] = useState(false);
  const user = useSelector((state) => state.user.user);
  const { status, errorMessage } = useSelector((state) => state.user);
  const role = useSelector((state) => state.login.role);
  const userId = useSelector((state) => state.user.user._id);
  const avatar = user.avatar;
  const token = useSelector((state) => state.login.token);

  const dispatch = useDispatch();

  //Submit Handler
  const SubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (newAvatar) {
      formData.append("avatar", newAvatar);
    }
    if (name) {
      formData.append("name", name);
    }
    if (email) {
      formData.append("email", email);
    }
    if (contact) {
      formData.append("contact", contact);
    }
    if (age) {
      formData.append("age", age);
    }
    if (role === "worker") {
      if (profession) {
        formData.append("profession", profession);
      }
      if (location) {
        formData.append("location", location);
      }
      if (description) {
        formData.append("description", description);
      }
      if (availability) {
        formData.append("availability", availability);
      }
    }

    dispatch(editUser({ body: formData, role, userId }));
  };

  //Validations

  const changeProfessionHandler = (event) => {
    setProfession(event.target.value);
    if (event.target.value !== "none") {
      setProfessionIsValid(true);
    } else {
      setProfessionIsValid(false);
    }
  };
  const changeAvailabilityHandler = (event) => {
    setAvailability(event.target.value);
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
      <Container>
        <div className={classes.profile}>
          <div className={classes.first}>
            <img src={`${host}/${avatar}`} />
          </div>
          <div className={`${classes["form-container"]} ${classes.second}`}>
            {status === "loading" && <p>Loading</p>}
            {status !== "loading" && (
              <form
                action="/signup"
                method="post"
                encType="multipart/form-data"
                onSubmit={SubmitHandler}
                className={classes.form}
              >
                <h1>User Profile</h1>
                <Input
                  label="Name"
                  input={{
                    defaultValue: `${user.name ? user.name : ""}`,
                    id: "name",
                    name: "name",
                    onChange: (event) => setName(event.target.value),
                    type: "text",
                    // Text: `${user.name ? user.name : ""}`,
                  }}
                />
                {role === "worker" && (
                  <Input
                    label="About You"
                    input={{
                      defaultValue: `${
                        user.description ? user.description : ""
                      }`,
                      id: "description",
                      name: "description",
                      onChange: (event) => setDescription(event.target.value),
                      type: "text",
                      // text: `${user.description ? user.description : ""}`,
                    }}
                  />
                )}
                <Input
                  label="Email"
                  input={{
                    defaultValue: `${user.email ? user.email : ""}`,
                    id: "email",
                    name: "email",
                    onChange: (event) => setEmail(event.target.value),
                    type: "email",
                    // text: `${user.email ? user.email : ""}`,
                  }}
                />
                <Input
                  label="Contact"
                  input={{
                    defaultValue: `${user.contact ? user.contact : ""}`,
                    id: "contact",
                    name: "contact",
                    // onChange: changeContactHandler,
                    onChange: (event) => setContact(event.target.value),
                    type: "tel",
                    pattern: "[6-9]{1}[0-9]{9}",
                    // text: `${user.contact ? user.contact : ""}`,
                  }}
                />
                <Input
                  label="Age"
                  input={{
                    // text: `${user.age}`,
                    defaultValue: `${user.age ? user.age : ""}`,
                    // defaultValue: `${user.age ? user.age : ""}`,
                    id: "age",
                    name: "age",
                    onChange: (event) => setAge(event.target.value),
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
                      defaultValue={`${user.profession}`}
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
                      defaultValue={`${user.location}`}
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
                {role !== "user" && (
                  <div className={classes.select}>
                    <label htmlFor="availability">Availability</label>
                    <select
                      name="availability"
                      id="availability"
                      onChange={changeAvailabilityHandler}
                      defaultValue={`${user.availability}`}
                    >
                      <option value="none" disabled hidden>
                        select status
                      </option>
                      <option value={true}>Available</option>
                      <option value={false}>Not Available</option>
                    </select>
                  </div>
                )}
                <Input
                  label={<img src={`${host}/${avatar}`} />}
                  input={{
                    type: "file",
                    id: "avatar",
                    name: "avatar",
                    accept: "image/png, image/jpeg",
                    onChange: (event) => setNewAvatar(event.target.files[0]),
                  }}
                />
                <input type="submit" value="Save Changes"></input>

                {status !== "loading" && errorMessage && <p>{errorMessage}</p>}
              </form>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
export default Profile;
