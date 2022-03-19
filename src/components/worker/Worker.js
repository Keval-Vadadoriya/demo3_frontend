import React, { Fragment, useEffect, useState } from "react";
import WorkerCard from "./WorkerCard";
import { Link } from "react-router-dom";
import classes from "./Worker.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllWorkers,
  filterWorkers,
} from "../../store/actions/workers-action";

const Worker = () => {
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [review, setReview] = useState("");
  const [availability, setAvailability] = useState(null);
  const dispatch = useDispatch();
  const { status, workers, errorMessage } = useSelector(
    (state) => state.workerslist
  );

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
    setLocation("");
    setReview("");
    setProfession("");
    setAvailability(null);
  };
  const filterWorkersBy = async (event) => {
    event.preventDefault();
    dispatch(filterWorkers({ location, profession, review, availability }));
  };

  useEffect(async () => {
    dispatch(getAllWorkers());
  }, []);
  let workerList;
  if (workers) {
    workerList = workers.map((worker) => (
      <Link to={`${worker._id}`} className={classes.link} key={worker._id}>
        <WorkerCard name={worker.name} profession={worker.profession} />
      </Link>
    ));
  }

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
              <option value="">select profession</option>
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
              <option value="" disabled hidden>
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
              <option value="" disabled hidden>
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
              <option value="" disabled hidden>
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
          {status === "loading" && <h1>Loading</h1>}
          {workerList}
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    </Fragment>
  );
};

export default Worker;
