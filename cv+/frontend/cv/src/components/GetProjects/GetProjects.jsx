import React, { useState, useEffect } from "react";
import { useCompany } from "../AccountTypes/CompanyContext";
import "../GetsCss/GetsCss.css";
import { useUser } from "../AccountTypes/UserContext";

/**
 * Component to display and manage user projects.
 * @param {object} props - Props object containing the user ID.
 * @param {string} props.userId - ID of the user whose projects to display.
 * @returns {JSX.Element} Component displaying and managing user projects.
 */
const GetProjects = ({ userId }) => {

  const { currCompany } = useCompany();
  const { currUser } = useUser();
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProjectName, setEditedProjectName] = useState("");
  const [editedProjectDescription, setEditedProjectDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

   // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/projects");

        if (response.ok) {
          const projectsData = await response.json();
          setProjects(projectsData);
        } else {
          console.error("Error al obtener proyectos:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on user ID
  const id = userId ? userId : currUser.id;
  const userProjects = projects.filter(
    (project) => project.user_id.toString() === id.toString()
  );

  // Edit project details
  const handleEditProject = (id) => {
    const projectToEdit = projects.find((project) => project.id === id);
    setEditingProjectId(id);
    setEditedProjectName(projectToEdit.name);
    setEditedProjectDescription(projectToEdit.description);
  };

  // Save edited project details
  const handleSaveProject = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editedProjectName,
          description: editedProjectDescription,
        }),
      });

      if (response.ok) {
        const updatedProjects = projects.map((project) => {
          if (project.id === id) {
            return {
              ...project,
              name: editedProjectName,
              description: editedProjectDescription,
            };
          }
          return project;
        });
        setProjects(updatedProjects);
        setEditingProjectId(null);
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedProjects = projects.filter((project) => project.id !== id);
        setProjects(updatedProjects);
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="containergets">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        userProjects.map((project) => (
          <div key={project.id} className="Itemget">
            <p className="letraget">Name: {project.name}</p>
            <p className="letraget">Description: {project.description}</p>
            
            {currCompany? id.toString() === "":id.toString() === currUser.id.toString()? (
              
              <>
                {editingProjectId === project.id ? (
                  <>
                    <input
                      type="text"
                      value={editedProjectName}
                      onChange={(e) => setEditedProjectName(e.target.value)}
                      className="inputget"
                    />
                    <input
                      value={editedProjectDescription}
                      onChange={(e) =>
                        setEditedProjectDescription(e.target.value)
                      }
                      className="inputget"
                    />
                    <button
                      onClick={() => handleSaveProject(project.id)}
                      className="buttonget"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingProjectId(null)}
                      className="buttonget"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditProject(project.id)}
                      className="buttonEditget"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="buttonEliminarget"
                    >
                      Delete
                    </button>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default GetProjects;
