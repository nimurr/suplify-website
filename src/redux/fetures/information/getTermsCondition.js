import { apiSlice } from "@/redux/api/apiSlice";

 


const termsCondition = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        termsCondition: builder.query({
            query: () => `/information/getTermsCondition`, 
            providesTags: [{type: "About"}]
        })
    })
})

export const {useTermsConditionQuery } = termsCondition;