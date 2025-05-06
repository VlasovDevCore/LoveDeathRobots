import React, { useRef, useState, useEffect, useCallback } from "react";
import ReactPlayer from "react-player";
import "./videoPlayer.css";

import previewImage from "../../assets/images/fone/preview.jpg";
import nofullscreen from "../../assets/images/icon/nofullscreen.svg";
import fullscreen from "../../assets/images/icon/fullscreen.svg";
import pervVideo from "../../assets/images/icon/pervVideo.svg";
import firsVideo from "../../assets/images/icon/firsVideo.svg";
import play from "../../assets/images/icon/play.svg";
import pause from "../../assets/images/icon/pause.svg";

import volumeOff from "../../assets/images/icon/valumeOff.svg";
import volume100 from "../../assets/images/icon/valume100.svg";
import volume65 from "../../assets/images/icon/valume65.svg";
import volume33 from "../../assets/images/icon/valume33.svg";

const VideoPlayer = ({ src }) => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const progressRef = useRef(null);
  const [inactiveTimer, setInactiveTimer] = useState(null);
  const [isControlsHovered, setIsControlsHovered] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [state, setState] = useState({
    playing: false,
    duration: 0,
    played: 0,
    loaded: 0,
    muted: false,
    seeking: false,
    hoverTime: null,
    hoverPosition: 0,
    isFullscreen: false,
    showPreview: true,
    hasStarted: false,
    isVolumeControlHovered: false,
    isMobile: isMobile,
    volume: isMobile ? 1 : 0.8,
  });

  const getVolumeIcon = useCallback(() => {
    if (state.muted || state.volume === 0) return volumeOff;
    if (state.volume > 0.66) return volume100;
    if (state.volume > 0.33) return volume65;
    return volume33;
  }, [state.muted, state.volume]);

  const formatTime = useCallback((seconds) => {
    if (isNaN(seconds)) return "0:00";

    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");

    return hh ? `${hh}:${mm.toString().padStart(2, "0")}:${ss}` : `${mm}:${ss}`;
  }, []);

  const clearInactiveTimer = useCallback(() => {
    if (inactiveTimerRef.current) {
      clearTimeout(inactiveTimerRef.current);
      inactiveTimerRef.current = null;
    }
  }, []);

  const startInactiveTimer = useCallback(() => {
    clearInactiveTimer();
    inactiveTimerRef.current = setTimeout(() => {
      if (!isControlsHovered) {
        setShowControls(false);
        setCursorVisible(false);
      }
    }, 2000);
  }, [isControlsHovered]);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    setCursorVisible(true);
    startInactiveTimer();
  }, [startInactiveTimer]);

  useEffect(() => {
    startInactiveTimer();
    return () => clearInactiveTimer();
  }, [startInactiveTimer, clearInactiveTimer]);

  const handlePlayPause = useCallback(() => {
    setState((prev) => ({
      ...prev,
      playing: !prev.playing,
      showPreview: prev.playing,
      hasStarted: true,
    }));
  }, []);

  const handleRewind = useCallback((seconds) => {
    const newTime = Math.max(0, playerRef.current.getCurrentTime() - seconds);
    playerRef.current.seekTo(newTime);
  }, []);

  const handleForward = useCallback(
    (seconds) => {
      const newTime = Math.min(
        state.duration,
        playerRef.current.getCurrentTime() + seconds
      );
      playerRef.current.seekTo(newTime);
    },
    [state.duration]
  );

  const handleSkipIntro = useCallback(() => {
    playerRef.current.seekTo(33);
  }, []);

  const handleProgress = useCallback(
    (progress) => {
      if (!state.seeking) {
        setState((prev) => ({ ...prev, ...progress }));
      }
    },
    [state.seeking]
  );

  const handleSeekMouseDown = useCallback(
    (e) => {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newTime = pos * state.duration;

      setState((prev) => ({
        ...prev,
        seeking: true,
        played: pos,
        hoverPosition: pos,
        hoverTime: newTime,
      }));

      playerRef.current.seekTo(newTime);
    },
    [state.duration]
  );

  const handleSeekChange = useCallback(
    (e) => {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newTime = pos * state.duration;

      setState((prev) => ({
        ...prev,
        played: pos,
        hoverPosition: pos,
        hoverTime: newTime,
      }));
    },
    [state.duration]
  );

  const handleSeekMouseUp = useCallback(
    (e) => {
      if (state.seeking) {
        handleSeekChange(e);
        playerRef.current.seekTo(state.played);
        setState((prev) => ({ ...prev, seeking: false }));
      }
    },
    [handleSeekChange, state.seeking, state.played]
  );

  const handleSeekMouseMove = useCallback(
    (e) => {
      if (state.seeking) {
        handleSeekChange(e);
      } else {
        const rect = progressRef.current.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        setState((prev) => ({
          ...prev,
          hoverPosition: pos,
          hoverTime: pos * prev.duration,
        }));
      }
    },
    [handleSeekChange, state.seeking]
  );

  const inactiveTimerRef = useRef(null);

  const handleVolumeChange = useCallback(
    (e) => {
      if (state.isMobile) return;

      const volume = parseFloat(e.target.value);
      setState((prev) => ({ ...prev, volume, muted: volume === 0 }));

      const slider = e.target;
      const percent = slider.value * 100 + "%";
      slider.style.background = `linear-gradient(to right, white ${percent}, rgba(255, 255, 255, 0.3) ${percent})`;
    },
    [state.isMobile]
  );

  const toggleMute = useCallback(() => {
    setState((prev) => ({ ...prev, muted: !prev.muted }));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!state.isFullscreen) {
      if (playerContainerRef.current.requestFullscreen) {
        playerContainerRef.current.requestFullscreen();
      } else if (playerContainerRef.current.webkitRequestFullscreen) {
        playerContainerRef.current.webkitRequestFullscreen();
      } else if (playerContainerRef.current.msRequestFullscreen) {
        playerContainerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }, [state.isFullscreen]);

  useEffect(() => {
    if (playerContainerRef.current) {
      const slider = playerContainerRef.current.querySelector(".volume-slider");
      if (slider) {
        const percent = ((state.volume - 0) / (1 - 0)) * 100;
        slider.style.background = `linear-gradient(to right, white ${percent}%, rgba(255, 255, 255, 0.3) ${percent}%)`;
      }
    }
  }, [state.volume]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!playerContainerRef.current.contains(document.activeElement)) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          handleRewind(15);
          break;
        case "ArrowRight":
          e.preventDefault();
          handleForward(15);
          break;
        case " ":
          e.preventDefault();
          handlePlayPause();
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "m":
        case "M":
          e.preventDefault();
          toggleMute();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    handleForward,
    handlePlayPause,
    toggleFullscreen,
    toggleMute,
    handleRewind,
  ]);

  useEffect(() => {
    startInactiveTimer();
    return () => clearInactiveTimer();
  }, [startInactiveTimer, clearInactiveTimer]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
      setState((prev) => ({ ...prev, isFullscreen }));

      if (isFullscreen) {
        setTimeout(() => {
          if (playerRef.current) {
            playerRef.current
              .getInternalPlayer()
              ?.style?.setProperty("width", "100%");
            playerRef.current
              .getInternalPlayer()
              ?.style?.setProperty("height", "100%");
          }
        }, 100);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const showSkipButton =
    state.hasStarted &&
    state.played * state.duration < 20 &&
    state.duration > 180;

  return (
    <div
      className="video-player-container"
      ref={playerContainerRef}
      onMouseMove={handleMouseMove}
      style={{ cursor: cursorVisible ? "default" : "none" }}
    >
      <div
        className={`video-wrapper ${
          state.isFullscreen ? "fullscreen-video" : ""
        }`}
        onDoubleClick={toggleFullscreen}
      >
        {state.showPreview && previewImage && (
          <div className="video-preview" onClick={handlePlayPause}>
            <img src={previewImage} alt="Video preview" />
            <div className="video-preview-shadow">
              <div className="play-button-overlay">
                <img src={play} alt="alt-text" />
              </div>
            </div>
          </div>
        )}

        <ReactPlayer
          ref={playerRef}
          url={src}
          width="100%"
          height="100%"
          playing={state.playing}
          volume={state.volume}
          muted={state.muted}
          onProgress={handleProgress}
          onDuration={(duration) => setState((prev) => ({ ...prev, duration }))}
          progressInterval={100}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
                preload: "metadata",
              },
            },
          }}
          style={{ display: state.showPreview ? "none" : "block" }}
        />

        {showSkipButton && (
          <button
            onClick={handleSkipIntro}
            className="control-button skip-button"
          >
            Пропустить заставку
          </button>
        )}
      </div>

      <div
        className="video-controls"
        style={{ opacity: showControls ? 1 : 0 }}
        onMouseEnter={() => {
          setIsControlsHovered(true);
          clearInactiveTimer();
        }}
        onMouseLeave={() => {
          setIsControlsHovered(false);
          startInactiveTimer();
        }}
      >
        <div
          className="progress-container"
          ref={progressRef}
          onMouseDown={handleSeekMouseDown}
          onMouseUp={handleSeekMouseUp}
          onMouseMove={handleSeekMouseMove}
          onMouseLeave={() =>
            setState((prev) => ({ ...prev, hoverTime: null }))
          }
        >
          <div className="loaded-bar" style={{ width: "100%" }}></div>
          <div
            className="loaded-bar"
            style={{ width: `${state.loaded * 100}%` }}
          ></div>
          <div
            className="progress-bar"
            style={{ width: `${state.played * 100}%` }}
          ></div>
          <div
            className="progress-thumb"
            style={{ left: `${state.played * 100}%` }}
          ></div>

          {state.hoverTime !== null && (
            <div
              className="hover-preview"
              style={{ left: `${state.hoverPosition * 100}%` }}
            >
              <div className="hover-time">{formatTime(state.hoverTime)}</div>
            </div>
          )}
        </div>

        <div className="control-buttons">
          <div className="control-buttons-container">
            <button
              onClick={handlePlayPause}
              className="control-button play-pause"
            >
              {state.playing ? (
                <img src={pause} alt="Pause" />
              ) : (
                <img src={play} alt="Play" />
              )}
            </button>
            <button onClick={() => handleRewind(15)} className="control-button">
              <img src={pervVideo} alt="alt-text" />
            </button>
            <button
              onClick={() => handleForward(15)}
              className="control-button"
            >
              <img src={firsVideo} alt="alt-text" />
            </button>

            <div className="time-info">
              {formatTime(state.played * state.duration)} /{" "}
              {formatTime(state.duration)}
            </div>
          </div>

          <div className="control-buttons-container">
            <div
              className="volume-control"
              onMouseEnter={() =>
                !state.isMobile &&
                setState((prev) => ({ ...prev, isVolumeControlHovered: true }))
              }
              onMouseLeave={() =>
                !state.isMobile &&
                setState((prev) => ({ ...prev, isVolumeControlHovered: false }))
              }
            >
              <button
                onClick={state.isMobile ? undefined : toggleMute}
                className="control-button"
                style={state.isMobile ? { cursor: "default" } : {}}
              >
                <img src={getVolumeIcon()} alt="Volume" />
              </button>

              {!state.isMobile && (
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={state.muted ? 0 : state.volume}
                  onChange={handleVolumeChange}
                  className={`volume-slider ${
                    state.isVolumeControlHovered ? "visible" : ""
                  }`}
                />
              )}
            </div>

            <button
              onClick={toggleFullscreen}
              className="control-button fullscreen-button"
            >
              {state.isFullscreen ? (
                <img src={nofullscreen} alt="No Fullscreen" />
              ) : (
                <img src={fullscreen} alt="Fullscreen" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
