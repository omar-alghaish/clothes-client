import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BASE_URL = "https://clothes-server-production.up.railway.app/api/v1";

export interface IAddress {
    _id:string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    country: string;
    city: string;
    state: string;
    streetAddress: string;
    zipCode: string;
}

export interface IPaymentCard {
    _id: string;
    cardHolderName: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
}

export const userApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            // Get the token from your state
            const token = (getState() as any).auth.token;
            // If we have a token, add it to the headers
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Address', 'PaymentCard'],
    endpoints: (builder) => ({
        // Address endpoints
        getAddresses: builder.query({
            query: () => '/addresses',
            providesTags: ['Address'],
        }),
        getAddress: builder.query({
            query: (id) => `/addresses/${id}`,
            providesTags: ['Address'],
        }),
        createAddress: builder.mutation<any, Omit<IAddress, "_id"> >({
            query: (address) => ({
                url: '/addresses',
                method: 'POST',
                body: address,
            }),
            invalidatesTags: ['Address'],
        }),
        updateAddress: builder.mutation<any, { id: string; address: Omit<IAddress, "_id"> }>({
            query: ({ id, address }) => ({
                url: `/addresses/${id}`,
                method: 'PUT',
                body: address,
            }),
            invalidatesTags: ['Address'],
        }),
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `/addresses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Address'],
        }),

        // Payment Card endpoints
        getPaymentCards: builder.query({
            query: () => '/payment-cards',
            providesTags: ['PaymentCard'],
        }),
        getPaymentCard: builder.query({
            query: (id) => `/payment-cards/${id}`,
            providesTags: ['PaymentCard'],
        }),
        createPaymentCard: builder.mutation<any, Omit<IPaymentCard, "_id">>({
            query: (paymentCard) => ({
                url: '/payment-cards',
                method: 'POST',
                body: paymentCard,
            }),
            invalidatesTags: ['PaymentCard'],
        }),
        updatePaymentCard: builder.mutation<any, { id: string; paymentCard: Omit<IPaymentCard, "_id"> }>({
            query: ({ id, paymentCard }) => ({
                url: `/payment-cards/${id}`,
                method: 'PUT',
                body: paymentCard,
            }),
            invalidatesTags: ['PaymentCard'],
        }),
        deletePaymentCard: builder.mutation({
            query: (id) => ({
                url: `/payment-cards/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['PaymentCard'],
        }),
    }),
});

export const {
    useGetAddressesQuery,
    useGetAddressQuery,
    useCreateAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
    useGetPaymentCardsQuery,
    useGetPaymentCardQuery,
    useCreatePaymentCardMutation,
    useUpdatePaymentCardMutation,
    useDeletePaymentCardMutation,
} = userApi;