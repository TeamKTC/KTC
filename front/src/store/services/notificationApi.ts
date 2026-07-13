import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    isRead: boolean;
    createdDate: string;
}

export interface NotificationResponse {
    message: string;
    isSuccess: boolean;
    payload: Notification;
    statusCode: number;
}

export interface NotificationsResponse {
    message: string;
    isSuccess: boolean;
    payload: Notification[];
    statusCode: number;
}

export interface ServiceResponse {
    message: string;
    isSuccess: boolean;
    payload: null;
    statusCode: number;
}

export const notificationApi = createApi({
    reducerPath: "notificationApi",

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
        getNotificationById: builder.query<NotificationResponse, string>({
            query: (id) => `Notification/${id}`,
        }),

        getNotificationsByUserId: builder.query<NotificationsResponse, string>({
            query: (userId) => `Notification/user/${userId}`,
        }),

        createNotification: builder.mutation<ServiceResponse, Notification>({
            query: (body) => ({
                url: "Notification",
                method: "POST",
                body,
            }),
        }),

        updateNotification: builder.mutation<ServiceResponse, Notification>({
            query: (body) => ({
                url: "Notification",
                method: "PUT",
                body,
            }),
        }),

        deleteNotification: builder.mutation<ServiceResponse, string>({
            query: (id) => ({
                url: `Notification/${id}`,
                method: "DELETE",
            }),
        }),

        markAsRead: builder.mutation<ServiceResponse, string>({
            query: (id) => ({
                url: `Notification/mark-as-read/${id}`,
                method: "PUT",
            }),
        }),
    }),
});

export const {
    useGetNotificationByIdQuery,
    useGetNotificationsByUserIdQuery,
    useCreateNotificationMutation,
    useUpdateNotificationMutation,
    useDeleteNotificationMutation,
    useMarkAsReadMutation,
} = notificationApi;