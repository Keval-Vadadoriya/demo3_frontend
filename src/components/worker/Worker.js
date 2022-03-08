import React, { Fragment, useEffect, useState } from "react";
import WorkerCard from "./WorkerCard";
import useHttp from "../../custom-hooks/useHttp";
import { Link } from "react-router-dom";
import classes from "./Worker.module.css";

let workers;
const Worker = () => {
  const [data, setData] = useState(false);
  const [isLoading, errror, sendRequest] = useHttp();
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [review, setReview] = useState("");
  console.log("sdkf", profession);

  const changeLocationHandler = (event) => {
    setLocation(event.target.value);
  };
  const changeReviewHandler = (event) => {
    setReview(event.target.value);
  };
  const changeProfessionHandler = (event) => {
    setProfession(event.target.value);
  };
  const clearFilter = () => {
    setLocation("");
    setReview("");
    setProfession("");
  };
  const filterWorkers = async (event) => {
    event.preventDefault();
    setData(false);
    workers = await sendRequest({
      url: `http://127.0.0.1:3001/filterworkers?${
        location ? `location=${location}` : ""
      }&&${profession ? `profession=${profession}` : ""}&&${
        review ? `review=${review}` : ""
      }`,
    });
    setData(true);
  };

  useEffect(async () => {
    workers = await sendRequest({
      url: `http://127.0.0.1:3001/getallworkers`,
    });
    setData(true);
  }, []);
  let workerList;
  if (data && workers) {
    workerList = workers.map((worker) => (
      <Link to={`${worker._id}`} className={classes.link} key={worker._id}>
        <WorkerCard name={worker.name} profession={worker.profession} />
      </Link>
    ));
  }

  return (
    <Fragment>
      <div>
        <form onSubmit={filterWorkers}>
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
      <div>
        {isLoading && <h1>hey</h1>}
        {data && workerList}
      </div>
    </Fragment>
  );
};

export default Worker;
