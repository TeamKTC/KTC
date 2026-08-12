
import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Product } from "../../types/types";
import "../recommended/Recommended.css";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const rate = Math.max(0, Math.min(5, product.rate));

  const handleCardClick = () => {
    navigate(`/details/${product.id}`);
  };

  console.log(product);
  return (
    <div className="product-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}>


      {/* Favorite */}
      <button
        className="product-favorite"
        type="button"
        aria-label="Додати до обраного"
      >
        <Heart size={18} />
      </button>

      {/* Image */}
      <div className="product-image-container">
        <img
          src="/placeholder-product.png"
          alt={product.name}
          className="product-image"
        />
      </div>

      {/* Name */}
      <div className="product-name">
        {product.name}
      </div>

      {/* Bottom */}
      <div className="product-bottom">

        <div>
          {/* Price */}
          <div className="product-price">
            {product.price.toLocaleString("uk-UA")} грн
          </div>

          {/* Rating */}
          <div className="product-rating">
            <span className="stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  fill={index < rate ? "#FFD600" : "none"}
                  strokeWidth={1.5}
                />
              ))}
            </span>

            <span className="reviews">
              ({product?.soldPerMonth})
            </span>
          </div>
        </div>

        {/* Cart */}
        <button
          className="product-cart"
          type="button"
          aria-label="Додати в кошик"
        >
          <ShoppingCart size={18} />
        </button>

      </div>
    </div>
  );
};

export default ProductCard;


