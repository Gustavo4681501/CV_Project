import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../AccountTypes/UserContext";
import { jwtDecode } from "jwt-decode";
import "./CreateResume.css";

const CreateResume = () => {
    const { currUser, setCurrUser } = useUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 60000);

        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const decoded = jwtDecode(token);
                    const userId = decoded.sub;
                    const response = await fetch(
                        `http://localhost:3001/api/users/${userId}`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setCurrUser(data);
                        setIsLoading(false);
                        clearTimeout(timeout);
                    } else {
                        setIsLoading(false);
                    }
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error:", error);
                setIsLoading(false);
            }
        };

        fetchCurrentUser();

        return () => clearTimeout(timeout);
    }, [setCurrUser]);
    return (
        <>
            <div className="titulo-container">
                <h1 className="titulo-texto">
                    Here you can see the available templates, choose the one you like the
                    most!
                </h1>
            </div>
            <div className="containerPDF">
                <div className="resume-containerPDF">
                    <Link to={`/User/Profile/${currUser.id}/CreateResume1`}>
                        <img
                            className="resume"
                            src="/image/Captura_de_pantalla_2023-12-05_122520.png"
                            alt="Resume Image"
                        />
                        <div className="overlay"></div>
                        <div className="texto-overlay">Choose this template</div>
                    </Link>
                </div>

                <div className="resume-containerPDF">
                    <Link to={`/User/Profile/${currUser.id}/CreateResume2`}>
                        <img
                            className="resume"
                            src="/image/Captura_de_pantalla_2023-12-05_122616.png"
                        />
                        <div className="overlay"></div>
                        <div className="texto-overlay">Choose this template</div>
                    </Link>
                </div>

                <div className="resume-containerPDF">
                    <Link to={`/User/Profile/${currUser.id}/CreateResume3`}>
                        <img
                            className="resume"
                            src="/image/Captura_de_pantalla_2023-12-05_122706.png"
                        />
                        <div className="overlay"></div>
                        <div className="texto-overlay">Choose this template</div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default CreateResume;
