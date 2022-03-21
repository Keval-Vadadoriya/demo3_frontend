import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getWorker } from "../../store/actions/workers-action";
import { useDispatch, useSelector } from "react-redux";
function WorkerProfile() {
  const dispatch = useDispatch();
  const { status, worker, errorMessage } = useSelector(
    (state) => state.workerslist
  );
  const workerid = useParams();
  useEffect(async () => {
    dispatch(getWorker(workerid.workerid));
  }, []);

  return (
    <div>
      {status === "loading" && <h1>Loading</h1>}
      {errorMessage && <p>{errorMessage}</p>}
      {status !== "loading" && worker && <h1>{worker.name}</h1>}
      <Link to={`review/${workerid.workerid}`}>Reviews</Link>
      <br />
      <Link to={`/home/chats/${workerid.workerid}`}>Chat</Link>
    </div>
  );
}

export default WorkerProfile;
