import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Scheduling from './pages/Scheduling';
import Projects from './pages/Projects';
import Timesheets from './pages/Timesheets';
import LeaveManagement from './pages/Leave';
import Complaints from './pages/Complaints';
import Sidebar from './components/Sidebar';
import EmployeeSidebar from './components/EmployeeSidebar';
import Login from './pages/Login';
import EmployeeScheduling from './pages/EmployeeScheduling';
import EmployeeTimesheet from './pages/EmployeeTimesheet';
import EmployeeLeaveManagement from './pages/MyLeave';
import MyProjects from './pages/MyProjects';
import EmployeeComplaints from './pages/EmployeeComplaints';


const App = () => {
  return (
    <Router>
      <div>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <EmployeeSidebar />
          <div className="flex-1 p-10">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/dashboard/employees" element={<Employees />} />
              <Route path="/dashboard/scheduling" element={<Scheduling />} />
              <Route path="/dashboard/timesheets" element={<Timesheets />} />
              <Route path="/dashboard/leave" element={<LeaveManagement />} />
              <Route path="/dashboard/projects" element={<Projects />} />
              <Route path="/dashboard/complaints" element={<Complaints />} />
              <Route path="/employee-dashboard/schedules" element={<EmployeeScheduling />} />
              <Route path="/employee-dashboard/my-timesheet" element={<EmployeeTimesheet />} />
              <Route path="/employee-dashboard/leave" element={<EmployeeLeaveManagement />} />
              <Route path="/employee-dashboard/my-projects" element={<MyProjects />} />
              <Route path="/employee-dashboard/complaints" element={<EmployeeComplaints />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;