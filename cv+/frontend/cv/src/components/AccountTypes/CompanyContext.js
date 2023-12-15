//Context for managing the current company
import React, { createContext, useContext, useState } from 'react';
export const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
    const [currCompany, setCurrCompany] = useState(null);


    return (
        <CompanyContext.Provider value={{ currCompany, setCurrCompany }}>
            {children}
        </CompanyContext.Provider>
    );
};


export const useCompany = () => {
    return useContext(CompanyContext);
};