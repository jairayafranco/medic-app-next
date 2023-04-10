import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import { examenFisicoSchema } from '../../schemas/schemas';
import { moduleCompleted, formatInitialValues } from '../../helpers/helpers';
import FullScreenModal from '../../components/FullScreenModal';
import BarthelTable from '../../components/TestBarthel';
import { examenFisicoFields } from '../../data/inputs';
import usePacienteStore from '../../store/usePacienteStore';
import useUpdate from '../../hooks/useUpdate';
import { useFormik } from 'formik';
import { useEffect } from 'react';

export default function ExamenFisico() {
    const { paciente, barthelResults, setBarthelResults } = usePacienteStore();
    const updatePaciente = useUpdate();

    useEffect(() => {
        if (paciente.examenFisico?.barthel) {
            setBarthelResults(paciente.examenFisico.barthel);
        }
        return () => {
            setBarthelResults({ points: {}, barthel: 'No aplica', puntuacion: 'No aplica' });
        }
    }, []);

    const formik = useFormik({
        initialValues: paciente.examenFisico || formatInitialValues(examenFisicoFields),
        validationSchema: examenFisicoSchema,
        onSubmit: (values) => updatePaciente({ module: "examenFisico", data: { ...values, barthel: barthelResults } })
    });

    const handleNormal = () => {
        const values = formik.values;
        const newValues = Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: "Normal" }), {});
        formik.setValues(newValues);
    }

    return (
        <form style={{ display: 'flex', flexWrap: 'wrap', gap: "1.5em" }} onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container spacing={2}>
                {
                    examenFisicoFields.map((campo, index) => (
                        <Grid item xs={12} md={5} key={index}>
                            <TextField
                                id={campo.name}
                                name={campo.property}
                                label={campo.name}
                                value={formik.values[campo.property]}
                                onChange={formik.handleChange}
                                error={formik.touched[campo.property] && Boolean(formik.errors[campo.property])}
                                helperText={formik.touched[campo.property] && formik.errors[campo.property]}
                                type="text"
                                variant="standard"
                                style={{ width: '90%' }}
                            />
                        </Grid>
                    ))
                }
            </Grid>
            <Grid container justifyContent='space-between'>
                <Grid item xs={12} md={6}>
                    <ButtonGroup variant="contained">
                        <Button color="primary" type="submit" disabled={!moduleCompleted('funcionRenal')}>Guardar</Button>
                        <Button color="secondary" onClick={handleNormal}>Normal</Button>
                    </ButtonGroup>
                </Grid>

                <Grid item xs={12} md={6}>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={2}>Test de Barthel</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width={100}>
                                    <TextField
                                        size='small'
                                        variant="outlined"
                                        type="text"
                                        inputProps={{
                                            readOnly: true,
                                            style: { textAlign: 'center' }
                                        }}
                                        value={barthelResults.puntuacion}
                                    />
                                </td>
                                <td>
                                    <TextField
                                        size='small'
                                        variant="outlined"
                                        type="text"
                                        inputProps={{
                                            readOnly: true,
                                            style: { textAlign: 'center' }
                                        }}
                                        value={barthelResults.barthel}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='2' align='center'>
                                    <FullScreenModal buttonName='Escala de Barthel' title='Escala de Barthel' color='success'>
                                        <BarthelTable />
                                    </FullScreenModal>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Grid>
            </Grid>
        </form>
    );
}