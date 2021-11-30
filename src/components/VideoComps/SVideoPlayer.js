import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import "./videoplayer.css";
import { currentSeriesVideoAction } from "../../stateManagement/actions";
import { store } from "../../stateManagement/store";
import { LOCAL_CHECK } from "../../urls";

const SVideoPlayer = (props) => {
  console.log("SVideoPlayer props::::", props);
  const {
    state: { currentVideo },
    dispatch,
  } = useContext(store);
  let videoContainer;
  let video;
  let playPauseButton;
  let controlsContainer;
  let pauseButton;
  let progressBar;
  let watchedBar;
  let timeLeft;
  let playButton;
  let rewindButton;
  let fastForwardButton;
  let volumeButton;
  let fullVolumeButton;
  let mutedVolumeButton;
  let volumeSetBar;
  let prev_btn, next_btn;
  let fullScreenButton;
  let maximizeScreenButton;
  let minimizeScreenButton;
  let detailBackground;
  let slider;
  let number;
  let popup1Cont;
  let popPlayBtn;
  let spin;
  let episode_btn,
    menu_wrapper,
    menu_bar,
    season_drop,
    season_item,
    season_btn,
    episode_svg;
  let replay_btn;
  console.log("videoName::", props.video);
  useEffect(() => {
    videoContainer = document.querySelector(".video-container");

    controlsContainer = document.querySelector(
      ".video-container .controls-container"
    );

    video = document.querySelector(".video-container video");

    playPauseButton = document.querySelector(
      ".video-container .controls .play-pause"
    );
    playButton = document.querySelector(".playing");
    pauseButton = document.querySelector(".paused");

    rewindButton = document.querySelector(".video-container .controls .rewind");
    fastForwardButton = document.querySelector(
      ".video-container .controls .fast-forward"
    );
    volumeButton = document.querySelector(
      ".video-container .controls button.volume"
    );
    fullVolumeButton = document.querySelector(".full-volume");
    mutedVolumeButton = document.querySelector(".muted");
    volumeSetBar = document.querySelector(".volumeContainer");

    fullScreenButton = document.querySelector(
      ".video-container .controls button.full-screen"
    );
    maximizeScreenButton = document.querySelector(".maximize");
    minimizeScreenButton = document.querySelector(".minimize");

    progressBar = document.querySelector(
      ".video-container .controls-container .progress-controls .progress-bar"
    );

    watchedBar = document.querySelector(
      ".video-container .controls-container .progress-controls .watched-bar"
    );

    timeLeft = document.querySelector(
      ".video-container .controls-container .progress-controls .time-remaining"
    );
    slider = document.querySelector("#slider");
    number = document.querySelector("#number");

    popup1Cont = document.querySelector("#popup1");
    popPlayBtn = document.querySelector(".pop-play");
    spin = document.querySelector(".spin");

    prev_btn = document.querySelector(".previous");
    next_btn = document.querySelector(".next");
    replay_btn = document.querySelector(".replay");

    // seasonbuttons
    if (!props.isTrailer) {
      episode_btn = document.querySelector(".episodes");
      menu_wrapper = document.querySelector(".wrapper-t");
      menu_bar = document.querySelector(".menu-bar-t");
      season_drop = document.querySelector(".season-drop");
      season_item = document.querySelector(".season-item");
      season_btn = document.querySelector(".back-season-btn");
      episode_svg = document.querySelector(".episode-svg");
    }

    /////////main flow////////////////////////////
    if (video.canPlayType) {
      console.log("video is supported!");
      if (video.canPlayType('video/ogg; codecs="theora, vorbis"')) {
        console.log("it can play (maybe)!!");
      } else {
        alert("format or codecs of this video aren't supported!!");
      }
    }
    controlsContainer.style.opacity = "1";
    watchedBar.style.width = "0%";
    mutedVolumeButton.style.display = "none";
    playButton.style.display = "none";
    minimizeScreenButton.style.display = "none";
    detailBackground = document.getElementById("eli");
    detailBackground.style.opacity = "0";
    volumeSetBar.style.display = "none";
    video.volume = 0.5;
    slider.value = 50;
    number.innerHTML = slider.value;
    // spin.style.display = "none";

    video.onclick = () => {
      playPause();
    };
    video.onwaiting = function () {
      console.log("waiting/buffering");
      togglePopupShow();
      toggleSpin();
    };
    video.onplaying = function () {
      console.log("playing");
      console.log("video source", video.src);
      // playPauseButton.style.display=""
      playButton.style.display = "none";
      pauseButton.style.display = "";
      togglePopupHide();
      toggleSpinHide();
    };
    video.onseeking = function () {
      console.log("seeking");
    };
    video.onended = function () {
      console.log("ended");
    };
    video.onpause = function () {
      console.log("paused");
      togglePopupShow();
    };
    video.onerror = (e) => {
      // alert("video error!! Media is not playable or valid");
      // props.handleCloseButtonClick();
      console.log("video error:::", e);
      console.log(video.error);
    };
    slider.oninput = () => {
      let num = slider.value;
      slider.value = num;
      number.innerHTML = num;
      video.volume = num / 100;
      let num2 = num / 100;
      if (num2 === 0 || num2 === 0.0) {
        mutedVolumeButton.style.display = "";
        mutedVolumeButton.style.fill = "gray";
        fullVolumeButton.style.display = "none";
      } else {
        mutedVolumeButton.style.display = "none";
        fullVolumeButton.style.display = "";
      }
    };

    popPlayBtn.onclick = () => {
      togglePopupHide();
      playPause();
    };
    volumeButton.onmouseover = () => {
      volumeSetBar.style.display = "flex";
    };
    volumeButton.onclick = () => {
      if (volumeSetBar.style.display === "none") {
        volumeSetBar.style.display = "flex";
        return;
      }
      if (volumeSetBar.style.display === "flex") {
        volumeSetBar.style.display = "none";
        return;
      }
    };

    volumeButton.onmouseleave = () => {
      volumeSetBar.style.display = "none";
    };
    replay_btn.onclick = () => {
      video.currentTime = 0;
    };
    if (!props.isTrailer) {
      episode_btn.onclick = () => {
        menu_wrapper.classList.toggle("show");
        if (episode_svg.style.fill === "red") {
          episode_svg.style.fill = "white";
        } else {
          episode_svg.style.fill = "red";
        }
      };
      season_item.onclick = () => {
        menu_bar.style.marginLeft = "-400px";
        setTimeout(() => {
          season_drop.style.display = "block";
        }, 100);
      };

      season_btn.onclick = () => {
        menu_bar.style.marginLeft = "0px";
        season_drop.style.display = "none";
      };
    }

    document.addEventListener("mousemove", (event) => {
      displayControls();
    });

    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        video.style.height = "80vh";
        maximizeScreenButton.style.display = "";
        minimizeScreenButton.style.display = "none";
      } else {
        video.style.height = "100vh";
        maximizeScreenButton.style.display = "none";
        minimizeScreenButton.style.display = "";
      }
    });

    progressBar.addEventListener("click", (event) => {
      const pos =
        (event.pageX -
          (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) /
        progressBar.offsetWidth;
      video.currentTime = pos * video.duration;
    });

    video.addEventListener("timeupdate", timeUpdate);

    playPauseButton.addEventListener("click", playPause);

    rewindButton.onclick = () => {
      video.currentTime -= 10;
    };
    fastForwardButton.onclick = () => {
      video.currentTime += 10;
    };
    // rewindButton.addEventListener("click", () => {
    //   video.currentTime -= 10;
    // });

    // fastForwardButton.addEventListener("click", () => {
    //   video.currentTime += 10;
    // });

    // volumeButton.addEventListener("click", toggleMute);

    fullScreenButton.addEventListener("click", toggleFullScreen);

    return () => {
      window.removeEventListener("click", toggleFullScreen);
      window.removeEventListener("click", playPause);
      // window.removeEventListener("click", toggleMute);
      window.removeEventListener("timeupdate", timeUpdate);
      // rewindButton.removeEventListener("click", () => {
      //   video.currentTime -= 10;
      // });
      // fastForwardButton.removeEventListener("click", () => {
      //   video.currentTime += 10;
      // });
      playPauseButton.removeEventListener("click", playPause);
      video.removeEventListener("timeupdate", timeUpdate);
      fullScreenButton.removeEventListener("click", toggleFullScreen);
      detailBackground.style.opacity = "0.8";
      volumeSetBar.style.display = "none";
    };
  }, [props.video]);

  // useEffect(() => {
  //   return () => {};
  // }, [video]);
  const playPause = () => {
    if (video.paused) {
      video.play();

      playButton.style.display = "none";
      pauseButton.style.display = "";
      detailBackground.style.opacity = "0";
    } else {
      video.pause();
      playButton.style.display = "";
      pauseButton.style.display = "none";
      detailBackground.style.opacity = "0.8";
      // detailBackground.style.blur=0.2
    }
  };

  const toggleMute = () => {
    video.muted = !video.muted;
    if (video.muted) {
      fullVolumeButton.style.display = "";
      mutedVolumeButton.style.display = "none";
    } else {
      fullVolumeButton.style.display = "none";
      mutedVolumeButton.style.display = "";
    }
  };
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen();
      video.style.height = "100vh";
    } else {
      document.exitFullscreen();
      video.style.height = "65vh";
    }
  };

  let controlsTimeout;
  const displayControls = () => {
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    controlsContainer.style.opacity = "1";
    document.body.style.cursor = "initial";
    controlsTimeout = setTimeout(() => {
      controlsContainer.style.opacity = "0";
      document.body.style.cursor = "none";
    }, 5000);
  };
  function secondsToTime(secs) {
    secs = Math.round(secs);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }
  function pad2(s) {
    return s < 10 ? "0" + s : s;
  }

  const timeUpdate = () => {
    const curr_t = video.currentTime;
    watchedBar.style.width = (curr_t / video.duration) * 100 + "%";
    const totalSecondsRemaining = video.duration - curr_t;

    let timeCalc = secondsToTime(totalSecondsRemaining);

    let total = `${timeCalc.h ? pad2(timeCalc.h) + ":" : ""}${pad2(
      timeCalc.m
    )}:${pad2(timeCalc.s)}`;
    timeLeft.textContent = total;
  };

  const togglePopupShow = () => {
    popup1Cont.style.visibility = "visible";
    popup1Cont.style.opacity = 1;
  };
  const togglePopupHide = () => {
    popup1Cont.style.visibility = "hidden";
    popup1Cont.style.opacity = 0;
  };

  const toggleSpin = () => {
    popPlayBtn.style.display = "none";
    spin.style.display = "flex";
  };
  const toggleSpinHide = () => {
    spin.style.display = "none";
    popPlayBtn.style.display = "flex";
  };

  return (
    <div className="video-container">
      <div id="popup1" className="overlay">
        <div className="popup">
          <div className="pop-btn-cont">
            <button className="pop-play" style={{ display: "none" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            </button>
            <div className="spin">
              <span id="vloader"></span>
            </div>
          </div>
        </div>
      </div>
      {!props.isTrailer && (
        <SeasonPop
          data={props.season_pack}
          handleCloseButtonClick={props.handleCloseButtonClick}
        />
      )}

      <video
        src={props.video}
        poster={props.poster}
        autoPlay={true}
        crossOrigin="anonymous"
      >
        <track
          src={props.subtitle_file && props.subtitle_file}
          label="English"
          srcLang="en-us"
          kind="subtitles"
          default
        />
      </video>
      <div className="controls-container">
        <div className="progress-controls">
          <div className="progress-bar">
            <div className="watched-bar"></div>
            <div className="playhead"></div>
          </div>
          <div className="time-remaining">00:00</div>
        </div>
        <div className="controls">
          <button className="play-pause">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="playing"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="paused"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          </button>

          <button className="rewind">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8zm-1.1 11h-.85v-3.26l-1.01.31v-.69l1.77-.63h.09V16zm4.28-1.76c0 .32-.03.6-.1.82s-.17.42-.29.57-.28.26-.45.33-.37.1-.59.1-.41-.03-.59-.1-.33-.18-.46-.33-.23-.34-.3-.57-.11-.5-.11-.82v-.74c0-.32.03-.6.1-.82s.17-.42.29-.57.28-.26.45-.33.37-.1.59-.1.41.03.59.1.33.18.46.33.23.34.3.57.11.5.11.82v.74zm-.85-.86c0-.19-.01-.35-.04-.48s-.07-.23-.12-.31-.11-.14-.19-.17-.16-.05-.25-.05-.18.02-.25.05-.14.09-.19.17-.09.18-.12.31-.04.29-.04.48v.97c0 .19.01.35.04.48s.07.24.12.32.11.14.19.17.16.05.25.05.18-.02.25-.05.14-.09.19-.17.09-.19.11-.32.04-.29.04-.48v-.97z" />
            </svg>
          </button>

          <button className="fast-forward">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <g>
                <rect fill="none" height="24" width="24" />
                <rect fill="none" height="24" width="24" />
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <g />
                <g>
                  <path d="M18,13c0,3.31-2.69,6-6,6s-6-2.69-6-6s2.69-6,6-6v4l5-5l-5-5v4c-4.42,0-8,3.58-8,8c0,4.42,3.58,8,8,8s8-3.58,8-8H18z" />
                  <polygon points="10.9,16 10.9,11.73 10.81,11.73 9.04,12.36 9.04,13.05 10.05,12.74 10.05,16" />
                  <path d="M14.32,11.78c-0.18-0.07-0.37-0.1-0.59-0.1s-0.41,0.03-0.59,0.1s-0.33,0.18-0.45,0.33s-0.23,0.34-0.29,0.57 s-0.1,0.5-0.1,0.82v0.74c0,0.32,0.04,0.6,0.11,0.82s0.17,0.42,0.3,0.57s0.28,0.26,0.46,0.33s0.37,0.1,0.59,0.1s0.41-0.03,0.59-0.1 s0.33-0.18,0.45-0.33s0.22-0.34,0.29-0.57s0.1-0.5,0.1-0.82V13.5c0-0.32-0.04-0.6-0.11-0.82s-0.17-0.42-0.3-0.57 S14.49,11.85,14.32,11.78z M14.33,14.35c0,0.19-0.01,0.35-0.04,0.48s-0.06,0.24-0.11,0.32s-0.11,0.14-0.19,0.17 s-0.16,0.05-0.25,0.05s-0.18-0.02-0.25-0.05s-0.14-0.09-0.19-0.17s-0.09-0.19-0.12-0.32s-0.04-0.29-0.04-0.48v-0.97 c0-0.19,0.01-0.35,0.04-0.48s0.06-0.23,0.12-0.31s0.11-0.14,0.19-0.17s0.16-0.05,0.25-0.05s0.18,0.02,0.25,0.05 s0.14,0.09,0.19,0.17s0.09,0.18,0.12,0.31s0.04,0.29,0.04,0.48V14.35z" />
                </g>
              </g>
            </svg>
          </button>

          <button className="volume">
            <div className="volumeContainer" style={{ display: "none" }}>
              <div id="number">0</div>
              <input type="range" min="0" max="100" value="0" id="slider" />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="muted"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M4.34 2.93L2.93 4.34 7.29 8.7 7 9H3v6h4l5 5v-6.59l4.18 4.18c-.65.49-1.38.88-2.18 1.11v2.06c1.34-.3 2.57-.92 3.61-1.75l2.05 2.05 1.41-1.41L4.34 2.93zM10 15.17L7.83 13H5v-2h2.83l.88-.88L10 11.41v3.76zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-7-8l-1.88 1.88L12 7.76zm4.5 8c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="full-volume"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z" />
            </svg>
          </button>

          <p className="title">
            <span className="series">
              {props.title} {props.season_num}
            </span>
            <span className="episode">{props.episode}</span>
          </p>

          <button className="replay">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <g>
                <rect fill="none" height="24" width="24" />
                <rect fill="none" height="24" width="24" />
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <g />
                <path d="M12,5V1L7,6l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6H4c0,4.42,3.58,8,8,8s8-3.58,8-8S16.42,5,12,5z" />
              </g>
            </svg>
          </button>

          <button className="next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" />
            </svg>
          </button>
          {!props.isTrailer && (
            <button className="episodes">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
                className="episode-svg"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
              </svg>
            </button>
          )}
          <button className="close" onClick={props.handleCloseButtonClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
          <button className="captions">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V6h14v12zM7 15h3c.55 0 1-.45 1-1v-1H9.5v.5h-2v-3h2v.5H11v-1c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm7 0h3c.55 0 1-.45 1-1v-1h-1.5v.5h-2v-3h2v.5H18v-1c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1z" />
            </svg>
          </button>

          <button className="full-screen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="maximize"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="minimize"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SVideoPlayer;

const SeasonPop = (props) => {
  console.log("season pop props::::", props);
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    let getEps = props.data.filter((e) => e.season_num === 1);
    // console.log("heyaaaa:::", getEps);
    setEpisodes(getEps);
    return () => {};
  }, []);
  const onclick = () => {
    props.handleCloseButtonClick();
  };
  if (props.data) {
    return (
      <>
        <div className="navcont">
          <nav className="nav-t">
            <div className="wrapper-t">
              <ul className="menu-bar-t">
                <li className="season-item">
                  <a href="#">
                    <div className="icon-t">
                      <span className="fas fa-cog"></span>
                    </div>
                    Seasons / Episodes {">"}
                    <i className="fas fa-angle-right"></i>
                  </a>
                </li>

                <li>
                  <a href="#">
                    <div className="icon-t">
                      <span className="fas fa-user"></span>
                    </div>
                    Watch later{" "}
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="icon-t">
                      <span className="fas fa-comment-alt"></span>
                    </div>
                    Feedback{" "}
                  </a>
                </li>
                <li onClick={onclick}>
                  <a href="#">
                    <div className="icon-t">
                      <span className="fas fa-home"></span>
                    </div>
                    Back{" "}
                  </a>
                </li>
              </ul>
              <SeasonObj data={props.data} setEpisodes={setEpisodes} />
              <EpisodeObj data={episodes} />
            </div>
          </nav>
        </div>
      </>
    );
  }
};

{
  /* season & seasonitems */
}

const SeasonObj = (props) => {
  let s_drop, menu_bar;

  const onclick = (season_num) => {
    let getEps = props.data.filter((e) => e.season_num === season_num);
    console.log("getEps:::", getEps);
    props.setEpisodes(getEps);

    s_drop = document.querySelector(".s-drop");
    menu_bar = document.querySelector(".menu-bar-t");

    menu_bar.style.marginLeft = "-800px";
    // setTimeout(() => {
    s_drop.style.display = "block";
    // }, 100);
  };
  if (props.data) {
    return (
      <>
        <ul className="season-drop">
          <li className="arrow back-season-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 24 24"
              width="24px"
              fill="white"
              style={{ position: "relative", top: "2px" }}
            >
              <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
              <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
            </svg>
            Seasons over here
          </li>
          {props.data.map((item, key) => (
            <li
              className="s-item"
              key={key}
              onClick={() => onclick(item.season_num)}
            >
              <a href="#">
                <div className="icon-t">
                  <span className="fas fa-user"></span>
                </div>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </>
    );
  }
};

{
  /* season-item drop  */
}

const EpisodeObj = (props) => {
  console.log("episodeObj props::", props);
  let menu_bar, s_drop;
  const onclick = () => {
    s_drop = document.querySelector(".s-drop");
    menu_bar = document.querySelector(".menu-bar-t");

    menu_bar.style.marginLeft = "-400px";
    s_drop.style.display = "none";
  };
  if (props.data && props.data.length > 0) {
    return (
      <>
        <ul className="s-drop">
          <li className="arrow back-s-btn" onClick={() => onclick()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 24 24"
              width="24px"
              fill="white"
              style={{ position: "relative", top: "2px" }}
            >
              <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
              <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
            </svg>
            Episodes
          </li>
          {props.data.map((item, key) => (
            <EpisodeSingle data={item.episodes} key={key} />
          ))}
        </ul>
      </>
    );
  } else {
    return (
      <ul className="s-drop">
        <li className="arrow back-s-btn">
          <span className="fas fa-arrow-left"></span>
          nada
        </li>
        <li>
          <a href="#">
            <div className="icon-t">
              <span className="fas fa-question-circle"></span>
            </div>
            nada
          </a>
        </li>
      </ul>
    );
  }
};

const EpisodeSingle = (props) => {
  const {
    state: { currentVideo },
    dispatch,
  } = useContext(store);

  const onclick = (video, cover, scrollid, season_num, subtitle_file, e) => {
    // e.target.style.background = "#ec0313";
    // e.target.parentElement.style.background = "#ec0313";
    if (!video) {
      alert("This episode has no video!!");
      return;
    }
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
  };
  return (
    <>
      {props.data.map((item, key) => (
        <li key={key}>
          {/* {currentVideo.video === item.video ? ( */}
          {currentVideo.video === item.video_url ? (
            <a
              href="#"
              onClick={(e) =>
                onclick(
                  LOCAL_CHECK ? item.video : item.video_url,
                  LOCAL_CHECK ? item.cover : item.cover_url,
                  item.title,
                  item.season_num,
                  item.subtitle_file,
                  e
                )
              }
              style={{ backgroundColor: "#ec0313" }}
            >
              <div className="icon-t">
                <span className="fas fa-question-circle"></span>
              </div>
              <div className="titl">
                {item.title} &nbsp;&nbsp;&nbsp;
                <span style={{ fontSize: "12px" }}>playing../played</span>
              </div>
            </a>
          ) : (
            <a
              href="#"
              onClick={(e) =>
                onclick(
                  LOCAL_CHECK ? item.video : item.video_url,
                  LOCAL_CHECK ? item.cover : item.cover_url,
                  item.title,
                  item.season_num,
                  item.subtitle_file,
                  e
                )
              }
            >
              <div className="icon-t">
                <span className="fas fa-question-circle"></span>
              </div>
              <div className="titl">{item.title}</div>
            </a>
          )}
        </li>
      ))}
    </>
  );
};
