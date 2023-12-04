import React from "react";
import "./Principal.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Principal = () => {
  return (
    <div id="buttonsLoginContainer">
      <h2 className="PrincipalTitle">Select the type of account</h2>
      <br />
      <Link to="/Company">
        <Button id="PrincipalButton" variant="primary" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40" 
            fill="currentColor"
            className="bi bi-buildings-fill"
            viewBox="0 0 16 16">
            <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V.5ZM2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-1 2v1H2v-1h1Zm1 0h1v1H4v-1Zm9-10v1h-1V3h1ZM8 5h1v1H8V5Zm1 2v1H8V7h1ZM8 9h1v1H8V9Zm2 0h1v1h-1V9Zm-1 2v1H8v-1h1Zm1 0h1v1h-1v-1Zm3-2v1h-1V9h1Zm-1 2h1v1h-1v-1Zm-2-4h1v1h-1V7Zm3 0v1h-1V7h1Zm-2-2v1h-1V5h1Zm1 0h1v1h-1V5Z" />
          </svg> <br />
          Create company account   
        </Button>
      </Link>
      <br />
      <h3 id="PrincipalText">OR</h3>
      <br />
      <Link to="/User">
        <Button id="PrincipalButton" variant="primary" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          ><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /><path fillRule="evenodd"d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg> <br />
          Create user account 
        </Button>
      </Link>
      <br />
    </div>
  );
};

export default Principal;
