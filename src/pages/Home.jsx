import React from "react";

import Intro from "../components/Intro/Intro";
import Soundtracks from "../components/Soundtracks/Soundtracks";
import Series from "../components/Series/Series";
import Characters from "../components/Characters/Characters";
import Quotes from "../components/Quotes/Quotes";
import useScreenSize from "../utils/hooks/useScreenSize";

import "../components/Intro/intro.css";

import seriesData from "../data/seriesData";
import soundtracksData from "../data/soundtracksData";
import charactersData from "../data/charactersData";
import quotesData from "../data/quotesData";
import preview from "../assets/images/fone/preview.jpg";

const Home = () => {
  const { width } = useScreenSize();

  const getSeriesLimit = () => {
    if (width < 768) return 4;
    if (width < 1024) return 6;
    return 8;
  };

  const getSoundtracksLimit = () => {
    if (width < 768) return 4;
    if (width < 1024) return 6;
    return 7;
  };

  const getCharactersLimit = () => {
    if (width < 1024) return 4;
    return 7;
  };

  return (
    <>
      <title>Любовь.Смерть.Роботы | фан-сайт сериала</title>
      <meta
        name="description"
        content="Фан-сайт культового анимационного сериала 'Любовь.Смерть.Роботы'. Все серии, персонажи, саундтреки и анализ эпизодов. Узнайте больше о ваших любимых историях!"
      />
      <meta property="og:title" content="Любовь.Смерть.Роботы | фан-сайт" />
      <meta
        property="og:description"
        content="Все о культовом анимационном сериале: эпизоды, персонажи, саундтреки и скрытые детали"
      />

      <meta property="og:title" content="Любовь.Смерть.Роботы | фан-сайт" />
      <meta
        property="og:description"
        content="Фан-сайт сериала 'Любовь.Смерть.Роботы': разбор эпизодов, персонажей и саундтреков"
      />
      <meta property="og:image" content={preview} />
      <meta property="og:type" content="video.episode" />
      <meta property="og:url" content="https://lovedierobots.ru.swtest.ru/" />

      <meta name="twitter:card" content={preview} />
      <meta name="twitter:title" content="Любовь.Смерть.Роботы | Фан-сайт" />
      <meta
        name="twitter:description"
        content="Все о сериале 'Любовь.Смерть.Роботы': эпизоды, персонажи и саундтреки"
      />

      <Intro />

      <section className="wrapper">
        <h2>Эпизоды</h2>
        <Series series={seriesData} limit={getSeriesLimit()} />
      </section>

      <section className="wrapper">
        <Characters characters={charactersData} limit={getCharactersLimit()} />
      </section>

      <section>
        <Quotes quotes={quotesData} />
      </section>

      <section className="wrapper">
        <h2>Саундреки</h2>
        <Soundtracks tracks={soundtracksData} limit={getSoundtracksLimit()} />
      </section>
    </>
  );
};

export default Home;
