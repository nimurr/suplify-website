import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({

    // baseUrl: "http://10.0.80.210:3040/v1", 
    baseUrl: "https://newsheakh6731.sobhoy.com/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      // console.log("9 baseApi", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);

        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Gets the user's current time zone (e.g., "Asia/Dhaka")
        // Set the X-Time-Zone header
        headers.set("X-Time-Zone", timeZone);
      }
      return headers;
    },


  }),
  tagTypes: ["Profile", "Property", "Chat", "Coupon", "About", "specialistKeyPoints", "InformationVideo", "TrainingProgram", "DoctorCreatePlane", "DoctorProtocol", "OrderHistory", "Landing", "YourDoctors", "WorkoutClass", "Order", "Earning", "Protocal" , "Subscription"],

  endpoints: () => ({}),
});