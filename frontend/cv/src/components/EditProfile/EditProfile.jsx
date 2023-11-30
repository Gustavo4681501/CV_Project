// EditProfile.js

import React, { useState, useEffect } from 'react';
import { useUser } from '../AccountTypes/UserContext';
import './EditProfile.css';

const EditProfile = () => {
  const { currUser } = useUser();
  const [userData, setUserData] = useState({
    name: '',
    last_name: '',
    phone_number: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${currUser.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [currUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${currUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log('User updated:', updatedUser);
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="profile-container text-center">
      <div className="profile-header-form">
        <h1 className='titleform'>Edit User Profile</h1>
      </div>
      <div className="profile-form">
        <form className='formprincipal'>
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

          <br />
          <button className="buttonform" type="button" onClick={handleUpdateUser}>
            Save Changes
          </button>
        <div className="profile-details">
      <h1>Name: {userData.name}</h1>
      <h1>Last name: {userData.last_name}</h1>
      <h1>Phone: {userData.phone_number}</h1>
    </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
