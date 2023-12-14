import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import "./Navbar.css"; 
import { useUser } from "../AccountTypes/UserContext";
import Logout from "../Logout/Logout";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { MdWorkHistory } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { FaComments } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { MdAssignmentAdd } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";

const NavbarComponent = () => {
    const { currUser, setCurrUser } = useUser();
    const navigate = useNavigate();

    const location = useLocation();
    const userIdFromURL = location.pathname.split("/")[3];
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

    const handleBackToMenu = (e) => {
        e.preventDefault();
        navigate("/");
    };

    

    return (
        <div className="content">
            {isLoading ? (
                <div>
                    <center>
                        <div className="loader"></div>
                    </center>
                </div>
            ) : (
                <>
                    {currUser && currUser.id.toString() === userIdFromURL ? (
                        <>
                
                            <div>
                                <Navbar
                                    id="HomeNavbar"
                                    data-bs-theme="light">
                                    <Container>
                                        <Navbar.Brand>
                                            <Link
                                                to={`User/Profile/${currUser.id}/Profile`}
                                                className="emoji-link"
                                            >
                                                <span role="img" aria-label="Home">
                                                    <IoMdPerson />
                                                </span>
                                                <br />
                                                Profile
                                            </Link>
                                            <Link
                                                to={`User/Profile/${currUser.id}/Vacancies`}
                                                className="emoji-link"
                                            >
                                                <span role="img" aria-label="Vacancies">
                                                    <MdWorkHistory />
                                                </span>
                                                <br />
                                                Vacancies
                                            </Link>
                                            <Link
                                                to={`User/Profile/${currUser.id}/ShowMoreUsers`}
                                                className="emoji-link"
                                            >
                                                <span role="img" aria-label="Users">
                                                    <FaUserFriends />
                                                </span>
                                                <br />
                                                Users
                                            </Link>

                                            <Link
                                                to={`User/Profile/${currUser.id}/MyComments`}
                                                className="emoji-link"
                                            >
                                                <span role="img" aria-label="Comments">
                                                    <FaComments />
                                                </span>
                                                <br />
                                                Comments
                                            </Link>
                                            <Link
                                                to={`User/Profile/${currUser.id}/AddProjects`}
                                                className="emoji-link"
                                            >
                                                <span role="img" aria-label="Home">
                                                    <MdCreateNewFolder />
                                                </span>
                                                <br />
                                                Add information
                                            </Link>
                                             <Link
                                                to={`User/Profile/${currUser.id}/Resumes`}
                                                className="emoji-link"
                                            >
                                                <span role="img" aria-label="Home">
                                                    <MdAssignmentAdd />
                                                </span>
                                                <br />
                                                Create resume
                                            </Link>
                                        </Navbar.Brand>
                                    </Container>
                                    <Navbar.Brand>
                                        {currUser ? <Logout setCurrUser={setCurrUser} /> : <></>}
                                    </Navbar.Brand>

                                    <Nav className="me-auto"></Nav>
                                    <Link to={`User/Profile/${currUser.id}/Profile`}>
                                        <img
                                            src="/image/Image-logo.png"
                                            alt="Logo"
                                            className="logoNavbar"
                                        ></img>
                                    </Link>
                                </Navbar>

                                <br />
                                <div className="">
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
