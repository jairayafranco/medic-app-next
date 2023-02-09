import _ from "lodash";
import { IMC, getTensionArterialMedia, getPesoMaximo, getPesoMinimo, interpretacionIMC } from "../math/formulas";

const routes = ["datos-basicos", "anamnesis", "antecedentes", "signos-vitales", "funcion-renal", "examen-fisico"]

export const validFields = ["datosBasicos", "anamnesis", "antecedentes", "signosVitales", "funcionRenal", "examenFisico"];

export const routesToModules = validFields.map((name, index) => ({ name, route: routes[index] }));

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

export const getObjectsDifference = (userData, formikValues) => {
    const updatedValues = _.differenceWith(_.toPairs(formikValues), _.toPairs(userData), _.isEqual);
    return _.fromPairs(updatedValues);
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

export const signosVitalesColorSchema = (campo, formik) => {
    const valuesFromFields = formik.values;
    const fieldNames = ["tensionArterialSistolica", "tensionArterialDiastolica", "frecuenciaCardiaca", "frecuenciaRespiratoria", "saturacionO2"];
    const currentField = campo.property;
    const warning = "#CAB500";
    const advertence = "#D32F2F";
    const imc = IMC(valuesFromFields.peso, valuesFromFields.talla);
    const findField = fieldNames.find((fieldName) => fieldName === currentField);

    if (findField && valuesFromFields[findField]) {
        return !_.inRange(valuesFromFields[findField], campo.min, campo.max) ? advertence : "";
    }

    if (currentField === "interpretacion" && valuesFromFields["interpretacion"]) {
        if (!_.inRange(imc, 17, 30)) {
            return advertence;
        }

        if (_.inRange(imc, 17, 18.5) || _.inRange(imc, 24.9, 30)) {
            return warning;
        }
    }
}

export const handleSVInputValues = (formik, campo) => {
    const { tensionArterialDiastolica, tensionArterialSistolica, peso, talla } = formik.values;
    const imc = IMC(peso, talla);

    if (tensionArterialDiastolica && tensionArterialSistolica) {
        if (campo.property === "tensionArterialMedia") {
            formik.values.tensionArterialMedia = getTensionArterialMedia(tensionArterialSistolica, tensionArterialDiastolica);
        }
    }

    if (peso && talla) {
        if (["imc", "interpretacion", "pesoMinimo", "pesoMaximo"].includes(campo.property)) {
            formik.values[campo.property] = {
                imc,
                interpretacion: interpretacionIMC(imc),
                pesoMinimo: getPesoMinimo(talla),
                pesoMaximo: getPesoMaximo(talla)
            }[campo.property];
        }
    }

    return formik.values[campo.property];
}