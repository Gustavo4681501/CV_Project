import { Link, Outlet } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import SidebarCompany from "../SidebarCompany/SidebarCompany";
import "./NavbarCompany.css";

const NavbarCompany = () => {
    return (
        <>
        
            <div className="app-container">
            <SidebarCompany />
            <div className="content">
                <Navbar id="HomeNavbar" bg="dark" data-bs-theme="light">
                  
                
                    <Container>
                        <Navbar.Brand>
                            <Link to="/CompanyHome">Home</Link>
                        </Navbar.Brand>
                        {/* <Navbar.Brand>
                            <Link to="/LogOut">Log out</Link>
                        </Navbar.Brand> */}
                        <Navbar.Brand>
                            <Link to="/CreateVacancy">Add vacancy</Link>
                        </Navbar.Brand>


                        <Nav className="me-auto"></Nav>

                        <Link to="/CompanyHome">
                            <img
                                src="https://cdn.discordapp.com/attachments/1170480281787039805/1170910456848859207/5650B0BD-CE18-4B0E-83EF-2DEA121C13AE.png?ex=655ac257&is=65484d57&hm=133bd7bad40010ab24c08a388b0f747cf64c9c0a6dcf8f127ad06ce505d03cc5&"
                                alt="Logo"
                                className="PhotoNavbar"
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

export default NavbarCompany;
