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
import usePacienteStore from "../store/usePacienteStore";

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


/**
 * 
 * @param {*} field The field to get from the session storage 
 * @returns {Object} The specific field from the session storage, or null if there is no data. If the field is not specified, it returns the whole object
 */
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


/**
 * 
 * @returns {Boolean} True if there is data in the session storage, false otherwise
 */
export const availablePacienteData = () => {
    const { paciente } = usePacienteStore();
    return _.isEmpty(paciente);
}


/**
 * 
 * @param {*} userData The current user data
 * @param {*} formikValues The formik values
 * @returns {Object} The difference between the two objects
 */
export const getObjectsDifference = (userData, formikValues) => {
    const updatedValues = _.differenceWith(_.toPairs(formikValues), _.toPairs(userData), _.isEqual);
    return _.fromPairs(updatedValues);
}


/**
 * 
 * @param {*} module The module name
 * @returns {Boolean} True if the module is completed, false otherwise
 */
export const moduleCompleted = (module) => {
    const { paciente } = usePacienteStore();
    if (_.isEmpty(paciente)) return false;
    if (!module) return false;

    return _.has(paciente, module);
}


/**
 * 
 * @param {*} birthday The birthday date 
 * @returns {Number} The age of the person
 */
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


/**
 * 
 * @param {*} inputs Array of objects to be formatted
 * @returns {object} Return the object formatted in the format: { [name]: '' }
 */
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


/**
 * 
 * @param {*} data Array of objects to be formatted
 * @returns Array of objects formatted in the format: { id: 1, codigo: '123', descripcion: 'description' }
 */
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


/**
 * 
 * @param {*} valor  Value to be formatted
 * @returns {string} Return the value in the format: '$ 1.000.000' (e.g. $ 1.000.000)
 */
export const formatToCurrency = (valor) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    }).format(valor);
}


/**
 *
 * @returns {string} Return the date in the format: 'day month year' (e.g. 12 de enero de 2021)
 */
export const getFormattedDate = () => {
    return new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }).format(new Date());
}

/**
 * @description Function to avoid close the app when the patient is selected
 */
export const avoidCloseApp = () => {
    const { paciente } = usePacienteStore();

    const confirmCloseHandler = (e) => {
        // Cancelar el evento de cierre o recarga
        e.preventDefault();
        // Chrome requiere que se devuelva un valor en esta función
        e.returnValue = "";
    };

    if (!_.isEmpty(paciente)) {
        window.onbeforeunload = confirmCloseHandler;
    } else {
        window.onbeforeunload = null;
    }
};
