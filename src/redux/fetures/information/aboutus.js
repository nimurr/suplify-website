import { apiSlice } from "@/redux/api/apiSlice";

 


const abouteUs = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        abouteUs: builder.query({
            query: () => `/information/getAbout`, 
            providesTags: [{type: "About"}]
        })
    })
})

export const {useAbouteUsQuery } = abouteUs;