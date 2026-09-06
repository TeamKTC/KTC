import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "../../types/types";
import "./FavoriteCard.css";

import { useDeleteFavoriteMutation } from "../../store/services/favoriteApi";

import {
    useCreateCartItemMutation,
    useDeleteCartItemMutation,
} from "../../store/services/cartItemApi";

import { useGetCartQuery } from "../../store/services/cartApi";

import { useGetMediaByProductIdQuery } from "../../store/services/mediaApi";

interface FavoriteCardProps {
    product: Product;
}

const FavoriteCard = ({ product }: FavoriteCardProps) => {
    // =========================
    // MEDIA
    // =========================

    const { data: mediaData } = useGetMediaByProductIdQuery(product.id, {
        skip: !product.id,
    });

    // =========================
    // ВИДАЛЕННЯ З ОБРАНОГО
    // =========================

    const [deleteFavorite, { isLoading: isDeletingFavorite }] =
        useDeleteFavoriteMutation();

    // =========================
    // КОШИК
    // =========================

    const [createCartItem, { isLoading: isAddingToCart }] =
        useCreateCartItemMutation();

    const [deleteCartItem, { isLoading: isDeletingFromCart }] =
        useDeleteCartItemMutation();

    const {
        data: cartData,
        refetch: refetchCart,
    } = useGetCartQuery();

    const cart = cartData?.payload;

    const cartItem = cart?.items?.find(
        (item) => item.productId === product.id
    );

    const isInCart = !!cartItem;

    const isCartLoading =
        isAddingToCart || isDeletingFromCart;

    // =========================
    // ВИДАЛИТИ З ОБРАНОГО
    // =========================

    const handleFavoriteClick = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation();

        try {
            await deleteFavorite(product.id).unwrap();

            alert(
                `💔 "${product.name}" видалено з обраного.`
            );
        } catch (error) {
            console.error(
                "Помилка видалення з обраного:",
                error
            );

            alert(
                "Не вдалося видалити товар з обраного."
            );
        }
    };

    // =========================
    // ДОДАТИ / ВИДАЛИТИ З КОШИКА
    // =========================

    const handleCartClick = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation();

        try {
            // Спочатку отримуємо актуальний кошик
            const freshCartResponse = await refetchCart();

            const freshCart =
                freshCartResponse.data?.payload;

            if (!freshCart) {
                alert("Кошик не знайдено.");
                return;
            }

            // Шукаємо товар у свіжому кошику
            const existingCartItem =
                freshCart.items?.find(
                    (item) =>
                        item.productId === product.id
                );

            // =========================
            // ЯКЩО ВЖЕ Є — ВИДАЛЯЄМО
            // =========================

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

            // =========================
            // ЯКЩО НЕМАЄ — ДОДАЄМО
            // =========================

            await createCartItem({
                id: crypto.randomUUID(),
                cartId: freshCart.id,
                productId: product.id,
                quantity: 1,
                createdDate: new Date().toISOString(),
            }).unwrap();

            await refetchCart();

            alert(
                `🛒 "${product.name}" додано до кошика!`
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

    // =========================
    // КАРТИНКА
    // =========================

    const imageUrl =
        mediaData?.payload?.[0]?.url ||
        "https://ktcmediafoto.blob.core.windows.net/media/bba3a6c4-d6aa-40df-9eea-e93fd141074d.png";

    return (
        <div className="favorite-card">

            {/* FAVORITE */}

            <button
                className="favorite-heart"
                type="button"
                onClick={handleFavoriteClick}
                disabled={isDeletingFavorite}
            >
                <Heart
                    size={18}
                    fill="#2E6CF6"
                    color="#2E6CF6"
                />
            </button>

            {/* IMAGE */}

            <div className="favorite-image">
                <img
                    src={imageUrl}
                    alt={product.name}
                />
            </div>

            {/* CONTENT */}

            <div className="favorite-content">

                <div className="favorite-header">

                    <div className="favorite-title-block">
                        <div className="favorite-title">
                            {product.name}{" "}
                            {product.description}
                        </div>
                    </div>

                    {/* CART */}

                    <button
                        className={`favorite-cart ${
                            isInCart
                                ? "favorite-cart--active"
                                : ""
                        }`}
                        type="button"
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

                <div className="favorite-info">

                    <div className="favorite-price">
                        {product.price.toLocaleString(
                            "uk-UA"
                        )}{" "}
                        грн
                    </div>

                    <div className="favorite-credit">
                        від{" "}
                        {Math.ceil(
                            product.price / 48
                        ).toLocaleString(
                            "uk-UA"
                        )}{" "}
                        грн/міс
                    </div>

                </div>

            </div>
        </div>
    );
};

export default FavoriteCard;