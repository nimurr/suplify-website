'use client';

import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';

interface AntdProviderProps {
  children: ReactNode;
}

export default function AntdProvider({ children }: AntdProviderProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Work Sans, sans-serif',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
