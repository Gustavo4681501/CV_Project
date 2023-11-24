import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

function AddRequirement({ formData, handleInputChange, isPostSuccess }) {
    const [requirements, setRequirements] = useState(['']);

    useEffect(() => {
        if (formData.requirements && Array.isArray(formData.requirements)) {
            setRequirements([...formData.requirements]);
        }
    }, [formData.requirements]);

    
    const handleRequirementChange = (index, event) => {
        const newRequirements = [...requirements];
        newRequirements[index] = event.target.value;
        
        
        handleInputChange({ target: { name: "requirements", value: newRequirements } });
        setRequirements(newRequirements);
    };
    
    const handleAddRequirement = () => {
        setRequirements([...requirements, ""]);
    };

    const handleDeleteRequirement = (indexToDelete) => {
        const updatedRequirements = [...requirements];
        updatedRequirements.splice(indexToDelete, 1);
        setRequirements(updatedRequirements);
    };
    
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
