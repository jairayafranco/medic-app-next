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
import axios from 'axios';
import { saveSessionStorageData, getSessionStorageData, clearSessionStorageData, availableSessionStorageData, updatePaciente } from '../../helpers/helpers';

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
            axios.post('/api/data/paciente', values).then(({ data: { status, message } }) => {
                if (status) {
                    notifyHandler(true, 'success', message);
                    saveSessionStorageData("datosBasicos", values);
                }
            }).catch(({ response: { data: { error, status, message } } }) => {
                if (!status) notifyHandler(true, 'warning', message);
                if (error) notifyHandler(true, 'error', message);
            }).finally(() => backdropHandler(false));
        }
    });

    const searchPaciente = (id) => {
        backdropHandler(true);
        axios.get(`/api/data/paciente?id=${id}`).then(({ data: { status, paciente } }) => {
            if (status) {
                formik.setValues(paciente.datosBasicos);
                saveSessionStorageData("", paciente);
            }
        }).catch(({ response: { data: { error, status, message } } }) => {
            if (!status) notifyHandler(true, 'warning', message);
            if (error) notifyHandler(true, 'error', message);
        }).finally(() => backdropHandler(false));
    }

    const deletePaciente = () => {
        const id = getSessionStorageData("datosBasicos")?.idUsuario;
        backdropHandler(true);
        axios.delete(`/api/data/paciente?id=${id}`).then(({ data: { status, message } }) => {
            if (status) {
                notifyHandler(true, 'success', message);
                clearSessionStorageData();
                formik.resetForm();
            }
        }).catch(({ response: { data: { error, status, message } } }) => {
            if (!status) notifyHandler(true, 'warning', message);
            if (error) notifyHandler(true, 'error', message);
        }).finally(() => backdropHandler(false));
    }

    const handleUpdatePaciente = () => {
        backdropHandler(true);
        const userData = getSessionStorageData("datosBasicos");
        const formikValues = formik.values;

        updatePaciente(userData, formikValues, "datosBasicos").then(res => {
            const data = res.data || res.response?.data;

            if (data.empty) notifyHandler(true, 'warning', data.message);

            if (data.status) {
                notifyHandler(true, 'success', data.message);
                saveSessionStorageData("datosBasicos", formikValues);
            }

            if (!data.status) notifyHandler(true, 'warning', data.message);
            if (data.error) notifyHandler(true, 'error', data.message);
        }).finally(() => backdropHandler(false));
    }

    return (
        <form style={{ display: 'flex', flexWrap: 'wrap' }} onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container rowSpacing={2}>
                {campos.map(({ name, property, type, options }, index) => (
                    <Grid item xs={12} md={5} key={index}>
                        {
                            ![4, 5, 12].includes(index) && (
                                <TextField
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
                <Grid item xs={12} md={5} sx={{
                    display: 'flex', alignItems: 'center'
                }}>
                    <Avatar
                        alt="Remy Sharp"
                        src={''}
                        sx={{ width: 100, height: 100, mt: 0.5, mb: 0.5, ml: 1 }}
                    />
                    <Button variant="contained" color="secondary" component="label" sx={{ mt: 0.5, ml: 1 }}>
                        Tomar Foto
                    </Button>
                    <Button variant="contained" component="label" sx={{ mt: 0.5, ml: 1 }}>
                        Subir Foto
                        <input
                            type="file"
                            hidden
                            accept='image/*'
                        />
                    </Button>
                </Grid>
            </Grid>
            <ButtonGroup id={styles.buttonsContainer} orientation='horizontal' variant="contained" sx={{ mt: -3 }}>
                <Grid item className={styles.buttonGrid}>
                    <Button type="submit" disabled={availableSessionStorageData()}>Crear</Button>
                    <Dialog
                        buttonTitle="Buscar"
                        title="Buscar Paciente"
                        label="Identificacion Paciente"
                        buttonActionTitle="Buscar"
                        buttonAction={searchPaciente}
                    />
                    <Button disabled={!availableSessionStorageData()} onClick={handleUpdatePaciente}>Actualizar</Button>
                    <Button onClick={() => { formik.resetForm(), clearSessionStorageData() }}>Limpiar</Button>
                    <Confirm
                        buttonTitle="Eliminar"
                        title="Eliminar Paciente"
                        content="¿Esta seguro que desea eliminar este paciente?"
                        buttonAction={deletePaciente}
                        disabled={!availableSessionStorageData()}
                    />
                </Grid>
            </ButtonGroup>
        </form>
    );
}