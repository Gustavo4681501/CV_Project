import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useUser } from "../AccountTypes/UserContext";
import GetWorkExperiences from "../GetWorkExperiences/GetWorkExperiences";
import "./AddWorkExperiences.css";
import { Link } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: '#00000082',
  },
  formContainer: {
    width: '45%',
  },
  getWorksContainer: {
    width: '45%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: '20px',
  },
  letra: {
    color: 'black',
  },
  input: {
    margin: '5px 0',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    margin: '5px 0',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '3px',
    border: '1px solid #ddd',
    transition: 'background 0.3s ease',
  },
    title:{
  color: 'white'
  }
};

const AddWorkExperience = () => {
  const { currUser } = useUser();
  const initialFormData = {
    name: "",
    description: "",
    start_date: "",
    finish_date: "",
    user_id: currUser.id,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isPostSuccess, setIsPostSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "start_date" || name === "finish_date") {
      const formattedDate = new Date(value);
      const year = formattedDate.getFullYear();
      const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
      const day = formattedDate.getDate().toString().padStart(2, "0");
      const formattedDateString = `${year}-${month}-${day}`;

      setFormData({
        ...formData,
        [name]: formattedDateString,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/work_experiences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ work_experience: formData }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la experiencia laboral");
      }

      setIsPostSuccess(true);

      const data = await response.json();
      console.log("Experiencia laboral creada con éxito:", data);

      setFormData(initialFormData);
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      setIsPostSuccess(false);
    }
  };

  return (
    <>
    <div>
     <h1>¡Add all your work experiences so companies can see your performance!</h1>
    </div>
    <div style={styles.container}>
            <div style={styles.buttonContainer}>
        <Link to={`/User/Profile/${currUser.id}/AddEducations`}>
          <button className="buttonForm">BACK</button>
        </Link>
      </div>
      <Form onSubmit={handleSubmit} style={styles.formContainer}>
        <center>
          <h1 className="File">👷</h1>
          <h3 style={styles.title}>Add work experience</h3>
        </center>
        <Form.Group>
          <Form.Label className="title">Work name</Form.Label>
          <h1 className="subtext">Add the name of your past job</h1>
          <Form.Control
            placeholder="Work name"
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            style={styles.input}
          />

          <Form.Label className="title">Description</Form.Label>
          <h1 className="subtext">Add a brief description about this job</h1>
          <Form.Control
            type="text"
            name="description"
            placeholder="Description"
            required
            value={formData.description}
            onChange={handleInputChange}
            style={styles.input}
          />

          <Form.Label className="title">Start date</Form.Label>
          <Form.Control
            type="Date"
            name="start_date"
            required
            value={formData.start_date}
            onChange={handleInputChange}
            style={styles.input}
          />

          <Form.Label className="title">Finish date</Form.Label>
          <Form.Control
            type="Date"
            name="finish_date"
            required
            value={formData.finish_date}
            onChange={handleInputChange}
            style={styles.input}
          />
        </Form.Group>

        {isPostSuccess && (
          <div className="alert alert-success" role="alert">
            Added successfully
          </div>
        )}

        <br />

        <button type="submit" className="buttonForm">
          Add work experience
        </button>
      </Form>

      <div style={styles.getWorksContainer}>
        <GetWorkExperiences />
      </div>

      <div style={styles.buttonContainer}>
        <Link to={`/User/Profile/${currUser.id}/AddSocialLinks`}>
          <button className="buttonForm">NEXT</button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default AddWorkExperience;
