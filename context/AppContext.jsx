import { useContext, createContext, useState } from "react";

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
    const [backdrop, setBackdrop] = useState(false);
    const [barthelResults, setBarthelResults] = useState({
        barthel: "No Aplica",
        puntuacion: "No Aplica",
        points: {}
    });

    const notifyHandler = (open, type, message) => {
        setNotify({ open, type, message });
    }

    const backdropHandler = (open) => {
        setBackdrop(open);
    }

    return (
        <Context.Provider value={{ notify, notifyHandler, backdrop, backdropHandler, barthelResults, setBarthelResults }}>
            {children}
        </Context.Provider>
    );
}