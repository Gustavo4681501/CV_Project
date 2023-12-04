import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ShowProfileUser.css";

const ShowProfileUser = () => {
    const [user, setUser] = useState({});
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/users/${userId}`
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error("Hubo un problema con la petición Fetch:", error);
            }
        };

        fetchUserDetails();
    }, [userId]);

    return (
        <center>

        <div className="resume-container">
            <header className="text-center ">
                <img src="https://i0.wp.com/sangiaophotography.com/wp-content/uploads/2019/01/Fotos-profesionales-para-curriculum-023-20190111-1803.jpg?resize=1024%2C675&ssl=1" alt="" />
                <h1 className="user-info">{`${user.name} ${user.last_name}`}</h1>
                <p className="user-info">Email: {user.email}</p>
            </header>
            <div className="info-container">
                <section className="left-column">
                    <div className="skills">
                        <h2>Skills</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Vestibulum id orci eu urna volutpat luctus.
                        </p>
                    </div>

                    <div className="social-links">
                        <h2>Social Links</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Vestibulum id orci eu urna volutpat luctus.
                        </p>
                    </div>
                </section>

                <section className="right-column">
                    <div className="education">
                        <h2>Education</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Vestibulum id orci eu urna volutpat luctus.
                        </p>
                    </div>

                    <div className="projects">
                        <h2>Projects</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Vestibulum id orci eu urna volutpat luctus.
                        </p>
                    </div>

                    <div className="work-experience">
                        <h2>Work Experience</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Vestibulum id orci eu urna volutpat luctus.
                        </p>
                    </div>
                </section>
            </div>
        </div>
        </center>
    );
};

export default ShowProfileUser;
