// const BASE_URL ="http://192.168.43.77:8000/"; 
const BASE_URL = "http://127.0.0.1:8000/";
// const BASE_URL ="https://ihype.herokuapp.com/"; 

export const LOGIN_URL = BASE_URL + "user/login";
export const SIGNUP_URL = BASE_URL + "user/signup";
export const ME_URL = BASE_URL + "user/me";
export const PROFILE_URL = BASE_URL + "user/profile";
export const REFRESH_URL = BASE_URL + "user/refresh";
export const LOGOUT_URL = BASE_URL + "user/logout";

export const VIDEO_URL = BASE_URL + "videos/";
export const MOVIE_URL = BASE_URL + "movies/";
export const SERIES_URL = BASE_URL + "series/";
export const WATCHLIST_URL = BASE_URL + "watchlist/";

export const ADD_TO_LIST_URL = BASE_URL + "update-watchlist";
export const CHECK_WATCHLIST_URL = BASE_URL + "check-watchlist";

export const SECONDARY_EMAIL_VERIFICATION = BASE_URL + "user/secondary-email-verification";

export const FORGOT_PASSWORD_URL = BASE_URL + "user/request-reset-password";

export const CHANGE_PASSWORD_URL = BASE_URL + "user/change-password";

export const LOCAL_CHECK = false;
// export const LOCAL_CHECK = true;
