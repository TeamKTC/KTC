import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: string;
    userId: string;
    user: null;
    items: OrderItem[];
    totalPrice: number;
    usedBonuses: number;
    promoCodeId: string | null;
    promoDiscount: number;

    deliveryType: string;

    city: string | null;
    department: string | null;
    address: string | null;

    paymentType: string;
    installmentBank: string | null;
    comment: string | null;
}

export interface OrdersResponse {
    message: string;
    isSuccess: boolean;
    payload: Order[];
    statusCode: number;
}

export interface CreateOrderDto {
    date?: string;
    releaseDate?: string;
    status?: string;
    promoCodeId?: string | null;

    usedBonuses: number;

    deliveryType: string;

    city?: string | null;
    department?: string | null;
    address?: string | null;

    paymentType: string;
    installmentBank?: string | null;
    comment?: string | null;
}

export interface CreateOrderResponse {
    message: string;
    isSuccess: boolean;
    payload: {
        orderId: string;
        orderNumber: string;
        productsTotal: number;
        promoDiscount: number;
        usedBonuses: number;
        totalPrice: number;
    } | null;
    statusCode: number;
}

export const orderApi = createApi({
    reducerPath: "orderApi",

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

    tagTypes: ["Order"],

    endpoints: (builder) => ({
        getMyOrders: builder.query<OrdersResponse, void>({
            query: () => "order/my",
            providesTags: ["Order"],
        }),

        getOrderById: builder.query<
            {
                message: string;
                isSuccess: boolean;
                payload: Order | null;
                statusCode: number;
            },
            string
        >({
            query: (id) => `order/${id}`,
            providesTags: ["Order"],
        }),

        createOrder: builder.mutation<
            CreateOrderResponse,
            CreateOrderDto
        >({
            query: (body) => ({
                url: "order",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Order"],
        }),
    }),
});

export const {
    useGetMyOrdersQuery,
    useGetOrderByIdQuery,
    useCreateOrderMutation,
} = orderApi;