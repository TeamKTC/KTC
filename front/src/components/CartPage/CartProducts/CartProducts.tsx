import "./CartProducts.css";

import { Trash2, Minus, Plus } from "lucide-react";
import { useState } from "react";

import { useGetCartQuery } from "../../../store/services/cartApi";
import {
    useUpdateCartItemMutation,
    useDeleteCartItemMutation,
} from "../../../store/services/cartItemApi";
import { useGetAllProductsQuery } from "../../../store/services/productApi";
import { useGetAllAttributeDefinitionsQuery } from "../../../store/services/attributeDefinitionApi";
import { useGetProductAttributesByProductIdQuery } from "../../../store/services/productAttributeApi";
import { useGetMediaByProductIdQuery } from "../../../store/services/mediaApi";

import type {
    Product,
    ProductAttribute,
    AttributeDefinition,
    MediaFile,
} from "../../../types/types";

interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    createdDate: string;
}

interface CartProductItemProps {
    cartItem: CartItem;
    product: Product;
    attributeDefinitions: AttributeDefinition[];
    selected: boolean;
    onSelect: (id: string, checked: boolean) => void;
    onDelete: (id: string) => void;
    onQuantityChange: (
        cartItem: CartItem,
        newQuantity: number
    ) => void;
}

const CartProductItem = ({
    cartItem,
    product,
    attributeDefinitions,
    selected,
    onSelect,
    onDelete,
    onQuantityChange,
}: CartProductItemProps) => {
    const { data: attributesData } =
        useGetProductAttributesByProductIdQuery(product.id);

    const { data: mediaData } =
        useGetMediaByProductIdQuery(product.id);

    const attributes: ProductAttribute[] =
        attributesData?.payload ?? [];

    const media: MediaFile[] =
        mediaData?.payload ?? [];

    const visibleAttributes = attributes.slice(0, 3);

    const imageUrl =
        media.length > 0
            ? media[0].url
            : null;

    const formatPrice = (price: number) => {
        return `${price.toLocaleString("uk-UA")} грн`;
    };

    const stockQuantity = Math.max(
        0,
        product.quantity
    );

    const canIncrease =
        cartItem.quantity < stockQuantity;

    const canDecrease =
        cartItem.quantity > 1;

    return (
        <div className="cart-product">
            <label className="product-check">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={(event) =>
                        onSelect(
                            cartItem.id,
                            event.target.checked
                        )
                    }
                />
            </label>

            <div className="product-image">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={product.name}
                    />
                ) : (
                    <div className="product-image-empty">
                        Немає фото
                    </div>
                )}
            </div>

            <div className="product-info">
                <h3>{product.name}</h3>

                {visibleAttributes.length > 0 && (
                    <div className="product-specs">
                        {visibleAttributes.map(
                            (attribute) => {
                                const definition =
                                    attributeDefinitions.find(
                                        (definition) =>
                                            definition.id ===
                                            attribute.attributeDefinitionId
                                    );

                                return (
                                    <span
                                        key={attribute.id}
                                        title={
                                            definition?.name
                                                ? `${definition.name}: ${attribute.value}`
                                                : attribute.value
                                        }
                                    >
                                        <b>●</b>

                                        <em>
                                            {definition?.name
                                                ? `${definition.name}: `
                                                : ""}
                                        </em>

                                        <strong>
                                            {attribute.value}
                                        </strong>
                                    </span>
                                );
                            }
                        )}
                    </div>
                )}

                <div className="available">
                    <span>●</span>

                    {stockQuantity > 0
                        ? `Є в наявності (${stockQuantity} шт.)`
                        : "Немає в наявності"}
                </div>
            </div>

            <div className="product-price">
                <strong>
                    {formatPrice(product.price)}
                </strong>

                {product.oldPrice != null &&
                    product.oldPrice > product.price && (
                        <del>
                            {formatPrice(product.oldPrice)}
                        </del>
                    )}

                <div className="quantity">
                    <button
                        type="button"
                        onClick={() =>
                            onQuantityChange(
                                cartItem,
                                cartItem.quantity - 1
                            )
                        }
                        disabled={!canDecrease}
                        aria-label="Зменшити кількість"
                    >
                        <Minus size={13} />
                    </button>

                    <span>
                        {cartItem.quantity}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            onQuantityChange(
                                cartItem,
                                cartItem.quantity + 1
                            )
                        }
                        disabled={!canIncrease}
                        aria-label="Збільшити кількість"
                    >
                        <Plus size={13} />
                    </button>
                </div>
            </div>

            <div className="product-total">
                {formatPrice(
                    product.price *
                        cartItem.quantity
                )}
            </div>

            <button
                type="button"
                className="product-delete"
                onClick={() =>
                    onDelete(cartItem.id)
                }
            >
                <Trash2
                    size={18}
                    strokeWidth={1.5}
                />
            </button>
        </div>
    );
};

const CartProducts = () => {
    const {
        data: cartData,
        isLoading: isCartLoading,
        isError: isCartError,
        refetch: refetchCart,
    } = useGetCartQuery();

    const {
        data: productsData,
        isLoading: isProductsLoading,
        isError: isProductsError,
    } = useGetAllProductsQuery();

    const {
        data: definitionsData,
        isLoading: isDefinitionsLoading,
        isError: isDefinitionsError,
    } = useGetAllAttributeDefinitionsQuery();

    const [updateCartItem] =
        useUpdateCartItemMutation();

    const [
        deleteCartItem,
        {
            isLoading: isDeletingCartItem,
        },
    ] = useDeleteCartItemMutation();

    const [
        selectedItems,
        setSelectedItems,
    ] = useState<Set<string>>(new Set());

    if (
        isCartLoading ||
        isProductsLoading ||
        isDefinitionsLoading
    ) {
        return (
            <div className="cart-products">
                <p className="cart-products-message">
                    Завантаження кошика...
                </p>
            </div>
        );
    }

    if (
        isCartError ||
        isProductsError ||
        isDefinitionsError
    ) {
        return (
            <div className="cart-products">
                <p className="cart-products-message">
                    Не вдалося завантажити кошик.
                </p>
            </div>
        );
    }

    const cart = cartData?.payload;
    const products = productsData?.payload ?? [];
    const attributeDefinitions =
        definitionsData?.payload ?? [];

    if (
        !cart ||
        cart.items.length === 0
    ) {
        return (
            <div className="cart-products">
                <div className="cart-products__empty">
                    <h2>Кошик порожній</h2>
                    <p>
                        Додайте товари,
                        щоб вони з'явилися тут.
                    </p>
                </div>
            </div>
        );
    }

    const getProduct = (
        productId: string
    ): Product | undefined => {
        return products.find(
            (product) =>
                product.id === productId
        );
    };

    const cartProducts = cart.items
        .map((cartItem: CartItem) => {
            const product = getProduct(
                cartItem.productId
            );

            if (!product) {
                return null;
            }

            return {
                cartItem,
                product,
            };
        })
        .filter(
            (
                item
            ): item is {
                cartItem: CartItem;
                product: Product;
            } => item !== null
        );

    const allSelected =
        cartProducts.length > 0 &&
        cartProducts.every(
            ({ cartItem }) =>
                selectedItems.has(
                    cartItem.id
                )
        );

    const handleSelect = (
        id: string,
        checked: boolean
    ) => {
        setSelectedItems((previous) => {
            const next = new Set(previous);

            if (checked) {
                next.add(id);
            } else {
                next.delete(id);
            }

            return next;
        });
    };

    const handleSelectAll = (
        checked: boolean
    ) => {
        if (checked) {
            const ids = cartProducts.map(
                ({ cartItem }) =>
                    cartItem.id
            );

            setSelectedItems(
                new Set(ids)
            );
        } else {
            setSelectedItems(new Set());
        }
    };

    const handleQuantityChange = async (
        cartItem: CartItem,
        newQuantity: number
    ) => {
        if (newQuantity < 1) {
            return;
        }

        const product = getProduct(
            cartItem.productId
        );

        if (!product) {
            return;
        }

        const stockQuantity = Math.max(
            0,
            product.quantity
        );

        if (
            newQuantity >
            stockQuantity
        ) {
            return;
        }

        if (
            newQuantity ===
            cartItem.quantity
        ) {
            return;
        }

        try {
            await updateCartItem({
                id: cartItem.id,
                cartId: cartItem.cartId,
                productId:
                    cartItem.productId,
                quantity: newQuantity,
                createdDate:
                    cartItem.createdDate,
            }).unwrap();

            await refetchCart();
        } catch (error) {
            console.error(
                "Не вдалося змінити кількість:",
                error
            );
        }
    };

    const handleDelete = async (
        id: string
    ) => {
        try {
            await deleteCartItem(id).unwrap();

            setSelectedItems(
                (previous) => {
                    const next = new Set(
                        previous
                    );

                    next.delete(id);

                    return next;
                }
            );

            await refetchCart();
        } catch (error) {
            console.error(
                "Не вдалося видалити товар:",
                error
            );
        }
    };

    const handleDeleteSelected = async () => {
        if (
            selectedItems.size === 0
        ) {
            return;
        }

        try {
            await Promise.all(
                Array.from(
                    selectedItems
                ).map((id) =>
                    deleteCartItem(
                        id
                    ).unwrap()
                )
            );

            setSelectedItems(
                new Set()
            );

            await refetchCart();
        } catch (error) {
            console.error(
                "Не вдалося видалити вибрані товари:",
                error
            );
        }
    };

    const totalQuantity =
        cart.items.length;

    return (
        <div className="cart-products">
            <div className="cart-products__header">
                <label className="select-all">
                    <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={(event) =>
                            handleSelectAll(
                                event.target.checked
                            )
                        }
                    />

                    <span>
                        Вибрати всі товари (
                        {totalQuantity}
                        )
                    </span>
                </label>

                <button
                    type="button"
                    className="delete-selected"
                    onClick={
                        handleDeleteSelected
                    }
                    disabled={
                        selectedItems.size ===
                            0 ||
                        isDeletingCartItem
                    }
                >
                    {isDeletingCartItem
                        ? "Видалення..."
                        : "Видалити вибрані"}
                </button>
            </div>

            {cartProducts.map(
                ({
                    cartItem,
                    product,
                }) => (
                    <CartProductItem
                        key={cartItem.id}
                        cartItem={cartItem}
                        product={product}
                        attributeDefinitions={
                            attributeDefinitions
                        }
                        selected={selectedItems.has(
                            cartItem.id
                        )}
                        onSelect={
                            handleSelect
                        }
                        onDelete={
                            handleDelete
                        }
                        onQuantityChange={
                            handleQuantityChange
                        }
                    />
                )
            )}
        </div>
    );
};

export default CartProducts;