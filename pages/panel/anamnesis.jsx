import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react'
import { anamnesisSchema } from '../../schemas/schemas';
import { AppContext } from '../../context/AppContext';
import { saveSessionStorageData, getSessionStorageData, moduleCompleted, formatInitialValues } from '../../helpers/helpers';
import { anamnesisFields } from '../../data/inputs';

export default function Anamnesis() {
    const { updateModule } = AppContext();

    useEffect(() => {
        const data = getSessionStorageData("anamnesis");
        if (data) {
            formik.setValues(data);
        }
    }, [])

    const formik = updateModule({
        initialValues: formatInitialValues(anamnesisFields),
        schema: anamnesisSchema,
    }, (data) => {
        saveSessionStorageData("anamnesis", data);
    });

    const handleNiega = () => {
        const values = formik.values;
        const newValues = Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: "Niega" }), {});
        newValues.enfermedadActual = formik.values.enfermedadActual;
        newValues.motivoConsulta = formik.values.motivoConsulta;
        formik.setValues(newValues);
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