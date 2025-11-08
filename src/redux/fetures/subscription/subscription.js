import { apiSlice } from "../../api/apiSlice";

const subscription = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFullSubscription: builder.query({
            query: (page) => ({
                url: `/notifications/?page=${page}&limit=20`,
                method: "GET",
            }),
        }),
        takeFreeTrial: builder.mutation({
            query: (data) => ({
                url: `/user-subs/free-trial/start`,
                method: "POST",
                body: data,
            }),
        }),
        getAllSubscriptions: builder.query({
            query: () => ({
                url: `/user-subs/paginate`,
                method: "GET",
            }),
        }),
    }),
});


export const { useTakeFreeTrialMutation, useGetFullSubscriptionQuery, useGetAllSubscriptionsQuery } = subscription;