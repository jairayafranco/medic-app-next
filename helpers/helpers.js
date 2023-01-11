export const validFields = ["datosBasicos", "anamnesis", "antecedentes", "signosVitales", "funcionRenal", "examenFisico"];

export const saveSessionStorageData = (field, data) => {
    const storage = window.sessionStorage.getItem("userData");

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

export const getUpdatedValuesFromFormik = (userData, formikValues) => {
    const updatedValues = {};
    for (const key in userData) {
        if (userData[key] !== formikValues[key]) {
            updatedValues[key] = formikValues[key];
        }
    }
    return updatedValues;
}

export const moduleCompleted = (module) => {
    const userData = getSessionStorageData();
    if (!userData) return false;
    if (!module) return false;

    return !!userData[module];
}

export function calculateAge(birthday) {
    const birthDate = new Date(birthday).toLocaleDateString();
    const birthday_arr = birthDate.split("/");
    const birthday_date = new Date(birthday_arr[2], birthday_arr[1] - 1, birthday_arr[0]);
    const ageDifMs = Date.now() - birthday_date.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}