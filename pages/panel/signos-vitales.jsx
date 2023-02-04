import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { signosVitalesSchema } from '../../schemas/schemas';
import { AppContext } from '../../context/AppContext';
import { saveSessionStorageData, getSessionStorageData, moduleCompleted } from '../../helpers/helpers';
import { updatePaciente, getSignosVitalesHistory, saveSignosVitalesHistory } from '../../api/axiosApi';
import FullScreenModal from '../../components/FullScreenModal';
import DataTable from '../../components/DataTable';
import { signosVitalesFields } from '../../data/inputs';

export default function SignosVitales() {
    const { notifyHandler, backdropHandler } = AppContext();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const data = getSessionStorageData("signosVitales");
        if (data) {
            formik.setValues(data);
        }
        getSignosVitalesHistory().then(res => setHistory(res?.history))
    }, []);

    const formik = useFormik({
        initialValues: {
            ...signosVitalesFields.reduce((acc, curr) => {
                curr.fields.forEach(field => {
                    acc[field.property] = "";
                });
                return acc;
            }, {})
        },
        validationSchema: signosVitalesSchema,
        onSubmit: values => {
            backdropHandler(true);
            const formikValues = values;

            updatePaciente(formikValues).then(res => {
                if (!res.status) {
                    notifyHandler(true, res.type, res.message);
                    return;
                }

                notifyHandler(true, res.type, res.message);
                saveSessionStorageData("signosVitales", formikValues);
                saveSignosVitalesHistory({ ...formikValues, idUsuario: getSessionStorageData("datosBasicos")?.idUsuario })
                    .then(() => getSignosVitalesHistory().then(res => setHistory(res?.history)))
            }).finally(() => backdropHandler(false));
        }
    });
    useEffect(() => handleSomeValues(), [formik.values]);

    const colorSchema = (campo) => {
        const { tensionArterialDiastolica, tensionArterialSistolica, peso, talla,
            frecuenciaCardiaca, frecuenciaRespiratoria, saturacionO2
        } = formik.values;
        const name = campo.property;
        const warning = "#CAB500";
        const advertence = "#D32F2F";

        const imc = (peso / ((talla / 100) * (talla / 100))).toFixed(2);

        if (name === "interpretacion" && (peso && talla)) {
            if (imc <= 17 || imc >= 30) {
                return advertence;
            }
            if (imc >= 17 && imc <= 18.41 || imc >= 25 && imc <= 30) {
                return warning;
            }
        }

        if (name === "tensionArterialSistolica" && tensionArterialSistolica) {
            if (tensionArterialSistolica < 90 || tensionArterialSistolica >= 140) {
                return advertence;
            }
        }

        if (name === "tensionArterialDiastolica" && tensionArterialDiastolica) {
            if (tensionArterialDiastolica < 60 || tensionArterialDiastolica >= 90) {
                return advertence;
            }
        }

        if (name === "frecuenciaCardiaca" && frecuenciaCardiaca) {
            if (frecuenciaCardiaca < 60 || frecuenciaCardiaca > 100) {
                return advertence;
            }
        }

        if (name === "frecuenciaRespiratoria" && frecuenciaRespiratoria) {
            if (frecuenciaRespiratoria < 12 || frecuenciaRespiratoria > 20) {
                return advertence;
            }
        }

        if (name === "saturacionO2" && saturacionO2) {
            if (saturacionO2 < 90 || saturacionO2 > 100) {
                return advertence;
            }
        }
    }

    const handleSomeValues = () => {
        const { values } = formik;

        if (values.tensionArterialDiastolica && values.tensionArterialSistolica) {
            formik.setFieldValue(
                "tensionArterialMedia",
                Math.trunc(parseInt(values.tensionArterialDiastolica) + ((parseInt(values.tensionArterialSistolica) - parseInt(values.tensionArterialDiastolica))) / 3)
            );
        } else {
            formik.setFieldValue("tensionArterialMedia", "");
        }

        const imc = (values.peso / ((values.talla / 100) * (values.talla / 100))).toFixed(2);

        if (values.peso && values.talla) {
            formik.setFieldValue("imc", imc);
            formik.setFieldValue("interpretacion", interpretacionIMC(imc));
            formik.setFieldValue("pesoMinimo", ((values.talla / 100) * (values.talla / 100) * 18.5).toFixed(1));
            formik.setFieldValue("pesoMaximo", ((values.talla / 100) * (values.talla / 100) * 24.9).toFixed(1));
        } else {
            formik.setFieldValue("imc", "");
            formik.setFieldValue("interpretacion", "");
            formik.setFieldValue("pesoMinimo", "");
            formik.setFieldValue("pesoMaximo", "");
        }

        function interpretacionIMC(imc) {
            if (imc < 17) return 'Desnutricion';
            if (imc < 18.5) return 'Peso bajo';
            if (imc >= 18.5 && imc <= 24.9) return 'Peso normal';
            if (imc >= 25 && imc <= 29.9) return 'Sobrepeso';
            if (imc >= 30 && imc <= 34.9) return 'Obesidad grado 1';
            if (imc >= 35 && imc <= 39.9) return 'Obesidad grado 2';
            if (imc >= 40) return 'Obesidad grado 3';
        }
    }

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
                                        style={{ width: "90%", backgroundColor: colorSchema(campo) }}
                                        value={formik.values[campo.property]}
                                        onChange={formik.handleChange}
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