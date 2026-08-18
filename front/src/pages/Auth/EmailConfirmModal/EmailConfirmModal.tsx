import { useState } from "react";
import "./EmailConfirmModal.css";
import { Mail } from "lucide-react";

interface EmailConfirmModalProps {
    email: string;
    onVerify: (code: string) => Promise<void>;
    onClose: () => void;
}

export default function EmailConfirmModal({
    email,
    onVerify,
    onClose,
}: EmailConfirmModalProps) {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        if (code.length !== 6) {
            alert("Введіть 6-значний код");
            return;
        }

        try {
            setLoading(true);
            await onVerify(code);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="email-confirm-overlay">
            <div className="email-confirm-modal">

                <button
                    className="email-confirm-close"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="email-confirm-icon">
                    <Mail />
                </div>

                <h2>
                    Підтвердження email
                </h2>

                <p className="email-confirm-description">
                    Ми відправили код підтвердження
                    на нову електронну пошту:
                </p>

                <p className="email-confirm-email">
                    {email}
                </p>

                <p className="email-confirm-hint">
                    Введіть 6-значний код
                </p>

                <input
                    className="email-confirm-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="000000"
                    value={code}
                    onChange={(e) =>
                        setCode(
                            e.target.value.replace(/\D/g, "")
                        )
                    }
                />

                <button
                    className="email-confirm-button"
                    onClick={handleVerify}
                    disabled={loading}
                >
                    {loading
                        ? "Перевірка..."
                        : "Підтвердити"}
                </button>

            </div>
        </div>
    );
}