import { useEffect, useState } from "react";

export default function MyProjects() {
  const [projects, setProjects] = useState([])
  const [profile, setProfile] = useState({})

  const fetchProjects = async () => {
    const resp = await fetch('http://localhost:5000/api/projects/myProjects', {
      headers: {
        'auth-token': localStorage.getItem('user'),
      },
    })

    const data = await resp.json()
    if (!resp.ok) {
      console.error(data)
      return
    }
    setProjects(data)
  }


  useEffect(() => {
    const fetchProfile = async () => {
      const resp = await fetch('http://localhost:5000/api/myProfile', {
        headers: {
          'auth-token': localStorage.getItem('user'),
        },
      })

      const data = await resp.json()
      if (!resp.ok) {
        console.error(data)
        return
      }
      setProfile(data)
      fetchProjects()
    }
    fetchProfile()
  }, [])

  const updateTaskStatus = async (projectId, taskId, status) => {
    const resp = await fetch(`http://localhost:5000/api/projects/updateTask/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('user'),
      },
      body: JSON.stringify({ taskId, status }),
    })

    const data = await resp.json()
    if (!resp.ok) {
      console.error(data)
      return
    }

    const updatedProjects = projects.map(project => {
      if (project._id === data._id) {
        return data
      }
      return project
    })

    setProjects(updatedProjects)
  }


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Assigned Project</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Active Projects</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Project Name</th>
              <th className="py-2 px-4 text-left">Start Date</th>
              <th className="py-2 px-4 text-left">End Date</th>
              <th className="py-2 px-4 text-left">Assigned Employees</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              projects.map((project, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">{project.name}</td>
                  <td className="py-2 px-4">{new Date(project.startDate).toDateString()}</td>
                  <td className="py-2 px-4">{new Date(project.endDate).toDateString()}</td>
                  <td className="py-2 px-4">{
                    project?.tasks?.map((task, index) => (
                      <span key={index}>{task.assignedTo}, </span>
                    ))
                  }</td>
                  <td className="py-2 px-4">{
                    project?.tasks?.map((task, index) => (

                      task.assignedTo === profile._id ?
                        <select key={index} className="border border-gray-300 rounded-lg px-2 py-1" value={task.status} onChange={
                          (e) => { updateTaskStatus(project._id, task._id, e.target.value) }
                        }>
                          <option value="Pending">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select> : <span className="ml-2">{task.status}</span>

                    ))
                  }</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

