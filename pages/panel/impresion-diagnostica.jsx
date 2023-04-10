import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react'
import { moduleCompleted, formatTableRows } from '../../helpers/helpers';
import { idae } from '../../data/idae'
import FullScreenModal from '../../components/FullScreenModal';
import Table from '../../components/Table';
import { updateImpresionDiagnostica } from '../../services/axiosApi';
import { useFormik } from 'formik';
import { impresionDiagnosticaSchema } from '../../schemas/schemas';
import useNotifyStore from '../../store/useNotifyStore';
import usePacienteStore from '../../store/usePacienteStore';

export default function ImpresionDiagnostica() {
    const { paciente, setPacienteModule } = usePacienteStore();
    const { setNotify, setBackdrop } = useNotifyStore();
    const [selection, setSelection] = useState(paciente.impresionDiagnostica?.impresionDiagnostica || []);

    const formik = useFormik({
        initialValues: {
            analisis: paciente.impresionDiagnostica?.analisis || "",
        },
        validationSchema: impresionDiagnosticaSchema,
        onSubmit: (values) => {
            if (!selection.length) {
                setNotify({ message: "No hay datos para guardar", type: "warning" });
                return;
            }

            const { idUsuario } = paciente.datosBasicos;
            const data = {
                ...values,
                impresionDiagnostica: selection
            }

            setBackdrop(true);
            updateImpresionDiagnostica(idUsuario, data)
                .then((res) => {
                    setNotify({ message: res.message, type: res.type });
                    if (!res.status) return;
                    setPacienteModule("impresionDiagnostica", data);
                }).finally(() => setBackdrop(false));
        }
    });

    const tableRows = () => formatTableRows(idae);

    const tableColumns = [
        { field: 'codigo', headerName: 'Codigo CIE-10', width: 150 },
        { field: 'descripcion', headerName: 'Descripcion', width: 700 },
    ];

    const handleData = (data) => {
        setSelection((prev) => {
            const newData = data.filter(item => !prev.some(prevItem => prevItem.id === item.id));
            return [...prev, ...newData];
        });
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: { xs: 'block', } }}>
                <FullScreenModal
                    buttonName="Buscar codigo CIE-10"
                    title="Buscar codigo CIE-10"
                    color='success'
                >
                    <Table
                        rows={tableRows()}
                        columns={tableColumns}
                        getRowsData={handleData}
                    />
                </FullScreenModal>
                <Button variant="contained" sx={{ ml: { xs: 0, md: 0.5 }, mt: { xs: 0.5, md: 0 } }} type="submit" disabled={!moduleCompleted("datosBasicos")}>
                    Guardar
                </Button>
            </Box>
            <TextField
                name="analisis"
                label="Analisis"
                multiline
                rows={2}
                fullWidth
                sx={{ mt: 2 }}
                value={formik.values.analisis}
                onChange={formik.handleChange}
                error={formik.touched.analisis && Boolean(formik.errors.analisis)}
                helperText={formik.touched.analisis && formik.errors.analisis}
            />
            <Box sx={{ mt: 1, height: 700 }}>
                <Table
                    rows={selection}
                    columns={[...tableColumns, {
                        field: 'Borrar',
                        headerName: '',
                        width: 200,
                        renderCell: (params) => (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => setSelection(selection.filter(item => item.id !== params.row.id))}
                            >
                                Remover
                            </Button>
                        )
                    }]}
                    isCheckboxSelection={false}
                    disableSelectionOnClick={true}
                />
            </Box>
        </form>
    );
}
