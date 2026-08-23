import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    createdDate: string;
}

export interface Cart {
    id: string;
    userId: string;
    createdDate: string;
    createdAt: string;
    items: CartItem[];
}

export interface CartResponse {
    message: string;
    isSuccess: boolean;
    payload: Cart | null;
    statusCode: number;
}

export interface ServiceResponse {
    message: string;
    isSuccess: boolean;
    payload: null;
    statusCode: number;
}

export const cartApi = createApi({
    reducerPath: "cartApi",

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

    tagTypes: ["Cart"],

    endpoints: (builder) => ({

        // GET /api/cart
        // Кошик поточного авторизованого користувача
        getCart: builder.query<CartResponse, void>({
            query: () => "Cart",
            providesTags: ["Cart"],
        }),

        // GET /api/cart/{id}
        getCartById: builder.query<CartResponse, string>({
            query: (id) => `Cart/${id}`,
            providesTags: ["Cart"],
        }),

        // GET /api/cart/user/{userId}
        getCartByUserId: builder.query<CartResponse, string>({
            query: (userId) => `Cart/user/${userId}`,
            providesTags: ["Cart"],
        }),

        createCart: builder.mutation<ServiceResponse, Cart>({
            query: (body) => ({
                url: "Cart",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Cart"],
        }),

        updateCart: builder.mutation<ServiceResponse, Cart>({
            query: (body) => ({
                url: "Cart",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Cart"],
        }),

        deleteCart: builder.mutation<ServiceResponse, string>({
            query: (id) => ({
                url: `Cart/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const {
    useGetCartQuery,
    useGetCartByIdQuery,
    useGetCartByUserIdQuery,
    useCreateCartMutation,
    useUpdateCartMutation,
    useDeleteCartMutation,
} = cartApi;