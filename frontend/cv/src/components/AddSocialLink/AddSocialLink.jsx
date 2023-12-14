import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./AddSocialLink.css";
import { useUser } from "../AccountTypes/UserContext";
import { Link, useParams } from "react-router-dom";
import { IoShareSocialSharp } from "react-icons/io5";



const AddSocialLink = () => {
  const { currUser } = useUser();
  const initialFormData = {
    url: "",
    user_id: currUser.id,
  };

  const { id } = useParams();
  const userId = parseInt(id, 10);

  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [editedLinkUrl, setEditedLinkUrl] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [isPostSuccess, setIsPostSuccess] = useState(false);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/social_links");

        if (response.ok) {
          const socialLinksData = await response.json();
          setSocialLinks(socialLinksData);
        } else {
          console.error(
            "Error al obtener enlaces sociales:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  const userSocialLinks = socialLinks.filter((link) => link.user_id === userId);

  const handleEditLink = (id) => {
    const linkToEdit = socialLinks.find((link) => link.id === id);
    setEditingLinkId(id);
    setEditedLinkUrl(linkToEdit.url);
  };

  const handleSaveLink = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/social_links/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: editedLinkUrl,
          }),
        }
      );

      if (response.ok) {
        const updatedSocialLinks = socialLinks.map((link) => {
          if (link.id === id) {
            return {
              ...link,
              url: editedLinkUrl,
            };
          }
          return link;
        });
        setSocialLinks(updatedSocialLinks);
        setEditingLinkId(null);
      } else {
        throw new Error("Failed to update social link");
      }
    } catch (error) {
      console.error("Error updating social link:", error);
    }
  };

  const handleDeleteLink = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");

    if (!isConfirmed) {
      return; 
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/social_links/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedSocialLinks = socialLinks.filter((link) => link.id !== id);
        setSocialLinks(updatedSocialLinks);
      } else {
        throw new Error("Failed to delete social link");
      }
    } catch (error) {
      console.error("Error deleting social link:", error);
    }
  };

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
        body: JSON.stringify({ social_link: formData }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el enlace social");
      }

      setIsPostSuccess(true);

      const data = await response.json();
      console.log("Enlace social agregado con éxito:", data);

      // Después de un POST exitoso, realiza una solicitud GET adicional
      // para obtener la lista actualizada de enlaces sociales.
      const updatedResponse = await fetch(
        "http://localhost:3001/api/social_links"
      );
      const updatedSocialLinksData = await updatedResponse.json();
      setSocialLinks(updatedSocialLinksData);

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
          ¡Add your social links so that companies can view you!
        </h1>
      </div>
      <div className="containeradds">
        <div className="buttonContainer">
          <Link to={`/User/Profile/${currUser.id}/AddWorkExperiences`}>
            <button className="buttonFormNext">BACK</button>
          </Link>
        </div>
        <Form onSubmit={handleSubmit} className="formContainer">
          <center>
            <h1 className="File"><IoShareSocialSharp /></h1>
            <h3 className="titlea">Add social link</h3>
          </center>
          <Form.Group>
            <Form.Label className="title">URL</Form.Label>
            <h1 className="subtext">Add your social link</h1>
            <Form.Control
              placeholder="Url"
              type="url"
              name="url"
              required
              value={formData.url}
              onChange={handleInputChange}
              className="input"
            
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

        <div className="buttonContainer">
          <div className="containerget">
            {loading ? (
              <div className="loader"></div>
            ) : (
              userSocialLinks.map((link) => (
                <p key={link.id} className="Itemadd">
                  {editingLinkId === link.id ? (
                    <>
                      <input
                        type="text"
                        value={editedLinkUrl}
                        onChange={(e) => setEditedLinkUrl(e.target.value)}
                        className="inputget"
                      
                      />
                      <button
                        onClick={() => handleSaveLink(link.id)}
                        className="buttonget"
                      
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingLinkId(null)}
                        className="buttonget"
                      
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="letraget">Enlace: {link.url}</p>
                      <button
                        onClick={() => handleEditLink(link.id)}
                        className="buttonEditget"
                      
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteLink(link.id)}
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
          <Link to={`/User/Profile/${currUser.id}/Resumes`}>
            <button className="buttonFormNext">VIEW RESUMES</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddSocialLink;
