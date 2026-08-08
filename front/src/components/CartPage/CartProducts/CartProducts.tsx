import "./CartProducts.css";
import { Trash2, Minus, Plus } from "lucide-react";

const CartProducts = () => {
  return (
    <div className="cart-products">

      {/* HEADER */}
      <div className="cart-products__header">
        <label className="select-all">
          <input
            type="checkbox"
            defaultChecked
          />
          <span>Вибрати всі товари (4)</span>
        </label>

        <button className="delete-selected">
          Видалити вибрані
        </button>
      </div>

      {/* ТОВАР 1 */}
      <div className="cart-product">

        <label className="product-check">
          <input
            type="checkbox"
            defaultChecked
          />
        </label>

        <div className="product-image">
          <img
            src="https://ktcmediafoto.blob.core.windows.net/media/bba3a6c4-d6aa-40df-9eea-e93fd141074d.png"
            alt="iPhone"
          />
        </div>

        <div className="product-info">
          <h3>
            Смартфон Apple iPhone 15 128 Black
          </h3>

          <div className="product-specs">
            <span>6.1"</span>
            <b>•</b>
            <span>128 ГБ</span>
            <b>•</b>
            <span>6 ГБ RAM</span>
            <b>•</b>
            <span>iOS</span>
          </div>

          <div className="available">
            <span>●</span>
            Є в наявності
          </div>
        </div>

        <div className="product-price">
          <strong>30 999 грн</strong>

          <del>34 999 грн</del>

          <div className="quantity">
            <button>
              <Minus size={13} />
            </button>

            <span>1</span>

            <button>
              <Plus size={13} />
            </button>
          </div>
        </div>

        <div className="product-total">
          30 999 грн
        </div>

        <button className="product-delete">
          <Trash2
            size={18}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* ТОВАР 2 */}
      <div className="cart-product">

        <label className="product-check">
          <input
            type="checkbox"
            defaultChecked
          />
        </label>

        <div className="product-image">
          <img
            src="https://ktcmediafoto.blob.core.windows.net/media/bba3a6c4-d6aa-40df-9eea-e93fd141074d.png"
            alt="DualSense"
          />
        </div>

        <div className="product-info">
          <h3>
            Геймпад Sony DualSense Wireless
            Controller White
          </h3>

          <div className="product-specs">
            <span>PS/PC</span>
            <b>•</b>
            <span>Тактильна віддача</span>
            <b>•</b>
            <span>USB-C</span>
          </div>

          <div className="available">
            <span>●</span>
            Є в наявності
          </div>
        </div>

        <div className="product-price">
          <strong>2 799 грн</strong>

          <del>3 999 грн</del>

          <div className="quantity">
            <button>
              <Minus size={13} />
            </button>

            <span>1</span>

            <button>
              <Plus size={13} />
            </button>
          </div>
        </div>

        <div className="product-total">
          2 799 грн
        </div>

        <button className="product-delete">
          <Trash2
            size={18}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* ТОВАР 3 */}
      <div className="cart-product">

        <label className="product-check">
          <input
            type="checkbox"
            defaultChecked
          />
        </label>

        <div className="product-image">
          <img
            src="https://ktcmediafoto.blob.core.windows.net/media/bba3a6c4-d6aa-40df-9eea-e93fd141074d.png"
            alt="ECOVACS"
          />
        </div>

        <div className="product-info">
          <h3>
            Робот-пилосос ECOVACS DEEBOT N30
            PRO OMNI (YDLX11-WHITE)
          </h3>

          <div className="product-specs">
            <span>Сухе та вологе</span>
            <b>•</b>
            <span>10000 Па</span>
            <b>•</b>
            <span>Док-станція</span>
          </div>

          <div className="available">
            <span>●</span>
            Є в наявності
          </div>
        </div>

        <div className="product-price">
          <strong>19 999 грн</strong>

          <del>25 999 грн</del>

          <div className="quantity">
            <button>
              <Minus size={13} />
            </button>

            <span>1</span>

            <button>
              <Plus size={13} />
            </button>
          </div>
        </div>

        <div className="product-total">
          19 999 грн
        </div>

        <button className="product-delete">
          <Trash2
            size={18}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* ТОВАР 4 */}
      <div className="cart-product">

        <label className="product-check">
          <input
            type="checkbox"
            defaultChecked
          />
        </label>

        <div className="product-image">
          <img
            src="https://ktcmediafoto.blob.core.windows.net/media/bba3a6c4-d6aa-40df-9eea-e93fd141074d.png"
            alt="iPad"
          />
        </div>

        <div className="product-info">
          <h3>
            Планшет Apple iPad Air 11" M2 128GB
            Wi-Fi Space Grey
          </h3>

          <div className="product-specs">
            <span>11" Liquid Retina</span>
            <b>•</b>
            <span>Apple M2</span>
            <b>•</b>
            <span>8 ГБ RAM</span>
          </div>

          <div className="available">
            <span>●</span>
            Є в наявності
          </div>
        </div>

        <div className="product-price">
          <strong>27 999 грн</strong>

          <del>34 999 грн</del>

          <div className="quantity">
            <button>
              <Minus size={13} />
            </button>

            <span>1</span>

            <button>
              <Plus size={13} />
            </button>
          </div>
        </div>

        <div className="product-total">
          27 999 грн
        </div>

        <button className="product-delete">
          <Trash2
            size={18}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* FOOTER */}
      <div className="cart-products__footer">
        <button className="continue-shopping">
          <span>Продовжити покупки</span>
          <span className="arrow">›</span>
        </button>

        <button className="clear-cart">
          Оновити кошик
        </button>
      </div>

    </div>
  );
};

export default CartProducts;