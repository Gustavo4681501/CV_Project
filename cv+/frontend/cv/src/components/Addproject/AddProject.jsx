import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./Addproject.css";
import { useUser } from "../AccountTypes/UserContext";
import { useParams, Link } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import "../AddsCss/AddsCss.css"

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
      <div className="containeradds">
        <Form onSubmit={handleSubmit} className="formContainer">
          <center>
            <h1 className="File"><FaFileAlt /></h1>
            <h3 className="titlea">Add project</h3>
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

        <div className="containerget">
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            userProjects.map((project) => (
              <div key={project.id} className="Itemadd">
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
                      onChange={(e) => setEditedProjectDescription(e.target.value)}
                      className="textareaget"
                    />
                    <input
                      value={editedProjectUrl}
                      onChange={(e) => setEditedProjectUrl(e.target.value)}
                      className="textareaget"
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
                    <p className="letraget">Name: {project.name}</p>
                    <p className="letraget">Description: {project.description}</p>
                    <p className="letraget">Url: {project.url}</p>
                    <button
                      onClick={() => handleEditProject(project.id)}
                      className="buttonEditget"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="buttonEliminarget"
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        <div className="buttonContainer">
          <Link to={`/User/Profile/${currUser.id}/AddSkills`}>
            <button className="buttonForm">NEXT</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddProject;
