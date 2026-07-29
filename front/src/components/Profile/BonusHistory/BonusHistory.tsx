import "./BonusHistory.css";

const BonusHistory = () => {
    return (
       <div className="bonus-history">
    <div className="history-header">
        <h2>Бонусна програма</h2>

        <button>Переглянути всі</button>
    </div>

    <table>
        <thead>
            <tr>
                <th>№ замовлення</th>
                <th>Дата</th>
                <th>Статус</th>
                <th>Сума</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>№112563</td>
                <td>11.02.2026</td>
                <td>Доставлено</td>
                <td>21 199 грн</td>
                <td className="arrow">›</td>
            </tr>

            <tr>
                <td>№112563</td>
                <td>11.02.2026</td>
                <td>Доставлено</td>
                <td>21 199 грн</td>
                <td className="arrow">›</td>
            </tr>

            <tr>
                <td>№123153</td>
                <td>01.03.2026</td>
                <td>Доставлено</td>
                <td>25 599 грн</td>
                <td className="arrow">›</td>
            </tr>

            <tr>
                <td>№136548</td>
                <td>02.06.2026</td>
                <td>Доставлено</td>
                <td>1 199 грн</td>
                <td className="arrow">›</td>
            </tr>

            <tr>
                <td>№136452</td>
                <td>23.03.2026</td>
                <td>Доставлено</td>
                <td>599 грн</td>
                <td className="arrow">›</td>
            </tr>

            <tr>
                <td>№112489</td>
                <td>17.05.2026</td>
                <td>Доставлено</td>
                <td>2 299 грн</td>
                <td className="arrow">›</td>
            </tr>

            <tr>
                <td>№135896</td>
                <td>25.12.2025</td>
                <td>Доставлено</td>
                <td>1 199 грн</td>
                <td className="arrow">›</td>
            </tr>
        </tbody>
    </table>
</div>
    );
};

export default BonusHistory;