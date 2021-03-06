import { useEffect, useState } from "react";
import { httpToHttps } from "../utils/utils";

const useGetAll = (data, arrayName) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data?.[arrayName].length > 0) {
      setLoading(true);
      Promise.all(
        data[arrayName].map(item =>
          fetch(httpToHttps(item))
            .then(res => res.json())
            .catch(err => console.error(err))
        )
      )
        .then(results => setResults(results))
        .finally(() => setLoading(false));
    }
  }, [data?.[arrayName], arrayName, data]);

  return [results, loading];
};

export default useGetAll;
