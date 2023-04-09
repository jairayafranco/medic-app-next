import axios from 'axios';
import { lodash as _ } from '../lib/lodash';
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
        console.error("AxiosApiError >>>", exception);
        return exception.response?.data || handleError(customError);
    }
}

export const login = (user) => handlePetitions({ method: 'post', data: user, route: "auth/login", customError: "Error al iniciar sesión" });

export const logout = () => handlePetitions({ method: 'post', route: "auth/logout", customError: "Error al cerrar sesión" });

export const createPaciente = (data) => handlePetitions({ method: 'post', data, route: "data/paciente", customError: "Error al crear el paciente" });

export const searchPaciente = (id) => handlePetitions({ method: 'get', route: `data/paciente?id=${id}`, customError: "Error al buscar el paciente" });

export const updatePaciente = async ({ pacienteId, currentModuleData, newFormikValues }) => {
    const ruta = window.location.pathname.split("/")[2];
    const { name } = routesToModules.find(({ route }) => route === ruta);
    if (!_.isNumber(pacienteId)) return { status: false, message: "No se encontró el id del paciente", type: "error" };

    const updatedValues = !_.isEmpty(currentModuleData) ? getObjectsDifference(currentModuleData, newFormikValues) : newFormikValues;
    if (_.isEmpty(updatedValues)) return { status: false, message: "No hay datos para actualizar", type: "warning" };

    const opt = !_.isEmpty(currentModuleData) ? "patch" : "put";
    const route = `data/paciente?id=${pacienteId}&opt=${name}`;
    return handlePetitions({ method: opt, data: updatedValues, route, customError: "Error al actualizar el paciente" });
}

export async function updateImpresionDiagnostica(id, data) {
    if (!id) return handleError("No se encontró el id del paciente");
    return handlePetitions({ method: 'put', data, route: `data/paciente?id=${id}&opt=impresionDiagnostica`, customError: "Error al actualizar el paciente" });
}

export async function updateFormulacion(id, data) {
    if (!id) return handleError("No se encontró el id del paciente");
    return handlePetitions({ method: 'patch', data, route: `data/paciente?id=${id}&opt=formulacion`, customError: "Error al actualizar el paciente" });
}

export const updateFacturacion = async (id, data) => {
    if (!id) return handleError("No se encontró el id del paciente");
    return handlePetitions({ method: 'put', data, route: `data/paciente?id=${id}&opt=facturacion`, customError: "Error al actualizar el paciente" });
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

