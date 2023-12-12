import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./AddSkill.css";
import { useUser } from "../AccountTypes/UserContext";
import { useParams } from 'react-router-dom';
import GetSkills from "../GetSkills/GetSkills";
import { Link } from 'react-router-dom';
import { GiBrain } from "react-icons/gi";

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

      
      setSkills([...skills, data]);

      
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
      <div className="containeradds">
        <div className="buttonContainer">
          <Link to={`/User/Profile/${currUser.id}/AddProjects`}>
            <button className="buttonForm">BACK</button>
          </Link>
        </div>

        <Form onSubmit={handleSubmit} className="formContainer">
          <center>
            <h1 className="File"><GiBrain /></h1>
            <h3 className="titlea">Add Skill</h3>
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
              className="input"
            
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

        <div className="containerget">
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            userSkills.map((skill) => (
              <p key={skill.id} className="Itemadd">
                {editingSkillId === skill.id ? (
                  <>
                    <input
                      type="text"
                      value={editedSkillName}
                      onChange={(e) => setEditedSkillName(e.target.value)}
                      className="inputget"
                
                    />
                    <button onClick={() => handleSaveSkill(skill.id)} className="buttonget">
                      Guardar
                    </button>
                    <button onClick={() => setEditingSkillId(null)} className="buttonget">
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <p className="letraget" >Name: {skill.name}</p>
                    <button onClick={() => handleEditSkill(skill.id)} className="buttonEditget">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteSkill(skill.id)} className="buttonEliminarget">
                      Eliminar
                    </button>
                  </>
                )}
              </p>
            ))
          )}
        </div>

        <div className="buttonContainer">
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
