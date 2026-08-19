import { useState } from "react";
import "./TwoFactorModal.css";
import { Lock } from "lucide-react";

interface TwoFactorModalProps {
    onVerify: (code: string) => Promise<void>;
    onClose: () => void;
}

export default function TwoFactorModal({
    onVerify,
    onClose,
}: TwoFactorModalProps) {

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
        <div className="two-factor-overlay">

            <div className="two-factor-modal">

                <button
                    className="two-factor-close"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="two-factor-icon">
                    <Lock />
                </div>

                <h2>
                    Підтвердження входу
                </h2>

                <p className="two-factor-description">
                    Ми відправили код підтвердження
                    на вашу електронну пошту.
                </p>

                <p className="two-factor-hint">
                    Введіть 6-значний код
                </p>

                <input
                    className="two-factor-input"
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
                    className="two-factor-button"
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