import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Selector from '../../components/Selector';
import DateSelector from '../../components/DatePicker';
import styles from '../../styles/datosBasicos.module.css'
import { datosBasicosSchema } from '../../schemas/schemas';
import Dialog from '../../components/Dialog';
import Confirm from '../../components/Confirm';
import PacientePicture from '../../components/PacientePicture';
import Box from '@mui/material/Box';
import { availablePacienteData, formatInitialValues } from '../../helpers/helpers';
import { datosBasicosFields } from '../../data/inputs';
import { useFormik } from 'formik';
import FullScreenModal from '../../components/FullScreenModal';
import CertificadoSalud from '../../components/CertificadoSalud';
import CertificadoVisual from '../../components/CertificadoVisual';
import HistoriaClinicaPDF from '../../pdfs/HistoriaClinicaPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { searchPaciente, createPaciente, updatePaciente, deletePaciente } from '../../services/axiosApi';
import useNotifyStore from '../../store/useNotifyStore';
import usePacienteStore from '../../store/usePacienteStore';
import { lodash as _ } from '../../lib/lodash';

export default function DatosBasicos() {
    const { setNotify, setBackdrop } = useNotifyStore();
    const { paciente, setPaciente, setPacienteModule } = usePacienteStore();

    const formik = useFormik({
        initialValues: paciente.datosBasicos || formatInitialValues(datosBasicosFields),
        validationSchema: datosBasicosSchema,
        onSubmit: (data) => {
            pacienteMethods("create", data);
        },
    });

    const pacienteMethods = async (method, data) => {
        setBackdrop(true);

        const dataToSubmit = method === "update" ? { currentUserData: paciente.datosBasicos, newFormikValues: data } : data;
        const options = {
            create: createPaciente,
            update: updatePaciente,
            delete: deletePaciente,
            search: searchPaciente
        }

        const { status, type, message, paciente: foundPaciente } = await options[method](dataToSubmit);
        setNotify({
            type,
            message,
            open: method === "search" && status ? false : true
        });
        setBackdrop(false);
        if (!status) return;

        const actions = {
            search: () => {
                formik.setValues(foundPaciente.datosBasicos);
                setPaciente(foundPaciente);
            },
            create: () => setPaciente({ datosBasicos: dataToSubmit }),
            update: () => setPacienteModule("datosBasicos", dataToSubmit.newFormikValues),
            delete: () => handleClearForm()
        };

        actions[method]();
    }

    const handleClearForm = () => {
        formik.setValues(formatInitialValues(datosBasicosFields));
        setPaciente({});
    }

    return (
        <Box className={styles.mainContainer}>
            <PacientePicture />
            <Box style={{ display: 'flex', flexWrap: 'wrap' }} autoComplete="off">
                <Grid container rowSpacing={2}>
                    {datosBasicosFields.map(({ name, property, type, options }, index) => (
                        <Grid item xs={12} md={5} key={index}>
                            {
                                !["Genero", "Fecha de Nacimiento", "Tipo de Consulta"].includes(name) && (
                                    <TextField
                                        autoComplete='off'
                                        id={property}
                                        name={property}
                                        label={name}
                                        value={formik.values[property]}
                                        onChange={formik.handleChange}
                                        type={type}
                                        variant="standard"
                                        fullWidth
                                        style={{ width: '90%' }}
                                        error={formik.touched[property] && Boolean(formik.errors[property])}
                                        helperText={formik.touched[property] && formik.errors[property]}
                                    />
                                )
                            }
                            {
                                name === "Fecha de Nacimiento" && (
                                    <DateSelector
                                        label={name}
                                        name={property}
                                        value={formik.values[property]}
                                        onChange={value => formik.setFieldValue(property, value)}
                                        error={formik.touched[property] && Boolean(formik.errors[property])}
                                        helperText={formik.touched[property] && formik.errors[property]}
                                    />
                                )
                            }
                            {
                                ["Genero", "Tipo de Consulta"].includes(name) && (
                                    <Selector
                                        title={name}
                                        value={formik.values[property]}
                                        values={options}
                                        error={formik.touched[property] && Boolean(formik.errors[property])}
                                        onChange={value => formik.setFieldValue(property, value)}
                                        helperText={formik.touched[property] && formik.errors[property]}
                                    />
                                )
                            }
                        </Grid>
                    ))}
                    {
                        <Grid item sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
                            <FullScreenModal
                                title="Certificado de Salud"
                                buttonName="Ir a Certificado de Salud"
                                color="primary"
                            >
                                <CertificadoSalud />
                            </FullScreenModal>

                            <FullScreenModal
                                title="Certificado Visual"
                                buttonName="Ir a Certificado Visual"
                                color="primary"
                            >
                                <CertificadoVisual />
                            </FullScreenModal>
                        </Grid>
                    }
                </Grid>
                <ButtonGroup
                    id={styles.buttonsContainer}
                    orientation='horizontal' variant="contained"
                    sx={{ mt: 3 }}
                >
                    <Grid item className={styles.buttonGrid}>
                        <Button onClick={formik.handleSubmit} disabled={!availablePacienteData()}>Crear</Button>

                        <Dialog
                            buttonTitle="Buscar"
                            title="Buscar Paciente"
                            label="Identificacion Paciente"
                            buttonActionTitle="Buscar"
                            buttonAction={(id) => pacienteMethods("search", id)}
                        />

                        <Button
                            disabled={availablePacienteData()}
                            onClick={() => pacienteMethods("update", formik.values)}
                        >
                            Actualizar
                        </Button>

                        <Button
                            onClick={handleClearForm}
                        >
                            Limpiar
                        </Button>

                        <Button
                            disabled={availablePacienteData()}
                            onClick={() => {
                                document.querySelector(`a[download="HistoriaClinica - ${paciente.datosBasicos?.nombreUsuario}.pdf"]`).click();
                            }}
                        >
                            Imprimir H.C
                        </Button>
                        <div style={{ display: 'none' }}>
                            <PDFDownloadLink
                                document={<HistoriaClinicaPDF />}
                                fileName={`HistoriaClinica - ${paciente.datosBasicos?.nombreUsuario}.pdf`}
                            >
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                            </PDFDownloadLink>
                        </div>

                        <Confirm
                            buttonTitle="Eliminar"
                            title="Eliminar Paciente"
                            content="¿Esta seguro que desea eliminar este paciente?"
                            buttonAction={() => pacienteMethods("delete", paciente?.idUsuario)}
                            buttonColor="error"
                            disabled={availablePacienteData()}
                        />
                    </Grid>
                </ButtonGroup>

            </Box>
        </Box>
    );
}