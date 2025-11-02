import { apiSlice } from "../../api/apiSlice";

const order = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (userId) => ({
                url: `/orders/paginate?userId=${userId}`,
                method: 'GET',
            }),
            providesTags: ['Order']
        })
    }),
});


export const { useGetAllOrdersQuery } = order
