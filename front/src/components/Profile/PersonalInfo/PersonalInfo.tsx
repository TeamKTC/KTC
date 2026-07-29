import "./PersonalInfo.css";

const PersonalInfo = () => {
    return (
        <div className="personal-info">

            <h2>Особисті дані</h2>

            <div className="inputs">

                <input type="text" placeholder="Ім'я" />

                <input type="text" placeholder="Прізвище" />

                <input type="email" placeholder="Email" />

                <input type="text" placeholder="Телефон" />

                <input
                    className="full"
                    type="text"
                    placeholder="Дата народження"
                />

            </div>

            <div className="buttons">

                <button className="save">
                    Зберегти зміни
                </button>

                <button className="cancel">
                    Скасувати
                </button>

            </div>

        </div>
    );
};

export default PersonalInfo;