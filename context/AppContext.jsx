import { useContext, createContext, useState } from "react";
import { searchPaciente, createPaciente, updatePaciente, deletePaciente } from "../api/axiosApi";
import { useFormik } from "formik";

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

    const formikForm = ({ initialValues, schema }, callback) => {
        const formik = useFormik({
            initialValues: {
                ...initialValues
            },
            validationSchema: schema,
            onSubmit: values => {
                callback(values);
            }
        });
        return formik;
    }

    const createNewForm = ({ initialValues, schema }, callback) => {
        const formik = formikForm({ initialValues, schema }, (data) => {
            handlePetitions(createPaciente, data, () => callback(data));
        });
        return formik;
    }

    const updateModule = ({ initialValues, schema, moreData = {} }, callback) => {
        const formik = formikForm({ initialValues, schema }, (data) => {
            const dataToSend = { ...data, ...moreData };
            handlePetitions(updatePaciente, dataToSend, () => callback(dataToSend));
        });
        return formik;
    }

    const findPaciente = (id, callback) => handlePetitions(searchPaciente, id, callback);

    const removePaciente = (callback) => handlePetitions(deletePaciente, null, callback);

    const modifyPaciente = (data, callback) => handlePetitions(updatePaciente, data, callback);

    function handlePetitions(method, data, callback) {
        setBackdrop(true);
        method(data).then(res => {
            if (method === searchPaciente) {
                if (!res.status) {
                    setNotify({ open: true, type: res.type, message: res.message });
                    return;
                }
            } else {
                setNotify({ open: true, type: res.type, message: res.message });
                if (!res.status) return;
            }
            callback(res);
        }).finally(() => setBackdrop(false));
    }

    return (
        <Context.Provider value={{ notify, setNotify, backdrop, barthelResults, setBarthelResults, findPaciente, createNewForm, removePaciente, modifyPaciente, updateModule }}>
            {children}
        </Context.Provider>
    );
}