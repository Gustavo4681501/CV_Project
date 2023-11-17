import React, { useState, useEffect } from "react";
import { Document, Page, Text } from "@react-pdf/renderer";

const GetProjects = () => {
    
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/projects");

                if (response.ok) {
                    const projectsData = await response.json();
                    setProjects(projectsData);
                } else {
                    console.error("Error al obtener proyectos:", response.statusText);
                }
            } catch (error) {
                console.error("Error de red:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div>
            <ul>
                {projects.map((project, index) => (
                    <li key={index}>
                        <p>Nombre: {project.name}</p>
                        <p>Descripción: {project.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetProjects;
