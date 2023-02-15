import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react'
import { examenFisicoSchema } from '../../schemas/schemas';
import { AppContext } from '../../context/AppContext';
import { saveSessionStorageData, getSessionStorageData, moduleCompleted, formatInitialValues } from '../../helpers/helpers';
import FullScreenModal from '../../components/FullScreenModal';
import BarthelTable from '../../components/TestBarthel';
import { examenFisicoFields } from '../../data/inputs';

export default function ExamenFisico() {
    const { useUpdateNew, barthelResults, setBarthelResults } = AppContext();

    useEffect(() => {
        const data = getSessionStorageData('examenFisico');
        if (data) {
            formik.setValues(data);
            setBarthelResults(data.barthel);
        } else {
            setBarthelResults({
                barthel: 'No aplica',
                puntuacion: 'No Aplica',
                points: {},
            });
        }
    }, []);

    const formik = useUpdateNew({
        initialValues: formatInitialValues(examenFisicoFields),
        schema: examenFisicoSchema,
        moreData: { barthel: barthelResults },
    }, (data) => {
        saveSessionStorageData('examenFisico', data);
    });

    const handleNormal = () => {
        const values = formik.values;
        const newValues = Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: "Normal" }), {});
        formik.setValues(newValues);
    }

    return (
        <form style={{ display: 'flex', flexWrap: 'wrap', gap: "1.5em" }} onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container spacing={2}>
                {examenFisicoFields.map((campo, index) => (
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
                ))}
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