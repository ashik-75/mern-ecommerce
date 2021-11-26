import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderStore = createApi({
  reducerPath: "orderStore",
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
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: () => `/api/orders`,
      providesTags: (result, error, args) => {
        if (result?.length > 0) {
          return [
            ...result.map((order) => ({ type: "Order", id: order._id })),
            { type: "Order", id: "LIST" },
          ];
        } else {
          return [{ type: "Order", id: "LIST" }];
        }
      },
    }),
    addOrder: builder.mutation({
      query: (body) => ({
        url: "/api/orders",
        body,
        method: "POST",
      }),
      providesTags: [{ type: "Order", id: "LIST" }],
    }),
    getSingleOrder: builder.query({
      query: (id) => `/api/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    updateOrderByPayment: builder.mutation({
      query: (id) => ({
        url: `/api/orders/${id}/pay`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => {
        return [{ type: "Order", id }];
      },
    }),
    updateOrderByDelivered: builder.mutation({
      query: (id) => ({
        url: `/api/orders/${id}/delivered`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    getOrdersByUser: builder.query({
      query: () => `/api/orders/user`,
      // providesTags: (result, error, args) =>
      //   result?.length > 0
      //     ? [
      //         ...result.map((order) => ({ type: "Order", id: order._id })),
      //         { type: "Order", id: "LIST" },
      //       ]
      //     : [{ type: "Order", id: "LIST" }],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/api/orders/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Order", id }],
    }),
  }),
});

export const {
  useGetAllOrderQuery,
  useAddOrderMutation,
  useGetSingleOrderQuery,
  useUpdateOrderByPaymentMutation,
  useUpdateOrderByDeliveredMutation,
  useGetOrdersByUserQuery,
  useDeleteOrderMutation,
} = orderStore;
