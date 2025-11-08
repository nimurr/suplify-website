"use client";
import { useState, useEffect } from "react";
import { Menu } from "antd";
import { MdFlightClass, MdOutlineHistory, MdOutlineSupportAgent } from "react-icons/md";
import { TbPrescription } from "react-icons/tb";
import { GrUserManager } from "react-icons/gr";
import { GiSwipeCard } from "react-icons/gi";
import { SlUserFollowing } from "react-icons/sl";
import { FaSackDollar, FaUserDoctor } from "react-icons/fa6";
import { FaCalendarAlt, FaRegClock, FaSkating } from "react-icons/fa";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { AiFillEdit } from "react-icons/ai";
import { LuCircleDollarSign, LuShoppingCart } from "react-icons/lu";
import { TiMessageTyping } from "react-icons/ti";
import { RiExchangeDollarLine, RiVideoDownloadLine } from "react-icons/ri";


import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiCreditCard1, CiDollar } from "react-icons/ci";
import { IoBookmarksOutline } from "react-icons/io5";
import getUser from "@/utils/user";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setCollapsed(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCollapsed = () => setCollapsed(!collapsed);


  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getUser();  // Call the function here 
    setUser(currentUser);
  }, []);

  const userRole = user?.role;

  const routesByRole = {
    patient: [
      {
        key: "/dashboard/doctor",
        icon: <FaUserDoctor />,
        label: "Doctors",
        path: "/dashboard/doctor",
      },
      {
        key: "/dashboard/order",
        icon: <LuShoppingCart />,
        label: "Order",
        path: "/dashboard/order",
      },
      {
        key: "/dashboard/specialist",
        icon: <SlUserFollowing />,
        label: "Spesialist",
        path: "/dashboard/specialist",
      },
      {
        key: "/dashboard/workout-class",
        icon: <MdFlightClass />,
        label: "Workout Class",
        path: "/dashboard/workout-class",
      },
      {
        key: "/dashboard/protocol",
        icon: <TbPrescription />,
        label: "Protocol",
        path: "/dashboard/protocol",
      },
      {
        key: "/dashboard/suggest-specialist",
        icon: <GrUserManager />,
        label: "Specialist Suggestion",
        path: "/dashboard/suggest-specialist",
      },
      {
        key: "/dashboard/subscription",
        icon: <GiSwipeCard />,
        label: "Subscription",
        path: "/dashboard/subscription",
      },
      // {
      //   key: "/chat",
      //   icon: <TiMessageTyping />,
      //   label: "Message",
      //   path: "/chat",
      // },
      // {
      //   key: "/dashboard/message",
      //   icon: <TiMessageTyping />,
      //   label: "Message",
      //   path: "/dashboard/message",
      // },
    ],
    specialist: [
      {
        key: "/specialistDs/members",
        icon: <SlUserFollowing />,
        label: "Members",
        path: "/specialistDs/members",
      },
      {
        key: "/specialistDs/program",
        icon: <FaSkating />,
        label: "Program",
        path: "/specialistDs/program",
      },
      {
        key: "/specialistDs/workoutClass",
        icon: <MdFlightClass />,
        label: "Workout Class",
        path: "/specialistDs/workoutClass",
      },
      {
        key: "/specialistDs/appointment-history",
        icon: <MdOutlineHistory />,
        label: "Booked Training Program",
        path: "/specialistDs/appointment-history",
      },
      {
        key: "/specialistDs/booked-workout-class",
        icon: <IoBookmarksOutline />,
        label: "Booked Workout Class",
        path: "/specialistDs/booked-workout-class",
      },
      {
        key: "/specialistDs/earning/all",
        icon: <FaSackDollar />,
        label: "Earning",
        path: "/specialistDs/earning/all",
      },
      {
        key: "/specialistDs/earning",
        icon: <CiCreditCard1 />,
        label: "Wallet",
        path: "/specialistDs/earning",
      },
      {
        key: "/specialistDs/transaction-history",
        icon: <RiExchangeDollarLine />,
        label: "Transaction History",
        path: "/specialistDs/transaction-history",
      },
      {
        key: "/specialistDs/information-video",
        icon: <RiVideoDownloadLine />,
        label: "Information Video",
        path: "/specialistDs/information-video",
      },
      // {
      //   key: "/specialistDs/support",
      //   icon: <MdOutlineSupportAgent />,
      //   label: "Support",
      //   path: "/specialistDs/support",
      // },

    ],
    doctor: [
      {
        key: "/doctorDs/upcoming-schedule",
        icon: <FaRegClock />,
        label: "Upcoming Schedule",
        path: "/doctorDs/upcoming-schedule",
      },
      {
        key: "/doctorDs/appointment-history",
        icon: <FaRegClock />,
        label: "Appointment History ",
        path: "/doctorDs/appointment-history",
      },
      {
        key: "/doctorDs/earning",
        icon: <LuCircleDollarSign className="!text-xl" />,
        label: "Wallet ",
        path: "/doctorDs/earning",
      },
      {
        key: "/doctorDs/transaction-history",
        icon: <LuCircleDollarSign className="!text-xl" />,
        label: "Transaction History",
        path: "/doctorDs/transaction-history",
      },
      {
        key: "/doctorDs/schedule",
        icon: <FaCalendarAlt />, // Replace with correct icon
        label: "Schedule",
        path: "/doctorDs/schedule",
      },
      {
        key: "/doctorDs/doctor-protocol",
        icon: <TbPrescription />,
        label: "Protocol",
        path: "/doctorDs/doctor-protocol",
      },
      {
        key: "/doctorDs/create-plan",
        icon: <AiFillEdit />, // Replace with correct icon
        label: "Create Plan",
        path: "/doctorDs/create-plan",
      },
      // {
      //   key: "/doctorDs/doctor-earning",
      //   icon: <GiSwipeCard />, // Replace with correct icon
      //   label: "Earning",
      //   path: "/doctorDs/doctor-earning",
      // },
      {
        key: "/doctorDs/all",
        icon: <FaSackDollar />,
        label: "Earning",
        path: "/doctorDs/all",
      },
    ],
  };

  const menuItems = routesByRole[userRole] || [];

  // Find active menu key by matching pathname prefix for nested routes
  const activeMenuKey =
    menuItems.find((item) => pathname.startsWith(item.key))?.key || "";

  return (
    <div
      className={`${collapsed ? "w-20" : "w-52"
        } transition-all duration-300 h-full shadow-md`}
    >
      <div className="flex justify-between items-center p-4">
        <div
          className={`text-xl flex font-bold text-center ${collapsed ? "hidden" : "block"
            }`}
        >
          <Link href="/" className="flex items-center">
            <img
              src="/images/logod.png"
              alt="App Logo"
              className="w-12 rounded-full"
            />
          </Link>
          {/* <img src="/images/logod1.png" alt="App Logo" className="w-20" /> */}
        </div>
        <button
          onClick={toggleCollapsed}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>
      <Menu
        mode={collapsed ? "vertical" : "inline"}
        selectedKeys={[activeMenuKey]}
        inlineCollapsed={collapsed}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link href={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}
