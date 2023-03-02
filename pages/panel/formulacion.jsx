import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { formulacionSchema } from "../../schemas/schemas";
import { formulacionFields } from "../../data/inputs";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FullScreenModal from "../../components/FullScreenModal";
import Table from "../../components/Table";
import { formatInitialValues, formatTableRows, getSessionStorageData, moduleCompleted, saveSessionStorageData } from "../../helpers/helpers";
import { procedimientos } from "../../data/procedimientos";
import { medicamentos } from "../../data/medicamentos";
import { laboratorios } from "../../data/laboratorios";
import { insumos } from "../../data/insumos";
import { AppContext } from "../../context/AppContext";
import { updateFormulacion } from "../../api/axiosApi";

export default function Formulacion() {
    const [tipoProcedimiento, setTipoProcedimiento] = useState("procedimientos");
    const [allValues, setAllValues] = useState({
        procedimientos: [],
        medicamentos: [],
        laboratorios: [],
        insumos: []
    });

    const { setNotify, setBackdrop } = AppContext();

    useEffect(() => formik.resetForm(), [tipoProcedimiento]);

    useEffect(() => {
        const data = getSessionStorageData("formulacion");
        if (data) {
            setAllValues(data);
        }
    }, []);


    const setRowsData = (name) => {
        return {
            procedimientos,
            medicamentos,
            laboratorios,
            insumos
        }[name];
    }

    const formik = useFormik({
        initialValues: formatInitialValues(formulacionFields),
        validationSchema: formulacionSchema,
        onSubmit: (values) => {
            setAllValues((prev) => {
                return {
                    ...prev,
                    [tipoProcedimiento]: [...prev[tipoProcedimiento], values]
                }
            });
            formik.resetForm();
        }
    });

    const handleRowsData = (data) => {
        const { id, codigo, descripcion } = data[0];
        formik.setFieldValue("id", id);
        formik.setFieldValue("consecutivo", codigo);
        formik.setFieldValue("servicio", descripcion);

        //close the component FullScreenModal
        document.querySelector("div[role='dialog'] > header > div > button").click();
    }

    const handleSave = () => {
        const checkValues = allValues[tipoProcedimiento].length;
        if (!checkValues) {
            setNotify({ open: true, message: "No hay datos para guardar", type: "warning" });
            return;
        }

        const { idUsuario } = getSessionStorageData("datosBasicos");
        setBackdrop(true);
        updateFormulacion(idUsuario, allValues)
            .then((res) => {
                setNotify({
                    open: true,
                    message: res.status ? "Formulacion guardada con exito" : "Error al guardar la formulacion",
                    type: res.type
                });
                if (!res.status) return;
                saveSessionStorageData("formulacion", allValues);
            }).finally(() => setBackdrop(false));
    }

    return (
        <>
            <RadioButtonGroup
                title="Tipo de Formulacion"
                options={[
                    "procedimientos",
                    "medicamentos",
                    "laboratorios",
                    "insumos"
                ]}
                onChange={(e) => setTipoProcedimiento(e.target.value)}
            />
            <Box sx={{ mt: 2 }}>
                <FullScreenModal
                    buttonName={`Consultar ${tipoProcedimiento}`}
                    title={`Consultar ${tipoProcedimiento}`}
                    color='primary'
                >
                    <Table
                        columns={[
                            { field: 'codigo', headerName: 'Consecutivo', width: 150 },
                            { field: 'descripcion', headerName: 'Descripcion', width: 700 },
                        ]}
                        rows={formatTableRows(setRowsData(tipoProcedimiento))}
                        getRowsData={handleRowsData}
                        isCheckboxSelection={false}
                    />
                </FullScreenModal>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            formulacionFields.map((field, index) => {
                                return (
                                    <Grid item xs={12} md={5} key={index}>
                                        <TextField
                                            key={index}
                                            label={field.name}
                                            name={field.property}
                                            value={formik.values[field.property]}
                                            onChange={formik.handleChange}
                                            type={field.type}
                                            variant="standard"
                                            sx={{ m: 1, width: '100%' }}
                                            InputProps={{
                                                readOnly: field.readOnly
                                            }}
                                            error={formik.touched[field.property] && Boolean(formik.errors[field.property])}
                                            helperText={formik.touched[field.property] && formik.errors[field.property]}
                                        />
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                    <Button variant="contained" sx={{ mt: 2 }} type="submit">Agregar</Button>
                </form>
                <Box sx={{ mt: 1, height: 500 }}>
                    <Table
                        columns={[
                            { field: 'consecutivo', headerName: 'Consecutivo', width: 150 },
                            { field: 'servicio', headerName: 'Servicio', width: 550 },
                            { field: 'cantidad', headerName: 'Cantidad', width: 150 },
                            { field: 'descripcionManual', headerName: 'Descripcion', width: 700 },
                            {
                                field: 'Borrar',
                                headerName: '',
                                width: 100,
                                renderCell: (params) => (
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => {
                                            setAllValues((prev) => {
                                                const newData = prev[tipoProcedimiento].filter((item) => item.id !== params.row.id);
                                                return {
                                                    ...prev,
                                                    [tipoProcedimiento]: newData
                                                }
                                            });
                                        }}
                                    >
                                        Remover
                                    </Button>
                                )
                            }
                        ]}
                        rows={allValues[tipoProcedimiento]}
                        isCheckboxSelection={false}
                        disableSelectionOnClick={true}
                    />
                    <Button disabled={!moduleCompleted("datosBasicos")} variant="contained" sx={{ my: 1.5 }} onClick={handleSave}>Guardar {tipoProcedimiento}</Button>
                </Box>
            </Box>
        </>
    );
}