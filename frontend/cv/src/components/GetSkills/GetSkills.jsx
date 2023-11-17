import React, { useState, useEffect } from 'react';
import { Document, Page, Text } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';

const GetSkills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                
                const response = await fetch('http://localhost:3001/api/skills}');
                

                if (response.ok) {
                    const projectsData = await response.json();
                    setSkills(projectsData);
                } else {
                    console.error('Error al obtener proyectos:', response.statusText);
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
                {skills.map((skill) => (
                    <p key={skill.id}>{skill.name}</p>
                ))}
            </ul>
        </div>
    );
};

export default GetSkills;