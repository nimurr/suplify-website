
"use client";
import React, { useEffect, useState } from 'react';
import { Button, Avatar, Dropdown, Modal, Form, Input } from 'antd';
import {
  UserOutlined,
  BellOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  LogoutOutlined,
  BarsOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined
} from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { useGetUserProfileQuery } from '@/redux/fetures/user/getUsers';
import url from '@/redux/api/baseUrl';
import { AiOutlineMessage } from 'react-icons/ai';
import Link from 'next/link';

export default function DashboardHeader({ collapsed }) {
  // State for modals and mobile menu
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modal handlers
  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);



  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Logout handler
  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    // Example: Clear localStorage, cookies, etc.
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  // Password change handler
  const changePassword = (values) => {
    console.log('Changing password with values:', values);
    // Implement your API call to change password here
    // Example: 
    // api.changePassword(values)
    //   .then(() => {
    //     message.success('Password changed successfully!');
    //     closePasswordModal();
    //   })
    //   .catch(err => {
    //     message.error('Failed to change password');
    //     console.error(err);
    //   });

    // For now, just close the modal
    closePasswordModal();
  };

  // User dropdown menu items
  const userMenuItems = [
    {
      key: '1',
      label: 'Profile',
      icon: <UserOutlined />,
      onClick: () => window.location.href = '/profile',
    },
    {
      key: '2',
      label: 'Change Password',
      icon: <SettingOutlined />,
      onClick: openPasswordModal,
    },
    {
      key: '3',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: openLogoutModal,
    },
  ];

  const [userData, setUserData] = useState({})
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")))
  }, [])
  const { data: user } = useGetUserProfileQuery(userData.id)
  const fullUser = user?.data?.attributes;

  const imageUrl = fullUser?.profileImage?.imageUrl.includes("amazonaws.com")
    ? fullUser?.profileImage?.imageUrl
    : url + fullUser?.profileImage?.imageUrl;

  // console.log(fullUser);

  return (
    <div className=''>
      <Header
        className="p-0 h-24 bg-white shadow-md flex items-center justify-between sticky top-0 z-50"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
          padding: '0 20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
        }}
      >
        <div className="flex items-center">
          {/* Mobile menu trigger */}
          <Button
            type="text"
            icon={<BarsOutlined />}
            onClick={toggleMobileMenu}
            className="md:hidden ml-4"
          />



          <h1 className="text-lg font-bold ml-4">Dashboard</h1>
        </div>

        {/* User profile */}
        <div className="mr-6 flex items-center gap-2">
          <Link href="/chat" className='w-10 cursor-pointer h-10 bg-red-600 text-white flex items-center justify-center rounded-lg'>
            <AiOutlineMessage className='text-2xl font-semibold' />
          </Link>
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <div className="flex items-center cursor-pointer border border-gray-200 rounded-lg px-5">
              <Avatar src={imageUrl} className='h-10 w-10' icon={<UserOutlined />} />
              <span className="ml-2 sm:inline capitalize font-semibold">{fullUser?.name}</span>

            </div>
          </Dropdown>
        </div>

      </Header>

      {/* Password Change Modal */}
      <Modal
        open={isPasswordModalOpen}
        onOk={closePasswordModal}
        onCancel={closePasswordModal}
        footer={null}
      >
        <div className="flex flex-col w-[80%] mx-auto">
          <h2 className="text-[28px] text-left font-semibold mb-4">
            Change Password
          </h2>
          <p className="mb-8 text-gray-600">
            Your password must be 8-10 characters long.
          </p>
          <Form
            name="changePassword"
            layout="vertical"
            onFinish={changePassword}
          >
            <Form.Item
              name="oldPassword"
              label="Old Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your old password!",
                },
              ]}
            >
              <Input.Password
                style={{
                  height: "40px",
                  background: "#E6F9EF",
                  border: "1px solid green",
                }}
                placeholder="Old Password"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your new password!",
                },
              ]}
            >
              <Input.Password
                style={{
                  height: "40px",
                  background: "#E6F9EF",
                  border: "1px solid green",
                }}
                placeholder="New Password"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                style={{
                  height: "40px",
                  background: "#E6F9EF",
                  border: "1px solid green",
                }}
                placeholder="Confirm Password"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            {/* <p className="text-red-500 font-medium">{error}</p> */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-10 py-3 !bg-[#69C0BE] !text-black text-[16px] rounded-md"
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        open={isLogoutModalOpen}
        onCancel={closeLogoutModal}
        footer={[
          <Button key="cancel" onClick={closeLogoutModal}>
            Cancel
          </Button>,
          <Button key="logout" type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        ]}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </div>
  );
}