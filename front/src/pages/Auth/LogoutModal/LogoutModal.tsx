
import "./LogoutModal.css";
import { LogOut } from "lucide-react";

interface LogoutModalProps {
    onConfirm: () => void;
    onClose: () => void;
}

export default function LogoutModal({
    onConfirm,
    onClose,
}: LogoutModalProps) {
    return (
        <div className="logout-overlay">
            <div className="logout-modal">

                <button
                    className="logout-close"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="logout-image">
                    <LogOut />
                </div>

                <h2>Вихід з акаунта</h2>

                <p className="logout-description">
                    Ви впевнені, що хочете вийти
                    зі свого акаунта?
                </p>

                <div className="logout-buttons">

                    <button
                        className="logout-cancel"
                        onClick={onClose}
                    >
                        Ні, залишитися
                    </button>

                    <button
                        className="logout-confirm"
                        onClick={onConfirm}
                    >
                        Так, вийти
                    </button>

                </div>

            </div>
        </div>
    );
}

