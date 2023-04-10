import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect } from 'react'
import { funcionRenalSchema } from '../../schemas/schemas';
import { moduleCompleted, calculateAge, handleFRInputValues, funcionRenalColorSchema, formatInitialValues } from '../../helpers/helpers';
import { funcionRenalFields } from '../../data/inputs';
import useUpdate from '../../hooks/useUpdate';
import usePacienteStore from '../../store/usePacienteStore';
import { useFormik } from 'formik';

export default function FuncionRenal() {
    const { paciente } = usePacienteStore();
    const updatePaciente = useUpdate();

    useEffect(() => {
        const data = paciente.funcionRenal;
        if (!data) {
            const { datosBasicos, signosVitales } = paciente || {};
            if (datosBasicos && signosVitales) {
                const { fechaNacimiento, genero, peso, talla } = { ...datosBasicos, ...signosVitales };
                const edad = calculateAge(fechaNacimiento);
                const data = {
                    fields: ['edad', 'sexo', 'peso', 'talla'],
                    values: [edad, genero, peso, talla]
                }
                data.fields.forEach((field, index) => {
                    formik.setFieldValue(field, data.values[index]);
                });
            }
        }
    }, []);

    const formik = useFormik({
        initialValues: paciente.funcionRenal || formatInitialValues(funcionRenalFields),
        validationSchema: funcionRenalSchema,
        onSubmit: (data) => updatePaciente({ module: "funcionRenal", data }),
    });

    return (
        <form style={{ display: 'flex', flexWrap: 'wrap', gap: "1.5em" }} onSubmit={formik.handleSubmit} autoComplete="off">
            {
                funcionRenalFields.map((group, index) => (
                    <Container key={index} group={group.group}>
                        {
                            group.fields.map((campo, index) => (
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
                            ))
                        }
                    </Container>
                ))
            }
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