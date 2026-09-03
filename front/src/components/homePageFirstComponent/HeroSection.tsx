
import { useNavigate } from "react-router";
import "./HeroSection.css";
import LaptopPhoto from "./photos/LaptopPhoto";
import MainPhoto from "./photos/MainPhotto";
import MiddlePhoto from "./photos/MiddlePhoto";
import PhonesPhoto from "./photos/PhonesPhoto";
import { Trans, useTranslation } from "react-i18next";

const HeroSection = () => {
  const navigate = useNavigate();
  const handleCatalogClick = () => {
        navigate("/cataloge");
    }

    const {t} = useTranslation();
  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* ================= LEFT COLUMN ================= */}
        <div className="hero-content">
          <h1>
            {t("main.hero.title")}<br />{t("main.hero.titleF")}
          </h1>

          <p className="hero-description">
            <Trans i18nKey="main.hero.subtitle" components={{ br: <br /> }} />
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleCatalogClick} style={{ cursor: "pointer" }}>
              {t("main.hero.catalogBtn")}
            </button>
            <button className="btn-secondary">{t("main.hero.newArrivalsBtn")}</button>
          </div>

          <div className="hero-benefits">
            <div className="benefit">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" className="icon" />
                <path d="M9 12l2 2 4-4" className="icon" />
              </svg>
              <span>{t("main.hero.badgeOfficial")}</span>
            </div>

            <div className="benefit">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="icon" />
                <path d="M9 12l2 2 4-4" className="icon" />
              </svg>
              <span>{t("main.hero.badgeWarranty")}</span>
            </div>

            <div className="benefit">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" className="icon" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" className="icon" />
              </svg>
              <span>{t("main.hero.badgeReturn")}</span>
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
                
                <Trans i18nKey="main.hero.promo1Title" components={{ br: <br /> }} />
              </h3>
              <a href="#" className="card-link">{t("main.hero.moreDetails")}</a>
            </div>
            <div className="card-image">
              <LaptopPhoto />
            </div>
          </div>

          {/* Card 2 */}
          <div className="hero-card">
            <div className="card-info">
              <h3>
                <Trans i18nKey="main.hero.promo2Title" components={{ br: <br /> }} />
              </h3>
              <a href="#" className="card-link">{t("main.hero.moreDetails")}</a>
            </div>
            <div className="card-image">
              <MiddlePhoto />
            </div>
          </div>

          {/* Card 3 */}
          <div className="hero-card">
            <div className="card-info">
              <h3>
                <Trans i18nKey="main.hero.promo3Title" components={{ br: <br /> }} />
              </h3>
              <a href="#" className="card-link">{t("main.hero.moreDetails")}</a>
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