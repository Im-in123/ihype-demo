import {
 currentSeriesVideoAction,
 secondChangeAction,
 userDetailAction, 
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
