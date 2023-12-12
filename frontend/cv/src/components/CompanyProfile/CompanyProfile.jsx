import React, { useState, useEffect } from "react";
import { useCompany } from "../AccountTypes/CompanyContext";
import "./CompanyProfile.css";

const CompanyProfile = () => {
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    phone_number: "",
    avatar_url: "", // Campo para almacenar la URL del avatar
  });
  const { currCompany } = useCompany();
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/companies/${currCompany.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch company data");
        }
        const data = await response.json();
        setCompanyData(data);

        const avatarResponse = await fetch(
          `http://localhost:3001/api/companies/${currCompany.id}/avatar`
        );
        if (avatarResponse.ok) {
          const avatarData = await avatarResponse.json();
          setCompanyData((prevCompanyData) => ({
            ...prevCompanyData,
            avatar_url: avatarData.avatar_url || "", // Si no hay ruta de avatar, se asignan comillas vacías
          }));
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchCompanyData();
  }, [currCompany]);

  const handleInputChange = (event) => {
    const { name, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];

      if (file) {
        if (file.type.startsWith("image/")) {
          setCompanyData((prevCompanyData) => ({
            ...prevCompanyData,
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
      setCompanyData((prevCompanyData) => ({
        ...prevCompanyData,
        [name]: value,
      }));
    }
  };

  const handleUpdateCompany = async () => {
    try {
      const formData = new FormData();
      formData.append("company[avatar]", companyData.avatar);
      formData.append("company[name]", companyData.name);
      formData.append("company[description]", companyData.description);
      formData.append("company[phone_number]", companyData.phone_number);

      const response = await fetch(
        `http://localhost:3001/api/companies/${currCompany.id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (response.ok) {
        const updatedCompany = await response.json();
        console.log("Company updated:", updatedCompany);
        setNotification("Company information updated successfully!");
      } else {
        throw new Error("Failed to update company");
      }
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };


  const handleDeleteAvatar = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/companies/${currCompany.id}/destroy_avatar`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setCompanyData((prevCompanyData) => ({
          ...prevCompanyData,
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
                  value={companyData.name}
                  onChange={handleInputChange}
                />
              </label>
              <label className="labelform">
                Phone Number:
                <input
                  className="inputform"
                  type="text"
                  name="phone_number"
                  value={companyData.phone_number}
                  onChange={handleInputChange}
                />
              </label>
              <div>
                <label>
                  Description:
                  <textarea
                    name="description"
                    value={companyData.description}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <br />
              {notification && <p className="notification">{notification}</p>}
              <div>
                {isLoading ? (
                  <span className="loader-foto"></span>
                ) : (
                  <>
                    {companyData.avatar_url ? (
                      <div>
                        <img
                          className="profile-picture"
                          src={companyData.avatar_url}
                          alt="User Profile"
                        />
                        <div>
                          <br />
                          <button
                            className="buttonform"
                            type="button"
                            onClick={handleDeleteAvatar}
                          >
                            Delete Profile Picture
                          </button>
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
              <br />
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
                  className="buttonform"
                  type="button"
                  onClick={handleUpdateCompany}
                >
                  Save Company Information
                </button>
              </div>
            </form>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
