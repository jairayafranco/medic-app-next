import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react'
import Selector from '../../components/Selector';
import DateSelector from '../../components/DatePicker';
import styles from '../../styles/datosBasicos.module.css'
import { useFormik } from 'formik';
import { datosBasicosSchema } from '../../schemas/schemas';
import { AppContext } from '../../context/AppContext';
import Dialog from '../../components/Dialog';
import Confirm from '../../components/Confirm';
import { saveSessionStorageData, getSessionStorageData, clearSessionStorageData, availableSessionStorageData } from '../../helpers/helpers';
import { createPaciente, searchPaciente, deletePaciente, updatePaciente } from '../../api/axiosApi';

export default function DatosBasicos() {
    const { notifyHandler, backdropHandler } = AppContext();

    useEffect(() => {
        const data = getSessionStorageData("datosBasicos");
        if (data) {
            formik.setValues(data);
        }
    }, []);

    const campos = [
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

    const formik = useFormik({
        initialValues: {
            ...campos.reduce((acc, { property }) => ({ ...acc, [property]: '' }), {})
        },
        validationSchema: datosBasicosSchema,
        onSubmit: values => {
            backdropHandler(true);
            createPaciente(values).then(res => {
                if (!res.status) {
                    notifyHandler(true, res.type, res.message);
                    return;
                }

                notifyHandler(true, res.type, res.message);
                saveSessionStorageData("datosBasicos", values);
            }).finally(() => backdropHandler(false));
        }
    });

    const handleSearchPaciente = (id) => {
        backdropHandler(true);
        const closeDialog = searchPaciente(id).then(res => {
            if (!res.status) {
                notifyHandler(true, res.type, res.message);
                return false;
            }

            formik.setValues(res.paciente.datosBasicos);
            saveSessionStorageData("", res.paciente);
            return true;
        }).finally(() => backdropHandler(false));

        return closeDialog; // Esto es para cerrar el dialogo segun sea el caso
    }

    const handleDeletePaciente = () => {
        backdropHandler(true);
        deletePaciente().then(res => {
            if (!res.status) {
                notifyHandler(true, res.type, res.message);
                return;
            }

            notifyHandler(true, res.type, res.message);
            clearSessionStorageData();
            formik.resetForm();
        }).finally(() => backdropHandler(false));
    }

    const handleUpdatePaciente = () => {
        const formikValues = formik.values;

        backdropHandler(true);
        updatePaciente(formikValues).then(res => {
            if (!res.status) {
                notifyHandler(true, res.type, res.message);
                return;
            }

            notifyHandler(true, res.type, res.message);
            saveSessionStorageData("datosBasicos", formikValues);
        }).finally(() => backdropHandler(false));
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }} autoComplete="off">
            <Grid container rowSpacing={2}>
                {campos.map(({ name, property, type, options }, index) => (
                    <Grid item xs={12} md={5} key={index}>
                        {
                            ![4, 5, 12].includes(index) && (
                                <TextField
                                    autoComplete='off'
                                    id={property}
                                    name={property}
                                    label={name}
                                    value={formik.values[property]}
                                    onChange={formik.handleChange}
                                    type={type}
                                    variant="standard"
                                    fullWidth
                                    style={{ width: '90%' }}
                                    error={formik.touched[property] && Boolean(formik.errors[property])}
                                    helperText={formik.touched[property] && formik.errors[property]}
                                />
                            )
                        }
                        {
                            index === 5 && (
                                <DateSelector
                                    label={name}
                                    name={property}
                                    value={formik.values[property]}
                                    onChange={value => formik.setFieldValue(property, value)}
                                    error={formik.touched[property] && Boolean(formik.errors[property])}
                                    helperText={formik.touched[property] && formik.errors[property]}
                                />
                            )
                        }
                        {
                            [4, 12].includes(index) && (
                                <Selector
                                    title={name}
                                    value={formik.values[property]}
                                    values={options}
                                    error={formik.touched[property] && Boolean(formik.errors[property])}
                                    onChange={value => formik.setFieldValue(property, value)}
                                    helperText={formik.touched[property] && formik.errors[property]}
                                />
                            )
                        }
                    </Grid>
                ))}
            </Grid>
            <ButtonGroup
                id={styles.buttonsContainer}
                orientation='horizontal' variant="contained"
                sx={{ mt: 3 }}
            >
                <Grid item className={styles.buttonGrid}>
                    <Button onClick={formik.handleSubmit} disabled={availableSessionStorageData()}>Crear</Button>
                    <Dialog
                        buttonTitle="Buscar"
                        title="Buscar Paciente"
                        label="Identificacion Paciente"
                        buttonActionTitle="Buscar"
                        buttonAction={handleSearchPaciente}
                    />
                    <Button disabled={!availableSessionStorageData()} onClick={handleUpdatePaciente}>Actualizar</Button>
                    <Button onClick={() => { formik.resetForm(), clearSessionStorageData() }}>Limpiar</Button>
                    <Confirm
                        buttonTitle="Eliminar"
                        title="Eliminar Paciente"
                        content="¿Esta seguro que desea eliminar este paciente?"
                        buttonAction={handleDeletePaciente}
                        disabled={!availableSessionStorageData()}
                    />
                </Grid>
            </ButtonGroup>
        </div>
    );
}

function UserPicture() {
    return (
        <Grid item xs={12} md={5} sx={{
            display: 'flex', alignItems: 'center', gap: 0.5
        }}>
            <Avatar
                alt="Remy Sharp"
                src={''}
                sx={{ width: 80, height: 80, my: 0.5 }}
            />
            <ButtonGroup orientation='horizontal' variant="contained">
                <Button color="secondary" component="label">
                    Tomar Foto
                </Button>
                <Button component="label">
                    Subir Foto
                    <input
                        type="file"
                        hidden
                        accept='image/*'
                    />
                </Button>
            </ButtonGroup>
        </Grid>
    );
} 