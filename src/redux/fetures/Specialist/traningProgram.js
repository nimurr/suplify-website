import { apiSlice } from "../../api/apiSlice";

const traningProgram = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTrainingProgram: builder.mutation({
            query: (data) => ({
                url: `/training-programs`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["TrainingProgram"],
        }),
        getAllTrainingProgram: builder.query({
            query: (page) => ({
                url: `/training-programs/specialist/paginate?page=${page}`,
                method: "GET",
            }),
            providesTags: ["TrainingProgram"],
        }),
        softDeleteTrainingProgram: builder.mutation({
            query: (id) => ({
                url: `/training-programs/softDelete/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["TrainingProgram"],
        }),
        updateTrainingProgram: builder.mutation({
            query: ({ id, data }) => ({
                url: `/training-programs/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["TrainingProgram"],
        }),
        getTrainingProgramById: builder.query({
            query: (id) => ({
                url: `/training-programs/${id}`,
                method: "GET",
            })
        }),
        deleteTrainingProgram: builder.mutation({
            query: (id) => ({
                url: `/training-programs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["TrainingProgram"],
        }),
        getAllProgramBySpecialistId: builder.query({
            query: ({ programId, specialistId }) => ({
                url: `/training-sessions/paginate?page=1&trainingProgramId=${programId}&specialistId=${specialistId}`,
                method: "GET",
            }),
            providesTags: ["TrainingProgram"],
        }),
        createTrainingSession: builder.mutation({
            query: (data) => ({
                url: `/training-sessions`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["TrainingProgram"],
        })
    }),
})
export const {
    useCreateTrainingProgramMutation,
    useGetAllTrainingProgramQuery,
    useSoftDeleteTrainingProgramMutation,
    useUpdateTrainingProgramMutation,
    useGetTrainingProgramByIdQuery,
    useDeleteTrainingProgramMutation,
    useGetAllProgramBySpecialistIdQuery,
    useCreateTrainingSessionMutation } = traningProgram;
