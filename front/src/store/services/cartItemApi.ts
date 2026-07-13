import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    createdDate: string;
}

export interface CartItemResponse {
    message: string;
    isSuccess: boolean;
    payload: CartItem;
    statusCode: number;
}

export interface ServiceResponse {
    message: string;
    isSuccess: boolean;
    payload: null;
    statusCode: number;
}

export const cartItemApi = createApi({
    reducerPath: "cartItemApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7120/api/",

        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),

    endpoints: (builder) => ({
        getCartItemById: builder.query<CartItemResponse, string>({
            query: (id) => `CartItem/${id}`,
        }),

        createCartItem: builder.mutation<ServiceResponse, CartItem>({
            query: (body) => ({
                url: "CartItem",
                method: "POST",
                body,
            }),
        }),

        updateCartItem: builder.mutation<ServiceResponse, CartItem>({
            query: (body) => ({
                url: "CartItem",
                method: "PUT",
                body,
            }),
        }),

        deleteCartItem: builder.mutation<ServiceResponse, string>({
            query: (id) => ({
                url: `CartItem/${id}`,
                method: "DELETE",
            }),
        }),

        deleteCartItemsByCartId: builder.mutation<ServiceResponse, string>({
            query: (cartId) => ({
                url: `CartItem/cart/${cartId}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetCartItemByIdQuery,
    useCreateCartItemMutation,
    useUpdateCartItemMutation,
    useDeleteCartItemMutation,
    useDeleteCartItemsByCartIdMutation,
} = cartItemApi;