import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getWorker } from "../../store/actions/workers-action";
import { useDispatch, useSelector } from "react-redux";
function MyProjectProfile() {
  const dispatch = useDispatch();
  const { status, worker, errorMessage } = useSelector(
    (state) => state.workerslist
  );
  const token = useSelector((state) => state.login.token);

  const workerid = useParams();
  useEffect(async () => {
    dispatch(getWorker({ token, workerId: workerid.workerid }));
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

export default MyProjectProfile;
