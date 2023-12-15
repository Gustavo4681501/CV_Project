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

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/comments/${commentId}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            await fetchComments();
        } catch (error) {
            console.error("Hubo un problema con la petición Fetch:", error);
        }
    };

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
                                {(currUser
                                    ? comment.user_id === currUser.id
                                    : "" || currCompany
                                        ? comment.company_id === currCompany.id
                                        : "") && (
                                            
                                            <button className="btn-delete-comment">
                                                <svg
                                            onClick={() => handleDeleteComment(comment.id)}
                                            
                                                    viewBox="0 0 15 17.5"
                                                    height="17.5"
                                                    width="15"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="icon-delete-comment"
                                                >
                                                    <path
                                                        transform="translate(-2.5 -1.25)"
                                                        d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                                                        id="Fill"
                                                    ></path>
                                                </svg>
                                            </button>

                                    )}
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
