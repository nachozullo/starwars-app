import { useCallback, useEffect, useState } from "react";

const useGetAPI = (url, initialFetch = true) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const get = useCallback(
    (newUrl = url) => {
      setLoading(true);
      setError(false);
      setData(null);
      fetch(newUrl)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => {
          console.error(err);
          setError(true);
        })
        .finally(() => setLoading(false));
    },
    [url]
  );

  useEffect(() => {
    if (initialFetch && url) get();
  }, [initialFetch, get, url]);

  return {
    loading,
    data,
    error,
    setError,
    get,
  };
};

export default useGetAPI;
