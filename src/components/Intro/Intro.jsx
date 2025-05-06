import React, { useState, useEffect, useRef } from "react";

import IntroImg from "../../assets/images/fone/intro.jpg";
import Netflix from "../../assets/images/icon/NFLX.svg";

import introVideo from "../../assets/video/intro/fone.mp4";

import "./intro.css";

const Intro = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile || !("IntersectionObserver" in window)) {
      setShowVideo(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowVideo(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="intro" ref={containerRef}>
      {(!showVideo || !isVideoLoaded) && (
        <img
          src={IntroImg}
          alt="Intro"
          className={`intro-image ${isVideoLoaded ? "fade-out" : ""}`}
          loading="lazy"
        />
      )}

      {showVideo && (
        <video
          ref={videoRef}
          className={`intro-video ${isVideoLoaded ? "fade-in" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setIsVideoLoaded(true)}
          src={introVideo}
        />
      )}

      <div className="intro-bg-shadow wrapper">
        <div className="intro-shadow-title">
          <h1>Любовь. Смерть. Роботы</h1>
          <p>
            Антология от Netflix, где будущее, мифы и безумие сталкиваются в 18+
            визуальном безумии.
          </p>
          <img src={Netflix} alt="Netflix" />
        </div>
      </div>
    </div>
  );
};

export default Intro;
