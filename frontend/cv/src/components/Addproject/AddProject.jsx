import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./Addproject.css"
import { useUser } from "../AccountTypes/UserContext";
import GetProjects from "../GetProjects/GetProjects";
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

const AddProject = () => {
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

    const { currUser } = useUser();
    const initialFormData = {
        name: "",
        description: "",
        url: "",
        user_id: currUser.id, 
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isPostSuccess, setIsPostSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ project: formData }),
            });

            if (!response.ok) {
                throw new Error("Error al crear el proyecto");
            }

            setIsPostSuccess(true);

            const data = await response.json();
            console.log("Proyecto creado con éxito:", data);

            // Restablecer el formulario después del envío exitoso
            setFormData(initialFormData);
        } catch (error) {
            console.error("Error al realizar la solicitud POST:", error);
            setIsPostSuccess(false);
        }
    };

    return (
        <div className="d-flex justify-content-center ">
            <Form onSubmit={handleSubmit} className="formContainer">
                <center>
                    <h1 className="File">📁</h1>
                    <h3>Add project</h3>
                </center>
                <Form.Group>
                    <Form.Label className="title">Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="title">Description</Form.Label>
                    <Form.Control
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="title">Url</Form.Label>
                    <Form.Control
                        type="text"
                        name="url"
                        required
                        value={formData.url}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {isPostSuccess && (
                    <div className="alert alert-success" role="alert">
                        Added successfully
                    </div>
                )}

                <button type="submit" className="buttonForm">
                    Add project
                </button>
                <br />
                <GetProjects/>
            </Form>
          
      

        </div>
    );
};

export default AddProject;
