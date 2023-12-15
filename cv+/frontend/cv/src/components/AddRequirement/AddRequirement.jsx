import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
/**
 * Functional component for adding and managing requirements in a form.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.formData - The form data containing requirements.
 * @param {Function} props.handleInputChange - The function to handle input changes.
 * @param {boolean} props.isPostSuccess - A flag indicating if a post operation was successful.
 *
 * @returns {JSX.Element} JSX representation of the AddRequirement component.
 */
function AddRequirement({ formData, handleInputChange, isPostSuccess }) {
    // State variable for managing the list of requirements
    const [requirements, setRequirements] = useState(['']);

    // Effect to update requirements when form data changes
    useEffect(() => {
        if (formData.requirements && Array.isArray(formData.requirements)) {
            setRequirements([...formData.requirements]);
        }
    }, [formData.requirements]);

    /**
     * Handles the change of a requirement at a specific index.
     *
     * @param {number} index - The index of the requirement to change.
     * @param {object} event - The event object representing the input change.
     * @returns {void}
     */
    const handleRequirementChange = (index, event) => {
        const newRequirements = [...requirements];
        newRequirements[index] = event.target.value;

        handleInputChange({ target: { name: "requirements", value: newRequirements } });
        setRequirements(newRequirements);
    };

    /**
     * Adds a new requirement to the list of requirements.
     *
     * @returns {void}
     */
    const handleAddRequirement = () => {
        setRequirements([...requirements, ""]);
    };

    /**
     * Deletes a requirement from the list at a specific index.
     *
     * @param {number} indexToDelete - The index of the requirement to delete.
     * @returns {void}
     */
    const handleDeleteRequirement = (indexToDelete) => {
        const updatedRequirements = [...requirements];
        updatedRequirements.splice(indexToDelete, 1);
        setRequirements(updatedRequirements);
    };

    /**
     * Renders the list of requirements with input fields and delete buttons.
     *
     * @returns {JSX.Element} JSX representation of the requirements.
     */
    const renderRequirements = () => {
        return requirements.map((requirement, index) => (
            <div key={index}>
                <Form.Group>
                    <Form.Label className="title">Requirement {index + 1}</Form.Label>
                    <Form.Control
                        type="text"
                        value={requirement}
                        onChange={(e) => handleRequirementChange(index, e)}
                    />
                </Form.Group>
                <button type="button" className="btn btn-danger" onClick={() => handleDeleteRequirement(index)}>
                    Delete Requirement
                </button>
                <br />
            </div>
        ));
    };

    // JSX structure for the AddRequirement component
    return (
        <>
            <center>
                <h3>Add Requirements</h3>
            </center>
            {renderRequirements()}
            <br />
            <button type="button" className="btn btn-primary" onClick={handleAddRequirement} >
                Add Requirement
            </button>
            <br />
            {isPostSuccess && (
                <div className="alert alert-success" role="alert">
                    Added successfully
                </div>
            )}
            <br />
        </>
    );
}

export default AddRequirement;
