
import { Link, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavbarComponent = () => {

    return <div>
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
                <Navbar.Brand><Link to="/AbousUs">About us</Link></Navbar.Brand>
                <Navbar.Brand><Link to="/Login">Login</Link></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link><Link to="/profile"></Link></Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <Outlet />
    </div>
}

export default NavbarComponent