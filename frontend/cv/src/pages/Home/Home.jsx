import React from 'react'
import "./Home.css"
import { useParams } from 'react-router-dom';

const Home = () => {
    let { id } = useParams();

    return (
        <div>
            <h1>Página Home</h1>
            <p>El ID en la URL es: {id}</p>
        </div>
    );
};

export default Home;