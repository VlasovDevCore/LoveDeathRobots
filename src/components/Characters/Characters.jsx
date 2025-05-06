import React, { useState, useEffect, useRef } from "react";
import "./Characters.css";
import close from "../../assets/images/icon/Close.svg";
import preview from "../../assets/images/fone/preview.jpg";

const ImageWithPreview = ({ src, alt, className, inModal = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (isLoaded && !hasError) {
      const timer = setTimeout(() => setShowPreview(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, hasError]);

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    setShowPreview(true);
  };

  if (inModal) {
    return (
      <div className={`image-container ${className}`}>
        {hasError || !src ? (
          <img src={preview} alt="Preview" className="image-preview" />
        ) : (
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            className="image-real"
          />
        )}
      </div>
    );
  }

  return (
    <div className={`image-container ${className}`}>
      {(showPreview || hasError) && (
        <img
          src={preview}
          alt="Preview"
          className={`image-preview ${isLoaded && !hasError ? "fade-out" : ""}`}
        />
      )}
      {!hasError && src && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`image-real ${isLoaded ? "fade-in" : ""}`}
        />
      )}
    </div>
  );
};

const ImagePlaceholder = ({ title }) => (
  <div className="image-placeholder">
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <rect width="100%" height="100%" fill="#f0f0f0" />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#666"
        fontFamily="Arial"
        fontSize="10"
      >
        {title ? title.charAt(0).toUpperCase() : "?"}
      </text>
    </svg>
  </div>
);

const Characters = ({ characters, limit }) => {
  return (
    <>
      <h2>Персонажи</h2>
      <div className="characters-container">
        {characters.slice(0, limit).map((character) => (
          <CharacterItem key={character.id} character={character} />
        ))}
      </div>
    </>
  );
};

const CharacterItem = ({ character }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const itemRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px 100px 0px", threshold: 0.1 }
    );
    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setIsModalVisible(true), 10);
    } else {
      setIsModalVisible(false);
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className="character-link"
        ref={itemRef}
        onClick={openModal}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
          cursor: "pointer",
        }}
      >
        <div className="character-block">
          <div className="character-image">
            {character.image ? (
              <ImageWithPreview src={character.image} alt={character.title} />
            ) : (
              <ImagePlaceholder title={character.title} />
            )}
          </div>
          <h3>{character.title}</h3>
        </div>
      </div>

      {isModalOpen && (
        <div
          className={`modal-overlay ${isModalVisible ? "visible" : ""}`}
          onClick={closeModal}
          ref={modalRef}
        >
          <div
            className={`modal-content ${isModalVisible ? "visible" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              <img src={close} alt="Закрыть" />
            </button>
            <div className="modal-character-image">
              {character.image ? (
                <ImageWithPreview
                  src={character.image}
                  alt={character.title}
                  inModal={true}
                />
              ) : (
                <ImagePlaceholder title={character.title} />
              )}
            </div>
            <div className="modal-character-info">
              <h2>{character.title}</h2>
              <p>
                {character.description || "Описание персонажа отсутствует."}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Characters;
