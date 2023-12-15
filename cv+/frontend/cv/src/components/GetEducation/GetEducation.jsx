import React, { useState, useEffect } from 'react';
import { useUser } from '../AccountTypes/UserContext';
import "../GetsCss/GetsCss.css";
import { useCompany } from '../AccountTypes/CompanyContext';

/**
 * Component for fetching and managing user educations.
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.userId - ID of the user whose educations to retrieve.
 * @returns {JSX.Element} - Rendered component.
 */
const GetEducations = ({ userId }) => {
  const { currUser } = useUser();
  const { currCompany } = useCompany();
  const [educations, setEducations] = useState([]);
  const [editingEducationId, setEditingEducationId] = useState(null);
  const [editedEducationName, setEditedEducationName] = useState('');
  const [editedEducationInstitution, setEditedEducationInstitution] = useState('');
  const [editedEducationLocation, setEditedEducationLocation] = useState('');
  const [editedEducationStartDate, setEditedEducationStartDate] = useState('');
  const [editedEducationFinishDate, setEditedEducationFinishDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Effect hook to fetch educations when the component mounts.
   * @function
   * @async
   * @returns {void}
   */
  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/educations');

        if (response.ok) {
          const educationsData = await response.json();
          setEducations(educationsData);
        } else {
          console.error('Error fetching educations:', response.statusText);
        }
      } catch (error) {
        console.error('Network error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEducations();
  }, []);

  // Determine the user ID based on the prop or current user
  const id = userId ? userId : currUser.id;
  const userEducations = educations.filter(education => education.user_id.toString() === id.toString());

  /**
   * Handles editing an education by setting the editing states.
   * @function
   * @param {number} educationId - The ID of the education to edit.
   * @returns {void}
   */
  const handleEditEducation = (educationId) => {
    const educationToEdit = userEducations.find(education => education.id === educationId);

    setEditedEducationName(educationToEdit.name);
    setEditedEducationInstitution(educationToEdit.institution_name);
    setEditedEducationLocation(educationToEdit.location);
    setEditedEducationStartDate(educationToEdit.start_date);
    setEditedEducationFinishDate(educationToEdit.finish_date);

    setEditingEducationId(educationId);
  };

  /**
   * Handles saving an edited education by making a PATCH request.
   * @function
   * @async
   * @param {number} educationId - The ID of the education to save.
   * @returns {void}
   */
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

  /**
   * Handles deleting an education by making a DELETE request.
   * @function
   * @async
   * @param {number} educationId - The ID of the education to delete.
   * @returns {void}
   */
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

            {currCompany? id.toString() === "":id.toString() === currUser.id.toString()?  (
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
                      Edit
                    </button>
                    <button onClick={() => handleDeleteEducation(education.id)} className="buttonEliminarget">
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

export default GetEducations;
