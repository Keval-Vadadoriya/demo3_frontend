import React, { Fragment, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import {
  Stack,
  Pagination,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";

import {
  filterProjects,
  getAllProjects,
} from "../../store/actions/project-actions";

const Projects = () => {
  const matches = useMediaQuery("(max-width:600px)");
  const [location, setLocation] = useState("none");
  const [profession, setProfession] = useState("none");
  const [filtered, setFiltered] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("none");
  const [filter, setFilter] = useState(false);

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.workerslist);
  const { projects, count } = useSelector((state) => state.project);

  const changeSortHandler = (event) => {
    dispatch(
      filterProjects({
        location,
        profession,
        sort: event.target.value,
        skip: 0,
      })
    );
    setSort(event.target.value);
  };

  const handleChange = (_, value) => {
    setPage(value);
    if (filtered) {
      dispatch(
        filterProjects({
          location,
          profession,
          sort,
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

  const changeProfessionHandler = (event) => {
    setProfession(event.target.value);
  };

  const clearFilter = () => {
    setLocation("none");
    setProfession("none");

    dispatch(
      filterProjects({
        location: "none",
        profession: "none",
        sort,
        money: 0,
        skip: 0,
      })
    );
    setFiltered(false);
  };
  const filterWorkersBy = async (event) => {
    event.preventDefault();
    setFiltered(true);
    setFilter(false);
    dispatch(filterProjects({ location, profession, sort, skip: 0 }));
  };

  useEffect(async () => {
    dispatch(getAllProjects({ skip: 0 }));
  }, []);
  let projectList;
  if (projects) {
    projectList = projects.map((project) => (
      <ProjectCard project={project} key={project._id} />
    ));
  }

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            minWidth: 160,
            maxWidth: { xs: "100%", md: 200 },
            margin: 2,
            display: "flex",
            flexDirection: { xs: "row-reverse", md: "column" },
          }}
        >
          <Button
            onClick={() => {
              setFilter(true);
            }}
            sx={{
              display: { xs: "inline", md: "none" },
            }}
          >
            Filter data
          </Button>
          <Dialog fullScreen={matches} open={filter}>
            <DialogTitle>Filter By</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>
              <Grid
                container
                spacing={2}
                component="form"
                noValidate
                onSubmit={filterWorkersBy}
              >
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
                    <InputLabel id="demo-simple-select-label">
                      Location
                    </InputLabel>
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
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setFilter(false);
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Typography
            variant="h4"
            sx={{
              visibility: { xs: "hidden", md: "visible" },
              marginBottom: "10px",
            }}
          >
            Filter By
          </Typography>

          <Grid
            container
            spacing={2}
            component="form"
            noValidate
            onSubmit={filterWorkersBy}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
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

          <Typography
            variant="h4"
            sx={{
              visibility: { xs: "hidden", md: "visible" },
              marginBottom: "10px",
            }}
          >
            Sort By
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="sortBy">Sort By</InputLabel>
                <Select
                  labelId="sortBy"
                  id="sortBy"
                  value={sort}
                  label="SortBy"
                  onChange={changeSortHandler}
                >
                  <MenuItem value={"none"} disabled hidden>
                    {"Select Sort Option"}
                  </MenuItem>
                  <MenuItem value="latest">Latest</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                  <MenuItem value="highestPrice">Highest Price</MenuItem>
                  <MenuItem value="lowestPrice">Lowest Price</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            // overflow: "scroll",
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {status === "loading" && <Typography>Loading</Typography>}
          {projectList}
          {errorMessage && <p>{errorMessage}</p>}

          <Stack
            spacing={2}
            sx={{ alignSelf: "center", position: "sticky", bottom: 0 }}
          >
            <Pagination
              count={Math.ceil(count / 3)}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Projects;
