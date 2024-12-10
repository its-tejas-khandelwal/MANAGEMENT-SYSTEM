import { useEffect, useState } from "react"
import ComplaintForm from "../components/ComplaintForm"

export default function EmployeeComplaints() {
  const [complaints, setComplaints] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)


  const handleAddComplaint = (complaint) => {
    setComplaints(prevComplaints => [complaint, ...prevComplaints])
  }

  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await fetch('http://localhost:5000/api/complaints/my', {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('user')
        }
      })
      const data = await response.json()
      if (data) {
        setComplaints(data)
      }
    }
    fetchComplaints()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Complaints/Requests</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">My Complaints/Requests</h2>
        <button
          onClick={() => setIsFormOpen(true)}
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Complaint/Request
        </button>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {
              complaints?.map((complaint, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">{complaint.title}</td>
                  <td className="py-2 px-4">{complaint.description}</td>
                  <td className="py-2 px-4">{complaint.status}</td>
                  <td className="py-2 px-4">{new Date(complaint.createdAt).toDateString()}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <ComplaintForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddComplaint}
      />

    </div>
  )
}

