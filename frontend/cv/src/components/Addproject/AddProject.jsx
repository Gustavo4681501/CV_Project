import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./Addproject.css"

const AddProject = () => {
    const initialFormData = {
        name: "",
        description: "",
        url: "",
        user_id: 1, // Ajusta el user_id según tus necesidades
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isPostSuccess, setIsPostSuccess] = useState(false);

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
            const response = await fetch("http://localhost:3001/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ project: formData }),
            });

            if (!response.ok) {
                throw new Error("Error al crear el proyecto");
            }

            setIsPostSuccess(true);

            const data = await response.json();
            console.log("Proyecto creado con éxito:", data);

            // Restablecer el formulario después del envío exitoso
            setFormData(initialFormData);
        } catch (error) {
            console.error("Error al realizar la solicitud POST:", error);
            setIsPostSuccess(false);
        }
    };

    return (
        <div className="d-flex justify-content-center ">
            <Form onSubmit={handleSubmit} className="formContainer">
                <center>
                    <h1 className="File">📁</h1>
                    <h3>Add project</h3>
                </center>
                <Form.Group>
                    <Form.Label className="title">Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="title">Description</Form.Label>
                    <Form.Control
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="title">Url</Form.Label>
                    <Form.Control
                        type="text"
                        name="url"
                        required
                        value={formData.url}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {isPostSuccess && (
                    <div className="alert alert-success" role="alert">
                        Added successfully
                    </div>
                )}

                <button type="submit" className="buttonForm">
                    Add project
                </button>
            </Form>
        </div>
    );
};

export default AddProject;
