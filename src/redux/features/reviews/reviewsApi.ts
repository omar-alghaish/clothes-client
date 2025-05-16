import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
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
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
        getProductReviews: builder.query({
            query: (productId: string) => `/reviews/${productId}`,
            providesTags: ['Reviews'],
        }),

        addReview: builder.mutation({
            query: (productData) => ({
                url: '/reviews',
                method: 'POST',
                body: productData,
            }),
            invalidatesTags: ['Reviews'],
        }),

    }),
});

export const {
    useAddReviewMutation,
    useGetProductReviewsQuery,
} = reviewsApi;