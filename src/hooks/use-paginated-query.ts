import { useCallback, useEffect, useState } from "react";

export type QueryPaginatedArg = {
  offset: number;
  limit: number;
};

export type QueryFetcher<Data> = (
  pagination: QueryPaginatedArg
) => Promise<QueryFetcherResult<Data>>;

export type QueryFetcherResult<Data> = {
  data: Data;
  hasNextPage: boolean;
};

export type QueryPaginatedResult<Data, Err = Error> =
  | {
      data: Data[];
      error: undefined;
      isLoading: boolean;
      fetchNextPage: () => void;
    }
  | {
      data: Data[];
      error: Err;
      isLoading: boolean;
      fetchNextPage: () => void;
    }
  | {
      data: Data[];
      error: undefined;
      isLoading: true;
      fetchNextPage: undefined;
    };

export function usePaginatedQuery<Data, Err = Error>(
  fetcher: QueryFetcher<Data>,
  limit: number
) {
  const [result, setResult] = useState<QueryPaginatedResult<Data, Err>>({
    data: [],
    error: undefined,
    isLoading: true,
    fetchNextPage: undefined,
  });

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(0);
    setResult({
      data: [],
      error: undefined,
      isLoading: true,
      fetchNextPage: undefined,
    });
  }, [fetcher, setOffset]);

  useEffect(() => {
    setResult((result) => ({
      ...result,
      isLoading: true,
    }));

    fetcher({
      offset,
      limit,
    })
      .then(({ data, hasNextPage }) =>
        setResult((result) => ({
          data: [...(result.data ?? []), data],
          error: undefined,
          isLoading: false,
          fetchNextPage: () => {
            if (hasNextPage) {
              setOffset((offset) => offset + limit);
            }
          },
        }))
      )
      .catch((error) =>
        setResult((result) => ({
          data: result.data,
          error,
          isLoading: false,
          fetchNextPage: () => {},
        }))
      );
  }, [offset, fetcher, limit, setResult]);

  return result;
}
