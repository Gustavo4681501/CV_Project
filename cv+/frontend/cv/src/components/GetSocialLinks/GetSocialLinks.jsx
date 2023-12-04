import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: '#303030',
  },
  linkItem: {
    marginBottom: '20px',
    padding: '10px',
    background: '#929292',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  input: {
    margin: '5px 0',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    marginRight: '10px',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '3px',
    border: '1px solid #ddd',
    background: '#4CAF50',
    color: '#fff',
    transition: 'background 0.3s ease',
  },
  letra: {
    color: 'black',
  },
};

const GetSocialLinks = () => {
  const { id } = useParams();
  const userId = parseInt(id, 10);

  const [socialLinks, setSocialLinks] = useState([]);
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
    <div style={styles.container}>
      
        {userSocialLinks.map((link) => (
          <p key={link.id} style={styles.linkItem}>
            {editingLinkId === link.id ? (
              <>
                <input
                  type="text"
                  value={editedLinkUrl}
                  onChange={(e) => setEditedLinkUrl(e.target.value)}
                  style={styles.input}
                />
                <button onClick={() => handleSaveLink(link.id)} style={styles.button}>
                  Guardar
                </button>
                <button onClick={() => setEditingLinkId(null)} style={styles.button}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <p style={styles.letra}>Enlace: {link.url}</p>
                <button onClick={() => handleDeleteLink(link.id)} style={styles.button}>
                  Eliminar
                </button>
                <button onClick={() => handleEditLink(link.id)} style={styles.button}>
                  Editar
                </button>
              </>
            )}
          </p>
        ))}
     
    </div>
  );
};

export default GetSocialLinks;
