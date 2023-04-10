import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import { anamnesisSchema } from '../../schemas/schemas';
import { moduleCompleted, formatInitialValues } from '../../helpers/helpers';
import { anamnesisFields } from '../../data/inputs';
import { useFormik } from 'formik';
import usePacienteStore from '../../store/usePacienteStore';
import useUpdate from '../../hooks/useUpdate';

export default function Anamnesis() {
    const { paciente } = usePacienteStore();
    const updatePaciente = useUpdate();

    const formik = useFormik({
        initialValues: paciente.anamnesis || formatInitialValues(anamnesisFields),
        validationSchema: anamnesisSchema,
        onSubmit: (data) => updatePaciente({ module: "anamnesis", data })
    });

    const handleNiega = () => {
        const { enfermedadActual, motivoConsulta, ...rest } = formik.values;
        const newValues = Object.keys(rest).reduce((acc, key) => ({ ...acc, [key]: "Niega" }), {});
        formik.setValues({ ...newValues, enfermedadActual, motivoConsulta });
    }

    return (
        <form style={{ display: 'flex', flexWrap: 'wrap', gap: "1em" }} onSubmit={formik.handleSubmit} autoComplete="off">
            <TextField
                id="enfermedadActual"
                label="Enfermedad Actual"
                name="enfermedadActual"
                variant="standard"
                style={{ width: '50%' }}
                type="text"
                value={formik.values.enfermedadActual}
                onChange={formik.handleChange}
                error={formik.touched.enfermedadActual && Boolean(formik.errors.enfermedadActual)}
                helperText={formik.touched.enfermedadActual && formik.errors.enfermedadActual}
            />
            <TextField
                id="motivoConsulta"
                label="Motivo de Consulta"
                name="motivoConsulta"
                variant="outlined"
                style={{ width: '78%' }}
                multiline
                minRows={2}
                maxRows={5}
                type="text"
                value={formik.values.motivoConsulta}
                onChange={formik.handleChange}
                error={formik.touched.motivoConsulta && Boolean(formik.errors.motivoConsulta)}
                helperText={formik.touched.motivoConsulta && formik.errors.motivoConsulta}
            />
            <Grid container rowSpacing={2}>
                {anamnesisFields.slice(2).map(({ name, property }, index) => (
                    <Grid item xs={12} md={5} key={index}>
                        <TextField
                            id={property}
                            name={property}
                            label={name}
                            type="text"
                            variant="standard"
                            fullWidth
                            style={{ width: '90%' }}
                            value={formik.values[property]}
                            onChange={formik.handleChange}
                            error={formik.touched[property] && Boolean(formik.errors[property])}
                            helperText={formik.touched[property] && formik.errors[property]}
                        />
                    </Grid>
                ))}
            </Grid>
            <ButtonGroup>
                <Button disabled={!moduleCompleted("datosBasicos")} variant="contained" type='submit'>Guardar</Button>
                <Button variant="contained" color="secondary" onClick={handleNiega}>Niega</Button>
            </ButtonGroup>
        </form>
    );
}