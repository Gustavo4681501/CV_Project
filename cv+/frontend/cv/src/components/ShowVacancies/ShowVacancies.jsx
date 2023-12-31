import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShowVacancies.css"; 


/**
 * Component to display available vacancies and allow users to view their requirements.
 * @returns {JSX.Element} Component to view available vacancies.
 */
function ShowVacancies() {
    const [vacancies, setVacancies] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3001/api/available_vacancies"
                );

                if (response.ok) {
                    const vacanciesData = await response.json();
                    const updatedVacancies = await Promise.all(
                        vacanciesData.map(async (vacancy) => {
                            const companyResponse = await fetch(
                                `http://localhost:3001/api/companies/${vacancy.company_id}`
                            );
                            const companyData = await companyResponse.json();
                            return {
                                ...vacancy,
                                companyName: companyData.name 
                            };
                        })
                    );
                    setVacancies(updatedVacancies);
                } else {
                    console.error("Error al obtener vacancies:", response.statusText);
                }
            } catch (error) {
                console.error("Error de red:", error);
            } finally {
                // Once the search is finished, change isLoading state to false
                setIsLoading(false);
            }
        };

        fetchVacancies();
    }, []);

    // Redirect to requirements page for a specific vacancy
    const handleRedirectionToRequirements = (id) => {
        navigate(`${id}/Requirements`);
    };

    return (
        <>
            <div  className="titulo-container">
                <h1 className="titulo-texto">Here you can view the available vacancies and apply to them.</h1>
            </div>
            <div className="vacancyContainer d-flex justify-content-center">
                {isLoading ? ( 
                    <div className="loader"></div>
                ) : (
                    <ul>
                        {vacancies.map((vacancy, index) => (
                            <div className="itemVacancy d-flex justify-content-center m-4" key={index}>
                                <div
                                    className="justify-content-center job-itemVacancy text-center"
                                    onClick={() => handleRedirectionToRequirements(vacancy.id)}
                                >
                                    <h4>Company: <b>{vacancy.companyName}</b></h4> 
                                    <h5>Vacancy name: <b>{vacancy.name}</b></h5>
                                    <p>Vacancy description: <b>{vacancy.description}</b></p>
                                </div>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default ShowVacancies;
