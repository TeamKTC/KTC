import {
    Star,
    Minus,
    Plus,
    Heart,
    ShoppingCart,
    GitCompare,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import type { Product } from "../../../types/types";

import "./MainComponent.css";

import { useGetProductAttributesByProductIdQuery } from "../../../store/services/productAttributeApi";
import { useGetAttributeDefinitionsByProductIdQuery } from "../../../store/services/attributeDefinitionApi";
import { useGetBrandByIdQuery } from "../../../store/services/brandApi";
import { useGetMediaByProductIdQuery } from "../../../store/services/mediaApi";

import { useGetCartQuery } from "../../../store/services/cartApi";

import {
    useCreateCartItemMutation,
    useUpdateCartItemMutation,
} from "../../../store/services/cartItemApi";

import {
    useGetFavoritesQuery,
    useAddFavoriteMutation,
    useDeleteFavoriteMutation,
} from "../../../store/services/favoriteApi";

import { useProductTranslation } from "../../../translating/productTranslation";

interface ProductCardProps {
    product?: Product | null;
}

interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    createdDate: string;
}

export const AttributeItem = ({
    attr,
    definitions,
}: {
    attr: any;
    definitions: any;
}) => {
    const attributeDef = definitions?.find(
        (def: any) => def.id === attr.attributeDefinitionId
    );

    const translatedName = useProductTranslation(
        attributeDef?.name ?? "Характеристика"
    );

    return (
        <div className="characteristic">
            <div className="characteristic-icon"></div>

            <span>{translatedName}</span>

            <strong>{attr.value}</strong>
        </div>
    );
};

const MainComponent = ({ product }: ProductCardProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [isCartLoading, setIsCartLoading] = useState(false);
    const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

    const rate = Math.max(0, Math.min(5, product?.rate ?? 0));

    // =========================
    // PRODUCT DATA
    // =========================

    const { data: dataProductAttributes } =
        useGetProductAttributesByProductIdQuery(product?.id ?? "", {
            skip: !product?.id,
        });

    const { data: dataAttributeDefinitions } =
        useGetAttributeDefinitionsByProductIdQuery(product?.id ?? "", {
            skip: !product?.id,
        });

    const mediaUrl = useGetMediaByProductIdQuery(product?.id ?? "", {
        skip: !product?.id,
    });

    const { data: brand } = useGetBrandByIdQuery(product?.brandId ?? "", {
        skip: !product?.brandId,
    });

    // =========================
    // CART
    // =========================

    const {
        data: cartData,
        refetch: refetchCart,
    } = useGetCartQuery();

    const [createCartItem] = useCreateCartItemMutation();
    const [updateCartItem] = useUpdateCartItemMutation();

    const cart = cartData?.payload;

    const existingCartItem = cart?.items?.find(
        (item: CartItem) => item.productId === product?.id
    );

    // =========================
    // FAVORITES
    // =========================

    const { data: favoritesData } = useGetFavoritesQuery();

    const [addFavorite] = useAddFavoriteMutation();
    const [deleteFavorite] = useDeleteFavoriteMutation();

    const favorites = favoritesData?.payload ?? [];

    const isFavorite = favorites.some(
        (favorite: Product) => favorite.id === product?.id
    );

    // =========================
    // QUANTITY
    // =========================

    const decreaseQuantity = () => {
        setQuantity((current) => Math.max(1, current - 1));
    };

    const increaseQuantity = () => {
        if (!product || product.quantity <= 0) {
            return;
        }

        setQuantity((current) => {
            if (current >= product.quantity) {
                return current;
            }

            return current + 1;
        });
    };

    // =========================
    // ADD TO CART
    // =========================

    const addProductToCart = async (): Promise<boolean> => {
        if (!product) {
            return false;
        }

        if (!cart) {
            console.error("Кошик не знайдений");
            return false;
        }

        if (product.quantity <= 0) {
            console.error("Товару немає в наявності");
            return false;
        }

        const currentCartQuantity =
            existingCartItem?.quantity ?? 0;

        const newQuantity =
            currentCartQuantity + quantity;

        // Не можна перевищити залишок товару
        if (newQuantity > product.quantity) {
            console.error(
                `Недостатньо товару. На складі: ${product.quantity}`
            );

            return false;
        }

        try {
            setIsCartLoading(true);

            // Товар вже є в кошику
            if (existingCartItem) {
                await updateCartItem({
                    id: existingCartItem.id,
                    cartId: existingCartItem.cartId,
                    productId: existingCartItem.productId,
                    quantity: newQuantity,
                    createdDate: existingCartItem.createdDate,
                }).unwrap();
            }

            // Товару ще немає в кошику
            else {
                const newCartItem: CartItem = {
                    id: crypto.randomUUID(),
                    cartId: cart.id,
                    productId: product.id,
                    quantity,
                    createdDate: new Date().toISOString(),
                };

                await createCartItem(newCartItem).unwrap();
            }

            // Оновлюємо кошик після POST / PUT
            await refetchCart();

            return true;
        } catch (error) {
            console.error(
                "Не вдалося додати товар у кошик:",
                error
            );

            return false;
        } finally {
            setIsCartLoading(false);
        }
    };

    // =========================
    // BUY IN ONE CLICK
    // =========================

    const handleBuyOneClick = async () => {
        const success = await addProductToCart();

        if (success) {
            navigate("/cart/checkout");
        }
    };

    // =========================
    // FAVORITE
    // =========================

    const handleFavorite = async () => {
        if (!product) {
            return;
        }

        try {
            setIsFavoriteLoading(true);

            if (isFavorite) {
                await deleteFavorite(product.id).unwrap();
            } else {
                await addFavorite(product.id).unwrap();
            }
        } catch (error) {
            console.error(
                "Не вдалося змінити стан обраного:",
                error
            );
        } finally {
            setIsFavoriteLoading(false);
        }
    };

    // =========================
    // SCROLL TO SPECIFICATIONS
    // =========================

    const scrollDownByPixels = () => {
        window.scrollBy({
            top: 700,
            behavior: "smooth",
        });
    };

    const isOutOfStock =
        !product || product.quantity <= 0;

    return (
        <div className="product-page container-fluid py-3">

            {/* =========================
                GALLERY
            ========================= */}

            <div className="product-gallery">

                <div className="product-thumbnails">
                    <div className="product-thumbnail"></div>
                    <div className="product-thumbnail"></div>
                    <div className="product-thumbnail"></div>
                    <div className="product-thumbnail"></div>
                    <div className="product-thumbnail"></div>
                </div>

                <div className="product-main-image">
                    <img
                        src={
                            mediaUrl.data?.payload?.[0]?.url ||
                            "https://ktcmediafoto.blob.core.windows.net/media/bba3a6c4-d6aa-40df-9eea-e93fd141074d.png"
                        }
                        alt={product?.name}
                    />
                </div>

            </div>

            {/* =========================
                PRODUCT INFO
            ========================= */}

            <div className="product-info">

                <h1 className="product-title">
                    {brand?.payload?.name ??
                        t("forAll.brand")}{" "}
                    {product?.name}
                </h1>

                {/* RATING */}

                <div className="product-rating-row">

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
                            ({product?.amountOfComments ?? 0})
                        </span>

                    </div>

                    <button
                        type="button"
                        className="question-button"
                    >
                        {t(
                            "productDetails.askQuestion"
                        )}
                    </button>

                </div>

                {/* AVAILABILITY */}

                <div className="product-availability">

                    <span>
                        {isOutOfStock
                            ? t(
                                  "productDetails.outOfStock"
                              )
                            : t(
                                  "productDetails.inStock"
                              )}
                    </span>

                    <span>
                        {t(
                            "productDetails.deliveryTime"
                        )}
                    </span>

                </div>

                {/* PRICE */}

                <div className="price-section">

                    <div className="price-left">

                        <div className="current-price">
                            {product?.price?.toLocaleString()} ₴
                        </div>

                        {product?.oldPrice &&
                            product.oldPrice >
                                product.price && (
                                <div className="old-price">
                                    {product.oldPrice.toLocaleString()} ₴
                                </div>
                            )}

                    </div>

                    {product?.oldPrice &&
                        product.oldPrice >
                            product.price && (
                            <div className="discount">
                                -
                                {Math.round(
                                    ((product.oldPrice -
                                        product.price) /
                                        product.oldPrice) *
                                        100
                                )}
                                %
                            </div>
                        )}

                    <div className="bonus">
                        <strong>
                            +___{" "}
                            {t(
                                "productDetails.bonus"
                            )}
                        </strong>

                        <span>
                            {t(
                                "productDetails.bonusesForPurchase"
                            )}
                        </span>
                    </div>

                    {/* QUANTITY */}

                    <div className="quantity-block">

                        <span className="quantity-label">
                            {t(
                                "productDetails.quantity"
                            )}
                        </span>

                        <div className="quantity-selector">

                            <button
                                type="button"
                                onClick={
                                    decreaseQuantity
                                }
                                disabled={
                                    quantity <= 1 ||
                                    isOutOfStock
                                }
                            >
                                <Minus size={16} />
                            </button>

                            <span>
                                {quantity}
                            </span>

                            <button
                                type="button"
                                onClick={
                                    increaseQuantity
                                }
                                disabled={
                                    isOutOfStock ||
                                    quantity >=
                                        (product?.quantity ??
                                            0)
                                }
                            >
                                <Plus size={16} />
                            </button>

                        </div>

                    </div>

                </div>

                {/* =========================
                    ACTIONS
                ========================= */}

                <div className="product-actions">

                    <button
                        type="button"
                        className="btn-cart"
                        onClick={
                            addProductToCart
                        }
                        disabled={
                            isOutOfStock ||
                            isCartLoading
                        }
                    >
                        <ShoppingCart
                            size={18}
                        />

                        {isCartLoading
                            ? "Додавання..."
                            : t(
                                  "productDetails.addToCart"
                              )}
                    </button>

                    <button
                        type="button"
                        className="btn-buy"
                        onClick={
                            handleBuyOneClick
                        }
                        disabled={
                            isOutOfStock ||
                            isCartLoading
                        }
                    >
                        {t(
                            "productDetails.buyOneClick"
                        )}
                    </button>

                    <button
                        type="button"
                        className={`btn-favorite ${
                            isFavorite
                                ? "btn-favorite--active"
                                : ""
                        }`}
                        onClick={
                            handleFavorite
                        }
                        disabled={
                            isFavoriteLoading
                        }
                    >
                        <Heart
                            size={18}
                            fill={
                                isFavorite
                                    ? "currentColor"
                                    : "none"
                            }
                        />

                        {isFavorite
                            ? "В обраному"
                            : t(
                                  "productDetails.addToFavorites"
                              )}
                    </button>

                    <button
                        type="button"
                        className="btn-compare"
                    >
                        <GitCompare
                            size={18}
                        />

                        {t(
                            "productDetails.compare"
                        )}
                    </button>

                </div>

                {/* =========================
                    CHARACTERISTICS
                ========================= */}

                <div className="product-characteristics">

                    {dataProductAttributes?.payload
                        ?.slice(0, 2)
                        .map((attr: any) => (
                            <AttributeItem
                                key={attr.id}
                                attr={attr}
                                definitions={
                                    dataAttributeDefinitions?.payload
                                }
                            />
                        ))}

                </div>

                <button
                    type="button"
                    className="all-characteristics"
                    onClick={
                        scrollDownByPixels
                    }
                >
                    {t(
                        "productDetails.viewAllSpecs"
                    )}
                </button>

            </div>
        </div>
    );
};

export default MainComponent;

