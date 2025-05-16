import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const aiApi2 = createApi({
  reducerPath: 'aiApi2',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://seriously-moved-husky.ngrok-free.app',
  }),
  tagTypes: ['Ai'],
  endpoints: (builder) => ({
    tryOn: builder.mutation({
      query: (data) => ({
        url: '/try-on',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Ai'],
    }),
    
   
  }),
});

export const { 
useTryOnMutation
} = aiApi2;