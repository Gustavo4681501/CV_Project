import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ShowMoreUsers.css";
import { useUser } from "../AccountTypes/UserContext";

const ShowMoreUsers = ({ userId }) => {
    const [users, setUsers] = useState([]);
    const [avatarData, setAvatarData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const id = userId ? userId : users;
    const { currUser } = useUser();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/users");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const userData = await response.json();
                setUsers(userData);
            } catch (error) {
                console.error("Hubo un problema con la petición Fetch:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchAvatar = async () => {
            // // console.log("consoleeeeeeeeeeeee", ).
            try {
                const response = await fetch(
                    `http://localhost:3001/api/users/all_avatar`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setAvatarData(data);
            } catch (error) {
                console.error("Error fetching avatar:", error);
            }
        };
        fetchAvatar();
    }, [id]);

    return (
        <div className="user-profiles text-center">
            <h2 className="text-white">Lista de Usuarios</h2>
            {isLoading ? (
                <center>
                    <div className="loader"></div>
                </center>
            ) : (
                <div className="profiles ">
                    {id.filter((user) => currUser? user.id !== currUser.id : true )//Si se loguea un user aplica una condicion para filtrarlo de la lista y si no muestra todos
                        .map((user) => {
                            const userAvatar =
                                avatarData &&
                                avatarData.avatars &&
                                avatarData.avatars.find((avatar) => avatar.user_id === user.id);
                            return (
                                <Link
                                    key={user.id}
                                    to={`ShowProfileUser/${user.id}`}
                                    className="profile-link"
                                >
                                    <div className="card-container">
                                        {userAvatar ? (
                                            <>
                                                <img
                                                    className="round profile-pictureUsers"
                                                    src={userAvatar.avatar_url}
                                                    alt="user"
                                                />
                                            </>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="100"
                                                height="100"
                                                fill="white"
                                                className="bi bi-person-circle"
                                                viewBox="0 0 16 16"
                                            >
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                <path
                                                        fillRule="evenodd"
                                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                                                />
                                            </svg>
                                        )}
                                        <div class="profile-details">
                                            <h5>Name: {user.name} {user.last_name}</h5>
                                            <p>Email: {user.email}</p>
                                            <p>Teléfono: {user.phone_number}</p>
                                        </div>
                                        
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            )}
        </div>
    );
};
export default ShowMoreUsers;
