import React, { createContext, useReducer } from "react";
import {
  currentVideoState,
  currentVideoReducer,
  secondChangeState,
  secondChangeReducer,
  userDetailState,
  userDetailReducer

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
 userDetailReducer
);

const initialState = {
  ...currentVideoState,
  ...secondChangeState,
  ...userDetailState
};

const store = createContext(initialState);
const { Provider } = store;

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combinedReducers, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StoreProvider };
