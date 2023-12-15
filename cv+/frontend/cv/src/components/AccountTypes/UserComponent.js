import Signup from "../Signup/Signup";
import Login from '../Login/Login';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * UserComponent responsible for rendering login or signup based on conditions.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.currUser - Current user information.
 * @param {Function} props.setCurrUser - Function to set current user information.
 * @returns {JSX.Element} Rendered component based on conditions.
 */
const UserComponent = ({ currUser, setCurrUser }) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);

    // If there is a logged-in user, show user information and redirect to the user profile
    if (currUser) {
        return (
            <div>
                Hello from User {currUser.email}
                {/* Redirect to the user profile */}
                {navigate(`Profile/${currUser.id}`)}
            </div>
        );
    }

    // If no logged-in user, show login or signup based on the 'show' state
    return (
        <div>
            {/* If 'show' is true, display the login component; otherwise, display the signup component */}
            {show ? (
                <>
                    <Login setCurrUser={setCurrUser} setShow={setShow} />
                </>
            ) : (
                <Signup setCurrUser={setCurrUser} setShow={setShow} />
            )}
        </div>
    );
};

export default UserComponent;
