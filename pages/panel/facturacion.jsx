import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { facturacionFields } from "../../data/inputs";
import { forwardRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import { formatInitialValues, getSessionStorageData, moduleCompleted, formatToCurrency, getFormattedDate, saveSessionStorageData } from "../../helpers/helpers";
import { facturacionSchema } from "../../schemas/schemas";
import { NumericFormat } from 'react-number-format';
import { updateFacturacion } from "../../services/axiosApi";
import Table from "../../components/Table";
import useNotifyStore from "../../store/useNotifyStore";
import usePacienteStore from "../../store/usePacienteStore";

const NumericFormatCustom = forwardRef(function NumericFormatCustom(
    props,
    ref,
) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            valueIsNumericString
            prefix="$"
        />
    );
});

export default function Facturacion() {
    const { paciente, setPacienteModule } = usePacienteStore();
    const [facturacion, setFacturacion] = useState(paciente.facturacion || []);
    const { setNotify, setBackdrop } = useNotifyStore();

    useEffect(() => {
        const data = paciente.datosBasicos;
        if (data) {
            ["idUsuario", "nombreUsuario", "tipoConsulta"].forEach((field) => {
                formik.setFieldValue(field, data[field]);
            });
            formik.setFieldValue("fechaAtencion", getFormattedDate());
        }
    }, []);

    const formik = useFormik({
        initialValues: formatInitialValues(facturacionFields),
        validationSchema: facturacionSchema,
        onSubmit: (values) => {
            setBackdrop(true);
            const { idUsuario } = paciente.datosBasicos;
            const fact = [...facturacion, values];
            updateFacturacion(idUsuario, fact)
                .then(res => {
                    setNotify({ message: res.message, type: res.type });
                    if (!res.status) return;
                    setFacturacion((prev) => {
                        return [...prev, values];
                    });
                    setPacienteModule("facturacion", fact);
                }).finally(() => setBackdrop(false));
        }
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container>
                    {
                        facturacionFields.map((field, index) => (
                            <Grid key={index} item xs={12} md={5}>
                                <TextField
                                    label={field.name}
                                    name={field.property}
                                    variant="standard"
                                    sx={{ m: 1, width: '90%' }}
                                    value={formik.values[field.property]}
                                    type={field.type}
                                    onChange={formik.handleChange}
                                    InputProps={{
                                        readOnly: field.readOnly,
                                        inputComponent: field.property === 'valor' ? NumericFormatCustom : undefined,
                                    }}
                                    error={formik.touched[field.property] && Boolean(formik.errors[field.property])}
                                    helperText={formik.touched[field.property] && formik.errors[field.property]}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
                <Button disabled={!moduleCompleted("datosBasicos")} variant="contained" sx={{ mt: 1 }} type="submit">Guardar</Button>
            </form>
            <Box sx={{ mt: 1, height: 600 }}>
                <Table
                    columns={[
                        { field: 'idUsuario', headerName: 'ID Paciente', width: 150, },
                        { field: 'nombreUsuario', headerName: 'Nombres y Apellidos', width: 360 },
                        { field: 'fechaAtencion', headerName: 'Fecha de Atención', width: 210 },
                        { field: 'tipoConsulta', headerName: 'Tipo de Consulta', width: 200 },
                        { field: 'valor', headerName: 'Valor Facturado', width: 150 },
                    ]}
                    rows={
                        facturacion.map((fact, index) => ({ ...fact, id: index + 1, valor: formatToCurrency(fact.valor) }))
                    }
                    isCheckboxSelection={false}
                    disableSelectionOnClick={true}
                />
            </Box>
        </>
    );
}
