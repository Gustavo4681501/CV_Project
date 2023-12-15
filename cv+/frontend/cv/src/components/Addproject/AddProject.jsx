import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useUser } from "../AccountTypes/UserContext";
import { useParams, Link } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import "../AddsCss/AddsCss.css";

/**
 * Functional component for adding projects to a user's profile.
 * Allows users to add, edit, and delete projects.
 *
 * @returns {JSX.Element} JSX representation of the AddProject component.
 */
const AddProject = () => {
  // Extracts user id from URL parameters
  const { id } = useParams();
  const userId = parseInt(id, 10);

  // State variables for managing projects and their editing
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProjectName, setEditedProjectName] = useState("");
  const [editedProjectDescription, setEditedProjectDescription] = useState("");
  const [editedProjectUrl, setEditedProjectUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetches projects for the user on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/projects");

        if (response.ok) {
          const projectsData = await response.json();
          setProjects(projectsData);
        } else {
          console.error("Error fetching projects:", response.statusText);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filters only projects based on the current user
  const userProjects = projects.filter((project) => project.user_id === userId);

  /**
   * Handles the initiation of project editing.
   *
   * @param {number} id - The id of the project to edit.
   * @returns {void}
   */
  const handleEditProject = (id) => {
    const projectToEdit = projects.find((project) => project.id === id);
    setEditingProjectId(id);
    setEditedProjectName(projectToEdit.name);
    setEditedProjectDescription(projectToEdit.description);
    setEditedProjectUrl(projectToEdit.url);
  };

  /**
   * Handles saving the edited project.
   *
   * @param {number} id - The id of the project to save.
   * @returns {void}
   */
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
          url: editedProjectUrl,
        }),
      });

      if (response.ok) {
        const updatedProjects = projects.map((project) => {
          if (project.id === id) {
            return {
              ...project,
              name: editedProjectName,
              description: editedProjectDescription,
              url: editedProjectUrl,
            };
          }
          return project;
        });

        // Updates the state with the modified project
        setProjects(updatedProjects);

        setEditingProjectId(null);
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  // Retrieves current user information from context
  const { currUser } = useUser();
  // Initial form data for adding a new project
  const initialFormData = {
    name: "",
    description: "",
    url: "",
    user_id: currUser.id,
  };

  // State variables for form data and post success indication
  const [formData, setFormData] = useState(initialFormData);
  const [isPostSuccess, setIsPostSuccess] = useState(false);

  /**
   * Handles the deletion of a project.
   *
   * @param {number} id - The id of the project to delete.
   * @returns {void}
   */
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

  /**
   * Handles input changes in the form.
   *
   * @param {object} e - The event object representing the input change.
   * @returns {void}
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Handles form submission for adding a new project.
   *
   * @param {object} e - The event object representing the form submission.
   * @returns {void}
   */
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
        throw new Error("Error creating the project");
      }

      setIsPostSuccess(true);

      const newProject = await response.json();
      console.log("Project created successfully:", newProject);

      // Adds the new project to the state
      setProjects([...projects, newProject]);

      // Resets the form after successful submission
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error making POST request:", error);
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
                      Save
                    </button>
                    <button
                      onClick={() => setEditingProjectId(null)}
                      className="buttonget"
                    >
                      Cancel
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
              </div>
            ))
          )}
        </div>

        <div className="buttonContainer">
          <Link to={`/User/Profile/${currUser.id}/AddSkills`}>
            <button className="buttonFormNext">NEXT</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddProject;
