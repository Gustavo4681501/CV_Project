import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../AccountTypes/UserContext";

const Back = () => {
  const { currUser } = useUser();
  return (
    <>
      <Link to={`/User/Profile/${currUser.id}/Resumes`}>
        <button className="buttonForm">BACK TO RESUMES</button>
      </Link>
      <br />
    </>
  );
};

export default Back;
