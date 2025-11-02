 
 
import DashboardHeader from '@/Dashboard/layout/Header';
import Sidebar from '@/Dashboard/layout/Sidebar';
import { ConfigProvider } from 'antd';
import "./../globals.css";

export default function DashboardLayout({ children }) {
  return (
    <ConfigProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden ">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto md:p-4">
            {children}
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
}