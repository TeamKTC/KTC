import React from "react";
import ForGaming from "./photos/ForGaming";
import ForHome from "./photos/ForHome";
import HeadPhones from "./photos/HeadPhones";
import KeyaboardAndMouse from "./photos/KeyboardAndMouse";
import Watch from "./photos/Watch";
import "./PickedForYou.css";

const PickedForYou: React.FC = () => {
  return (
    <section className="picked-section">
      <h2 className="picked-title">Підібрано для вас</h2>

      <div className="picked-grid">
        {/* ================= 1. Картка "Для роботи та навчання" ================= */}
        <div className="card card-yellow">
          <div className="card-bg-layer">
            <HeadPhones />
          </div>
          <div className="card-content">
            <h3>
              Для роботи
              <br />
              та навчання
            </h3>
            <p>
              Надійні пристрої для
              <br />
              продуктивності
            </p>
            <button className="btn-outline">Детальніше</button>
          </div>
        </div>

        {/* ================= 2. Картка "Периферія для комфорту" ================= */}
        <div className="card card-blue-bg">
          <div className="card-content">
            <h3>
              Периферія
              <br />
              для комфорту
            </h3>
            <p>
              Клавіатура, миші,
              <br />
              килимки та інше
            </p>
            <button className="btn-blue-outline">Детальніше</button>
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
            <h3>Для геймерів</h3>
            <p>
              Максимальна швидкість
              <br />
              та повне занурення
            </p>
            <button className="btn-teal-outline">Детальніше</button>
          </div>
        </div>

        {/* ================= 4. Права колонка з 2 малими картками ================= */}
        <div className="right-column">
          {/* Мала картка 1: Для дому */}
          <div className="card card-small card-blue-bg">
            <div className="card-content">
              <h3>Для дому</h3>
              <p>
                Техніка, яка
                <br />
                спрощує побут
              </p>
              <button className="btn-blue-outline">Переглянути</button>
            </div>
            <div className="card-item-icon icon-home">
              <ForHome />
            </div>
          </div>

          {/* Мала картка 2: Смарт-пристрої */}
          <div className="card card-small card-blue-bg">
            <div className="card-content">
              <h3>Смарт-пристрої</h3>
              <p>
                Все для розумного дому
                <br />в одному місці
              </p>
              <button className="btn-blue-outline">Переглянути</button>
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