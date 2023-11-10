import { Link, Outlet } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css";

const NavbarComponent = () => {
    return (
        <>
            <div>
                <Navbar id="HomeNavbar" bg="light" data-bs-theme="light">
                    <Container>
                        <Navbar.Brand>
                            <Link to="/home">Home</Link>
                        </Navbar.Brand>
                        <Navbar.Brand>
                            <Link to="/AbousUs">About us</Link>
                        </Navbar.Brand>
                        <Navbar.Brand>
                            <Link to="/LogOut">Log out</Link>
                        </Navbar.Brand>

                        <Nav className="me-auto"></Nav>

                        <Link to="/home">
                            <img
                                src="https://cdn.discordapp.com/attachments/1170480281787039805/1170910456848859207/5650B0BD-CE18-4B0E-83EF-2DEA121C13AE.png?ex=655ac257&is=65484d57&hm=133bd7bad40010ab24c08a388b0f747cf64c9c0a6dcf8f127ad06ce505d03cc5&"
                                alt="Logo"
                                className="PhotoNavbar"
                            ></img>
                        </Link>
                    </Container>
                </Navbar>
                <Outlet />
            </div>
        </>
    );
};

export default NavbarComponent;
