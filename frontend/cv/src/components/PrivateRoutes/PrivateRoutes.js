// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUser } from '../AccountTypes/UserContext';

const PrivateRoute = ({ element, ...rest }) => {
    const { currUser } = useUser();

    return (
        <Route
            {...rest}
            element={currUser ? element : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
