import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./AddSkill.css";
import { useUser } from "../AccountTypes/UserContext";
import { useParams } from 'react-router-dom';
import GetSkills from "../GetSkills/GetSkills";
import { Link } from 'react-router-dom';
import { GiBrain } from "react-icons/gi";

const styles = {
  containerget: {
   maxWidth: '600px',
   margin: 'auto',
   padding: '20px',
   fontFamily: 'Arial, sans-serif',
 },
 skillItemget: {
   marginBottom: '20px',
   padding: '10px',
   background: '#929292',
   border: '1px solid #ddd',
   borderRadius: '5px',
 },
 inputget: {
   margin: '5px 0',
   padding: '8px',
   width: '100%',
   boxSizing: 'border-box',
 },
 buttonget: {
   margin: '5px 0',
   padding: '8px 12px',
   cursor: 'pointer',
   borderRadius: '3px',
   border: '1px solid #ddd',
   background: '#c37700',
   color: '#fff',
   transition: 'background 0.3s ease',
 },
 buttonEliminarget: {
   margin: '5px 0',
   padding: '8px 12px',
   cursor: 'pointer',
   borderRadius: '3px',
   border: '1px solid #ddd',
   background: '#a80000',
   color: '#fff',
   transition: 'background 0.3s ease',
 },
 buttonEditget: {
   margin: '5px 0',
   padding: '8px 12px',
   cursor: 'pointer',
   borderRadius: '3px',
   border: '1px solid #ddd',
   background: '#86bc70',
   color: '#fff',
   transition: 'background 0.3s ease',
 },
 letraget: {
   color: 'black',
 },
 container: {
   display: 'flex',
   maxWidth: '1100px', 
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
  const [skills, setSkills] = useState([]);
  const { id } = useParams();
  const userId = parseInt(id, 10);

  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editedSkillName, setEditedSkillName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/skills');

        if (response.ok) {
          const skillsData = await response.json();
          setSkills(skillsData);
        } else {
          console.error('Error al obtener skills:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const userSkills = skills.filter(skill => skill.user_id === userId);

  const handleEditSkill = (skillId) => {
    const skillToEdit = userSkills.find(skill => skill.id === skillId);
    setEditedSkillName(skillToEdit.name);
    setEditingSkillId(skillId);
  };

  const handleSaveSkill = async (skillId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/skills/${skillId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedSkillName,
        }),
      });

      if (response.ok) {
        const updatedSkills = skills.map(skill => {
          if (skill.id === skillId) {
            return {
              ...skill,
              name: editedSkillName,
            };
          }
          return skill;
        });

        setSkills(updatedSkills);
        setEditingSkillId(null);
      } else {
        throw new Error('Failed to update skill');
      }
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  const handleDeleteSkill = async (skillId) => {
  const isConfirmed = window.confirm("Are you sure you want to delete?");
    
      if (!isConfirmed) {
        return; // Cancelar la eliminación si el usuario no confirma
      }
    try {
      const response = await fetch(`http://localhost:3001/api/skills/${skillId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedSkills = skills.filter(skill => skill.id !== skillId);
        setSkills(updatedSkills);
      } else {
        throw new Error('Failed to delete skill');
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

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

      // Actualizar la lista de habilidades después del éxito
      setSkills([...skills, data]);

      // Limpiar los campos después del éxito
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      setIsPostSuccess(false);
    }
  };

  return (
    <>
      <div className="titulo-container">
        <h1 className="titulo-texto">Add your skills, ¡Choose the ones that describe you best!</h1>
      </div>
      <div style={styles.container}>
        <div style={styles.buttonContainer}>
          <Link to={`/User/Profile/${currUser.id}/AddProjects`}>
            <button className="buttonForm">BACK</button>
          </Link>
        </div>

        <Form onSubmit={handleSubmit} style={styles.formContainer}>
          <center>
            <h1 className="File"><GiBrain /></h1>
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

        <div style={styles.containerget}>
          {isLoading ? (
            <svg className="svgget" viewBox="25 25 50 50">
              <circle className="circleget" r="20" cy="50" cx="50"></circle>
            </svg>
          ) : (
            userSkills.map((skill) => (
              <p key={skill.id} style={styles.skillItemget}>
                {editingSkillId === skill.id ? (
                  <>
                    <input
                      type="text"
                      value={editedSkillName}
                      onChange={(e) => setEditedSkillName(e.target.value)}
                      style={styles.inputget}
                    />
                    <button onClick={() => handleSaveSkill(skill.id)} style={styles.buttonget}>
                      Guardar
                    </button>
                    <button onClick={() => setEditingSkillId(null)} style={styles.buttonget}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <p style={styles.letraget}>Name: {skill.name}</p>
                    <button onClick={() => handleEditSkill(skill.id)} style={styles.buttonEditget}>
                      Editar
                    </button>
                    <button onClick={() => handleDeleteSkill(skill.id)} style={styles.buttonEliminarget}>
                      Eliminar
                    </button>
                  </>
                )}
              </p>
            ))
          )}
        </div>

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
