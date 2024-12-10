import { useEffect, useState } from 'react'
import AddEmployeeForm from '../components/AddEmployeeForm'

export default function Employees() {
  const [isAddEmployeeFormOpen, setIsAddEmployeeFormOpen] = useState(false)
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, { id: employees.length + 1, ...newEmployee }])
  }

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

      setEmployees(data)
    }

    fetchEmployees()
  }, [])

  const handleDeleteEmployee = async (id) => {
    const resp = await fetch(`http://localhost:5000/api/delete-employee/${id}`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('user'),
      },
    })

    const data = await resp.json()
    if (!resp.ok) {
      console.error(data)
      return
    }

    setEmployees(employees.filter((employee) => employee.id !== id))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Employees</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition-colors"
        onClick={() => setIsAddEmployeeFormOpen(true)}
      >
        Add Employee
      </button>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Position</th>
              <th className="py-2 px-4 text-left">Department</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="py-2 px-4">{employee.name}</td>
                <td className="py-2 px-4">{employee.email}</td>
                <td className="py-2 px-4">{employee.position}</td>
                <td className="py-2 px-4">{employee.department}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={
                      ()=>{
                        setIsAddEmployeeFormOpen(true)
                        setSelectedEmployee(employee)
                      }
                    }
                    className="text-blue-500 mr-2 hover:text-blue-700">Edit</button>
                  <button
                    onClick={() => handleDeleteEmployee(employee._id)}
                    className="text-red-500 hover:text-red-700">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddEmployeeForm
        isOpen={isAddEmployeeFormOpen}
        onClose={() => setIsAddEmployeeFormOpen(false)}
        onSubmit={handleAddEmployee}
        selectedEmployee={selectedEmployee}
      />
    </div>
  )
}

