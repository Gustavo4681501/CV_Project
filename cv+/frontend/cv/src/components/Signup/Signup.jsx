import { useRef } from "react";
import Form from "react-bootstrap/Form";

/**
 * Signup component to handle user registration.
 *
 * @param {function} setCurrUser - Function to set current user information.
 * @param {function} setShow - Function to set state for displaying login.
 * @returns {JSX.Element} Signup form.
 */
const Signup = ({ setCurrUser, setShow }) => {
    const formRef = useRef();

    /**
     * Function to perform user signup.
     *
     * @param {Object} userInfo - User information for signup.
     * @param {function} setCurrUser - Function to set current user information.
     * @returns {void}
     */
    const signup = async (userInfo, setCurrUser) => {
        const url = "http://localhost:3001/signup";
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    "content-type": 'application/json',
                    "accept": "application/json"
                },
                body: JSON.stringify(userInfo)
            });
            const data = await response.json();
            if (!response.ok) throw data.error;
            localStorage.setItem('token', response.headers.get("Authorization"));
            setCurrUser(data);
        } catch (error) {
            console.log("error", error);
        }
    };

    /**
     * Function to handle form submission.
     *
     * @param {Event} e - Form submit event.
     * @returns {void}
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);
        const userInfo = {
            "user": {
                email: data.email,
                password: data.password,
                name: data.name,
                last_name: data.last_name,
                phone_number: data.phone_number
            }
        };
        signup(userInfo, setCurrUser);
        e.target.reset();
    };

    /**
     * Function to handle click event for login.
     *
     * @param {Event} e - Click event.
     * @returns {void}
     */
    const handleClick = (e) => {
        e.preventDefault();
        setShow(true);
    };

    return (
        <div className="d-flex justify-content-center p-5">
            <Form ref={formRef} onSubmit={handleSubmit} className="formContainer">
                {/* SVG icon for signup */}
                <center>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="80"
                        height="80"
                        fill="currentColor"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                    >
                        {/* SVG path for person icon */}
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                </center>
                {/* Form fields for name, last name, phone number, email, and password */}
                <Form.Label className="title">Name:</Form.Label>
                <Form.Control type="text" name='name' placeholder="name" />
                {/* Additional form fields for last name, phone number, email, and password */}
                {/* ... (similar structure for other fields) */}
                <input type='submit' value="Submit" className="buttonForm" />
                <div>
                    Already registered, <a href="#login" onClick={handleClick}>Login</a> here.
                </div>
            </Form>
            <br />
        </div>
    );
};

export default Signup;
