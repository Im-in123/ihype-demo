import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import "./detail.css";
import { store } from "../stateManagement/store";
import {
  ADD_TO_LIST_URL,
  CHECK_WATCHLIST_URL,
  SERIES_URL,
  LOCAL_CHECK,
} from "../urls";

import { currentSeriesVideoAction } from "../stateManagement/actions";
import { secondChangeAction } from "../stateManagement/actions";
import { axiosHandler, getToken } from "../helper";
import SeriesComp from "./VideoComps/SeriesComp";

const SeriesDetail = (props) => {
  const {
    state: { userDetail },
  } = useContext(store);
  const [reload, setReload] = useState(true);

  console.log("props::::", props);
  const [fetching, setFetching] = useState("true");
  const [error, setError] = useState(false);
  const [watchfetch, setWatchFetch] = useState("false");
  const [watcherror, setWatcherror] = useState("false");

  const [detailData, setDetailData] = useState({});
  const {
    state: { currentVideo },
    dispatch,
  } = useContext(store);
  console.log("Video_state_global:::", currentVideo);

  const {
    state: { secondChange },
  } = useContext(store);
  console.log("Second_change:::", secondChange);

  // const popupRef = useRef()

  const [isShown, setIsShown] = useState(false);
  const [small, setSmall] = useState(false);
  const [trailer, setTrailer] = useState(false);
  const [finalwatch, setFinalwatch] = useState(false);

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
    console.log("url:::::", SERIES_URL + props.match.params.slug);
    vb(props);
  }, [reload]);

  useEffect(() => {
    if (secondChange === false) {
      return;
    } else {
      handleVideo();
    }
  }, [secondChange]);

  useEffect(() => {}, []);
  // prompt("Please use UC browser if you encounter videoplack errors. Thank you.")

  const vb = async (props) => {
    setFetching(true);

    const token = await getToken();
    const result = await axiosHandler({
      method: "get",
      url: SERIES_URL + props.match.params.slug,
      token,
    }).catch((e) => {
      console.log(e);
      setError(true);
    });
    if (result) {
      setDetailData(result.data);

      console.log(result.data);
      const yo = result.data.season;
      for (var g in yo) {
        //  console.log("Yooooooooo:::::::", yo[g])
        if (yo[g].season_num === 1) {
          // console.log("got it::::", yo[g].season_num)
          const yo1 = yo[g].episodes;
          for (var v in yo1) {
            if (yo1[v].episode_num === 1) {
              // console.log("Got the first episode::::", yo1[v].episode_num)
              const yo2 = yo1[v];
              // console.log("Got final episode:::",yo2)
              dispatch({
                type: currentSeriesVideoAction,
                payload: {
                  video: LOCAL_CHECK ? yo2.video : yo2.video_url,
                  cover: LOCAL_CHECK ? yo2.cover : yo2.cover_url,
                  title: yo2.title,
                  season_num: yo2.season_num,
                  subtitle_file: yo2.subtitle_file,
                },
              });
              console.log("starter episode:::::", currentVideo);
            }
          }
        }
      }
      checkAddtoList(result.data);
      setFetching(false);
    }

    resize();
  };

  const handleToggleButtonClick = (e) => {
    // if (isShown) return
    // resize ()

    setIsShown(true);
    try {
      const eli = document.getElementById("eli");

      eli.classList.add("DetailBackground1");
    } catch (error) {}

    console.log("Set to true::::");

    // eli.classList.remove("DetailBackground");
  };

  const handleCloseButtonClick = (e) => {
    dispatch({ type: secondChangeAction, payload: false });
    setIsShown(false);
    console.log("Set to false::::");
    try {
      const eli = document.getElementById("eli");

      setTimeout(() => {
        eli.classList.remove("DetailBackground1");
      }, 2000);
    } catch (error) {}
  };
  const handleTrailer = (e) => {
    // resize()
    setTrailer(true);
    handleToggleButtonClick();
    console.log("Set trailer to true::::");
  };
  const handleVideo = (e) => {
    // resize()
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
    const data = { user_id: userDetail.user.id, vid: e.id, type: "series" };
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
      type: "series",
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
          <h4 id="loaderdetail"></h4>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="DetailContainer">
        {small ? (
          <div className="DetailBackground" id="eli">
            {/* <img alt={detailData.title} src={detailData.background_small_screen} /> */}
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
            {/* <img alt={detailData.title} src={detailData.background_big_screen} /> */}
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

        <SeriesComp
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
          //  currentVideo={currentVideo}
        />
      </div>
    </>
  );
};

export default SeriesDetail;
