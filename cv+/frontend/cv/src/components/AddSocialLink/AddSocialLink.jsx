import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./AddSocialLink.css";
import { useUser } from "../AccountTypes/UserContext";
import GetSocialLinks from "../GetSocialLinks/GetSocialLinks";
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

const AddSocialLink = () => {
  const { currUser } = useUser();
  const initialFormData = {
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
      const response = await fetch("http://localhost:3001/api/social_links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ social_link: formData }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el enlace social");
      }

      setIsPostSuccess(true);

      const data = await response.json();
      console.log("Enlace social agregado con éxito:", data);

      setFormData(initialFormData);
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      setIsPostSuccess(false);
    }
  };

  return (
  <>
  <div>
  <h1>¡Add your social links so that companies can view you!</h1>
  </div>
    <div style={styles.container}>
         <div style={styles.buttonContainer}>
        <Link to={`/User/Profile/${currUser.id}/AddWorkExperiences`}>
          <button className="buttonForm">BACK</button>
        </Link>
      </div>
      <Form onSubmit={handleSubmit} style={styles.formContainer}>
        <center>
          <h1 className="File">👩‍💻</h1>
          <h3 style={styles.title}>Add social link</h3>
        </center>
        <Form.Group>
          <Form.Label className="title">URL</Form.Label>
          <h1 className="subtext">Add your social link</h1>
          <Form.Control
            placeholder="Url"
            type="text"
            name="url"
            required
            value={formData.url}
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
          Add URL
        </button>
      </Form>

      <div style={styles.buttonContainer}>
        <GetSocialLinks />
      </div>

       <div style={styles.buttonContainer}>
        <Link to={`/User/Profile/${currUser.id}/Resumes`}>
          <button className="buttonForm">VIEW RESUMES</button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default AddSocialLink;
