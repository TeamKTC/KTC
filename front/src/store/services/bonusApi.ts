import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export interface Bonus {
    id: string;
    amount: number;
    operationType: number;
    description: string;
    createdDate: string;
}

export interface BonusHistoryResponse {
    message: string;
    isSuccess: boolean;
    payload: Bonus[];
    statusCode: number;
}

export interface BonusBalance {
    bonusBalance: number;
}

export interface BonusBalanceResponse {
    message: string;
    isSuccess: boolean;
    payload: BonusBalance;
    statusCode: number;
}

export const bonusApi = createApi({
    reducerPath: "bonusApi",

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
        getBonusHistory: builder.query<BonusHistoryResponse, void>({
            query: () => "Bonus",
        }),

        getBonusBalance: builder.query<BonusBalanceResponse, void>({
            query: () => "Bonus/balance",
        }),
    }),
});

export const {
    useGetBonusHistoryQuery,
    useGetBonusBalanceQuery,
} = bonusApi;