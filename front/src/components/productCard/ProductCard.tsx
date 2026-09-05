import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Product } from "../../types/types";
import "../recommended/Recommended.css";
import { useNavigate } from "react-router-dom";
import { useGetMediaByProductIdQuery } from "../../store/services/mediaApi";
import {
    useAddFavoriteMutation,
    useDeleteFavoriteMutation,
    useGetFavoritesQuery,
} from "../../store/services/favoriteApi";
import {
    useCreateCartItemMutation,
    useDeleteCartItemMutation,
} from "../../store/services/cartItemApi";
import { useGetCartQuery } from "../../store/services/cartApi";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const navigate = useNavigate();

    const rate = Math.max(0, Math.min(5, product.rate));

    const mediaUrl = useGetMediaByProductIdQuery(product.id, {
        skip: !product.id,
    });

    const { data: favoritesData } = useGetFavoritesQuery();

    const [addFavorite, { isLoading: isAddingFavorite }] =
        useAddFavoriteMutation();

    const [deleteFavorite, { isLoading: isDeletingFavorite }] =
        useDeleteFavoriteMutation();

    const [createCartItem, { isLoading: isAddingCart }] =
        useCreateCartItemMutation();

    const [deleteCartItem, { isLoading: isDeletingCart }] =
        useDeleteCartItemMutation();

    const {
        data: cartData,
        refetch: refetchCart,
    } = useGetCartQuery();

    const favorites = favoritesData?.payload ?? [];
    const cart = cartData?.payload;

    const isFavorite = favorites.some(
        (item) => item.id === product.id
    );

    const cartItem = cart?.items?.find(
        (item) => item.productId === product.id
    );

    const isInCart = !!cartItem;

    const isFavoriteLoading =
        isAddingFavorite || isDeletingFavorite;

    const isCartLoading =
        isAddingCart || isDeletingCart;

    const handleCardClick = () => {
        navigate(`/details/${product.id}`);
    };

    const handleFavoriteClick = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation();

        try {
            if (isFavorite) {
                await deleteFavorite(product.id).unwrap();

                alert(
                    `💔 "${product.name}" видалено з обраного.`
                );
            } else {
                await addFavorite(product.id).unwrap();

                alert(
                    `❤️ "${product.name}" додано до обраного.`
                );
            }
        } catch (error) {
            console.error(
                "Помилка роботи з обраним:",
                error
            );

            alert(
                "Не вдалося змінити обране."
            );
        }
    };

    const handleCartClick = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation();

        try {
            const freshCartResponse =
                await refetchCart();

            const freshCart =
                freshCartResponse.data?.payload;

            if (!freshCart) {
                alert("Кошик не знайдено.");
                return;
            }

            const existingCartItem =
                freshCart.items?.find(
                    (item) =>
                        item.productId === product.id
                );

            if (existingCartItem) {
                await deleteCartItem(
                    existingCartItem.id
                ).unwrap();

                await refetchCart();

                alert(
                    `🗑️ "${product.name}" видалено з кошика.`
                );

                return;
            }

            await createCartItem({
                id: crypto.randomUUID(),
                cartId: freshCart.id,
                productId: product.id,
                quantity: 1,
                createdDate:
                    new Date().toISOString(),
            }).unwrap();

            await refetchCart();

            alert(
                `🛒 "${product.name}" додано до кошика.`
            );
        } catch (error) {
            console.error(
                "Помилка роботи з кошиком:",
                error
            );

            alert(
                "Не вдалося змінити кошик."
            );
        }
    };

    return (
        <div
            className="product-card"
            onClick={handleCardClick}
            style={{ cursor: "pointer" }}
        >
            <button
                className={`product-favorite ${
                    isFavorite
                        ? "product-favorite--active"
                        : ""
                }`}
                type="button"
                aria-label={
                    isFavorite
                        ? "Видалити з обраного"
                        : "Додати до обраного"
                }
                onClick={handleFavoriteClick}
                disabled={isFavoriteLoading}
            >
                <Heart
                    size={18}
                    fill={
                        isFavorite
                            ? "#2E6CF6"
                            : "none"
                    }
                    color={
                        isFavorite
                            ? "#2E6CF6"
                            : "currentColor"
                    }
                />
            </button>

            <div className="product-image-container">
                <img
                    src={
                        mediaUrl.data?.payload?.[0]?.url ||
                        "https://ktcmediafoto.blob.core.windows.net/media/bba3a6c4-d6aa-40df-9eea-e93fd141074d.png"
                    }
                    alt={product.name}
                    className="product-image"
                />
            </div>

            <div className="product-name">
                {product.name}
            </div>

            <div className="product-bottom">
                <div>
                    <div className="product-price">
                        {product.price.toLocaleString(
                            "uk-UA"
                        )}{" "}
                        грн
                    </div>

                    <div className="product-rating">
                        <span className="stars">
                            {Array.from({
                                length: 5,
                            }).map((_, index) => (
                                <Star
                                    key={index}
                                    size={16}
                                    fill={
                                        index < rate
                                            ? "#FFD600"
                                            : "none"
                                    }
                                    strokeWidth={1.5}
                                />
                            ))}
                        </span>

                        <span className="reviews">
                            ({product.soldPerMonth})
                        </span>
                    </div>
                </div>

                <button
                    className={`product-cart ${
                        isInCart
                            ? "product-cart--active"
                            : ""
                    }`}
                    type="button"
                    aria-label={
                        isInCart
                            ? "Видалити з кошика"
                            : "Додати в кошик"
                    }
                    onClick={handleCartClick}
                    disabled={isCartLoading}
                >
                    <ShoppingCart
                        size={18}
                        fill={
                            isInCart
                                ? "#2E6CF6"
                                : "none"
                        }
                        color={
                            isInCart
                                ? "#2E6CF6"
                                : "currentColor"
                        }
                    />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

