import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import WaveSurfer from "wavesurfer.js";
import "./Soundtracks.css";

import play from "../../assets/images/icon/play.svg";
import pause from "../../assets/images/icon/pause.svg";

const FadeIn = ({ children, delay = 0 }) => {
  return (
    <div
      style={{
        animation: `fadeIn 0.5s ease-out ${delay}ms forwards`,
        opacity: 0,
      }}
    >
      {children}
    </div>
  );
};

const TrackItem = memo(
  ({
    track,
    isPlaying,
    isLoading,
    isCurrent,
    onPlayPause,
    waveformRef,
    index,
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <FadeIn delay={index * 100}>
        <div
          className="soundtrack-card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            className="play-button"
            onClick={onPlayPause}
            disabled={isLoading && isCurrent}
            style={{
              transform: isHovered || isCurrent ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.2s ease",
            }}
          >
            {isLoading && isCurrent ? (
              <div className="loading"></div>
            ) : isPlaying && isCurrent ? (
              <img src={pause} alt="Pause" />
            ) : (
              <img src={play} alt="Play" />
            )}
          </button>

          <div className="track-content">
            <div
              className="track-info"
              style={{
                transform: isHovered ? "translateX(5px)" : "translateX(0)",
                transition: "transform 0.3s ease",
              }}
            >
              <h3>{track.title}</h3>
              <span>{track.duration}</span>
            </div>

            <div
              ref={waveformRef}
              className="waveform-container"
              style={{
                opacity: isCurrent ? 1 : 0.7,
                transition: "opacity 0.3s ease",
              }}
            />
          </div>
        </div>
      </FadeIn>
    );
  }
);

const Soundtracks = ({ tracks, limit }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const waveformRefs = useRef({});
  const wavesurfers = useRef({});
  const observerRef = useRef(null);

  const cleanupWaveSurfers = useCallback(() => {
    Object.values(wavesurfers.current).forEach((wavesurfer) => {
      if (wavesurfer) {
        if (wavesurfer.isPlaying()) {
          wavesurfer.stop();
        }
        wavesurfer.destroy();
      }
    });
    wavesurfers.current = {};
  }, []);

  const initializeWaveSurfer = useCallback((track) => {
    if (wavesurfers.current[track.id] || !waveformRefs.current[track.id]) {
      return;
    }

    const wavesurfer = WaveSurfer.create({
      container: waveformRefs.current[track.id],
      waveColor: "#838383",
      progressColor: "#fff",
      cursorWidth: 0,
      barWidth: 4,
      barGap: 5,
      barRadius: 2,
      height: 30,
      responsive: true,
      barMinHeight: 0.1,
      normalize: true,
      partialRender: true,
      backend: "WebAudio",
      interact: true,
    });

    wavesurfers.current[track.id] = wavesurfer;

    const handleReady = () => {
      setIsLoading(false);
      wavesurfer.play();
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleFinish = () => {
      setIsPlaying(false);
    };

    const handleError = (error) => {
      console.error("Error loading audio:", error);
      setIsLoading(false);
    };

    wavesurfer.on("ready", handleReady);
    wavesurfer.on("play", handlePlay);
    wavesurfer.on("pause", handlePause);
    wavesurfer.on("finish", handleFinish);
    wavesurfer.on("error", handleError);

    setIsLoading(true);
    wavesurfer.load(track.audioSrc);

    return () => {
      wavesurfer.un("ready", handleReady);
      wavesurfer.un("play", handlePlay);
      wavesurfer.un("pause", handlePause);
      wavesurfer.un("finish", handleFinish);
      wavesurfer.un("error", handleError);
    };
  }, []);

  useEffect(() => {
    return () => {
      cleanupWaveSurfers();
      observerRef.current?.disconnect();
    };
  }, [cleanupWaveSurfers]);

  const handlePlayPause = useCallback(
    (track) => {
      if (currentTrack?.id === track.id) {
        if (isPlaying) {
          wavesurfers.current[track.id]?.pause();
        } else {
          wavesurfers.current[track.id]?.play();
        }
      } else {
        cleanupWaveSurfers();

        setCurrentTrack(track);
        setIsLoading(true);

        if (!wavesurfers.current[track.id]) {
          initializeWaveSurfer(track);
        } else {
          wavesurfers.current[track.id].play();
        }
      }
    },
    [currentTrack, isPlaying, initializeWaveSurfer, cleanupWaveSurfers]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const trackId = entry.target.dataset.trackId;
            const track = tracks.find((t) => t.id === trackId);
            if (track) {
              initializeWaveSurfer(track);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: "100px 0px" }
    );

    observerRef.current = observer;

    tracks.slice(0, limit).forEach((track) => {
      const element =
        waveformRefs.current[track.id]?.parentElement?.parentElement;
      if (element) {
        element.dataset.trackId = track.id;
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [tracks, limit, initializeWaveSurfer]);

  return (
    <div className="soundtracks-list">
      {tracks.slice(0, limit).map((track, index) => (
        <TrackItem
          key={track.id}
          track={track}
          isPlaying={isPlaying}
          isLoading={isLoading}
          isCurrent={currentTrack?.id === track.id}
          onPlayPause={() => handlePlayPause(track)}
          waveformRef={(el) => (waveformRefs.current[track.id] = el)}
          index={index}
        />
      ))}
    </div>
  );
};

export default Soundtracks;
