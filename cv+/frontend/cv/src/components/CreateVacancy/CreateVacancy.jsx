import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useCompany } from "../AccountTypes/CompanyContext";


const CreateVacancy = ({ formData, handleInputChange, isPostSuccess }) => {

  return (
    <>
      <center>
        <h1 className="File">👷</h1>
        <h3>Create Vacancy</h3>
      </center>
      <Form.Group>
        <Form.Label className="title"> Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleInputChange}
        />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label className="title"> Description </Form.Label>
        <Form.Control
          type="text"
          name="description"
          required
          value={formData.description}
          onChange={handleInputChange}
        />
      </Form.Group>

      {isPostSuccess && (
        <div className="alert alert-success" role="alert">
          Added successfully
        </div>
      )}

      <br />
    </>
  );
};

export default CreateVacancy;
