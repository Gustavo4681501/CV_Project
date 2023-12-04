import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ShowVacancyRequirements.css";
import { useCompany } from "../AccountTypes/CompanyContext";
import { useUser } from "../AccountTypes/UserContext";

function ShowVacancyRequirements() {
    const [requirements, setRequirements] = useState([]);
    const [editedRequirement, setEditedRequirement] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [newRequirement, setNewRequirement] = useState("");
    const vacancyId = useParams();
    const { currCompany } = useCompany();
    const { currUser } = useUser();
    const [applied, setApplied] = useState(false);

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
            }
        };
        fetchRequirements();
    }, [vacancyId]);

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

    useEffect(() => {
        const fetchApplicationStatus = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/available_vacancies/${vacancyId.id}/check_application`
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
    }, [vacancyId]);

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

    const handleUnapply = async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/available_vacancies/${vacancyId.id}/unapply/${currUser.id}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                setApplied(false);
                console.log("Se ha desaplicado exitosamente de la vacante");
            } else {
                throw new Error("No se pudo desaplicar de la vacante");
            }
        } catch (error) {
            console.error("Error al desaplicar de la vacante:", error);
        }
    };

    return (
        <div className="vacancy-requirements">
            <h2>Vacancy Requirements</h2>

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
                <button onClick={applied ? handleUnapply : handleApply}>
                    {applied ? "Desaplicar" : "Aplicar"}
                </button>
            ) : (
                <></>
            )}
        </div>
    );
}

export default ShowVacancyRequirements;
