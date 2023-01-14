import axios from 'axios';
import _ from 'lodash';
import { getObjectsDifference, getSessionStorageData, routesToModules } from '../helpers/helpers';

const api = axios.create({
    baseURL: '/api/',
    headers: {
        'Content-Type': 'application/json',
    }
});

const handleError = (msg) => ({ status: false, message: msg, type: 'error' });

export async function login(user) {
    try {
        const response = await api.post('auth/login', user);
        return response?.data;
    } catch (exception) {
        return exception.response?.data || handleError("Error al iniciar sesión");
    }
}

export async function createPaciente(data) {
    try {
        const response = await api.post('data/paciente', data);
        return response?.data;
    } catch (exception) {
        return exception.response?.data || handleError("Error al crear el paciente");
    }
}

export async function searchPaciente(id) {
    try {
        const response = await api.get(`data/paciente?id=${id}`);
        return response?.data;
    } catch (exception) {
        return exception.response?.data || handleError("Error al obtener el paciente");
    }
}

export const updatePaciente = async (newFormikValues) => {
    const ruta = window.location.pathname.split("/")[2];
    const { name } = routesToModules.find(({ route }) => route === ruta);
    const currentUserData = getSessionStorageData(name);

    if (_.isNull(currentUserData)) return { status: false, message: "No se encontraron los datos", type: "error" };
    if (_.isUndefined(currentUserData)) return { status: false, message: "El modulo no existe", type: "error" };

    const updatedValues = !!currentUserData ? getObjectsDifference(currentUserData, newFormikValues) : newFormikValues;
    if (_.isEmpty(updatedValues)) return { status: false, message: "No hay datos para actualizar", type: "warning" };

    const { idUsuario } = getSessionStorageData("datosBasicos");
    if (!_.isNumber(idUsuario)) return { status: false, message: "No se encontró el id del paciente", type: "error" };

    const route = `data/paciente?id=${idUsuario}&opt=${name}`;
    try {
        const opt = !!currentUserData ? "patch" : "put";
        const response = await api[opt](route, updatedValues);
        return response?.data;
    } catch (exception) {
        return exception.response?.data || handleError("Error al actualizar el paciente");
    }
}

export async function deletePaciente() {
    const id = getSessionStorageData("datosBasicos")?.idUsuario;
    if (!id) return { status: false, message: "No se encontró el id del paciente", type: "error" };

    try {
        const response = await api.delete(`data/paciente?id=${id}`);
        return response?.data;
    } catch (exception) {
        return exception.response?.data || handleError("Error al eliminar el paciente");
    }
}

export async function getSignosVitalesHistory() {
    const paciente = getSessionStorageData("datosBasicos");
    if (paciente) {
        try {
            const response = await api.get(`data/signosVitalesHistory?id=${paciente.idUsuario}`);
            return response?.data;
        } catch (exception) {
            return exception.response?.data || handleError("Error al obtener la historia de signos vitales");
        }
    }
}

export async function saveSignosVitalesHistory(data) {
    try {
        const response = await api.post('data/signosVitalesHistory', data);
        return response?.data;
    } catch (exception) {
        return exception.response?.data || handleError("Error al guardar la historia de signos vitales");
    }
}