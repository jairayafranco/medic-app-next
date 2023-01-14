import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect } from 'react'
import { useFormik } from 'formik';
import { funcionRenalSchema } from '../../schemas/schemas';
import { AppContext } from '../../context/AppContext';
import { saveSessionStorageData, getSessionStorageData, updatePaciente, moduleCompleted, calculateAge } from '../../helpers/helpers';

export default function FuncionRenal() {
    const { notifyHandler, backdropHandler } = AppContext();

    useEffect(() => {
        // const data = getSessionStorageData('funcionRenal');
        // if (data) {
        //     formik.setValues(data);
        // }

        const { datosBasicos, signosVitales } = getSessionStorageData("") || {};
        if (datosBasicos && signosVitales) {
            const { fechaNacimiento, genero, peso, talla } = { ...datosBasicos, ...signosVitales };
            const edad = calculateAge(fechaNacimiento);

            formik.setFieldValue('edad', edad);
            formik.setFieldValue('sexo', genero);
            formik.setFieldValue('peso', peso);
            formik.setFieldValue('talla', talla);
        }
    }, []);

    const campos = [
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
                { name: 'TFG Corregida', property: 'tfgCorregida', unit: 'mL/min/1,73 m2', readOnly: true, size: 'small', shrink: true, variant: 'filled' },
                { name: 'Estadio', property: 'estadio', unit: '', readOnly: true, size: 'small', shrink: true, variant: 'filled' },
                { name: 'Clasificacion (KDIGO)', property: 'clasificacion', unit: '', readOnly: true, size: 'small', shrink: true, variant: 'filled' },
            ]
        },

    ];

    const formik = useFormik({
        initialValues: {
            ...campos.reduce((acc, curr) => {
                curr.fields.forEach(field => {
                    acc[field.property] = '';
                });
                return acc;
            }, {})
        },
        validationSchema: funcionRenalSchema,
        onSubmit: values => {
            console.log(values);
        }
    });

    return (
        <form style={{ display: 'flex', flexWrap: 'wrap', gap: "1.5em" }} onSubmit={formik.handleSubmit} autoComplete="off">
            {campos.map((group, index) => (
                <Container key={index} group={group.group}>
                    {group.fields.map((campo, index) => (
                        <Grid item xs={12} md={5} key={index}>
                            <TextField
                                id={campo.name}
                                name={campo.property}
                                label={campo.name}
                                value={formik.values[campo.property]}
                                onChange={formik.handleChange}
                                error={formik.touched[campo.property] && Boolean(formik.errors[campo.property])}
                                helperText={formik.touched[campo.property] && formik.errors[campo.property]}
                                InputProps={{
                                    readOnly: campo.readOnly,
                                    endAdornment: <InputAdornment position="end">{campo.unit}</InputAdornment>,
                                }}
                                size={campo.size}
                                InputLabelProps={{
                                    shrink: campo.shrink,
                                }}
                                style={{ width: '90%' }}
                                variant={campo.variant}
                                type={campo.type}
                            />
                        </Grid>
                    ))}
                </Container>
            ))}
            <Button variant="contained" color="primary" type="submit" disabled={!moduleCompleted("signosVitales")}>
                Guardar
            </Button>
        </form>
    );
}

const Container = ({ group, children }) => {
    return (
        group === 1 ? (
            <Grid container rowSpacing={2}>
                {children}
            </Grid>
        ) : (
            <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
                <Grid container rowSpacing={2}>
                    {children}
                </Grid>
            </Paper>
        )
    );
}