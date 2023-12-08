import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./Addproject.css";
import { useUser } from "../AccountTypes/UserContext";
import { useParams, Link } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    maxWidth: '1100px', // Ajusta según tus necesidades
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: '#00000082',
  },
  formContainer: {
    width: '45%', // Ajusta según tus necesidades
  },
  getProjectsContainer: {
    width: '45%', // Ajusta según tus necesidades
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px', // Ajusta según tus necesidades
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
  title:{
  color: 'white'
  },
  containerget: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  projectItemget: {
    marginBottom: "20px",
    padding: "10px",
    background: "#929292",
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
    background: "#86bc70",
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

const AddProject = () => {
  const { id } = useParams();
  const userId = parseInt(id, 10);

  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProjectName, setEditedProjectName] = useState("");
  const [editedProjectDescription, setEditedProjectDescription] = useState("");
  const [editedProjectUrl, setEditedProjectUrl] = useState("");
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
    setEditedProjectUrl(projectToEdit.url)
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
          url: editedProjectUrl
        }),
      });

      if (response.ok) {
        const updatedProjects = projects.map((project) => {
          if (project.id === id) {
            return {
              ...project,
              name: editedProjectName,
              description: editedProjectDescription,
              url: editedProjectUrl
            };
          }
          return project;
        });

        // Agregar el proyecto actualizado al estado
        setProjects(updatedProjects);

        setEditingProjectId(null);
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
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

  
  
    const handleDeleteProject = async (id) => {
      const isConfirmed = window.confirm("Are you sure you want to delete?");
    
      if (!isConfirmed) {
        return;
      }
    
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

      const newProject = await response.json();
      console.log("Proyecto creado con éxito:", newProject);

      // Agregar el nuevo proyecto al estado
      setProjects([...projects, newProject]);

      // Restablecer el formulario después del envío exitoso
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      setIsPostSuccess(false);
    }
  };

  return (
    <>
     <div className="titulo-container">
      <h1 className="titulo-texto">Let's start adding information, first add your projects</h1>
    </div>
      <div style={styles.container}>
        <Form onSubmit={handleSubmit} style={styles.formContainer}>
          <center>
            <h1 className="File"><FaFileAlt /></h1>
            <h3 style={styles.title}>Add project</h3>
          </center>
          <Form.Group>
            <Form.Label className="title">Name</Form.Label>
            <h1 className="subtext">Add the name of your project</h1>
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label className="title">Description</Form.Label>
          <h1 className="subtext">Add the description of your project</h1>
          <Form.Control
            name="description"
            placeholder="Description"
            required
            value={formData.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="title">Url</Form.Label>
          <h1 className="subtext">Add the link of your project</h1>
          <Form.Control
            type="url"
            name="url"
            required
            value={formData.url}
            placeholder="Url"
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
        </Form>

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
                    <input
                  value={editedProjectDescription}
                  onChange={(e) => setEditedProjectDescription(e.target.value)}
                  style={styles.textareaget}
                />
                 <input
                  value={editedProjectUrl}
                  onChange={(e) => setEditedProjectUrl(e.target.value)}
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
                 <p style={styles.letraget}>Url: {project.url}</p>
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

        <div style={styles.buttonContainer}>
          <Link to={`/User/Profile/${currUser.id}/AddSkills`}>
            <button className="buttonForm">NEXT</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddProject;
