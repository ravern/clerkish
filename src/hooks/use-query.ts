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

    let maybeSetResult: typeof setResult | null = setResult;
    fetcher()
      .then((data) =>
        maybeSetResult?.({
          data,
          error: undefined,
          isLoading: false,
        })
      )
      .catch((error) =>
        maybeSetResult?.({
          data: undefined,
          error,
          isLoading: false,
        })
      );

    return () => {
      maybeSetResult = null;
    };
  }, [fetcher, setResult]);

  return result;
}
