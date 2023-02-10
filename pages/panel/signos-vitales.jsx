import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect, useState } from 'react'
import { signosVitalesSchema } from '../../schemas/schemas';
import { AppContext } from '../../context/AppContext';
import { saveSessionStorageData, getSessionStorageData, moduleCompleted, signosVitalesColorSchema, handleSVInputValues } from '../../helpers/helpers';
import { getSignosVitalesHistory, saveSignosVitalesHistory } from '../../api/axiosApi';
import FullScreenModal from '../../components/FullScreenModal';
import DataTable from '../../components/DataTable';
import { signosVitalesFields } from '../../data/inputs';

export default function SignosVitales() {
    const { useUpdateNew } = AppContext();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const data = getSessionStorageData("signosVitales");
        if (data) {
            formik.setValues(data);
        }
        getSignosVitalesHistory().then(res => setHistory(res?.history))
    }, []);

    const formik = useUpdateNew({
        initialValues: {
            ...signosVitalesFields.reduce((acc, curr) => {
                curr.fields.forEach(field => {
                    acc[field.property] = "";
                });
                return acc;
            }, {})
        },
        schema: signosVitalesSchema,
    }, (data) => {
        saveSessionStorageData("signosVitales", data);
        saveSignosVitalesHistory(data).then(() => getSignosVitalesHistory().then(res => setHistory(res?.history)));
    });

    return (
        <form style={{ display: 'flex', flexWrap: 'wrap', gap: "2em" }} onSubmit={formik.handleSubmit} autoComplete="off">
            {signosVitalesFields.map((group, index) => (
                <Paper key={index} elevation={3} sx={{ p: 2, width: '100%' }}>
                    <Grid container rowSpacing={2}>
                        {
                            group.fields.map((campo, index) => (
                                <Grid item xs={12} md={5} key={index}>
                                    <TextField
                                        id={campo.property}
                                        name={campo.property}
                                        label={campo.name + " " + campo.abrev}
                                        variant={campo.variant}
                                        type={campo.type}
                                        style={{ width: "90%", backgroundColor: signosVitalesColorSchema(campo, formik) }}
                                        value={handleSVInputValues(formik, campo)}
                                        onInput={formik.handleChange}
                                        error={formik.touched[campo.property] && Boolean(formik.errors[campo.property])}
                                        helperText={formik.touched[campo.property] && formik.errors[campo.property]}
                                        size={campo.size}
                                        InputLabelProps={{
                                            shrink: campo.shrink,
                                        }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">{campo.unit}</InputAdornment>,
                                            readOnly: campo.readOnly,
                                        }}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Paper>
            ))}
            <ButtonGroup>
                <Button variant="contained" type="submit" disabled={!moduleCompleted("antecedentes")}>Guardar</Button>
                <FullScreenModal buttonName='historial' title='Historial Signos Vitales'>
                    <DataTable
                        columns={[{ headerName: 'Fecha', field: 'fecha', width: 180 }, signosVitalesFields.map((item) => {
                            return item.fields.map((field) => {
                                return { headerName: field.name, field: field.property, width: 130 }
                            })
                        }).flat()].flat()}
                        rows={history}
                    />
                </FullScreenModal>
            </ButtonGroup>
        </form>
    );
}