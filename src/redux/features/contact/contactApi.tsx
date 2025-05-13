
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
    reducerPath: 'contactApi',
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
    tagTypes: ['contact'],
    endpoints: (builder) => ({
        contactUs: builder.mutation({
            query: (body) => ({
                url: '/complaints',
                method: 'POST',
                body
            }),
            invalidatesTags: ['contact']
        })
    })
})



export const { useContactUsMutation } = contactApi