import { useEffect, useState } from "react";

export type QueryFetcher<Data> = () => Promise<Data>;

export type QueryResult<Data, Err = Error> =
  | {
      data: Data;
      error: undefined;
      isLoading: boolean;
    }
  | {
      data: undefined;
      error: Err;
      isLoading: boolean;
    }
  | {
      data: undefined;
      error: undefined;
      isLoading: true;
    };

export function useQuery<Data, Err = Error>(fetcher: QueryFetcher<Data>) {
  const [result, setResult] = useState<QueryResult<Data, Err>>({
    data: undefined,
    error: undefined,
    isLoading: true,
  });

  useEffect(() => {
    setResult((result) => ({
      ...result,
      isLoading: true,
    }));

    fetcher()
      .then((data) =>
        setResult({
          data,
          error: undefined,
          isLoading: false,
        })
      )
      .catch((error) =>
        setResult({
          data: undefined,
          error,
          isLoading: false,
        })
      );
  }, [fetcher, setResult]);

  return result;
}
