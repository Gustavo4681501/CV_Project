import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import "./ShowMoreUsers.css"

const ShowMoreUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const userData = await response.json();
                setUsers(userData);
            } catch (error) {
                console.error('Hubo un problema con la petición Fetch:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="user-profiles text-center">
            <h2>Lista de Usuarios</h2>
            <div className="profiles">
                {users.map((user) => (
                    <Link key={user.id} to={`ShowProfileUser/${user.id}`} className="profile-link">
                        <div className="profile">
                            <img src={user.photo} alt="Profile" className="profile-image" />
                            <div className="profile-details">
                                <h3>{user.name} {user.last_name}</h3>
                                <p>Email: {user.email}</p>
                                <p>Teléfono: {user.phone_number}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ShowMoreUsers;
