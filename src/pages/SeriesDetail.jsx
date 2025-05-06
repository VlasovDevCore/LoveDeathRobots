import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Добавлен useNavigate
import seriesData from "../data/seriesData";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import Series from "../components/Series/Series";
import preview from "../assets/images/fone/preview.jpg";

const SeriesDetail = () => {
  const { seriesSlug } = useParams();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const seriesItem = seriesData.find((item) => item.slug === seriesSlug);

  useEffect(() => {
    if (!seriesItem) {
      navigate("/404", { replace: true });
    }
  }, [seriesItem, navigate]);

  if (!seriesItem) {
    return null;
  }

  return (
    <>
      <title>{`${seriesItem.title} | Любовь.Смерть.Роботы - подробный разбор`}</title>
      <meta
        name="description"
        content={`Подробный анализ эпизода "${seriesItem.title}" из сериала "Любовь.Смерть.Роботы". Сюжет, персонажи, скрытые смыслы и интересные факты.`}
      />

      <meta
        property="og:title"
        content={`${seriesItem.title} | Разбор эпизода`}
      />
      <meta
        property="og:description"
        content={`Узнайте все об эпизоде "${seriesItem.title}" культового сериала "Любовь.Смерть.Роботы"`}
      />
      <meta property="og:image" content={seriesItem.image || preview} />
      <meta property="og:type" content={seriesItem.video} />
      <meta
        property="og:url"
        content={`https://lovedierobots.ru.swtest.ru/series/${seriesItem.slug}`}
      />
      <meta name="twitter:card" content={preview} />
      <meta
        name="twitter:title"
        content={`${seriesItem.title} | Любовь.Смерть.Роботы`}
      />
      <meta
        name="twitter:description"
        content={`Разбор и анализ эпизода "${seriesItem.title}" из сериала "Любовь.Смерть.Роботы"`}
      />

      <div className="intro">
        {(!imageLoaded || imageError) && (
          <img
            src={preview}
            className="intro-image preview"
            alt="Превью"
            style={{ opacity: 1 }}
          />
        )}

        <img
          src={seriesItem.image}
          className={`intro-image ${imageLoaded ? "loaded" : ""}`}
          alt={seriesItem.title}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          style={{ opacity: imageLoaded && !imageError ? 1 : 0 }}
        />

        <div className="intro-bg-shadow"></div>
      </div>

      <section className="series-view wrapper">
        <div className="series-info">
          <div className="series-info-video">
            <VideoPlayer src={seriesItem.video} />
          </div>

          <div className="series-info-content">
            <div className="series-info-title">
              <h1>{seriesItem.title}</h1>
              <p className="episode-info">
                {seriesItem.episode} Серия {seriesItem.season} Сезон
              </p>
            </div>
            <p className="series-info-text">{seriesItem.description}</p>
            <div className="series-info-shadow"></div>
          </div>
        </div>

        <Series series={seriesData} />
      </section>
    </>
  );
};

export default SeriesDetail;
