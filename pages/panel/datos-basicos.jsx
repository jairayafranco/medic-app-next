import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useState, useEffect, useRef } from 'react'
// import Selector from '../../components/Selector'
// import BasicDatePicker from '../../components/DatePicker'
// import FormDialog from '../../components/Dialog'
// import Confirm from '../../components/Confirm'
import styles from '../../styles/datosBasicos.module.css'
// import { getPaciente, createPaciente, updatePaciente, deletePaciente } from '../../api'
// import Notify from '../../components/Snackbar'
// import Loader from '../../components/Backdrop'
import { useFormik } from 'formik';
import { datosBasicosSchema } from '../../schemas/schemas';

export default function DatosBasicos() {

    const campos = [
        { name: 'Identificacion Medico', property: 'idMedico' },
        { name: 'Nombre Medico', property: 'nombreMedico' },
        { name: 'Identificacion Usuario', property: 'idUsuario' },
        { name: 'Nombres y Apellidos', property: 'nombreUsuario' },
        { name: 'Genero', property: 'genero' },
        { name: 'Fecha de Nacimiento', property: 'fechaNacimiento' },
        { name: 'Direccion', property: 'direccion' },
        { name: 'Contacto Telefonico', property: 'contacto' },
        { name: 'EPS', property: 'eps' },
        { name: 'Nivel', property: 'nivel' },
        { name: 'Nombre del Acompañante', property: 'nombreAcompanante' },
        { name: 'Contacto del Acompañante', property: 'contactoAcompanante' },
        { name: 'Tipo de Consulta', property: 'tipoConsulta' }
    ];

    const formik = useFormik({
        initialValues: {
            ...campos.reduce((acc, { property }) => ({ ...acc, [property]: '' }), {})
        },
        validationSchema: datosBasicosSchema,
        onSubmit: values => {
            console.log(values);
        }
    })

    return (
        <form style={{ display: 'flex', flexWrap: 'wrap' }} onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container rowSpacing={2}>
                {campos.map(({ name, property }, index) => (
                    <Grid item xs={12} md={5} key={index}>
                        <TextField
                            label={name}
                            name={property}
                            value={formik.values[property]}
                            onInput={formik.handleChange}
                            variant="standard"
                            fullWidth
                            style={{ width: '90%' }}
                            error={formik.touched[property] && Boolean(formik.errors[property])}
                            helperText={formik.touched[property] && formik.errors[property]}
                        />
                    </Grid>
                ))}
                <Grid item xs={12} md={5} sx={{
                    display: 'flex', alignItems: 'center'
                }}>
                    <Avatar
                        alt="Remy Sharp"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        sx={{ width: 100, height: 100, mt: 0.5, mb: 0.5, ml: 1 }}
                    />
                    <Button variant="contained" component="label" sx={{ mt: 0.5, ml: 1 }}>
                        Subir Foto
                        <input type="file" hidden />
                    </Button>
                </Grid>
            </Grid>
            <ButtonGroup id={styles.buttonsContainer} orientation='horizontal' variant="contained" sx={{ mt: -5 }}>
                <Grid item className={styles.buttonGrid}>
                    <Button type="submit">Crear</Button>
                    <Button>Buscar</Button>
                    <Button>Actualizar</Button>
                    <Button onClick={() => formik.resetForm()}>Limpiar</Button>
                    <Button color="error">Eliminar</Button>
                </Grid>
            </ButtonGroup>
        </form>
    );
}