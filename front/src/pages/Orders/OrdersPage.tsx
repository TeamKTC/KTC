import Sidebar from "../../components/Profile/Sidebar/Sidebar";
import FooterBenefits from "../../components/Profile/FooterBenefits/FooterBenefits";
import { Link } from "react-router-dom";
import Orders from "../../components/Orderspage/Orders/Orders";

import "./OrdersPage.css";

const OrdersPage = () => {
    return (
        <div className="profile-page">
            <div className="breadcrumbs">
                <Link to="/">Головна</Link>
                <span> &gt; </span>
                <Link to="/profile">
                    Особистий кабінет
                </Link>
                <span> &gt; </span>
                <span>Мої замовлення</span>
            </div>

            <h1 className="profile-title">
                Мої замовлення
            </h1>

            <div className="profile-content">
                <Sidebar />

                <div className="orders-content">
                    <Orders />
                </div>
            </div>

            <FooterBenefits />
        </div>
    );
};

export default OrdersPage;

