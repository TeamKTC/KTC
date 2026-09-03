import { useState } from "react";
import {
    ShoppingCart,
    UserRound,
    ChevronDown,
    Box,
} from "lucide-react";

import { useGetMeQuery } from "../../../store/services/userApi";

import "./CheckoutForm.css";

interface CheckoutFormProps {
    delivery: string;
    onDeliveryChange: (value: string) => void;
    usedBonuses: number;
    onBonusesChange: (value: number) => void;
}

const CheckoutForm = ({
    delivery,
    onDeliveryChange,
    usedBonuses,
    onBonusesChange,
}: CheckoutFormProps) => {
    const [payment, setPayment] = useState("cash");
    const [city, setCity] = useState("Рівне");
    const [department, setDepartment] = useState("");
    const [address, setAddress] = useState("");
    const [installmentBank, setInstallmentBank] =
        useState("privat");

    const { data } = useGetMeQuery();

    const user = data?.payload;
    const availableBonuses = user?.bonusBalance ?? 0;

    return (
        <div className="checkout-form">
            {/* КОНТАКТНІ ДАНІ */}
            <section className="checkout-section">
                <div className="checkout-section__title">
                    <span className="checkout-section__number">
                        1
                    </span>

                    <h2>Контактні дані</h2>
                </div>

                <div className="checkout-fields">
                    <div className="checkout-field">
                        <label htmlFor="firstName">
                            Ім’я
                        </label>

                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            defaultValue={
                                user?.firstName ?? ""
                            }
                            required
                        />
                    </div>

                    <div className="checkout-field">
                        <label htmlFor="lastName">
                            Прізвище
                        </label>

                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            defaultValue={
                                user?.lastName ?? ""
                            }
                            required
                        />
                    </div>

                    <div className="checkout-field">
                        <label htmlFor="phone">
                            Телефон
                        </label>

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            defaultValue={
                                user?.phoneNumber ?? ""
                            }
                            required
                        />
                    </div>

                    <div className="checkout-field">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={
                                user?.email ?? ""
                            }
                            required
                        />
                    </div>
                </div>
            </section>

            {/* ДОСТАВКА */}
            <section
                className={`checkout-section checkout-section--delivery ${
                    delivery === "pickup"
                        ? "checkout-section--pickup"
                        : "checkout-section--expanded"
                }`}
            >
                <div className="checkout-section__title">
                    <span className="checkout-section__number">
                        2
                    </span>

                    <h2>Доставка</h2>
                </div>

                <div className="checkout-options checkout-options--delivery">
                    {/* САМОВИВІЗ */}
                    <button
                        type="button"
                        className={`checkout-option ${
                            delivery === "pickup"
                                ? "checkout-option--active"
                                : ""
                        }`}
                        onClick={() => {
                            onDeliveryChange("pickup");
                            setDepartment("");
                            setAddress("");
                        }}
                    >
                        <span className="checkout-radio">
                            {delivery === "pickup" && (
                                <span />
                            )}
                        </span>

                        <ShoppingCart className="checkout-option__icon" />

                        <span className="checkout-option__content">
                            <strong>Самовивіз</strong>

                            <small>
                                Забрати в магазині
                            </small>
                        </span>
                    </button>

                    {/* НОВА ПОШТА */}
                    <button
                        type="button"
                        className={`checkout-option ${
                            delivery === "nova"
                                ? "checkout-option--active"
                                : ""
                        }`}
                        onClick={() => {
                            onDeliveryChange("nova");
                            setAddress("");
                        }}
                    >
                        <span className="checkout-radio">
                            {delivery === "nova" && (
                                <span />
                            )}
                        </span>

                        <Box className="checkout-option__icon" />

                        <span className="checkout-option__content">
                            <strong>Нова пошта</strong>

                            <small>
                                Доставка у відділення
                            </small>
                        </span>
                    </button>

                    {/* КУР’ЄР */}
                    <button
                        type="button"
                        className={`checkout-option ${
                            delivery === "courier"
                                ? "checkout-option--active"
                                : ""
                        }`}
                        onClick={() => {
                            onDeliveryChange("courier");
                            setDepartment("");
                        }}
                    >
                        <span className="checkout-radio">
                            {delivery === "courier" && (
                                <span />
                            )}
                        </span>

                        <UserRound className="checkout-option__icon" />

                        <span className="checkout-option__content">
                            <strong>Кур’єр</strong>

                            <small>
                                Доставка кур’єром
                            </small>
                        </span>
                    </button>
                </div>

                {/* МІСТО */}
                {delivery !== "pickup" && (
                    <div className="checkout-field checkout-field--city">
                        <label htmlFor="city">
                            Місто*
                        </label>

                        <div className="checkout-select">
                            <select
                                id="city"
                                name="city"
                                value={city}
                                onChange={(e) =>
                                    setCity(e.target.value)
                                }
                                required
                            >
                                <option value="">
                                    Оберіть місто
                                </option>

                                <option value="Рівне">
                                    Рівне
                                </option>

                                <option value="Київ">
                                    Київ
                                </option>

                                <option value="Львів">
                                    Львів
                                </option>

                                <option value="Одеса">
                                    Одеса
                                </option>

                                <option value="Харків">
                                    Харків
                                </option>

                                <option value="Дніпро">
                                    Дніпро
                                </option>
                            </select>

                            <ChevronDown size={18} />
                        </div>
                    </div>
                )}

                {/* ВІДДІЛЕННЯ НОВОЇ ПОШТИ */}
                {delivery === "nova" && (
                    <div className="checkout-field checkout-field--department">
                        <label htmlFor="department">
                            Відділення*
                        </label>

                        <div className="checkout-select">
                            <select
                                id="department"
                                name="department"
                                value={department}
                                onChange={(e) =>
                                    setDepartment(
                                        e.target.value
                                    )
                                }
                                required
                            >
                                <option value="">
                                    Оберіть відділення
                                </option>

                                <option value="1">
                                    Відділення №1
                                </option>

                                <option value="2">
                                    Відділення №2
                                </option>

                                <option value="3">
                                    Відділення №3
                                </option>

                                <option value="4">
                                    Відділення №4
                                </option>

                                <option value="5">
                                    Відділення №5
                                </option>
                            </select>

                            <ChevronDown size={18} />
                        </div>
                    </div>
                )}

                {/* АДРЕСА КУР’ЄРА */}
                {delivery === "courier" && (
                    <div className="checkout-field checkout-field--department">
                        <label htmlFor="address">
                            Адреса*
                        </label>

                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                            placeholder="Вулиця, будинок, квартира"
                            required
                        />
                    </div>
                )}

                {/* Передаємо вибрану доставку у FormData */}
                <input
                    type="hidden"
                    name="deliveryType"
                    value={delivery}
                />
            </section>

            {/* ОПЛАТА */}
            <section
                className={`checkout-section checkout-section--payment ${
                    payment === "cash"
                        ? "checkout-section--payment-cash"
                        : payment === "card"
                        ? "checkout-section--payment-card"
                        : "checkout-section--payment-installment"
                }`}
            >
                <div className="checkout-section__title">
                    <span className="checkout-section__number">
                        3
                    </span>

                    <h2>Оплата</h2>
                </div>

                <div className="checkout-options checkout-options--payment">
                    {/* ГОТІВКА */}
                    <button
                        type="button"
                        className={`checkout-option ${
                            payment === "cash"
                                ? "checkout-option--active"
                                : ""
                        }`}
                        onClick={() =>
                            setPayment("cash")
                        }
                    >
                        <span className="checkout-radio">
                            {payment === "cash" && (
                                <span />
                            )}
                        </span>

                        <span className="checkout-option__content">
                            <strong>
                                Готівка при отриманні
                            </strong>

                            <small>
                                Оплата при отриманні
                            </small>
                        </span>
                    </button>

                    {/* КАРТКА */}
                    <button
                        type="button"
                        className={`checkout-option ${
                            payment === "card"
                                ? "checkout-option--active"
                                : ""
                        }`}
                        onClick={() =>
                            setPayment("card")
                        }
                    >
                        <span className="checkout-radio">
                            {payment === "card" && (
                                <span />
                            )}
                        </span>

                        <span className="checkout-option__content">
                            <strong>
                                Оплата карткою онлайн
                            </strong>

                            <small>
                                Visa, Mastercard, Apple Pay
                            </small>
                        </span>
                    </button>

                    {/* ЧАСТИНАМИ */}
                    <button
                        type="button"
                        className={`checkout-option ${
                            payment === "installment"
                                ? "checkout-option--active"
                                : ""
                        }`}
                        onClick={() =>
                            setPayment("installment")
                        }
                    >
                        <span className="checkout-radio">
                            {payment === "installment" && (
                                <span />
                            )}
                        </span>

                        <span className="checkout-option__content">
                            <strong>
                                Оплата частинами
                            </strong>

                            <small>
                                ПриватБанк, Monobank
                            </small>
                        </span>
                    </button>
                </div>

                {/* Важливо для FormData */}
                <input
                    type="hidden"
                    name="paymentType"
                    value={payment}
                />

                <input
                    type="hidden"
                    name="installmentBank"
                    value={
                        payment === "installment"
                            ? installmentBank
                            : ""
                    }
                />

                {/* КАРТКА */}
                {payment === "card" && (
                    <div className="payment-extra payment-extra--card">
                        <div className="payment-extra__text">
                            <strong>
                                Безпечна оплата карткою
                            </strong>

                            <span>
                                Після оформлення замовлення
                                ви перейдете до захищеної
                                сторінки оплати.
                            </span>
                        </div>

                        <div className="payment-extra__cards">
                            <span>VISA</span>
                            <span>Mastercard</span>
                            <span>Apple Pay</span>
                        </div>
                    </div>
                )}

                {/* ЧАСТИНАМИ */}
                {payment === "installment" && (
                    <div className="payment-extra payment-extra--installment">
                        <div className="installment-banks">
                            <button
                                type="button"
                                className={`installment-bank ${
                                    installmentBank ===
                                    "privat"
                                        ? "installment-bank--active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setInstallmentBank(
                                        "privat"
                                    )
                                }
                            >
                                <strong>
                                    ПриватБанк
                                </strong>

                                <small>
                                    Оплата частинами
                                </small>
                            </button>

                            <button
                                type="button"
                                className={`installment-bank ${
                                    installmentBank ===
                                    "mono"
                                        ? "installment-bank--active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setInstallmentBank(
                                        "mono"
                                    )
                                }
                            >
                                <strong>
                                    Monobank
                                </strong>

                                <small>
                                    Покупка частинами
                                </small>
                            </button>
                        </div>

                        <div className="installment-info">
                            <strong>
                                До 6 платежів без
                                переплати
                            </strong>

                            <span>
                                Точні умови та кількість
                                платежів будуть доступні
                                під час оформлення.
                            </span>
                        </div>
                    </div>
                )}
            </section>

            {/* КОМЕНТАР */}
            <section className="checkout-section checkout-section--comment">
                <div className="checkout-section__title">
                    <span className="checkout-section__number">
                        4
                    </span>

                    <h2>
                        Коментар до замовлення
                    </h2>
                </div>

                <textarea
                    name="comment"
                    placeholder="Додайте коментар до замовлення (не обов’язково)"
                />
            </section>

            {/* БОНУСИ */}
            <section className="checkout-section checkout-section--bonuses">
                <div className="checkout-section__title">
                    <span className="checkout-section__number">
                        5
                    </span>

                    <h2>Використати бонуси</h2>
                </div>

                <div className="bonus-row">
                    <label className="bonus-checkbox">
                        <input
                            type="checkbox"
                            checked={usedBonuses > 0}
                            onChange={(e) => {
                                onBonusesChange(
                                    e.target.checked
                                        ? availableBonuses
                                        : 0
                                );
                            }}
                        />

                        <span className="bonus-checkbox__custom" />

                        <span className="bonus-checkbox__content">
                            <strong>
                                Використати мої бонуси
                            </strong>

                            <small>
                                Доступно:{" "}
                                {availableBonuses} бонусів
                            </small>
                        </span>
                    </label>

                    <div className="bonus-price">
                        <span>
                            - {usedBonuses} грн
                        </span>

                        <small>
                            до оплати
                        </small>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CheckoutForm;