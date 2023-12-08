import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./AddSocialLink.css";
import { useUser } from "../AccountTypes/UserContext";
import { Link, useParams } from "react-router-dom";
import { IoShareSocialSharp } from "react-icons/io5";

const styles = {
  containerget: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  linkItemget: {
    marginBottom: "20px",
    padding: "10px",
    background: "#929292",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  inputget: {
    margin: "5px 0",
    padding: "8px",
    width: "100%",
    boxSizing: "border-box",
  },
  buttonget: {
    margin: "5px 0",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "3px",
    border: "1px solid #ddd",
    background: "#c37700",
    color: "#fff",
    transition: "background 0.3s ease",
  },
  buttonEliminarget: {
    margin: "5px 0",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "3px",
    border: "1px solid #ddd",
    background: "#a80000",
    color: "#fff",
    transition: "background 0.3s ease",
  },
  buttonEditget: {
    margin: "5px 0",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "3px",
    border: "1px solid #ddd",
    background: "#86bc70",
    color: "#fff",
    transition: "background 0.3s ease",
  },
  letraget: {
    color: "black",
  },
  container: {
    display: "flex",
    maxWidth: "1100px",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: "#00000082",
  },
  formContainer: {
    width: "45%",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: "20px",
  },
  letra: {
    color: "black",
  },
  input: {
    margin: "5px 0",
    padding: "8px",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    margin: "5px 0",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "3px",
    border: "1px solid #ddd",
    transition: "background 0.3s ease",
  },
  title: {
    color: "white",
  },
};

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
      <div style={styles.container}>
        <div style={styles.buttonContainer}>
          <Link to={`/User/Profile/${currUser.id}/AddWorkExperiences`}>
            <button className="buttonForm">BACK</button>
          </Link>
        </div>
        <Form onSubmit={handleSubmit} style={styles.formContainer}>
          <center>
            <h1 className="File"><IoShareSocialSharp /></h1>
            <h3 style={styles.title}>Add social link</h3>
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
              style={styles.input}
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

        <div style={styles.buttonContainer}>
          <div style={styles.containerget}>
            {loading ? (
              <svg className="svgget" viewBox="25 25 50 50">
                <circle className="circleget" r="20" cy="50" cx="50"></circle>
              </svg>
            ) : (
              userSocialLinks.map((link) => (
                <p key={link.id} style={styles.linkItemget}>
                  {editingLinkId === link.id ? (
                    <>
                      <input
                        type="text"
                        value={editedLinkUrl}
                        onChange={(e) => setEditedLinkUrl(e.target.value)}
                        style={styles.inputget}
                      />
                      <button
                        onClick={() => handleSaveLink(link.id)}
                        style={styles.buttonget}
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingLinkId(null)}
                        style={styles.buttonget}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <p style={styles.letraget}>Enlace: {link.url}</p>
                      <button
                        onClick={() => handleEditLink(link.id)}
                        style={styles.buttonEditget}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteLink(link.id)}
                        style={styles.buttonEliminarget}
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

        <div style={styles.buttonContainer}>
          <Link to={`/User/Profile/${currUser.id}/Resumes`}>
            <button className="buttonForm">VIEW RESUMES</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddSocialLink;
