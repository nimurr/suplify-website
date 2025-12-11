// 'use client';
import DashboardHeader from '@/Dashboard/layout/Header';
import Sidebar from '@/Dashboard/layout/Sidebar';
import { ConfigProvider } from 'antd';
import "./../globals.css";
import { Suspense } from 'react';


export const metadata = {
  title: "Suplify Website | Dashboard",
  description: "suplify-fitness",
};

export default function DashboardLayout({ children }) {

  return (
    <ConfigProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden ">
            <DashboardHeader />
            <main className="flex-1 overflow-y-auto md:p-4">
              {children}
            </main>
          </div>
        </div>
      </Suspense>
    </ConfigProvider>
  );
}