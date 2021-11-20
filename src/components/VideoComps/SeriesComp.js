import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { store } from "../../stateManagement/store";
import { LOCAL_CHECK } from "../../urls";
import {
  currentSeriesVideoAction,
  secondChangeAction,
} from "../../stateManagement/actions";
import SVideoPlayer from "./SVideoPlayer";

const SeriesComp = (props) => {
  const {
    state: { currentVideo },
    dispatch,
  } = useContext(store);
  // useEffect(() => {

  //   return () => {

  //   }
  // }, [currentVideo])
  return (
    <>
      {!props.isShown ? (
        <>
          <div className="DetailImageTitle">
            <p>{props.detailData.title}</p>
          </div>
          <div className="DetailContentMeta">
            <div className="DetailControls">
              <button className="DetailPlayer" onClick={props.handleVideo}>
                <img src="/images/play-icon-black.png" alt="" />
                <span>Play</span>
              </button>
              <button className="DetailTrailer" onClick={props.handleTrailer}>
                <img src="/images/play-icon-white.png" alt="" />
                <span>Trailer</span>
              </button>
              <button
                className="DetailAddList"
                onClick={() => {
                  props.handleAddtoList();
                }}
              >
                {props.watchfetch ? (
                  <p>...</p>
                ) : (
                  <>
                    {props.finalwatch ? (
                      <img src="/images/done_white.svg" alt="finalwatch" />
                    ) : (
                      <>
                        <span></span>
                        <span></span>
                      </>
                    )}
                  </>
                )}
              </button>

              {/* <div className="DetailGroupWatch">
                    <div>
                        <img src="/images/group-icon.png" alt="" />
                    </div>
               </div> */}
            </div>
            <hr style={{ color: "white" }} />

            <div className="DetailSubtitle">{props.detailData.subtitle}</div>
            <div className="DetailDescription">
              {props.detailData.description} <br />{" "}
              {props.detailData.other_info}
            </div>
            <div
              id="detailseason"
              className="DetailSeason"
              onClick={() => {
                document.querySelector("#slist").style.display = "";
              }}
            >
              Seasons
              {/* <p id="plist">Seasons</p> */}
              <div id="slist" style={{ display: "none" }}>
                <Season data={props.detailData.season} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="DetailVideo">
            {props.trailer ? (
              <>
                {/* {props.detailData.trailer ? ( */}
                {props.detailData.trailer_url ? (
                  <>
                    &nbsp; &nbsp; &nbsp; &nbsp; {props.detailData.title} Trailer
                    <SVideoPlayer
                      video={
                        LOCAL_CHECK
                          ? props.detailData.trailer
                          : props.detailData.trailer_url
                      }
                      poster={
                        LOCAL_CHECK
                          ? props.detailData.cover
                          : props.detailData.cover_url
                      }
                      title={props.detailData.title}
                      season_num={currentVideo.season_num}
                      episode={props.detailData.title}
                      subtitle={props.detailData.subtitle}
                      isTrailer={true}
                      subtitle_file={props.detailData.subtitle_file}
                      handleCloseButtonClick={props.handleCloseButtonClick}
                    />
                  </>
                ) : (
                  <>
                    <p>
                      {props.detailData.title} - {props.detailData.subtitle}
                    </p>
                    <button onClick={props.handleCloseButtonClick}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="white"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                      </svg>
                    </button>
                    <p>Trailer Not available</p>
                  </>
                )}
              </>
            ) : (
              <>
                {currentVideo.video ? (
                  <>
                    <SVideoPlayer
                      video={currentVideo.video}
                      poster={
                        LOCAL_CHECK
                          ? currentVideo.cover
                          : currentVideo.cover_url
                      }
                      title={props.detailData.title}
                      season_num={currentVideo.season_num}
                      episode={currentVideo.title}
                      subtitle={currentVideo.subtitle}
                      isTrailer={false}
                      subtitle_file={currentVideo.subtitle_file}
                      season_pack={props.detailData.season}
                      handleCloseButtonClick={props.handleCloseButtonClick}
                    />
                  </>
                ) : (
                  <>
                    <p>
                      Season {currentVideo.season_num} - {currentVideo.title}
                    </p>
                    <button onClick={props.handleCloseButtonClick}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="white"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                      </svg>
                    </button>
                    <p>Video Not available</p>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default SeriesComp;

const Season = (props) => {
  const {
    state: { currentVideo },
    dispatch,
  } = useContext(store);
  const {
    state: { secondChange },
  } = useContext(store);

  useLayoutEffect(() => {
    try {
      const sid = currentVideo.scrollid;
      console.log("sid::::", sid);
      const scrolli = document.getElementById(sid);
      console.log("scrolli::::", scrolli);
      scrolli.scrollIntoView({ behavior: "smooth" });
      // scrolli.scrollIntoView()({behavior:'smooth', block:'end'})
      scrolli.style = "color: red";

      // scrolli.style= "color: #fb2c2c";
    } catch (error) {
      console.log("scrolli error", error);
    }
  }, []);

  const Changeit = (video, cover, scrollid, season_num, subtitle_file) => {
    dispatch({
      type: currentSeriesVideoAction,
      payload: {
        video: video,
        cover: cover,
        title: scrollid,
        scrollid: scrollid,
        season_num: season_num,
        subtitle_file: subtitle_file,
      },
    });
    dispatch({ type: secondChangeAction, payload: true });
  };
  if (props.data) {
    console.log("season episodes:::::", props.data);
    if (props.data.length === 0) {
      return <div className="H4Group">..</div>;
    }

    return (
      <div>
        {props.data.map((item, key) => (
          <div className key={key}>
            <p style={{ textAlign: "left", color: "red", fontSize: "21px" }}>
              {item.title}
            </p>
            {item.episodes.map((ep, ekey) => (
              <div id="getit" key={ekey}>
                <button
                  id={ep.title}
                  className="episode"
                  onClick={() =>
                    Changeit(
                      LOCAL_CHECK ? ep.video : ep.video_url,
                      LOCAL_CHECK ? ep.cover : ep.cover_url,
                      ep.title,
                      ep.season_num,
                      ep.subtitle_file
                    )
                  }
                >
                  {" "}
                  {ep.title}
                </button>
              </div>
            ))}{" "}
            <hr style={{ color: "grey" }}></hr>
          </div>
        ))}
      </div>
    );
  } else {
    return <div>...</div>;
  }
};
