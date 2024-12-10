import { useEffect, useState } from "react"

export default function ComplaintsRequests() {
  const [complaints, setComplaints] = useState([])

  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('user')
        }
      })
      const data = await response.json()
      setComplaints(data)
    }
    fetchComplaints()
  }, [])

  const updateComplaint = async (complaintId, status) => {
    const response = await fetch(`http://localhost:5000/api/complaints/update/${complaintId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('user')
      },
      body: JSON.stringify({ status })
    })
    const data = await response.json()
    const updatedComplaints = complaints.map(complaint => {
      if (complaint._id === data._id) {
        return data
      }
      return complaint
    })
    setComplaints(updatedComplaints)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Complaints/Requests</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Complaints/Requests</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Employee</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {
              complaints.map((complaint, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">{complaint.employeeId}</td>
                  <td className="py-2 px-4">{complaint.title}</td>
                  <td className="py-2 px-4">{complaint.description}</td>
                  <select
                    onChange={(e) => updateComplaint(complaint._id, e.target.value)}
                    className="py-2 px-4" value={complaint.status}>
                    <option value="Open">Open</option>
                    <option value="In Progress">Pending</option>
                    <option value="Resolved">Resolved</option>
                  </select>


                  <td className="py-2 px-4">{new Date(complaint.createdAt).toDateString()}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

