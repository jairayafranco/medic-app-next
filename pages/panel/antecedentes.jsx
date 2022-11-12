import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react'
import { useFormik } from 'formik';
import { antecedentesSchema } from '../../schemas/schemas';
import { AppContext } from '../../context/AppContext';
import { saveSessionStorageData, getSessionStorageData, updatePaciente, moduleCompleted } from '../../helpers/helpers';

export default function Antecedentes() {
    const { notifyHandler, backdropHandler } = AppContext();

    useEffect(() => {
        const data = getSessionStorageData("antecedentes");
        if (data) {
            formik.setValues(data);
        }
    }, []);

    const campos = [
        { name: "Familiares", property: "familiares" },
        { name: "Patologicos", property: "patologicos" },
        { name: "Quirurgicos", property: "quirurgicos" },
        { name: "Traumaticos", property: "traumaticos" },
        { name: "Alergicos", property: "alergicos" },
        { name: "Hospitalizaciones", property: "hospitalizaciones" },
        { name: "Transfusiones", property: "transfusiones" },
        { name: "Cigarrillo - Humo de Leña", property: "cigarrilloHumoLeña" },
        { name: "Licor", property: "licor" },
        { name: "Sustancias Psicoactivas", property: "sustanciasPsicoactivas" },
        { name: "Farmacologicos", property: "farmacologicos" },
        { name: "Especialistas Tratantes", property: "especialistasTratantes" },
        { name: "Gineco-Obstetricos", property: "ginecoObstetricos" },
        { name: "Ultima Citologia Cervicovaginal", property: "ultimaCitologiaCervicoVaginal" },
        { name: "Otros Antecedentes - Pediatrico", property: "otrosAntecedentesPediatrico" },
        { name: "Otros Antecedentes - Adultos", property: "otrosAntecedentesAdultos" },
    ];

    const formik = useFormik({
        initialValues: {
            ...campos.reduce((acc, { property }) => ({ ...acc, [property]: "" }), {}),
        },
        validationSchema: antecedentesSchema,
        onSubmit: (values) => {
            backdropHandler(true);
            const antecedentesData = getSessionStorageData("antecedentes");
            const formikValues = values;

            updatePaciente(antecedentesData, formikValues, "antecedentes").then(res => {
                const data = res.data || res.response?.data;

                if (data.empty) notifyHandler(true, 'warning', data.message);

                if (data.status) {
                    notifyHandler(true, 'success', data.message);
                    saveSessionStorageData("antecedentes", formikValues);
                }

                if (!data.status) notifyHandler(true, 'warning', data.message);
                if (data.error) notifyHandler(true, 'error', data.message);
            }).finally(() => backdropHandler(false));
        },
    });

    const handleNiega = () => {
        const values = formik.values;
        const newValues = Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: "Niega" }), {});
        formik.setValues(newValues);
    }

    return (
        <form style={{ display: 'flex', flexWrap: 'wrap', gap: "1em" }} onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container rowSpacing={2}>
                {campos.map(({ name, property }) => (
                    <Grid item xs={12} md={5} key={property}>
                        <TextField
                            id={property}
                            name={property}
                            label={name}
                            variant="standard"
                            type="text"
                            style={{ width: "90%" }}
                            value={formik.values[property]}
                            onChange={formik.handleChange}
                            error={formik.touched[property] && Boolean(formik.errors[property])}
                            helperText={formik.touched[property] && formik.errors[property]}
                        />
                    </Grid>
                ))}
            </Grid>
            <ButtonGroup>
                <Button disabled={!moduleCompleted("anamnesis")} variant="contained" type='submit'>Guardar</Button>
                <Button variant="contained" color="secondary" onClick={handleNiega}>Niega</Button>
            </ButtonGroup>
        </form>
    );
}