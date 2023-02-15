import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react'
import { antecedentesSchema } from '../../schemas/schemas';
import { AppContext } from '../../context/AppContext';
import { saveSessionStorageData, getSessionStorageData, moduleCompleted, formatInitialValues } from '../../helpers/helpers';
import { antecedentesFields } from '../../data/inputs';

export default function Antecedentes() {
    const { updateModule } = AppContext();

    useEffect(() => {
        const data = getSessionStorageData("antecedentes");
        if (data) {
            formik.setValues(data);
        }
    }, []);

    const formik = updateModule({
        initialValues: formatInitialValues(antecedentesFields),
        schema: antecedentesSchema,
    }, (data) => saveSessionStorageData("antecedentes", data));

    const handleNiega = () => {
        const values = formik.values;
        const newValues = Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: "Niega" }), {});
        formik.setValues(newValues);
    }

    return (
        <form style={{ display: 'flex', flexWrap: 'wrap', gap: "1em" }} onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container rowSpacing={2}>
                {antecedentesFields.map(({ name, property }) => (
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