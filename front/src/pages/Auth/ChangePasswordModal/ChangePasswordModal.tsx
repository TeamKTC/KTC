import { useState } from "react";
import "./ChangePasswordModal.css";
import { Lock } from "lucide-react";

interface ChangePasswordModalProps {
    onChangePassword: (
        currentPassword: string,
        newPassword: string
    ) => Promise<void>;

    onClose: () => void;
}

export default function ChangePasswordModal({
    onChangePassword,
    onClose,
}: ChangePasswordModalProps) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {
            alert("Заповніть усі поля");
            return;
        }

        if (newPassword.length < 6) {
            alert(
                "Новий пароль має містити мінімум 6 символів"
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Нові паролі не співпадають");
            return;
        }

        if (currentPassword === newPassword) {
            alert(
                "Новий пароль повинен відрізнятися від старого"
            );
            return;
        }

        try {
            setLoading(true);

            await onChangePassword(
                currentPassword,
                newPassword
            );
        } catch {
            // Помилка обробляється в Security
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="change-password-overlay">
            <div className="change-password-modal">

                <button
                    className="change-password-close"
                    onClick={onClose}
                    disabled={loading}
                >
                    ✕
                </button>

                <div className="change-password-icon">
                    <Lock />
                </div>

                <h2>Зміна пароля</h2>

                <p className="change-password-description">
                    Введіть поточний пароль та задайте новий.
                </p>

                <div className="change-password-fields">

                    <input
                        type="password"
                        placeholder="Поточний пароль"
                        value={currentPassword}
                        onChange={(e) =>
                            setCurrentPassword(e.target.value)
                        }
                        disabled={loading}
                    />

                    <input
                        type="password"
                        placeholder="Новий пароль"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                        disabled={loading}
                    />

                    <input
                        type="password"
                        placeholder="Повторіть новий пароль"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        disabled={loading}
                    />

                </div>

                <button
                    className="change-password-button"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading
                        ? "Зміна пароля..."
                        : "Змінити пароль"}
                </button>

            </div>
        </div>
    );
}