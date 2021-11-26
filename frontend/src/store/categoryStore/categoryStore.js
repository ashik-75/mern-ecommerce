import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryStore = createApi({
  reducerPath: "categoryStore",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => `/api/categories`,
      providesTags: (result) => {
        if (result?.length > 0) {
          return [
            ...result.map((category) => ({
              type: "Category",
              id: category._id,
            })),
            { type: "Category", id: "LIST" },
          ];
        } else {
          return [{ type: "Category", id: "LIST" }];
        }
      },
    }),
    addCategory: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: "/api/categories",
          method: "POST",
          body,
        };
      },
      invalidatesTags: () => [{ type: "Category", id: "LIST" }],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/categories/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Category", id }],
    }),
    updateCategories: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/categories/${id}/edit`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Category", id: args.id },
      ],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoriesMutation,
  useDeleteCategoryMutation,
} = categoryStore;
