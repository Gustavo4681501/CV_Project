import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const UserCreateAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    photo: "",
    phone_number: "",
    role: 0,
    encrypted_password: "",
    email: "",
    registration_date: new Date().toLocaleDateString()
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
      const response = await fetch("http://localhost:3020/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: formData }),
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

      <Form.Group className="mb-3">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          value={formData.last_name}
          onChange={handleInputChange}
          name="last_name"
          type="text"
          placeholder="Last name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          name="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          value={formData.phone_number}
          onChange={handleInputChange}
          type="text"
          name="phone_number"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={formData.encrypted_password}
          onChange={handleInputChange}
          type="password"
          name="encrypted_password"
          placeholder="Enter email"
        />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submitttt
      </Button>
    </Form>
  );
};

export default UserCreateAccount;
