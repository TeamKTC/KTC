import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
  ServiceResponse,
} from "../../types/types";

const apiUrl = "https://localhost:7120/api/";

export const productApi = createApi({
  reducerPath: "productApi",

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

  tagTypes: ["Product"],

  endpoints: (build) => ({
    // GET /api/product
    // Payload -> List<ProductDto>
    getAllProducts: build.query<
      ServiceResponse<Product[]>,
      void
    >({
      query: () => ({
        url: "product",
        method: "GET",
      }),

      providesTags: ["Product"],
    }),

    // GET /api/product/by-id?productId=...
    // Payload -> ProductDto
    getProductById: build.query<
      ServiceResponse<Product>,
      string
    >({
      query: (productId) => ({
        url: "product/by-id",
        method: "GET",
        params: {
          productId,
        },
      }),

      providesTags: ["Product"],
    }),

    // GET /api/product/by-category-id?categoryId=...
    // Payload -> List<ProductDto>
    getProductsByCategoryId: build.query<
      ServiceResponse<Product[]>,
      string
    >({
      query: (categoryId) => ({
        url: "product/by-category-id",
        method: "GET",
        params: {
          categoryId,
        },
      }),

      providesTags: ["Product"],
    }),

    // GET /api/product/by-name?productName=...
    // Payload -> ProductDto
    getProductByName: build.query<
      ServiceResponse<Product>,
      string
    >({
      query: (productName) => ({
        url: "product/by-name",
        method: "GET",
        params: {
          productName,
        },
      }),

      providesTags: ["Product"],
    }),

    // GET /api/product/by-price-range?min=...&max=...
    // Payload -> List<ProductDto>
    getProductsByPriceRange: build.query<
      ServiceResponse<Product[]>,
      { min: number; max: number }
    >({
      query: ({ min, max }) => ({
        url: "product/by-price-range",
        method: "GET",
        params: {
          min,
          max,
        },
      }),

      providesTags: ["Product"],
    }),

    // GET /api/product/with-highest-rate
    // Payload -> List<ProductDto>
    getProductWithHighestRate: build.query<
      ServiceResponse<Product[]>,
      void
    >({
      query: () => ({
        url: "product/with-highest-rate",
        method: "GET",
      }),

      providesTags: ["Product"],
    }),

    // GET /api/product/with-highest-months-per-sold
    // Payload -> List<ProductDto>
    getProductWithHighestSoldPerMonth: build.query<
      ServiceResponse<Product[]>,
      void
    >({
      query: () => ({
        url: "product/with-highest-months-per-sold",
        method: "GET",
      }),

      providesTags: ["Product"],
    }),

    // POST /api/product
    // Payload -> ProductDto
    // POST /api/product
    // Payload -> ProductDto
    createProduct: build.mutation<
      ServiceResponse<Product>,
      CreateProductDto
    >({
      query: (product) => {
        const formData = new FormData();

        formData.append("Name", product.name);

        if (product.description) {
          formData.append("Description", product.description);
        }

        formData.append("Price", product.price.toString());
        formData.append("Quantity", product.quantity.toString());
        formData.append("Rate", product.rate.toString());
        formData.append("SoldPerMonth", product.soldPerMonth.toString());
        formData.append("CategoryId", product.categoryId);

        // ДОДАНО: Відсутній BrandId
        if (product.brandId) {
          formData.append("BrandId", product.brandId);
        }

        // ДОДАНО: Необов'язкове поле OldPrice
        if (product.oldPrice !== null && product.oldPrice !== undefined) {
          formData.append("OldPrice", product.oldPrice.toString());
        }

        // ДОДАНО: AmountOfComments
        if (product.amountOfComments !== undefined && product.amountOfComments !== null) {
          formData.append("AmountOfComments", product.amountOfComments.toString());
        }

        if (product.files && product.files.length > 0) {
          product.files.forEach((file) => {
            formData.append("Files", file);
          });
        }

        return {
          url: "product",
          method: "POST",
          body: formData,
        };
      },

      invalidatesTags: ["Product"],
    }),
    // PUT /api/product
    // Payload -> ProductDto
    updateProduct: build.mutation<
      ServiceResponse<Product>,
      UpdateProductDto
    >({
      query: (product) => ({
        url: "product",
        method: "PUT",
        body: product,
      }),

      invalidatesTags: ["Product"],
    }),

    // DELETE /api/product?productId=...
    deleteProduct: build.mutation<
      ServiceResponse<unknown>,
      string
    >({
      query: (productId) => ({
        url: "product",
        method: "DELETE",
        params: {
          productId,
        },
      }),

      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryIdQuery,
  useGetProductByNameQuery,
  useGetProductsByPriceRangeQuery,
  useGetProductWithHighestRateQuery,
  useGetProductWithHighestSoldPerMonthQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;