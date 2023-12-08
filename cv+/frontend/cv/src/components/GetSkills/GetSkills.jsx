import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const styles = {
  containerget: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  skillItemget: {
    marginBottom: '20px',
    padding: '50px',
    background: '#0D477C',
    border: '2px solid black',
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
    background: '#D98200',
    color: '#fff',
    transition: 'background 0.3s ease',
  },
  buttonEditget: {
    margin: '5px 0',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '3px',
    border: '1px solid #ddd',
    background: '#AAAAAA',
    color: '#fff',
    transition: 'background 0.3s ease',
  },
  letraget: {
    color: 'white',
  },
};

const GetSkills = () => {
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

  return (
 
    <div style={styles.containerget}>
      {isLoading ? (
        <svg className="svgget" viewBox="25 25 50 50">
          <circle className="circleget" r="20" cy="50" cx="50"></circle>
        </svg>
      ) : (
        userSkills.map((skill) => (
          <div key={skill.id} style={styles.skillItemget}>
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
          </div>
        ))
      )}
    </div>
 
  );
};

export default GetSkills;

