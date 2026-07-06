import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

interface LoginRequest {
    login: string;
    password: string;
}

interface LoginResponse {
    message: string;
    isSuccess: boolean;
    payload: string;
    statusCode: number;
}

interface RegisterRequest {
    phoneNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface RegisterResponse {
    message: string;
    isSuccess: boolean;
    payload: null;
    statusCode: number;
}

export const authApi = createApi({
    reducerPath: "authApi",

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
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: "auth/login",
                method: "POST",
                body,
            }),
        }),
         register: builder.mutation<RegisterResponse, RegisterRequest>({
        query: (body) => ({
            url: "auth/register",
            method: "POST",
            body,
        }),
    }),
    }),
    
});

export const { useLoginMutation, useRegisterMutation } = authApi;