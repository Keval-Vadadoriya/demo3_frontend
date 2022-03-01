import { useState } from "react";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errror, setError] = useState(null);

  const sendRequest = async (requestConfig) => {
    let response = null;
    setIsLoading(true);
    setError(null);

    try {
      const x = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });

      if (x.ok === false) {
        throw new Error("Something went wrong");
      }

      response = await x.json();
    } catch (error) {
      setError(error || "Something went wrong");
    }

    setIsLoading(false);
    return response;
  };
  return [isLoading, errror, sendRequest];
};
export default useHttp;
