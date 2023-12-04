import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./GetEducation.css"

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  educationItem: {
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
  button: {
    margin: '5px 0',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '3px',
    border: '1px solid #ddd',
    background: '#c37700',
    color: '#fff',
    transition: 'background 0.3s ease',
  },
  buttonEliminar: {
    margin: '5px 0',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '3px',
    border: '1px solid #ddd',
    background: '#a80000',
    color: '#fff',
    transition: 'background 0.3s ease',
  },
  buttonEdit: {
    margin: '5px 0',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '3px',
    border: '1px solid #ddd',
    background: '#86bc70',
    color: '#fff',
    transition: 'background 0.3s ease',
  },
  letra: {
    color: 'black',
  },
};

const GetEducations = () => {
  const [educations, setEducations] = useState([]);
  const { id } = useParams();
  const userId = parseInt(id, 10);

  const [editingEducationId, setEditingEducationId] = useState(null);
  const [editedEducationName, setEditedEducationName] = useState('');
  const [editedEducationInstitution, setEditedEducationInstitution] = useState('');
  const [editedEducationLocation, setEditedEducationLocation] = useState('');
  const [editedEducationStartDate, setEditedEducationStartDate] = useState('');
  const [editedEducationFinishDate, setEditedEducationFinishDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/educations');

        if (response.ok) {
          const educationsData = await response.json();
          setEducations(educationsData);
        } else {
          console.error('Error al obtener educaciones:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEducations();
  }, []);

  const userEducations = educations.filter(education => education.user_id === userId);

  const handleEditEducation = (educationId) => {
    const educationToEdit = userEducations.find(education => education.id === educationId);

    setEditedEducationName(educationToEdit.name);
    setEditedEducationInstitution(educationToEdit.institution_name);
    setEditedEducationLocation(educationToEdit.location);
    setEditedEducationStartDate(educationToEdit.start_date);
    setEditedEducationFinishDate(educationToEdit.finish_date);

    setEditingEducationId(educationId);
  };

  const handleSaveEducation = async (educationId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/educations/${educationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedEducationName,
          institution_name: editedEducationInstitution,
          location: editedEducationLocation,
          start_date: editedEducationStartDate,
          finish_date: editedEducationFinishDate,
        }),
      });

      if (response.ok) {
        const updatedEducations = educations.map(education => {
          if (education.id === educationId) {
            return {
              ...education,
              name: editedEducationName,
              institution_name: editedEducationInstitution,
              location: editedEducationLocation,
              start_date: editedEducationStartDate,
              finish_date: editedEducationFinishDate,
            };
          }
          return education;
        });

        setEducations(updatedEducations);
        setEditingEducationId(null);
      } else {
        throw new Error('Failed to update education');
      }
    } catch (error) {
      console.error('Error updating education:', error);
    }
  };

  const handleDeleteEducation = async (educationId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/educations/${educationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedEducations = educations.filter(education => education.id !== educationId);
        setEducations(updatedEducations);
      } else {
        throw new Error('Failed to delete education');
      }
    } catch (error) {
      console.error('Error deleting education:', error);
    }
  };

  return (
    <div style={styles.container}>
      {isLoading ? (
        <svg className="svgget" viewBox="25 25 50 50">
          <circle className="circleget" r="20" cy="50" cx="50"></circle>
        </svg>
      ) : (
        userEducations.map((education) => (
          <p key={education.id} style={styles.educationItem}>
            {editingEducationId === education.id ? (
              <>
                <input
                  type="text"
                  value={editedEducationName}
                  onChange={(e) => setEditedEducationName(e.target.value)}
                  style={styles.input}
                />
                {/* Resto de los inputs */}
                <button onClick={() => handleSaveEducation(education.id)} style={styles.button}>
                  Guardar
                </button>
                <button onClick={() => setEditingEducationId(null)} style={styles.button}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <p style={styles.letra}>Name: {education.name}</p>
                {/* Resto de la información */}
                <button onClick={() => handleEditEducation(education.id)} style={styles.buttonEdit}>
                  Editar
                </button>
                <button onClick={() => handleDeleteEducation(education.id)} style={styles.buttonEliminar}>
                  Eliminar
                </button>
              </>
            )}
          </p>
        ))
      )}
    </div>
  );
};

export default GetEducations;
