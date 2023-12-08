import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./GetSocialLinks.css"

const styles = {
  containerget: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  linkItemget: {
    marginBottom: '20px',
    padding: '10px',
    background: '#CCCCCC',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  inputget: {
    margin: '5px 0',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
  },
  buttonget: {
    margin: '5px 0',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '3px',
    border: '1px solid #ddd',
    background: '#c37700',
    color: '#fff',
    transition: 'background 0.3s ease',
  },
  buttonEliminarget: {
    margin: '5px 0',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '3px',
    border: '1px solid #ddd',
    background: '#a80000',
    color: '#fff',
    transition: 'background 0.3s ease',
  },
  buttonEditget: {
    margin: '5px 0',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '3px',
    border: '1px solid #ddd',
    background: '#86bc70',
    color: '#fff',
    transition: 'background 0.3s ease',
  },
  letraget: {
    color: 'black',
  },
};

const GetSocialLinks = () => {
  const { id } = useParams();
  const userId = parseInt(id, 10);

  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [editedLinkUrl, setEditedLinkUrl] = useState('');

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/social_links");

        if (response.ok) {
          const socialLinksData = await response.json();
          setSocialLinks(socialLinksData);
        } else {
          console.error("Error al obtener enlaces sociales:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  const userSocialLinks = socialLinks.filter(link => link.user_id === userId);

  const handleEditLink = (id) => {
    const linkToEdit = socialLinks.find(link => link.id === id);
    setEditingLinkId(id);
    setEditedLinkUrl(linkToEdit.url);
  };

  const handleSaveLink = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/social_links/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: editedLinkUrl,
        }),
      });

      if (response.ok) {
        const updatedSocialLinks = socialLinks.map(link => {
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
        throw new Error('Failed to update social link');
      }
    } catch (error) {
      console.error('Error updating social link:', error);
    }
  };

  const handleDeleteLink = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/social_links/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedSocialLinks = socialLinks.filter(link => link.id !== id);
        setSocialLinks(updatedSocialLinks);
      } else {
        throw new Error('Failed to delete social link');
      }
    } catch (error) {
      console.error('Error deleting social link:', error);
    }
  };

  return (
    <div style={styles.containerget}>
      {loading ? (
               <svg className="svgget" viewBox="25 25 50 50">
          <circle className="circleget" r="20" cy="50" cx="50"></circle>
        </svg>
      ) : (
        userSocialLinks.map((link) => (
          <div key={link.id} style={styles.linkItemget}>
            {editingLinkId === link.id ? (
              <>
                <input
                  type="text"
                  value={editedLinkUrl}
                  onChange={(e) => setEditedLinkUrl(e.target.value)}
                  style={styles.inputget}
                />
                <button onClick={() => handleSaveLink(link.id)} style={styles.buttonget}>
                  Guardar
                </button>
                <button onClick={() => setEditingLinkId(null)} style={styles.buttonget}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <p style={styles.letraget}>Enlace: {link.url}</p>
                <button onClick={() => handleEditLink(link.id)} style={styles.buttonEditget}>
                  Editar
                </button>
                <button onClick={() => handleDeleteLink(link.id)} style={styles.buttonEliminarget}>
                  Eliminar
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default GetSocialLinks;
