import axios from 'axios';
import { getUpdatedValuesFromFormik, getSessionStorageData, validFields } from '../helpers/helpers';

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
    if (!validFields.includes(option)) {
        return { status: false, message: "Opción no válida", type: "warning" };
    }

    const updatedValues = currentUserData ? getUpdatedValuesFromFormik(currentUserData, newFormikValues) : newFormikValues;
    if (Object.keys(updatedValues).length === 0) return { status: false, message: "No hay datos para actualizar", type: "warning" };

    const { idUsuario } = getSessionStorageData("datosBasicos");
    if (!idUsuario) return { status: false, message: "No se encontró el id del usuario", type: "warning" };

    try {
        return await api.put(`data/paciente?id=${idUsuario}&opt=${option}`, updatedValues);
    } catch (error) {
        return error;
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