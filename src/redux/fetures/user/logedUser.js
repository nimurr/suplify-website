

const { apiSlice } = require("@/redux/api/apiSlice");


const logedUser = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        logedUser: builder.query({
            query: () => `/users/logedUser`,
            providesTags: [{type:"Profile"}]
        })

    })
})

export const {useLogedUserQuery} = logedUser