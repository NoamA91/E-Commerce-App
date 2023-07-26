import { createContext, useState } from 'react';

// Context to store the current page number
export const CurrentPageContext = createContext();

export const CurrentPageProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </CurrentPageContext.Provider>
    );
};

