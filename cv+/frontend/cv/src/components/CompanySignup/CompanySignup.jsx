import Form from "react-bootstrap/Form";
import { useRef } from "react";

/**
 * CompanySignup component for company registration.
 *
 * @param {function} setCurrCompany - Function to set current company information.
 * @param {function} setShow - Function to set show status.
 * @returns {JSX.Element} Company signup form.
 */
const CompanySignup = ({ setCurrCompany, setShow }) => {
    const formRef = useRef();

    /**
     * Function to perform company signup.
     *
     * @param {Object} companyInfo - Company information (email, password).
     * @param {function} setCurrCompany - Function to set current company information.
     * @returns {void}
     */
    const companySignup = async (companyInfo, setCurrCompany) => {
        const url = "http://localhost:3001/companies/signup";
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    "content-type": 'application/json',
                    "accept": "application/json"
                },
                body: JSON.stringify(companyInfo)
            });
            const data = await response.json();
            if (!response.ok) throw data.error;
            localStorage.setItem('token', response.headers.get("Authorization"));
            setCurrCompany(data);
        } catch (error) {
            console.log("error", error);
        }
    };

    /**
     * Function to handle form submission.
     *
     * @param {Event} e - Form submission event.
     * @returns {void}
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);
        const companyInfo = {
            "company": { email: data.email, password: data.password }
        };
        companySignup(companyInfo, setCurrCompany);
        e.target.reset();
    };

    /**
     * Function to handle click event for switching to login.
     *
     * @param {Event} e - Click event.
     * @returns {void}
     */
    const handleClick = (e) => {
        e.preventDefault();
        setShow(true);
    };

    return (
        <div className="d-flex justify-content-center">
            <Form ref={formRef} onSubmit={handleSubmit} className="formContainer">
                <center>
                    {/* SVG icon for company signup */}
                    {/* Replace the SVG path below with your desired company signup icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-buildings-fill" viewBox="0 0 16 16">
                        {/* SVG path for company signup icon */}
                        <path d="M15 ... (SVG path data)" />
                    </svg>
                </center>
                <Form.Label className="title">Email:</Form.Label>
                <Form.Control type="email" name='email' placeholder="email" />
                <br />
                <Form.Label className="title">Password:</Form.Label>
                <Form.Control type="password" name='password' placeholder="password" />
                <br />
                <input type='submit' value="Submit" className="buttonForm" />
                <div>
                    Already registered, <a href="#login" onClick={handleClick}>Login</a> here.
                </div>
            </Form>
            <br />
        </div>
    );
};

export default CompanySignup;
