import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useUser } from "../AccountTypes/UserContext";
import GetEducations from "../GetEducation/GetEducation";
import "./AddEducation.css";
import { Link } from 'react-router-dom';

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
  getEducationsContainer: {
    width: '45%', // Ajusta según tus necesidades
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px', // Ajusta según tus necesidades
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

const AddEducation1 = () => {
  const { currUser } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    institution_name: "",
    location: "",
    start_date: "",
    finish_date: "",
    user_id: currUser.id
  });

  const [isPostSuccess, setIsPostSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Formatear la fecha en el formato "YYYY-MM-DD"
    if (name === "start_date" || name === "finish_date") {
      const formattedDate = new Date(value);
      const year = formattedDate.getFullYear();
      const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
      const day = formattedDate.getDate().toString().padStart(2, '0');
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
      const response = await fetch("http://localhost:3001/api/educations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ education: formData }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar la educación");
      }

      setIsPostSuccess(true);

      setFormData({
        name: "",
        institution_name: "",
        location: "",
        start_date: "",
        finish_date: "",
        user_id: currUser.id
      });

      const data = await response.json();
      console.log("Education añadido con éxito:", data);
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      setIsPostSuccess(false);
    }
  };

  return (
    <>
    <div>
    <h1>Add the educations</h1>
    <h1>¡Add as many as you think are necessary!</h1>
    </div>
    <div style={styles.container}>
       <div style={styles.buttonContainer}>
        <Link to={`/User/Profile/${currUser.id}/AddSkills`}>
          <button className="buttonForm">BACK</button>
        </Link>
      </div>
      <Form onSubmit={handleSubmit} style={styles.formContainer}>
        <center>
          <h1 className="File">📚</h1>
          <h3 style={styles.title}>Add Education</h3>
        </center>
        <Form.Group>
          <Form.Label className="title">Name</Form.Label>
          <h1 className="subtext">Add the name of your education</h1>
          <Form.Control
            type="text"
            name="name"
            placeholder="Name of education"
            value={formData.name}
            required
            onChange={handleInputChange}
            style={styles.input}
          />

          <Form.Label className="title">Institution name</Form.Label>
          <h1 className="subtext">Add the name of the institution</h1>
          <Form.Control
            type="text"
            name="institution_name"
            placeholder="Institution name"
            required
            value={formData.institution_name}
            onChange={handleInputChange}
            style={styles.input}
          />

          <Form.Label className="title">Location</Form.Label>
          <h1 className="subtext">Add the location</h1>
          <Form.Control
            type="text"
            name="location"
            placeholder="Location"
            required
            value={formData.location}
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

        <button type="submit" className="buttonForm">
          Add education
        </button>
      </Form>

      <GetEducations style={styles.getEducationsContainer} />

      <div style={styles.buttonContainer}>
        <Link to={`/User/Profile/${currUser.id}/AddWorkExperiences`}>
          <button className="buttonForm">
            NEXT
          </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default AddEducation1;

