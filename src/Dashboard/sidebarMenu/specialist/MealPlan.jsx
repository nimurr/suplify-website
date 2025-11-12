"use client";

import BackHeader from "@/components/customComponent/BackHeader";
import { useAddSpecialistKeyPointMutation, useGetAllMealSuggestionQuery, useRemoveKeyPointMutation } from "@/redux/fetures/Specialist/specialist";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiPlus } from "react-icons/fi";

// Sample key points for selection
const keyPointOptions = [
  "Should have diet",
  "should not eat on the breakfast",
  // Add more key points here if needed
];

export default function MealPlan() {
  const [rows, setRows] = useState([]); // To store the existing fetched suggestions
  const [newSuggestions, setNewSuggestions] = useState([]); // To store new suggestions added by the user
  const [planByDoctorId, setPatientId] = useState(null);

  // New data for adding new suggestions
  const [newData, setNewData] = useState({
    keyPoint: "",
    solutionName: "",
    suggestLink: "",
  });

  // Always call hooks at the top level, and never inside conditionals
  const [createSpecialistKeyPoint] = useAddSpecialistKeyPointMutation();
  const [removeItem] = useRemoveKeyPointMutation();

  // Get patientId and protocolId from URL, only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setPatientId(searchParams.get("planByDoctorId"));
    }
  }, []); // This runs only once, after the component mounts on the client side

  const { data, isLoading, refetch } = useGetAllMealSuggestionQuery({ protocolId: planByDoctorId });
  const fullMealPlanData = data?.data?.attributes[0] || [];
  console.log(fullMealPlanData);

  useEffect(() => {
    if (fullMealPlanData?.specialistSuggestions) {
      // Setting rows with specialist suggestions fetched from the server
      const formattedRows = fullMealPlanData.specialistSuggestions.map((suggestion, index) => ({
        id: index + 1,
        deleteId: suggestion ? suggestion?._id : null,
        keyPoint: suggestion?.suggestionDetails?.keyPoint || "",
        solutionName: suggestion?.suggestionDetails?.solutionName || "",
        suggestLink: suggestion?.suggestionDetails?.suggestFromStore || "",
        editable: false, // Initially, these are not editable
      }));
      setRows(formattedRows);
    }
  }, [fullMealPlanData?.specialistSuggestions]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading...</p>
      </div>
    );
  }

  // Handle adding a new row to the newSuggestions state
  const addNewRow = () => {
    setNewSuggestions([
      ...newSuggestions,
      { keyPoint: "", solutionName: "", suggestLink: "" }, // New empty row
    ]);
  };

  // Handle input change for new suggestion rows
  const handleNewInputChange = (index, field, value) => {
    const updatedNewSuggestions = [...newSuggestions];
    updatedNewSuggestions[index][field] = value;
    setNewSuggestions(updatedNewSuggestions);
  };

  // Handle deleting a new suggestion row
  const handleDeleteNewRow = (index) => {
    const updatedNewSuggestions = newSuggestions.filter((_, i) => i !== index);
    setNewSuggestions(updatedNewSuggestions);
  };

  // Handle saving changes to merge the new data with the existing data
  const handleSaveChanges = async () => {
    try {
      // Prepare the new suggestion data
      const formattedNewData = newSuggestions.map((row) => ({
        keyPoint: row.keyPoint,
        solutionName: row.solutionName,
        suggestFromStore: row.suggestLink,
      }));

      // Combine the existing rows with the new rows
      const allSuggestions = [
        ...formattedNewData,
      ];


      // Call API to save data
      const res = await createSpecialistKeyPoint({
        body: allSuggestions,
        planByDoctorId,
      });

      console.log("API Response:", res);
      if (res?.data?.code === 200) {
        // alert("Data saved successfully!");
        toast.success("New Suggestions Added Successfully");
        setNewSuggestions([]);
      }


    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error(error?.data?.message || "Failed to save changes.");
    }
  };



  const handleDeleteOldKeyPoints = async (item) => {
    const id = item?.deleteId;
    try {
      const res = await removeItem({ id }).unwrap();
      console.log(res);
      if (res?.code == 200) {
        toast.success(res?.message);
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg border border-gray-200 p-8">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <BackHeader title={"View full"} />
      <div className="flex items-center justify-between gap-5 flex-wrap">
        <h2 className="text-2xl font-semibold">{fullMealPlanData?.title}</h2>
        <h1 className="text-base font-semibold capitalize border mt-1  w-auto inline-block bg-blue-100 border-blue-200 rounded-full py-1.5 px-5  mb-10">
          {fullMealPlanData?.planType}
        </h1>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">Key Points</h2>
        <ul className="list-disc list-inside text-gray-700">
          {fullMealPlanData?.keyPoints?.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="font-semibold mb-2">Description</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {fullMealPlanData?.description || "No description available."}
        </p>
      </div>

      {/* Existing Specialist Suggestions Section */}
      <div className="mb-8">
        <h2 className="font-semibold mb-2">Specialist Suggestions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">SL No</th>
                <th className="border px-4 py-2">Key Point</th>
                <th className="border px-4 py-2">Solution Name</th>
                <th className="border px-4 py-2">Suggest From Store</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr className="items-start" key={index}>
                  <td className="border px-4 py-2">{row.id}</td>
                  <td className="border px-4 py-2">{row.keyPoint}</td>
                  <td className="border px-4 py-2">{row.solutionName}</td>
                  <td className="border px-4 py-2">{row.suggestLink}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleDeleteOldKeyPoints(row)} className="text-red-500 duration-300 hover:font-medium cursor-pointer" >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Specialist Suggestions Section */}
      <div className="mb-8">
        <h2 className="font-semibold mb-2">New Specialist Suggestions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">SL No</th>
                <th className="border px-4 py-2">Key Point</th>
                <th className="border px-4 py-2">Solution Name</th>
                <th className="border px-4 py-2">Suggest From Store</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {newSuggestions.map((row, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <textarea
                      type="text"
                      placeholder="Enter key point"
                      className="w-full border border-gray-200 focus:outline-none px-2 py-1 focus:ring-1 focus:ring-blue-500 rounded-md"
                      value={row.keyPoint}
                      rows={4}
                      onChange={(e) => handleNewInputChange(index, "keyPoint", e.target.value)}
                    > </textarea>
                  </td>
                  <td className="border px-4 py-2">
                    <textarea
                      type="text"
                      placeholder="Enter solution name"
                      className="w-full border border-gray-200 focus:outline-none px-2 py-1 focus:ring-1 focus:ring-blue-500 rounded-md"
                      value={row.solutionName}
                      rows={4}
                      onChange={(e) => handleNewInputChange(index, "solutionName", e.target.value)}
                    >
                    </textarea>
                  </td>
                  <td className="border px-4 py-2">
                    <textarea
                      type="text"
                      placeholder="Paste link here"
                      className="w-full border border-gray-200 focus:outline-none px-2 py-1 focus:ring-1 focus:ring-blue-500 rounded-md"
                      value={row.suggestLink}
                      rows={4}
                      onChange={(e) => handleNewInputChange(index, "suggestLink", e.target.value)}
                    >
                    </textarea>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteNewRow(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={addNewRow}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-200 text-black px-4 py-2 rounded"
        >
          <FiPlus /> Add New Suggestion
        </button>
      </div>

      <button
        onClick={handleSaveChanges}
        className="mt-4 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
