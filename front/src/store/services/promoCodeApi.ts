import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

interface ValidatePromoCodeRequest {
    code: string;
    orderAmount: number;
}

interface PromoCodeResult {
    promoCodeId: string;
    isValid: boolean;
    code: string;
    discountAmount: number;
    finalAmount: number;
    message: string;
}

interface ApiResponse<T> {
    message: string;
    isSuccess: boolean;
    payload: T;
    statusCode: number;
}

export const promoCodeApi = createApi({
    reducerPath: "promoCodeApi",

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

    endpoints: (builder) => ({
        validatePromoCode: builder.mutation<
            ApiResponse<PromoCodeResult>,
            ValidatePromoCodeRequest
        >({
            query: (body) => ({
                url: "promocode/validate",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useValidatePromoCodeMutation,
} = promoCodeApi;