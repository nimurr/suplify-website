import { apiSlice } from "../../api/apiSlice";

const doctor = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllschedules: builder.query({
            query: () => ({
                url: `/doctor-appointments/paginate?scheduleStatus=available`,
                method: "GET"
            }),
        }),
        createSchedule: builder.mutation({
            query: (data) => ({
                url: `/doctor-appointments`,
                method: "POST",
                body: data
            }),
        }),
        getUpcommingSchedules: builder.query({
            query: () => ({
                url: `/doctor-appointments/bookings/upcoming`,
                method: "GET"
            }),
        }),

        getAllProtocals: builder.query({
            query: () => ({
                url: `/doctor-patients/paginate/protocol`,
                method: "GET"
            }),
        }),

        getAllProtocalsByPatientId: builder.query({
            query: (id) => ({
                url: `/protocols/paginate?patientId=${id}`,
                method: "GET"
            }),
        }),
        // comment : assign protocol to patient
        assignProtocolToPatient: builder.mutation({
            query: (data) => ({
                url: `/protocols`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["DoctorProtocol"]
        }),
        getSingleProtocol: builder.query({
            query: (id) => ({
                url: `/protocols/paginate?_id=${id}`,
                method: "GET"
            }),
            providesTags: ["DoctorProtocol"]
        }),
        getMyPlans: builder.query({
            query: ({ protocolId, patientId, selectedPlan }) => ({
                url: `/plan-by-doc/paginate?planType=${selectedPlan}&patientId=${patientId}&protocolId=${protocolId}`,
                method: "GET"
            }),
        }),

        createSearchPlan: builder.query({
            query: ({ type, title }) => ({
                url: `/doctor-plans/paginate?planType=${type}&title=${title}`,
                method: "GET",
            })
        }),
        assignProtacoltoPatient: builder.mutation({
            query: ({ doctorPlanId, patientId, protocolId }) => ({
                url: `/doctor-plans/assign-to-patient?doctorPlanId=${doctorPlanId}&patientId=${patientId}&protocolId=${protocolId}`,
                method: "POST",
            })
        }),
        deleteAssignPlan: builder.mutation({
            query: ({ id }) => ({
                url: `/plan-by-doc/softDelete/${id}`,
                method: "PUT",
            })
        }),

        updateProtocol: builder.mutation({
            query: ({ protocolId, data }) => ({
                url: `/protocols/update/${protocolId}`,
                method: "PUT",
                body: data
            }),
            providesTags: ["DoctorProtocol"]
        }),
        searchPlane: builder.query({
            query: ({ type, title }) => ({
                url: `/doctor-plans/paginate?planType=${type}&title=${title}`,
                method: "GET"
            }),
        }),
        createPlane: builder.mutation({
            query: (data) => ({
                url: `/plan-by-doc`,
                method: "POST",
                body: data
            }),
        }),

        // comment : assign specialist to patient
        assignSpecialistPatient: builder.mutation({
            query: (data) => ({
                url: `/specialist-patients`,
                method: "POST",
                body: data
            }),
        }),
        getAllSpacialist: builder.query({
            query: (id) => ({
                url: `/specialist-patients/specialist/${id}`,
                method: "GET"
            }),
        }),
        // Earning and withdrawal all info 
        getAllOrderHistory: builder.query({
            query: () => ({
                url: `/doctor-appointments/bookings/paginate`,
                method: "GET"
            }),
            providesTags: ["OrderHistory"]
        }),
        getBankInfo: builder.query({
            query: () => ({
                url: `/bank-info/paginate`,
                method: "GET"
            }),
            providesTags: ["OrderHistory"]
        }),
        addBankInfo: builder.mutation({
            query: (data) => ({
                url: `/bank-info/create-or-update`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["OrderHistory"]
        }),
        withDrawRequest: builder.mutation({
            query: (data) => ({
                url: `/withdrawal-requst`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["OrderHistory"]
        }),
        withDrawRequestTnxHistory: builder.query({
            query: () => ({
                url: `/withdrawal-requst/paginate`,
                method: "GET"
            }),
            providesTags: ["OrderHistory"]
        }),

        // all book history for Spacialist
        getAllBookTraningProgram: builder.query({
            query: () => ({
                url: `/training-programs/purchase/paginate`,
                method: "GET"
            }),
            providesTags: ["OrderHistory"]
        }),
        getAllBookedWorkoutClass: builder.query({
            query: () => ({
                url: `/workout-schedules/bookings/paginate`,
                method: "GET"
            }),
            providesTags: ["OrderHistory"]
        }),
        getAllTrasecitonHistory: builder.query({
            query: () => ({
                url: `/wallet-transactions/paginate`,
                method: "GET"
            }),
            providesTags: ["OrderHistory"]
        }),

    }),
});
export const {
    useGetAllschedulesQuery,
    useCreateScheduleMutation,
    useGetUpcommingSchedulesQuery,
    useGetAllProtocalsQuery,
    useGetAllProtocalsByPatientIdQuery,
    useAssignProtocolToPatientMutation,

    useGetSingleProtocolQuery,
    useGetMyPlansQuery,

    useCreateSearchPlanQuery,

    useAssignProtacoltoPatientMutation,
    useDeleteAssignPlanMutation,

    useUpdateProtocolMutation,
    useSearchPlaneQuery,
    useCreatePlaneMutation,
    useAssignSpecialistPatientMutation,
    useGetAllSpacialistQuery,

    useGetAllOrderHistoryQuery,
    useGetBankInfoQuery,
    useAddBankInfoMutation,
    useWithDrawRequestMutation,
    useWithDrawRequestTnxHistoryQuery,

    // all book history for Spacialist
    useGetAllBookTraningProgramQuery,
    useGetAllBookedWorkoutClassQuery,
    useGetAllTrasecitonHistoryQuery



} = doctor;