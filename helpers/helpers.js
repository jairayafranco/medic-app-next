import _ from "lodash";

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
    const { tensionArterialDiastolica, tensionArterialSistolica, peso, talla,
        frecuenciaCardiaca, frecuenciaRespiratoria, saturacionO2
    } = formik.values;
    const name = campo.property;
    const warning = "#CAB500";
    const advertence = "#D32F2F";

    const imc = (peso / ((talla / 100) * (talla / 100))).toFixed(2);

    if (name === "interpretacion" && (peso && talla)) {
        if (imc <= 17 || imc >= 30) {
            return advertence;
        }
        if (imc >= 17 && imc <= 18.41 || imc >= 25 && imc <= 30) {
            return warning;
        }
    }

    if (name === "tensionArterialSistolica" && tensionArterialSistolica) {
        if (tensionArterialSistolica < 90 || tensionArterialSistolica >= 140) {
            return advertence;
        }
    }

    if (name === "tensionArterialDiastolica" && tensionArterialDiastolica) {
        if (tensionArterialDiastolica < 60 || tensionArterialDiastolica >= 90) {
            return advertence;
        }
    }

    if (name === "frecuenciaCardiaca" && frecuenciaCardiaca) {
        if (frecuenciaCardiaca < 60 || frecuenciaCardiaca > 100) {
            return advertence;
        }
    }

    if (name === "frecuenciaRespiratoria" && frecuenciaRespiratoria) {
        if (frecuenciaRespiratoria < 12 || frecuenciaRespiratoria > 20) {
            return advertence;
        }
    }

    if (name === "saturacionO2" && saturacionO2) {
        if (saturacionO2 < 90 || saturacionO2 > 100) {
            return advertence;
        }
    }
}

export const handleSVInputValues = (formik) => {
    const { values } = formik;

    if (values.tensionArterialDiastolica && values.tensionArterialSistolica) {
        formik.setFieldValue(
            "tensionArterialMedia",
            Math.trunc(parseInt(values.tensionArterialDiastolica) + ((parseInt(values.tensionArterialSistolica) - parseInt(values.tensionArterialDiastolica))) / 3)
        );
    } else {
        formik.setFieldValue("tensionArterialMedia", "");
    }

    const imc = (values.peso / ((values.talla / 100) * (values.talla / 100))).toFixed(2);

    if (values.peso && values.talla) {
        formik.setFieldValue("imc", imc);
        formik.setFieldValue("interpretacion", interpretacionIMC(imc));
        formik.setFieldValue("pesoMinimo", ((values.talla / 100) * (values.talla / 100) * 18.5).toFixed(1));
        formik.setFieldValue("pesoMaximo", ((values.talla / 100) * (values.talla / 100) * 24.9).toFixed(1));
    } else {
        formik.setFieldValue("imc", "");
        formik.setFieldValue("interpretacion", "");
        formik.setFieldValue("pesoMinimo", "");
        formik.setFieldValue("pesoMaximo", "");
    }

    function interpretacionIMC(imc) {
        if (imc < 17) return 'Desnutricion';
        if (imc < 18.5) return 'Peso bajo';
        if (imc >= 18.5 && imc <= 24.9) return 'Peso normal';
        if (imc >= 25 && imc <= 29.9) return 'Sobrepeso';
        if (imc >= 30 && imc <= 34.9) return 'Obesidad grado 1';
        if (imc >= 35 && imc <= 39.9) return 'Obesidad grado 2';
        if (imc >= 40) return 'Obesidad grado 3';
    }
}