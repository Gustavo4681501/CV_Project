import React from "react";
import Form from "react-bootstrap/Form";
import "./CreateVacancy.css";
import { MdOutlineWorkOutline } from "react-icons/md";

/**
 * Component representing a form to create a job vacancy.
 * @param {object} props - Props object containing form data, input change handler, and success flag.
 * @param {object} props.formData - Data related to the job vacancy.
 * @param {Function} props.handleInputChange - Handler for input change events.
 * @param {boolean} props.isPostSuccess - Flag indicating if the post request was successful.
 * @returns {JSX.Element} CreateVacancy component for job vacancy creation.
 */
const CreateVacancy = ({ formData, handleInputChange, isPostSuccess }) => {
  return (
    <>
      <div className="containerVacancy">
        {/* Form for creating a job vacancy */}
        <Form className="containerFormVacancy">
          <center>
            <h1 className="File">
              <MdOutlineWorkOutline />
            </h1>
            <h3>Create Vacancy</h3>
          </center>
          {/* Input field for vacancy name */}
          <Form.Group>
            <Form.Label className="title">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <br />
          {/* Input field for vacancy description */}
          <Form.Group>
            <Form.Label className="title">Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              required
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Display success message if post request was successful */}
          {isPostSuccess && (
            <div className="alert alert-success" role="alert">
              Added successfully
            </div>
          )}
        </Form>
        <br />
      </div>
    </>
  );
};

export default CreateVacancy;
