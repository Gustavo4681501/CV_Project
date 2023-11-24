import { Link, Outlet, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import SidebarCompany from "../SidebarCompany/SidebarCompany";
import "./NavbarCompany.css";
import { useCompany } from "../AccountTypes/CompanyContext";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import CompanyLogout from "../CompanyLogout/CompanyLogout";

const NavbarCompany = () => {
    const { currCompany, setCurrCompany } = useCompany();

    const location = useLocation();
    const companyIdFromURL = location.pathname.split("/")[3];
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 30000);


        const fetchCurrentCompany = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const decoded = jwtDecode(token);
                    const companyId = decoded.sub;
                    const response = await fetch(
                        `http://localhost:3001/api/companies/${companyId}`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setCurrCompany(data);
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

        fetchCurrentCompany();

        return () => clearTimeout(timeout);
    }, [setCurrCompany]);

    return (
        <div className="app-container">

            {isLoading ? (
                <div className="m-auto">
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                    {currCompany && currCompany.id.toString() === companyIdFromURL ? (
                        <>
                            <SidebarCompany />
                            <div className="content">
                                <Navbar id="HomeNavbar" bg="dark" data-bs-theme="light">
                                    <Container>
                                        <Navbar.Brand>
                                            <Link to={`/Company/Profile/${currCompany.id}/Home`}>Home</Link>
                                        </Navbar.Brand>

                                        <Navbar.Brand>
                                            {currCompany ? (
                                                <CompanyLogout setCurrCompany={setCurrCompany} />
                                            ) : (
                                                <></>
                                            )}
                                        </Navbar.Brand>
                                        <Nav className="me-auto"></Nav>

                                        <Link to="/CompanyHome">
                                            <img
                                                src="/image/cv_logo.png"
                                                alt="Logo"
                                                className="logoNavbar"
                                            ></img>
                                        </Link>
                                    </Container>
                                </Navbar>

                                <br />
                                <Outlet />
                            </div>
                        </>
                    ) : (
                        <div className="m-auto">
                            <h1>Oh no restricted access, Please log in</h1>
                        </div>
                    )}
                </>
            )}

        </div>
    );
};

export default NavbarCompany;
