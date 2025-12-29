import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/adminSidebar";
import { MdMenu } from "react-icons/md";
import { useState } from "react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">

      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">

        <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow">
          <button onClick={() => setSidebarOpen(true)}>
            <MdMenu size={26} />
          </button>
          <h1 className="font-semibold">Admin Panel</h1>
        </div>

        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
