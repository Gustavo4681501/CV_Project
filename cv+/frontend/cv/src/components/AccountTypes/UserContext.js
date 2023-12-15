//Context for managing the current user
import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState(null);
    
    return (
        <UserContext.Provider value={{ currUser, setCurrUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
