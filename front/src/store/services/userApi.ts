import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    createdDate: string;
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
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useGetUserByEmailQuery,
    useSearchUsersQuery,
    useGetUsersCreatedAfterQuery,
} = userApi;