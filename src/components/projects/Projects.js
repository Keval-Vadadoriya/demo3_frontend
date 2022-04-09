import React, { Fragment, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import ProjectFilter from "./ProjectFilter";
import {
  Stack,
  Pagination,
  Grid,
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
import { useTheme } from "@mui/styles";

const Projects = () => {
  const theme = useTheme();
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
  const filterProjectsBy = async (event) => {
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
          backgroundColor: theme.palette.primary.main,
          flexDirection: { xs: "column", md: "row" },
          height: "92.5vh",
          width: "100%",
        }}
      >
        <Box
          sx={{
            minWidth: 300,
            maxWidth: { xs: "100%", md: 200 },
            boxSizing: "border-box",
            display: "flex",
            backgroundColor: {
              xs: theme.palette.third.extra,
            },
            height: { xs: "80px", md: "98%" },
            width: { xs: "100%", md: "auto" },
            margin: { xs: 0, md: 0 },
            padding: { xs: 0, md: 2 },
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: { xs: "center", md: "flex-start" },
            flexDirection: { xs: "row", md: "column" },
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setFilter(true);
            }}
            sx={{
              width: "200px",
              backgroundColor: "orange",
              margin: "10px",
              display: { xs: "auto", md: "none" },
            }}
          >
            Filter
          </Button>
          <Dialog fullScreen={matches} open={filter}>
            <DialogTitle backgroundColor="orange">Filter By</DialogTitle>
            <DialogContent>
              <ProjectFilter
                profession={profession}
                location={location}
                clearFilter={clearFilter}
                filterProjectsBy={filterProjectsBy}
                changeLocationHandler={changeLocationHandler}
                changeProfessionHandler={changeProfessionHandler}
              />
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
              display: { xs: "none", md: "block" },
              marginBottom: "10px",
              color: theme.palette.secondary.main,
              fontFamily: "Arvo",
            }}
          >
            Filter By
          </Typography>

          {!matches && (
            <ProjectFilter
              profession={profession}
              location={location}
              clearFilter={clearFilter}
              filterProjectsBy={filterProjectsBy}
              changeLocationHandler={changeLocationHandler}
              changeProfessionHandler={changeProfessionHandler}
            />
          )}

          <Typography
            variant="h4"
            sx={{
              display: { xs: "none", md: "block" },
              color: theme.palette.secondary.main,
              marginBottom: "10px",
              fontFamily: "Arvo",
            }}
          >
            Sort By
          </Typography>
          <Grid container>
            <Grid item xs={12} md={12} sx={{ margin: "10px" }}>
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
          {projectList}

          <Stack spacing={2} sx={{ alignSelf: "center" }}>
            <Pagination
              count={Math.ceil(count / 3)}
              page={page}
              onChange={handleChange}
              variant="outlined"
              color="secondary"
              sx={{ backgroundColor: theme.palette.third.extra }}
            />
          </Stack>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Projects;
