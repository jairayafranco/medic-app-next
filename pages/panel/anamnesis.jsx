import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react'
import { useFormik } from 'formik';
import { anamnesisSchema } from '../../schemas/schemas';
import { AppContext } from '../../context/AppContext';
import { saveSessionStorageData, getSessionStorageData, availableSessionStorageData, updatePaciente } from '../../helpers/helpers';

export default function Anamnesis() {
    const { notifyHandler } = AppContext();

    useEffect(() => {
        const data = getSessionStorageData("anamnesis");
        if (data) {
            formik.setValues(data);
        }
    }, [])

    const campos = [
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

    const formik = useFormik({
        initialValues: {
            ...campos.reduce((acc, { property }) => ({ ...acc, [property]: "" }), {}),
        },
        validationSchema: anamnesisSchema,
        onSubmit: (values) => {
            const anamnesisData = getSessionStorageData("anamnesis");
            const formikValues = values;

            updatePaciente(anamnesisData, formikValues, "anamnesis").then(res => {
                const data = res.data || res.response?.data;

                if (data.empty) notifyHandler(true, 'warning', data.message, { backdrop: false });

                if (data.status) {
                    notifyHandler(true, 'success', data.message, { backdrop: false });
                    saveSessionStorageData("anamnesis", formikValues);
                }

                if (!data.status) notifyHandler(true, 'warning', data.message, { backdrop: false });
                if (data.error) notifyHandler(true, 'error', data.message, { backdrop: false });
            });
        },
    });

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
                rows={2}
                type="text"
                value={formik.values.motivoConsulta}
                onChange={formik.handleChange}
                error={formik.touched.motivoConsulta && Boolean(formik.errors.motivoConsulta)}
                helperText={formik.touched.motivoConsulta && formik.errors.motivoConsulta}
            />
            <Grid container rowSpacing={2}>
                {campos.slice(2).map((campo, index) => (
                    <Grid item xs={12} md={5} key={index}>
                        <TextField
                            id={campo.property}
                            name={campo.property}
                            label={campo.name}
                            type="text"
                            variant="standard"
                            fullWidth
                            style={{ width: '90%' }}
                            value={formik.values[campo.property]}
                            onChange={formik.handleChange}
                            error={formik.touched[campo.property] && Boolean(formik.errors[campo.property])}
                            helperText={formik.touched[campo.property] && formik.errors[campo.property]}
                        />
                    </Grid>
                ))}
            </Grid>
            <Button type="submit" variant="contained" color="primary" disabled={!availableSessionStorageData()}>Guardar</Button>
        </form>
    );
}