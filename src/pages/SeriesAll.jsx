import React from "react";
import Series from "../components/Series/Series";
import seriesData from "../data/seriesData";

import IntroImg from "../assets/images/fone/intro.jpg";
import preview from "../assets/images/fone/preview.jpg";

const SeriesAll = () => {
  return (
    <>
      <title>
        Все серии Любовь.Смерть.Роботы | Полный список эпизодов с описанием
      </title>
      <meta
        name="description"
        content="Все серии культового сериала 'Любовь.Смерть.Роботы' в одном месте. Краткое описание каждой серии, рейтинги, скрытые детали и анализ сюжетов."
      />

      {/* OpenGraph / Facebook */}
      <meta
        property="og:title"
        content="Все серии Любовь.Смерть.Роботы | Полный список эпизодов"
      />
      <meta
        property="og:description"
        content="Смотрите все эпизоды сериала 'Любовь.Смерть.Роботы' с описанием, скриншотами и анализом."
      />
      <meta property="og:image" content={preview} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://lovedierobots.ru.swtest.ru/series"
      />

      <meta name="twitter:card" content={preview} />
      <meta
        name="twitter:title"
        content="Все серии Любовь.Смерть.Роботы | Полный гид"
      />
      <meta
        name="twitter:description"
        content="Все эпизоды сериала в одном месте: описания, рейтинги и скрытые отсылки."
      />
      <meta
        name="twitter:image"
        content="https://example.com/images/ldr-all-episodes-preview.jpg"
      />

      <meta
        name="keywords"
        content="любовь смерть роботы, все серии, список эпизодов, LD+R, Netflix, описание серий"
      />
      <link
        rel="canonical"
        href="https://lovedierobots.ru.swtest.ruall-episodes"
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
        <h2>Все эпизоды</h2>

        <Series series={seriesData} />
      </section>
    </>
  );
};

export default SeriesAll;
