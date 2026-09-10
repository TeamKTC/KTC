import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = "https://localhost:7120/api/";

import type {
  Category,
  CreateCategoryDto,
  Product,
  ServiceResponse,
} from "../../types/types";

export const categoryApi = createApi({
  reducerPath: "categoryApi",

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

  tagTypes: ["Category", "Product"],

  endpoints: (build) => ({
    // GET /api/category
    getAllCategories: build.query<
      ServiceResponse<Category[]>,
      void
    >({
      query: () => ({
        url: "category",
        method: "GET",
      }),

      providesTags: ["Category"],
    }),

    // GET /api/category/by-id?categoryId=...
    getCategoryById: build.query<
      ServiceResponse<Category>,
      string
    >({
      query: (categoryId) => ({
        url: "category/by-id",
        method: "GET",
        params: {
          categoryId,
        },
      }),

      providesTags: ["Category"],
    }),

    // GET /api/category/by-name?categoryName=...
    getCategoryByName: build.query<
      ServiceResponse<Category>,
      string
    >({
      query: (categoryName) => ({
        url: "category/by-name",
        method: "GET",
        params: {
          categoryName,
        },
      }),

      providesTags: ["Category"],
    }),

    // GET /api/category/products-by-category-name?categoryName=...
    getProductsByCategoryName: build.query<
      ServiceResponse<Product[]>,
      string
    >({
      query: (categoryName) => ({
        url: "category/products-by-category-name",
        method: "GET",
        params: {
          categoryName,
        },
      }),

      providesTags: ["Product"],
    }),

    // POST /api/category
    createCategory: build.mutation<
      ServiceResponse<Category>,
      CreateCategoryDto
    >({
      query: (body) => ({
        url: "category",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetCategoryByNameQuery,
  useGetProductsByCategoryNameQuery,
  useCreateCategoryMutation,
} = categoryApi;