import axios from "axios";

export const saveSessionStorageData = (field, data) => {
    const storage = window.sessionStorage.getItem("userData");
    const validFields = ["datosBasicos", "anamnesis"];

    if (!field) {
        window.sessionStorage.setItem("userData", JSON.stringify(data));
        return;
    }

    if (!validFields.includes(field)) {
        alert(`El campo ${field} no es válido`);
        return;
    }

    const storageData = JSON.parse(storage);
    window.sessionStorage.setItem("userData", JSON.stringify({ ...storageData, [field]: data }));
}

export const getSessionStorageData = (field) => {
    const storage = window.sessionStorage.getItem("userData");
    if (!storage) return null;

    const storageData = JSON.parse(storage);
    if (!field) return storageData;

    return storageData[field];
}

export const clearSessionStorageData = () => {
    window.sessionStorage.removeItem("userData");
}

export const availableSessionStorageData = () => {
    const storage = window.sessionStorage.getItem("userData");
    return !!storage;
}

export const getUpdatedValues = (userData, formikValues) => {
    const updatedValues = {};
    for (const key in userData) {
        if (userData[key] !== formikValues[key]) {
            updatedValues[key] = formikValues[key];
        }
    }
    return updatedValues;
}

export const updatePaciente = async (currentUserData, newFormikValues, option) => {
    const updatedValues = currentUserData ? getUpdatedValues(currentUserData, newFormikValues) : newFormikValues;
    if (Object.keys(updatedValues).length === 0) return { data: { empty: true, message: "No hay datos para actualizar" } };

    const { idUsuario } = getSessionStorageData("datosBasicos");
    if (!idUsuario) return { data: { error: true, message: "No se encontró el id del usuario" } };

    try {
        return await axios.put(`/api/data/paciente?id=${idUsuario}&opt=${option}`, updatedValues);
    } catch (error) {
        return error;
    }
}