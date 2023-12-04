import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./Addproject.css";
import { useUser } from "../AccountTypes/UserContext";
import GetProjects from "../GetProjects/GetProjects";
import { useParams, Link } from "react-router-dom";

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    maxWidth: '900px', // Ajusta según tus necesidades
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
  }
};

const AddProject = () => {
  const { id } = useParams();
  const userId = parseInt(id, 10);

  const [projects, setProjects] = useState([]);

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
    <>
    <div>
    <h1>Let's start adding information</h1>
    <h1>First add your projects</h1>
    
    </div>
    <div style={styles.container}>
      <Form onSubmit={handleSubmit} style={styles.formContainer}>
        <center>
          <h1 className="File">📁</h1>
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
            type="text"
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

      <GetProjects style={styles.getProjectsContainer} />

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
