import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./AddSocialLink.css";

const AddSocialLink = () => {
  const initialFormData = {
    url: "",
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
      const response = await fetch("http://localhost:3001/api/social_links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ social_links: formData }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el enlace social");
      }

      setIsPostSuccess(true);

      const data = await response.json();
      console.log("Enlace social agregado con éxito:", data);

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
          <h1 className="File">👩‍💻</h1>
          <h3>Add social link</h3>
        </center>
        <Form.Group>
          <Form.Label className="title">URL</Form.Label>
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

        <br />

        <button type="submit" className="buttonForm">
          Add URL
        </button>
      </Form>
    </div>
  );
};

export default AddSocialLink;
