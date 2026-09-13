import { useEffect, useState } from "react";
import {
    useForgotPasswordMutation,
    useVerifyResetCodeMutation,
    useResetPasswordMutation,
} from "../../../store/services/authApi";
import logo from "../../../foto/fotoktcnorm.png";
import "./ForgotPasswordModal.css";

interface ForgotPasswordModalProps {
    onClose: () => void;
    onBackToLogin: () => void;
}

export default function ForgotPasswordModal({
    onClose,
    onBackToLogin,
}: ForgotPasswordModalProps) {
    const [step, setStep] = useState(1);

    const [login, setLogin] = useState("");

    const [code, setCode] = useState([
        "",
        "",
        "",
        "",
        "",
        "",
    ]);

    const [challenge, setChallenge] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [resendTimer, setResendTimer] = useState(0);

    const [forgotPassword] = useForgotPasswordMutation();
    const [verifyResetCode] = useVerifyResetCodeMutation();
    const [resetPassword] = useResetPasswordMutation();

    // =========================
    // TIMER
    // =========================

    useEffect(() => {
        if (resendTimer <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [resendTimer]);

    // =========================
    // SEND CODE
    // =========================

    const handleSendCode = async () => {
        const value = login.trim();

        if (!value) {
            alert("Введіть email або номер телефону");
            return;
        }

        try {
            const response = await forgotPassword({
                login: value,
            }).unwrap();

            const newChallenge = response.payload?.challenge;

            if (!newChallenge) {
                alert("Не вдалося отримати код відновлення");
                return;
            }

            setChallenge(newChallenge);

            setCode([
                "",
                "",
                "",
                "",
                "",
                "",
            ]);

            // Запускаємо 30 секунд
            setResendTimer(30);

            setStep(2);
        } catch {
            alert("Не вдалося надіслати код");
        }
    };

    // =========================
    // RESEND CODE
    // =========================

    const handleResendCode = async () => {
        // Якщо таймер ще йде — нічого не робимо
        if (resendTimer > 0) {
            return;
        }

        const value = login.trim();

        if (!value) {
            return;
        }

        try {
            const response = await forgotPassword({
                login: value,
            }).unwrap();

            const newChallenge = response.payload?.challenge;

            if (!newChallenge) {
                alert("Не вдалося надіслати код повторно");
                return;
            }

            // Зберігаємо новий challenge
            setChallenge(newChallenge);

            // Очищаємо старий код
            setCode([
                "",
                "",
                "",
                "",
                "",
                "",
            ]);

            // Знову запускаємо 30 секунд
            setResendTimer(30);

            // Фокус на перше поле
            document
                .getElementById("reset-code-0")
                ?.focus();
        } catch {
            alert("Не вдалося надіслати код повторно");
        }
    };

    // =========================
    // CODE INPUT
    // =========================

    const handleCodeChange = (
        index: number,
        value: string
    ) => {
        if (!/^\d?$/.test(value)) {
            return;
        }

        const newCode = [...code];
        newCode[index] = value;

        setCode(newCode);

        if (value && index < 5) {
            document
                .getElementById(`reset-code-${index + 1}`)
                ?.focus();
        }
    };

    // =========================
    // BACKSPACE
    // =========================

    const handleCodeKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (
            e.key === "Backspace" &&
            !code[index] &&
            index > 0
        ) {
            document
                .getElementById(`reset-code-${index - 1}`)
                ?.focus();
        }
    };

    // =========================
    // VERIFY CODE
    // =========================

    const handleVerifyCode = async () => {
        const fullCode = code.join("");

        if (fullCode.length !== 6) {
            alert("Введіть 6-значний код");
            return;
        }

        if (!challenge) {
            alert("Сесія відновлення недійсна");
            return;
        }

        try {
            await verifyResetCode({
                challenge,
                code: fullCode,
            }).unwrap();

            setStep(3);
        } catch {
            alert("Неправильний або протермінований код");

            setCode([
                "",
                "",
                "",
                "",
                "",
                "",
            ]);

            setStep(2);
        }
    };

    // =========================
    // RESET PASSWORD
    // =========================

    const handleResetPassword = async () => {
        const fullCode = code.join("");

        if (!newPassword || !repeatPassword) {
            alert("Заповніть усі поля");
            return;
        }

        if (newPassword !== repeatPassword) {
            alert("Паролі не співпадають");
            return;
        }

        if (fullCode.length !== 6) {
            alert("Введіть 6-значний код");
            setStep(2);
            return;
        }

        if (!challenge) {
            alert("Сесія відновлення недійсна");
            return;
        }

        try {
            await resetPassword({
                challenge,
                code: fullCode,
                newPassword,
            }).unwrap();

            setStep(4);
        } catch (error) {
            console.log(
                "RESET PASSWORD ERROR:",
                error
            );

            alert(JSON.stringify(error));
        }
    };

    // =========================
    // LOGO
    // =========================

    const renderLogo = () => (
        <div className="forgot-logo">
            <img
                src={logo}
                alt="PixelRoom"
            />

            <span>
                <span className="forgot-pixel">
                    Pixel
                </span>

                <span className="forgot-room">
                    {" "}Room
                </span>
            </span>
        </div>
    );

    // =========================
    // JSX
    // =========================

    return (
        <div className="forgot-overlay">
            <div
                className={`forgot-card step-${step}`}
            >
                <button
                    className="forgot-close"
                    onClick={onClose}
                    type="button"
                    aria-label="Закрити"
                >
                    ✕
                </button>

                {/* =========================
                    STEP 1
                ========================= */}

                {step === 1 && (
                    <>
                        {renderLogo()}

                        <h1>
                            Відновлення пароля
                        </h1>

                        <p className="forgot-description">
                            Введіть email або номер телефону,
                            прив'язаний до вашого акаунта.
                        </p>

                        <input
                            className="forgot-input"
                            type="text"
                            placeholder="Email або телефон"
                            value={login}
                            onChange={(e) =>
                                setLogin(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSendCode();
                                }
                            }}
                        />

                        <p className="forgot-info">
                            Якщо акаунт існує, ми надішлемо
                            <br />
                            код для відновлення пароля.
                        </p>

                        <button
                            className="forgot-button"
                            onClick={handleSendCode}
                            type="button"
                        >
                            Надіслати код
                        </button>

                        <div className="forgot-line" />

                        <button
                            className="back-login"
                            onClick={onBackToLogin}
                            type="button"
                        >
                            Повернутися до входу
                        </button>
                    </>
                )}

                {/* =========================
                    STEP 2
                ========================= */}

                {step === 2 && (
                    <>
                        {renderLogo()}

                        <h1>
                            Введіть код
                        </h1>

                        <p className="code-description">
                            Ми надіслали код на {login}
                        </p>

                        <div className="code-inputs">
                            {code.map((value, index) => (
                                <input
                                    key={index}
                                    id={`reset-code-${index}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={value}
                                    onChange={(e) =>
                                        handleCodeChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    onKeyDown={(e) =>
                                        handleCodeKeyDown(
                                            index,
                                            e
                                        )
                                    }
                                />
                            ))}
                        </div>

                        <button
                            className="forgot-button"
                            onClick={handleVerifyCode}
                            type="button"
                        >
                            Підтвердити
                        </button>

                        {/* =========================
                            RESEND
                        ========================= */}

                        {resendTimer > 0 ? (
                            <p className="resend-text resend-disabled">
                                Надіслати код повторно через{" "}
                                {resendTimer} сек.
                            </p>
                        ) : (
                            <button
                                className="resend-text"
                                onClick={handleResendCode}
                                type="button"
                            >
                                Надіслати код повторно
                            </button>
                        )}

                        <button
                            className="back-login"
                            onClick={onBackToLogin}
                            type="button"
                        >
                            Повернутися до входу
                        </button>
                    </>
                )}

                {/* =========================
                    STEP 3
                ========================= */}

                {step === 3 && (
                    <>
                        {renderLogo()}

                        <h1>
                            Створіть новий пароль
                        </h1>

                        <p className="password-description">
                            Введіть новий пароль для вашого акаунту
                        </p>

                        <div className="password-wrapper">
                            <input
                                className="forgot-input"
                                type="password"
                                placeholder="Новий пароль"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                            />

                            <span>
                                ◉
                            </span>
                        </div>

                        <div className="password-wrapper">
                            <input
                                className="forgot-input"
                                type="password"
                                placeholder="Повторіть новий пароль"
                                value={repeatPassword}
                                onChange={(e) =>
                                    setRepeatPassword(
                                        e.target.value
                                    )
                                }
                            />

                            <span>
                                ◉
                            </span>
                        </div>

                        <p className="password-rules">
                            Пароль має містити щонайменше 8 символів,
                            включаючи великі та малі літери, цифри та
                            спеціальні символи.
                        </p>

                        <button
                            className="forgot-button"
                            onClick={handleResetPassword}
                            type="button"
                        >
                            Зберегти пароль
                        </button>

                        <button
                            className="back-login"
                            onClick={onBackToLogin}
                            type="button"
                        >
                            Повернутися до входу
                        </button>
                    </>
                )}

                {/* =========================
                    STEP 4
                ========================= */}

                {step === 4 && (
                    <>
                        <div className="success-icon">
                            ✓
                        </div>

                        <h1>
                            Пароль успішно змінено
                        </h1>

                        <p className="success-description">
                            Тепер ви можете увійти в акаунт
                            з новим паролем
                        </p>

                        <button
                            className="forgot-button success-button"
                            onClick={onBackToLogin}
                            type="button"
                        >
                            Увійти в акаунт
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
