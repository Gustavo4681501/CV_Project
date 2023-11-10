import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const AddEducation = () => {
  const [formData, setFormData] = useState({
    name: "",
    user_id: 1
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
      const response = await fetch("http://localhost:3020/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skill: formData }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el proyecto");
      }

      const data = await response.json();
      console.log("User creado con éxito:", data);
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={formData.name}
          onChange={handleInputChange}
          name="name"
          type="text"
          placeholder="Enter name"
        />
      </Form.Group>
         
      <Button variant="primary" type="submit">
        Submitttt
      </Button>
    </Form>
  );
};

export default AddEducation;