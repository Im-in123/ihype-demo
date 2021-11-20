import React from "react";
import { LOCAL_CHECK } from "../../urls";
import MVideoPlayer from "./MVideoPlayer";
const MovieComp = (props) => {
  return (
    <div>
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
                )}{" "}
              </button>
            </div>
            <hr style={{ color: "white" }} />
            <div className="DetailSubtitle">{props.detailData.subtitle}</div>
            <div className="DetailDescription">
              {props.detailData.description} <br />
              {props.detailData.other_info}
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
                    <MVideoPlayer
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
                      subtitle={props.detailData.subtitle}
                      isTrailer={true}
                      subtitle_file={props.detailData.subtitle_file}
                      handleCloseButtonClick={props.handleCloseButtonClick}
                    />
                  </>
                ) : (
                  <>
                    {" "}
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
                {/* {props.detailData.video ? ( */}
                {props.detailData.video_url ? (
                  <>
                    <MVideoPlayer
                      video={
                        LOCAL_CHECK
                          ? props.detailData.video
                          : props.detailData.video_url
                      }
                      poster={
                        LOCAL_CHECK
                          ? props.detailData.cover
                          : props.detailData.cover_url
                      }
                      title={props.detailData.title}
                      subtitle={props.detailData.subtitle}
                      subtitle_file={props.detailData.subtitle_file}
                      handleCloseButtonClick={props.handleCloseButtonClick}
                      isTrailer={false}
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
                    <p>Movie Not available</p>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieComp;
