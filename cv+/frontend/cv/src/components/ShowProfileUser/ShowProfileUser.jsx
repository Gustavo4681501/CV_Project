import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ShowProfileUser.css";
import { useUser } from "../AccountTypes/UserContext";
import { useCompany } from "../AccountTypes/CompanyContext";

const ShowProfileUser = () => {
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const [commentBody, setCommentBody] = useState("");
    const { userId } = useParams();
    const { currUser } = useUser();
    const { currCompany } = useCompany();

    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/users/${userId}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const userData = await response.json();
            setUser(userData);
        } catch (error) {
            console.error("Hubo un problema con la petición Fetch:", error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/users/${userId}/comments`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const commentsData = await response.json();
            setComments(commentsData || []);
        } catch (error) {
            console.error("Hubo un problema con la petición Fetch:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentDate = new Date();
            let commentData = {
                comment: {
                    body: commentBody,
                    date: currentDate.toLocaleString(),
                },
            };

            if (currUser) {
                commentData.comment.user_id = currUser.id;
            } else if (currCompany) {
                commentData.comment.company_id = currCompany.id;
            }

            const response = await fetch(
                `http://localhost:3001/api/users/${userId}/comments`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(commentData),
                }
            );
            console.log(commentData);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            await fetchComments();
            setCommentBody("");
        } catch (error) {
            console.error("Hubo un problema con la petición Fetch:", error);
        }
    };

    useEffect(() => {
        fetchComments();
        fetchUserDetails();
    }, [userId]);
    console.log(comments)
    return (
        <center>
            <div className="resume-container">
                <header className="text-center ">
                    <img
                        src="https://i0.wp.com/sangiaophotography.com/wp-content/uploads/2019/01/Fotos-profesionales-para-curriculum-023-20190111-1803.jpg?resize=1024%2C675&ssl=1"
                        alt=""
                    />
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

            <div className="comment-section">
                <h2>Write a Comment</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                        placeholder="Enter your comment here"
                        required
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>


            <div className="comments-section">
                <h2>Comments</h2>
                {comments.length > 0 ? (
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment.id}>
                                <strong>
                                    {comment.user ? (
                                        <span>{comment.user.name}</span>
                                    ) : comment.company ? (
                                        <span>{comment.company.name}</span>
                                    ) : (
                                        <span>Unknown</span>
                                    )}
                                </strong>
                                : {comment.body}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        </center>
    );
};

export default ShowProfileUser;
