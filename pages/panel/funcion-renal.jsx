import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect } from 'react'
import { funcionRenalSchema } from '../../schemas/schemas';
import { AppContext } from '../../context/AppContext';
import { saveSessionStorageData, getSessionStorageData, moduleCompleted, calculateAge, handleFRInputValues, funcionRenalColorSchema } from '../../helpers/helpers';
import { funcionRenalFields } from '../../data/inputs';

export default function FuncionRenal() {
    const { useUpdateNew } = AppContext();

    useEffect(() => {
        const data = getSessionStorageData('funcionRenal');
        if (data) {
            formik.setValues(data);
        } else {
            const { datosBasicos, signosVitales } = getSessionStorageData("") || {};
            if (datosBasicos && signosVitales) {
                const { fechaNacimiento, genero, peso, talla } = { ...datosBasicos, ...signosVitales };
                const edad = calculateAge(fechaNacimiento);

                const fields = ['edad', 'sexo', 'peso', 'talla'];
                const values = [edad, genero, peso, talla];
                fields.forEach((field, index) => {
                    formik.setFieldValue(field, values[index]);
                });
            }
        }
    }, []);

    const formik = useUpdateNew({
        initialValues: {
            ...funcionRenalFields.reduce((acc, curr) => {
                curr.fields.forEach(field => {
                    acc[field.property] = '';
                });
                return acc;
            }, {})
        },
        schema: funcionRenalSchema,
    }, (data) => {
        saveSessionStorageData('funcionRenal', data);
    });

    return (
        <form style={{ display: 'flex', flexWrap: 'wrap', gap: "1.5em" }} onSubmit={formik.handleSubmit} autoComplete="off">
            {funcionRenalFields.map((group, index) => (
                <Container key={index} group={group.group}>
                    {group.fields.map((campo, index) => (
                        <Grid item xs={12} md={5} key={index}>
                            <TextField
                                id={campo.name}
                                name={campo.property}
                                label={campo.name}
                                value={handleFRInputValues(formik, campo)}
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
                                style={{ width: '90%', backgroundColor: funcionRenalColorSchema(formik, campo) }}
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