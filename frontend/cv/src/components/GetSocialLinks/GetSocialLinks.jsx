import React, { useState, useEffect } from 'react';
import './GetSocialLinks.css';
import { useUser } from '../AccountTypes/UserContext';
import { useCompany } from '../AccountTypes/CompanyContext';

const GetSocialLinks = ({ userId }) => {

  const { currUser } = useUser()

  const { currCompany } = useCompany()


  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [editedLinkUrl, setEditedLinkUrl] = useState('');

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/social_links');

        if (response.ok) {
          const socialLinksData = await response.json();
          setSocialLinks(socialLinksData);
        } else {
          console.error('Error al obtener enlaces sociales:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);
  
  const id = userId? userId : currUser.id ;
  const userSocialLinks = socialLinks.filter(link => link.user_id.toString() === id.toString());

  const handleEditLink = id => {
    const linkToEdit = socialLinks.find(link => link.id === id);
    setEditingLinkId(id);
    setEditedLinkUrl(linkToEdit.url);
  };

  const handleSaveLink = async id => {
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

  const handleDeleteLink = async id => {
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
    <div className="containergets">
      {loading ? (
        <div className="loader"></div>
      ) : (
        userSocialLinks.map(link => (
          <div key={link.id} className="Itemget">
            <p className="letraget">Enlace: {link.url}</p>
            {currCompany? id.toString() === "":id.toString() === currUser.id.toString()?  (
              <>
                {editingLinkId === link.id ? (
                  <>
                    <input
                      type="text"
                      value={editedLinkUrl}
                      onChange={e => setEditedLinkUrl(e.target.value)}
                      className="inputget"
                    />
                    <button onClick={() => handleSaveLink(link.id)} className="buttonget">
                      Guardar
                    </button>
                    <button onClick={() => setEditingLinkId(null)} className="buttonget">
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditLink(link.id)} className="buttonEditget">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteLink(link.id)} className="buttonEliminarget">
                      Eliminar
                    </button>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default GetSocialLinks;
