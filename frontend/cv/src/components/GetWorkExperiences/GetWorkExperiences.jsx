import React, { useState, useEffect } from "react";
import { Document, Page, Text } from "@react-pdf/renderer";

const GetWorkExperiences = () => {
    const [workExperience, setWorkExperience] = useState([]);

    useEffect(() => {
        const fetchWorks = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3001/api/work_experiences"
                );

                if (response.ok) {
                    const Data = await response.json();
                    setWorkExperience(Data);
                } else {
                    console.error("Error al obtener proyectos:", response.statusText);
                }
            } catch (error) {
                console.error("Error de red:", error);
            }
        };

        fetchWorks();
    }, []);

    return (
        <div>
            <ul>
                {workExperience.map((workexperience, index) => (
                    <li key={index}>
                        <p>Name:{workexperience.name}</p>
                        <p>Description: {workexperience.description}</p>
                        <p>Start date:{workexperience.start_date}</p>
                        <p>Finish date:{workexperience.finish_date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetWorkExperiences;
