import { useEffect, useState } from "react";
import ProjectsForm from "../components/ProjectsForm";

export default function ProjectPlanning() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [projects, setProjects] = useState([])

  const handleAddProject = (project) => {
    setProjects(prevProjects => [...prevProjects, project])
  }

  useEffect(() => {
    const fetchProjects = async () => {
      const resp = await fetch('http://localhost:5000/api/projects', {
        headers: {
          'auth-token': localStorage.getItem('user'),
        },
      })

      const data = await resp.json()
      if (!resp.ok) {
        console.error(data)
        return
      }
      console.log(data)
      setProjects(data)
    }

    fetchProjects()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Project Planning</h1>
      <button
        onClick={() => setIsFormOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Project</button>
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
                      <span key={index}>{task.status}, </span>
                    ))
                  }</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <ProjectsForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddProject}

      />
    </div>
  )
}

