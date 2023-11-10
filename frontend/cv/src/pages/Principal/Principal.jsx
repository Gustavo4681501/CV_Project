import React from "react";
import "./Principal.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Principal = () => {
  return (
    <div id="buttonsLoginContainer">
      <h2 className="PrincipalTitle">Choose your account type</h2>
      <br />
      <Link to="/CreateCompanyAccount">
        <Button id="PrincipalButton" variant="primary" type="submit">
          Create company account
        </Button>
      </Link>
      <br />
      <h3 id="PrincipalText">OR</h3>
      <br />
      <Link to="/CreateUserAccount">
        <Button id="PrincipalButton" variant="primary" type="submit">
          Create user account
        </Button>
      </Link>
      <br />
      --------------------------------------------
      <br />
      <h5>¿Already have an account? </h5>
      <Link to="/Login">
        <Button id="PrincipalButtonLogin" variant="primary" type="submit">
          LOG IN
        </Button>
      </Link>
    </div>
  );
};

export default Principal;
