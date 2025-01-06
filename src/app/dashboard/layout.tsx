import { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import MobileSidebar from "./_components/AdminMobileSidebar";



function DashboardLayout({children}:{children:ReactNode}) {
  return (
    <div className="flex   bg-gray-50 dark:bg-gray-900">
      <Sidebar/>
    
      {children}
    </div>
  );
}

export default DashboardLayout;