'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Home, Users, Calendar, Clock, Briefcase, FolderOpen, MessageSquare, Menu, LogOut } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const menuItems = [
  { name: 'Schedules', icon: Calendar, path: '/employee-dashboard/schedules' },
  { name: 'My Timesheet', icon: Clock, path: '/employee-dashboard/my-timesheet' },
  { name: 'Leave Management', icon: Briefcase, path: '/employee-dashboard/leave' },
  { name: 'My Projects', icon: FolderOpen, path: '/employee-dashboard/my-projects' },
  { name: 'Complaints/Requests', icon: MessageSquare, path: '/employee-dashboard/complaints' },
]

export default function EmployeeSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = useLocation().pathname;

  if (pathname === "/" ||
    pathname.includes("/dashboard")
  ) return null;

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('user_role')
    window.location.href = '/'
  }

  return (
    <aside
      className={`bg-white shadow-md transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'
        }`}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <h1 className="text-2xl font-bold text-gray-800"> Employee Dashboard</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>
      <nav className="mt-4 p-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center my-2 rounded-lg py-2 px-4 ${isCollapsed ? 'justify-center' : 'justify-start'
              } ${pathname === item.path
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-200'
              } transition-colors duration-200`}
          >
            <item.icon size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}

        <button
          className="flex items-center mt-8 py-2 px-4 w-full rounded-lg text-white font-bold text-center bg-red-600 hover:bg-red-500 transition-colors duration-200"
          onClick={handleLogout}
        >
          <LogOut size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </nav>
    </aside>
  )
}

