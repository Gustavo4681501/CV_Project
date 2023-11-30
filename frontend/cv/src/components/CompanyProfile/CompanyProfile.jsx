import React, { useState, useEffect } from "react";
import { useCompany } from "../AccountTypes/CompanyContext";
import "./CompanyProfile.css";
const CompanyProfile = () => {
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    phone_number: "",
  });
  const { currCompany } = useCompany();

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
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [currCompany]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  const handleUpdateCompany = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/companies/${currCompany.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ company: companyData }),
        }
      );

      if (response.ok) {
        const updatedCompany = await response.json();
        console.log("Company updated:", updatedCompany);
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
