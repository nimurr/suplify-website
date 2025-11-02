const { apiSlice } = require("@/redux/api/apiSlice");


const getUsers = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => `/users/getAllUsers`,
            providesTags: [{ type: "Profile" }]
        }),
        getUserProfile: builder.query({
            query: (id) => `/users/profile/${id}`,
            providesTags: [{ type: "Profile" }]
        })
    })
})

export const { useGetUsersQuery, useGetUserProfileQuery } = getUsers