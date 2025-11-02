"use client"
import React from 'react';
import { Table, Card, Descriptions, Badge } from 'antd';

const Page = () => {
    const columns = [
        {
            title: '#Product id',
            dataIndex: 'productId',
            key: 'productId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },
    ];

    const data = [
        {
            key: '1',
            productId: '#123',
            name: 'Supplement',
            unitPrice: '$15',
            quantity: 5,
            totalAmount: '$100',
        },
        {
            key: '2',
            productId: '#123',
            name: 'Supplement',
            unitPrice: '$15',
            quantity: 5,
            totalAmount: '$100',
        },
        {
            key: '3',
            productId: '#123',
            name: 'Supplement',
            unitPrice: '$15',
            quantity: 5,
            totalAmount: '$100',
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card style={{ marginBottom: '24px' }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    bordered
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
            </Card>

            <Card>
                <Descriptions className='bg-yellow-100 p-2 rounded' title="Billing Address" layout="vertical">
                    <Descriptions.Item label="Address">New York, Zacksonhight</Descriptions.Item>
                    <Descriptions.Item label="City">Zacksonheight</Descriptions.Item>
                    <Descriptions.Item label="State">South Carolina</Descriptions.Item>
                    <Descriptions.Item label="Zip Code">1234</Descriptions.Item>
                </Descriptions>

                <Descriptions className='bg-red-100 p-2 rounded' title="Order Details" layout="vertical" style={{ marginTop: '24px' }}>
                    <Descriptions.Item label="Order ID">1234</Descriptions.Item>
                    <Descriptions.Item label="User ID">1234</Descriptions.Item>
                    <Descriptions.Item label="Name">Abu Syad</Descriptions.Item>
                    <Descriptions.Item label="Shipping Address">New York, Times square</Descriptions.Item>
                    <Descriptions.Item label="Create Date">12/05/2025</Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <Badge status="processing" text="Processing" />
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export default Page;
