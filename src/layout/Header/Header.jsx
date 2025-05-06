import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./header.css";

import Logo from "../../assets/images/logo.svg";
import Menu from "../../assets/images/icon/menu.svg";

import close from "../../assets/images/icon/Close.svg";
import characters from "../../assets/images/icon/characters.svg";
import main from "../../assets/images/icon/main.svg";
import soundtracks from "../../assets/images/icon/soundtracks.svg";
import episodes from "../../assets/images/icon/episodes.svg";

const Header = () => {
  const [openMenu, SetOpenMenu] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    SetOpenMenu(!openMenu);
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="wrapper">
        <Link to="/">
          <img src={Logo} style={{ width: "75px" }} alt="Logo" />
        </Link>

        <button className="header-menu" onClick={handleClick}>
          <img src={Menu} alt="Menu" />
        </button>

        <div
          className={`overlay-header ${openMenu ? "open" : ""} `}
          onClick={handleClick}
        ></div>
        <div className={`navigation ${openMenu ? "open" : ""}`}>
          <button className="navigation-close" onClick={handleClick}>
            <img src={close} alt="close-menu" />
          </button>

          <nav className="nav-navigation" onClick={handleClick}>
            <ul>
              <li>
                <Link to="/" className={isActive("/") ? "active" : ""}>
                  <img src={main} alt="main" /> Главная
                </Link>
              </li>
              <li>
                <Link
                  to="/series"
                  className={isActive("/series") ? "active" : ""}
                >
                  <img src={episodes} alt="episodes" /> Все серии
                </Link>
              </li>
              <li>
                <Link
                  to="/characters"
                  className={isActive("/characters") ? "active" : ""}
                >
                  <img src={characters} alt="characters" /> Персонажи
                </Link>
              </li>
              <li>
                <Link
                  to="/soundtracks"
                  className={isActive("/soundtracks") ? "active" : ""}
                >
                  <img src={soundtracks} alt="soundtracks" /> Саундтреки
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
