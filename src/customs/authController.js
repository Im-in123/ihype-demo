import React, { useEffect, useState, useContext } from "react";
import Loader from "../components/loader";
import { axiosHandler, getToken } from "../helper";
import { REFRESH_URL, ME_URL, LOGOUT_URL } from "../urls";
import { store } from "../stateManagement/store";
import { userDetailAction } from "../stateManagement/actions";
require("regenerator-runtime/runtime");

export const tokenName = "iHypetokenName";

export const logout = (props) => {
  if (localStorage.getItem(tokenName)) {
    axiosHandler({
      method: "get",
      url: LOGOUT_URL,
      token: getToken(),
    });
  }
  localStorage.removeItem(tokenName);
  //localStorage.removeItem(LastUserChat);
  window.location.href = "/login";
};

export const checkAuthState = async (setChecking, dispatch, props) => {
  console.log("setchecking::::", setChecking);
  console.log("dispatch:::::", dispatch);
  console.log("props:::::", props);
  let token = localStorage.getItem(tokenName);
  if (!token) {
    console.log("logging out");
    logout(props);
    return;
  }
  token = JSON.parse(token);
  console.log("getting user profile");
  const userProfile = await axiosHandler({
    method: "get",
    url: ME_URL,
    token: token.access,
  }).catch((e) => {
    console.log(e, "error on getting userprofile");
    if (e.response) {
      console.log("Request made and server responded");
      console.log("e response.data:::", e.response.data);
      console.log("e response,status:::", e.response.status);
      console.log(" response.headers:::", e.response.headers);
    } else if (e.request) {
      // The request was made but no response was received
      console.log("e request:::", e.request);
    }
  });
  if (userProfile) {
    console.log("got userprofile");
    console.log(userProfile.data, "userprofiledata..");
    dispatch({ type: userDetailAction, payload: userProfile.data });
    setChecking(false);
    return;
    // window.location.href = "/verify";
  }
  console.log("getting new access");
  const getNewAccess = await axiosHandler({
    method: "post",
    url: REFRESH_URL,
    data: {
      refresh: token.refresh,
    },
  }).catch((e) => {
    console.log(e, "error on getting new access");
    if (e.response) {
      console.log("Request made and server responded");
      console.log("e response.data2:::", e.response.data);
      console.log("e response,status2:::", e.response.status);
      console.log(" response.headers2:::", e.response.headers);

      if (
        e.response.data.error === "Token is invalid or has expired" ||
        e.response.data.error === "refresh token not found"
      ) {
        logout(props);
      }
    } else if (e.request) {
      // The request was made but no response was received
      console.log("e request2:::", e.request);
      console.log("sleeping...");
      setTimeout(() => {
        checkAuthState(setChecking, dispatch, props);
      }, 7000);
    }
  });

  if (getNewAccess) {
    console.log("got new access:::", getNewAccess.data);
    localStorage.setItem(tokenName, JSON.stringify(getNewAccess.data));
    checkAuthState(setChecking, dispatch, props);
  }
};

const AuthController = (props) => {
  const [checking, setChecking] = useState(true);

  const { dispatch } = useContext(store);

  useEffect(() => {
    checkAuthState(setChecking, dispatch, props);
  }, []);

  return (
    <div className="authContainer">
      {checking ? (
        <>
          <div className="centerAll">
            <Loader />
          </div>
          <div className="textAuth">
            <div>Authenticating... </div>
          </div>
        </>
      ) : (
        props.children
      )}
    </div>
  );
};

export default AuthController;
