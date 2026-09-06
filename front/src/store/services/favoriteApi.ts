import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product, ServiceResponse } from "../../types/types";
import type { RootState } from "../store";

const apiUrl = "https://localhost:7120/api/";

export const favoriteApi = createApi({
    reducerPath: "favoriteApi",

    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,

        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),

    tagTypes: ["Favorite"],

    endpoints: (build) => ({
        // Отримати всі обрані товари
        getFavorites: build.query<ServiceResponse<Product[]>, void>({
            query: () => ({
                url: "favorite",
                method: "GET",
            }),
            providesTags: ["Favorite"],
        }),

        // Додати товар в обране
        addFavorite: build.mutation<
            ServiceResponse<null>,
            string
        >({
            query: (productId) => ({
                url: "favorite",
                method: "POST",
                params: {
                    productId,
                },
            }),
            invalidatesTags: ["Favorite"],
        }),

        // Видалити товар з обраного
        deleteFavorite: build.mutation<
            ServiceResponse<null>,
            string
        >({
            query: (productId) => ({
                url: "favorite",
                method: "DELETE",
                params: {
                    productId,
                },
            }),
            invalidatesTags: ["Favorite"],
        }),
    }),
});

export const {
    useGetFavoritesQuery,
    useAddFavoriteMutation,
    useDeleteFavoriteMutation,
} = favoriteApi;