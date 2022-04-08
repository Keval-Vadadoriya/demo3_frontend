import React, { Fragment, useEffect, useState } from "react";
import WorkerCard from "./WorkerCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { snackbarActions } from "../../store/snackbar-slice";
import WorkerFilter from "./WorkerFilter";
import {
  Stack,
  Pagination,
  CircularProgress,
  Grid,
  Container,
  Box,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Fade,
  Slide,
} from "@mui/material";

import {
  workersActions,
  getAllWorkers,
  filterWorkers,
} from "../../store/actions/workers-action";
import { useTheme } from "@mui/styles";

const Worker = () => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:600px)");
  const [location, setLocation] = useState("none");
  const [profession, setProfession] = useState("none");
  const [review, setReview] = useState("none");
  const [availability, setAvailability] = useState("none");
  const [filtered, setFiltered] = useState(false);
  const [filter, setFilter] = useState(false);
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
      dispatch(workersActions.setErrorMessage({ errorMessage: "" }));
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
    setFilter(false);
    dispatch(filterWorkers({ location, profession, review, availability }));
  };

  useEffect(async () => {
    dispatch(getAllWorkers({ skip: 0 }));
  }, []);
  let workerList;
  if (workers) {
    workerList = workers.map((worker) => (
      // <Grid item xs={12} md={4} key={worker._id}>
      <Box
        component={Link}
        to={`${worker._id}`}
        sx={{
          textDecoration: "none",
        }}
      >
        <WorkerCard
          name={worker.name}
          profession={worker.profession}
          avatar={worker.avatar}
          availability={worker.availability}
          review={worker.review}
        />
      </Box>
      // </Grid>
    ));
  }

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Box
          sx={{
            height: { xs: "auto", md: "91.5vh" },
            display: "flex",

            flexDirection: "column",
            backgroundColor: {
              xs: theme.palette.third.extra,
            },
          }}
        >
          {!matches && (
            <WorkerFilter
              profession={profession}
              location={location}
              clearFilter={clearFilter}
              filterWorkersBy={filterWorkersBy}
              changeLocationHandler={changeLocationHandler}
              changeProfessionHandler={changeProfessionHandler}
              review={review}
              changeReviewHandler={changeReviewHandler}
              availability={availability}
              changeAvailabilityHandler={changeAvailabilityHandler}
            />
          )}
          {matches && (
            <Button
              variant="contained"
              onClick={() => setFilter(true)}
              sx={{
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.third.extra,
              }}
            >
              Filter
            </Button>
          )}
        </Box>
        <Container
          fixed
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <Grid container> */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: { xs: "column", md: "row" },
              flexWrap: "wrap",
            }}
          >
            {workerList}
          </Box>
          {/* </Grid> */}

          <Stack spacing={2} sx={{}} alignSelf="center">
            <Pagination
              count={Math.ceil(count / 3)}
              page={page}
              onChange={handleChange}
              variant="outlined"
              color="secondary"
              sx={{ backgroundColor: theme.palette.third.extra }}
            />
          </Stack>
        </Container>
      </Box>
      <Dialog fullScreen={matches} open={filter} TransitionComponent={Slide}>
        <DialogTitle
          backgroundColor={theme.palette.secondary.main}
          sx={{ color: "white", fontFamily: "Arvo" }}
        >
          Filter Workers
        </DialogTitle>
        <DialogContent>
          <WorkerFilter
            profession={profession}
            location={location}
            clearFilter={clearFilter}
            filterWorkersBy={filterWorkersBy}
            changeLocationHandler={changeLocationHandler}
            changeProfessionHandler={changeProfessionHandler}
            review={review}
            changeReviewHandler={changeReviewHandler}
            availability={availability}
            changeAvailabilityHandler={changeAvailabilityHandler}
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
    </Fragment>
  );
};

export default Worker;
