import { useEffect, useState } from "react"

export default function LeaveManagement() {
  const [leaveRequests, setLeaveRequests] = useState([])

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      const response = await fetch('http://localhost:5000/api/leaves', {
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

  const updateLeaveRequest = async (leaveId, status) => {
    const response = await fetch(`http://localhost:5000/api/leaves/update/${leaveId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('user')
      },
      body: JSON.stringify({ status })
    })
    const data = await response.json()
    const updatedLeaveRequests = leaveRequests.map(leaveRequest => {
      if (leaveRequest._id === data._id) {
        return data
      }
      return leaveRequest
    })
    setLeaveRequests(updatedLeaveRequests)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Leave Management</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Employee</th>
              <th className="py-2 px-4 text-left">Start Date</th>
              <th className="py-2 px-4 text-left">End Date</th>
              <th className="py-2 px-4 text-left">Reason</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              leaveRequests.map((leaveRequest, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">{leaveRequest.employeeId}</td>
                  <td className="py-2 px-4">{new Date(leaveRequest.startDate).toDateString()}</td>
                  <td className="py-2 px-4">{new Date(leaveRequest.endDate).toDateString()}</td>
                  <td className="py-2 px-4">{leaveRequest.reason}</td>
                  <td className="py-2 px-4">{leaveRequest.status}</td>
                  {
                    leaveRequest.status === 'Pending' ?
                      <td className="py-2 px-4">
                        <button
                          onClick={() => updateLeaveRequest(leaveRequest._id, 'Approved')}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">Approve</button>
                        <button
                          onClick={() => updateLeaveRequest(leaveRequest._id, 'Rejected')}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg">Reject</button>
                      </td> :
                      <td className="py-2 px-4">-</td>
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

