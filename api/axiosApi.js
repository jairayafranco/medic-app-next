import axios from 'axios';
import _ from 'lodash';
import { getObjectsDifference, getSessionStorageData, validFields } from '../helpers/helpers';

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

export const updatePaciente = async (currentUserData, newFormikValues, option) => {
    if (!validFields.includes(option)) return { status: false, message: "Opción no válida", type: "warning" };

    const updatedValues = currentUserData ? getObjectsDifference(currentUserData, newFormikValues) : newFormikValues;
    if (_.isEmpty(updatedValues)) return { status: false, message: "No hay datos para actualizar", type: "warning" };

    const { idUsuario } = getSessionStorageData("datosBasicos");

    try {
        const route = `data/paciente?id=${idUsuario}&opt=${option}`;

        if (currentUserData) {
            const response = await api.patch(route, updatedValues);
            return response?.data;
        } else {
            const response = await api.put(route, updatedValues);
            return response?.data;
        }
    } catch (exception) {
        return exception.response?.data || handleError("Error al actualizar el paciente");
    }
}

export async function deletePaciente(id) {
    try {
        const response = await api.delete(`data/paciente?id=${id}`);
        return response?.data;
    } catch (exception) {
        return exception.response?.data || handleError("Error al eliminar el paciente");
    }
}