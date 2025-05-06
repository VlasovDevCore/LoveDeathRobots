import { Link } from "react-router-dom";

import "../assets/css/global.css";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <title>404 | СЕКТОР НЕ НАЙДЕН</title>
      <meta
        name="description"
        content="Запрашиваемый цифровой сектор не существует"
      />

      <div className="error-code">
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </div>

      <p className="error-message">СЕКТОР НЕ НАЙДЕН</p>

      <div className="divider-line"></div>

      <p className="error-description">
        Запрошенный цифровой сектор был удалён или никогда не существовал в
        сети.
      </p>

      <Link to="/" className="return-button">
        RETURN TO HUB
      </Link>
    </div>
  );
}
