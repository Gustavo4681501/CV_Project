import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { jwtDecode } from "jwt-decode";

const Login = ({ setCurrUser, setShow }) => {
  const formRef = useRef();
  const navigate = useNavigate(); // Declara useNavigate para redirigir

  const login = async (userInfo, setCurrUser) => {
    const url = "http://localhost:3001/login";
    try {
      const response = await fetch(url, {
        method: "post",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      if (!response.ok) throw data.error;
      localStorage.setItem("token", response.headers.get("Authorization"));
      setCurrUser(data);

      // Redirige al usuario al 'Home' después de iniciar sesión exitosamente

    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: { email: data.email, password: data.password },
    };
    login(userInfo, setCurrUser);
    e.target.reset();
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(false);
  };


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      // Assuming the decoded token contains the user's ID in a 'sub' property
      const userId = decoded.sub;
      // Fetch the user data from your API
      fetch(`http://localhost:3001/api/users/${userId}`)
        .then(response => response.json())
        .then(data => {
          // Set the current user in your application's state
          setCurrUser(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [setCurrUser]);

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
        <input type="submit" value="Login" />
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
