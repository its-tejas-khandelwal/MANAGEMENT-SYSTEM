import { useEffect, useState } from "react"
import LeaveForm from "../components/LeaveForm"

export default function EmployeeLeaveManagement() {
  const [leaveRequests, setLeaveRequests] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleAddLeaveRequest = async (leaveRequest) => {
    setLeaveRequests([...leaveRequests, leaveRequest])
  }

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      const response = await fetch('http://localhost:5000/api/leaves/my', {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('user')
        }
      })
      const data = await response.json()
      setLeaveRequests(data)
    }
    fetchLeaveRequests()
  }, [])


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Leave Management</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4">Add Leave Request</button>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Start Date</th>
              <th className="py-2 px-4 text-left">End Date</th>
              <th className="py-2 px-4 text-left">Reason</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              leaveRequests.map((leaveRequest, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">{new Date(leaveRequest.startDate).toDateString()}</td>
                  <td className="py-2 px-4">{new Date(leaveRequest.endDate).toDateString()}</td>
                  <td className="py-2 px-4">{leaveRequest.reason}</td>
                  <td className="py-2 px-4">{leaveRequest.status}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <LeaveForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddLeaveRequest}
      />
    </div>
  )
}

