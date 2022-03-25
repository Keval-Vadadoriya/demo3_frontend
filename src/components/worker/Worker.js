import React, { Fragment, useEffect, useState } from "react";
import WorkerCard from "./WorkerCard";
import { Link, NavLink } from "react-router-dom";
import classes from "./Worker.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Stack,
  Pagination,
  CircularProgress,
  Grid,
  Container,
} from "@mui/material";

import {
  getAllWorkers,
  filterWorkers,
} from "../../store/actions/workers-action";
import { Box } from "@mui/system";

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
      <Link to={`${worker._id}`} className={classes.link} key={worker._id}>
        <WorkerCard
          name={worker.name}
          profession={worker.profession}
          avatar={worker.avatar}
          description={worker.description}
        />
      </Link>
    ));
  }

  return (
    <Fragment>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <div className={classes.x}>
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
            <select
              name="availability"
              id="availability"
              onChange={changeAvailabilityHandler}
              value={availability}
            >
              <option value="none" disabled hidden>
                select status
              </option>
              <option value={true}>Available</option>
              <option value={false}>Not Available</option>
            </select>
            <select
              name="review"
              id="review"
              onChange={changeReviewHandler}
              value={review}
            >
              <option value="none" disabled hidden>
                select review
              </option>
              <option value="0">{`>0`}</option>
              <option value="1">{`>1`}</option>
              <option value="2">{`>2`}</option>
              <option value="3">{`>3`}</option>
              <option value="4">{`>4`}</option>
            </select>
            <input type="submit" value="Apply"></input>
            <button onClick={clearFilter}>clear</button>
          </form>
        </div>
        <div className={classes.workerlist}>
          {status === "loading" && <CircularProgress />}
          <Box sx={{ display: "flex", flexWrap: "wrap", zIndex: 1 }}>
            {workerList}
          </Box>
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
      </Box>
    </Fragment>
  );
};

export default Worker;
