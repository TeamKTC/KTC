import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Comment,
  CreateCommentDto,
  UpdateCommentDto,
  ServiceResponse,
} from "../../types/types";

const apiUrl = "https://localhost:7120/api/";

export const commentApi = createApi({
  reducerPath: "commentApi",

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

  tagTypes: ["Comment"],

  endpoints: (build) => ({
    // GET /api/comment
    getAllComments: build.query<ServiceResponse<Comment[]>, void>({
      query: () => ({
        url: "comment",
        method: "GET",
      }),
      providesTags: ["Comment"],
    }),

    // GET /api/comment/by-id?commentId=...
    getCommentById: build.query<ServiceResponse<Comment>, string>({
      query: (commentId) => ({
        url: "comment/by-id",
        method: "GET",
        params: { commentId },
      }),
      providesTags: ["Comment"],
    }),

    // GET /api/comment/by-product-id?productId=...
    getCommentsByProductId: build.query<ServiceResponse<Comment[]>, string>({
      query: (productId) => ({
        url: "comment/by-product-id",
        method: "GET",
        params: { productId },
      }),
      providesTags: ["Comment"],
    }),

    // GET /api/comment/by-user-id?userId=...
    getCommentsByUserId: build.query<ServiceResponse<Comment[]>, string>({
      query: (userId) => ({
        url: "comment/by-user-id",
        method: "GET",
        params: { userId },
      }),
      providesTags: ["Comment"],
    }),

    // GET /api/comment/replies?commentId=...
    getRepliesByCommentId: build.query<ServiceResponse<Comment[]>, string>({
      query: (commentId) => ({
        url: "comment/replies",
        method: "GET",
        params: { commentId },
      }),
      providesTags: ["Comment"],
    }),

    // POST /api/comment
    createComment: build.mutation<ServiceResponse<Comment>, CreateCommentDto>({
      query: (commentDto) => ({
        url: "comment",
        method: "POST",
        body: commentDto,
      }),
      invalidatesTags: ["Comment"],
    }),

    // PUT /api/comment
    updateComment: build.mutation<ServiceResponse<Comment>, UpdateCommentDto>({
      query: (commentDto) => ({
        url: "comment",
        method: "PUT",
        body: commentDto,
      }),
      invalidatesTags: ["Comment"],
    }),

    // DELETE /api/comment?commentId=...
    deleteComment: build.mutation<ServiceResponse<unknown>, string>({
      query: (commentId) => ({
        url: "comment",
        method: "DELETE",
        params: { commentId },
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetAllCommentsQuery,
  useGetCommentByIdQuery,
  useGetCommentsByProductIdQuery,
  useGetCommentsByUserIdQuery,
  useGetRepliesByCommentIdQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;