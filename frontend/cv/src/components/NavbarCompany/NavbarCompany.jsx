import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import SidebarCompany from "../SidebarCompany/SidebarCompany";
import "./NavbarCompany.css";
import { useCompany } from "../AccountTypes/CompanyContext";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import CompanyLogout from "../CompanyLogout/CompanyLogout";
import { IoMdPerson } from "react-icons/io";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";

const NavbarCompany = () => {
    const { currCompany, setCurrCompany } = useCompany();
    const navigate = useNavigate();
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

    

    const handleBackToMenu = (e) => {
        e.preventDefault();
        navigate("/");
    };

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
                
                            <div>
                                <Navbar
                                    id="HomeNavbarCompany"
                                    data-bs-theme="light">
                                    <Container>
                                        <Navbar.Brand>
                                          <Link
                                                to={`/Company/Profile/${currCompany.id}`}
                                                className="emoji-link"
                                            >
                                                <span role="img" aria-label="Home">
                                                    <IoMdPerson />
                                                </span>
                                                <br />
                                                Profile
                                            </Link>
                                             <Link
                                                to={`Company/Profile/${currCompany.id}/ShowMoreUsers`}
                                                className="emoji-link"
                                            >
                                                <span role="img" aria-label="Home">
                                                    <FaUsers />
                                                </span>
                                                <br />
                                                Users
                                            </Link>
                                            <Link
                                                to={`/Company/Profile/${currCompany.id}/CreateJobVacancy`}
                                                className="emoji-link"
                                            >
                                                <span role="img" aria-label="Home">
                                                    <BsBriefcaseFill />
                                                </span>
                                                <br />
                                                Add Vacancy
                                            </Link>

                                            <Link
                                                to={`/Company/Profile/${currCompany.id}/ShowMyVacancies`}
                                                className="emoji-link"
                                            >
                                                <span role="img" aria-label="Home">
                                                    <BsBriefcaseFill />
                                                </span>
                                                <br />
                                                Show my vacancies
                                            </Link>

            
                                           
                    
                                            
                                        </Navbar.Brand>

                                    </Container>
                                        <Navbar.Brand>
                                            {currCompany ? (
                                                <CompanyLogout setCurrCompany={setCurrCompany} />
                                            ) : (
                                                <></>
                                            )}
                                        </Navbar.Brand>

                                        <Link to="/CompanyHome">
                                            <img
                                                src="/image/Image-logo.png"
                                                alt="Logo"
                                                className="logoNavbar"
                                            ></img>
                                        </Link>
                                </Navbar>

                                <br />
                                <div className="m-auto">
                                    <Outlet />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center">
                            <h1>Oh no restricted access, Please log in</h1>
                            <button onClick={handleBackToMenu}>Back to menú</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default NavbarCompany;
