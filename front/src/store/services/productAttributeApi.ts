import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiUrl = "https://localhost:7120/api/";

import type {
  ProductAttribute,
  ServiceResponse,
} from "../../types/types";

export const productAttributeApi = createApi({
  reducerPath: "productAttributeApi",

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

  tagTypes: ["ProductAttribute"],

  endpoints: (build) => ({

    // GET /api/product-attribute
    // Payload -> List<ProductAttributeDto>
    getAllProductAttributes: build.query<
      ServiceResponse<ProductAttribute[]>,
      void
    >({
      query: () => ({
        url: "product-attribute",
        method: "GET",
      }),

      providesTags: ["ProductAttribute"],
    }),

    // GET /api/product-attribute/by-id?productAttributeId=...
    // Payload -> ProductAttributeDto
    getProductAttributeById: build.query<
      ServiceResponse<ProductAttribute>,
      string
    >({
      query: (productAttributeId) => ({
        url: "product-attribute/by-id",
        method: "GET",
        params: {
          productAttributeId,
        },
      }),

      providesTags: ["ProductAttribute"],
    }),

    // GET /api/product-attribute/by-product-id?productId=...
    // Payload -> List<ProductAttributeDto>
    getProductAttributesByProductId: build.query<
      ServiceResponse<ProductAttribute[]>,
      string
    >({
      query: (productId) => ({
        url: "product-attribute/by-product-id",
        method: "GET",
        params: {
          productId,
        },
      }),

      providesTags: ["ProductAttribute"],
    }),

    // GET /api/product-attribute/by-attribute-definition-id?attributeDefinitionId=...
    // Payload -> List<ProductAttributeDto>
    getProductAttributesByAttributeDefinitionId: build.query<
      ServiceResponse<ProductAttribute[]>,
      string
    >({
      query: (attributeDefinitionId) => ({
        url: "product-attribute/by-attribute-definition-id",
        method: "GET",
        params: {
          attributeDefinitionId,
        },
      }),

      providesTags: ["ProductAttribute"],
    }),

    // GET /api/product-attribute/by-range-of-value?attributeDefinitionId=...&min=...&max=...
    // Payload -> List<ProductAttributeDto>
    getProductAttributesByRangeOfValue: build.query<
      ServiceResponse<ProductAttribute[]>,
      { attributeDefinitionId: string; min: number; max: number }
    >({
      query: ({ attributeDefinitionId, min, max }) => ({
        url: "product-attribute/by-range-of-value",
        method: "GET",
        params: {
          attributeDefinitionId,
          min,
          max,
        },
      }),

      providesTags: ["ProductAttribute"],
    }),
  }),
});

export const {
  useGetAllProductAttributesQuery,
  useGetProductAttributeByIdQuery,
  useGetProductAttributesByProductIdQuery,
  useGetProductAttributesByAttributeDefinitionIdQuery,
  useGetProductAttributesByRangeOfValueQuery,
} = productAttributeApi;