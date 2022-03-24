import React, { Fragment, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import classes from "./Projects.module.css";
import { Stack, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  filterProjects,
  getAllProjects,
} from "../../store/actions/project-actions";
import Input from "../UI/Input";

const Projects = () => {
  const [location, setLocation] = useState("none");
  const [profession, setProfession] = useState("none");
  const [amount, setAmount] = useState(null);
  const [filtered, setFiltered] = useState(false);
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.login.token);

  const dispatch = useDispatch();
  const { status, workers, errorMessage } = useSelector(
    (state) => state.workerslist
  );
  const { projects, count } = useSelector((state) => state.project);
  const handleChange = (event, value) => {
    setPage(value);
    console.log("handle", (value - 1) * 3);
    if (filtered) {
      dispatch(
        filterProjects({
          token,
          location,
          profession,
          amount,
          skip: (value - 1) * 3,
        })
      );
    } else {
      dispatch(getAllProjects({ token, skip: (value - 1) * 3 }));
    }
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

  const clearFilter = () => {
    setLocation("none");
    setAmount(null);
    setProfession("none");

    setFiltered(false);
  };
  const filterWorkersBy = async (event) => {
    event.preventDefault();
    setFiltered(true);
    setAmount(null);
    dispatch(
      filterProjects({ token, location, profession, money: amount, skip: 0 })
    );
  };

  useEffect(async () => {
    dispatch(getAllProjects({ token, skip: 0 }));
  }, []);
  let projectList;
  if (projects) {
    projectList = projects.map((project) => (
      // <Link to={`${worker._id}`} className={classes.link} key={worker._id}>
      <ProjectCard
        name={project.project_name}
        profession={project.profession}
        location={project.location}
        key={project._id}
        owner={project.owner}
      />
      // </Link>
    ));
  }
  // let pageList = [];
  // if (count) {
  //   for (let i = 0; i < Math.ceil(count / 3); i++) {
  //     pageList.push(
  //       <button onClick={newPage} key={i} value={i}>
  //         {i}
  //       </button>
  //     );
  //   }
  // }

  return (
    <Fragment>
      <div className={classes.x}>
        <div>
          <form onSubmit={filterWorkersBy}>
            <h1>Filter By</h1>

            <select
              name="profession"
              id="profession"
              onChange={changeProfessionHandler}
              value={profession}
            >
              <option value="none">select profession</option>
              <option value="carpenter">Carpenter</option>
              <option value="plumber">Plumber</option>
              <option value="electrician">Electrician</option>
            </select>
            <select
              name="location"
              id="location"
              onChange={changeLocationHandler}
              value={location}
            >
              <option value="none" disabled hidden>
                select location
              </option>
              <option value="surat">Surat</option>
              <option value="anand">Anand</option>
              <option value="vadodara">Vadodara</option>
              <option value="ahmedabad">Ahmedabad</option>
            </select>

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
            <input type="submit" value="Apply"></input>
            <button onClick={clearFilter}>clear</button>
          </form>
        </div>
        <div className={classes.workerlist}>
          {status === "loading" && <h1>Loading</h1>}
          {projectList}
          {errorMessage && <p>{errorMessage}</p>}

          <div>
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(count / 3)}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Projects;
