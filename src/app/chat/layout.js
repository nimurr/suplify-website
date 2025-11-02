import MessageSidebar from '@/components/messages/MessageSidebar';
import { ConfigProvider } from 'antd';


export default function ChatLayout({ children }) {
  return (
    <ConfigProvider>
      <div className="flex h-screen">
        <div className='max-w-[350px] max-h-[100vh] overflow-y-auto border-r-2 w-full bg-slate-50'>
          <MessageSidebar />
        </div>
        <div className='w-full bg-slate-50'>
          {/* header  */}
          <div className='w-full border-b-2 flex items-center gap-5 p-5'>
            <img className='w-12' src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
            <h2>Nimur Rahman Nerob</h2>
          </div>
          {children}
        </div>
      </div>
    </ConfigProvider>
  );
}