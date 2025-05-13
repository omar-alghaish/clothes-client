import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


interface PaymentData {

    cardHolderName: string;
    cardNumber: string;
    createdAt: string;
    cvv: string;
    expirationDate: string;
    updatedAt: string;
    user: string
    __v: string;
    _id: string;
}


//response structures
interface PaymentResponse {
    status?: string;
    data: {
        data: { paymentCards?: PaymentData[] }
    };
    [key: string]: unknown
};



export const paymentApi = createApi({
    reducerPath: "paymentApi",
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
    tagTypes: ["payment"],
    endpoints: (builder) => ({
        getPayment: builder.query<PaymentResponse, void>({
            query: () => "/payment-cards",
            providesTags: ["payment"],
        }),
        addPayment: builder.mutation({
            query: (body) => ({
                url: "/payment-cards",
                method: "POST",
                body,
            }),
            invalidatesTags: ["payment"],
        }),
        deletePayment: builder.mutation({
            query: (paymentId) => ({
                url: `/payment-cards/${paymentId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["payment"],
        }),
    }),
})

export const {
    useAddPaymentMutation,
    useGetPaymentQuery,
    useDeletePaymentMutation
} = paymentApi;