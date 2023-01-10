import axios from 'axios';

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

export async function updatePaciente() { }

export async function deletePaciente(id) {
    try {
        const response = await api.delete(`data/paciente?id=${id}`);
        return response?.data;
    } catch (exception) {
        return exception.response?.data || handleError("Error al eliminar el paciente");
    }
}