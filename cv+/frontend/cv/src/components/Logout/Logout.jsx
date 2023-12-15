import { useNavigate } from "react-router-dom";
import "./Logout.css";

/**
 * Logout component to handle user logout.
 *
 * @param {function} setCurrUser - Function to set current user information.
 * @returns {JSX.Element} Logout button.
 */
const Logout = ({ setCurrUser }) => {
    const navigate = useNavigate();

    /**
     * Function to perform logout action.
     *
     * @param {function} setCurrUser - Function to set current user information.
     * @returns {void}
     */
    const logout = async (setCurrUser) => {
        try {
            const response = await fetch("http://localhost:3001/logout", {
                method: "delete",
                headers: {
                    "content-type": "application/json",
                    authorization: localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            if (!response.ok) throw data.error;
            localStorage.removeItem("token");
            setCurrUser(null);
        } catch (error) {
            console.log("error", error);
        }
    };

    /**
     * Function to handle click event for logout.
     *
     * @param {Event} e - Click event.
     * @returns {void}
     */
    const handleClick = (e) => {
        e.preventDefault();
        logout(setCurrUser);
        navigate("/");
    };

    return (
        <button class="buttonLogout" value='Logout' onClick={handleClick}>

            <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

            <div class="text">Logout</div>
        </button>
    );
};

export default Logout;
