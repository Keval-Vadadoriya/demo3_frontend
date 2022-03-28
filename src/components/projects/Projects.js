import React, { Fragment, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import classes from "./Projects.module.css";
// import { Stack, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  Stack,
  Pagination,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
  Container,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  Box,
} from "@mui/material";

import {
  filterProjects,
  getAllProjects,
} from "../../store/actions/project-actions";
import Input from "../UI/Input";

const Projects = () => {
  const [location, setLocation] = useState("none");
  const [profession, setProfession] = useState("none");
  const [amount, setAmount] = useState(0);
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
          location,
          profession,
          amount,
          skip: (value - 1) * 3,
        })
      );
    } else {
      dispatch(getAllProjects({ skip: (value - 1) * 3 }));
    }
  };
  const changeLocationHandler = (event) => {
    setLocation(event.target.value);
  };
  const changeAmountHandler = (event) => {
    setAmount(event.target.value);
    console.log(event.target.value);
  };
  const changeProfessionHandler = (event) => {
    setProfession(event.target.value);
  };

  const clearFilter = () => {
    setLocation("none");
    setAmount(0);
    setProfession("none");

    setFiltered(false);
  };
  const filterWorkersBy = async (event) => {
    event.preventDefault();
    setFiltered(true);
    setAmount(null);
    dispatch(filterProjects({ location, profession, money: amount, skip: 0 }));
  };

  useEffect(async () => {
    dispatch(getAllProjects({ skip: 0 }));
  }, []);
  let projectList;
  if (projects) {
    projectList = projects.map((project) => (
      <ProjectCard
        project={project}
        key={project._id}
        // name={project.project_name}
        // profession={project.profession}
        // location={project.location}
        // key={project._id}
        // owner={project.owner}
      />
    ));
  }

  return (
    <Fragment>
      <div className={classes.x}>
        <Box
          component="form"
          noValidate
          onSubmit={filterWorkersBy}
          sx={{ minWidth: 160, maxWidth: 200, margin: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Profession
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={profession}
                  label="Profession"
                  onChange={changeProfessionHandler}
                >
                  <MenuItem value={"none"} disabled hidden>
                    {"Select Profession"}
                  </MenuItem>
                  <MenuItem value={"carpenter"}>{"Carpenter"}</MenuItem>
                  <MenuItem value={"plumber"}>{"Plumber"}</MenuItem>
                  <MenuItem value={"electrician"}>{"Electrician"}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={location}
                  label="Location"
                  onChange={changeLocationHandler}
                >
                  <MenuItem value={"none"} disabled hidden>
                    {"Select Location"}
                  </MenuItem>
                  <MenuItem value={"surat"}>{"Surat"}</MenuItem>
                  <MenuItem value={"anand"}>{"Anand"}</MenuItem>
                  <MenuItem value={"vadodara"}>{"Vadodara"}</MenuItem>
                  <MenuItem value={"ahmedabad"}>{"Ahmedabad"}</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Amount"
                variant="outlined"
                onChange={changeAmountHandler}
                type="number"
                value={amount}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Apply
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={clearFilter}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Box>
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
