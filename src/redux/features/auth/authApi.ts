import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../api/baseQuery";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { auth: { token: string } }).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      console.log(token)

      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          passwordConfirm: userData.confirmPassword,
          role: "user",
        },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    updateUser: builder.mutation({
      query: (values) => {
        console.log("updateUser called with:", values);

        const formData = new FormData();

        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('gender', values.gender);


        if (values.avatarFile instanceof File) {
          formData.append('avatarFile', values.avatarFile);
        }

        return {
          url: "/users/updateMe",
          method: "PATCH",
          body: formData,
          formData: true,
        };
      },
    }),
    getMe: builder.query({
      query: () => '/users/getMe',
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetMeQuery, useUpdateUserMutation } = authApi;