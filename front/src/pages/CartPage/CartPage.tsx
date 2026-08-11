import "../Profile/ProfilePage.css";
import { Link } from "react-router-dom";
import "./CartPage.css";
import FooterBenefits from "../../components/Profile/FooterBenefits/FooterBenefits";
import CartProducts from "../../components/CartPage/CartProducts/CartProducts";
import OrderSummary from "../../components/CartPage/OrderSummary/OrderSummary";

const CartPage = () => {
  return (
    <div>
      <div className="breadcrumbs">
        <Link to="/">Головна</Link>
        <span> &gt; </span>
        <span>Кошик</span>
      </div>

      <h1 className="profile-title">Кошик</h1>

<div className="cart-layout">
  <CartProducts />
  <OrderSummary />
</div>

      <FooterBenefits />
    </div>
  );
};

export default CartPage;