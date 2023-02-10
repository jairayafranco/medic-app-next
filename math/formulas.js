import _ from "lodash";

export const IMC = (peso, talla) => Math.trunc(parseInt(peso) / ((parseInt(talla) / 100) * (parseInt(talla) / 100))) || "";

export const getTensionArterialMedia = (sistolica, diastolica) => {
    return Math.trunc(parseInt(diastolica) + ((parseInt(sistolica) - parseInt(diastolica))) / 3) || "";
};

export const getPesoMinimo = (talla) => Number(((talla / 100) * (talla / 100) * 18.5).toFixed(1)) || "";

export const getPesoMaximo = (talla) => Number(((talla / 100) * (talla / 100) * 24.9).toFixed(1)) || "";

export const interpretacionIMC = (imc) => {
    if (!imc) return "";

    const interpretacion = {
        "Desnutricion": [0, 17],
        "Peso bajo": [17, 18.5],
        "Peso normal": [18.5, 24.9],
        "Sobrepeso": [25, 29.9],
        "Obesidad grado 1": [30, 34.9],
        "Obesidad grado 2": [35, 39.9],
        "Obesidad grado 3": [40, Infinity]
    }

    const result = _.findKey(interpretacion, (value) => {
        const [min, max] = value;
        return imc >= min && imc < max;
    })

    return result;
}

export const funcionRenalEstadio = (tfg) => {
    if (!tfg) return "";

    const values = {
        "1": [90, Infinity],
        "2": [60, 90],
        "3A": [45, 60],
        "3B": [30, 45],
        "4": [16, 30],
        "5": [0, 16]
    }

    const estadio = _.findKey(values, (value) => {
        const [min, max] = value;
        return tfg >= min && tfg < max;
    })

    return estadio;
}

export const funcionRenalClasificacion = (estadio) => {
    if (!estadio) return "";

    const clasificacion = {
        "1": "DAÑO RENAL CON TFGE NORMAL O ELEVADA",
        "2": "DAÑO RENAL CON DISMINUCIÓN LEVE DE LA TFG",
        "3A": "DISMINUCIÓN MODERADA DE LA TFG",
        "3B": "DISMINUCIÓN MODERADA DE LA TFG (3B)",
        "4": "DISMINUCIÓN GRAVE DE LA TFG",
        "5": "FALLA RENAL"
    }

    return clasificacion[estadio];
} 