import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from "../store";

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
}

export interface OrderItemsResponse {
    message: string;
    isSuccess: boolean;
    payload: OrderItem[];
    statusCode: number;
}

export interface OrderItemByIdResponse {
    message: string;
    isSuccess: boolean;
    payload: OrderItem | null;
    statusCode: number;
}

export interface CreateOrderItemDto {
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
}

export interface UpdateOrderItemDto {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
}

export interface OrderItemActionResponse {
    message: string;
    isSuccess: boolean;
    payload: null;
    statusCode: number;
}

export const orderItemApi = createApi({
    reducerPath: "orderItemApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7120/api/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;

            if (token) {
                headers.set(
                    "Authorization",
                    `Bearer ${token}`
                );
            }

            return headers;
        },
    }),

    tagTypes: ["OrderItem"],

    endpoints: (builder) => ({
        // Всі OrderItem
        getAllOrderItems: builder.query<
            OrderItemsResponse,
            void
        >({
            query: () => "order-item",
            providesTags: ["OrderItem"],
        }),

        // OrderItem по ID
        getOrderItemById: builder.query<
            OrderItemByIdResponse,
            string
        >({
            query: (orderItemId) =>
                `order-item/by-id?orderItemId=${orderItemId}`,
            providesTags: ["OrderItem"],
        }),

        // OrderItem по Order ID
        getOrderItemsByOrderId: builder.query<
            OrderItemsResponse,
            string
        >({
            query: (orderId) =>
                `order-item/by-order-id?orderId=${orderId}`,
            providesTags: ["OrderItem"],
        }),

        // OrderItem по Product ID
        getOrderItemsByProductId: builder.query<
            OrderItemsResponse,
            string
        >({
            query: (productId) =>
                `order-item/by-product-id?productId=${productId}`,
            providesTags: ["OrderItem"],
        }),

        // Створити OrderItem
        createOrderItem: builder.mutation<
            OrderItemByIdResponse,
            CreateOrderItemDto
        >({
            query: (body) => ({
                url: "order-item",
                method: "POST",
                body,
            }),
            invalidatesTags: ["OrderItem"],
        }),

        // Оновити OrderItem
        updateOrderItem: builder.mutation<
            OrderItemByIdResponse,
            UpdateOrderItemDto
        >({
            query: (body) => ({
                url: "order-item",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["OrderItem"],
        }),


        deleteOrderItem: builder.mutation<
            OrderItemActionResponse,
            string
        >({
            query: (orderItemId) => ({
                url: `order-item?orderItemId=${orderItemId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["OrderItem"],
        }),
    }),
});

export const {
    useGetAllOrderItemsQuery,
    useGetOrderItemByIdQuery,
    useGetOrderItemsByOrderIdQuery,
    useGetOrderItemsByProductIdQuery,
    useCreateOrderItemMutation,
    useUpdateOrderItemMutation,
    useDeleteOrderItemMutation,
} = orderItemApi;