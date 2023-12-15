import React, { useState, useEffect } from "react";
import { useUser } from "../AccountTypes/UserContext";
import "./MyComments.css";


/**
 * Component to display a user's comments.
 * @returns {JSX.Element} Component displaying user's comments.
 */
const MyComments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true); 
    const { currUser } = useUser();


    //fetch of comments associated with a user
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
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, [currUser]); 

    return (
        <div className="comments-container">
            <h2 className="comments-heading">Mis comentarios</h2>
            {loading ? (
                <center>
                    <h5>Loading comments....</h5>
                    <div className="loader"></div>
                </center>
            ) : (
                <ul className="comments-list">
                    {comments.length ? (
                        <div>
                            {comments.map((comment) => (
                                <li key={comment.id} className="comment-item">
                                    {comment.body} - {comment.date && comment.date.split('.')[0].replace('T', ' Time:')}
                                </li>
                            ))}
                        </div>
                    ) : (
                        <p>No hay comentarios</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default MyComments;
