import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://clothes-server-production.up.railway.app/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { auth: { token: string } }).auth.token;
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),
    
    addToCart: builder.mutation({
      query: (productData) => ({
        url: '/cart',
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Cart'],
    }),
    
    removeFromCart: builder.mutation({
      query: (itemId) => ({
        url: `/cart/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    removeCart: builder.mutation({
      query: () => ({
        url: `/cart`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    
    updateCartItem: builder.mutation({
      query: ({ itemId, ...updateData }) => ({
        url: `/cart/${itemId}`,
        method: 'PATCH',
        body: updateData,
      }),
      invalidatesTags: ['Cart'],
    }),
    addPaymentCard: builder.mutation({
      query: (cardData) => ({
        url: '/payment-cards',
        method: 'POST',
        body: cardData,
      }),
      invalidatesTags: ['Cart'],
    }),
    getPaymentCards: builder.query({
      query: (cardData) => ({
        url: '/payment-cards',
        method: 'GET',
        body: cardData,
      }),
      providesTags: ['Cart'],
    }),
  }),
});

export const { 
  useGetCartQuery, 
  useAddToCartMutation, 
  useRemoveFromCartMutation, 
  useUpdateCartItemMutation ,
  useRemoveCartMutation,
  useAddPaymentCardMutation,
  useGetPaymentCardsQuery
} = cartApi;