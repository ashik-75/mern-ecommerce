import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productStore = createApi({
  reducerPath: "productStore",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.authSlice?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/api/products",
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map((prod) => ({ type: "Product", id: prod._id })),
            { type: "Product", id: "LIST" },
          ];
        } else {
          return [{ type: "Product", id: "LIST" }];
        }
      },
    }),
    getSingleProduct: builder.query({
      query: (id) => `/api/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Product", id: args.id },
      ],
    }),
    addProduct: builder.mutation({
      query: (body) => {
        console.log("rtk body: ", body);
        return {
          url: "/api/products",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} = productStore;
