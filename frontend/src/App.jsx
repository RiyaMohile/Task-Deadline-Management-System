import { BrowserRouter, Routes, Route } from "react-router-dom";
import InternLayout from "./pages/Intern/internLayout";
import InternDashboard from "./pages/Intern/internDashboard";
import MyTasks from "./pages/Intern/myTasks";
import AdminLayout from "./pages/Admin/adminLayout";
import AdminProjects from "./pages/Admin/adminProjects";
import AdminTaskManager from "./pages/Admin/adminTaskManager";
import TaskCalendar from "./pages/Intern/taskCalendar";
import UserLogin from "./pages/Login/userLogin";
import AdminLogin from "./pages/Login/adminLogin";
import Register from "./pages/Login/register";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminProjects />} />
          <Route path="tasks" element={<AdminTaskManager />} />
        </Route>

        
        <Route path="/intern" element={<InternLayout />}>
          <Route index element={<InternDashboard />} />   
          <Route path="tasks" element={<MyTasks />} />    
          <Route path="calendar" element={<TaskCalendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
