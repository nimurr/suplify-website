'use client'
import { useGetAllHireSpecialistRequestsQuery, useUpdateHireSpeccialistStatusMutation } from '@/redux/fetures/Specialist/HireSpecialistRequest';
import React from 'react';

const Page = () => {
    const page = 1;
    const limit = 10;

    const { data, isLoading, refetch } = useGetAllHireSpecialistRequestsQuery({ page, limit });
    const [updateStatus] = useUpdateHireSpeccialistStatusMutation();

    const totalPages = data?.data?.attributes?.totalPages || 1;
    const totalResults = data?.data?.attributes?.totalResults || 0;
    const results = data?.data?.attributes?.results || [];
    console.log(results)


    if (isLoading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    const handleAccept = async (id) => {

        const data = {
            status: 'approved'
        }

        try {
            const res = await updateStatus({ data, id }).unwrap();
            console.log(res);
            if (res?.code == 200) {
                toast.success(res?.message || 'Status Updated Successfully');
                refetch();
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || 'Something went wrong');
        }
    };

    const handleDecline = async (id) => {

        const data = {
            status: 'rejected'
        }

        try {
            const res = await updateStatus({ data, id }).unwrap();
            console.log(res);
            if (res?.code == 200) {
                toast.success(res?.message || 'Status Updated Successfully');
                refetch();
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || 'Something went wrong');
        }
    }

    return (
        <div className="p-4">
            <div className="overflow-hidden border border-gray-300 rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-red-600 text-white">
                        <tr>
                            <th className="py-3 px-4">Patient</th>
                            <th className="py-3 px-4">Specialist</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                        <tr>
                            <td className="py-2 px-4">John Doe</td>
                            <td className="py-2 px-4">Dr. Smith</td>
                            <td className="py-2 px-4">2026-02-14</td>
                            <td className="py-2 px-4">Confirmed</td>
                            <td className="py-2 px-4 flex items-center justify-center gap-2">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded">Accept</button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded">Decline</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4">Jane Doe</td>
                            <td className="py-2 px-4">Dr. Brown</td>
                            <td className="py-2 px-4">2026-02-15</td>
                            <td className="py-2 px-4">Pending</td>
                            <td className="py-2 px-4 flex items-center justify-center gap-2">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded">Accept</button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded">Decline</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;
