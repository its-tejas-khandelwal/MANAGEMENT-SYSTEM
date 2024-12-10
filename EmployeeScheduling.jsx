import { useEffect, useState } from 'react'

export default function EmployeeScheduling() {
  const [schedules, setSchedules] = useState([])

  useEffect(() => {
    const fetchSchedules = async () => {
      const resp = await fetch('http://localhost:5000/api/employee-schedules', {
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
      <h1 className="text-3xl font-bold mb-6">My Schedules</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">My Schedule for Today</h2>
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
                <td className="py-2 px-4">Me</td>
                <td className="py-2 px-4">{schedule.shift}</td>
                <td className="py-2 px-4">{schedule.date}</td>
                <td className="py-2 px-4">{schedule.tasks.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

