import { useEffect, useState } from 'react'
import AddEmployeeSchedulingForm from '../components/ComplaintForm'

export default function Scheduling() {
  const [isAddEmployeeFormOpen, setIsAddEmployeeFormOpen] = useState(false)
  const [schedules, setSchedules] = useState([])

  const handleAddSchedule = (newEmployee) => {
    setSchedules([...schedules, { id: schedules.length + 1, ...newEmployee }])
  }

  useEffect(() => {
    const fetchSchedules = async () => {
      const resp = await fetch('http://localhost:5000/api/employee-schedules/all', {
        headers: {
          'auth-token': localStorage.getItem('user'),
        },
      })

      const data = await resp.json()
      if (!resp.ok) {
        console.error(data)
        return
      }

      setSchedules(data)
    }

    fetchSchedules()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Employee Scheduling</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition-colors"
        onClick={() => setIsAddEmployeeFormOpen(true)}
      >
        Add Schedule
      </button>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Schedule for Today</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Employee</th>
              <th className="py-2 px-4 text-left">Shift</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Tasks</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td className="py-2 px-4">{schedule.employeeId}</td>
                <td className="py-2 px-4">{schedule.shift}</td>
                <td className="py-2 px-4">{schedule.date}</td>
                <td className="py-2 px-4">{schedule.tasks.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddEmployeeSchedulingForm
        isOpen={isAddEmployeeFormOpen}
        onClose={() => setIsAddEmployeeFormOpen(false)}
        onSubmit={handleAddSchedule}
      />
    </div>
  )
}

