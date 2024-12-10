import { useEffect, useState } from 'react';

export default function ProjectsForm({ isOpen, onClose, onSubmit }) {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    assignedEmployees: [],
    tasks: []
  });

  const [newTask, setNewTask] = useState({
    taskName: '',
    assignedTo: '',
    deadline: '',
    status: 'Pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleEmployeeSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prevData => ({
      ...prevData,
      assignedEmployees: selectedOptions
    }));
  };

  const handleAddTask = () => {
    if (newTask.taskName && newTask.deadline) {
      setFormData(prevData => ({
        ...prevData,
        tasks: [...prevData.tasks, { ...newTask }]
      }));
      setNewTask({
        taskName: '',
        assignedTo: '',
        deadline: '',
        status: 'Pending'
      });
    }
  };

  const handleRemoveTask = (index) => {
    setFormData(prevData => ({
      ...prevData,
      tasks: prevData.tasks.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await fetch('http://localhost:5000/api/projects/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('user'),
      },
      body: JSON.stringify(formData),
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error(data);
      return;
    }

    onSubmit(data);
    onClose();
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      const resp = await fetch('http://localhost:5000/api/get-employees', {
        headers: {
          'auth-token': localStorage.getItem('user'),
        },
      });

      const data = await resp.json();
      if (!resp.ok) {
        console.error(data);
        return;
      }

      setEmployees(data);
    };

    fetchEmployees();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="assignedEmployees" className="block text-sm font-medium text-gray-700">Assigned Employees</label>
            <select
              multiple
              id="assignedEmployees"
              name="assignedEmployees"
              value={formData.assignedEmployees}
              onChange={handleEmployeeSelection}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>{employee.name}</option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple employees</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Tasks</h3>
            <div className="space-y-4">
              {formData.tasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                  <span className="flex-grow">{task.taskName}</span>
                  <span className="text-sm text-gray-500">{task.deadline}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTask(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <input
                type="text"
                value={newTask.taskName}
                onChange={(e) => setNewTask(prev => ({ ...prev, taskName: e.target.value }))}
                placeholder="Task name"
                className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <select
                value={newTask.assignedTo}
                onChange={(e) => setNewTask(prev => ({ ...prev, assignedTo: e.target.value }))}
                className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Assign to employee</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>{employee.name}</option>
                ))}
              </select>
              <input
                type="date"
                value={newTask.deadline}
                onChange={(e) => setNewTask(prev => ({ ...prev, deadline: e.target.value }))}
                className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <button
                type="button"
                onClick={handleAddTask}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Add Task
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}