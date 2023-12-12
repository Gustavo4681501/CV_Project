import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GetEducations from '../GetEducation/GetEducation';

const ShowApplicants = () => {
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const vacancyId = useParams();
    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/available_vacancies/${vacancyId.id}/show_applicants`);
                if (response.ok) {
                    const data = await response.json();
                    setApplicants(data);
                    setLoading(false);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching applicants:', error);
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [vacancyId]);

    return (
        <div>
            <h2>Usuarios que aplicaron a la vacante:</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <ul>
                    {applicants.map(applicant => (
                        <li key={applicant.id}>
                            {applicant.name} {applicant.last_name} - {applicant.email} - {applicant.phone_number}
                        </li>
                    ))}
                    
                </ul>

            )}
        </div>
    );
};

export default ShowApplicants;
