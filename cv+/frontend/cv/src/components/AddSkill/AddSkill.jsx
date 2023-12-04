import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./AddSkill.css";
import { useUser } from "../AccountTypes/UserContext";
import GetSkills from "../GetSkills/GetSkills";
import { Link } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
 // Ajusta según tus necesidades
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: '#00000082',
  },
  formContainer: {
    width: '45%', // Ajusta según tus necesidades
  },
  getSkillsContainer: {
    width: '45%', // Ajusta según tus necesidades
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px', // Ajusta según tus necesidades
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

const AddSkill = () => {
  const { currUser } = useUser();
  const initialFormData = {
    name: "",
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
      const response = await fetch("http://localhost:3001/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skill: formData }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar la skill");
      }

      setIsPostSuccess(true);

      const data = await response.json();
      console.log("Skill agregado con éxito:", data);

      // Limpiar los campos después del éxito
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      setIsPostSuccess(false);
    }
  };

  return (
    <>
    <div>
    <h1>Add your skills</h1>
    <h1>¡Choose the ones that describe you best!</h1>
    </div>
    <div style={styles.container}>
       <div style={styles.buttonContainer}>
        <Link to={`/User/Profile/${currUser.id}/AddProjects`}>
          <button className="buttonForm">BACK</button>
        </Link>
      </div>

      <Form onSubmit={handleSubmit} style={styles.formContainer}>
        <center>
          <h1 className="File">🧠</h1>
          <h3 style={styles.title}>Add Skill</h3>
        </center>
        <Form.Group className="mb-3">
          <Form.Label className="title">Skill</Form.Label>
          <h1 className="subtext">Add your skills (Teamwork, attention to detail, creativity, adaptibility, communication, etc...)</h1>
          <Form.Control
            type="text"
            name="name"
            placeholder="Skill"
            required
            value={formData.name}
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
          Add skill
        </button>
      </Form>
     

      <GetSkills style={styles.getSkillsContainer} />

      <div style={styles.buttonContainer}>
        <Link to={`/User/Profile/${currUser.id}/AddEducations`}>
          <button className="buttonForm">
            NEXT
          </button>
        </Link>
      </div>
    </div>
      </>
  );
};

export default AddSkill;
