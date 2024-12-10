import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [employeesCount, setEmployeesCount] = useState(0);
  const [projectsLength, setProjectsLength] = useState(0);
  const [leaveRequests, setLeaveRequests] = useState(0)
  const [complaintsCount, setComplaintsCount] = useState(0)


  useEffect(() => {
    const fetchLeaveRequests = async () => {
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('user')
        }
      })
      const data = await response.json()

      setComplaintsCount(data.filter(leave => leave.status === 'Open').length)

    }
    fetchLeaveRequests()
  }, [])
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      const response = await fetch('http://localhost:5000/api/leaves', {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('user')
        }
      })
      const data = await response.json()

      setLeaveRequests(data.filter(leave => leave.status === 'Pending').length)

    }
    fetchLeaveRequests()
  }, [])


  useEffect(() => {
    const fetchEmployees = async () => {
      const resp = await fetch('http://localhost:5000/api/get-employees', {
        headers: {
          'auth-token': localStorage.getItem('user'),
        },
      })

      const data = await resp.json()
      if (!resp.ok) {
        console.error(data)
        return
      }
      setEmployeesCount(data.length)
    }

    fetchEmployees()
  }, [])

  useEffect(() => {
    const fetchProjects = async () => {
      const resp = await fetch('http://localhost:5000/api/projects', {
        headers: {
          'auth-token': localStorage.getItem('user'),
        },
      })

      const data = await resp.json()
      if (!resp.ok) {
        console.error(data)
        return
      }
      setProjectsLength(data.length)
    }

    fetchProjects()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to the Employee Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Employees" count={employeesCount} link="/employees" />
        <DashboardCard title="Active Projects" count={projectsLength} link="/projects" />
        <DashboardCard title="Pending Leave Requests" count={leaveRequests} link="/leave" />
        <DashboardCard title="Open Complaints" count={complaintsCount} link="/complaints" />
        <DashboardCard title="Today's Shifts" count={20} link="/scheduling" />
        <DashboardCard title="Overdue Tasks" count={8} link="/workload" />
      </div>
    </div>
  )
}

function DashboardCard({ title, count, link }) {
  return (
    <Link to={link} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold text-blue-600">{count}</p>
    </Link>
  )
}

