import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useUser } from "../AccountTypes/UserContext";
import { useParams } from "react-router-dom";
import "./AddEducation.css";
import { Link } from "react-router-dom";
import { IoLibrary } from "react-icons/io5";


const AddEducation = () => {
  const { currUser } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    institution_name: "",
    location: "",
    start_date: "",
    finish_date: "",
    user_id: currUser.id,
  });

  const [educations, setEducations] = useState([]);
  const { id } = useParams();
  const userId = parseInt(id, 10);

  const [editingEducationId, setEditingEducationId] = useState(null);
  const [editedEducationName, setEditedEducationName] = useState("");
  const [editedEducationInstitution, setEditedEducationInstitution] =
    useState("");
  const [editedEducationLocation, setEditedEducationLocation] = useState("");
  const [editedEducationStartDate, setEditedEducationStartDate] = useState("");
  const [editedEducationFinishDate, setEditedEducationFinishDate] =
    useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/educations");

        if (response.ok) {
          const educationsData = await response.json();
          setEducations(educationsData);
        } else {
          console.error("Error al obtener educaciones:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEducations();
  }, []);

  const userEducations = educations.filter(
    (education) => education.user_id === userId
  );

  const handleEditEducation = (educationId) => {
    const educationToEdit = userEducations.find(
      (education) => education.id === educationId
    );

    setEditedEducationName(educationToEdit.name);
    setEditedEducationInstitution(educationToEdit.institution_name);
    setEditedEducationLocation(educationToEdit.location);
    setEditedEducationStartDate(educationToEdit.start_date);
    setEditedEducationFinishDate(educationToEdit.finish_date);

    setEditingEducationId(educationId);
  };

  const handleSaveEducation = async (educationId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/educations/${educationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editedEducationName,
            institution_name: editedEducationInstitution,
            location: editedEducationLocation,
            start_date: editedEducationStartDate,
            finish_date: editedEducationFinishDate,
          }),
        }
      );

      if (response.ok) {
        const updatedEducations = educations.map((education) => {
          if (education.id === educationId) {
            return {
              ...education,
              name: editedEducationName,
              institution_name: editedEducationInstitution,
              location: editedEducationLocation,
              start_date: editedEducationStartDate,
              finish_date: editedEducationFinishDate,
            };
          }
          return education;
        });

        // Obtener la nueva lista de educaciones después de guardar
        const updatedResponse = await fetch(
          "http://localhost:3001/api/educations"
        );
        const updatedEducationsData = await updatedResponse.json();

        setEducations(updatedEducationsData);

        setEditingEducationId(null);
      } else {
        throw new Error("Failed to update education");
      }
    } catch (error) {
      console.error("Error updating education:", error);
    }
  };

  const handleDeleteEducation = async (educationId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");

    if (!isConfirmed) {
      return; // Cancelar la eliminación si el usuario no confirma
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/educations/${educationId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedEducations = educations.filter(
          (education) => education.id !== educationId
        );
        setEducations(updatedEducations);
      } else {
        throw new Error("Failed to delete education");
      }
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

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

    if (new Date(formData.finish_date) < new Date(formData.start_date)) {
      alert(
        "La fecha de finalización no puede ser anterior a la fecha de inicio"
      );
      return;
    }

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

      // Obtener la nueva lista de educaciones después de agregar
      const updatedResponse = await fetch(
        "http://localhost:3001/api/educations"
      );
      const updatedEducationsData = await updatedResponse.json();
      setEducations(updatedEducationsData);

      setFormData({
        name: "",
        institution_name: "",
        location: "",
        start_date: "",
        finish_date: "",
        user_id: currUser.id,
      });

      const data = await response.json();
      console.log("Education añadido con éxito:", data);
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      setIsPostSuccess(false);
    }
  };

  return (
    <>
      <div className="titulo-container">
        <h1 className="titulo-texto">
          Add the educations, ¡Add as many as you think are necessary!
        </h1>
      </div>
      <div className="containeradds">
        <div className="buttonContainer">
          <Link to={`/User/Profile/${currUser.id}/AddSkills`}>
            <button className="buttonForm">BACK</button>
          </Link>
        </div>
        <Form onSubmit={handleSubmit} className="formContainer">
          <center>
            <h1 className="File">
              <IoLibrary />
            </h1>
            <h3 className="titlea">Add Education</h3>
          </center>
          <Form.Group>
            <Form.Label className="title">Name</Form.Label>
            <h1 className="subtext">Add the name of your education</h1>
            <Form.Control
              type="text"
              name="name"
              placeholder="Name of education"
              value={formData.name}
              required
              onChange={handleInputChange}
              className="input"
            />

            <Form.Label className="title">Institution name</Form.Label>
            <h1 className="subtext">Add the name of the institution</h1>
            <Form.Control
              type="text"
              name="institution_name"
              placeholder="Institution name"
              required
              value={formData.institution_name}
              onChange={handleInputChange}
              className="input"
            />

            <Form.Label className="title">Location</Form.Label>
            <h1 className="subtext">Add the location</h1>
            <Form.Control
              type="text"
              name="location"
              placeholder="Location"
              required
              value={formData.location}
              onChange={handleInputChange}
              className="input"
            />

            <Form.Label className="title">Start date</Form.Label>
            <Form.Control
              type="Date"
              name="start_date"
              required
              value={formData.start_date}
              onChange={handleInputChange}
              className="input"
              max={new Date().toISOString().split("T")[0]}
            />

            <Form.Label className="title">Finish date</Form.Label>
            <Form.Control
              type="Date"
              name="finish_date"
              required
              value={formData.finish_date}
              onChange={handleInputChange}
              className="input"
              max={new Date().toISOString().split("T")[0]}
            />
          </Form.Group>

          {isPostSuccess && (
            <div className="alert alert-success" role="alert">
              Added successfully
            </div>
          )}

          <button type="submit" className="buttonForm">
            Add education
          </button>
        </Form>

        <div className="containerget">
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            userEducations.map((education) => (
              <p key={education.id} className="Itemadd">
                {editingEducationId === education.id ? (
                  <>
                    <input
                      type="text"
                      value={editedEducationName}
                      onChange={(e) => setEditedEducationName(e.target.value)}
                      className="inputget"
                    />
                    <input
                      type="text"
                      value={editedEducationInstitution}
                      onChange={(e) =>
                        setEditedEducationInstitution(e.target.value)
                      }
                      className="inputget"
                    />
                    <input
                      type="text"
                      value={editedEducationLocation}
                      onChange={(e) =>
                        setEditedEducationLocation(e.target.value)
                      }
                      className="inputget"
                    />
                    <input
                      type="date"
                      value={editedEducationStartDate}
                      onChange={(e) =>
                        setEditedEducationStartDate(e.target.value)
                      }
                      className="inputget"
                      max={new Date().toISOString().split("T")[0]}
                    />
                    <input
                      type="date"
                      value={editedEducationFinishDate}
                      onChange={(e) =>
                        setEditedEducationFinishDate(e.target.value)
                      }
                      className="inputget"
                      max={new Date().toISOString().split("T")[0]}
                    />

                    <button
                      onClick={() => handleSaveEducation(education.id)}
                      className="buttonget"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingEducationId(null)}
                      className="buttonget"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <p className="letraget">Name: {education.name}</p>
                    <p className="letraget">
                      Institution: {education.institution_name}
                    </p>
                    <p className="letraget">Location: {education.location}</p>
                    <p className="letraget">
                      Start date: {education.start_date}
                    </p>
                    <p className="letraget">
                      Finish date: {education.finish_date}
                    </p>
                    <button
                      onClick={() => handleEditEducation(education.id)}
                      className="buttonEditget"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteEducation(education.id)}
                      className="buttonEliminarget"
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </p>
            ))
          )}
        </div>

        <div className="buttonContainer">
          <Link to={`/User/Profile/${currUser.id}/AddWorkExperiences`}>
            <button className="buttonForm">NEXT</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddEducation;
