import { Link } from "react-router-dom";

import DeliveryBanner from "../../components/Delivery&Payment/DeliveryBanner/DeliveryBanner";
import DeliveryMethods from "../../components/Delivery&Payment/DeliveryMethods/DeliveryMethods";
import PaymentMethods from "../../components/Delivery&Payment/PaymentMethods/PaymentMethods";
import DeliverySteps from "../../components/Delivery&Payment/DeliverySteps/DeliverySteps";
import DeliveryCostTable from "../../components/Delivery&Payment/DeliveryCostTable/DeliveryCostTable";

import "./Delivery&Payment.css";

const DeliveryAndPaymentPage = () => {
    return (
        <div className="delivery-page">

            <div className="breadcrumbs">
                <Link to="/">Головна</Link>
                <span>›</span>
                <span>Доставка та оплата</span>
            </div>

            <h1 className="profile-title">
                Доставка та оплата
            </h1>

            <DeliveryBanner />

            <DeliveryMethods />

            <PaymentMethods />

            <DeliverySteps />

            <DeliveryCostTable />

        </div>
    );
};

export default DeliveryAndPaymentPage;