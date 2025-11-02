import { apiSlice } from "../../api/apiSlice";

const earning = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEarning: builder.query({
            query: () => ({
                url: "/wallet-transactions/overview",
                method: "GET",
            }),
            providesTags: ["Earning"],
        }),
    }),
});

export const { useGetEarningQuery } = earning;