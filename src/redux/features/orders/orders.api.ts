import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// interface AddOrderRequst {
//     addressId: string,
//     paymentId: string,
//     cartId: string
// }
export const ordersApi = createApi({
    reducerPath: 'ordersApi',
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
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => '/orders',
            providesTags: ['Orders'],
        }),

        getOrderById: builder.query({
            query: (orderId) => `/orders/${orderId}`,
            providesTags: ['Orders'],
        }), 

        addOrder: builder.mutation({
            query: (productData) => ({
                url: '/orders',
                method: 'POST',
                body: productData,
            }),
            invalidatesTags: ['Orders'],
        }),

        cancelOrder: builder.mutation({
            query: (orderId) => ({
                url: `/orders/${orderId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Orders'],
        }),

    }),
});

export const {
    useAddOrderMutation,
    useCancelOrderMutation,
    useGetOrdersQuery,
    useGetOrderByIdQuery,
} = ordersApi;