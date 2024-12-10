import { useEffect, useState } from "react";
import TimeSheetForm from "../components/TimeSheetForm";

export default function Timesheets() {
  const [isAddEmployeeFormOpen, setIsAddEmployeeFormOpen] = useState(false)
  const [timesheets, setTimesheets] = useState([])

  const handleAddTimesheet = (timesheet) => {
    setTimesheets(prevTimesheets => [...prevTimesheets, timesheet])
  }

  useEffect(() => {
    const fetchTimesheets = async () => {
      const resp = await fetch('http://localhost:5000/api/timesheets/all', {
        headers: {
          'auth-token': localStorage.getItem('user'),
        },
      })

      const data = await resp.json()
      if (!resp.ok) {
        console.error(data)
        return
      }

      setTimesheets(data)
    }

    fetchTimesheets()
  }, [])


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Timesheet Management</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Timesheets</h2>
        <button
          onClick={() => setIsAddEmployeeFormOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Timesheet</button>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Employee</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Clock In</th>
              <th className="py-2 px-4 text-left">Clock Out</th>
              <th className="py-2 px-4 text-left">Total Hours</th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map(timesheet => (
              <tr key={timesheet._id}>
                <td className="py-2 px-4">{timesheet.employeeId}</td>
                <td className="py-2 px-4">{timesheet.date}</td>
                <td className="py-2 px-4">{timesheet.clockIn}</td>
                <td className="py-2 px-4">{timesheet.clockOut}</td>
                <td className="py-2 px-4">{timesheet.totalHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TimeSheetForm
        isOpen={isAddEmployeeFormOpen}
        onClose={() => setIsAddEmployeeFormOpen(false)}
        onSubmit={handleAddTimesheet}
      />
    </div>
  )
}

