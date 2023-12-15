import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
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

/**
 * NavbarComponent - A React component for rendering the application's navigation bar.
 * It displays user-related information and provides navigation functionality.
 *
 * @component
 * @example
 * return <NavbarComponent />;
 */
const NavbarComponent = () => {
    // Custom hook for accessing user-related information
    const { currUser, setCurrUser } = useUser();
    
    // Hook for programmatic navigation
    const navigate = useNavigate();
  
    // Hook for accessing the current location
    const location = useLocation();
  
    // Extracting user ID from the URL
    const userIdFromURL = location.pathname.split("/")[3];
  
    // State to manage loading status
    const [isLoading, setIsLoading] = useState(true);
  
    /**
     * useEffect hook to fetch and set the current user's information.
     * It runs once on component mount.
     * 
     * @sideeffect
     * @memberof NavbarComponent
     */
    useEffect(() => {
      // Timeout to handle loading state in case of delayed response
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 60000);
  
      /**
       * Function to fetch the current user's information from the server.
       * It also decodes the JWT token stored in localStorage to get the user ID.
       * 
       * @async
       * @function
       * @memberof NavbarComponent
       * @inner
       */
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
  
      // Fetch the current user's information
      fetchCurrentUser();
  
      // Cleanup function to clear the timeout
      return () => clearTimeout(timeout);
    }, [setCurrUser]);
  
    /**
     * Function to handle navigation back to the main menu.
     *
     * @function
     * @param {Object} e - The event object.
     * @memberof NavbarComponent
     * @inner
     */
    const handleBackToMenu = (e) => {
      e.preventDefault();
      // Navigate back to the main menu
      navigate("/");
    };
  
    // Return JSX for the component


    return (
        <div className="content container-fluid">
            {isLoading ? (
                <div className="text-center mt-5">
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                    {currUser && currUser.id.toString() === userIdFromURL ? (
                        <>
                            <Navbar id="HomeNavbar" data-bs-theme="light" expand="lg">
                                <Container fluid>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="mr-auto">
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
                                        </Nav>
                                    </Navbar.Collapse>
                                        <Nav>
                                            
                                            <Link to={`User/Profile/${currUser.id}/Profile`}>
                                                <img
                                                    src="/image/Image-logo.png"
                                                    alt="Logo"
                                                    className="logoNavbar"
                                                ></img>
                                            </Link>
                                        </Nav>
                                        <Nav>
                                            <Navbar.Brand>
                                                {currUser ? <Logout setCurrUser={setCurrUser} /> : <></>}
                                            </Navbar.Brand>
                                        </Nav>
                                </Container>
                            </Navbar>
                            <div className="mt-3">
                                <Outlet />
                            </div>
                        </>
                    ) : (
                        <div className="text-center mt-5">
                            <h1>Restricted access, please log in</h1>
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

export default NavbarComponent;