import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ShowVacancyRequirements() {

    const [requirements, setRequirements] = useState([]);
    const vacancyId = useParams();

    useEffect(() => {
        const fetchRequirements = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/available_vacancies/${vacancyId.id}/requirements`);

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

    return (
        <div>
            <h2>Vacancy Requirements</h2>
            <ul>
                {requirements.map((requirement, index) => (
                    <li key={index}>{requirement.requirement}</li>
                ))}
            </ul>
        </div>
    );
};


export default ShowVacancyRequirements