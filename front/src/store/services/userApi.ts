import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    bonusBalance: number;
    createdDate: string;
    twoFactorEnabled: boolean;
    birthDate: string;
}

export interface UpdateProfileRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
}

export interface UserResponse {
    message: string;
    isSuccess: boolean;
    payload: User;
    statusCode: number;
}

export interface UsersResponse {
    message: string;
    isSuccess: boolean;
    payload: User[];
    statusCode: number;
}

export const userApi = createApi({
    reducerPath: "userApi",

    tagTypes: ["User"],

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
        getUsers: builder.query<UsersResponse, void>({
            query: () => "User",
        }),

        getMe: builder.query<UserResponse, void>({
            query: () => "User/me",
            providesTags: ["User"],
        }),

        getUserById: builder.query<UserResponse, string>({
            query: (id) => `User/${id}`,
        }),

        getUserByEmail: builder.query<UserResponse, string>({
            query: (email) => `User/email/${encodeURIComponent(email)}`,
        }),

        searchUsers: builder.query<UsersResponse, string>({
            query: (search) => ({
                url: "User/search",
                params: {
                    search,
                },
            }),
        }),

        getUsersCreatedAfter: builder.query<UsersResponse, string>({
            query: (date) => ({
                url: "User/created-after",
                params: {
                    date,
                },
            }),
        }),

        updateProfile: builder.mutation<
            UserResponse,
            UpdateProfileRequest
        >({
            query: (data) => ({
                url: "User/profile",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),

        confirmEmailChange: builder.mutation<
            UserResponse,
            { code: string }
        >({
            query: (data) => ({
                url: "User/profile/confirm-email",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetMeQuery,
    useGetUserByIdQuery,
    useGetUserByEmailQuery,
    useSearchUsersQuery,
    useGetUsersCreatedAfterQuery,
    useUpdateProfileMutation,
    useConfirmEmailChangeMutation,
} = userApi;