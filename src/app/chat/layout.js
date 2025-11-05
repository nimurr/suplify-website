import MessageHeader from '@/components/messages/MessageHeader';
import MessageSidebar from '@/components/messages/MessageSidebar';
import WrapMsgSocket from '@/components/messages/WrapMsgSocket';
import { ConfigProvider } from 'antd';


export default function ChatLayout({ children }) {
  return (
    <ConfigProvider>
      <WrapMsgSocket>
        <div className="flex h-screen">
          <div className='max-w-[350px] max-h-[100vh] overflow-y-auto border-r-2 w-full bg-slate-50'>
            <MessageSidebar />
          </div>
          <div className='w-full bg-slate-50'>
            {/* header  */}
            <MessageHeader />
           
            {children}
          </div>
        </div>
      </WrapMsgSocket>
    </ConfigProvider>
  );
}