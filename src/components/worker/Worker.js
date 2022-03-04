import React, { useEffect, useState } from "react";
import WorkerCard from "./WorkerCard";
import useHttp from "../../custom-hooks/useHttp";
import { Link, Outlet } from "react-router-dom";
import classes from "./Worker.module.css";
let workers;
const Worker = () => {
  const [data, setData] = useState(false);
  const [isLoading, errror, sendRequest] = useHttp();

  useEffect(async () => {
    workers = await sendRequest({
      url: `http://127.0.0.1:3001/getallworkers`,
    });
    setData(true);
  }, []);
  let workerList;
  if (data) {
    workerList = workers.map((worker) => (
      <Link to={`${worker._id}`} className={classes.link} key={worker._id}>
        <WorkerCard name={worker.name} profession={worker.profession} />
      </Link>
    ));
  }

  return (
    <div>
      {/* <Outlet /> */}
      {isLoading && <h1>hey</h1>}
      {data && workerList}
    </div>
  );
};

export default Worker;
