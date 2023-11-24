import React, { useState, useEffect } from 'react';


const GetSkills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                
                const response = await fetch('http://localhost:3001/api/skills');
                

                if (response.ok) {
                    const skillsData = await response.json();
                    setSkills(skillsData);
                } else {
                    console.error('Error al obtener skills:', response.statusText);
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };

        fetchSkills();
    }, []);

    return (
        <div>
            <ul>
                {console.log(skills)}
                {skills.map((skill) => (
                    <p key={skill.id}>{skill.name}</p>

                ))}
            </ul>
        </div>
    );
};

export default GetSkills;