import * as yup from 'yup';

export const loginSchema = yup.object({
    username: yup.string().required('Usuario requerido'),
    password: yup.string().required('Contraseña requerida'),
});

export const datosBasicosSchema = yup.object({
    idMedico: yup.string().required('Identificacion Medico requerida'),
    nombreMedico: yup.string().required('Nombre Medico requerido'),
    idUsuario: yup.string().required('Identificacion Usuario requerida'),
    nombreUsuario: yup.string().required('Nombres y Apellidos requeridos'),
    genero: yup.string().required('Genero requerido'),
    fechaNacimiento: yup.string().required('Fecha de Nacimiento requerida'),
    direccion: yup.string().required('Direccion requerida'),
    contacto: yup.string().required('Contacto Telefonico requerido'),
    eps: yup.string().required('EPS requerida'),
    nivel: yup.string().required('Nivel requerido'),
    nombreAcompanante: yup.string().required('Nombre del Acompañante requerido'),
    contactoAcompanante: yup.string().required('Contacto del Acompañante requerido'),
    tipoConsulta: yup.string().required('Tipo de Consulta requerido'),
});