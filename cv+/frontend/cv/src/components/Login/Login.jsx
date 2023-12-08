import Form from "react-bootstrap/Form";
import { useRef, useState } from "react";
import axios from 'axios'

const Login = ({ setCurrUser, setShow }) => {
  const formRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null);

  const login = async (userInfo) => { 
    const url = "http://localhost:3001/login";
    try {
      const response = await axios.post(url, userInfo, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        withCredentials: true,
      });

      const data = response.data;
      localStorage.setItem("token", response.headers.authorization);
      setCurrUser(data);
      console.log("Usuario autenticado:", data);
      setErrorMessage(null); 

    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: { email: data.email, password: data.password },
    };
    login(userInfo);
    e.target.reset();
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(false);
  };
  
  return (
    <div className="d-flex justify-content-center">
      <Form ref={formRef} onSubmit={handleSubmit} className="formContainer">
        <center>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </center>
        <Form.Label className="title">Email:</Form.Label>
        <Form.Control type="email" name="email" placeholder="email" />
        <br />
        <Form.Label className="title">Password:</Form.Label>
        <Form.Control type="password" name="password" placeholder="password" />
        <br />
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        <input type="submit" value="Login" className="buttonForm" />
        <div>
          Not registered yet,{" "}
          <a href="#signup" onClick={handleClick}>
            Signup
          </a>{" "}
        </div>
      </Form>
      <br />
    </div>
  );
};

export default Login;
