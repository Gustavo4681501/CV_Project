import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: '#303030',
  },
  projectItem: {
    marginBottom: '20px',
    padding: '10px',
    background: '#929292',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  input: {
    margin: '5px 0',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
  },
  textarea: {
    margin: '5px 0',
    padding: '8px',
    width: '100%',
    minHeight: '80px',
    boxSizing: 'border-box',
  },
  button: {
    margin: '5px 0',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '3px',
    border: '1px solid #ddd',
    background: '#4CAF50',
    color: '#fff',
    transition: 'background 0.3s ease',
  },
  letra: {
    color: 'black',
  },
};

const GetProjects = () => {
  const { id } = useParams();
  const userId = parseInt(id, 10);

  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProjectName, setEditedProjectName] = useState('');
  const [editedProjectDescription, setEditedProjectDescription] = useState('');

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
      }
    };

    fetchProjects();
  }, []);

  const userProjects = projects.filter(project => project.user_id === userId);

  const handleEditProject = (id) => {
    const projectToEdit = projects.find(project => project.id === id);
    setEditingProjectId(id);
    setEditedProjectName(projectToEdit.name);
    setEditedProjectDescription(projectToEdit.description);
  };

  const handleSaveProject = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedProjectName,
          description: editedProjectDescription,
        }),
      });

      if (response.ok) {
        const updatedProjects = projects.map(project => {
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
        throw new Error('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedProjects = projects.filter(project => project.id !== id);
        setProjects(updatedProjects);
      } else {
        throw new Error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div style={styles.container}>
      
        {userProjects.map((project) => (
          <p key={project.id} style={styles.projectItem}>
            {editingProjectId === project.id ? (
              <>
                <input
                  type="text"
                  value={editedProjectName}
                  onChange={(e) => setEditedProjectName(e.target.value)}
                  style={styles.input}
                />
                <textarea
                  value={editedProjectDescription}
                  onChange={(e) => setEditedProjectDescription(e.target.value)}
                  style={styles.textarea}
                />
                <button onClick={() => handleSaveProject(project.id)} style={styles.button}>
                  Guardar
                </button>
                <button onClick={() => setEditingProjectId(null)} style={styles.button}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <p style={styles.letra}>Name: {project.name}</p>
                <p style={styles.letra}>Description: {project.description}</p>
                <button onClick={() => handleDeleteProject(project.id)} style={styles.button}>
                  Eliminar
                </button>
                <button onClick={() => handleEditProject(project.id)} style={styles.button}>
                  Editar
                </button>
              </>
            )}
          </p>
        ))}
      
    </div>
  );
};

export default GetProjects;
