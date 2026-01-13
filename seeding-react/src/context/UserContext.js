import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [role, setRole]= useState('');
    
    return (
        <UserContext.Provider value={{ username, setUsername, role, setRole }}>
            {children}
        </UserContext.Provider>
    );
};
