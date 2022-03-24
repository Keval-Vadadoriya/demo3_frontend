import React, { Fragment, useEffect, useState } from "react";
import ProjectCard from "./MyProjectCard";
import { Link } from "react-router-dom";
import classes from "./MyProjects.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  postProject,
  removeProject,
} from "../../store/actions/myproject-actions";
import {
  filterProjects,
  getAllProjects,
  getMyProjects,
} from "../../store/actions/project-actions";
import Input from "../UI/Input";

const MyProjects = () => {
  const [location, setLocation] = useState("none");
  const [profession, setProfession] = useState("none");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("none");
  const [projectName, setProjectName] = useState(false);
  const token = useSelector((state) => state.login.token);

  const dispatch = useDispatch();
  const { status, projects, count, errorMessage } = useSelector(
    (state) => state.project
  );

  const newPage = (event) => {
    dispatch(getMyProjects({ token, skip: event.target.value * 3 }));
  };
  const SubmitHandler = (event) => {
    event.preventDefault();
    // console.log(event.target.innerHTML);
    // if (filtered) {
    dispatch(
      postProject({
        token,
        project_name: projectName,
        description,
        profession,
        location,
        money: amount,
      })
    );
    dispatch(getMyProjects({ token, skip: 0 }));

    // } else {
    //   dispatch(getAllWorkers({ token, skip: event.target.innerHTML * 3 }));
    // }
  };
  const changeLocationHandler = (event) => {
    setLocation(event.target.value);
  };
  const changeAmountHandler = (event) => {
    setAmount(event.target.value);
  };
  const changeProfessionHandler = (event) => {
    setProfession(event.target.value);
  };
  const changeProjectNameHandler = (event) => {
    setProjectName(event.target.value);
  };
  const changeDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const removeProjectHandler = (projectId) => {
    console.log(token);
    dispatch(removeProject({ token, projectId }));
    dispatch(getMyProjects({ token, skip: 0 }));
  };

  useEffect(async () => {
    dispatch(getMyProjects({ token, skip: 0 }));
  }, []);
  let projectList;
  if (projects) {
    projectList = projects.map((project) => (
      // <Link to={`${worker._id}`} className={classes.link} key={worker._id}>
      <ProjectCard
        _id={project._id}
        name={project.project_name}
        profession={project.profession}
        location={project.location}
        key={project._id}
        onClick={removeProjectHandler}
      />
      // </Link>
    ));
  }
  let pageList = [];
  if (count) {
    for (let i = 0; i < Math.ceil(count / 3); i++) {
      pageList.push(
        <button onClick={newPage} key={i}>
          {i}
        </button>
      );
    }
  }

  return (
    <Fragment>
      <div className={classes.x}>
        <div>{projectList && projectList}</div>
        <div className={classes["form-container"]}>
          {status === "loading" && <p>Loading</p>}
          {status !== "loading" && (
            <form onSubmit={SubmitHandler} className={classes.form}>
              <h1>Project</h1>
              <Input
                label="Project Name"
                input={{
                  placeholder: "Enter a Project Name",
                  required: true,
                  id: "name",
                  name: "name",
                  onChange: changeProjectNameHandler,
                  type: "text",
                }}
              />
              <Input
                label="Description"
                input={{
                  placeholder: "Enter a Description",
                  id: "description",
                  name: "description",
                  onChange: changeDescriptionHandler,
                  type: "text",
                }}
              />
              <Input
                label="Amount"
                input={{
                  placeholder: "Enter an amount",
                  id: "amount",
                  name: "amount",
                  onChange: changeAmountHandler,
                  type: "number",
                  autoComplete: "on",
                }}
              />
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
              <input type="submit" value="Post"></input>
              {status !== "loading" && errorMessage && <p>{errorMessage}</p>}
            </form>
          )}
        </div>
        <Link to="#">&raquo;</Link>
        {count && pageList}
        <Link to="#">&raquo;</Link>
      </div>
    </Fragment>
  );
};

export default MyProjects;
