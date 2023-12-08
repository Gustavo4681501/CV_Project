import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GetProjects.css";

const styles = {
  containerget: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  projectItemget: {
    marginBottom: "20px",
    padding: "40px",
    background: '#CCCCCC',
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  inputget: {
    margin: "5px 0",
    padding: "8px",
    width: "100%",
    boxSizing: "border-box",
  },
  textareaget: {
    margin: "5px 0",
    padding: "8px",
    width: "100%",
    minHeight: "80px",
    boxSizing: "border-box",
  },
  buttonget: {
    margin: "5px 0",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "3px",
    border: "1px solid #ddd",
    background: "#c37700",
    color: "#fff",
    transition: "background 0.3s ease",
  },
  buttonEliminarget: {
    margin: "5px 0",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "3px",
    border: "1px solid #ddd",
    background: "#a80000",
    color: "#fff",
    transition: "background 0.3s ease",
  },
  buttonEditget: {
    margin: "5px 0",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "3px",
    border: "1px solid #ddd",
    background: "#D27C41",
    color: "#fff",
    transition: "background 0.3s ease",
  },
  letraget: {
    color: "black",
  },
  imgget: {
    width: "60px",
  },
};

const GetProjects = () => {
  const { id } = useParams();
  const userId = parseInt(id, 10);

  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProjectName, setEditedProjectName] = useState("");
  const [editedProjectDescription, setEditedProjectDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  const userProjects = projects.filter((project) => project.user_id === userId);

  const handleEditProject = (id) => {
    const projectToEdit = projects.find((project) => project.id === id);
    setEditingProjectId(id);
    setEditedProjectName(projectToEdit.name);
    setEditedProjectDescription(projectToEdit.description);
  };

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
    <div style={styles.containerget}>
      {isLoading ? (
        <svg className="svgget" viewBox="25 25 50 50">
          <circle className="circleget" r="20" cy="50" cx="50"></circle>
        </svg>
      ) : (
        userProjects.map((project) => (
          <div key={project.id} style={styles.projectItemget}>
            {editingProjectId === project.id ? (
              <>
                <input
                  type="text"
                  value={editedProjectName}
                  onChange={(e) => setEditedProjectName(e.target.value)}
                  style={styles.inputget}
                />
                <textarea
                  value={editedProjectDescription}
                  onChange={(e) => setEditedProjectDescription(e.target.value)}
                  style={styles.textareaget}
                />
                <button
                  onClick={() => handleSaveProject(project.id)}
                  style={styles.buttonget}
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditingProjectId(null)}
                  style={styles.buttonget}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <p style={styles.letraget}>Name: {project.name}</p>
                <p style={styles.letraget}>Description: {project.description}</p>
                <button
                  onClick={() => handleEditProject(project.id)}
                  style={styles.buttonEditget}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  style={styles.buttonEliminarget}
                >
                  Eliminar
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default GetProjects;
