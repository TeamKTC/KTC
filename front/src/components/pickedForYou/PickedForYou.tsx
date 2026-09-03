import React from "react";
import ForGaming from "./photos/ForGaming";
import ForHome from "./photos/ForHome";
import HeadPhones from "./photos/HeadPhones";
import KeyaboardAndMouse from "./photos/KeyboardAndMouse";
import Watch from "./photos/Watch";
import "./PickedForYou.css";
import { Trans, useTranslation } from "react-i18next";

const PickedForYou: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="picked-section">
      <h2 className="picked-title">{t("main.sections.pickedForYou")}</h2>

      <div className="picked-grid">
        {/* ================= 1. Картка "Для роботи та навчання" ================= */}
        <div className="card card-yellow">
          <div className="card-bg-layer">
            <HeadPhones />
          </div>
          <div className="card-content">
            <h3>
             <Trans i18nKey="main.curated.workTitle" components={{ br: <br /> }} />
            </h3>
            <p>
              <Trans i18nKey="main.curated.workDesc" components={{ br: <br /> }} />
              </p>
            <button className="btn-outline">{t("main.curated.moreDetails")}</button>
          </div>
        </div>

        {/* ================= 2. Картка "Периферія для комфорту" ================= */}
        <div className="card card-blue-bg">
          <div className="card-content">
            <h3>
              <Trans i18nKey="main.curated.peripheralsTitle" components={{ br: <br /> }} />
            </h3>
            <p>
              <Trans i18nKey="main.curated.peripheralsDesc" components={{ br: <br /> }} />
            </p>
            <button className="btn-blue-outline">{t("main.curated.moreDetails")}</button>
          </div>
          <div className="card-item-icon icon-peripherals">
            <KeyaboardAndMouse />
          </div>
        </div>

        {/* ================= 3. Картка "Для геймерів" ================= */}
        <div className="card card-gamer-bg">
          <div className="card-bg-layer">
            <ForGaming />
          </div>
          <div className="card-content">
            <h3>
              <Trans i18nKey="main.curated.gamersTitle" components={{ br: <br /> }} />
            </h3>
            <p>
              <Trans i18nKey="main.curated.gamersDesc" components={{ br: <br /> }} />
            </p>
            <button className="btn-teal-outline">{t("main.curated.moreDetails")}</button>
          </div>
        </div>

        {/* ================= 4. Права колонка з 2 малими картками ================= */}
        <div className="right-column">
          {/* Мала картка 1: Для дому */}
          <div className="card card-small card-blue-bg">
            <div className="card-content">
              <h3>
                <Trans i18nKey="main.curated.homeTitle" components={{ br: <br /> }} />
              </h3>
              <p>
                <Trans i18nKey="main.curated.homeDesc" components={{ br: <br /> }} />
              </p>
              <button className="btn-blue-outline">{t("main.curated.view")}</button>
            </div>
            <div className="card-item-icon icon-home">
              <ForHome />
            </div>
          </div>

          {/* Мала картка 2: Смарт-пристрої */}
          <div className="card card-small card-blue-bg">
            <div className="card-content">
              <h3>
                <Trans i18nKey="main.curated.smartTitle" components={{ br: <br /> }} />
              </h3>
              <p>
                <Trans i18nKey="main.curated.smartDesc" components={{ br: <br /> }} />
              </p>
              <button className="btn-blue-outline">{t("main.curated.view")}</button>
            </div>
            <div className="card-item-icon icon-smart">
              <Watch />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PickedForYou;