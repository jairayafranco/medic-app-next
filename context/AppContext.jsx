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

    const notifyHandler = (open, type, message, backdrop) => {
        setNotify({ open, type, message });
        if (backdrop) {
            setBackdrop(backdrop.backdrop);
        }
    }

    const backdropHandler = (open) => {
        setBackdrop(open);
    }

    return (
        <Context.Provider value={{ notify, notifyHandler, backdrop, backdropHandler }}>
            {children}
        </Context.Provider>
    );
}