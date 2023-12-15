import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ShowVacancyRequirements.css";
import { useCompany } from "../AccountTypes/CompanyContext";
import { useUser } from "../AccountTypes/UserContext";

/**
 * Component to display vacancy requirements, allowing editing and applying for the vacancy.
 * @returns {JSX.Element} Component to show vacancy requirements.
 */
function ShowVacancyRequirements() {
    const [requirements, setRequirements] = useState([]);
    const [editedRequirement, setEditedRequirement] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [newRequirement, setNewRequirement] = useState("");
    const vacancyId = useParams();
    const { currCompany } = useCompany();
    const { currUser } = useUser();
    const [applied, setApplied] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch vacancy requirements based on the vacancy ID
    useEffect(() => {
        const fetchRequirements = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/available_vacancies/${vacancyId.id}/requirements`
                );

                if (response.ok) {
                    const data = await response.json();
                    setRequirements(data);
                } else {
                    throw new Error("Failed to fetch requirements");
                }
            } catch (error) {
                console.error("Error fetching requirements:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRequirements();
    }, [vacancyId]);

    // Function to delete a requirement for the vacancy
    const handleDeleteRequirement = async (requirementId) => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/available_vacancies/${vacancyId.id}/requirements/${requirementId}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                const updatedRequirements = requirements.filter(
                    (req) => req.id !== requirementId
                );
                setRequirements(updatedRequirements);
            } else {
                throw new Error("Failed to delete requirement");
            }
        } catch (error) {
            console.error("Error deleting requirement:", error);
        }
    };

    // Function to update a requirement for the vacancy
    const handleUpdateRequirement = async (requirementId) => {
        try {
            const requestBody = {
                requirement: editedRequirement,
                available_vacancy_id: vacancyId,
            };

            const response = await fetch(
                `http://localhost:3001/api/available_vacancies/${vacancyId}/requirements/${requirementId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ requirement: requestBody }),
                }
            );

            if (response.ok) {
                const updatedRequirement = await response.json();
                const updatedRequirements = requirements.map((req) => {
                    if (req.id === requirementId) {
                        return updatedRequirement;
                    }
                    return req;
                });
                setRequirements(updatedRequirements);
                setEditingId(null);
                setEditedRequirement("");
            } else {
                throw new Error("Failed to update requirement");
            }
        } catch (error) {
            console.error("Error updating requirement:", error);
        }
    };

    // Set the edited requirement when editing
    useEffect(() => {
        if (editingId !== null) {
            const selectedRequirement = requirements.find(
                (req) => req.id === editingId
            );
            setEditedRequirement(selectedRequirement.requirement);
        } else {
            setEditedRequirement("");
        }
    }, [editingId, requirements]);


    // Function to add a new requirement for the vacancy
    const handleAddRequirement = async () => {
        try {
            const requestBody = {
                requirement: {
                    requirement: newRequirement,
                    available_vacancy_id: vacancyId.id,
                },
            };

            const response = await fetch(
                `http://localhost:3001/api/available_vacancies/${vacancyId}/requirements`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (response.ok) {
                const newRequirementData = await response.json();
                setRequirements([...requirements, newRequirementData]);
                setNewRequirement("");
            } else {
                console.log(requestBody);
                throw new Error("Failed to add requirement");
            }
        } catch (error) {
            console.error("Error adding requirement:", error);
        }
    };

    // Check the application status for the user for the specific vacancy
    useEffect(() => {
        const fetchApplicationStatus = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/available_vacancies/${vacancyId.id}/check_application?user_id=${currUser.id}`
                );
    
                if (response.ok) {
                    setApplied(true);
                } else if (response.status === 404) {
                    setApplied(false);
                } else {
                    console.error(
                        "Error obteniendo estado de aplicación:",
                        response.statusText
                    );
                }
            } catch (error) {
                console.error("Error obteniendo estado de aplicación:", error);
            }
        };
    
        fetchApplicationStatus();
    }, [vacancyId.id]);
    
     // Function to handle applying for from the vacancy
    const handleApply = async () => {
        try {
            const requestBody = {
                user_id: currUser.id,
            };
    
            const response = await fetch(
                `http://localhost:3001/api/available_vacancies/${vacancyId.id}/apply`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );
    
            if (response.ok) {
                setApplied(true);
                console.log("Successfully applied for the vacancy");
            } else {
                throw new Error("Failed to apply for the vacancy");
            }
        } catch (error) {
            console.error("Error applying for the vacancy:", error);
        }
    };
    // Function to handle unaapplying for from the vacancy
    const handleUnapply = async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/available_vacancies/${vacancyId.id}/unapply`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id: currUser.id }),
                }
            );
    
            if (response.ok) {
                setApplied(false);
                console.log("Successfully unapplied from the vacancy");
            } else {
                throw new Error("Failed to unapply from the vacancy");
            }
        } catch (error) {
            console.error("Error unapplying from the vacancy:", error);
        }
    };
    

    return (
        <div className="vacancy-requirements">
    <h2>Vacancy Requirements</h2>

    {isLoading ? (
        <div className="d-flex justify-content-center">
            <div className="loader"></div>
        </div>
    ) : (
        <>
            <div>
                {currCompany ? (
                    <>
                        <input
                            type="text"
                            value={newRequirement}
                            onChange={(e) => setNewRequirement(e.target.value)}
                        />
                        <button onClick={handleAddRequirement}>Añadir</button>
                    </>
                ) : (
                    <></>
                )}
            </div>

            <ul>
                {requirements.map((requirement, index) => (
                    <li key={index}>
                        {editingId === requirement.id ? (
                            <>
                                {currCompany ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedRequirement}
                                            onChange={(e) => setEditedRequirement(e.target.value)}
                                        />
                                        <button
                                            onClick={() => handleUpdateRequirement(requirement.id)}
                                        >
                                            Guardar
                                        </button>
                                    </>
                                ) : (
                                    <h1>Por favor, inicia sesión.</h1>
                                )}
                            </>
                        ) : (
                            <>
                                {currCompany ? (
                                    <>
                                        <button
                                            onClick={() => handleDeleteRequirement(requirement.id)}
                                        >
                                            Eliminar
                                        </button>
                                        <button onClick={() => setEditingId(requirement.id)}>
                                            Editar
                                        </button>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {requirement.requirement}
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {currUser ? (
                <button onClick={applied ? handleUnapply : handleApply} className="">
                    {applied ? "Desaplicar" : "Aplicar"}
                </button>
            ) : (
                <></>
            )}
        </>
    )}
</div>

    );
}

export default ShowVacancyRequirements;
