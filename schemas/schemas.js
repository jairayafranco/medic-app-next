import * as yup from 'yup';

export const loginSchema = yup.object({
    username: yup.string().trim().required('Usuario requerido'),
    password: yup.string().trim().required('Contraseña requerida'),
});

export const datosBasicosSchema = yup.object({
    idMedico: yup.number().required('Identificacion Medico requerida'),
    nombreMedico: yup.string().trim().required('Nombre Medico requerido'),
    idUsuario: yup.number().required('Identificacion Usuario requerida'),
    nombreUsuario: yup.string().trim().required('Nombres y Apellidos requeridos'),
    genero: yup.string().trim().required('Genero requerido'),
    fechaNacimiento: yup.date().required('Fecha de Nacimiento requerida'),
    direccion: yup.string().trim().required('Direccion requerida'),
    contacto: yup.number().required('Contacto Telefonico requerido'),
    eps: yup.string().trim().required('EPS requerida'),
    nivel: yup.string().trim().required('Nivel requerido'),
    nombreAcompanante: yup.string().trim(),
    contactoAcompanante: yup.number(),
    tipoConsulta: yup.string().trim().required('Tipo de Consulta requerido'),
});

export const anamnesisSchema = yup.object({
    enfermedadActual: yup.string().trim().required('Enfermedad Actual requerida'),
    motivoConsulta: yup.string().trim().required('Motivo de Consulta requerido'),
    tegumentario: yup.string().trim().required("Tegumentario requerido"),
    osteomuscular: yup.string().trim().required("Osteomuscular requerido"),
    cardiovascular: yup.string().trim().required("Cardiovascular requerido"),
    respiratorio: yup.string().trim().required("Respiratorio requerido"),
    neurologico: yup.string().trim().required("Neurologico requerido"),
    digestivo: yup.string().trim().required("Digestivo requerido"),
    urogenital: yup.string().trim().required("Urogenital requerido"),
    endocrinologico: yup.string().trim().required("Endocrinologico requerido"),
    linfatico: yup.string().trim().required("Linfatico requerido"),
    orgSentidos: yup.string().trim().required("Organos de los Sentidos requerido"),
});

export const antecedentesSchema = yup.object({
    familiares: yup.string().trim().required("Familiares requerido"),
    patologicos: yup.string().trim().required("Patologicos requerido"),
    quirurgicos: yup.string().trim().required("Quirurgicos requerido"),
    traumaticos: yup.string().trim().required("Traumaticos requerido"),
    alergicos: yup.string().trim().required("Alergicos requerido"),
    hospitalizaciones: yup.string().trim().required("Hospitalizaciones requerido"),
    transfusiones: yup.string().trim().required("Transfusiones requerido"),
    cigarrilloHumoLeña: yup.string().trim().required("Cigarrillo - Humo de Leña requerido"),
    licor: yup.string().trim().required("Licor requerido"),
    sustanciasPsicoactivas: yup.string().trim().required("Sustancias Psicoactivas requerido"),
    farmacologicos: yup.string().trim().required("Farmacologicos requerido"),
    especialistasTratantes: yup.string().trim().required("Especialistas Tratantes requerido"),
    ginecoObstetricos: yup.string().trim().required("Gineco-Obstetricos requerido"),
    ultimaCitologiaCervicoVaginal: yup.string().trim().required("Ultima Citologia Cervicovaginal requerido"),
    otrosAntecedentesPediatrico: yup.string().trim().required("Otros Antecedentes - Pediatrico requerido"),
    otrosAntecedentesAdultos: yup.string().trim().required("Otros Antecedentes - Adultos requerido"),
});

export const signosVitalesSchema = yup.object({
    tensionArterialSistolica: yup.number().required("Tension Arterial Sistolica requerida"),
    tensionArterialDiastolica: yup.number().required("Tension Arterial Diastolica requerida"),
    frecuenciaCardiaca: yup.number().required("Frecuencia Cardiaca requerida"),
    frecuenciaRespiratoria: yup.number().required("Frecuencia Respiratoria requerida"),
    saturacionO2: yup.number().required("Saturacion de O2 requerida"),
    temperatura: yup.number().required("Temperatura requerida"),
    pAbdominal: yup.number().required("P. Abdominal requerido"),
    peso: yup.number().required("Peso requerido"),
    talla: yup.number().required("Talla requerida"),
});

export const funcionRenalSchema = yup.object({
    tfgCorregida: yup.number().required("TFG Corregida requerida"),
});

export const examenFisicoSchema = yup.object({
    pielAnexos: yup.string().trim().required("Piel/Anexos requerido"),
    caraCraneo: yup.string().trim().required("Cara/Craneo requerido"),
    ojosBocaNariz: yup.string().trim().required("Ojos/Boca/Nariz requerido"),
    cuello: yup.string().trim().required("Cuello requerido"),
    torax: yup.string().trim().required("Torax requerido"),
    abdomen: yup.string().trim().required("Abdomen requerido"),
    genitourinario: yup.string().trim().required("Genitourinario requerido"),
    osteomuscular: yup.string().trim().required("Osteomuscular requerido"),
    extremidades: yup.string().trim().required("Extremidades requerido"),
    neurologico: yup.string().trim().required("Neurologico requerido"),
});

export const impresionDiagnosticaSchema = yup.object({
    analisis: yup.string().trim().required("Diagnostico requerido"),
});

export const formulacionSchema = yup.object({
    cantidad: yup.number().required("Cantidad requerida"),
    descripcionManual: yup.string().trim().required("Descripcion requerida"),
});

export const facturacionSchema = yup.object({
    valor: yup.number().required("Valor requerido"),
});

export const certificadoVisualSchema = yup.object({
    ojoDerechoAgudezaVisual: yup.string().trim().required("Agudeza Visual Ojo Derecho requerido"),
    ojoIzquierdoAgudezaVisual: yup.string().trim().required("Agudeza Visual Ojo Izquierdo requerido"),
    ojoDerechoReconoceColores: yup.string().trim().required("Reconoce Colores Ojo Derecho requerido"),
    ojoIzquierdoReconoceColores: yup.string().trim().required("Reconoce Colores Ojo Izquierdo requerido"),
    ojoDerechoReconoceFormas: yup.string().trim().required("Reconoce Formas Ojo Derecho requerido"),
    ojoIzquierdoReconoceFormas: yup.string().trim().required("Reconoce Formas Ojo Izquierdo requerido"),
    conclusion: yup.string().trim().required("Conclusion requerido"),
});

export const certificadoSaludSchema = yup.object({
    abandonoNegligencia: yup.string().trim().required("Abandono/Negligencia requerido"),
    audicionOidoDerecho: yup.string().trim().required("Audicion Oido Derecho requerido"),
    audicionOidoIzquierdo: yup.string().trim().required("Audicion Oido Izquierdo requerido"),
    convivirCompartir: yup.string().trim().required("Convivir/Compartir requerido"),
    discapacidadLimitacionFisica: yup.string().trim().required("Discapacidad/Limitacion Fisica requerido"),
    maltratoViolencia: yup.string().trim().required("Maltrato/Violencia requerido"),
    peso: yup.string().trim().required("Peso requerido"),
    piezasDentarias: yup.string().trim().required("Piezas Dentarias requerido"),
    presenciaCaries: yup.string().trim().required("Presencia de Caries requerido"),
    recomendacionAuditiva: yup.string().trim().required("Recomendacion Auditiva requerido"),
    recomendacionGeneral: yup.string().trim().required("Recomendacion General requerido"),
    recomendacionVisual: yup.string().trim().required("Recomendacion Visual requerido"),
    recomendacionesDental: yup.string().trim().required("Recomendaciones Dental requerido"),
    talla: yup.string().trim().required("Talla requerido"),
    visionOjoDerecho: yup.string().trim().required("Vision Ojo Derecho requerido"),
    visionOjoIzquierdo: yup.string().trim().required("Vision Ojo Izquierdo requerido"),
});