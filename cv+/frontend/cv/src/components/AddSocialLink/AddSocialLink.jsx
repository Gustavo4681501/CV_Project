import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useUser } from "../AccountTypes/UserContext";
import { Link, useParams } from "react-router-dom";
import { IoShareSocialSharp } from "react-icons/io5";



/**
 * Component for managing social links associated with a user's profile.
 * @component
 * @returns {JSX.Element} - Rendered component.
 */
const AddSocialLink = () => {
  // State for form data and initial form values
  const { currUser } = useUser();
  const initialFormData = {
    url: "",
    user_id: currUser.id,
  };
  const [formData, setFormData] = useState(initialFormData);

  // State for URL parameters
  const { id } = useParams();
  const userId = parseInt(id, 10);

  // State for social links, loading indicator, and edit-related states
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [editedLinkUrl, setEditedLinkUrl] = useState("");
  const [isPostSuccess, setIsPostSuccess] = useState(false);

  /**
   * Effect hook to fetch social links when the component mounts.
   * @function
   * @async
   * @returns {void}
   */
  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/social_links");

        if (response.ok) {
          const socialLinksData = await response.json();
          setSocialLinks(socialLinksData);
        } else {
          console.error(
            "Error fetching social links:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  // Filter social links based on user ID
  const userSocialLinks = socialLinks.filter((link) => link.user_id === userId);

  /**
   * Handles editing a social link by setting the editing states.
   * @function
   * @param {number} id - The ID of the social link to edit.
   * @returns {void}
   */
  const handleEditLink = (id) => {
    const linkToEdit = socialLinks.find((link) => link.id === id);
    setEditingLinkId(id);
    setEditedLinkUrl(linkToEdit.url);
  };

  /**
   * Handles saving an edited social link by making a PATCH request.
   * @function
   * @async
   * @param {number} id - The ID of the social link to save.
   * @returns {void}
   */
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

  /**
   * Handles deleting a social link by making a DELETE request.
   * @function
   * @async
   * @param {number} id - The ID of the social link to delete.
   * @returns {void}
   */
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

  /**
   * Handles input changes in the form.
   * @function
   * @param {Object} e - The event object.
   * @returns {void}
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Handles form submission by making a POST request.
   * @function
   * @async
   * @param {Object} e - The event object.
   * @returns {void}
   */
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
        throw new Error("Failed to create social link");
      }

      setIsPostSuccess(true);

      const data = await response.json();
      console.log("Social link added successfully:", data);

      // After a successful POST, make an additional GET request
      // to get the updated list of social links.
      const updatedResponse = await fetch(
        "http://localhost:3001/api/social_links"
      );
      const updatedSocialLinksData = await updatedResponse.json();
      setSocialLinks(updatedSocialLinksData);

      setFormData(initialFormData);
    } catch (error) {
      console.error("Error making POST request:", error);
      setIsPostSuccess(false);
    }
  };

  // Render the component

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
