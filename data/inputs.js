export const datosBasicosFields = [
    { name: 'Identificacion Medico', property: 'idMedico', type: 'number' },
    { name: 'Nombre Medico', property: 'nombreMedico', type: 'text' },
    { name: 'Identificacion Usuario', property: 'idUsuario', type: 'number' },
    { name: 'Nombres y Apellidos', property: 'nombreUsuario', type: 'text' },
    { name: 'Genero', property: 'genero', type: 'text', options: ['Masculino', 'Femenino', 'Otro'] },
    { name: 'Fecha de Nacimiento', property: 'fechaNacimiento', type: 'text' },
    { name: 'Direccion', property: 'direccion', type: 'text' },
    { name: 'Contacto Telefonico', property: 'contacto', type: 'number' },
    { name: 'EPS', property: 'eps', type: 'text' },
    { name: 'Nivel', property: 'nivel', type: 'text' },
    { name: 'Nombre del Acompañante', property: 'nombreAcompanante', type: 'text' },
    { name: 'Contacto del Acompañante', property: 'contactoAcompanante', type: 'number' },
    {
        name: 'Tipo de Consulta', property: 'tipoConsulta', type: 'text',
        options: [
            'M.Gral Primera Vez',
            'Lectura',
            'Control',
            'Certificado de Salud',
            'Certificado Visual',
            'Examen Fisico de Ingreso',
            'Crecimiento y Desarrollo',
            'Lavado de un Oido',
            'Lavado de Ambos Oidos',
            'Onisectomia'
        ]
    },
];