export const IMC = (peso, talla) => Number((peso / ((talla / 100) * (talla / 100))).toFixed(1));

export const getTensionArterialMedia = (sistolica, diastolica) => {
    if (sistolica && diastolica) {
        return Math.trunc(parseInt(diastolica) + ((parseInt(sistolica) - parseInt(diastolica))) / 3)
    }
    return "";
};

export const getPesoMinimo = (talla) => Number(((talla / 100) * (talla / 100) * 18.5).toFixed(1));

export const getPesoMaximo = (talla) => Number(((talla / 100) * (talla / 100) * 24.9).toFixed(1));

export const interpretacionIMC = (imc) => {
    if (imc < 17) return 'Desnutricion';
    if (imc < 18.5) return 'Peso bajo';
    if (imc >= 18.5 && imc <= 24.9) return 'Peso normal';
    if (imc >= 25 && imc <= 29.9) return 'Sobrepeso';
    if (imc >= 30 && imc <= 34.9) return 'Obesidad grado 1';
    if (imc >= 35 && imc <= 39.9) return 'Obesidad grado 2';
    if (imc >= 40) return 'Obesidad grado 3';
}