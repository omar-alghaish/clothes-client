import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const aiApi = createApi({
  reducerPath: 'aiApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://lately-humane-swan.ngrok-free.app',
  }),
  tagTypes: ['Ai'],
  endpoints: (builder) => ({
    searchByImg: builder.mutation({
      query: (data) => ({
        url: '/retrieve',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Ai'],
    }),
    
   
  }),
});

export const { 
useSearchByImgMutation
} = aiApi;