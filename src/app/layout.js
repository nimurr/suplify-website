

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ConfigProvider } from "antd";
import Providers from "@/redux/Providers";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Suplify Website",
  description: "suplify-fitness",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Metadata */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/images/logo.png" sizes="32x32" type="image/png" /> {/* Favicon */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Providers>
          {/* <ProviderTheme> */}

          {children}

          {/* </ProviderTheme> */}
        </Providers>
      </body>
    </html>
  );
}
