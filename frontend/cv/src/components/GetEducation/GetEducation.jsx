import React, { useState, useEffect } from 'react';

const GetEducations = () => {
    const [educations, setEducations] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/educations');
    
                if (response.ok) {
                    const projectsData = await response.json();
                    setEducations(projectsData);
                } else {
                    console.error('Error al obtener educations:', response.statusText);
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };
    
        fetchProjects();
    }, []);


    return (
        <div>
            <ul>
            {educations.map((education) => (
                <li key={education.id}>
                    <p>Name: {education.name}</p>
                    <p>Institution: {education.institution_name}</p>
                    <p>Location: {education.location}</p>
                    <p>Start date: {education.start_date}</p>
                    <p>Finish date: {education.finish_date}</p>
                    
                </li>
    
))}

               
            </ul>
        </div>
    );
};


export default GetEducations;