import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Address {
    city: string;
    country: string;
    createdAt: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    state: string;
    streetAddress: string;
    updatedAt: string;
    user: string;
    zipCode: string;
    _id: string;
    __v: string;
}


//response structures
interface AddressResponse {
    status?: string;
    data: {
        data: { addresses?: Address[]; }
    };
    [key: string]: unknown
}


export const addressesApi = createApi({
    reducerPath: 'addressApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://clothes-server-production.up.railway.app/api/v1',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as { auth: { token: string } }).auth?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['address'],
    endpoints: (builder) => ({
        getAddress: builder.query<AddressResponse, void>({
            query: () => '/addresses',
            providesTags: ['address'],
        }),

        addAddress: builder.mutation({
            query: (body) => ({
                url: '/addresses',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['address'],
        }),

        updateAddress: builder.mutation({
            query: ({ addressId, body }) => ({
                url: `/addresses/${addressId}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['address'],
        }),

        deleteAddress: builder.mutation({
            query: (addressId) => ({
                url: `/addresses/${addressId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['address']
        })
    }),
});


export const {
    useGetAddressQuery,
    useDeleteAddressMutation,
    useUpdateAddressMutation,
    useAddAddressMutation
} = addressesApi
