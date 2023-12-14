import React, { useState, useEffect } from "react";
import { useUser } from "../AccountTypes/UserContext";
import { useCompany } from "../AccountTypes/CompanyContext";
import "./EditProfile.css";
import Profile from "../Profile/Profile";

const EditProfile = ({ userId }) => {
  const { currUser } = useUser();
  const { currCompany } = useCompany();
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  console.log("HOLA SOY EL userId EN EL EditProfile", userId)
  const id = userId ? userId : currUser.id;
  const [userData, setUserData] = useState({
    name: "",
    last_name: "",
    phone_number: "",
    avatar: null,
    avatar_url: "",
  }); 


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${id}`);
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
            avatar_url: avatarData.avatar_url || "",
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
        setIsEditing(false);
      } else {
        throw new Error("Failed to update user information");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
    window.location.reload();
  };

  const handleEditUserInfo = () => {
    setIsEditing(true);
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
          avatar_url: "",
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
              {isEditing ? (
                <>
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
                  <div className="profile-details">
                    <button
                      className="buttonProfilesave"
                      type="button"
                      onClick={handleSaveUserInfo}
                    >
                      Save Changes
                    </button>
                    <button
                      className="buttonProfilecancel"
                      type="button"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-white">
                  <p>Name: {userData.name}</p>
                  <p>Last Name: {userData.last_name}</p>
                  <p>Phone Number: {userData.phone_number}</p>
                  <div className="profile-details">
                  </div>
                </div>
              )}
              <br />
              <div>
                {isLoading ? (
                  <span className="loader-foto"></span>
                ) : (
                  <>
                    {userData.avatar_url ? (
                      <div>
                        <img
                          className="profile-picture"
                          src={userData.avatar_url}
                          alt="User Profile"
                        />
                      </div>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="200"
                        height="200"
                        fill="white"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path
                          fillRule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                        />
                      </svg>
                    )}
                  </>
                )}
                <h4 className="text-white">Profile Picture:</h4>
                <div>
                  <br />
                  {currCompany ? id.toString() === "" : id.toString() === currUser.id.toString() ? (
                    <>
                      <button
                        className="buttonProfileedit"
                        type="button"
                        onClick={handleEditUserInfo}
                      >
                        Edit
                      </button>
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
}
export default EditProfile;
