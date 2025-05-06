import React, { useState, useEffect, useCallback } from "react";
import "./quotes.css";

const QuotesData = ({ quotes }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  const changeQuote = useCallback(() => {
    setFadingOut(true);
    setProgress(0);

    setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) =>
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
      setFadingOut(false);
    }, 600);
  }, [quotes.length]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 100 / (8000 / 30);
      });
    }, 30);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(changeQuote, 8000);
    return () => clearInterval(quoteInterval);
  }, [changeQuote]);

  if (!quotes || quotes.length === 0) {
    return (
      <div className="quotes-container">
        <h2>Цитаты</h2>
        <p>Нет доступных цитат</p>
      </div>
    );
  }

  return (
    <>
      <div className="quotes-container">
        <h2>Цитаты</h2>

        <div className="quote-container">
          <div
            className={`quote-content ${fadingOut ? "fade-out" : "fade-in"}`}
          >
            <p className="quote-text">"{quotes[currentQuoteIndex].text}"</p>
            <p className="quote-author">— {quotes[currentQuoteIndex].author}</p>
          </div>
        </div>
      </div>
      <div className="quote-progress-bar">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>
    </>
  );
};

export default QuotesData;
