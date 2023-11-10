import React, { useState } from "react";

const AddProject = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        url: "",
        user_id: 1, // Ajusta el user_id según tus necesidades
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3020/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ project: formData }),
            });

            if (!response.ok) {
                throw new Error("Error al crear el proyecto");
            }

            const data = await response.json();
            console.log("Proyecto creado con éxito:", data);
        } catch (error) {
            console.error("Error al realizar la solicitud POST:", error);
        }
    };

    return (
        <div>
            <h1>Crear Proyecto</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Descripción:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    URL:
                    <input
                        type="text"
                        name="url"
                        value={formData.url}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Crear Proyecto</button>
            </form>
        </div>
    );
};

export default AddProject;
