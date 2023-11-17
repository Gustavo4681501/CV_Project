import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const AddWorkExperience = () => {
  const initialFormData = {
    name: "",
    description: "",
    start_date: "",
    finish_date: "",
    user_id: 1,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isPostSuccess, setIsPostSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Formatear la fecha en el formato "YYYY-MM-DD"
    if (name === "start_date" || name === "finish_date") {
      const formattedDate = new Date(value);
      const year = formattedDate.getFullYear();
      const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
      const day = formattedDate.getDate().toString().padStart(2, "0");
      const formattedDateString = `${year}-${month}-${day}`;

      setFormData({
        ...formData,
        [name]: formattedDateString,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/work_experiences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ work_experiences: formData }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la experiencia laboral");
      }

      setIsPostSuccess(true);

      const data = await response.json();
      console.log("Experiencia laboral creada con éxito:", data);

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
          <h1 className="File">👷</h1>
          <h3>Add work experience</h3>
        </center>
        <Form.Group>
          <Form.Label className="title">Work name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
          />

          <Form.Label className="title">Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            required
            value={formData.description}
            onChange={handleInputChange}
          />

          <Form.Label className="title">Start date</Form.Label>
          <Form.Control
            type="Date"
            name="start_date"
            required
            value={formData.start_date}
            onChange={handleInputChange}
          />

          <Form.Label className="title">Finish date</Form.Label>
          <Form.Control
            type="Date"
            name="finish_date"
            required
            value={formData.finish_date}
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
          Add work experience
        </button>
      </Form>
    </div>
  );
};

export default AddWorkExperience;
