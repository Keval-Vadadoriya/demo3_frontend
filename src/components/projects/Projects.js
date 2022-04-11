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
          skip: (value - 1) * 10,
        })
      );
    } else {
      dispatch(getAllProjects({ skip: (value - 1) * 10 }));
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
  const filterProjectsBy = (event) => {
    console.log("first");
    event.preventDefault();
    setFiltered(true);
    setFilter(false);
    dispatch(filterProjects({ location, profession, sort, skip: 0 }));
    console.log("second");
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
          flexDirection: { xs: "column", md: "row" },
          backgroundColor: theme.palette.primary.main,
          width: { xs: "100%", md: "99%" },
        }}
      >
        <Box
          sx={{
            height: { xs: "80px", md: "90vh" },
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: { xs: "center", md: "flex-start" },
            flexDirection: { xs: "row", md: "column" },
            position: { xs: "auto", md: "sticky" },
            top: { xs: "0", md: "79px" },
            minWidth: 300,
            maxWidth: { xs: "100%", md: 200 },
            boxSizing: "border-box",
            backgroundColor: {
              xs: theme.palette.third.extra,
            },
            padding: { xs: 0, md: 2 },
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
            <DialogTitle
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.third.light,
                fontFamily: "Arvo",
              }}
            >
              Filter By
            </DialogTitle>
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
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingTop: { xs: "10px", md: "0" },
          }}
        >
          {projectList}

          <Stack spacing={2} sx={{ alignSelf: "center" }}>
            <Pagination
              count={Math.ceil(count / 10)}
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
