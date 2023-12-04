import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: '#303030',
  },
  workExperienceItem: {
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
    marginRight: '10px',
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
};

const GetWorkExperiences = () => {
  const [workExperiences, setWorkExperiences] = useState([]);
  const { id } = useParams();
  const userId = parseInt(id, 10);
  const [editingWorkExperienceId, setEditingWorkExperienceId] = useState(null);
  const [editedWorkExperienceName, setEditedWorkExperienceName] = useState('');
  const [editedWorkExperienceDescription, setEditedWorkExperienceDescription] = useState('');
  const [editedWorkExperienceStartDate, setEditedWorkExperienceStartDate] = useState('');
  const [editedWorkExperienceFinishDate, setEditedWorkExperienceFinishDate] = useState('');

  useEffect(() => {
    const fetchWorkExperiences = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/work_experiences");

        if (response.ok) {
          const data = await response.json();
          setWorkExperiences(data);
        } else {
          console.error("Error al obtener experiencias laborales:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchWorkExperiences();
  }, []);

  const userWorkExperiences = workExperiences.filter(work => work.user_id === userId);

  const handleEditWorkExperience = (id) => {
    const workExperienceToEdit = workExperiences.find(work => work.id === id);
    setEditingWorkExperienceId(id);
    setEditedWorkExperienceName(workExperienceToEdit.name);
    setEditedWorkExperienceDescription(workExperienceToEdit.description);
    setEditedWorkExperienceStartDate(workExperienceToEdit.start_date);
    setEditedWorkExperienceFinishDate(workExperienceToEdit.finish_date);
  };

  const handleSaveWorkExperience = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/work_experiences/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedWorkExperienceName,
          description: editedWorkExperienceDescription,
          start_date: editedWorkExperienceStartDate,
          finish_date: editedWorkExperienceFinishDate,
        }),
      });

      if (response.ok) {
        const updatedWorkExperiences = workExperiences.map(work => {
          if (work.id === id) {
            return {
              ...work,
              name: editedWorkExperienceName,
              description: editedWorkExperienceDescription,
              start_date: editedWorkExperienceStartDate,
              finish_date: editedWorkExperienceFinishDate,
            };
          }
          return work;
        });
        setWorkExperiences(updatedWorkExperiences);
        setEditingWorkExperienceId(null);
      } else {
        throw new Error('Failed to update work experience');
      }
    } catch (error) {
      console.error('Error updating work experience:', error);
    }
  };

  const handleDeleteWorkExperience = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/work_experiences/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedWorkExperiences = workExperiences.filter(work => work.id !== id);
        setWorkExperiences(updatedWorkExperiences);
      } else {
        throw new Error('Failed to delete work experience');
      }
    } catch (error) {
      console.error('Error deleting work experience:', error);
    }
  };

  return (
    <div style={styles.container}>
      
        {userWorkExperiences.map((workExperience) => (
          <p key={workExperience.id} style={styles.workExperienceItem}>
            {editingWorkExperienceId === workExperience.id ? (
              <>
                <input
                  type="text"
                  value={editedWorkExperienceName}
                  onChange={(e) => setEditedWorkExperienceName(e.target.value)}
                  style={styles.input}
                />
                <textarea
                  value={editedWorkExperienceDescription}
                  onChange={(e) => setEditedWorkExperienceDescription(e.target.value)}
                  style={styles.textarea}
                />
                <input
                  type="date"
                  value={editedWorkExperienceStartDate}
                  onChange={(e) => setEditedWorkExperienceStartDate(e.target.value)}
                  style={styles.input}
                />
                <input
                  type="date"
                  value={editedWorkExperienceFinishDate}
                  onChange={(e) => setEditedWorkExperienceFinishDate(e.target.value)}
                  style={styles.input}
                />
                <button onClick={() => handleSaveWorkExperience(workExperience.id)} style={styles.button}>
                  Guardar
                </button>
                <button onClick={() => setEditingWorkExperienceId(null)} style={styles.button}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <p style={styles.letra}>Name: {workExperience.name}</p>
                <p style={styles.letra}>Description: {workExperience.description}</p>
                <p style={styles.letra}>Start date: {workExperience.start_date}</p>
                <p style={styles.letra}>Finish date: {workExperience.finish_date}</p>
                <button onClick={() => handleDeleteWorkExperience(workExperience.id)} style={styles.button}>
                  Eliminar
                </button>
                <button onClick={() => handleEditWorkExperience(workExperience.id)} style={styles.button}>
                  Editar
                </button>
              </>
            )}
          </p>
        ))}
      
    </div>
  );
};

export default GetWorkExperiences;
