import React from "react";
import Characters from "../components/Characters/Characters";
import charactersData from "../data/charactersData";

import IntroImg from "../assets/images/fone/characters.jpg";
import preview from "../assets/images/fone/preview.jpg";

const CharactersAll = () => {
  return (
    <>
      <title>
        Персонажи сериала Любовь.Смерть.Роботы | Характеристики и анализ
      </title>
      <meta
        name="description"
        content="Все персонажи культового сериала 'Любовь.Смерть.Роботы'. Подробные характеристики, анализ ролей и влияние на сюжет. Узнайте больше о ваших любимых героях!"
      />
      <meta
        property="og:title"
        content="Персонажи Любовь.Смерть.Роботы | Полный гид"
      />
      <meta
        property="og:description"
        content="Все герои культового анимационного сериала: от роботов-убийц до древних демонов"
      />
      <meta property="og:image" content={preview} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://lovedierobots.ru.swtest.ru/characters"
      />
      <meta name="twitter:card" content={preview} />
      <meta name="twitter:title" content="Персонажи Любовь.Смерть.Роботы" />
      <meta
        name="twitter:description"
        content="Полный гид по всем персонажам культового сериала"
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
        <Characters characters={charactersData} />
      </section>
    </>
  );
};

export default CharactersAll;
