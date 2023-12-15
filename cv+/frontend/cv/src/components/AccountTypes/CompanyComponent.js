import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyLogin from "../CompanyLogin/CompanyLogin";
import CompanySignup from "../CompanySignup/CompanySignup";
import CompanyLogout from '../CompanyLogout/CompanyLogout';

/**
 * CompanyComponent responsible for rendering company login or signup based on conditions.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.currCompany - Current company information.
 * @param {Function} props.setCurrCompany - Function to set current company information.
 * @returns {JSX.Element} Rendered component based on conditions.
 */
const CompanyComponent = ({ currCompany, setCurrCompany }) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);

    // If there is a logged-in company, show company information and redirect to the company profile
    if (currCompany) {
        return (
            <div>
                Hello {currCompany.email}
                {/* Redirect to the company profile */}
                {navigate(`Profile/${currCompany.id}`)}
                {/* Render CompanyLogout component to handle company logout */}
                <CompanyLogout setCurrCompany={setCurrCompany} />
            </div>
        );
    }

    // If no logged-in company, show company login or signup based on the 'show' state
    return (
        <div>
            {/* If 'show' is true, display the company login component; otherwise, display the company signup component */}
            {show ? (
                <CompanyLogin setCurrCompany={setCurrCompany} setShow={setShow} />
            ) : (
                <CompanySignup setCurrCompany={setCurrCompany} setShow={setShow} />
            )}
        </div>
    );
};

export default CompanyComponent;
