import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ShowProfileUser.css";
import { useUser } from "../AccountTypes/UserContext";
import { useCompany } from "../AccountTypes/CompanyContext";
import EditProfile from "../EditProfile/EditProfile";

const ShowProfileUser = () => {
    const [comments, setComments] = useState([]);
    const [commentBody, setCommentBody] = useState("");
    const { userId } = useParams();
    const { currUser } = useUser();
    const { currCompany } = useCompany();
    console.log("SOY EL USERID DE LA RUTA EN ShowProfileUser", userId);

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
    }, [userId]);

    console.log(userId);
    return (
        <center>
            {userId && <EditProfile userId={userId} />}

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
