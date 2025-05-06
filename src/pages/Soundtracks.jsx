import React, { useState } from "react";

import SoundtracksAll from "../components/Soundtracks/Soundtracks";

import soundtracksData from "../data/soundtracksData";
import IntroImg from "../assets/images/fone/soundtrack.jpg";

import authorTrack from "../assets/images/fone/preview.jpg";
import shareTrack from "../assets/images/icon/share.svg";

const Soundtracks = () => {
  const trackCount = soundtracksData?.length || 0;

  const [isCopied, setIsCopied] = useState(false);

  const copyPageUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {}
  };

  return (
    <>
      <title>Саундтреки Любовь.Смерть.Роботы | Музыка из сериала</title>
      <meta
        name="description"
        content="Полная коллекция саундтреков из сериала 'Любовь.Смерть.Роботы'. Узнайте, какая музыка звучит в ваших любимых эпизодах и кто ее создал."
      />

      <meta
        property="og:title"
        content="Саундтреки Любовь.Смерть.Роботы | Вся музыка сериала"
      />
      <meta
        property="og:description"
        content="Соберите плейлист из лучших треков культового анимационного сериала"
      />
      <meta property="og:image" content="img" />
      <meta property="og:type" content="music.playlist" />
      <meta
        property="og:url"
        content="https://lovedierobots.ru.swtest.ru/soundtracks"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Саундтреки Любовь.Смерть.Роботы" />
      <meta
        name="twitter:description"
        content="Вся музыка из культового анимационного сериала"
      />

      <div className="intro intro-soundtrack">
        <img
          src={IntroImg}
          alt="Intro"
          className={`intro-image`}
          loading="lazy"
        />

        <div className="intro-bg-shadow wrapper"></div>
      </div>

      <section className="wrapper series-all">
        <div className="soundtracks-author">
          <div className="author-avatar">
            <img src={authorTrack} alt="Автор" />
          </div>
          <div className="author-info">
            <div>
              <h2>Любовь.Смерть.Роботы</h2>
              <p>Загруженно треков: {trackCount}</p>
            </div>
            <button className="share-btn" onClick={copyPageUrl}>
              {isCopied ? "Ссылка скопирована!" : "Поделиться"}
              <img src={shareTrack} alt="Поделиться" />
            </button>
          </div>
        </div>
        <SoundtracksAll tracks={soundtracksData} />
      </section>
    </>
  );
};

export default Soundtracks;
