import "./CancelOrderModal.css";
import { XCircle } from "lucide-react";

interface CancelOrderModalProps {
    onConfirm: () => void;
    onClose: () => void;
    isLoading?: boolean;
}

export default function CancelOrderModal({
    onConfirm,
    onClose,
    isLoading = false,
}: CancelOrderModalProps) {
    return (
        <div className="cancel-overlay">
            <div className="cancel-modal">
                <button
                    className="cancel-close"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    ✕
                </button>

                <div className="cancel-image">
                    <XCircle />
                </div>

                <h2>Скасування замовлення</h2>

                <p className="cancel-description">
                    Ви впевнені, що хочете скасувати це замовлення?
                </p>

                <div className="cancel-buttons">
                    <button
                        className="cancel-no"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Ні, залишити
                    </button>

                    <button
                        className="cancel-yes"
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading
                            ? "Скасування..."
                            : "Так, скасувати"}
                    </button>
                </div>
            </div>
        </div>
    );
}

