// CompanyProfile.js
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
      }
    };

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

  return (
    <div className="profile-container text-center">
      <div className="profile-header">
        <h1>Edit Company Profile</h1>
      </div>
      <div className="profile-form">
        {notification && <p className="notification">{notification}</p>}
        <form>
          <label>
            Company Name:
            <input
              type="text"
              name="name"
              value={companyData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={companyData.description}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              name="phone_number"
              value={companyData.phone_number}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Company Logo:
            <input
              type="file"
              name="avatar"
              onChange={handleInputChange}
            />
            {companyData.avatar_url && (
              <img
                className="company-avatar"
                src={companyData.avatar_url}
                alt="Company Logo"
              />
            )}
          </label>
          <br />
          <button type="button" onClick={handleUpdateCompany}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfile;
