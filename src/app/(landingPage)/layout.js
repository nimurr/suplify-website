import AppFooter from "@/components/pages/Footer";
import Navbar from "@/components/pages/Navbar";

 

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <AppFooter />
    </>
  );
}