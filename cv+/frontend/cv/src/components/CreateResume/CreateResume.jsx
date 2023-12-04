import {React, useState, useEffect} from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUser } from "../AccountTypes/UserContext";
import { jwtDecode } from "jwt-decode";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProfilePDF from "../Plantillas/PlantillaUno";
import Logout from "../Logout/Logout";

const CreateResume = () => {
      const { currUser, setCurrUser } = useUser();
          const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 60000);

        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const decoded = jwtDecode(token);
                    const userId = decoded.sub;
                    const response = await fetch(
                        `http://localhost:3001/api/users/${userId}`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setCurrUser(data);
                        setIsLoading(false);
                        clearTimeout(timeout);
                    } else {
                        setIsLoading(false);
                    }
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error:", error);
                setIsLoading(false);
            }
        };

        fetchCurrentUser();

        return () => clearTimeout(timeout);
    }, [setCurrUser]);
  return (
    <>
    
    <Navbar.Brand>
        <Link to={`/User/Profile/${currUser.id}/CreateResume1`}>
            Create resume1
        </Link>
    </Navbar.Brand>

    <Navbar.Brand>
        <Link to={`/User/Profile/${currUser.id}/CreateResume2`}>
            Create resume2
        </Link>
    </Navbar.Brand>

    <Navbar.Brand>
        <Link to={`/User/Profile/${currUser.id}/CreateResume3`}>
            Create resume3
        </Link>
    </Navbar.Brand>

    <Navbar.Brand>
        <Link to={`/User/Profile/${currUser.id}/CreateResume4`}>
            Create resume4
        </Link>
    </Navbar.Brand>

    <Navbar.Brand>
        <div>
            <PDFDownloadLink
                document={<ProfilePDF />}
                fileName="mi_documento.pdf"
            >
                {({ loading }) =>
                    loading ? "Loading document..." : "Download resume!"
                }
            </PDFDownloadLink>
        </div>
    </Navbar.Brand>


</>



  )
}

export default CreateResume