import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { saveSessionStorageData, getSessionStorageData } from '../../helpers/helpers';
import { idae } from '../../data/idae'
import FullScreenModal from '../../components/FullScreenModal';
import Table from '../../components/Table';
import axios from 'axios';

export default function ImpresionDiagnostica() {
    const { setNotify, setBackdrop } = AppContext();
    const [selection, setSelection] = useState([]);
    const [analisis, setAnalisis] = useState('');
    const [analisisError, setAnalisisError] = useState(false);

    useEffect(() => {
        const data = getSessionStorageData("impresionDiagnostica");
        if (data) {
            setSelection(data.impresionDiagnostica);
            setAnalisis(data.analisis);
        }
    }, []);

    const tableRows = () => {
        return idae.map((item, index) => {
            const [codigo, descripcion] = Object.entries(item)[0];
            return {
                id: index + 1,
                codigo,
                descripcion
            }
        });
    }

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

    const handleSave = () => {
        if (!selection.length) {
            setNotify({ open: true, message: "No hay datos para guardar", type: "warning" });
            return;
        }

        if (!analisis) {
            setAnalisisError(true);
            return;
        }

        const { idUsuario } = getSessionStorageData("datosBasicos");
        const data = {
            analisis,
            impresionDiagnostica: selection
        }
        setBackdrop(true);
        axios.put(`/api/data/paciente?id=${idUsuario}&opt=impresionDiagnostica`, data)
            .then(() => {
                saveSessionStorageData("impresionDiagnostica", data);
                setNotify({ open: true, message: "Paciente actualizado", type: "success" });
            })
            .catch((error) => {
                console.error(error);
                setNotify({ open: true, message: "No se pudo guardar la impresion diagnostica", type: "error" });
            }).finally(() => setBackdrop(false));
    }

    const handleClear = () => {
        setSelection([]);
        setAnalisis('');
    }

    return (
        <>
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
            <Button variant="contained" sx={{ ml: 0.5 }} onClick={handleSave} disabled={!getSessionStorageData("datosBasicos")}>
                Guardar
            </Button>
            <Button variant="contained" color="secondary" sx={{ ml: 0.5 }} onClick={handleClear}>
                Limpiar
            </Button>
            <TextField
                label="Analisis"
                multiline
                rows={2}
                fullWidth
                sx={{ mt: 2 }}
                value={analisis}
                onChange={(e) => setAnalisis(e.target.value)}
                error={analisisError}
                helperText={analisisError && "El campo es obligatorio"}
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
                />
            </Box>
        </>
    );
}