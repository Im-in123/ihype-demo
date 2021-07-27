import {
 currentSeriesVideoAction,
 secondChangeAction,
 userDetailAction, 
 currentPageMovieAction, 
 currentPageSeriesAction,
 currentPageHomeAction,
 currentPageWatchlistAction
} from "./actions";

export const currentVideoState = {
  currentVideo: "heya",
};

export const secondChangeState = {
  secondChange: false,
};

export const userDetailState = {
  userDetail: null,
};

export const currentPageMovieState = {
  currentPageMovie: 1,
};

export const currentPageSeriesState = {
  currentPageSeries: 1,
};

export const currentPageHomeState = {
  currentPageHome: 1,
};

export const currentPageWatchlistState = {
  currentPageWatchlist: 1,
};

export const currentVideoReducer= (state, action) => {
  if (action.type === currentSeriesVideoAction) {
    return {
      ...state,
      currentVideo: action.payload,
    };
  } else {
    return state;
  }
};

export const secondChangeReducer= (state, action) => {
  if (action.type === secondChangeAction) {
    return {
      ...state,
      secondChange: action.payload,
    };
  } else {
    return state;
  }
};


export const userDetailReducer = (state, action) => {
  if (action.type === userDetailAction) {
    return {
      ...state,
      userDetail: action.payload,
    };
  } else {
    return state;
  }
};


export const currentPageMovieReducer= (state, action) => {
  if (action.type === currentPageMovieAction) {
    return {
      ...state,
      currentPageMovie: action.payload,
    };
  } else {
    return state;
  }
};

export const currentPageSeriesReducer= (state, action) => {
  if (action.type === currentPageSeriesAction) {
    return {
      ...state,
      currentPageSeries: action.payload,
    };
  } else {
    return state;
  }
};

export const currentPageHomeReducer= (state, action) => {
  if (action.type === currentPageHomeAction) {
    return {
      ...state,
      currentPageHome: action.payload,
    };
  } else {
    return state;
  }
};

export const currentPageWatchlistReducer= (state, action) => {
  if (action.type === currentPageWatchlistAction) {
    return {
      ...state,
      currentPageWatchlist: action.payload,
    };
  } else {
    return state;
  }
};