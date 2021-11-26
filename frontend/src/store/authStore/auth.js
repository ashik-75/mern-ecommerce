import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const auth = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => {
        return {
          url: "/api/users/login",
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    register: build.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: "/api/users/register",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = auth;
