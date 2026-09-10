import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = "https://localhost:7120/api/";

import type {
  Brand,
  CreateBrandDto,
  Product,
  ServiceResponse,
} from "../../types/types";

export const brandApi = createApi({
  reducerPath: "brandApi",

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

  tagTypes: ["Brand"],

  endpoints: (build) => ({

    // GET /api/brand
    getAllBrands: build.query<
      ServiceResponse<Brand[]>,
      void
    >({
      query: () => ({
        url: "brand",
        method: "GET",
      }),

      providesTags: ["Brand"],
    }),

    // GET /api/brand/by-id?brandId=...
    getBrandById: build.query<
      ServiceResponse<Brand>,
      string
    >({
      query: (brandId) => ({
        url: "brand/by-id",
        method: "GET",
        params: {
          brandId,
        },
      }),

      providesTags: ["Brand"],
    }),

    // GET /api/brand/all-products?brandId=...
    getAllProductsByBrandId: build.query<
      ServiceResponse<Product[]>,
      string
    >({
      query: (brandId) => ({
        url: "brand/all-products",
        method: "GET",
        params: {
          brandId,
        },
      }),

      providesTags: ["Brand"],
    }),

    // POST /api/brand
    createBrand: build.mutation<
      ServiceResponse<Brand>,
      CreateBrandDto | FormData
    >({
      query: (body) => ({
        url: "brand",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useGetBrandByIdQuery,
  useGetAllProductsByBrandIdQuery,
  useCreateBrandMutation,
} = brandApi;