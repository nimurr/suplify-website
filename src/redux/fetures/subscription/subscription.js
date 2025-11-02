import { apiSlice } from "../../api/apiSlice";

const subscription = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        takeFreeTrial: builder.mutation({
            query: (data) => ({
                url: `/user-subs/free-trial/start`,
                method: "POST",
                body: data,
            }),
        })
    }),
});


export const { useTakeFreeTrialMutation } = subscription;