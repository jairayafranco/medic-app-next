import { lodash as _ } from "../lib/lodash";
import {
    IMC,
    getTensionArterialMedia,
    getPesoMaximo,
    getPesoMinimo,
    interpretacionIMC,
    funcionRenalClasificacion,
    funcionRenalEstadio
} from "../math/formulas";

const routes = ["datos-basicos", "anamnesis", "antecedentes", "signos-vitales", "funcion-renal", "examen-fisico", "impresion-diagnostica", "formulacion", "facturacion"]
export const validFields = [
    "datosBasicos",
    "anamnesis",
    "antecedentes",
    "signosVitales",
    "signosVitalesHistory",
    "funcionRenal",
    "examenFisico",
    "impresionDiagnostica",
    "formulacion",
    "facturacion"
];
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
        return !_.inRange(valuesFromFields[findField], campo.min, campo.max + 1) ? advertence : "";
    }

    if (currentField === "interpretacion" && valuesFromFields["interpretacion"]) {
        if (!_.inRange(imc, 17, 30)) {
            return advertence;
        }

        if (_.inRange(imc, 17, (18.5) + 0.1) || _.inRange(imc, 24.9, (30 + 1))) {
            return warning;
        }
    }
}

export const handleSVInputValues = (formik, campo) => {
    const { tensionArterialDiastolica, tensionArterialSistolica, peso, talla } = formik.values;

    if (campo.property === "tensionArterialMedia") {
        formik.values.tensionArterialMedia
            = getTensionArterialMedia(tensionArterialSistolica, tensionArterialDiastolica);
    }

    if (["imc", "interpretacion", "pesoMinimo", "pesoMaximo"].includes(campo.property)) {
        const imc = IMC(peso, talla);
        formik.values[campo.property] = {
            imc,
            interpretacion: interpretacionIMC(imc),
            pesoMinimo: getPesoMinimo(talla),
            pesoMaximo: getPesoMaximo(talla)
        }[campo.property];
    }

    return formik.values[campo.property];
}

export const funcionRenalColorSchema = (formik, campo) => {
    const { tfgCorregida, estadio } = formik.values;
    const alert = "#FFC000";
    const warning = "#CAB500";
    const advertence = "#D32F2F";

    if (tfgCorregida) {
        if (["clasificacion", "estadio"].includes(campo.property)) {
            return {
                "3B": warning,
                "4": alert,
                "5": advertence
            }[estadio];
        }
    }
}

export const handleFRInputValues = (formik, campo) => {
    const { tfgCorregida } = formik.values;

    if (["clasificacion", "estadio"].includes(campo.property)) {
        const estadio = funcionRenalEstadio(tfgCorregida);
        const clasificacion = funcionRenalClasificacion(estadio);

        formik.values[campo.property] = {
            estadio,
            clasificacion
        }[campo.property];
    }

    return formik.values[campo.property];
}

export const formatInitialValues = (inputs) => {
    return inputs.reduce((acc, curr) => {
        if (curr.fields) {
            curr.fields.forEach(field => {
                acc[field.property] = "";
            });
        } else {
            acc[curr.property] = "";
        }
        return acc;
    }, {});
}

export const formatTableRows = (data) => {
    return data.map((item, index) => {
        const [codigo, descripcion] = Object.entries(item)[0];
        return {
            id: index + 1,
            codigo,
            descripcion
        }
    });
}
