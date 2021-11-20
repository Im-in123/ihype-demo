import React, { useState, useContext, useEffect } from "react";
import "./detail.css";
import {
  MOVIE_URL,
  ADD_TO_LIST_URL,
  CHECK_WATCHLIST_URL,
  LOCAL_CHECK,
} from "../urls";
import { store } from "../stateManagement/store";
import { axiosHandler, getToken } from "../helper";
import MovieComp from "./VideoComps/MovieComp";
let debouncer;

const MovieDetail = (props) => {
  console.log("props::::", props);
  const [fetching, setFetching] = useState("true");
  const [detailData, setDetailData] = useState({});
  const [error, setError] = useState(false);

  // const popupRef = useRef()
  const [isShown, setIsShown] = useState(false);
  const [small, setSmall] = useState(false);
  const [trailer, setTrailer] = useState(false);

  const [watchfetch, setWatchFetch] = useState("false");
  const [watcherror, setWatcherror] = useState("false");
  const [finalwatch, setFinalwatch] = useState(false);
  const [reload, setReload] = useState(true);

  const {
    state: { userDetail },
  } = useContext(store);
  useEffect(() => {
    if (!userDetail.user.is_verified) {
      window.location.href = "/verify";
    }
    if (!userDetail.is_verified) {
      window.location.href = "/profile-update";
    }
  }, []);

  useEffect(() => {
    console.log(props);
    getMovieDetail(props);
    resize();
  }, [reload]);

  const getMovieDetail = async (props) => {
    setFetching(true);
    const token = await getToken();
    const res = await axiosHandler({
      method: "get",
      url: MOVIE_URL + props.match.params.slug,
      token,
    }).catch((e) => {
      console.log(e);
      setError(true);
    });

    if (res) {
      setDetailData(res.data);
      setFetching(false);
      console.log(res.data);

      checkAddtoList(res.data);
    }
  };

  const handleToggleButtonClick = (e) => {
    const eli = document.getElementById("eli");
    console.log("eli:::::", eli);
    eli.classList.add("DetailBackground1");
    setIsShown(true);
    console.log("Set to true::::");
  };

  const handleCloseButtonClick = (e) => {
    setIsShown(false);
    try {
      const eli = document.getElementById("eli");

      setTimeout(() => {
        eli.classList.remove("DetailBackground1");
      }, 2000);
    } catch (error) {}
    console.log("Set to false::::");
  };
  const handleTrailer = (e) => {
    setTrailer(true);
    handleToggleButtonClick();
    console.log("Set trailer to true::::");
  };
  const handleVideo = (e) => {
    setTrailer(false);
    handleToggleButtonClick();
    console.log("Set video to true::::");
  };
  const resize = (e) => {
    let currentHideNav = window.innerWidth <= 760;
    console.log("width stuff::", currentHideNav);
    if (currentHideNav === true) {
      setSmall(true);
    } else {
      setSmall(false);
    }
  };

  const checkAddtoList = async (e) => {
    setWatchFetch(true);
    const token = await getToken();
    console.log(" check watchlist triggered");
    const data = { user_id: userDetail.user.id, vid: e.id, type: "movie" };
    console.log("check watchlist before data::::", data);
    const checkadd = await axiosHandler({
      method: "post",
      url: CHECK_WATCHLIST_URL,
      data: data,
      token,
    }).catch((e) => {
      console.log("checkWatchlist error::::", e);
      setWatchFetch(true);
    });
    if (checkadd) {
      console.log("checkWatchlist result::::", checkadd.data);
      const rr = checkadd.data["data"];
      console.log("cccc::::", rr);
      if (rr === "exist-true") {
        setFinalwatch(true);
        setWatchFetch(false);
      } else {
        setWatchFetch(false);
        setFinalwatch(false);
      }
    }
  };

  const handleAddtoList = async (e) => {
    setWatchFetch(true);
    const token = await getToken();
    console.log("Add to List triggered");
    const data = {
      user_id: userDetail.user.id,
      vid: detailData.id,
      type: "movie",
    };
    console.log("add to list before data::::", data);

    const res = await axiosHandler({
      method: "post",
      url: ADD_TO_LIST_URL,
      data: data,
      token,
    }).catch((e) => {
      console.log(e);
      setWatcherror(true);
    });

    if (res) {
      console.log("Handle add to list:::", res.data);
      setWatchFetch(false);
      const rr1 = res.data["data"];
      console.log("rr2:::::", rr1);
      if (rr1 === "yah") {
        setFinalwatch(true);
      } else if (rr1 === "not-yah") {
        setFinalwatch(false);
      }
    }
  };

  if (fetching) {
    return (
      <div className="DetailContainer">
        {error ? (
          <h4 className="H4Group">
            Connection failed! &nbsp;&nbsp;{" "}
            <button onClick={() => setReload(!reload)}> Retry</button>
          </h4>
        ) : (
          <h4 id="loaderdetail"> </h4>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="DetailContainer">
        {small ? (
          <div className="DetailBackground" id="eli">
            <img
              alt={detailData.title}
              src={
                LOCAL_CHECK
                  ? detailData.background_small_screen
                  : detailData.small_screen_url
              }
            />
          </div>
        ) : (
          <div className="DetailBackground" id="eli">
            <img
              alt={detailData.title}
              src={
                LOCAL_CHECK
                  ? detailData.background_big_screen
                  : detailData.big_screen_url
              }
            />
          </div>
        )}

        <MovieComp
          isShown={isShown}
          detailData={detailData}
          handleAddtoList={handleAddtoList}
          handleCloseButtonClick={handleCloseButtonClick}
          handleTrailer={handleTrailer}
          trailer={trailer}
          handleVideo={handleVideo}
          finalwatch={finalwatch}
          watchfetch={watchfetch}
          watcherror={watcherror}
        />
      </div>
    </>
  );
};

export default MovieDetail;
