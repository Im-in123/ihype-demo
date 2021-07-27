import React, { createContext, useReducer } from "react";
import {
  currentVideoState,
  currentVideoReducer,
  secondChangeState,
  secondChangeReducer,
  userDetailState,
  userDetailReducer,
  currentPageMovieState,
  currentPageMovieReducer,
  currentPageSeriesState,
  currentPageSeriesReducer,
  currentPageHomeState,
  currentPageHomeReducer,
  currentPageWatchlistState,
  currentPageWatchlistReducer

} from "./reducers";

const reduceReducers = (...reducers) => (prevState, value, ...args) => {
  return reducers.reduce(
    (newState, reducer) => reducer(newState, value, ...args),
    prevState
  );
};

const combinedReducers = reduceReducers(
 currentVideoReducer,
 secondChangeReducer,
 userDetailReducer,
 currentPageMovieReducer,
 currentPageSeriesReducer,
 currentPageHomeReducer,
 currentPageWatchlistReducer
);

const initialState = {
  ...currentVideoState,
  ...secondChangeState,
  ...userDetailState,
  ...currentPageMovieState,
  ...currentPageSeriesState,
  ...currentPageHomeState,
  ...currentPageWatchlistState
};

const store = createContext(initialState);
const { Provider } = store;

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combinedReducers, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StoreProvider };
