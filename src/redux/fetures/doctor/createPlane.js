import { apiSlice } from "../../api/apiSlice";

const createPlane = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPlane: builder.mutation({
            query: (data) => ({
                url: "/doctor-plans",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["DoctorCreatePlane"],
        }),
        updatePlane: builder.mutation({
            query: ({ submissionData, id }) => ({
                url: `/doctor-plans/update/${id}`,
                method: "PUT",
                body: submissionData,
            }),
            invalidatesTags: ["DoctorCreatePlane"],
        }),
        getAllPlanes: builder.query({
            query: (planType) => ({
                url: `/doctor-plans/paginate?planType=${planType || "mealPlan"}`,
                method: "GET",
            }),
            providesTags: ["DoctorCreatePlane"],
        }),
        getSinglePlane: builder.query({
            query: (id) => ({
                url: `/doctor-plans/paginate?_id=${id}`,
                method: "GET",
            }),
            providesTags: ["DoctorCreatePlane"],
        }),
        createPlanByDoc: builder.mutation({
            query: (data) => ({
                url: "/plan-by-doc",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["DoctorCreatePlane"],
        })
    }),
});

export const { useCreatePlaneMutation, useUpdatePlaneMutation, useGetAllPlanesQuery, useGetSinglePlaneQuery , useCreatePlanByDocMutation } = createPlane;