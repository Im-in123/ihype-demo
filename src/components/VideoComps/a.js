import React, { useEffect, useLayoutEffect } from "react";
import "./videoplayer.css";

const VideoPlayer = (props) => {
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
  let fullScreenButton;
  let maximizeScreenButton;
  let minimizeScreenButton;
  let detailBackground;
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
    controlsContainer.style.opacity = "1";
    watchedBar.style.width = "0%";
    pauseButton.style.display = "none";
    mutedVolumeButton.style.display = "none";
    minimizeScreenButton.style.display = "none";
    detailBackground = document.getElementById("eli");
    detailBackground.style.opacity = "0";

    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        playPause();
      }
      if (event.code === "KeyM") {
        toggleMute();
      }
      if (event.code === "KeyF") {
        toggleFullScreen();
      }
      displayControls();
    });
    document.addEventListener("mousemove", (event) => {
      displayControls();
    });

    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        maximizeScreenButton.style.display = "";
        minimizeScreenButton.style.display = "none";
      } else {
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

    rewindButton.addEventListener("click", () => {
      video.currentTime -= 10;
    });

    fastForwardButton.addEventListener("click", () => {
      video.currentTime += 10;
    });

    volumeButton.addEventListener("click", toggleMute);

    fullScreenButton.addEventListener("click", toggleFullScreen);

    return () => {
      window.removeEventListener("click", toggleFullScreen);
      window.removeEventListener("click", playPause);
      window.removeEventListener("click", toggleMute);
      window.removeEventListener("timeupdate", timeUpdate);
      detailBackground.style.opacity = "0.8";
    };
  }, [props.video]);

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
    } else {
      document.exitFullscreen();
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
  const timeUpdate = () => {
    watchedBar.style.width = (video.currentTime / video.duration) * 100 + "%";
    const totalSecondsRemaining = video.duration - video.currentTime;

    const time = new Date(null);
    time.setSeconds(totalSecondsRemaining);
    let hours = null;
    if (totalSecondsRemaining >= 3600) {
      hours = time.getHours().toString().padStart(2, "0");
    }
    let minutes = time.getMinutes().toString().padStart(2, "0");
    let seconds = time.getSeconds().toString().padStart(2, "0");
    let total = `${hours ? hours + ":" : ""}${minutes}:${seconds}`;
    timeLeft.textContent = total;
  };

  //   useLayoutEffect(() => {
  //     return () => {};
  //   }, []);

  return (
    <div className="video-container">
      <video
        src={props.video}
        //    poster={props.poster}
        autoPlay={true}
        crossorigin="anonymous"
      >
        <track
          src={props.subtitle_file}
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
              className="playing"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <svg
              className="paused"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
            >
              <path d="M0 0h24v24H0V0z" fill="orangered" />
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>

          <button className="rewind">
            <svg alt="" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.84 11.965h6.722a4 4 0 0 1 4 4V26a4 4 0 0 1-4 4H10.375a4 4 0 0 1-4-4V15.965a4 4 0 0 1 4-4h6.211l-3.981-3.981a1.162 1.162 0 1 1 1.643-1.644l3.465 3.465 3.464-3.465a1.162 1.162 0 0 1 1.644 1.644l-3.982 3.981zm6.428 7.73a1.718 1.718 0 1 0 0-3.436 1.718 1.718 0 0 0 0 3.436zm0 6.011a1.718 1.718 0 1 0 0-3.435 1.718 1.718 0 0 0 0 3.435z"
                className="sc-kAzzGY dGwULW"
              ></path>
            </svg>
          </button>

          <button className="fast-forward">
            <svg alt="" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.84 11.965h6.722a4 4 0 0 1 4 4V26a4 4 0 0 1-4 4H10.375a4 4 0 0 1-4-4V15.965a4 4 0 0 1 4-4h6.211l-3.981-3.981a1.162 1.162 0 1 1 1.643-1.644l3.465 3.465 3.464-3.465a1.162 1.162 0 0 1 1.644 1.644l-3.982 3.981zm6.428 7.73a1.718 1.718 0 1 0 0-3.436 1.718 1.718 0 0 0 0 3.436zm0 6.011a1.718 1.718 0 1 0 0-3.435 1.718 1.718 0 0 0 0 3.435z"
                className="sc-kAzzGY dGwULW"
              ></path>
            </svg>
          </button>

          <button className="volume">
            <svg alt="" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.84 11.965h6.722a4 4 0 0 1 4 4V26a4 4 0 0 1-4 4H10.375a4 4 0 0 1-4-4V15.965a4 4 0 0 1 4-4h6.211l-3.981-3.981a1.162 1.162 0 1 1 1.643-1.644l3.465 3.465 3.464-3.465a1.162 1.162 0 0 1 1.644 1.644l-3.982 3.981zm6.428 7.73a1.718 1.718 0 1 0 0-3.436 1.718 1.718 0 0 0 0 3.436zm0 6.011a1.718 1.718 0 1 0 0-3.435 1.718 1.718 0 0 0 0 3.435z"
                className="sc-kAzzGY dGwULW full-volume"
              ></path>
            </svg>

            <svg alt="" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.84 11.965h6.722a4 4 0 0 1 4 4V26a4 4 0 0 1-4 4H10.375a4 4 0 0 1-4-4V15.965a4 4 0 0 1 4-4h6.211l-3.981-3.981a1.162 1.162 0 1 1 1.643-1.644l3.465 3.465 3.464-3.465a1.162 1.162 0 0 1 1.644 1.644l-3.982 3.981zm6.428 7.73a1.718 1.718 0 1 0 0-3.436 1.718 1.718 0 0 0 0 3.436zm0 6.011a1.718 1.718 0 1 0 0-3.435 1.718 1.718 0 0 0 0 3.435z"
                className="sc-kAzzGY dGwULW muted "
              ></path>
            </svg>
          </button>

          <p className="title">
            <span className="series">{props.title}</span>
            <span className="episode">{props.subtitle}</span>
          </p>

          <button className="help">
            <svg alt="" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.84 11.965h6.722a4 4 0 0 1 4 4V26a4 4 0 0 1-4 4H10.375a4 4 0 0 1-4-4V15.965a4 4 0 0 1 4-4h6.211l-3.981-3.981a1.162 1.162 0 1 1 1.643-1.644l3.465 3.465 3.464-3.465a1.162 1.162 0 0 1 1.644 1.644l-3.982 3.981zm6.428 7.73a1.718 1.718 0 1 0 0-3.436 1.718 1.718 0 0 0 0 3.436zm0 6.011a1.718 1.718 0 1 0 0-3.435 1.718 1.718 0 0 0 0 3.435z"
                className="sc-kAzzGY dGwULW"
              ></path>
            </svg>
          </button>

          <button className="next">
            <svg alt="" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.84 11.965h6.722a4 4 0 0 1 4 4V26a4 4 0 0 1-4 4H10.375a4 4 0 0 1-4-4V15.965a4 4 0 0 1 4-4h6.211l-3.981-3.981a1.162 1.162 0 1 1 1.643-1.644l3.465 3.465 3.464-3.465a1.162 1.162 0 0 1 1.644 1.644l-3.982 3.981zm6.428 7.73a1.718 1.718 0 1 0 0-3.436 1.718 1.718 0 0 0 0 3.436zm0 6.011a1.718 1.718 0 1 0 0-3.435 1.718 1.718 0 0 0 0 3.435z"
                className="sc-kAzzGY dGwULW"
              ></path>
            </svg>
          </button>

          <button className="episodes">
            <svg alt="" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.84 11.965h6.722a4 4 0 0 1 4 4V26a4 4 0 0 1-4 4H10.375a4 4 0 0 1-4-4V15.965a4 4 0 0 1 4-4h6.211l-3.981-3.981a1.162 1.162 0 1 1 1.643-1.644l3.465 3.465 3.464-3.465a1.162 1.162 0 0 1 1.644 1.644l-3.982 3.981zm6.428 7.73a1.718 1.718 0 1 0 0-3.436 1.718 1.718 0 0 0 0 3.436zm0 6.011a1.718 1.718 0 1 0 0-3.435 1.718 1.718 0 0 0 0 3.435z"
                className="sc-kAzzGY dGwULW"
              ></path>
            </svg>
          </button>

          <button className="captions">
            <svg alt="" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.84 11.965h6.722a4 4 0 0 1 4 4V26a4 4 0 0 1-4 4H10.375a4 4 0 0 1-4-4V15.965a4 4 0 0 1 4-4h6.211l-3.981-3.981a1.162 1.162 0 1 1 1.643-1.644l3.465 3.465 3.464-3.465a1.162 1.162 0 0 1 1.644 1.644l-3.982 3.981zm6.428 7.73a1.718 1.718 0 1 0 0-3.436 1.718 1.718 0 0 0 0 3.436zm0 6.011a1.718 1.718 0 1 0 0-3.435 1.718 1.718 0 0 0 0 3.435z"
                className="sc-kAzzGY dGwULW"
              ></path>
            </svg>
          </button>

          <button className="cast">
            <svg alt="" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.84 11.965h6.722a4 4 0 0 1 4 4V26a4 4 0 0 1-4 4H10.375a4 4 0 0 1-4-4V15.965a4 4 0 0 1 4-4h6.211l-3.981-3.981a1.162 1.162 0 1 1 1.643-1.644l3.465 3.465 3.464-3.465a1.162 1.162 0 0 1 1.644 1.644l-3.982 3.981zm6.428 7.73a1.718 1.718 0 1 0 0-3.436 1.718 1.718 0 0 0 0 3.436zm0 6.011a1.718 1.718 0 1 0 0-3.435 1.718 1.718 0 0 0 0 3.435z"
                className="sc-kAzzGY dGwULW"
              ></path>
            </svg>
          </button>

          <button className="full-screen">
            <svg alt="" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.84 11.965h6.722a4 4 0 0 1 4 4V26a4 4 0 0 1-4 4H10.375a4 4 0 0 1-4-4V15.965a4 4 0 0 1 4-4h6.211l-3.981-3.981a1.162 1.162 0 1 1 1.643-1.644l3.465 3.465 3.464-3.465a1.162 1.162 0 0 1 1.644 1.644l-3.982 3.981zm6.428 7.73a1.718 1.718 0 1 0 0-3.436 1.718 1.718 0 0 0 0 3.436zm0 6.011a1.718 1.718 0 1 0 0-3.435 1.718 1.718 0 0 0 0 3.435z"
                className="sc-kAzzGY dGwULW maximize"
              ></path>
            </svg>
            <svg alt="" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.84 11.965h6.722a4 4 0 0 1 4 4V26a4 4 0 0 1-4 4H10.375a4 4 0 0 1-4-4V15.965a4 4 0 0 1 4-4h6.211l-3.981-3.981a1.162 1.162 0 1 1 1.643-1.644l3.465 3.465 3.464-3.465a1.162 1.162 0 0 1 1.644 1.644l-3.982 3.981zm6.428 7.73a1.718 1.718 0 1 0 0-3.436 1.718 1.718 0 0 0 0 3.436zm0 6.011a1.718 1.718 0 1 0 0-3.435 1.718 1.718 0 0 0 0 3.435z"
                className="sc-kAzzGY dGwULW minimize"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
