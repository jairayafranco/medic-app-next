import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { certificadoVisualFields } from '../data/inputs';
import { formatInitialValues, availablePacienteData } from '../helpers/helpers';
import { useFormik } from 'formik';
import Typography from '@mui/material/Typography';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CertificadoVisualPDF from '../pdfs/CertificadoVisualPDF';
import { certificadoVisualSchema } from '../schemas/schemas';
import usePacienteStore from '../store/usePacienteStore';

export default function CertificadoVisual() {
    const { paciente } = usePacienteStore();
    const nombrePaciente = paciente.datosBasicos?.nombreUsuario;

    const formik = useFormik({
        initialValues: { ...formatInitialValues(certificadoVisualFields), conclusion: "" },
        validationSchema: certificadoVisualSchema,
        onSubmit: () => {
            document.querySelector(`a[download="CertificadoVisual - ${nombrePaciente}.pdf"]`).click();
            formik.resetForm();
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: "1.5em", padding: 15 }}>
            {
                certificadoVisualFields.map((group, index) => (
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
            <TextField
                name="conclusion"
                label="Conclusion"
                type="text"
                variant="outlined"
                style={{ width: '90%' }}
                size="small"
                multiline
                rows={2}
                value={formik.values.conclusion}
                onChange={formik.handleChange}
                error={formik.touched.conclusion && Boolean(formik.errors.conclusion)}
                helperText={formik.touched.conclusion && formik.errors.conclusion}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={availablePacienteData()}
            >
                Imprimir Certificado Visual
            </Button>
            <div style={{ display: 'none' }}>
                <PDFDownloadLink document={<CertificadoVisualPDF paciente={paciente} {...formik.values} />} fileName={`CertificadoVisual - ${nombrePaciente}.pdf`}>
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                </PDFDownloadLink>
            </div>
        </form>
    );
}
