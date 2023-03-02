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

export const anamnesisFields = [
    { name: "Enfermedad actual", property: "enfermedadActual" },
    { name: "Motivo de consulta", property: "motivoConsulta" },
    { name: "Tegumentario", property: "tegumentario" },
    { name: "Osteomuscular", property: "osteomuscular" },
    { name: "Cardiovascular", property: "cardiovascular" },
    { name: "Respiratorio", property: "respiratorio" },
    { name: "Neurologico", property: "neurologico" },
    { name: "Digestivo", property: "digestivo" },
    { name: "Urogenital", property: "urogenital" },
    { name: "Endocrinologico", property: "endocrinologico" },
    { name: "Linfatico", property: "linfatico" },
    { name: "Org. Sentidos", property: "orgSentidos" },
];

export const antecedentesFields = [
    { name: "Familiares", property: "familiares" },
    { name: "Patologicos", property: "patologicos" },
    { name: "Quirurgicos", property: "quirurgicos" },
    { name: "Traumaticos", property: "traumaticos" },
    { name: "Alergicos", property: "alergicos" },
    { name: "Hospitalizaciones", property: "hospitalizaciones" },
    { name: "Transfusiones", property: "transfusiones" },
    { name: "Cigarrillo - Humo de Leña", property: "cigarrilloHumoLeña" },
    { name: "Licor", property: "licor" },
    { name: "Sustancias Psicoactivas", property: "sustanciasPsicoactivas" },
    { name: "Farmacologicos", property: "farmacologicos" },
    { name: "Especialistas Tratantes", property: "especialistasTratantes" },
    { name: "Gineco-Obstetricos", property: "ginecoObstetricos" },
    { name: "Ultima Citologia Cervicovaginal", property: "ultimaCitologiaCervicoVaginal" },
    { name: "Otros Antecedentes - Pediatrico", property: "otrosAntecedentesPediatrico" },
    { name: "Otros Antecedentes - Adultos", property: "otrosAntecedentesAdultos" },
];

export const signosVitalesFields = [
    {
        group: 1, fields: [
            {
                name: "Tension Arterial Sistolica",
                property: "tensionArterialSistolica",
                type: "number",
                unit: "mm/Hg",
                abrev: "(TAS)",
                variant: "filled",
                size: "small",
                min: 90,
                max: 140,
            },
            {
                name: "Tension Arterial Diastolica",
                property: "tensionArterialDiastolica",
                type: "number",
                unit: "mm/Hg",
                abrev: "(TAD)",
                variant: "filled",
                size: "small",
                min: 60,
                max: 90
            },
            {
                name: "Tension Arterial Media",
                property: "tensionArterialMedia",
                type: "number",
                unit: "mm/Hg",
                abrev: "(TAM)",
                variant: "outlined",
                size: "small",
                shrink: true,
                readOnly: true
            },
        ]
    },
    {
        group: 2, fields: [
            {
                name: "Frecuencia Cardiaca",
                property: "frecuenciaCardiaca",
                type: "number",
                unit: "L/M",
                abrev: "(FC)",
                variant: "filled",
                size: "small",
                min: 60,
                max: 100
            },
            {
                name: "Frecuencia Respiratoria",
                property: "frecuenciaRespiratoria",
                type: "number",
                unit: "R/M",
                abrev: "(FR)",
                variant: "filled",
                size: "small",
                min: 12,
                max: 20
            },
            {
                name: "Saturacion de O2",
                property: "saturacionO2",
                type: "number",
                unit: "%",
                abrev: "(SO2)",
                variant: "filled",
                size: "small",
                min: 90,
                max: 100
            },
        ]
    },
    {
        group: 3, fields: [
            {
                name: "Temperatura",
                property: "temperatura",
                type: "number",
                unit: "Grados",
                abrev: "(T°)",
                variant: "standard",
                size: "small"
            },
            {
                name: "P. Abdominal",
                property: "pAbdominal",
                type: "number",
                unit: "Cms",
                abrev: "(Si no es RCV escriba 0)",
                variant: "standard",
                size: "small"
            },
            {
                name: "Peso",
                property: "peso",
                type: "number",
                unit: "Kg",
                abrev: "(KG)",
                variant: "standard",
                size: "small"
            },
            {
                name: "Talla",
                property: "talla",
                type: "number",
                unit: "Cms",
                abrev: "(CMS)",
                variant: "standard",
                size: "small"
            },
            {
                name: "Indice de Masa Corporal",
                property: "imc",
                type: "number",
                unit: "",
                abrev: "(IMC)",
                variant: "outlined",
                size: "small",
                shrink: true,
                readOnly: true
            },
            {
                name: "Interpretacion",
                property: "interpretacion",
                type: "text",
                abrev: "",
                variant: "filled",
                size: "small",
                shrink: true,
                readOnly: true
            },
            {
                name: "Peso Minimo",
                property: "pesoMinimo",
                type: "number",
                unit: "Kg",
                abrev: "",
                variant: "outlined",
                size: "small",
                shrink: true,
                readOnly: true
            },
            {
                name: "Peso Maximo",
                property: "pesoMaximo",
                type: "number",
                unit: "Kg",
                abrev: "",
                variant: "outlined",
                size: "small",
                shrink: true,
                readOnly: true
            },
        ]
    },
];

export const funcionRenalFields = [
    {
        group: 1, fields: [
            { name: 'Edad', property: 'edad', unit: '', readOnly: true, variant: 'outlined' },
            { name: 'Sexo', property: 'sexo', unit: '', readOnly: true, variant: 'outlined' },
            { name: 'Peso', property: 'peso', unit: 'Kg', readOnly: true, variant: 'outlined' },
            { name: 'Talla', property: 'talla', unit: 'Cms', readOnly: true, variant: 'outlined' },
        ]
    },
    {
        group: 2, fields: [
            { name: 'Creatinina', property: 'creatinina', unit: 'Mg/MI', variant: 'filled', size: 'small', type: "number" },
            { name: 'TFG Corregida', property: 'tfgCorregida', unit: 'mL/min/1,73 m2', size: 'small', variant: 'filled', type: "number" },
            { name: 'Estadio', property: 'estadio', unit: '', readOnly: true, size: 'small', shrink: true, variant: 'filled' },
            { name: 'Clasificacion (KDIGO)', property: 'clasificacion', unit: '', readOnly: true, size: 'small', shrink: true, variant: 'filled' },
        ]
    },

];

export const examenFisicoFields = [
    { name: "Piel/Anexos", property: "pielAnexos" },
    { name: "Cara/Craneo", property: "caraCraneo" },
    { name: "Ojos/Boca/Nariz", property: "ojosBocaNariz" },
    { name: "Cuello", property: "cuello" },
    { name: "Torax", property: "torax" },
    { name: "Abdomen", property: "abdomen" },
    { name: "Genitourinario", property: "genitourinario" },
    { name: "Osteomuscular", property: "osteomuscular" },
    { name: "Extremidades", property: "extremidades" },
    { name: "Neurologico", property: "neurologico" },
];

export const formulacionFields = [
    { name: "Consecutivo", property: "consecutivo", type: "text", readOnly: true },
    { name: "Servicio", property: "servicio", type: "text", readOnly: true },
    { name: "Cantidad", property: "cantidad", type: "number" },
    { name: "Descripcion", property: "descripcionManual", type: "text" },
];

export const facturacionFields = [
    { name: "Identificacion", property: "idUsuario", type: "text", readOnly: true },
    { name: "Nombres y Apellidos", property: "nombreUsuario", type: "text", readOnly: true },
    { name: "Fecha de Atencion", property: "fechaAtencion", type: "text", readOnly: true },
    { name: "Tipo de Consulta", property: "tipoConsulta", type: "text", readOnly: true },
    { name: "Valor Facturado", property: "valor", type: "text" },
];