import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = "https://localhost:7120/api/";

import type { Product, ServiceResponse } from "../../types/types";

export const favoriteApi = createApi({
    reducerPath: "favoriteApi",

    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,

        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),

    tagTypes: ["Favorite"],

    endpoints: (build) => ({
        getFavorites: build.query<ServiceResponse<Product[]>, void>({
            query: () => ({
                url: "Favorite",
                method: "GET",
            }),

            providesTags: ["Favorite"],
        }),
    }),
});

export const {
    useGetFavoritesQuery,
} = favoriteApi;