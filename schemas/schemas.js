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
    contactoAcompanante: yup.number(),
    tipoConsulta: yup.string().required('Tipo de Consulta requerido'),
});

export const anamnesisSchema = yup.object({
    enfermedadActual: yup.string().required('Enfermedad Actual requerida'),
    motivoConsulta: yup.string().required('Motivo de Consulta requerido'),
    tegumentario: yup.string().required("Tegumentario requerido"),
    osteomuscular: yup.string().required("Osteomuscular requerido"),
    cardiovascular: yup.string().required("Cardiovascular requerido"),
    respiratorio: yup.string().required("Respiratorio requerido"),
    neurologico: yup.string().required("Neurologico requerido"),
    digestivo: yup.string().required("Digestivo requerido"),
    urogenital: yup.string().required("Urogenital requerido"),
    endocrinologico: yup.string().required("Endocrinologico requerido"),
    linfatico: yup.string().required("Linfatico requerido"),
    orgSentidos: yup.string().required("Organos de los Sentidos requerido"),
});