import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { MdMenu } from "react-icons/md";
import { useState } from "react";

export default function InternLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">

      
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      
      <div className="flex-1 flex flex-col">

        
        <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow">
          <button onClick={() => setSidebarOpen(true)}>
            <MdMenu size={26} />
          </button>
          <h1 className="font-semibold">Intern Panel</h1>
        </div>

        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
