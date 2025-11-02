import { apiSlice } from "@/redux/api/apiSlice";

 


const privacyPolicy = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        privacyPolicy: builder.query({
            query: () => `/information/getPrivacy`, 
            providesTags: [{type: "About"}]
        })
    })
})

export const {usePrivacyPolicyQuery } = privacyPolicy;