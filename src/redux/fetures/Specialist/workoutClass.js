import { apiSlice } from "../../api/apiSlice";

const workoutClass = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllWorkoutClass: builder.query({
            query: () => ({
                url: "/workout-schedules/paginate",
                method: "GET",
            }),
            providesTags: ["WorkoutClass"],
        }),
        getAllHospots: builder.query({
            query: () => ({
                url: "/hotspot",
                method: "GET",
            }),
            providesTags: ["WorkoutClass"],
        }),
        createWorkoutClass: builder.mutation({
            query: (data) => ({
                url: "/workout-schedules/v2",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["WorkoutClass"],
        }),
        updateWorkoutClass: builder.mutation({
            query: ({ submissionData, id }) => ({
                url: `/workout-schedules/${id}`,
                method: "PUT",
                body: submissionData,
            }),
            invalidatesTags: ["WorkoutClass"],
        }),
        getSingleWorkoutClass: builder.query({
            query: (id) => ({
                url: `/workout-schedules/${id}`,
                method: "GET",
            }),
            providesTags: ["WorkoutClass"],
        }),
    }),
});

export const {
    useGetAllWorkoutClassQuery,
    useGetAllHospotsQuery,
    useCreateWorkoutClassMutation,
    useUpdateWorkoutClassMutation,
    useGetSingleWorkoutClassQuery } = workoutClass;