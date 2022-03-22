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
  const [location, setLocation] = useState("none");
  const [profession, setProfession] = useState("none");
  const [review, setReview] = useState("none");
  const [availability, setAvailability] = useState("none");
  const [filtered, setFiltered] = useState(false);
  const token = useSelector((state) => state.login.token);

  const dispatch = useDispatch();
  const { status, workers, count, errorMessage } = useSelector(
    (state) => state.workerslist
  );
  const newPage = (event) => {
    console.log(event.target.innerHTML);
    if (filtered) {
      dispatch(
        filterWorkers({
          token,
          location,
          profession,
          review,
          availability,
          skip: event.target.innerHTML * 3,
        })
      );
    } else {
      dispatch(getAllWorkers({ token, skip: event.target.innerHTML * 3 }));
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
    dispatch(
      filterWorkers({ token, location, profession, review, availability })
    );
  };

  useEffect(async () => {
    dispatch(getAllWorkers({ token, skip: 0 }));
  }, []);
  let workerList;
  if (workers) {
    workerList = workers.map((worker) => (
      <Link to={`${worker._id}`} className={classes.link} key={worker._id}>
        <WorkerCard name={worker.name} profession={worker.profession} />
      </Link>
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
          {status === "loading" && <h1>Loading</h1>}
          {workerList}
          {errorMessage && <p>{errorMessage}</p>}
          <div className={classes.pagination}>
            <Link to="#">&laquo;</Link>
            {count && pageList}
            <Link to="#">&raquo;</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Worker;
