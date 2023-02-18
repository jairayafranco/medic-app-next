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

async function handlePetitions({ method, data = [], route, customError }) {
    try {
        const response = await api[method](route, data);
        return response?.data;
    } catch (exception) {
        console.error(exception);
        return exception.response?.data || handleError(customError);
    }
}

export const login = (user) => handlePetitions({ method: 'post', data: user, route: "auth/login", customError: "Error al iniciar sesión" });

export const logout = () => handlePetitions({ method: 'post', route: "auth/logout", customError: "Error al cerrar sesión" });

export const createPaciente = (data) => handlePetitions({ method: 'post', data, route: "data/paciente", customError: "Error al crear el paciente" });

export const searchPaciente = (id) => handlePetitions({ method: 'get', route: `data/paciente?id=${id}`, customError: "Error al buscar el paciente" });

export const updatePaciente = async (newFormikValues) => {
    const ruta = window.location.pathname.split("/")[2];
    const { name } = routesToModules.find(({ route }) => route === ruta);
    const currentUserData = getSessionStorageData(name);

    if (_.isNull(currentUserData)) return { status: false, message: "No se encontraron los datos", type: "error" };

    const updatedValues = !!currentUserData ? getObjectsDifference(currentUserData, newFormikValues) : newFormikValues;
    if (_.isEmpty(updatedValues)) return { status: false, message: "No hay datos para actualizar", type: "warning" };

    const { idUsuario } = getSessionStorageData("datosBasicos");
    if (!_.isNumber(idUsuario)) return { status: false, message: "No se encontró el id del paciente", type: "error" };

    const opt = !!currentUserData ? "patch" : "put";
    const route = `data/paciente?id=${idUsuario}&opt=${name}`;
    return handlePetitions({ method: opt, data: updatedValues, route, customError: "Error al actualizar el paciente" });
}

export async function deletePaciente(id) {
    if (!id) return handleError("No se encontró el id del paciente");
    return handlePetitions({ method: 'delete', route: `data/paciente?id=${id}`, customError: "Error al eliminar el paciente" });
}

export const saveSignosVitalesHistory = (data) => {
    const { idUsuario } = getSessionStorageData("datosBasicos");
    if (!idUsuario) return handleError("No se encontró el id del paciente");
    return handlePetitions({
        method: 'post', data: { ...data, idUsuario }, route: `data/signosVitalesHistory`, customError: "Error al guardar la historia de signos vitales"
    })
};

export const getLoginImage = async () => {
    try {
        const response = await axios.get('https://source.unsplash.com/1920x1080/?hospital');
        return { url: response?.request.responseURL, status: true };
    } catch (error) {
        return { error, status: false, message: "Error al obtener la imagen de fondo", type: "error" };
    }
}

export const getUserProfile = () => handlePetitions({ method: 'get', route: "settings/profile", customError: "Error al obtener el perfil del usuario" });

export const getUltimosPacientes = () => handlePetitions({ method: 'get', route: "data/ultimosPacientes", customError: "Error al obtener los últimos pacientes" });