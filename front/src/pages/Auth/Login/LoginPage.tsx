import { useState } from "react";
import "./LoginPage.css";
import { useLoginMutation } from "../../../store/services/authApi";
import { useAppDispatch } from "../../../hooks/redux";
import { login } from "../../../store/slices/authSlice";
import emailIcon from "../../../foto/free-icon-mail-4360562.png";
import appleIcon from "../../../foto/free-icon-apple-logo-747.png";
import logo from "../../../foto/fotoktcnorm.png";
export default function LoginPage() {
    const dispatch = useAppDispatch();
    const [loginRequest] = useLoginMutation();

    const [userLogin, setUserLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const result = await loginRequest({
                login: userLogin,
                password,
            }).unwrap();

            dispatch(login(result.payload));
            alert("Успішний логін");
        } catch {
            alert("Неправильний логін або пароль");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

        <div className="logo">
                <img src={logo} alt="PixelRoom" className="logo-icon" />
            <span>
                <span className="pixel">Pixel</span>
                <span className="room">Room</span>
            </span>
        </div>

                <h1 className="login-title">Увійдіть в акаунт</h1>

                <input
                    className="login-input"
                    type="text"
                    placeholder="Email або телефон"
                    value={userLogin}
                    onChange={(e) => setUserLogin(e.target.value)}
                />

                <input className="password-input"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="options">
                    <label className="remember-me">
                        <input type="checkbox" className="checkbox" />
                        Запам'ятайте мене
                    </label>

                    <a href="#">Забули пароль?</a>
                </div>

                <button className="login-btn" onClick={handleLogin}>
                    Увійти
                </button>

                <div className="divider">
                    <span></span>
                    <p className="divider-text">або</p>
                    <span></span>
                </div>
 
                <div className="social-buttons">
                    <button>
                        <img src={emailIcon} alt="Google" className="social-icon" />
                        Google </button>
                    <button>
                        <img src={appleIcon} alt="Apple" className="social-icon" />
                        Apple
                    </button>
                </div>

                <p className="register">
                    Немає акаунту?
                    <span> Зареєструватися</span>
                </p>

            </div>
        </div>
    );
}