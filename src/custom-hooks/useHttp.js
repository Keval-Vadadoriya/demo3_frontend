import { useState } from "react";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (requestConfig) => {
    setIsLoading(true);
    setError(null);
    let response;

    try {
      const x = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });

      const y = await x.json();
      if (x.ok === false) {
        throw new Error(y.Error);
      }
      response = y;
    } catch (error) {
      setError(error || "Something went wrong");
    }
    setIsLoading(false);
    return response;
  };
  return [isLoading, error, sendRequest];
};
export default useHttp;
