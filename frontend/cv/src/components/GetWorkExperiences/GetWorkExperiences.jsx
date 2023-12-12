import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./GetWorkExperience.css";
import { useUser } from '../AccountTypes/UserContext';

const GetWorkExperiences = ({ userId }) => {

  const { currUser } = useUser()

  const [workExperiences, setWorkExperiences] = useState([]);

  const [editingWorkExperienceId, setEditingWorkExperienceId] = useState(null);
  const [editedWorkExperienceName, setEditedWorkExperienceName] = useState('');
  const [editedWorkExperienceDescription, setEditedWorkExperienceDescription] = useState('');
  const [editedWorkExperienceStartDate, setEditedWorkExperienceStartDate] = useState('');
  const [editedWorkExperienceFinishDate, setEditedWorkExperienceFinishDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkExperiences();
  }, []);

  const id = userId ? userId : currUser.id
  const userWorkExperiences = workExperiences.filter(work => work.user_id.toString() === id.toString());

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
    <div className="containergets">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        userWorkExperiences.map((workExperience) => (
          <div key={workExperience.id} className="Itemget">
            <p className="letraget">Nombre: {workExperience.name}</p>
            <p className="letraget">Descripción: {workExperience.description}</p>
            <p className="letraget">Fecha de inicio: {workExperience.start_date}</p>
            <p className="letraget">Fecha de finalización: {workExperience.finish_date}</p>
            {editingWorkExperienceId === workExperience.id ? (
              <>
                <input
                  type="text"
                  value={editedWorkExperienceName}
                  onChange={(e) => setEditedWorkExperienceName(e.target.value)}
                  className="inputget"
                />
                <textarea
                  value={editedWorkExperienceDescription}
                  onChange={(e) => setEditedWorkExperienceDescription(e.target.value)}
                  className="textareaget"
                />
                <input
                  type="date"
                  value={editedWorkExperienceStartDate}
                  onChange={(e) => setEditedWorkExperienceStartDate(e.target.value)}
                  className="inputget"
                />
                <input
                  type="date"
                  value={editedWorkExperienceFinishDate}
                  onChange={(e) => setEditedWorkExperienceFinishDate(e.target.value)}
                  className="inputget"
                />
                <button onClick={() => handleSaveWorkExperience(workExperience.id)} className="buttonget">
                  Guardar
                </button>
                <button onClick={() => setEditingWorkExperienceId(null)} className="buttonget">
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleEditWorkExperience(workExperience.id)} className="buttonEditget">
                  Editar
                </button>
                <button onClick={() => handleDeleteWorkExperience(workExperience.id)} className="buttonEliminarget">
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

export default GetWorkExperiences;
