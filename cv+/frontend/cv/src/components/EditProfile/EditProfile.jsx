import React, { useState, useEffect } from 'react';
import { useUser } from '../AccountTypes/UserContext';
import './EditProfile.css';
import Profile from '../Profile/Profile';

const EditProfile = () => {
  const { currUser } = useUser();
  const [userData, setUserData] = useState({
    name: '',
    last_name: '',
    phone_number: '',
    avatar: null,
    avatar_url: '', // Agregar el campo para almacenar la URL del avatar
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${currUser.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);

        
        const avatarResponse = await fetch(`http://localhost:3001/api/users/${currUser.id}/avatar`);
        if (avatarResponse.ok) {
          const avatarData = await avatarResponse.json();
          setUserData((prevUserData) => ({
            ...prevUserData,
            avatar_url: avatarData.avatar_url || '', // si no hay ruta de avatar se asigna con dos comillas vacias
          }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [currUser]);


  const handleInputChange = (event) => {
    const { name, type } = event.target;

    if (type === 'file') {
      const file = event.target.files[0];

      if (file) {
        if (file.type.startsWith('image/')) {
          setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: file,
            avatar: file,
          }));
        } else {
          alert('Please select a valid image file.');
          event.target.value = '';
        }
      }
    } else {
      const { value } = event.target;
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    }
  };

  const handleSaveUserInfo = async () => {
    try {
      const formData = new FormData();
      formData.append('user[name]', userData.name);
      formData.append('user[last_name]', userData.last_name);
      formData.append('user[phone_number]', userData.phone_number);
      if (userData.avatar) {
        formData.append('user[avatar]', userData.avatar);
      }

      const response = await fetch(`http://localhost:3001/api/users/${currUser.id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log('User information updated:', updatedUser);
        setNotification('User information updated successfully!');
      } else {
        throw new Error('Failed to update user information');
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  return (
    <>
    <div className='containerProfile'>
    <div className="profile-container text-center">
      <div className="profile-header-form">
        <h1 className="titleform">Edit User Profile</h1>
      </div>
      <div className="profile-form">
        {notification && <p className="notification">{notification}</p>}
            {userData.avatar_url && (
              <img className="profile-picture" src={userData.avatar_url} alt="User Profile" />
            )}
        <form className="formprincipal">
          <label className="labelform">
            Name:
            <input
              className="inputform"
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
          </label>
          <label className="labelform">
            Last Name:
            <input
              className="inputform"
              type="text"
              name="last_name"
              value={userData.last_name}
              onChange={handleInputChange}
            />
          </label>
          <label className="labelform">
            Phone Number:
            <input
              className="inputform"
              type="text"
              name="phone_number"
              value={userData.phone_number}
              onChange={handleInputChange}
            />
          </label>
          <label className="labelform">
            Profile Picture:
            <input
              className="inputform"
              type="file"
              name="photo"
              onChange={handleInputChange}
            />
          </label>
          <br />
          <div className="profile-details">
            <button className="buttonform" type="button" onClick={handleSaveUserInfo}>
              Save User Information
            </button>
          </div>
        </form> <br />
      </div>
      <div className='gets'>
        <Profile />
      </div>
    </div>
      </div>
      </>

  );
};

export default EditProfile;