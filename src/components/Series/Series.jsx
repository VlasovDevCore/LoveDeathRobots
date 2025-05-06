import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Link, useParams } from "react-router-dom";
import play from "../../assets/images/icon/play.svg";
import "./Series.css";

const Series = ({ series, limit }) => {
  const { seriesSlug } = useParams();

  const [activeSeason, setActiveSeason] = useState(() => {
    const savedSeason = localStorage.getItem("selectedSeason");
    const availableSeasons = [
      ...new Set(series.map((item) => item.season)),
    ].sort();
    return savedSeason && availableSeasons.includes(savedSeason)
      ? savedSeason
      : availableSeasons[0] || "1";
  });

  useEffect(() => {
    localStorage.setItem("selectedSeason", activeSeason);
  }, [activeSeason]);

  const seasons = useMemo(() => {
    return [...new Set(series.map((item) => item.season))].sort(
      (a, b) => parseInt(a) - parseInt(b)
    );
  }, [series]);

  const filteredSeries = useMemo(() => {
    return series
      .filter((item) => item.season === activeSeason)
      .sort((a, b) => parseInt(a.episode) - parseInt(b.episode));
  }, [series, activeSeason]);

  const displayedSeries = limit
    ? filteredSeries.slice(0, limit)
    : filteredSeries;

  return (
    <>
      <div className="season-tabs">
        {seasons.map((season) => (
          <button
            key={season}
            className={`season-tab ${activeSeason === season ? "active" : ""}`}
            onClick={() => setActiveSeason(season)}
          >
            {`Сезон ${season}`}
          </button>
        ))}
      </div>

      <div className="series-container">
        {displayedSeries.map((seriesItem) => (
          <SeriesItem
            key={`${seriesItem.id}-${seriesItem.season}-${seriesItem.episode}`}
            seriesItem={seriesItem}
            isActive={seriesItem.slug === seriesSlug}
          />
        ))}
      </div>
    </>
  );
};

const SeriesItem = ({ seriesItem, isActive }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const itemRef = useRef(null);

  const handleIntersection = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const currentRef = itemRef.current;
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "0px 0px 100px 0px",
      threshold: 0.1,
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleIntersection]);

  return (
    <Link
      to={`/series/${seriesItem.slug}`}
      className="series-link"
      ref={itemRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition:
          "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className={`series-block ${isActive ? "active" : ""}`}>
        <div className={`series-block-preview ${isActive ? "active" : ""}`}>
          {(!isLoaded || hasError) && (
            <div
              className="series-preview-image"
              style={{ background: "#f0f0f0" }}
            />
          )}

          {isVisible && !hasError && (
            <img
              src={seriesItem.image}
              alt={seriesItem.title}
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              style={{
                opacity: isLoaded ? 1 : 0,
                transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                position: isLoaded ? "relative" : "absolute",
              }}
            />
          )}

          <div className="series-preview">
            <img src={play} alt="Play" />
          </div>
        </div>
        <h3>{seriesItem.title}</h3>
        <p>
          {seriesItem.episode} Серия {seriesItem.season} Сезон
        </p>
      </div>
    </Link>
  );
};

export default Series;
