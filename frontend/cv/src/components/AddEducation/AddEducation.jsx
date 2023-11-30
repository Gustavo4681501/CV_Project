import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useUser } from "../AccountTypes/UserContext";
import GetEducations from "../GetEducation/GetEducation";

const AddEducation1 = () => {
  const { currUser } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    institution_name: "",
    location: "",
    start_date: "",
    finish_date: "",
    user_id: currUser.id
  });

  const [isPostSuccess, setIsPostSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Formatear la fecha en el formato "YYYY-MM-DD"
    if (name === "start_date" || name === "finish_date") {
      const formattedDate = new Date(value);
      const year = formattedDate.getFullYear();
      const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
      const day = formattedDate.getDate().toString().padStart(2, '0');
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
      const response = await fetch("http://localhost:3001/api/educations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ education: formData }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar la educación");
      }

      setIsPostSuccess(true);

      setFormData({
        name: "",
        institution_name: "",
        location: "",
        start_date: "",
        finish_date: "",
        user_id: currUser.id
      });

      const data = await response.json();
      console.log("Education añadido con éxito:", data);
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      setIsPostSuccess(false);
    }
  };

  return (
    <div className="d-flex justify-content-center ">
      <Form onSubmit={handleSubmit} className="formContainer">
        <center>
          <h1 className="File">📚</h1>
          <h3>Add Education</h3>
        </center>
        <Form.Group>
          <Form.Label className="title">Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            required
            onChange={handleInputChange}
          />

          <Form.Label className="title">Institution name</Form.Label>
          <Form.Control
            type="text"
            name="institution_name"
            required
            value={formData.institution_name}
            onChange={handleInputChange}
          />

          <Form.Label className="title">Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            required
            value={formData.location}
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
          Add education
        </button>
      <GetEducations />
      </Form>
    </div>
  );
};

export default AddEducation1;


