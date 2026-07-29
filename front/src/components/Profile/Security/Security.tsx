import "./Security.css";

const Security = () => {
    return (
        <div className="security-card">

            <h2>Безпека та паролі</h2>

            <p className="security-description">
                Рекомендуємо змінювати пароль кожні 3-6 місяців.
            </p>

            <button className="change-password">
                Змінити пароль
            </button>

            <div className="two-factor">
                <h4>Двоетапна перевірка</h4>
                <p>Не активовано</p>
            </div>

        </div>
    );
};

export default Security;