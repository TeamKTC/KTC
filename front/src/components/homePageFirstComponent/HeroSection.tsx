
import "./HeroSection.css";
import LaptopPhoto from "./photos/LaptopPhoto";
import MainPhoto from "./photos/MainPhotto";
import MiddlePhoto from "./photos/MiddlePhoto";
import PhonesPhoto from "./photos/PhonesPhoto";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* ================= LEFT COLUMN ================= */}
        <div className="hero-content">
          <h1>
            Техніка, яка<br />працює для вас
          </h1>

          <p className="hero-description">
            Обирайте сучасні гаджети з<br />
            гарантією якості та швидкою<br />
            доставкою по Україні
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">Перейти до каталогу</button>
            <button className="btn-secondary">Новинки</button>
          </div>

          <div className="hero-benefits">
            <div className="benefit">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span>Офіційна продукція</span>
            </div>

            <div className="benefit">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span>Гарантія від виробника</span>
            </div>

            <div className="benefit">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              <span>Легке повернення</span>
            </div>
          </div>
        </div>

        {/* ================= CENTER IMAGE ================= */}
        <div className="hero-main-image">
          <MainPhoto />
        </div>

        {/* ================= RIGHT CARDS ================= */}
        <div className="hero-cards">
          
          {/* Card 1 */}
          <div className="hero-card">
            <div className="card-info">
              <h3>
                Знижки до -20%<br />на ноутбуки
              </h3>
              <a href="#" className="card-link">Детальніше</a>
            </div>
            <div className="card-image">
              <LaptopPhoto />
            </div>
          </div>

          {/* Card 2 */}
          <div className="hero-card">
            <div className="card-info">
              <h3>
                Аксесуари зі<br />знижкою
              </h3>
              <a href="#" className="card-link">Детальніше</a>
            </div>
            <div className="card-image">
              <MiddlePhoto />
            </div>
          </div>

          {/* Card 3 */}
          <div className="hero-card">
            <div className="card-info">
              <h3>
                Розстрочка до<br />24 місяців!
              </h3>
              <a href="#" className="card-link">Детальніше</a>
            </div>
            <div className="card-image">
              <PhonesPhoto />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;