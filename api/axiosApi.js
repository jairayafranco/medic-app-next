import axios from 'axios';

const api = axios.create({
    baseURL: '/api/',
    headers: {
        'Content-Type': 'application/json',
    }
});

export async function login(user) {
    try {
        const response = await api.post('auth/login', user);
        return response?.data;
    } catch (exception) {
        return exception.response?.data || { status: false, message: 'Error al iniciar sesión', type: 'error' };
    }
}