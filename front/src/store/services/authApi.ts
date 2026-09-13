import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

interface LoginRequest {
    login: string;
    password: string;
}

interface LoginPayload {
    token?: string;
    challenge?: string;
    requiresTwoFactor?: boolean;
}

interface LoginResponse {
    message: string;
    isSuccess: boolean;
    payload: LoginPayload;
    statusCode: number;
}

interface VerifyTwoFactorRequest {
    challenge: string;
    code: string;
}

interface VerifyTwoFactorResponse {
    message: string;
    isSuccess: boolean;
    payload: {
        token: string;
    };
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

interface TwoFactorResponse {
    message: string;
    isSuccess: boolean;
    payload: null;
    statusCode: number;
}

interface TwoFactorCodeRequest {
    code: string;
}

interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

interface ForgotPasswordRequest {
    login: string;
}

interface ForgotPasswordPayload {
    challenge: string;
}

interface ForgotPasswordResponse {
    message: string;
    isSuccess: boolean;
    payload: ForgotPasswordPayload;
    statusCode: number;
}

interface VerifyResetCodeRequest {
    challenge: string;
    code: string;
}

interface VerifyResetCodePayload {
    challenge: string;
}

interface VerifyResetCodeResponse {
    message: string;
    isSuccess: boolean;
    payload: VerifyResetCodePayload;
    statusCode: number;
}

interface ResetPasswordRequest {
    challenge: string;
    code: string;
    newPassword: string;
}

interface ResetPasswordResponse {
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
                headers.set(
                    "Authorization",
                    `Bearer ${token}`
                );
            }

            return headers;
        },
    }),

    endpoints: (builder) => ({
        login: builder.mutation<
            LoginResponse,
            LoginRequest
        >({
            query: (body) => ({
                url: "auth/login",
                method: "POST",
                body,
            }),
        }),

        verifyTwoFactor: builder.mutation<
            VerifyTwoFactorResponse,
            VerifyTwoFactorRequest
        >({
            query: (body) => ({
                url: "auth/verify-2fa",
                method: "POST",
                body,
            }),
        }),

        register: builder.mutation<
            RegisterResponse,
            RegisterRequest
        >({
            query: (body) => ({
                url: "auth/register",
                method: "POST",
                body,
            }),
        }),

        enableTwoFactor: builder.mutation<
            TwoFactorResponse,
            void
        >({
            query: () => ({
                url: "auth/enable-2fa",
                method: "POST",
            }),
        }),

        confirmEnableTwoFactor: builder.mutation<
            TwoFactorResponse,
            TwoFactorCodeRequest
        >({
            query: (body) => ({
                url: "auth/confirm-enable-2fa",
                method: "POST",
                body,
            }),
        }),

        disableTwoFactor: builder.mutation<
            TwoFactorResponse,
            void
        >({
            query: () => ({
                url: "auth/disable-2fa",
                method: "POST",
            }),
        }),

        confirmDisableTwoFactor: builder.mutation<
            TwoFactorResponse,
            TwoFactorCodeRequest
        >({
            query: (body) => ({
                url: "auth/confirm-disable-2fa",
                method: "POST",
                body,
            }),
        }),

        changePassword: builder.mutation<
            TwoFactorResponse,
            ChangePasswordRequest
        >({
            query: (body) => ({
                url: "auth/change-password",
                method: "POST",
                body,
            }),
        }),

        forgotPassword: builder.mutation<
            ForgotPasswordResponse,
            ForgotPasswordRequest
        >({
            query: (body) => ({
                url: "auth/forgot-password",
                method: "POST",
                body,
            }),
        }),

        verifyResetCode: builder.mutation<
            VerifyResetCodeResponse,
            VerifyResetCodeRequest
        >({
            query: (body) => ({
                url: "auth/verify-reset-code",
                method: "POST",
                body,
            }),
        }),

        resetPassword: builder.mutation<
            ResetPasswordResponse,
            ResetPasswordRequest
        >({
            query: (body) => ({
                url: "auth/reset-password",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useVerifyTwoFactorMutation,
    useRegisterMutation,

    useEnableTwoFactorMutation,
    useConfirmEnableTwoFactorMutation,

    useDisableTwoFactorMutation,
    useConfirmDisableTwoFactorMutation,

    useChangePasswordMutation,

    useForgotPasswordMutation,
    useVerifyResetCodeMutation,
    useResetPasswordMutation,
} = authApi;
