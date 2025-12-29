import { NavLink } from "react-router-dom";
import { MdDashboard, MdTaskAlt, MdLogout, MdClose } from "react-icons/md";

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {open && (<div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={onClose}/>)}

      <div className={`fixed md:static z-50 w-64 h-screen bg-gray-900 text-white p-5 flex flex-col transform transition-transform duration-300 
            ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button className="md:hidden" onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          <NavLink to="/admin" end onClick={onClose} className={({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded
              ${isActive ? "bg-gray-800 text-blue-400 font-semibold" : "text-gray-300 hover:bg-gray-800" }`}>
            <MdDashboard size={20} />
            Projects
          </NavLink>

          <NavLink to="/admin/tasks" onClick={onClose} className={({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded
              ${ isActive ? "bg-gray-800 text-blue-400 font-semibold" : "text-gray-300 hover:bg-gray-800"}`}>
            <MdTaskAlt size={20} />
            Task Management
          </NavLink>
        </nav>

        <button
          className="flex items-center gap-3 px-4 py-2 mt-auto text-red-400 hover:bg-gray-800 rounded"
          onClick={() => {
            localStorage.removeItem("token");
            window.location = "/";
          }}>
          <MdLogout size={20} />
          Logout
        </button>
      </div>
    </>
  );
}
