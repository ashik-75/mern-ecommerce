import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersStore = createApi({
  reducerPath: "usersStore",
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/api/users",
      providesTags: (result, error, args) => {
        if (result?.length >= 0) {
          return [
            ...result.map((user) => ({ type: "User", id: user._id })),
            { type: "User", id: "LIST" },
          ];
        } else {
          return [{ type: "User", id: "LIST" }];
        }
      },
    }),
    getSingleUser: builder.query({
      query: (id) => `/api/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, args) => [{ type: "User", id: args.id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersStore;
