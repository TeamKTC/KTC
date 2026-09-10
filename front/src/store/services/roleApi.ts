import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ServiceResponse } from "../../types/types";

const apiUrl = "https://localhost:7120/api/";

export const roleApi = createApi({
  reducerPath: "roleApi",

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

  tagTypes: ["Role"],

  endpoints: (build) => ({
    // GET /api/role?userId=...
    // Payload -> boolean
    isUserAdmin: build.query<ServiceResponse<boolean>, string>({
      query: (userId) => ({
        url: "role",
        method: "GET",
        params: {
          userId,
        },
      }),

      providesTags: ["Role"],
    }),
  }),
});

export const { useIsUserAdminQuery } = roleApi;