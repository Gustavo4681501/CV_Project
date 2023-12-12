import React, { useState, useEffect } from "react";
import { useUser } from "../AccountTypes/UserContext";
import "./EditProfile.css";
import Profile from "../Profile/Profile";


const EditProfile = ({ userId }) => {
  const { currUser } = useUser();
  const [userData, setUserData] = useState({
    name: "",
    last_name: "",
    phone_number: "",
    avatar: null,
    avatar_url: "",
  });
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const id = userId? userId : currUser.id ;
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/users/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);

        const avatarResponse = await fetch(
          `http://localhost:3001/api/users/${id}/avatar`
        );
        if (avatarResponse.ok) {
          const avatarData = await avatarResponse.json();
          setUserData((prevUserData) => ({
            ...prevUserData,
            avatar_url: avatarData.avatar_url || "", // si no hay ruta de avatar se asigna con dos comillas vacias
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchUserData();
  }, [currUser]);

  const handleInputChange = (event) => {
    const { name, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];

      if (file) {
        if (file.type.startsWith("image/")) {
          setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: file,
            avatar: file,
          }));
        } else {
          alert("Please select a valid image file.");
          event.target.value = "";
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
      formData.append("user[name]", userData.name);
      formData.append("user[last_name]", userData.last_name);
      formData.append("user[phone_number]", userData.phone_number);
      if (userData.avatar) {
        formData.append("user[avatar]", userData.avatar);
      }

      const response = await fetch(
        `http://localhost:3001/api/users/${currUser.id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("User information updated:", updatedUser);
        setNotification("User information updated successfully!");
      } else {
        throw new Error("Failed to update user information");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
    window.location.reload();
  };



  const handleDeleteAvatar = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/${currUser.id}/destroy_avatar`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          avatar_url: "", // Actualizar el avatar_url a vacío después de eliminar la imagen
        }));
        setNotification("User avatar deleted successfully!");
      } else {
        throw new Error("Failed to delete user avatar");
      }
    } catch (error) {
      console.error("Error deleting user avatar:", error);
    }
  };


  return (
    <>
      <div className="containerProfile">
        <div className="profile-container text-center">
          <div className="profile-header-form">
            <h1 className="titleform">Edit User Profile</h1>
          </div>
          <div className="profile-form">
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
              <br />
              {notification && <p className="notification">{notification}</p>}
              <div>
                {isLoading ? (
                  <span className="loader-foto"></span>
                ) : (
                  <>
                    <h4 className="text-white">Profile Picture:</h4>
                    {userData.avatar_url ? (
                      <div>
                        <img
                          className="profile-picture"
                          src={userData.avatar_url}
                          alt="User Profile"
                        />
                        <div>
                          <br />
                          {id.toString() === currUser.id.toString()? (
                            <>
                              <button
                                className="buttonform"
                                type="button"
                                onClick={handleDeleteAvatar}
                              >
                                Delete Profile Picture
                              </button>
                              <label className="labelform">
                                <input
                                  className="inputform"
                                  type="file"
                                  name="photo"
                                  onChange={handleInputChange}
                                />
                              </label>
                              <br />
                              <div className="profile-details">
                                <button
                                  className="buttonProfilesave"
                                  type="button"
                                  onClick={handleSaveUserInfo}
                                >
                                  Save User Information
                                </button>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="200"
                        height="200"
                        fill="white"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      ><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" /> <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" /></svg>)}</>)}
              </div>
            </form>
            <br />
          </div>
          <div className="gets">
            <Profile userId={userId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
