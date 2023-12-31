import React, { useState, useEffect } from "react";
import "../GetsCss/GetsCss.css";
import { useUser } from '../AccountTypes/UserContext';
import { useCompany } from "../AccountTypes/CompanyContext";

/**
 * Component to display and manage user's work experiences.
 * @param {object} props - Props object containing the user ID.
 * @param {string} props.userId - ID of the user whose work experiences to display.
 * @returns {JSX.Element} Component displaying and managing user's work experiences.
 */
const GetWorkExperiences = ({ userId }) => {
  const { currUser } = useUser()
  const { currCompany } = useCompany()
  const [workExperiences, setWorkExperiences] = useState([]);
  const [editingWorkExperienceId, setEditingWorkExperienceId] = useState(null);
  const [editedWorkExperienceName, setEditedWorkExperienceName] = useState('');
  const [editedWorkExperienceDescription, setEditedWorkExperienceDescription] = useState('');
  const [editedWorkExperienceStartDate, setEditedWorkExperienceStartDate] = useState('');
  const [editedWorkExperienceFinishDate, setEditedWorkExperienceFinishDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch work experiences on component mount
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

  // Filter work experiences based on user ID
  const id = userId ? userId : currUser.id
  const userWorkExperiences = workExperiences.filter(work => work.user_id.toString() === id.toString());


  // Edit work experience
  const handleEditWorkExperience = (id) => {
    const workExperienceToEdit = workExperiences.find(work => work.id === id);
    setEditingWorkExperienceId(id);
    setEditedWorkExperienceName(workExperienceToEdit.name);
    setEditedWorkExperienceDescription(workExperienceToEdit.description);
    setEditedWorkExperienceStartDate(workExperienceToEdit.start_date);
    setEditedWorkExperienceFinishDate(workExperienceToEdit.finish_date);
  };


  // Save edited work experience
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


  // Delete work experience
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

            {currCompany? id.toString() === "":id.toString() === currUser.id.toString()?  (
              <>
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
                      Edit
                    </button>
                    <button onClick={() => handleDeleteWorkExperience(workExperience.id)} className="buttonEliminarget">
                      Delete
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

export default GetWorkExperiences;
