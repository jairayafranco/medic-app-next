import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import { signosVitalesSchema } from '../../schemas/schemas';
import {
    moduleCompleted,
    signosVitalesColorSchema,
    handleSVInputValues,
    formatInitialValues,
} from '../../helpers/helpers';
import { saveSignosVitalesHistory } from '../../services/axiosApi';
import FullScreenModal from '../../components/FullScreenModal';
import DataTable from '../../components/DataTable';
import { signosVitalesFields } from '../../data/inputs';
import usePacienteStore from '../../store/usePacienteStore';
import { useFormik } from 'formik';
import useUpdate from '../../hooks/useUpdate';

export default function SignosVitales() {
    const { paciente, setPacienteModule } = usePacienteStore();
    const updatePaciente = useUpdate();

    const formik = useFormik({
        initialValues: paciente.signosVitales || formatInitialValues(signosVitalesFields),
        validationSchema: signosVitalesSchema,
        onSubmit: (data) => {
            updatePaciente({ module: "signosVitales", data });
            saveSignosVitalesHistory(paciente.datosBasicos.idUsuario, data).then(({ newHistoryRegister }) => {
                const orderHistory = [...paciente.signosVitalesHistory];
                orderHistory.length === 0
                    ? orderHistory.push(newHistoryRegister)
                    : orderHistory.unshift(newHistoryRegister);
                setPacienteModule("signosVitalesHistory", orderHistory);
            }).catch(err => console.log(err));
        }
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
                        columns={[{ headerName: 'Fecha', field: 'fecha', width: 205 }, signosVitalesFields.map((item) => {
                            return item.fields.map((field) => {
                                return { headerName: field.name, field: field.property, width: field.name.length * 10 }
                            })
                        }).flat()].flat()}
                        rows={paciente.signosVitalesHistory || []}
                    />
                </FullScreenModal>
            </ButtonGroup>
        </form>
    );
}