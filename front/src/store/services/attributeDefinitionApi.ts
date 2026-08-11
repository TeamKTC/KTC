import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiUrl = "https://localhost:7120/api/";

import type {
  AttributeDefinition,
  ServiceResponse,
} from "../../types/types";

export const attributeDefinitionApi = createApi({
  reducerPath: "attributeDefinitionApi",

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

  tagTypes: ["AttributeDefinition"],

  endpoints: (build) => ({

    // GET /api/attribute-definition
    // Payload -> List<AttributeDefinitionDto>
    getAllAttributeDefinitions: build.query<
      ServiceResponse<AttributeDefinition[]>,
      void
    >({
      query: () => ({
        url: "attribute-definition",
        method: "GET",
      }),

      providesTags: ["AttributeDefinition"],
    }),

    // GET /api/attribute-definition/by-id?attributeDefinitionId=...
    // Payload -> AttributeDefinitionDto
    getAttributeDefinitionById: build.query<
      ServiceResponse<AttributeDefinition>,
      string
    >({
      query: (attributeDefinitionId) => ({
        url: "attribute-definition/by-id",
        method: "GET",
        params: {
          attributeDefinitionId,
        },
      }),

      providesTags: ["AttributeDefinition"],
    }),

    // GET /api/attribute-definition/by-name?attributeDefinitionName=...
    // Payload -> AttributeDefinitionDto
    getAttributeDefinitionByName: build.query<
      ServiceResponse<AttributeDefinition>,
      string
    >({
      query: (attributeDefinitionName) => ({
        url: "attribute-definition/by-name",
        method: "GET",
        params: {
          attributeDefinitionName,
        },
      }),

      providesTags: ["AttributeDefinition"],
    }),

    // GET /api/attribute-definition/by-product-id?productId=...
    // Payload -> List<AttributeDefinitionDto>
    getAttributeDefinitionsByProductId: build.query<
      ServiceResponse<AttributeDefinition[]>,
      string
    >({
      query: (productId) => ({
        url: "attribute-definition/by-product-id",
        method: "GET",
        params: {
          productId,
        },
      }),

      providesTags: ["AttributeDefinition"],
    }),

    // GET /api/attribute-definition/by-type?attributeType=...
    // Payload -> List<AttributeDefinitionDto>
    getAttributeDefinitionsByType: build.query<
      ServiceResponse<AttributeDefinition[]>,
      string
    >({
      query: (attributeType) => ({
        url: "attribute-definition/by-type",
        method: "GET",
        params: {
          attributeType,
        },
      }),

      providesTags: ["AttributeDefinition"],
    }),
  }),
});

export const {
  useGetAllAttributeDefinitionsQuery,
  useGetAttributeDefinitionByIdQuery,
  useGetAttributeDefinitionByNameQuery,
  useGetAttributeDefinitionsByProductIdQuery,
  useGetAttributeDefinitionsByTypeQuery,
} = attributeDefinitionApi;