import { Link, Outlet } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Sidebar from "../sidebar/sidebar"
import "./Navbar.css";
import { useParams } from "react-router-dom";

const NavbarComponent = () => {
        const { id } = useParams();

    return (
        <>
        
            <div className="app-container">
            <Sidebar />
            <div className="content">
                <Navbar id="HomeNavbar" bg="dark" data-bs-theme="light">
                  
                
                    <Container>
                        <Navbar.Brand>
                            <Link to="/home/:id">Home</Link>
                        </Navbar.Brand>
                        <Navbar.Brand>
                            <Link to="/Abotus">About us</Link>
                        </Navbar.Brand>
                        <Navbar.Brand>
                            <Link to="/CreateResume">Create resume</Link>
                        </Navbar.Brand>


                        <Nav className="me-auto"></Nav>

                        <Link to="/home">
                            <img
                                src="image/cv_logo.png"
                                alt="Logo"
                                className="logoNavbar"
                            ></img>
                        </Link>
                    </Container>
                </Navbar>
                
                <br/>
                <Outlet />
                </div>
            </div>
        </>
    );
};

export default NavbarComponent;
