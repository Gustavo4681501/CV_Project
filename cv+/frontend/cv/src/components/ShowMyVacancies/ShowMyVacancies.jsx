// ShowMyVacancies.js
import React, { useEffect, useState } from "react";
import { useCompany } from "../AccountTypes/CompanyContext";
import { useNavigate } from "react-router-dom";
import "./ShowMyVacancies.css";

/**
 * Component to display a list of vacancies belonging to the current company.
 * Allows editing, deleting, and redirection to requirements and applicants.
 * @returns {JSX.Element} Component to display company vacancies.
 */
function ShowMyVacancies() {
  // Component State
  const { currCompany } = useCompany();
  const [vacancies, setVacancies] = useState([]);
  const [editingVacancyId, setEditingVacancyId] = useState(null);
  const [editedVacancyName, setEditedVacancyName] = useState("");
  const [editedVacancyDescription, setEditedVacancyDescription] = useState("");
  const navigate = useNavigate();

  // Fetch vacancies belonging to the current company
  useEffect(() => {
    fetch(`http://localhost:3001/api/available_vacancies`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const filteredVacancies = data.filter(
          (vacancy) => String(vacancy.company_id) === String(currCompany.id)
        );
        setVacancies(filteredVacancies);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, [currCompany]);

   // Delete a vacancy by ID
  const handleDeleteVacancy = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");

    if (!isConfirmed) {
      return; // Cancel the deletion if the user doesn't confirm
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/available_vacancies/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedVacancies = vacancies.filter(
          (vacancy) => vacancy.id !== id
        );
        setVacancies(updatedVacancies);
      } else {
        throw new Error("Failed to delete vacancy");
      }
    } catch (error) {
      console.error("Error deleting vacancy:", error);
    }
  };

  // Fetch a vacancy by ID for editing
  const handleEditVacancy = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/available_vacancies/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch vacancy for editing");
      }
      const data = await response.json();
      setEditedVacancyName(data.name);
      setEditedVacancyDescription(data.description);
      setEditingVacancyId(id);
    } catch (error) {
      console.error("Error fetching vacancy for editing:", error);
    }
  };

  // Save edited vacancy details
  const handleSaveVacancy = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/available_vacancies/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editedVacancyName,
            description: editedVacancyDescription,
          }),
        }
      );

      if (response.ok) {
        const updatedVacancies = vacancies.map((vacancy) => {
          if (vacancy.id === id) {
            return {
              ...vacancy,
              name: editedVacancyName,
              description: editedVacancyDescription,
            };
          }
          return vacancy;
        });
        setVacancies(updatedVacancies);
        setEditingVacancyId(null);
      } else {
        throw new Error("Failed to update vacancy");
      }
    } catch (error) {
      console.error("Error updating vacancy:", error);
    }
  };

  // Redirect to requirements page for a specific vacancy
  const handleRedirectionToRequirements = (id) => {
    navigate(`${id}/Requirements`);
  };

  // Redirect to applicants page for a specific vacancy
  const handleRedirectionToapplicants = (id) => {
    navigate(`${id}/Applicants`);
  };

  return (
    <div className="bg-body-secondary">
      <h2>Lista de Vacantes de la Compañía</h2>
      <ul>
        {vacancies.map((vacancy, index) => (
          <div className="job-item" key={index}>
            {editingVacancyId === vacancy.id ? (
              <div>
                <div className="input-group">
                  <input
                    type="text"
                    value={editedVacancyName}
                    onChange={(e) => setEditedVacancyName(e.target.value)}
                  />
                  <textarea
                    value={editedVacancyDescription}
                    onChange={(e) =>
                      setEditedVacancyDescription(e.target.value)
                    }
                  />
                </div>
                <button onClick={() => handleSaveVacancy(vacancy.id)}>
                  Guardar
                </button>
                <button onClick={() => setEditingVacancyId(null)}>
                  Cancelar
                </button>
              </div>
            ) : (
              <>
                <h3>{vacancy.name}</h3>
                <p>{vacancy.description}</p>
                <button onClick={() => handleDeleteVacancy(vacancy.id)}>
                  Eliminar
                </button>
                <button onClick={() => handleEditVacancy(vacancy.id)}>
                  Editar
                </button>
                <button
                  onClick={() => handleRedirectionToRequirements(vacancy.id)}
                >
                  Ver Requisitos
                </button>
                <button
                  onClick={() => handleRedirectionToapplicants(vacancy.id)}
                >
                  Ver aplicantes
                </button>
              </>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ShowMyVacancies;
