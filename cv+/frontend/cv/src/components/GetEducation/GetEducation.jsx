import React, { useState, useEffect } from 'react';
import './GetEducation.css';
import { useUser } from '../AccountTypes/UserContext';

const GetEducations = ({userId}) => {
  const { currUser } = useUser()

  const [educations, setEducations] = useState([]);
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


  const id = userId? userId : currUser.id;
  const userEducations = educations.filter(education => education.user_id.toString() === id.toString());

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
    <div className="containergets">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        userEducations.map((education) => (
          <div key={education.id} className="Itemget">
            <p className="letraget">Name: {education.name}</p>
            <p className="letraget">Institution: {education.institution_name}</p>
            <p className="letraget">Location: {education.location}</p>
            <p className="letraget">Start date:: {education.start_date}</p>
            <p className="letraget">Finish date: {education.finish_date}</p>
            {id.toString() === currUser.id.toString() ? (
              <>
                {editingEducationId === education.id ? (
                  <>
                    <input
                      type="text"
                      value={editedEducationName}
                      onChange={(e) => setEditedEducationName(e.target.value)}
                      className="inputget"
                    />
                    <input
                      type="text"
                      value={editedEducationInstitution}
                      onChange={(e) => setEditedEducationInstitution(e.target.value)}
                      className="inputget"
                    />
                    <input
                      type="text"
                      value={editedEducationLocation}
                      onChange={(e) => setEditedEducationLocation(e.target.value)}
                      className="inputget"
                    />
                    <input
                      type="date"
                      value={editedEducationStartDate}
                      onChange={(e) => setEditedEducationStartDate(e.target.value)}
                      className="inputget"
                    />
                    <input
                      type="date"
                      value={editedEducationFinishDate}
                      onChange={(e) => setEditedEducationFinishDate(e.target.value)}
                      className="inputget"
                    />
    
                    <button onClick={() => handleSaveEducation(education.id)} className="buttonget">
                      Guardar
                    </button>
                    <button onClick={() => setEditingEducationId(null)} className="buttonget">
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditEducation(education.id)} className="buttonEditget">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteEducation(education.id)} className="buttonEliminarget">
                      Eliminar
                    </button>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default GetEducations;
