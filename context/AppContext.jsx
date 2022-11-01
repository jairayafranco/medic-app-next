import { useContext, createContext, useEffect, useState } from "react";

export const Context = createContext({});

export const AppContext = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
};

export const AppContextProvider = ({ children }) => {
    const [notify, setNotify] = useState({ open: false, type: '', message: '' });

    const notifyHandler = (open, type, message) => {
        setNotify({ open, type, message });
    }

    return (
        <Context.Provider value={{ notify, notifyHandler }}>
            {children}
        </Context.Provider>
    );
}