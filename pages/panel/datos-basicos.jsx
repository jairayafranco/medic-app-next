import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react'
import Selector from '../../components/Selector';
import DateSelector from '../../components/DatePicker';
import styles from '../../styles/datosBasicos.module.css'
import { datosBasicosSchema } from '../../schemas/schemas';
import { AppContext } from '../../context/AppContext';
import Dialog from '../../components/Dialog';
import Confirm from '../../components/Confirm';
import PacientePicture from '../../components/PacientePicture';
import Box from '@mui/material/Box';
import { saveSessionStorageData, getSessionStorageData, clearSessionStorageData, availableSessionStorageData, formatInitialValues } from '../../helpers/helpers';
import { datosBasicosFields } from '../../data/inputs';
import FullScreenModal from '../../components/FullScreenModal';
import CertificadoSalud from '../../components/CertificadoSalud';
import CertificadoVisual from '../../components/CertificadoVisual';

export default function DatosBasicos() {
    const { findPaciente, createNewForm, removePaciente, modifyPaciente } = AppContext();

    useEffect(() => {
        const data = getSessionStorageData("datosBasicos");
        if (data) {
            formik.setValues(data);
        }
    }, []);

    const formik = createNewForm({
        initialValues: formatInitialValues(datosBasicosFields),
        schema: datosBasicosSchema,
    }, (data) => saveSessionStorageData("datosBasicos", data));

    const handleSearchPaciente = (id) => {
        findPaciente(id, (data) => {
            formik.setValues(data.paciente.datosBasicos);
            saveSessionStorageData("", data.paciente);
        });
    }

    const handleDeletePaciente = () => {
        const id = getSessionStorageData("datosBasicos")?.idUsuario;
        removePaciente(id, () => {
            handleClearForm();
        })
    }

    const handleUpdatePaciente = () => {
        const formikValues = formik.values;
        modifyPaciente(formikValues, () => {
            saveSessionStorageData("datosBasicos", formikValues);
        });
    }

    const handleClearForm = () => {
        formik.resetForm();
        clearSessionStorageData();
    }

    return (
        <Box className={styles.mainContainer}>
            <PacientePicture />
            <Box style={{ display: 'flex', flexWrap: 'wrap' }} autoComplete="off">
                <Grid container rowSpacing={2}>
                    {datosBasicosFields.map(({ name, property, type, options }, index) => (
                        <Grid item xs={12} md={5} key={index}>
                            {
                                ![4, 5, 12].includes(index) && (
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
                                index === 5 && (
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
                                [4, 12].includes(index) && (
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
                        <Button onClick={formik.handleSubmit} disabled={availableSessionStorageData()}>Crear</Button>
                        <Dialog
                            buttonTitle="Buscar"
                            title="Buscar Paciente"
                            label="Identificacion Paciente"
                            buttonActionTitle="Buscar"
                            buttonAction={handleSearchPaciente}
                        />
                        <Button disabled={!availableSessionStorageData()} onClick={handleUpdatePaciente}>Actualizar</Button>
                        <Button onClick={handleClearForm}>Limpiar</Button>
                        <Confirm
                            buttonTitle="Eliminar"
                            title="Eliminar Paciente"
                            content="¿Esta seguro que desea eliminar este paciente?"
                            buttonAction={handleDeletePaciente}
                            buttonColor="error"
                            disabled={!availableSessionStorageData()}
                        />
                    </Grid>
                </ButtonGroup>

            </Box>
        </Box>
    );
}