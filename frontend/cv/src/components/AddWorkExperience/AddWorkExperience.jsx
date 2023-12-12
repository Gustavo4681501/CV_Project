import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useUser } from "../AccountTypes/UserContext";
import "./AddWorkExperiences.css";
import { Link, useParams } from "react-router-dom";
import { GrUserWorker } from "react-icons/gr";



const AddWorkExperience = () => {
  const { currUser } = useUser();
  const initialFormData = {
    name: "",
    description: "",
    start_date: "",
    finish_date: "",
    user_id: currUser.id,
  };

  const [workExperiences, setWorkExperiences] = useState([]);
  const { id } = useParams();
  const userId = parseInt(id, 10);
  const [editingWorkExperienceId, setEditingWorkExperienceId] = useState(null);
  const [editedWorkExperienceName, setEditedWorkExperienceName] = useState("");
  const [editedWorkExperienceDescription, setEditedWorkExperienceDescription] =
    useState("");
  const [editedWorkExperienceStartDate, setEditedWorkExperienceStartDate] =
    useState("");
  const [editedWorkExperienceFinishDate, setEditedWorkExperienceFinishDate] =
    useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkExperiences = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/work_experiences"
        );

        if (response.ok) {
          const data = await response.json();
          setWorkExperiences(data);
        } else {
          console.error(
            "Error al obtener experiencias laborales:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkExperiences();
  }, []);

  const userWorkExperiences = workExperiences.filter(
    (work) => work.user_id === userId
  );

  const handleEditWorkExperience = (id) => {
    const workExperienceToEdit = workExperiences.find((work) => work.id === id);
    setEditingWorkExperienceId(id);
    setEditedWorkExperienceName(workExperienceToEdit.name);
    setEditedWorkExperienceDescription(workExperienceToEdit.description);
    setEditedWorkExperienceStartDate(workExperienceToEdit.start_date);
    setEditedWorkExperienceFinishDate(workExperienceToEdit.finish_date);
  };

  const handleSaveWorkExperience = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/work_experiences/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editedWorkExperienceName,
            description: editedWorkExperienceDescription,
            start_date: editedWorkExperienceStartDate,
            finish_date: editedWorkExperienceFinishDate,
          }),
        }
      );

      if (response.ok) {
        const updatedResponse = await fetch(
          "http://localhost:3001/api/work_experiences"
        );
        const updatedWorkExperiencesData = await updatedResponse.json();
        setWorkExperiences(updatedWorkExperiencesData);

        setEditingWorkExperienceId(null);
      } else {
        throw new Error("Failed to update work experience");
      }
    } catch (error) {
      console.error("Error updating work experience:", error);
    }
  };

  const handleDeleteWorkExperience = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");

    if (!isConfirmed) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/work_experiences/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedWorkExperiences = workExperiences.filter(
          (work) => work.id !== id
        );
        setWorkExperiences(updatedWorkExperiences);
      } else {
        throw new Error("Failed to delete work experience");
      }
    } catch (error) {
      console.error("Error deleting work experience:", error);
    }
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isPostSuccess, setIsPostSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

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
      alert('La fecha de finalización no puede ser anterior a la fecha de inicio');
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3001/api/work_experiences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ work_experience: formData }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear la experiencia laboral");
      }

      setIsPostSuccess(true);

      const data = await response.json();
      console.log("Experiencia laboral creada con éxito:", data);

      // Obtener la nueva lista de experiencias laborales después de agregar
      const updatedResponse = await fetch(
        "http://localhost:3001/api/work_experiences"
      );
      const updatedWorkExperiencesData = await updatedResponse.json();
      setWorkExperiences(updatedWorkExperiencesData);

      setFormData(initialFormData);
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      setIsPostSuccess(false);
    }
  };

  return (
    <>
      <div className="titulo-container">
        <h1 className="titulo-texto">
          ¡Add all your work experiences so companies can see your performance!
        </h1>
      </div>
      <div className="containeradds">
        <div className="buttonContainer">
          <Link to={`/User/Profile/${currUser.id}/AddEducations`}>
            <button className="buttonForm">BACK</button>
          </Link>
        </div>
        <Form onSubmit={handleSubmit} className="formContainer">
          <center>
            <h1 className="File"><GrUserWorker /></h1>
            <h3 className="titlea">Add work experience</h3>
          </center>
          <Form.Group>
            <Form.Label className="title">Work name</Form.Label>
            <h1 className="subtext">Add the name of your past job</h1>
            <Form.Control
              placeholder="Work name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="input"
        
            />

            <Form.Label className="title">Description</Form.Label>
            <h1 className="subtext">Add a brief description about this job</h1>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              required
              value={formData.description}
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

          <br />

          <button type="submit" className="buttonForm">
            Add work experience
          </button>
        </Form>

        <div className="getWorksContainer">
          <div className="containerget">
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              userWorkExperiences.map((workExperience) => (
                <p key={workExperience.id} className="Itemadd">
                  {editingWorkExperienceId === workExperience.id ? (
                    <>
                      <input
                        type="text"
                        value={editedWorkExperienceName}
                        onChange={(e) =>
                          setEditedWorkExperienceName(e.target.value)
                        }
                        className="inputget"
                       
                      />
                      <textarea
                        value={editedWorkExperienceDescription}
                        onChange={(e) =>
                          setEditedWorkExperienceDescription(e.target.value)
                        }
                        className="textareaget"
                      
                      />
                      <input
                        type="date"
                        value={editedWorkExperienceStartDate}
                        onChange={(e) =>
                          setEditedWorkExperienceStartDate(e.target.value)
                        }
                        className="inputget"
                       
                      />
                      <input
                        type="date"
                        value={editedWorkExperienceFinishDate}
                        onChange={(e) =>
                          setEditedWorkExperienceFinishDate(e.target.value)
                        }
                        className="inputget"
                      
                      />
                      <button
                        onClick={() =>
                          handleSaveWorkExperience(workExperience.id)
                        }
                        className="buttonget"
                       
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingWorkExperienceId(null)}
                         className="buttonget"
                       
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="letraget">
                        Nombre: {workExperience.name}
                      </p>
                      <p className="letraget">
                        Descripción: {workExperience.description}
                      </p>
                      <p className="letraget">
                        Fecha de inicio: {workExperience.start_date}
                      </p>
                      <p className="letraget">
                        Fecha de finalización: {workExperience.finish_date}
                      </p>
                      <button
                        onClick={() =>
                          handleEditWorkExperience(workExperience.id)
                        }
                        className="buttonEditget"
                       
                      >
                        Editar
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteWorkExperience(workExperience.id)
                        }
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
        </div>

        <div className="buttonContainer">
          <Link to={`/User/Profile/${currUser.id}/AddSocialLinks`}>
            <button className="buttonForm">NEXT</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddWorkExperience;
