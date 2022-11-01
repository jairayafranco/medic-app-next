import * as yup from 'yup';

export const loginSchema = yup.object({
    username: yup.string().required('Usuario requerido'),
    password: yup.string().required('Contraseña requerida'),
});

export const datosBasicosSchema = yup.object({
    idMedico: yup.number().required('Identificacion Medico requerida'),
    nombreMedico: yup.string().required('Nombre Medico requerido'),
    idUsuario: yup.number().required('Identificacion Usuario requerida'),
    nombreUsuario: yup.string().required('Nombres y Apellidos requeridos'),
    genero: yup.string().required('Genero requerido'),
    fechaNacimiento: yup.date().required('Fecha de Nacimiento requerida'),
    direccion: yup.string().required('Direccion requerida'),
    contacto: yup.number().required('Contacto Telefonico requerido'),
    eps: yup.string().required('EPS requerida'),
    nivel: yup.string().required('Nivel requerido'),
    nombreAcompanante: yup.string(),
    contactoAcompanante: yup.number().when('nombreAcompanante', {
        is: (val) => val ? true : false,
        then: yup.number().required('Contacto Acompanante requerido'),
    }),
    tipoConsulta: yup.string().required('Tipo de Consulta requerido'),
});