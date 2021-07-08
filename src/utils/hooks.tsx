import * as React from "react";

function useSafeDispatch<T>(dispatch: React.Dispatch<T>) {
  const mounted = React.useRef(false);
  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return React.useCallback(
    (action: T) => {
      mounted.current ? dispatch(action) : void 0;
    },
    [dispatch]
  );
}

type AsyncState<T> = {
  status: "idle" | "pending" | "rejected" | "resolved";
  data: T | null;
  error: Error | null;
};

type AsyncAction<T> =
  | { data: T; status: "resolved" }
  | { error: Error; status: "rejected" }
  | { status: "pending" }
  | AsyncState<T>;

// Example usage:
// const {data, error, status, run} = useAsync()
// React.useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
const defaultInitialState = { status: "idle", data: null, error: null };
function useAsync<T>(initialState: AsyncState<T>) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ status, data, error }, setState] = React.useReducer(
    (s: AsyncState<T>, a: AsyncAction<T>) => ({
      ...s,
      ...a,
    }),
    initialStateRef.current
  );

  const safeSetState = useSafeDispatch<AsyncAction<T>>(setState);

  const setData = React.useCallback(
    (data: T) => safeSetState({ data, status: "resolved" }),
    [safeSetState]
  );
  const setError = React.useCallback(
    (error: Error) => safeSetState({ error, status: "rejected" }),
    [safeSetState]
  );
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState]
  );

  const run = React.useCallback(
    (promise: Promise<T>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }
      safeSetState({ status: "pending" });
      return promise.then(
        (data) => {
          setData(data);
          return data;
        },
        (error) => {
          setError(error);
          return Promise.reject(error);
        }
      );
    },
    [safeSetState, setData, setError]
  );

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}

export { useAsync };
