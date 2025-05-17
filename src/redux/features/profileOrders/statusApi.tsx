import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// interface IStatus {
//     status: boolean;
// }

// interface statusResponse {
//     status?: string;
//     data: {
//         data: { status?: IStatus[] }
//     };
//     [key: string]: unknown
// };

export const statusApi = createApi({
    reducerPath: "statusApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://clothes-server-production.up.railway.app/api/v1',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as { auth: { token: string } }).auth?.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["status"],
    endpoints: (builder) => ({
        cancelOrder: builder.mutation({
            query: (orderId) => ({
                url: `/orders/${orderId}/cancel`,
                method: "PATCH",
            })
        }),
        // getOrderStatus: builder.query<statusResponse, void>({
        //     query: (orderId) => ({
        //         url: `/orders/${orderId}/active`,
        //         method: "GET",
        //     }),
        //     providesTags: ["status"]
        // }),
    })
})

export const {
    useCancelOrderMutation,

} = statusApi;