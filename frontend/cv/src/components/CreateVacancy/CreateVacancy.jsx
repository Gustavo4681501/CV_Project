import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const CreateVacancy = () => {
  const initialFormData = {
    name: "",
    user_id: 1,
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
      const response = await fetch("http://localhost:3001/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skills: formData }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar la skill");
      }

      setIsPostSuccess(true);

      const data = await response.json();
      console.log("Skill agregado con éxito:", data);

      // Limpiar los campos después del éxito
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
          <h1 className="File">🧠</h1>
          <h3>Add Skill</h3>
        </center>
        <Form.Group>
          <Form.Label className="title">Skill</Form.Label>
          <Form.Control
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        {isPostSuccess && (
          <div className="alert alert-success" role="alert">
            Added successfully
          </div>
        )}

        <br />

        <button type="submit" className="buttonForm">
          Add skill
        </button>
      </Form>
    </div>
  );
};

export default CreateVacancy;
