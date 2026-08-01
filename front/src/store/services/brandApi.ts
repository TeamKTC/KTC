
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = "https://localhost:7120/api/";

import type {
  Brand,
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
    // Payload -> List<BrandDto>
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
    // Payload -> BrandDto
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
    // Payload -> List<ProductDto>
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
  }),
});

export const {
  useGetAllBrandsQuery,
  useGetBrandByIdQuery,
  useGetAllProductsByBrandIdQuery,
} = brandApi;


