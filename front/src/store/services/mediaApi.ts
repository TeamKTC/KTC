import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { MediaFile, ServiceResponse } from "../../types/types";

const apiUrl = "https://localhost:7120/api/";

export const mediaApi = createApi({
  reducerPath: "mediaApi",

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

  tagTypes: ["Media"],

  endpoints: (build) => ({
    // GET /api/media/product/{productId}
    // Payload -> List<MediaFile>
    getMediaByProductId: build.query<
      ServiceResponse<MediaFile[]>,
      string
    >({
      query: (productId) => ({
        url: `media/product/${productId}`,
        method: "GET",
      }),

      providesTags: ["Media"],
    }),
  }),
});

export const { useGetMediaByProductIdQuery } = mediaApi;