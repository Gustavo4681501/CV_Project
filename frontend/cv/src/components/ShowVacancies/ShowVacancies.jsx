import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ShowVacancies() {
    const [vacancies, setVacancies] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchVacancies = async () => {
            try {

                const response = await fetch('http://localhost:3001/api/available_vacancies');


                if (response.ok) {
                    const vacanciesData = await response.json();
                    setVacancies(vacanciesData);
                } else {
                    console.error('Error al obtener vacancies:', response.statusText);
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };

        fetchVacancies();
    }, []);

    const handleRedirectionToRequirements = (id) => {
        navigate(`${id}/Requirements`)
    };

    return (
        <div className='bg-body-secondary d-flex justify-content-center '>
            <ul className='d-flex flex-wrap m-3 gap-2'>
                {vacancies.map((vacancy, index) => (
                    <div key={index}>
                        <button className="btn btn-secondary" onClick={() => handleRedirectionToRequirements(vacancy.id)}>
                            {vacancy.name}
                        </button>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default ShowVacancies