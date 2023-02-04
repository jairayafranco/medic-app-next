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

async function handlePetitions({ method, data = [], customError, route }) {
    try {
        const response = await api[method](route, data);
        return response?.data;
    } catch (exception) {
        console.log(exception);
        return exception.response?.data || handleError(customError);
    }
}

export const login = (user) => handlePetitions({ method: 'post', data: user, customError: "Error al iniciar sesión", route: "auth/login" });

export const logout = () => handlePetitions({ method: 'post', customError: "Error al cerrar sesión", route: "auth/logout" });

export const createPaciente = (data) => handlePetitions({ method: 'post', data, customError: "Error al crear el paciente", route: "data/paciente" });

export const searchPaciente = (id) => handlePetitions({ method: 'get', customError: "Error al buscar el paciente", route: `data/paciente?id=${id}` });

export const updatePaciente = async (newFormikValues) => {
    const ruta = window.location.pathname.split("/")[2];
    const { name } = routesToModules.find(({ route }) => route === ruta);
    const currentUserData = getSessionStorageData(name);

    if (_.isNull(currentUserData)) return { status: false, message: "No se encontraron los datos", type: "error" };
    // if (_.isUndefined(currentUserData)) return { status: false, message: "El modulo no existe", type: "error" };

    const updatedValues = !!currentUserData ? getObjectsDifference(currentUserData, newFormikValues) : newFormikValues;
    if (_.isEmpty(updatedValues)) return { status: false, message: "No hay datos para actualizar", type: "warning" };

    const { idUsuario } = getSessionStorageData("datosBasicos");
    if (!_.isNumber(idUsuario)) return { status: false, message: "No se encontró el id del paciente", type: "error" };

    const opt = !!currentUserData ? "patch" : "put";
    const route = `data/paciente?id=${idUsuario}&opt=${name}`;
    return handlePetitions({ method: opt, data: updatedValues, route, customError: "Error al actualizar el paciente" });
}

export async function deletePaciente() {
    const id = getSessionStorageData("datosBasicos")?.idUsuario;
    if (!id) return { status: false, message: "No se encontró el id del paciente", type: "error" };

    return handlePetitions({ method: 'delete', customError: "Error al eliminar el paciente", route: `data/paciente?id=${id}` });
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

export const getLoginImage = async () => {
    try {
        const response = await axios.get('https://source.unsplash.com/1920x1080/?hospital');
        return { url: response?.request.responseURL, status: true };
    } catch (error) {
        return { error, status: false, message: "Error al obtener la imagen de fondo", type: "error" };
    }
}

export const getUserProfile = async () => {
    try {
        const response = await api.get('settings/profile');
        return { ...response?.data, status: true };
    } catch (error) {
        return { error, status: false, message: "Error al obtener el perfil del usuario" };
    }
}