import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./NavbarCompany.css";
import { useCompany } from "../AccountTypes/CompanyContext";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import CompanyLogout from "../CompanyLogout/CompanyLogout";
import { IoMdPerson } from "react-icons/io";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";

/**
 * NavbarCompany - A React component for rendering the navigation bar specific to company profiles.
 * It displays company-related information and provides navigation functionality.
 *
 * @component
 * @example
 * return <NavbarCompany />;
 */
const NavbarCompany = () => {
    // Custom hook for accessing company-related information
    const { currCompany, setCurrCompany } = useCompany();

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // Hook for accessing the current location
    const location = useLocation();

    // Extracting company ID from the URL
    const companyIdFromURL = location.pathname.split("/")[3];

    // State to manage loading status
    const [isLoading, setIsLoading] = useState(true);

    /**
     * useEffect hook to fetch and set the current company's information.
     * It runs once on component mount.
     *
     * @sideeffect
     * @memberof NavbarCompany
     */
    useEffect(() => {
        // Timeout to handle loading state in case of delayed response
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 30000);

        /**
         * Function to fetch the current company's information from the server.
         * It also decodes the JWT token stored in localStorage to get the company ID.
         *
         * @async
         * @function
         * @memberof NavbarCompany
         * @inner
         */
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

        // Fetch the current company's information
        fetchCurrentCompany();

        // Cleanup function to clear the timeout
        return () => clearTimeout(timeout);
    }, [setCurrCompany]);

    /**
     * Function to handle navigation back to the main menu.
     *
     * @function
     * @param {Object} e - The event object.
     * @memberof NavbarCompany
     * @inner
     */
    const handleBackToMenu = (e) => {
        e.preventDefault();
        // Navigate back to the main menu
        navigate("/");
    };

    // Return JSX for the component

    return (
        <div>
            {isLoading ? (
                <div className="text-center">
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                    {currCompany && currCompany.id.toString() === companyIdFromURL ? (
                        <>
                            <Navbar id="HomeNavbarCompany" expand="lg" variant="light">
                                <Container fluid>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="mr-auto">
                                            <Link
                                                to={`/Company/Profile/${currCompany.id}`}
                                                className="emoji-link nav-link"
                                            >
                                                <IoMdPerson />
                                                <br />
                                                Profile
                                            </Link>
                                            <Link
                                                to={`Company/Profile/${currCompany.id}/ShowMoreUsers`}
                                                className="emoji-link nav-link"
                                            >
                                                <FaUsers />
                                                <br />
                                                Users
                                            </Link>
                                            <Link
                                                to={`/Company/Profile/${currCompany.id}/CreateJobVacancy`}
                                                className="emoji-link nav-link"
                                            >
                                                <BsBriefcaseFill />
                                                <br />
                                                Add Vacancy
                                            </Link>
                                            <Link
                                                to={`/Company/Profile/${currCompany.id}/ShowMyVacancies`}
                                                className="emoji-link nav-link"
                                            >
                                                <BsBriefcaseFill />
                                                <br />
                                                Show my vacancies
                                            </Link>
                                        </Nav>
                                    </Navbar.Collapse>
                                    <Nav>
                                        <Link to="/CompanyHome">
                                            <img
                                                src="/image/Image-logo.png"
                                                alt="Logo"
                                                className="logoNavbar"
                                            ></img>
                                        </Link>
                                    </Nav>
                                    <Nav>
                                        <Navbar.Brand>
                                            {currCompany ? (
                                                <CompanyLogout setCurrCompany={setCurrCompany} />
                                            ) : (
                                                <></>
                                            )}
                                        </Navbar.Brand>
                                    </Nav>
                                </Container>
                            </Navbar>

                            <br />
                            <div className="m-auto">
                                <Outlet />
                            </div>
                        </>
                    ) : (
                        <div className="text-center">
                            <h1>Oh no restricted access, Please log in</h1>
                            <button onClick={handleBackToMenu} className="btn btn-primary mt-3">
                                Back to menu
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default NavbarCompany;