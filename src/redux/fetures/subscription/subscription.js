import { apiSlice } from "../../api/apiSlice";

const subscription = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFullSubscription: builder.query({
            query: (page) => ({
                url: `/notifications/?page=${page}&limit=20`,
                method: "GET",
            }),
            invalidatesTags: ["Subscription"],
        }),
        takeFreeTrial: builder.mutation({
            query: (data) => ({
                url: `/user-subs/free-trial/start`,
                method: "POST",
                body: data,
            }),
            providesTags: ["Subscription"],
        }),
        getAllSubscriptions: builder.query({
            query: () => ({
                url: `/user-subs/paginate`,
                method: "GET",
            }),
            invalidatesTags: ["Subscription"],
        }),
        takeSubscription: builder.mutation({
            query: ({ id }) => ({
                url: `/subscription-plans/purchase/${id}`,
                method: "POST"
            }),
            providesTags: ["Subscription"]
        }),
        cancelSub: builder.mutation({
            query: () => ({
                url: `/subscription-plans/cancel`,
                method: "POST"
            }),
            providesTags: ["Subscription"]
        })
    }),
});


export const { useTakeFreeTrialMutation, useGetFullSubscriptionQuery, useGetAllSubscriptionsQuery, useTakeSubscriptionMutation, useCancelSubMutation } = subscription;