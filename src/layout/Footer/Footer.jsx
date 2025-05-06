import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./footer.css";

import logo from "../../assets/images/logo.svg";
import characters from "../../assets/images/icon/characters.svg";
import main from "../../assets/images/icon/main.svg";
import soundtracks from "../../assets/images/icon/soundtracks.svg";
import episodes from "../../assets/images/icon/episodes.svg";
import close from "../../assets/images/icon/Close.svg";

import NFLX from "../../assets/images/icon/NFLX.svg";
import logoMini from "../../assets/images/logo-mini.svg";

const Footer = () => {
  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <footer className="wrapper">
      <div className="footer-container">
        <Link to="/">
          <img src={logo} className="footer-logo" alt="alt-text" />
        </Link>
        <nav className="footer-nav">
          <ul>
            <li>
              <Link
                to="/"
                className={isActive("/") ? "active" : ""}
                onClick={scrollToTop}
              >
                <img src={main} alt="alt-text" /> Главная
              </Link>
            </li>
            <li>
              <Link
                to="/series"
                className={isActive("/series") ? "active" : ""}
                onClick={scrollToTop}
              >
                <img src={episodes} alt="alt-text" /> Все серии
              </Link>
            </li>
            <li>
              <Link
                to="/characters"
                className={isActive("/characters") ? "active" : ""}
                onClick={scrollToTop}
              >
                <img src={characters} alt="alt-text" /> Персонажи
              </Link>
            </li>
            <li>
              <Link
                to="/soundtracks"
                className={isActive("/soundtracks") ? "active" : ""}
                onClick={scrollToTop}
              >
                <img src={soundtracks} alt="alt-text" /> Саундтреки
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="footer-sub">
        <img src={logoMini} alt="alt-text" />
        <img src={close} className="footer-sub-close" alt="alt-text" />
        <img src={NFLX} alt="alt-text" />
      </div>
    </footer>
  );
};

export default Footer;
