import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useHttp from "../../custom-hooks/useHttp";
let worker;
function WorkerProfile() {
  const [isLoading, error, sendRequest] = useHttp();
  const [data, setData] = useState(false);
  const workerid = useParams();
  useEffect(async () => {
    worker = await sendRequest({
      url: `http://127.0.0.1:3001/getworker/${workerid.workerid}`,
    });
    console.log(worker);
    setData(true);
  }, []);

  //   console.log(x);
  return (
    <div>
      {!data && <h1>Loading</h1>}
      {!isLoading && data && <h1>{worker.name}</h1>}
      <Link to={`review/${workerid.workerid}`} className="btn btn-primary">
        Reviews
      </Link>
    </div>
  );
}

export default WorkerProfile;
