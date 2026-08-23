import "./CartProducts.css";

import { Trash2, Minus, Plus } from "lucide-react";
import { useState } from "react";

import {
    useGetCartQuery,
} from "../../../store/services/cartApi";

import {
    useUpdateCartItemMutation,
    useDeleteCartItemMutation,
} from "../../../store/services/cartItemApi";

import {
    useGetAllProductsQuery,
} from "../../../store/services/productApi";

import {
    useGetAllAttributeDefinitionsQuery,
} from "../../../store/services/attributeDefinitionApi";

import {
    useGetProductAttributesByProductIdQuery,
} from "../../../store/services/productAttributeApi";

import {
    useGetMediaByProductIdQuery,
} from "../../../store/services/mediaApi";

import type {
    Product,
    ProductAttribute,
    AttributeDefinition,
    MediaFile,
} from "../../../types/types";


/* =========================================================
   TYPES
========================================================= */

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

    onSelect: (
        id: string,
        checked: boolean
    ) => void;

    onDelete: (
        id: string
    ) => void;

    onQuantityChange: (
        cartItem: CartItem,
        newQuantity: number
    ) => void;
}


/* =========================================================
   CART PRODUCT ITEM
========================================================= */

const CartProductItem = ({
    cartItem,
    product,
    attributeDefinitions,
    selected,
    onSelect,
    onDelete,
    onQuantityChange,
}: CartProductItemProps) => {

    /*
     * Атрибути товару
     */
    const {
        data: attributesData,
    } = useGetProductAttributesByProductIdQuery(
        product.id
    );


    /*
     * Картинки товару
     */
    const {
        data: mediaData,
    } = useGetMediaByProductIdQuery(
        product.id
    );


    const attributes: ProductAttribute[] =
        attributesData?.payload ?? [];


    const media: MediaFile[] =
        mediaData?.payload ?? [];


    /*
     * Беремо перші 3 атрибути
     */
    const visibleAttributes =
        attributes.slice(0, 3);


    /*
     * Перша картинка
     */
    const imageUrl =
        media.length > 0
            ? media[0].url
            : null;


    /*
     * Форматування ціни
     */
    const formatPrice = (
        price: number
    ) => {
        return `${price.toLocaleString("uk-UA")} грн`;
    };


    return (
        <div className="cart-product">


            {/* =================================================
                CHECKBOX
            ================================================= */}

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


            {/* =================================================
                IMAGE
            ================================================= */}

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


            {/* =================================================
                PRODUCT INFO
            ================================================= */}

            <div className="product-info">

                <h3>
                    {product.name}
                </h3>


                {/* ATTRIBUTES */}

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
                                        key={
                                            attribute.id
                                        }
                                        title={
                                            definition?.name
                                                ? `${definition.name}: ${attribute.value}`
                                                : attribute.value
                                        }
                                    >

                                        <b>
                                            ●
                                        </b>

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


                {/* AVAILABLE */}

                <div className="available">

                    <span>
                        ●
                    </span>

                    {product.quantity > 0
                        ? "Є в наявності"
                        : "Немає в наявності"}

                </div>

            </div>


            {/* =================================================
                PRICE
            ================================================= */}

            <div className="product-price">

                <strong>
                    {formatPrice(
                        product.price
                    )}
                </strong>


                {/* OLD PRICE */}

                {product.oldPrice != null &&
                    product.oldPrice >
                    product.price && (

                        <del>
                            {formatPrice(
                                product.oldPrice
                            )}
                        </del>

                    )}


                {/* =================================================
                    QUANTITY
                ================================================= */}

                <div className="quantity">

                    <button
                        type="button"

                        onClick={() =>
                            onQuantityChange(
                                cartItem,
                                cartItem.quantity - 1
                            )
                        }

                        disabled={
                            cartItem.quantity <= 1
                        }
                    >

                        <Minus
                            size={13}
                        />

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

                        disabled={
                            cartItem.quantity >=
                            product.quantity
                        }
                    >

                        <Plus
                            size={13}
                        />

                    </button>

                </div>

            </div>


            {/* =================================================
                TOTAL
            ================================================= */}

            <div className="product-total">

                {formatPrice(
                    product.price *
                    cartItem.quantity
                )}

            </div>


            {/* =================================================
                DELETE
            ================================================= */}

            <button
                type="button"
                className="product-delete"

                onClick={() =>
                    onDelete(
                        cartItem.id
                    )
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


/* =========================================================
   CART PRODUCTS
========================================================= */

const CartProducts = () => {

    /*
     * ========================================================
     * CART
     * ========================================================
     */

    const {
        data: cartData,
        isLoading: isCartLoading,
        isError: isCartError,
        refetch: refetchCart,
    } = useGetCartQuery();


    /*
     * ========================================================
     * PRODUCTS
     * ========================================================
     */

    const {
        data: productsData,
        isLoading: isProductsLoading,
        isError: isProductsError,
    } = useGetAllProductsQuery();


    /*
     * ========================================================
     * ATTRIBUTE DEFINITIONS
     * ========================================================
     */

    const {
        data: definitionsData,
        isLoading: isDefinitionsLoading,
        isError: isDefinitionsError,
    } = useGetAllAttributeDefinitionsQuery();


    /*
     * ========================================================
     * CART ITEM MUTATIONS
     * ========================================================
     */

    const [
        updateCartItem,
        {
            isLoading: isUpdatingCartItem,
        },
    ] = useUpdateCartItemMutation();


    const [
        deleteCartItem,
        {
            isLoading: isDeletingCartItem,
        },
    ] = useDeleteCartItemMutation();


    /*
     * ========================================================
     * SELECTED ITEMS
     * ========================================================
     */

    const [
        selectedItems,
        setSelectedItems,
    ] = useState<Set<string>>(
        new Set()
    );


    /*
     * ========================================================
     * LOADING
     * ========================================================
     */

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


    /*
     * ========================================================
     * ERROR
     * ========================================================
     */

    if (
        isCartError ||
        isProductsError ||
        isDefinitionsError
    ) {

        return (

            <div className="cart-products">

                <p className="cart-products-message">
                    Не вдалося завантажити
                    кошик.
                </p>

            </div>

        );
    }


    /*
     * ========================================================
     * DATA
     * ========================================================
     */

    const cart =
        cartData?.payload;


    const products =
        productsData?.payload ?? [];


    const attributeDefinitions =
        definitionsData?.payload ?? [];


    /*
     * ========================================================
     * EMPTY CART
     * ========================================================
     */

    if (!cart) {

        return (

            <div className="cart-products">

                <div className="cart-products__empty">

                    <h2>
                        Кошик порожній
                    </h2>

                    <p>
                        Додайте товари,
                        щоб вони з'явилися тут.
                    </p>

                </div>

            </div>

        );
    }


    if (
        cart.items.length === 0
    ) {

        return (

            <div className="cart-products">

                <div className="cart-products__empty">

                    <h2>
                        Кошик порожній
                    </h2>

                    <p>
                        Додайте товари,
                        щоб вони з'явилися тут.
                    </p>

                </div>

            </div>

        );
    }


    /*
     * ========================================================
     * FIND PRODUCT
     * ========================================================
     */

    const getProduct = (
        productId: string
    ): Product | undefined => {

        return products.find(
            (product) =>
                product.id === productId
        );

    };


    /*
     * ========================================================
     * CART PRODUCTS
     * ========================================================
     */

    const cartProducts =
        cart.items
            .map(
                (cartItem: CartItem) => {

                    const product =
                        getProduct(
                            cartItem.productId
                        );


                    if (!product) {
                        return null;
                    }


                    return {
                        cartItem,
                        product,
                    };

                }
            )
            .filter(
                (
                    item
                ): item is {
                    cartItem: CartItem;
                    product: Product;
                } =>
                    item !== null
            );


    /*
     * ========================================================
     * SELECT ALL STATE
     * ========================================================
     */

    const allSelected =
        cartProducts.length > 0 &&
        cartProducts.every(
            ({
                cartItem,
            }) =>
                selectedItems.has(
                    cartItem.id
                )
        );


    /*
     * ========================================================
     * SELECT ONE
     * ========================================================
     */

    const handleSelect = (
        id: string,
        checked: boolean
    ) => {

        setSelectedItems(
            (previous) => {

                const next =
                    new Set(previous);


                if (checked) {

                    next.add(id);

                } else {

                    next.delete(id);

                }


                return next;

            }
        );

    };


    /*
     * ========================================================
     * SELECT ALL
     * ========================================================
     */

    const handleSelectAll = (
        checked: boolean
    ) => {

        if (checked) {

            const ids =
                cartProducts.map(
                    ({
                        cartItem,
                    }) =>
                        cartItem.id
                );


            setSelectedItems(
                new Set(ids)
            );

        } else {

            setSelectedItems(
                new Set()
            );

        }

    };


    /*
     * ========================================================
     * CHANGE QUANTITY
     * ========================================================
     */

    const handleQuantityChange = async (
        cartItem: CartItem,
        newQuantity: number
    ) => {

        /*
         * Не дозволяємо менше 1
         */
        if (
            newQuantity < 1
        ) {
            return;
        }


        /*
         * Знаходимо товар
         */
        const product =
            getProduct(
                cartItem.productId
            );


        if (!product) {
            return;
        }


        /*
         * Не можна більше
         * ніж є на складі
         */
        if (
            newQuantity >
            product.quantity
        ) {
            return;
        }


        try {

            /*
             * PUT /api/CartItem
             */
            await updateCartItem({

                id: cartItem.id,

                cartId:
                    cartItem.cartId,

                productId:
                    cartItem.productId,

                quantity:
                    newQuantity,

                createdDate:
                    cartItem.createdDate,

            }).unwrap();


            /*
             * Оновлюємо кошик
             */
            await refetchCart();

        } catch (error) {

            console.error(
                "Не вдалося змінити кількість:",
                error
            );

        }

    };


    /*
     * ========================================================
     * DELETE ONE
     * ========================================================
     */

    const handleDelete = async (
        id: string
    ) => {

        try {

            /*
             * DELETE /api/CartItem/{id}
             */
            await deleteCartItem(
                id
            ).unwrap();


            /*
             * Забираємо ID з вибраних
             */
            setSelectedItems(
                (previous) => {

                    const next =
                        new Set(previous);

                    next.delete(id);

                    return next;

                }
            );


            /*
             * Оновлюємо кошик
             */
            await refetchCart();

        } catch (error) {

            console.error(
                "Не вдалося видалити товар:",
                error
            );

        }

    };


    /*
     * ========================================================
     * DELETE SELECTED
     * ========================================================
     */

    const handleDeleteSelected = async () => {

        /*
         * Нічого не вибрано
         */
        if (
            selectedItems.size === 0
        ) {
            return;
        }


        try {

            /*
             * Видаляємо кожен CartItem
             */
            await Promise.all(

                Array.from(
                    selectedItems
                ).map(
                    (id) =>
                        deleteCartItem(
                            id
                        ).unwrap()
                )

            );


            /*
             * Очищаємо вибір
             */
            setSelectedItems(
                new Set()
            );


            /*
             * Оновлюємо кошик
             */
            await refetchCart();

        } catch (error) {

            console.error(
                "Не вдалося видалити вибрані товари:",
                error
            );

        }

    };


    /*
     * ========================================================
     * TOTAL QUANTITY
     * ========================================================
     */

        const totalQuantity = cart.items.length;


    /*
     * ========================================================
     * RENDER
     * ========================================================
     */

    return (

        <div className="cart-products">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="cart-products__header">

                <label className="select-all">

                    <input
                        type="checkbox"

                        checked={
                            allSelected
                        }

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
                        selectedItems.size === 0 ||
                        isDeletingCartItem
                    }
                >

                    {isDeletingCartItem
                        ? "Видалення..."
                        : "Видалити вибрані"}

                </button>

            </div>


            {/* =================================================
                PRODUCTS
            ================================================= */}

            {cartProducts.map(
                ({
                    cartItem,
                    product,
                }) => (

                    <CartProductItem

                        key={
                            cartItem.id
                        }

                        cartItem={
                            cartItem
                        }

                        product={
                            product
                        }

                        attributeDefinitions={
                            attributeDefinitions
                        }

                        selected={
                            selectedItems.has(
                                cartItem.id
                            )
                        }

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