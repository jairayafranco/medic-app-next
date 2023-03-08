import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { certificadoSaludFields } from '../data/inputs';
import { formatInitialValues, availableSessionStorageData } from '../helpers/helpers';
import { useFormik } from 'formik';
import Typography from '@mui/material/Typography';

export default function CertificadoSalud() {
    const formik = useFormik({
        initialValues: formatInitialValues(certificadoSaludFields),
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: "1.5em", padding: 15 }}>
            {
                certificadoSaludFields.map((group, index) => (
                    <Paper key={index} elevation={3} sx={{ p: 3, width: '100%' }}>
                        <Typography variant="p" sx={{ fontSize: 18 }} component="div" gutterBottom>
                            *{group.title}
                        </Typography>
                        <Grid container rowSpacing={2}>
                            {
                                group.fields.map((campo, index) => (
                                    <Grid item xs={12} md={5} key={index}>
                                        <TextField
                                            name={campo.property}
                                            label={campo.name}
                                            type={campo.type}
                                            variant="outlined"
                                            style={{ width: '90%' }}
                                            size="small"
                                            multiline={campo.multiline}
                                            rows={2}
                                            value={formik.values[campo.property]}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </Paper>
                ))
            }
            <Button type="submit" variant="contained" color="primary" disabled={!availableSessionStorageData("datosBasicos")}>
                Imprimir Certificado Medico
            </Button>
        </form>
    );
}
