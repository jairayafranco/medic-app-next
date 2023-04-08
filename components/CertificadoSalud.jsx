import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { certificadoSaludFields } from '../data/inputs';
import { formatInitialValues, availablePacienteData, getSessionStorageData } from '../helpers/helpers';
import { useFormik } from 'formik';
import Typography from '@mui/material/Typography';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CertificadoSaludPDF from '../pdfs/CertificadoSaludPDF';
import { certificadoSaludSchema } from '../schemas/schemas';

export default function CertificadoSalud() {
    const nombrePaciente = getSessionStorageData("datosBasicos")?.nombreUsuario;

    const formik = useFormik({
        initialValues: formatInitialValues(certificadoSaludFields),
        validationSchema: certificadoSaludSchema,
        onSubmit: (values) => {
            document.querySelector(`a[download="CertificadoSalud - ${nombrePaciente}.pdf"]`).click();
            formik.resetForm();
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
                                            error={formik.touched[campo.property] && Boolean(formik.errors[campo.property])}
                                            helperText={formik.touched[campo.property] && formik.errors[campo.property]}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </Paper>
                ))
            }
            <Button type="submit" variant="contained" color="primary" disabled={availablePacienteData()}>
                Imprimir Certificado Medico
            </Button>
            <div style={{ display: 'none' }}>
                <PDFDownloadLink document={<CertificadoSaludPDF {...formik.values} />} fileName={`CertificadoSalud - ${nombrePaciente}.pdf`}>
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                </PDFDownloadLink>
            </div>
        </form>
    );
}
