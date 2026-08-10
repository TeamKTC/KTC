import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "../../types/types";
import "./FavoriteCard.css";

interface FavoriteCardProps {
    product: Product;
}

const FavoriteCard = ({ product }: FavoriteCardProps) => {
    return (
        <div className="favorite-card">
            <button className="favorite-heart" type="button">
                <Heart size={18} fill="#2E6CF6" color="#2E6CF6" />
            </button>

            <div className="favorite-image">
                <img
                    src="https://ktcmediafoto.blob.core.windows.net/media/bba3a6c4-d6aa-40df-9eea-e93fd141074d.png"
                    alt={product.name}
                />
            </div>

            <div className="favorite-content">
                <div className="favorite-header">
                    <div className="favorite-title-block">
                <div className="favorite-title">
                    {product.name} {product.description}
                </div>
                    </div>

                    <button className="favorite-cart" type="button">
                        <ShoppingCart size={18} />
                    </button>
                </div>

                <div className="favorite-info">
                    <div className="favorite-price">
                        {product.price.toLocaleString("uk-UA")} грн
                    </div>

                    <div className="favorite-credit">
                        від {Math.ceil(product.price / 48).toLocaleString("uk-UA")} грн/міс
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoriteCard;