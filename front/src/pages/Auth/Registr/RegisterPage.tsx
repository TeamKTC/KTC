import { useState } from "react";
import { useRegisterMutation } from "../../../store/services/authApi";
import logo from "../../../foto/fotoktcnorm.png";
import googleIcon from "../../../foto/free-icon-mail-4360562.png";
import appleIcon from "../../../foto/free-icon-apple-logo-747.png";
import "./RegisterPage.css";

interface RegisterPageProps {
    onClose: () => void;
    onOpenLogin: () => void;
}

export default function RegisterPage({
    onClose,
    onOpenLogin,
}: RegisterPageProps) {
    const [register] = useRegisterMutation();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

const handleRegister = async () => {
    try {
        const result = await register({
            phoneNumber,
            firstName,
            lastName,
            email,
            password,
        }).unwrap();

alert(result.message);

setTimeout(() => {
    onOpenLogin();
}, 100);


    }
    catch {
        alert("Помилка реєстрації");
    }
};

    return (
        <div className="register-card">

            <button
                className="close-btn"
                onClick={onClose}
            >
                ✕
            </button>

            <div className="logo">
                <img src={logo} alt="Logo" className="logo-icon" />

                <div className="logo-text">
                    <span className="pixel">Pixel</span>
                    <span className="room">Room</span>
                </div>
            </div>

            <h1 className="register-title">
                Створити акаунт
            </h1>

            <p className="register-description">
                Створи акаунт та отримай 300 грн бонусами
            </p>

            <input
                type="email"
                placeholder="Електронна пошта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="text"
                placeholder="Введіть прізвище"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Введіть ім'я"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <input
                type="tel"
                placeholder="Номер телефону"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <input
                type="password"
                placeholder="Введіть пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <label className="terms">
                <input type="checkbox" className="checkbox" />
                Я погоджуюсь з умовами
                <br />
                користування та політикою конфіденційності
            </label>

            <button
                className="register-btn"
                onClick={handleRegister}
            >
                Зареєструватись
            </button>

            <div className="divider">
                <span></span>
                <p>або</p>
                <span></span>
            </div>

            <div className="social-buttons">
                <button>
                    <img
                        src={googleIcon}
                        alt="Google"
                        className="social-icon"
                    />
                    Google
                </button>

                <button>
                    <img
                        src={appleIcon}
                        alt="Apple"
                        className="social-icon"
                    />
                    Apple
                </button>
            </div>

            <p className="register-footer">
                Вже є акаунт?
                <span onClick={onOpenLogin}>
                    {" "}Увійти
                </span>
            </p>

        </div>
    );
}