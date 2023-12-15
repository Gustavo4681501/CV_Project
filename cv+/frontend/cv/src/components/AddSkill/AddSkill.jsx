import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useUser } from "../AccountTypes/UserContext";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GiBrain } from "react-icons/gi";



/**
 * Functional component for managing user skills.
 *
 * @returns {JSX.Element} JSX representation of the AddSkill component.
 */
const AddSkill = () => {
  // State variable for managing the list of skills
  const [skills, setSkills] = useState([]);
// Destructure the 'id' parameter from the URL using React Router's useParams hook
const { id } = useParams();
console.log("ESTEEEE ES EL IDDDDDDD", id);

// Parse the 'id' into an integer using parseInt with base 10
const userId = parseInt(id, 10);
  
  // State variables for managing editing state
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editedSkillName, setEditedSkillName] = useState('');
  
  // State variable for managing loading state
  const [isLoading, setIsLoading] = useState(true);

  // Effect to fetch skills data when the component mounts
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/skills');

        if (response.ok) {
          const skillsData = await response.json();
          setSkills(skillsData);
        } else {
          console.error('Error fetching skills:', response.statusText);
        }
      } catch (error) {
        console.error('Network error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Filter skills based on the current user
  const userSkills = skills.filter(skill => skill.user_id === userId);

  /**
   * Handles the initiation of editing a skill.
   *
   * @param {number} skillId - The ID of the skill to edit.
   * @returns {void}
   */
  const handleEditSkill = (skillId) => {
    const skillToEdit = userSkills.find(skill => skill.id === skillId);
    setEditedSkillName(skillToEdit.name);
    setEditingSkillId(skillId);
  };

  /**
   * Handles the save operation for an edited skill.
   *
   * @param {number} skillId - The ID of the skill to save.
   * @returns {void}
   */
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

  /**
   * Handles the deletion of a skill.
   *
   * @param {number} skillId - The ID of the skill to delete.
   * @returns {void}
   */
  const handleDeleteSkill = async (skillId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");

    if (!isConfirmed) {
      return; // Cancel deletion if the user does not confirm
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

  // Form data and state for POST operation
  const { currUser } = useUser();
  const initialFormData = {
    name: "",
    user_id: currUser.id,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isPostSuccess, setIsPostSuccess] = useState(false);

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
   * Handles the submission of the skill form.
   *
   * @param {object} e - The event object representing the form submission.
   * @returns {void}
   */
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
        throw new Error("Error adding skill");
      }

      setIsPostSuccess(true);

      const data = await response.json();
      console.log("Skill added successfully:", data);

      // Update skills list after successful addition
      setSkills([...skills, data]);

      // Reset form data after successful submission
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error making POST request:", error);
      setIsPostSuccess(false);
    }
  };

  // JSX structure for the AddSkill component

  return (
    <>
      <div className="titulo-container">
        <h1 className="titulo-texto">Add your skills, ¡Choose the ones that describe you best!</h1>
      </div>
      <div className="containeradds">
        <div className="buttonContainer">
          <Link to={`/User/Profile/${currUser.id}/AddProjects`}>
            <button className="buttonFormNext">BACK</button>
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
            <button className="buttonFormNext">
              NEXT
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddSkill;
