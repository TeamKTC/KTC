import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CreditCardDto,
  CreateCreditCardDto, // Додай цей тип у свої types.ts
  ServiceResponse,
} from "../../types/types";

const apiUrl = "https://localhost:7120/api/";

export const creditCardApi = createApi({
  reducerPath: "creditCardApi",

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

  tagTypes: ["CreditCard"],

  endpoints: (build) => ({

    // GET /api/credit-card
    getAllCreditCards: build.query<
      ServiceResponse<CreditCardDto[]>,
      void
    >({
      query: () => ({
        url: "credit-card",
        method: "GET",
      }),
      providesTags: ["CreditCard"],
    }),

    // GET /api/credit-card/by-id?id=...
    getCreditCardById: build.query<
      ServiceResponse<CreditCardDto>,
      string
    >({
      query: (id) => ({
        url: "credit-card/by-id",
        method: "GET",
        params: { id },
      }),
      providesTags: ["CreditCard"],
    }),

    // GET /api/credit-card/by-user-id?userId=...
    getCreditCardsByUserId: build.query<
      ServiceResponse<CreditCardDto[]>,
      string
    >({
      query: (userId) => ({
        url: "credit-card/by-user-id",
        method: "GET",
        params: { userId },
      }),
      providesTags: ["CreditCard"],
    }),

    // POST /api/credit-card
    createCreditCard: build.mutation<
      ServiceResponse<CreditCardDto>,
      CreateCreditCardDto
    >({
      query: (body) => ({
        url: "credit-card",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CreditCard"],
    }),

    // DELETE /api/credit-card?id=...
    deleteCreditCard: build.mutation<
      ServiceResponse<boolean>, // або void / string залежно від повернення з БД
      string
    >({
      query: (id) => ({
        url: "credit-card",
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["CreditCard"],
    }),

  }),
});

export const {
  useGetAllCreditCardsQuery,
  useGetCreditCardByIdQuery,
  useGetCreditCardsByUserIdQuery,
  useCreateCreditCardMutation,
  useDeleteCreditCardMutation,
} = creditCardApi;