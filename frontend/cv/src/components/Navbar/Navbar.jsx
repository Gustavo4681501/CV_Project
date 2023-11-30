import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import "./Navbar.css"; // Aquí debes tener tus estilos CSS para el Navbar
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProfilePDF from "../Plantillas/PlantillaUno";
import { useUser } from "../AccountTypes/UserContext";
import Logout from "../Logout/Logout";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const NavbarComponent = () => {
    const { currUser, setCurrUser } = useUser();
    const navigate = useNavigate();

    const location = useLocation();
    const userIdFromURL = location.pathname.split("/")[3];
    const [isLoading, setIsLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);

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

    const handleBackToMenu = (e) => {
        e.preventDefault();
        navigate("/");
    };

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
        console.log(!sidebarOpen);
    };

    return (
        <div
            className={`app-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"
                }`}
        >
            {isLoading ? (
                <div className="text-center">
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                    {currUser && currUser.id.toString() === userIdFromURL ? (
                        <>
                            <Sidebar isOpen={sidebarOpen} toggleSidebar={handleSidebarToggle} />
                            <div className={`content ${sidebarOpen ? "content-open" : "content-closed"}`}>
                                <Navbar
                                    id="HomeNavbar"
                                    bg="dark"
                                    data-bs-theme="light"
                                    className={`${sidebarOpen ? "sidebar-open" : "sidebar-closed"
                                        }`}
                                >
                                    <Container>
                                        <Navbar.Brand>
                                            <Link to={`User/Profile/${currUser.id}/Home`}>Home</Link>
                                        </Navbar.Brand>

                                        <Navbar.Brand>
                                            <Link to={`User/Profile/${currUser.id}/CreateResume1`}>
                                                Create resume1
                                            </Link>
                                        </Navbar.Brand>

                                        <Navbar.Brand>
                                            <Link to={`User/Profile/${currUser.id}/CreateResume2`}>
                                                Create resume2
                                            </Link>
                                        </Navbar.Brand>

                                        <Navbar.Brand>
                                            <Link to={`User/Profile/${currUser.id}/CreateResume3`}>
                                                Create resume3
                                            </Link>
                                        </Navbar.Brand>

                                        <Navbar.Brand>
                                            <Link to={`User/Profile/${currUser.id}/CreateResume4`}>
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

                                        <Navbar.Brand>
                                            {currUser ? <Logout setCurrUser={setCurrUser} /> : <></>}
                                        </Navbar.Brand>

                                        <Nav className="me-auto"></Nav>
                                        <Link to="/home">
                                            <img
                                                src="/image/cv_logo.png"
                                                alt="Logo"
                                                className="logoNavbar"
                                            ></img>
                                        </Link>
                                    </Container>
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

export default NavbarComponent;
