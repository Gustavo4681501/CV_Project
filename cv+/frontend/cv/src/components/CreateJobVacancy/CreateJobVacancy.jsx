import React, { useState } from "react";
import { useCompany } from "../AccountTypes/CompanyContext";
import Form from "react-bootstrap/Form";
import CreateVacancy from "../CreateVacancy/CreateVacancy";
import AddRequirement from "../AddRequirement/AddRequirement";

/**
 * Component responsible for creating a job vacancy form.
 * @returns {JSX.Element} Job vacancy creation form component.
 */
function CreateJobVacancy() {
    const { currCompany } = useCompany();
    const [isPostSuccess, setIsPostSuccess] = useState(false);
    const initialVacancyData = {name: "", description: "", company_id: currCompany.id,};
    const initialRequirementData = { requirement: "", available_vacancy_id: "" };
    const [vacancyData, setVacancyData] = useState(initialVacancyData);
    const [requirementData, setRequirementData] = useState(initialRequirementData);
    const resetRequirementData = { ...requirementData, requirements: [''] };
    

    /**
     * Handles input changes for the form fields.
     * @param {Event} e - The event object.
     * @param {Function} setFormData - Function to set form data state.
     * @param {Object} formData - Current form data state.
     */
    const handleInputChange = (e, setFormData, formData) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const postData = async (url, formData) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Error al agregar los datos: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Datos agregados con éxito:", data);

            return data;
        } catch (error) {
            console.error("Error al realizar la solicitud POST:", error);
            throw error;
        }
    };
    /**
     * Sends POST request to the API endpoint to create job vacancy.
     * @param {Event} e - The event object.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const urlCreateVacancy = "http://localhost:3001/api/available_vacancies";
            const responseCreateVacancy = await postData(urlCreateVacancy, {
                available_vacancy: vacancyData,
            });

            if (responseCreateVacancy) {
                const { id } = responseCreateVacancy;

                if (requirementData.requirements && requirementData.requirements.length > 0) {
                    for (const req of requirementData.requirements) {
                        const responseAddRequirement = await postData(
                            "http://localhost:3001/api/requirements",
                            {
                                requirement: { requirement: req, available_vacancy_id: id },
                            }
                        );

                        if (!responseAddRequirement) {
                            setIsPostSuccess(false);
                            return; 
                        }
                    }

                    setVacancyData(initialVacancyData);
                    setRequirementData(resetRequirementData);
                    setIsPostSuccess(true);
                } else {
                    setVacancyData(initialVacancyData);
                    setIsPostSuccess(true);
                }
            } else {
                setIsPostSuccess(false);
            }
        } catch (error) {
            setIsPostSuccess(false);
        }
    };

    return (
        <div className="d-flex justify-content-center">
        {/* Form container */}
        <Form onSubmit={handleSubmit} className="formContainer">
            {/* CreateVacancy component */}
            <CreateVacancy
                formData={vacancyData}
                handleInputChange={(e) =>
                    handleInputChange(e, setVacancyData, vacancyData)
                }
                isPostSuccess={isPostSuccess}
            />
            {/* AddRequirement component */}
            <AddRequirement
                formData={requirementData}
                handleInputChange={(e) =>
                    handleInputChange(e, setRequirementData, requirementData)
                }
                isPostSuccess={isPostSuccess}
            />
            {/* Submit button */}
            <button type="submit" className="buttonForm">
                Submit
            </button>
        </Form>
    </div>
    );
}

export default CreateJobVacancy;
