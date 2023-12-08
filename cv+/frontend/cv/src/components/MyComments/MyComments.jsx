import React, { useState, useEffect } from "react";
import { useUser } from "../AccountTypes/UserContext";
import "./MyComments.css";
const MyComments = () => {
    const [comments, setComments] = useState([]);
    const { currUser } = useUser();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/users/${currUser.id}/comments`
                );
                if (response.ok) {
                    const data = await response.json();
                    setComments(data);
                } else {
                    throw new Error("Error al obtener los comentarios");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    console.log(comments);
    return (
        <div className="comments-container">
            <h2 className="comments-heading">Mis comentarios</h2>
            <ul className="comments-list">
                {comments ? (
                    <div>
                        {comments.map((comment) => (
                            <li key={comment.id} className="comment-item">
                                {comment.body} - {comment.date && comment.date.split('.')[0].replace('T', ' Time:')}
                            </li>
                        ))}
                    </div>
                ) : (
                    <p>No Comments yet</p>
                )}
            </ul>
        </div>
    );
};

export default MyComments;
