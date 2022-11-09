import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect } from 'react'
import { useFormik } from 'formik';
import { signosVitalesSchema } from '../../schemas/schemas';
import { AppContext } from '../../context/AppContext';
import { saveSessionStorageData, getSessionStorageData, updatePaciente, moduleCompleted } from '../../helpers/helpers';
import axios from 'axios';

export default function SignosVitales() {
    const { notifyHandler, backdropHandler } = AppContext();

    useEffect(() => {
        const data = getSessionStorageData("signosVitales");
        if (data) {
            formik.setValues(data);
        }
    }, []);

    const campos = [
        {
            group: 1, fields: [
                {
                    name: "Tension Arterial Sistolica",
                    property: "tensionArterialSistolica",
                    type: "number",
                    unit: "mm/Hg",
                    abrev: "(TAS)",
                    variant: "filled",
                    size: "small"
                },
                {
                    name: "Tension Arterial Diastolica",
                    property: "tensionArterialDiastolica",
                    type: "number",
                    unit: "mm/Hg",
                    abrev: "(TAD)",
                    variant: "filled",
                    size: "small"
                },
                {
                    name: "Tension Arterial Media",
                    property: "tensionArterialMedia",
                    type: "number",
                    unit: "mm/Hg",
                    abrev: "(TAM)",
                    variant: "outlined",
                    size: "small",
                    shrink: true,
                    readOnly: true
                },
            ]
        },
        {
            group: 2, fields: [
                {
                    name: "Frecuencia Cardiaca",
                    property: "frecuenciaCardiaca",
                    type: "number",
                    unit: "L/M",
                    abrev: "(FC)",
                    variant: "filled",
                    size: "small"
                },
                {
                    name: "Frecuencia Respiratoria",
                    property: "frecuenciaRespiratoria",
                    type: "number",
                    unit: "R/M",
                    abrev: "(FR)",
                    variant: "filled",
                    size: "small"
                },
                {
                    name: "Saturacion de O2",
                    property: "saturacionO2",
                    type: "number",
                    unit: "%",
                    abrev: "(SO2)",
                    variant: "filled",
                    size: "small"
                },
            ]
        },
        {
            group: 3, fields: [
                {
                    name: "Temperatura",
                    property: "temperatura",
                    type: "number",
                    unit: "Grados",
                    abrev: "(T°)",
                    variant: "standard",
                    size: "small"
                },
                {
                    name: "P. Abdominal",
                    property: "pAbdominal",
                    type: "number",
                    unit: "Cms",
                    abrev: "(Si no es RCV escriba 0)",
                    variant: "standard",
                    size: "small"
                },
                {
                    name: "Peso",
                    property: "peso",
                    type: "number",
                    unit: "Kg",
                    abrev: "(KG)",
                    variant: "standard",
                    size: "small"
                },
                {
                    name: "Talla",
                    property: "talla",
                    type: "number",
                    unit: "Cms",
                    abrev: "(CMS)",
                    variant: "standard",
                    size: "small"
                },
                {
                    name: "Indice de Masa Corporal",
                    property: "imc",
                    type: "number",
                    unit: "",
                    abrev: "(IMC)",
                    variant: "outlined",
                    size: "small",
                    shrink: true,
                    readOnly: true
                },
                {
                    name: "Interpretacion",
                    property: "interpretacion",
                    type: "text",
                    abrev: "",
                    variant: "filled",
                    size: "small",
                    shrink: true,
                    readOnly: true
                },
                {
                    name: "Peso Minimo",
                    property: "pesoMinimo",
                    type: "number",
                    unit: "Kg",
                    abrev: "",
                    variant: "outlined",
                    size: "small",
                    shrink: true,
                    readOnly: true
                },
                {
                    name: "Peso Maximo",
                    property: "pesoMaximo",
                    type: "number",
                    unit: "Kg",
                    abrev: "",
                    variant: "outlined",
                    size: "small",
                    shrink: true,
                    readOnly: true
                },
            ]
        },
    ];

    const formik = useFormik({
        initialValues: {
            ...campos.reduce((acc, curr) => {
                curr.fields.forEach(field => {
                    acc[field.property] = "";
                });
                return acc;
            }, {})
        },
        validationSchema: signosVitalesSchema,
        onSubmit: values => {
            backdropHandler(true);
            const signosVitalesData = getSessionStorageData("signosVitales");
            const formikValues = values;

            updatePaciente(signosVitalesData, formikValues, "signosVitales").then(res => {
                const data = res.data || res.response?.data;

                if (data.empty) notifyHandler(true, 'warning', data.message, { backdrop: false });

                if (data.status) {
                    notifyHandler(true, 'success', data.message, { backdrop: false });
                    saveSessionStorageData("signosVitales", formikValues);
                    axios.post('/api/data/signosVitalesHistory', { ...formikValues, id: getSessionStorageData("datosBasicos")?.idUsuario });
                }

                if (!data.status) notifyHandler(true, 'warning', data.message, { backdrop: false });
                if (data.error) notifyHandler(true, 'error', data.message, { backdrop: false });
            });
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
            {campos.map((campo, index) => (
                <Paper key={index} elevation={3} sx={{ p: 2, width: '100%' }}>
                    <Grid container rowSpacing={2}>
                        {
                            campos[index].fields.map((campo, index) => (
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
                <Button variant="contained" type="submit" color="secondary">Historial</Button>
                {/* <FullScreenDialog buttonName='historial' title='Historial Signos Vitales'>
                    <DataTable
                        columns={[['Fecha', ''], ...campos1, ...campos2, ...campos3, ...campos4].map(v => {
                            return { field: camelCase(v[0]), headerName: v[0], width: v[0] == 'Fecha' ? 180 : 130 }
                        })}
                        rows={history}
                    />
                </FullScreenDialog> */}
            </ButtonGroup>
        </form>
    );
}