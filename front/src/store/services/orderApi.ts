import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export interface Order {
    id: string;
    orderNumber: string;
    createdDate: string;
    status: string;
    userId: string;
    user: null;
    items: any[];
    totalPrice: number;
}

export interface OrdersResponse {
    message: string;
    isSuccess: boolean;
    payload: Order[];
    statusCode: number;
}

export const orderApi = createApi({
    reducerPath: "orderApi",

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
        getMyOrders: builder.query<OrdersResponse, void>({
            query: () => "order/my",
        }),
    }),
});

export const {
    useGetMyOrdersQuery,
} = orderApi;