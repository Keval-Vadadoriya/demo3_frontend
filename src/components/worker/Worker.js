import React, { Fragment, useEffect, useState } from "react";
import WorkerCard from "./WorkerCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { snackbarActions } from "../../store/snackbar-slice";
import {
  Stack,
  Pagination,
  CircularProgress,
  Grid,
  Container,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  Box,
} from "@mui/material";

import {
  getAllWorkers,
  filterWorkers,
} from "../../store/actions/workers-action";

const Worker = () => {
  const [location, setLocation] = useState("none");
  const [profession, setProfession] = useState("none");
  const [review, setReview] = useState("none");
  const [availability, setAvailability] = useState("none");
  const [filtered, setFiltered] = useState(false);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { status, workers, count, errorMessage } = useSelector(
    (state) => state.workerslist
  );

  useEffect(() => {
    if (errorMessage === "No Workers Found") {
      dispatch(
        snackbarActions.setSnackbar({
          open: true,
          severity: "error",
          message: errorMessage,
        })
      );
    }
  }, [errorMessage]);

  const handleChange = (event, value) => {
    setPage(value);
    if (filtered) {
      dispatch(
        filterWorkers({
          location,
          profession,
          review,
          availability,
          skip: (value - 1) * 3,
        })
      );
    } else {
      dispatch(getAllWorkers({ skip: (value - 1) * 3 }));
    }
  };
  const changeLocationHandler = (event) => {
    setLocation(event.target.value);
  };
  const changeReviewHandler = (event) => {
    setReview(event.target.value);
  };
  const changeProfessionHandler = (event) => {
    setProfession(event.target.value);
  };
  const changeAvailabilityHandler = (event) => {
    setAvailability(event.target.value);
  };
  const clearFilter = () => {
    setLocation("none");
    setReview("none");
    setProfession("none");
    setAvailability("none");

    setFiltered(false);
  };
  const filterWorkersBy = async (event) => {
    event.preventDefault();
    setFiltered(true);
    dispatch(filterWorkers({ location, profession, review, availability }));
  };

  useEffect(async () => {
    dispatch(getAllWorkers({ skip: 0 }));
  }, []);
  let workerList;
  if (workers) {
    workerList = workers.map((worker) => (
      <Box component={Link} to={`${worker._id}`} key={worker._id}>
        <WorkerCard
          name={worker.name}
          profession={worker.profession}
          avatar={worker.avatar}
          description={worker.description}
          availability={worker.availability}
        />
      </Box>
    ));
  }

  return (
    <Fragment>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Availability
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={availability}
                  label="availability"
                  onChange={changeAvailabilityHandler}
                >
                  <MenuItem value={"none"} disabled hidden>
                    {"Availability"}
                  </MenuItem>
                  <MenuItem value={true}>{"Available"}</MenuItem>
                  <MenuItem value={false}>{"Not Available"}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">review</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={review}
                  label="review"
                  onChange={changeReviewHandler}
                >
                  <MenuItem value={"none"} disabled>
                    {"Select Review"}
                  </MenuItem>
                  <MenuItem value={0}>{">0"}</MenuItem>
                  <MenuItem value={1}>{">1"}</MenuItem>
                  <MenuItem value={2}>{">2"}</MenuItem>
                  <MenuItem value={3}>{">3"}</MenuItem>
                  <MenuItem value={4}>{">4"}</MenuItem>
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
        </Box>
        <Container fixed>
          {status === "loading" && <CircularProgress />}
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>{workerList}</Box>

          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(count / 3)}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </Container>
      </Box>
    </Fragment>
  );
};

export default Worker;
