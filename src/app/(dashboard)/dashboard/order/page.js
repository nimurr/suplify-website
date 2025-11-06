"use client";
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { IoEyeOutline } from "react-icons/io5";
import { useGetAllOrdersQuery } from '@/redux/fetures/patient/order';
import getUser from '@/utils/user';


// Your columns configuration
const columns = [
    {
        title: 'Order ID',
        dataIndex: '_orderId',
        key: '_orderId',
    },
    // {
    //     title: 'Order Type',
    //     dataIndex: 'orderType',
    //     key: 'orderType',
    // },
    {
        title: 'Transaction ID',
        dataIndex: 'transactionId',
        key: 'transactionId',
        render: (text) => <span className='font-semibold'>{text || 'Null'}</span>,
    },
    {
        title: 'Payment Method',
        dataIndex: 'paymentMethod',
        key: 'paymentMethod',
    },
    {
        title: 'Total Amount',
        dataIndex: 'finalAmount',
        key: 'finalAmount',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => (
            <h3
                className={`${record.status === 'Processing' ? "text-[#e88c31]" : "text-[#009914e8]"
                    } px-2 py-1 rounded text-center `}
            >
                {record.status}
            </h3>
        ),
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
            <a href={`/dashboard/order/${record?._orderId}`}>
                <IoEyeOutline className='text-2xl' />
            </a>
        ),
    },
];

const CompositionEvent = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = getUser();  // Call the function here
        console.log("full user here :-", currentUser);
        setUser(currentUser);
    }, []);

    const id = user?.id;


    const { data } = useGetAllOrdersQuery(id);
    const fullData = data?.data?.attributes?.results || [];

    console.log(fullData);

    return (
        <div>
            <Table
                dataSource={fullData}
                columns={columns}
                pagination={false}
                style={{
                    backgroundColor: '#f4f4f4',
                    borderRadius: '8px',
                }}
                // Custom header style via CSS or inline
                components={{
                    header: {
                        cell: (props) => <th {...props} style={{ backgroundColor: '#dc1111', color: 'white' }} />,
                    },
                }}
            />
        </div>
    );
};

export default CompositionEvent;
