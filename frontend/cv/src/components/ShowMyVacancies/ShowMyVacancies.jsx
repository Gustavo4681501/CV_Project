import React, { useEffect, useState } from 'react';
import { useCompany } from '../AccountTypes/CompanyContext';
import { useNavigate } from 'react-router-dom';

function ShowMyVacancies() {
    const { currCompany } = useCompany();
    const [vacancies, setVacancies] = useState([]);
    const [editingVacancyId, setEditingVacancyId] = useState(null);
    const [editedVacancyName, setEditedVacancyName] = useState('');
    const [editedVacancyDescription, setEditedVacancyDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3001/api/available_vacancies`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const filteredVacancies = data.filter(vacancy => String(vacancy.company_id) === String(currCompany.id));
                setVacancies(filteredVacancies);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, [currCompany]);

    const handleRedirectionToRequirements = (id) => {
        navigate(`${id}/Requirements`);
    };

    const handleDeleteVacancy = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/available_vacancies/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedVacancies = vacancies.filter(vacancy => vacancy.id !== id);
                setVacancies(updatedVacancies);
            } else {
                throw new Error('Failed to delete vacancy');
            }
        } catch (error) {
            console.error('Error deleting vacancy:', error);
        }
    };

    const handleEditVacancy = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/available_vacancies/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch vacancy for editing');
            }
            const data = await response.json();
            setEditedVacancyName(data.name);
            setEditedVacancyDescription(data.description);
            // console.log(editedVacancyName)
            // console.log(editedVacancyDescription)
            setEditingVacancyId(id);
        } catch (error) {
            console.error('Error fetching vacancy for editing:', error);
        }
    };

    const handleSaveVacancy = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/available_vacancies/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editedVacancyName,
                    description: editedVacancyDescription,
                }),
            });
            console.log(editedVacancyName,editedVacancyDescription)

            if (response.ok) {
                const updatedVacancies = vacancies.map(vacancy => {
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
                throw new Error('Failed to update vacancy');
            }
        } catch (error) {
            console.error('Error updating vacancy:', error);
        }
    };

    return (
        <div className="bg-body-secondary">
            <h2>Lista de Vacantes de la Compañía</h2>
            <ul>
                {vacancies.map((vacancy, index) => (
                    <div className="d-flex justify-content-center m-4" key={index}>
                        <div className="justify-content-center job-item text-center">
                            {editingVacancyId === vacancy.id ? (
                                <div>
                                    <div className='d-flex justify-content-center row'>
                                    <input
                                        type="text"
                                        value={editedVacancyName}
                                        onChange={(e) => setEditedVacancyName(e.target.value)}
                                    />
                                    <textarea
                                        value={editedVacancyDescription}
                                        onChange={(e) => setEditedVacancyDescription(e.target.value)}
                                    />
                                    </div>
                                    <button onClick={() => handleSaveVacancy(vacancy.id)}>Guardar</button>
                                    <button onClick={() => setEditingVacancyId(null)}>Cancelar</button>
                                </div>
                            ) : (
                                <>
                                    <h3>{vacancy.name}</h3>
                                    <p>{vacancy.description}</p>
                                    <button onClick={() => handleDeleteVacancy(vacancy.id)}>Eliminar</button>
                                    <button onClick={() => handleEditVacancy(vacancy.id)}>Editar</button>
                                    <button onClick={() => handleRedirectionToRequirements(vacancy.id)}>Ver Requisitos</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ShowMyVacancies;
