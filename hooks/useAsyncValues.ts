import { useEffect, useState } from "react";
import { AsyncResponse } from "./AsyncResponse";

export default function useAsyncValues<T>(
  asyncCallback: () => Promise<T>,
): AsyncResponse<T> {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    asyncCallback()
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e);
        setIsLoading(false);
      });
  }, [asyncCallback]);

  return { data, isLoading, error };
}
